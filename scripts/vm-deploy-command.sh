#!/usr/bin/env bash
# Shared Ubuntu VM command: deploy the configured branch tip for one project.
set -Eeuo pipefail
umask 077
trap 'echo "Deploy stopped. Review the error above before retrying." >&2' ERR

[[ $# -eq 1 && -f "$1" ]] || {
  echo 'Usage: ~/bin/deploy-web /absolute/path/to/site.conf' >&2
  exit 1
}
site_config="$(realpath -- "$1")"
# This is trusted Bash configuration maintained by the deployment team.
unset PROJECT_NAME DEPLOY_BRANCH WEB_SERVICE
source "$site_config"
: "${PROJECT_NAME:?Set PROJECT_NAME in the configuration}"
: "${DEPLOY_BRANCH:?Set DEPLOY_BRANCH in the configuration}"
: "${WEB_SERVICE:?Set WEB_SERVICE in the configuration}"
[[ "$PROJECT_NAME" =~ ^[a-z][a-z0-9-]*$ ]] || {
  echo 'Invalid PROJECT_NAME.' >&2
  exit 1
}
git check-ref-format "refs/heads/$DEPLOY_BRANCH"
cd "/srv/websites/$PROJECT_NAME"
[[ -f .env ]] || { echo 'Missing .env. Configure the site first.' >&2; exit 1; }
exec 9>.git/deploy.lock
flock -n 9 || { echo 'Another release operation is running.' >&2; exit 1; }
[[ "$(git branch --show-current)" == "$DEPLOY_BRANCH" ]] || { echo 'Wrong deployment branch.' >&2; exit 1; }
[[ -z "$(git status --porcelain)" ]] || { echo 'Working tree has local/untracked changes; review before deployment.' >&2; exit 1; }
export COMPOSE_PROJECT_NAME="$PROJECT_NAME"
unset IMAGE_TAG WEB_BIND_IP WEB_PORT
sudo -v
git fetch -- origin "$DEPLOY_BRANCH"
target_commit="$(git rev-parse --verify "refs/remotes/origin/$DEPLOY_BRANCH^{commit}")"
[[ "$target_commit" =~ ^[a-f0-9]{40}$ ]] || { echo 'Invalid remote commit.' >&2; exit 1; }
git merge --ff-only "$target_commit"
[[ "$(git rev-parse HEAD)" == "$target_commit" ]] || { echo 'Checkout differs from the fetched branch tip.' >&2; exit 1; }
release="git-${target_commit:0:12}-$(date -u +%Y%m%dT%H%M%SZ)-$$"
compose() {
  sudo env COMPOSE_PROJECT_NAME="$PROJECT_NAME" IMAGE_TAG="$release" \
    docker compose --env-file .env -p "$PROJECT_NAME" "$@"
}
compose config --quiet
compose build --pull "$WEB_SERVICE"
mkdir -p .deploy
chmod 700 .deploy
if [[ -f .deploy/current-release ]]; then
  cp .deploy/current-release .deploy/previous-release
else
  sed -n 's/^IMAGE_TAG=//p' .env | tail -n 1 > .deploy/previous-release
fi
printf '%s\n' "$release" > .deploy/attempted-release
if ! compose up -d --no-build --wait --wait-timeout 180; then
  compose logs --tail=100 "$WEB_SERVICE"
  echo "Release unhealthy: $release. Containers may have changed; inspect and roll back using a confirmed retained image." >&2
  exit 1
fi
env_temp="$(mktemp .env.release.XXXXXX)"
trap 'rm -f -- "$env_temp"' EXIT
awk '!/^IMAGE_TAG=/' .env > "$env_temp"
printf '\nIMAGE_TAG=%s\n' "$release" >> "$env_temp"
chmod 600 "$env_temp"
mv "$env_temp" .env
printf '%s\n' "$release" > .deploy/current-release
compose ps
echo "Container healthy: $PROJECT_NAME / $release ($target_commit). Verify HTTPS, assets and browser behavior before declaring the release complete."
