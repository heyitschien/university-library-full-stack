# Project Tech Stack (Quick Reference)

Authoritative details live in `docs/architecture.md/tech-stacks.md`. This file is a concise reminder for day-to-day work.

## Runtime & Framework
- **Next.js (App Router)** + **TypeScript**
- **Server Components** by default; Client Components only for interactivity.

## UI & Styling
- **Tailwind CSS**
- **Shadcn UI** primitives in `src/components/ui/*`
- Fonts loaded via Next font; global providers only in `src/app/layout.tsx`

## Forms & Validation
- **React Hook Form**
- **Zod** with `@hookform/resolvers`
- Schemas in `src/lib/validations/*` + `defaultValues`

## Authentication & Security
- **NextAuth (Auth.js)**
- **bcryptjs** for password hashing
- **Upstash Redis + ratelimit** for throttling sensitive endpoints

## Data & Server
- **Drizzle ORM** (Postgres) (planned/when needed), schema in `database/schema.ts`
- **Server actions** in `src/lib/actions/*`

## Media & Uploads
- **ImageKit** with `imagekitio-next` client and server SDK for auth params
- Store `filePath` in entities (e.g., users)

## Notifications & Feedback
- **sonner** toasts

## Conventions & Tooling
- ESLint + Prettier + Tailwind plugin
- Conventional commits; PRs with intent, screenshots, and notes on config changes

## Handy Commands
- Dev: `npm run dev`
- Build: `npm run build` + `npm run start`
- Lint: `npm run lint`
