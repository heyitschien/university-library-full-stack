# Repository Guidelines

## Project Structure & Module Organization
The Next.js app lives in `src/app` with route segments and page components. Shared UI building blocks live in `src/components` (colocate styles, keep directories PascalCase). Reusable data helpers go to `src/lib`, configuration tokens in `src/constants`, and type definitions in `src/types`. Static assets (favicons, illustrations, fonts) belong in `public`. Documentation and product specs go in `docs`. Root-level configs (`next.config.ts`, `tailwind.config.ts`, `eslint.config.mjs`, etc.) define build tooling—update them deliberately and document changes in PRs.

## Build, Test, and Development Commands
Run `npm install` after pulling when dependencies change. Use `npm run dev` for a local Turbopack server with hot reload. `npm run build` produces an optimized production bundle; pair it with `npm run start` to smoke-test the output. `npm run lint` runs ESLint with Tailwind and Prettier integrations; ensure it passes before pushing.

## Coding Style & Naming Conventions
Write modern TypeScript/React function components and default to Server Components unless the feature needs interactivity (`"use client"`). Components, hooks, and utilities use PascalCase or camelCase to match the exported symbol. Keep files focused and colocate UI variants by feature. Tailwind CSS is the primary styling approach—prefer utility classes and shared variants created with `class-variance-authority`. Formatting is enforced by Prettier (`.prettierrc`) with 2-space indentation; rely on the formatter and avoid manual alignment. Never commit lint or type errors.

## Testing Guidelines
A formal automated test runner is not yet wired up. When introducing critical logic, include unit or integration coverage (Jest, Vitest, or Playwright) and document any new tooling in the PR. Name test files `*.test.ts` or `*.test.tsx` beside the code under test, and keep fixtures small. At minimum, run `npm run lint` and manually validate affected routes on multiple screen widths.

## Commit & Pull Request Guidelines
Follow the emerging conventional commit style (`feat:`, `fix:`, `chore:`, etc.), optionally scoping UI work (`feat(ui): …`). Use active, imperative language and focus each commit on a single change. PRs should summarize intent, list key changes, link issues, and call out migrations or configuration updates. Include screenshots or screen recordings for UI-visible work, and note follow-up tasks or known gaps to help reviewers plan next steps.
