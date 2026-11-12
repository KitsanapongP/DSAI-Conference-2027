# DSAI Conference 2027

Conference information website: Next.js App Router, TypeScript, Tailwind CSS.
Production is a static export served by Nginx. Fastify and the MariaDB driver
are local scaffolding; the current public website requires neither API nor database.

## Start development

Use Node.js 22 (CI/Docker baseline) or 24 and npm with the root lockfile.

```bash
npm ci
npm run dev:web
```

Open http://localhost:3000. Optional local API: `npm run dev:api`, then
http://127.0.0.1:4000/health (liveness only, no DB connection).

## Check a change

```bash
npm run check
npm run audit
npx --no-install playwright install chromium
npm run test:container
```

`check` runs workspace lint/type checks, builds both workspaces and verifies exported
links/assets. `test:container` requires Docker Engine/Desktop (Linux containers): it
builds the production image, waits for health, checks Nginx, runs Chromium desktop/mobile
tests and HTTP smoke on loopback port 3102, then removes only its test containers/network.
The test build deliberately gives public sources owner-only permissions and the
copied Nginx site config mode 600, reproducing a restrictive VM checkout. The
production image normalizes only its static webroot (directories 755/files 644)
and site config (644); Nginx stays non-root and the runtime stays read-only.
On Linux install browsers with `npx --no-install playwright install --with-deps chromium`.
CI runs these checks for PRs and the main/codex branches. See [workflow](docs/development-workflow.md).

## Docker preview

```bash
docker compose up -d --build --wait
docker compose ps
```

Open http://127.0.0.1:3002. To customize, copy `.env.example` to `.env` only if no
existing file is present, then edit `WEB_BIND_IP`, `WEB_PORT`, `IMAGE_TAG` and
`COMPOSE_PROJECT_NAME`. The old DSAI_BIND_ADDRESS/DSAI_PORT names are no longer used.

The image builds `apps/web/out/` and runs Nginx as a non-root user on internal port
8080 with a read-only root filesystem. Build needs internet access for base images,
npm dependencies and Google Fonts; the resulting runtime serves fonts/assets locally.
No local Node installation is required for this preview.

```bash
docker compose logs --tail=100 web
docker compose down
```

`down` stops/removes only the selected Compose project's containers/network. Do not
prune images/volumes across a shared VM. Rebuild after source changes; restart alone
does not update the static export. `next start` is not used for this static site.

## Release

Read [VM deployment and rollback](docs/deployment.md) and the
[readiness record](docs/release-readiness.md) before a real deployment.
Current target supplied by the owner: `project@10.198.110.63`.
SSH port, domain, HTTPS/proxy and release owners still require confirmation.
Do not put passwords, tokens or private keys in chat, Git, `.env.example` or images.

Merge, Plesk publish and VM deployment are separate operations. Plesk publishing is
manual from main after checks. VM deployment requires the full approved commit SHA
and a configured `.env`; it retains image tags for explicit rollback. No workflow
automatically deploys to the VM.

## Content and theme

- Navigation/routes: `apps/web/src/lib/site-content.ts`.
- Conference date/introduction/topics: `apps/web/src/lib/conference-2027.ts`.
- Home sections: `apps/web/src/app/page.tsx`.
- Interior pages: `apps/web/src/app/[...slug]/page.tsx` and `apps/web/src/components/reference-content.tsx`.
- Theme: four palette tokens at the top of `apps/web/src/app/globals.css`:
  `--theme-hero`, `--theme-cream`, `--theme-alt`, `--theme-footer`.
- Historical reference labels: `apps/web/src/lib/reference-2025.ts`; past event dates
  and venues are not published as current conference details.
- Image credits: `apps/web/public/images/ATTRIBUTION.md`.
- Typography: shared `--text-*`, `--leading-*` and `--weight-*` tokens in
  `globals.css`, based on Home. Body copy/lists use 16px with 1.85 line height;
  section/page headings share the responsive 31–45px scale, subheadings 20px,
  controls/navigation 13px and labels 10px. Hero and brand retain their own scale.

The homepage currently uses the owner's supplied sunset photograph of Phra
Mahathat Kaen Nakhon at Wat Nong Waeng, copied unchanged as
`apps/web/public/images/wat-nong-waeng-original.jpg` (11049 × 4672 px), with the
supplied `wat-nong-waeng-2400x1600.jpg` crop used on narrower screens. Lightweight
The current preview uses the supplied 2400 × 1600 crop on desktop as requested;
narrower screens use its lightweight WebP derivative. The wide original remains
available in the project. CSS preserves
the right edge and complete temple; CSS may trim surrounding sky/foreground. Credit/rights
provenance is recorded in ATTRIBUTION.md; the previous Commons image's CC license
does not apply to this replacement. It illustrates Khon Kaen, not a confirmed
conference venue. Contact retains Khon Kaen University and the original postal
address; only the email is replaced with `sarunap@kku.ac.th`, as supplied by the
site owner. No personal name or telephone number is published.

For replacement full-width hero banners, request 2400 × 960 px (approximately
2.5:1; the previous banner was 1983 × 793 px), with the landmark on the right
and space on the left for HTML text. Uncropped photographs can also be supplied
(the current sources include a 2400 × 1600 px crop); check responsive cropping on
desktop and mobile. Supply photographer credit and reuse permission with images.

The supplied preliminary CFP is published on `/dsai2027/call-for-papers`, with a
readable preview and original JPG download. Its six proposed topic groups are
marked subject to DS-AI confirmation. The date is 10–12 November 2027 and the
venue listed in the preliminary CFP is The Heritage Grand Khon Kaen Hotel and
Convention, Khon Kaen, Thailand. Submission portal, registration/payment,
committees, speakers and travel details remain pending. This is an announcement site, not an operational
registration or paper-submission system. Content/date/contact approval is a separate
release requirement.

See [API/Postman scope](docs/api.md), [dependency decisions](docs/security.md) and
[agent working agreement](AGENTS.md).
