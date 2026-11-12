#!/usr/bin/env bash
# Ubuntu VM installer. Existing global commands are never silently overwritten.
set -Eeuo pipefail
umask 077
[[ $# -le 1 ]] || { echo 'Usage: bash scripts/install-vm-deploy-command.sh [absolute/destination]' >&2; exit 1; }
command_source="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)/vm-deploy-command.sh"
command_target="${1:-$HOME/bin/deploy-web}"
[[ "$command_target" == /* ]] || { echo 'Use an absolute destination path.' >&2; exit 1; }
bash -n "$command_source"
if [[ -e "$command_target" || -L "$command_target" ]]; then
  if [[ -f "$command_target" && ! -L "$command_target" ]] && cmp -s "$command_source" "$command_target"; then
    chmod 700 "$command_target"
    echo "Already installed: $command_target"
    exit 0
  fi
  echo "Existing command preserved: $command_target. Review it before choosing a different command name or replacing it." >&2
  exit 1
fi
mkdir -p -- "$(dirname -- "$command_target")"
# Noclobber also protects against another install creating the target meanwhile.
(set -o noclobber; cat "$command_source" > "$command_target")
chmod 700 "$command_target"
echo "Installed: $command_target"
