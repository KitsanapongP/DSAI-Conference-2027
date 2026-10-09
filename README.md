# DSAI Conference 2027

Starter monorepo for the DSAI Conference 2027 website and API.

## Stack

- Frontend: Next.js App Router, TypeScript, Tailwind CSS
- Backend: Fastify, TypeScript
- Database driver: MariaDB Connector/Node.js (`mariadb`), installed but not connected to a server
- Package management: npm workspaces with one root `package-lock.json`

## Structure

```text
apps/
  web/   Next.js conference site
  api/   Fastify API
```

## Get started

Use Node.js 20.9 or newer and npm. From the project root:

```bash
npm ci
npm run dev:web
```

The website runs at http://localhost:3000. In another terminal:

```bash
npm run dev:api
```

The API runs at http://127.0.0.1:4000. Check `GET /health` for a basic readiness response. The API does not attempt a database connection.

## Checks

```bash
npm run lint
npm run build
```

The site is a draft. Dates, fees, speakers, committee members, venues, and submission links are shown as pending until confirmed by the organisers.

## Website structure and theme

The site is a static export. `npm run build --workspace @dsai/web` creates deployable files in `apps/web/out/`. Every navigation item, including submenu pages, is generated as a static page.

- Edit navigation labels, routes, and page summaries in `apps/web/src/lib/site-content.ts`.
- Edit the four palette tokens at the top of `apps/web/src/app/globals.css` to change the theme across the whole site: `--theme-hero` (`#3E5879`), `--theme-cream` (`#F9F8F5`), `--theme-alt` (`#EDECE8`), and `--theme-footer` (`#213555`). Home sections alternate between the warm white and a slightly darker warm white after the hero.
- The home page sections are in `apps/web/src/app/page.tsx`: About, research topics, important dates, call for papers, program, registration, and venue information. About and Important Date are not separate navigation pages. The remaining pages share the template in `apps/web/src/app/[...slug]/page.tsx`.
- Page content for the remaining routes is in `apps/web/src/components/reference-content.tsx`. The historical research topics and milestone labels are retained in `apps/web/src/lib/reference-2025.ts` for editing, but past dates and other event details are not displayed on the website.

Pages with unconfirmed details show a short announcement placeholder. Update them as official conference information becomes available.
