# Contributing Guide

## Setup
- Node LTS, `npm install`
- Dev server: `npm run dev`
- Lint: `npm run lint`
- Build: `npm run build` and `npm run start`

## Branching & Commits
- Branch from `main`; use short, descriptive names (e.g., `feat/auth-forms`)
- Conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, etc.

## Pull Requests
- Summarize intent and key changes
- List any config/env updates
- Include screenshots/screencasts for UI changes
- Call out follow-ups and known gaps
- Ensure ESLint passes; manually validate affected routes

## Code Standards
- Prefer Server Components, add `"use client"` only when needed
- Forms = RHF + Zod + Shadcn; schemas in `src/lib/validations/*`
- Shadcn primitives in `src/components/ui/*`; feature components in `src/components/*`
- Constants in `src/constants/*`; helpers/actions/config in `src/lib/*`
- Strict TypeScript; avoid `any`; keep components focused

## Env & Secrets
- `.env*` files are gitignored; never commit secrets
- Public client config must use `NEXT_PUBLIC_` prefix

## ADRs (Architectural Decisions)
- When introducing a new dependency/pattern, add a brief ADR (see `docs/engineering/adr/`)
- Link the ADR in the PR description
