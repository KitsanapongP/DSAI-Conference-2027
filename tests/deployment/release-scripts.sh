#!/usr/bin/env bash
# Run only inside the disposable test container, never on a VM/shared host.
set -Eeuo pipefail
[[ -f /.dockerenv && -d /workspace/scripts ]] || { echo 'Run this fixture through npm run test:container.' >&2; exit 1; }
fixture="$(mktemp -d)"
mkdir -p "$fixture/bin"
export PATH="$fixture/bin:$PATH"
export MOCK_SHA=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

cat > "$fixture/bin/git" <<'MOCK'
#!/usr/bin/env bash
case "$1" in
  branch) echo "${MOCK_BRANCH:-main}" ;;
  status)
    case "${MOCK_DIRTY:-0}" in
      1) echo ' M tracked-file' ;;
      2) echo '?? untracked-file' ;;
    esac ;;
  rev-parse) echo "$MOCK_SHA" ;;
  check-ref-format) [[ "$2" == refs/heads/main ]] ;;
  fetch) [[ "${MOCK_FETCH_FAIL:-0}" == 0 ]] ;;
  merge) [[ "${MOCK_MERGE_FAIL:-0}" == 0 ]] ;;
  *) echo "Unexpected git operation: $*" >&2; exit 2 ;;
esac
MOCK
cat > "$fixture/bin/sudo" <<'MOCK'
#!/usr/bin/env bash
if [[ "$1" == '-v' ]]; then exit 0; fi
exec "$@"
MOCK
cat > "$fixture/bin/docker" <<'MOCK'
#!/usr/bin/env bash
printf '%s\n' "$*" >> "$MOCK_LOG"
case " $* " in
  *' build '*) [[ "${MOCK_BUILD_FAIL:-0}" == 0 ]] ;;
  *' up '*) [[ "${MOCK_UP_FAIL:-0}" == 0 ]] ;;
  *) : ;;
esac
MOCK
chmod +x "$fixture/bin/"*

new_site() {
  local name="$1"
  site="/srv/websites/dsai-test-$name"
  mkdir -p "$site/.git" "$site/scripts"
  cp /workspace/scripts/{deploy-web,rollback-web,vm-common}.sh "$site/scripts/"
  printf 'PROJECT_NAME=dsai-test-%s\nDEPLOY_BRANCH=main\nWEB_SERVICE=web\n' "$name" > "$fixture/$name.conf"
  printf 'WEB_BIND_IP=127.0.0.1\nWEB_PORT=3002\nIMAGE_TAG=old-release\n' > "$site/.env"
  config="$fixture/$name.conf"
  export MOCK_LOG="$fixture/$name.log"
  : > "$MOCK_LOG"
  unset MOCK_DIRTY MOCK_BUILD_FAIL MOCK_UP_FAIL MOCK_BRANCH MOCK_FETCH_FAIL MOCK_MERGE_FAIL
}
deploy() { bash "$site/scripts/deploy-web.sh" "$config" "$MOCK_SHA"; }
expect_failure() {
  if "$@" > "$fixture/last-output" 2>&1; then echo 'Expected failure but command succeeded.' >&2; exit 1; fi
}

new_site happy
deploy
grep -q '^IMAGE_TAG=git-aaaaaaaaaaaa-' "$site/.env"
[[ "$(cat "$site/.deploy/previous-release")" == old-release ]]
[[ "$(cat "$site/.deploy/current-release")" == "$(cat "$site/.deploy/attempted-release")" ]]
echo 'PASS: healthy release persists tag and records previous release'

bash "$site/scripts/rollback-web.sh" "$config" old-release
grep -q '^IMAGE_TAG=old-release$' "$site/.env"
grep -q 'up -d --no-build --pull never --wait' "$MOCK_LOG"
echo 'PASS: explicit rollback persists tag and never builds/pulls'

new_site build-failure
export MOCK_BUILD_FAIL=1
expect_failure deploy
grep -q '^IMAGE_TAG=old-release$' "$site/.env"
! grep -q ' up ' "$MOCK_LOG"
echo 'PASS: failed build never replaces containers or environment tag'

new_site unhealthy
export MOCK_UP_FAIL=1
expect_failure deploy
grep -q '^IMAGE_TAG=old-release$' "$site/.env"
[[ -s "$site/.deploy/attempted-release" && ! -f "$site/.deploy/current-release" ]]
echo 'PASS: failed health keeps old environment and records attempted release'

new_site wrong-sha
expect_failure bash "$site/scripts/deploy-web.sh" "$config" bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
[[ ! -s "$MOCK_LOG" ]]
echo 'PASS: unapproved SHA stops before Docker changes'

new_site dirty
export MOCK_DIRTY=1
expect_failure deploy
[[ ! -s "$MOCK_LOG" ]]
echo 'PASS: dirty checkout stops before Docker changes'

new_site locked
(
  exec 8>"$site/.git/deploy.lock"
  flock -n 8
  expect_failure deploy
)
[[ ! -s "$MOCK_LOG" ]]
echo 'PASS: concurrent release is rejected'

new_site command-latest
(
  cd "$fixture"
  bash /workspace/scripts/vm-deploy-command.sh command-latest.conf
)
grep -q "^IMAGE_TAG=git-${MOCK_SHA:0:12}-" "$site/.env"
[[ "$(cat "$site/.deploy/previous-release")" == old-release ]]
grep -q ' build --pull web' "$MOCK_LOG"
echo 'PASS: shared command deploys the fetched main tip from any working directory'

new_site command-frontend
printf 'WEB_SERVICE=frontend\n' >> "$config"
rm "$site/scripts/deploy-web.sh"
bash /workspace/scripts/vm-deploy-command.sh "$config"
grep -q ' build --pull frontend' "$MOCK_LOG"
grep -q -- '-p dsai-test-command-frontend' "$MOCK_LOG"
echo 'PASS: shared command supports another service without a repo-specific deploy helper'

new_site command-wrong-branch
export MOCK_BRANCH=other
expect_failure bash /workspace/scripts/vm-deploy-command.sh "$config"
[[ ! -s "$MOCK_LOG" ]]
echo 'PASS: shared command rejects the wrong local branch'

new_site command-untracked
export MOCK_DIRTY=2
expect_failure bash /workspace/scripts/vm-deploy-command.sh "$config"
[[ ! -s "$MOCK_LOG" ]]
echo 'PASS: shared command protects untracked work'

new_site command-dirty
export MOCK_DIRTY=1
expect_failure bash /workspace/scripts/vm-deploy-command.sh "$config"
[[ ! -s "$MOCK_LOG" ]]
echo 'PASS: shared command protects tracked local changes'

new_site command-fetch-failed
export MOCK_FETCH_FAIL=1
expect_failure bash /workspace/scripts/vm-deploy-command.sh "$config"
[[ ! -s "$MOCK_LOG" ]]
grep -q '^IMAGE_TAG=old-release$' "$site/.env"
echo 'PASS: shared command stops on fetch failure before touching Docker'

new_site command-merge-failed
export MOCK_MERGE_FAIL=1
expect_failure bash /workspace/scripts/vm-deploy-command.sh "$config"
[[ ! -s "$MOCK_LOG" ]]
grep -q '^IMAGE_TAG=old-release$' "$site/.env"
echo 'PASS: shared command stops on non-fast-forward merge without resetting work'

new_site command-build-failed
export MOCK_BUILD_FAIL=1
expect_failure bash /workspace/scripts/vm-deploy-command.sh "$config"
grep -q '^IMAGE_TAG=old-release$' "$site/.env"
! grep -q ' up ' "$MOCK_LOG"
echo 'PASS: shared build failure keeps the old container and environment tag'

new_site command-up-failed
export MOCK_UP_FAIL=1
expect_failure bash /workspace/scripts/vm-deploy-command.sh "$config"
grep -q '^IMAGE_TAG=old-release$' "$site/.env"
[[ "$(cat "$site/.deploy/previous-release")" == old-release ]]
[[ -s "$site/.deploy/attempted-release" && ! -f "$site/.deploy/current-release" ]]
echo 'PASS: shared unhealthy release records rollback state without persisting its tag'

new_site command-locked
(
  exec 8>"$site/.git/deploy.lock"
  flock -n 8
  expect_failure bash /workspace/scripts/vm-deploy-command.sh "$config"
)
[[ ! -s "$MOCK_LOG" ]]
echo 'PASS: shared command uses the same release lock as existing helpers'

command_path="$fixture/installed commands/deploy-web"
bash /workspace/scripts/install-vm-deploy-command.sh "$command_path"
[[ "$(stat -c %a "$command_path")" == 700 ]]
cmp -s /workspace/scripts/vm-deploy-command.sh "$command_path"
chmod 600 "$command_path"
bash /workspace/scripts/install-vm-deploy-command.sh "$command_path"
[[ "$(stat -c %a "$command_path")" == 700 ]]
echo 'PASS: command installer is executable and idempotent'

printf '# Existing shared command\n' > "$command_path"
command_before="$(sha256sum "$command_path")"
expect_failure bash /workspace/scripts/install-vm-deploy-command.sh "$command_path"
[[ "$command_before" == "$(sha256sum "$command_path")" ]]
echo 'PASS: command installer preserves a different existing command'

printf '# Symlink destination\n' > "$fixture/original-command"
ln -s "$fixture/original-command" "$fixture/deploy-web-link"
link_before="$(sha256sum "$fixture/original-command")"
expect_failure bash /workspace/scripts/install-vm-deploy-command.sh "$fixture/deploy-web-link"
[[ "$link_before" == "$(sha256sum "$fixture/original-command")" ]]
echo 'PASS: command installer preserves existing symbolic links'
