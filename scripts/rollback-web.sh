#!/usr/bin/env bash
set -Eeuo pipefail
source "$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)/vm-common.sh"
[[ $# -eq 2 ]] || { echo 'Usage: bash scripts/rollback-web.sh /absolute/site.conf PREVIOUS_IMAGE_TAG' >&2; exit 1; }
release="$2"
[[ "$release" =~ ^[a-zA-Z0-9_][a-zA-Z0-9_.-]{0,127}$ ]] || { echo 'Invalid image tag.' >&2; exit 1; }
load_site "$1"
# Uses the retained local image; never rebuild or pull a rollback version.
compose config --quiet
compose up -d --no-build --pull never --wait --wait-timeout 180
persist_release
compose ps
echo "Container restored: $release. Run HTTPS smoke; image rollback does not restore configuration or data."
