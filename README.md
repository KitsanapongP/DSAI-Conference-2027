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

Conference dates, venue, speakers, registration, and submission information are placeholders until confirmed by the organisers.
