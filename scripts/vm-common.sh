#!/usr/bin/env bash
# Sourced by deploy-web.sh and rollback-web.sh. Ubuntu VM only.
set -Eeuo pipefail
umask 077

load_site() {
  [[ $# -eq 1 && -f "$1" ]] || { echo 'Provide a trusted site configuration file.' >&2; exit 1; }
  source "$1"
  : "${PROJECT_NAME:?Missing PROJECT_NAME}"
  : "${DEPLOY_BRANCH:?Missing DEPLOY_BRANCH}"
  : "${WEB_SERVICE:?Missing WEB_SERVICE}"
  [[ "$PROJECT_NAME" =~ ^[a-z][a-z0-9-]*$ ]] || { echo 'Invalid project name.' >&2; exit 1; }
  cd "/srv/websites/$PROJECT_NAME"
  [[ -f .env ]] || { echo 'Missing .env; follow docs/deployment.md.' >&2; exit 1; }
  exec 9>.git/deploy.lock
  flock -n 9 || { echo 'Another release operation is running.' >&2; exit 1; }
  # Use a known project name even when the caller has other Compose variables.
  export COMPOSE_PROJECT_NAME="$PROJECT_NAME"
  unset IMAGE_TAG WEB_BIND_IP WEB_PORT
  sudo -v
  mkdir -p .deploy
  chmod 700 .deploy
}

compose() {
  sudo env COMPOSE_PROJECT_NAME="$PROJECT_NAME" IMAGE_TAG="$release" \
    docker compose --env-file .env -p "$PROJECT_NAME" "$@"
}

persist_release() {
  local temp
  temp="$(mktemp .env.release.XXXXXX)"
  awk '!/^IMAGE_TAG=/' .env > "$temp"
  printf '\nIMAGE_TAG=%s\n' "$release" >> "$temp"
  chmod 600 "$temp"
  mv "$temp" .env
  printf '%s\n' "$release" > .deploy/current-release
}
