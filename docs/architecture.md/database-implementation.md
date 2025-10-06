# Database Implementation Plan: Neon Postgres + Drizzle ORM

## Overview
This document specifies the end-to-end plan to add a Postgres database using Neon and Drizzle ORM to the Next.js app. It covers stack choices, directory layout, environment variables, dependencies, migration workflow, Neon branching strategy, and validation/rollback.

## Goals and Constraints
- Strong typing end-to-end (TypeScript, type-safe schema/queries).
- Serverless-friendly DB access suitable for Next.js server components and server actions.
- Simple, repeatable migration workflow.
- Clear separation of architecture docs (this file) and decision trace (ADR).

## Stack Summary
- Database: Postgres (managed by Neon).
- Driver: `@neondatabase/serverless` (HTTP driver).
- ORM: `drizzle-orm` with `neon-http` driver.
- Migrations: `drizzle-kit`.

## Directory and Files to Add
- `database/schema.ts` — Drizzle schema (tables, enums, relations).
- `src/lib/db.ts` — Neon client + Drizzle instance for runtime usage.
- `drizzle.config.ts` — Drizzle Kit configuration (schema path, out dir, DB URL).
- `drizzle/` — Generated SQL migration files (auto-created by drizzle-kit).
- Optional: `database/seed.ts` — Seed script for local/dev data.

## Environment Variables
- Required:
  - `DATABASE_URL=` Neon connection string. Must include `sslmode=require`.
- Optional:
  - `DRIZZLE_DATABASE_URL=` if you prefer isolating the URL used by drizzle-kit.

Examples for `.env.local` (do not commit):
```
DATABASE_URL=postgres://<user>:<pwd>@<host>/<db>?sslmode=require
```

## Dependencies
- Runtime: 
  - `drizzle-orm`
  - `@neondatabase/serverless`
  - `dotenv` (for local scripts like seeding)
- Dev:
  - `drizzle-kit`

Add NPM scripts in `package.json`:
```json
{
  "scripts": {
    "drizzle:generate": "drizzle-kit generate",
    "drizzle:migrate": "drizzle-kit migrate",
    "db:seed": "tsx database/seed.ts"
  }
}
```

## Code Stubs (to be implemented later)
- `src/lib/db.ts`:
```ts
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });
```

- `drizzle.config.ts`:
```ts
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './database/schema.ts',
  out: './drizzle',
  dbCredentials: { url: process.env.DATABASE_URL! }
});
```

- `database/schema.ts` (example starter):
```ts
import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  fullName: text('full_name').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

export const books = pgTable('books', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  author: text('author').notNull(),
  totalCopies: integer('total_copies').notNull().default(1),
  createdAt: timestamp('created_at').defaultNow().notNull()
});
```

## Neon Setup
1) Create a Neon project and primary database.
2) Create a `dev` branch (for local dev), `preview` branch (for PRs), and `prod` branch (for production).
3) For each branch, copy its connection string and set as the corresponding environment variable on each environment:
   - Local `.env.local`: `DATABASE_URL` → dev branch.
   - Preview deployment: `DATABASE_URL` → preview branch.
   - Production: `DATABASE_URL` → prod branch.
4) Ensure the URL includes `sslmode=require`.

## Migration Workflow
- Author schema changes in `database/schema.ts`.
- Generate migration files: `npm run drizzle:generate` (creates SQL into `./drizzle`).
- Apply to target DB: `npm run drizzle:migrate`.
- Optional: Seed with `npm run db:seed`.

Notes:
- Only commit generated migrations; never commit secrets.
- Each PR that changes schema should include generated migration files and execution notes.

## Local vs Cloud Development
- Preferred: use Neon `dev` branch for local development to mirror production constraints (SSL, latency). This avoids local Postgres setup.
- Alternative: Dockerized local Postgres if desired; keep the same Drizzle config and swap `DATABASE_URL`.

## Security and Ops
- Secrets never committed; `.env*` are gitignored.
- Use `NEXT_PUBLIC_` prefix only for values safe for the client (not the DB).
- Consider read-only roles in prod for safer admin tooling if required later.

## Validation Plan
- After initial setup:
  - Run `npm run drizzle:generate` and `npm run drizzle:migrate` without errors.
  - Smoke test a simple query in a server action using `db` (e.g., `db.select().from(users).limit(1)`).
  - Confirm tables exist in Neon dashboard.

## Rollback Strategy
- Drizzle migrations are forward-only by default. To revert:
  - Create a new migration that undoes the undesired change (preferred).
  - For early development, you can reset the Neon branch (delete and recreate) if no data needs preservation.

## Task Checklist (Tomorrow)
- Install deps; add scripts to `package.json`.
- Create `drizzle.config.ts`, `src/lib/db.ts`, `database/schema.ts`.
- Generate first migration; migrate against Neon `dev`.
- Optional: create `database/seed.ts` and seed dev data.
- Add a small server action to validate connectivity.
- Document any schema decisions in a follow-up ADR if they are significant.
