# Release preparation record — 6 November 2026

Owner: repository maintainer; production approver/operator still to be assigned.
Scope: prepare a static conference announcement site for review and VM deployment.
Preparation does not approve release or confirm the conference content.

## Implementation prepared

- GitHub feature branch `codex/production-readiness` based on main; preserved the
  pre-existing Docker/README work. No GitLab migration.
- CI for quality/export/security and Linux container/browser checks; PR template,
  agent agreement, safe environment template and working/deployment documentation.
- Single static Nginx production service; unprivileged/read-only runtime, health,
  bounded logs, loopback binding, release image tags, explicit rollback helpers.
- Manual Plesk publish after checks; no automatic VM deployment. This changes the
  old push-main Plesk publication behavior and must be included in PR review.
- Dependency fixes and the remaining development-only advisory are in security.md.

## Local verification

| Check | Evidence |
| --- | --- |
| Reproducible install | `npm ci --no-fund` on Windows; Docker build uses clean `npm ci` on Node 22 Linux |
| Quality/build | `npm run check`: workspace lint/TypeScript and production builds pass |
| Export | 28 HTML files, 2,368 local references; no missing linked routes/assets |
| Audit | Production tree: 0 findings; full tree: 8 moderate entries from the development-only minimatch chain, 0 high/critical |
| Release scripts | Bash syntax passes; 7 isolated mocked scenarios: healthy tag/previous tag, rollback, build failure, unhealthy release, wrong SHA, dirty checkout, concurrent release |
| Nginx runtime | Real Linux image builds; non-root read-only container becomes healthy; `nginx -t` passes |
| Browser | 4 Chromium tests pass across desktop/mobile: every published route, direct refresh, navigation, loaded images, no horizontal overflow/page errors; missing page 404 and hidden .env denied |
| HTTP smoke | Homepage, representative interior pages, CSS/JS/fonts/images and 404 pass through Nginx |
| Config / CI | Compose/workflow YAML and Bash syntax pass. [PR #1](https://github.com/KitsanapongP/DSAI-Conference-2027/pull/1) is a draft; [CI for application/config commit eff0df2](https://github.com/KitsanapongP/DSAI-Conference-2027/actions/runs/42212099757) passed quality and container. Follow-up updates pin Ubuntu 24.04 and current official Action releases after the runner warned about the old Action runtime; check the latest PR run before merge |
| VM access | TCP port 22 reachable at 10.198.110.63; strict SSH stopped because no trusted ED25519 host key is known. No host key was auto-accepted; no VM command/deployment ran |

The first runtime test caught an Nginx PID path on the read-only filesystem;
the Dockerfile now sets the PID path to /tmp and the subsequent runtime tests pass.
Mocked release-script checks do not prove GitHub SSH/sudo/Docker behavior on the actual VM.

## Required before production

- [ ] PR reviewed and CI for the approved commit passes; merge to the approved main branch.
- [ ] Configure GitHub required checks/review branch protection in repository Settings (repository admin). Read-only inspection confirmed main is not protected and the repository has no rulesets.
- [ ] Confirm SSH port, trusted host fingerprint, VPN/access and key or interactive login for `project@10.198.110.63`.
- [ ] Inspect actual VM OS/architecture/RAM/disk, sudo/Docker, port availability and other hosted sites.
- [ ] Set up read-only deploy key, clone and protected .env/site config on the VM.
- [ ] Confirm domain, DNS, proxy location/upstream, TLS certificate/renewal, firewall and intended public/VPN access.
- [ ] Assign reviewer, release approver, deploy operator, HTTPS/monitoring and incident owners.
- [ ] Organisers approve date (currently 10–12 Nov 2027), contact addresses, branding and announcement-only scope.
- [ ] Review development-only dependency advisory and the container/base-image patch/scanning policy.
- [ ] Rehearse release/rollback in staging using retained image tags and compatible config.
- [ ] After explicit deployment authorization: release approved SHA, HTTPS smoke, direct page refresh, desktop/mobile and external access checks; record results.

## Production release record (fill with actual evidence)

| Field | Value |
| --- | --- |
| Approved commit / PR | Pending review |
| CI run / reviewer / approver | Pending |
| Release image tag / image ID or digest | Pending VM build; do not substitute the local test image |
| Previous working image / matching config | Pending staging rehearsal |
| Domain / HTTPS owner / renewal check | Pending |
| Deploy operator / Asia-Bangkok release time | Pending |
| Post-deploy smoke / UAT | Not performed |
| Rollback rehearsal / incident contact | Pending |
