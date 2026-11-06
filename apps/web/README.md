# DSAI static website

Run workspace commands from the repository root. Start with `npm ci` and
`npm run dev:web`; build with `npm run build --workspace @dsai/web`.
Output is `apps/web/out/`, served by production Nginx through Docker Compose.
This project uses `output: "export"`; `next start` is not the deployment method.

See the root README and docs/development-workflow.md for validation, deployment,
content ownership and rollback. Read AGENTS.md here before editing Next.js code.
