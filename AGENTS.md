# Project working agreement

- Read README.md and docs/development-workflow.md before changes. For web code also read apps/web/AGENTS.md and relevant installed Next.js docs.
- Keep GitHub `origin` and target `main` unless the user specifies otherwise. Work on `codex/<task>` branches; fetch and inspect the base. Preserve existing local work. Do not reset or force-push to bypass conflicts.
- Use npm workspaces and the root package-lock.json. Node 22 is the CI/container baseline; Node 24 is supported locally. Use npm ci; do not use --force/--legacy-peer-deps as a shortcut.
- Acceptance for release preparation: production export and links valid, dependency gate passes, actual Nginx container and desktop/mobile smoke pass, deployment/rollback documented. Record unverified infrastructure honestly.
- Run npm run check and npm run audit. For runtime/deployment changes install Chromium and run npm run test:container. Tests use a separate local container; do not point E2E at production.
- The production site is static Nginx only. The API is a local scaffold and MariaDB is not connected. Do not add a database, authentication, API deployment or guessed conference details without scope.
- Keep .env files, credentials, private keys, build output, test reports and real personal data out of Git and Docker contexts. Keep safe variable names/defaults in .env.example.
- Changes go through review and CI before release. Push, merge, publish to Plesk and deploy to the VM are distinct actions. Preparation alone does not authorize a production deployment.
- Update docs with config/scripts; record exact checks, limitations, content approval, HTTPS ownership and rollback evidence. Do not claim UAT or production success from a build/healthcheck.
