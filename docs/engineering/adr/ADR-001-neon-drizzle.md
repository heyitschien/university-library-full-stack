# ADR-001: Adopt Neon Postgres with Drizzle ORM

- Status: Proposed
- Date: 2025-10-05

## Context
We need a scalable, serverless-friendly relational database for the Next.js App Router project. Requirements include type-safe access, straightforward migrations, and compatibility with server components/server actions. The team’s Engineering Local Rules and Tech Stack reference already point to Postgres with Drizzle.

## Decision
- Use Neon (managed Postgres) for hosting, leveraging HTTP driver for serverless compatibility.
- Use Drizzle ORM with the `neon-http` driver for type-safe schema and queries.
- Manage schema in code (`database/schema.ts`) and migrations with `drizzle-kit`.
- Standardize environment variable `DATABASE_URL` with `sslmode=require`.
- Establish a Neon branch-per-environment strategy: `dev`, `preview`, `prod`.

## Consequences
- Positive:
  - Strong typing across schema and queries.
  - Simple, code-first migrations committed to the repo.
  - Serverless-ready connection model (no manual pooling).
  - Easy environment isolation via Neon branches.
- Negative:
  - Extra step to learn Drizzle migration conventions.
  - Need to enforce disciplined schema evolution in PRs.
- Follow-ups:
  - Add `database/schema.ts`, `src/lib/db.ts`, `drizzle.config.ts`.
  - Add CI checks (future) to ensure migrations up-to-date for PRs.
  - Consider role-based access in prod and audit logging later.

## References
- Drizzle ORM: https://orm.drizzle.team
- Neon serverless: https://neon.tech
- Internal docs: `docs/architecture.md/database-implementation.md`, `docs/engineering/local-rules.md`, `docs/engineering/tech-stack.md`
