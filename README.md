# report-tool-app

Web application for designing dashboards from SAP data in the browser.
Monorepo: pnpm workspaces + Turborepo.

## Structure

| Path              | Contents                                                            |
| ----------------- | ------------------------------------------------------------------- |
| `apps/web`        | Next.js (App Router) frontend: UI, SAP client, DuckDB-WASM          |
| `apps/api`        | NestJS backend: definition APIs, authorization, database (Drizzle)  |
| `packages/shared` | zod schemas and types shared by web and API (`@report-tool/shared`) |

SAP data never reaches the backend; it is processed only in the browser.

## Requirements

Node 24 (`.nvmrc`), pnpm 12 (`packageManager` field).

## Run

```sh
pnpm install
pnpm dev          # web on :3000, api on :3001
pnpm build
pnpm lint
pnpm typecheck
pnpm test         # unit tests (Vitest)
pnpm test:e2e     # Playwright, needs `pnpm exec playwright install` once
```

`pnpm --filter @report-tool/api db:generate` / `db:migrate` run drizzle-kit (needs `DATABASE_URL`).

## Environment variables

Copy `.env.example` to `.env` in each app. Never commit real values.

`apps/web` (public, bundled into the client):

- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase project for sign-in.
- `NEXT_PUBLIC_API_URL`: base URL of the API.

`apps/api` (server only):

- `DATABASE_URL`: Postgres connection string (Supabase).
- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_JWT_SECRET`: JWT verification and admin access.
- `WEB_ORIGIN`: the only origin allowed by CORS. Unset means no cross-origin access.
- `PORT`: local dev port (default 3001).

## Deploy

Two Vercel projects from this repo: `apps/web` (Next.js) and `apps/api`
(serverless function at `apps/api/api/index.ts`, routes rewritten in `apps/api/vercel.json`).
