#!/usr/bin/env bash
set -Eeuo pipefail
source "$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)/vm-common.sh"
[[ $# -eq 2 ]] || { echo 'Usage: bash scripts/deploy-web.sh /absolute/site.conf APPROVED_FULL_COMMIT_SHA' >&2; exit 1; }
approved="$2"
[[ "$approved" =~ ^[a-f0-9]{40}$ ]] || { echo 'Supply the full reviewed commit SHA.' >&2; exit 1; }
load_site "$1"
[[ "$(git branch --show-current)" == "$DEPLOY_BRANCH" ]] || { echo 'Wrong deployment branch.' >&2; exit 1; }
[[ -z "$(git status --porcelain)" ]] || { echo 'Working tree has local/untracked changes; review before deployment.' >&2; exit 1; }
git fetch origin "$DEPLOY_BRANCH"
[[ "$(git rev-parse "origin/$DEPLOY_BRANCH")" == "$approved" ]] || { echo 'Approved SHA is not the current deployment branch tip.' >&2; exit 1; }
helpers_before="$(sha256sum scripts/deploy-web.sh scripts/vm-common.sh)"
git merge --ff-only "$approved"
[[ "$(git rev-parse HEAD)" == "$approved" ]] || { echo 'Checkout differs from approved SHA.' >&2; exit 1; }
# Stop if this running helper was changed by the fast-forward. Rerun the new copy.
[[ "$helpers_before" == "$(sha256sum scripts/deploy-web.sh scripts/vm-common.sh)" ]] || { echo 'Deployment helpers changed. Review them and rerun the command.' >&2; exit 1; }
release="git-${approved:0:12}-$(date -u +%Y%m%dT%H%M%SZ)-$$"
compose config --quiet
compose build --pull "$WEB_SERVICE"
if [[ -f .deploy/current-release ]]; then
  cp .deploy/current-release .deploy/previous-release
else
  # First use after a manual release: retain the explicitly configured old tag.
  sed -n 's/^IMAGE_TAG=//p' .env | tail -n 1 > .deploy/previous-release
fi
printf '%s\n' "$release" > .deploy/attempted-release
if ! compose up -d --no-build --wait --wait-timeout 180; then
  compose logs --tail=100 "$WEB_SERVICE"
  echo "Release unhealthy: $release. Containers may have changed; use rollback-web.sh with the recorded previous tag." >&2
  exit 1
fi
persist_release
compose ps
echo "Container healthy: $release ($approved). Run HTTPS smoke and record content/UAT approval before declaring the release complete."
