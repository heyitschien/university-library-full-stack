# Local Rules and Guardrails

This document defines the local rules I (Cascade) follow every session to avoid stack drift and keep implementation consistent.

Source of truth for the stack: see `docs/architecture.md/tech-stacks.md` and repository guidelines in `AGENTS.md`.

## Stack Canon (do not drift)
- **Framework**: Next.js App Router + TypeScript. Prefer Server Components; add "use client" only when interactivity is required.
- **UI**: Tailwind CSS + Shadcn UI primitives in `src/components/ui/`.
- **Forms**: React Hook Form + Zod via `@hookform/resolvers`.
- **Validation**: Zod schemas in `src/lib/validations/*`, shared by client and server.
- **Auth**: NextAuth (Auth.js) with credentials; bcryptjs for hashing; Upstash for rate limiting.
- **Data**: Drizzle ORM (Postgres) where persistence is needed (align with `database/` plan).
- **Uploads**: ImageKit, direct browser uploads authenticated via `/api/imagekit`; store ImageKit `filePath`.
- **Feedback**: `sonner` for toasts.

## Route & Layout Rules
- **Route groups**: `(root)` hosts app UI and shared layout (Header/bg). `(auth)` for auth pages. `(admin)` reserved for admin.
- **Global layout**: `src/app/layout.tsx` only sets fonts/providers and toaster.
- **Redirections**: Temporary redirects live at route level; remove when not needed.

## Client/Server Boundaries
- Only pass serializable data from Server → Client components.
- If a page passes a Zod schema/JSX to a client component, make the page a Client Component (or move the schema usage into a client wrapper).

## Forms & Validation
- Zod is mandatory. Define types via `z.infer<typeof schema>`.
- Default values in the same module (`defaultXValues`) for RHF initialization.
- Show Shadcn `FormMessage` for errors; never inline ad‑hoc validation.

## Components & Structure
- Reusable UI in `src/components/*`; primitives in `src/components/ui/*`.
- Field metadata/consts in `src/constants/*` (e.g., `auth.ts`).
- Helpers, server actions, config in `src/lib/*`.
- Types in `src/types/*`.

## Uploads
- Client: `ImageKitProvider` + `IKUpload` or a thin wrapper component.
- Server: `/api/imagekit` returns `getAuthenticationParameters()` using server SDK and private key.
- Store `filePath` (not raw bytes) with the entity (e.g., `users.universityCardPath`).
- Add rate limiting to upload/auth endpoints when backend is wired.

## Dependencies Policy
- Prefer existing stack libs. New UI/form/validation/state libraries require explicit approval.
- Pin versions compatible with the current Next.js major.
- No experimental additions without a brief ADR.

## Code Quality & Tooling
- ESLint + Prettier must pass. Tailwind utility-first.
- Strict TS; avoid `any`. Add minimal types to callback parameters.
- Conventional commits. Small, focused PRs with screenshots for UI.

## Security & Ops
- `.env*` files are gitignored. Use `NEXT_PUBLIC_` only for safe public config.
- Rate-limit auth and upload endpoints (Upstash).
- Handle errors with friendly client toasts and minimal server detail.

## Session-Start Checklist (for Cascade)
- Review `AGENTS.md` and this doc.
- Verify forms use RHF + Zod + Shadcn.
- Check route groups and client/server boundaries.
- Confirm no new deps violate policy.
- Ensure uploads use `/api/imagekit` authenticator (when applicable).

## Change Control
- For any deviation from these rules, write a short ADR and link it in the PR.
