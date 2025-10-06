# Authentication Implementation Plan

This document describes how to implement the production-grade authentication experience for the University Library Management System using Next.js App Router, NextAuth.js (Auth.js), Shadcn UI forms, React Hook Form, Zod, and the supporting infrastructure described in the project spec and reference repository.

---

## Objectives

- Deliver reusable, accessible sign-in and sign-up experiences that match the design system.
- Centralize validation and business rules using Zod schemas shared across client and server.
- Support credential-based authentication today, while staying extensible for OAuth providers in future iterations.
- Integrate security controls (rate limiting, password hashing) and operational workflows (welcome emails, inactivity reminders).
- Provide a clear separation between client rendering, server actions, and the NextAuth session layer.

---

## High-Level Architecture

- **Next.js App Router** (`src/app/`) hosts route groups for `(root)`, `(auth)`, `(admin)`, etc. The `(auth)` group renders the authentication forms using the shared `AuthLayout`.
- **AuthForm component** (`src/components/auth/AuthForm.tsx`) is a `"use client"` component that:
  - Wraps Shadcn UI form primitives (`Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage`).
  - Initializes React Hook Form with a provided Zod schema via `zodResolver`.
  - Dynamically renders fields based on the passed configuration.
  - Displays submit button, helper text, and footer links.
  - Triggers toast notifications using Shadcn's `useToast` hook.
- **Form Config** lives in `src/constants/auth.ts`. Define the field metadata (label, type, placeholder, icon, optional `component` override for uploads).
- **Validation Schemas** live in `src/lib/validations/auth.ts`:
  - `signInSchema`: `{ email: z.string().email(), password: z.string().min(1) }`.
  - `signUpSchema`: includes `fullName`, `email`, `password` (min 8), `universityId` (coerced number with length validation), `universityCard` (non-empty string).
- **Server Actions** live in `src/lib/actions/auth.ts`:
  - `signUp(formData, ip)`: Validates with `signUpSchema`, checks for existing user, hashes password using `bcryptjs`, uploads universityCard path, creates user via Drizzle, enqueues onboarding workflow (Upstash QStash), signs the user in, returns result.
  - `signInWithCredentials(formData, ip)`: Validates with `signInSchema`, applies rate limit, calls NextAuth `signIn` with provider `credentials`, handles errors, returns status.
- **Rate Limiting**: Implement middleware using `@upstash/ratelimit`. Rate-limit by IP on both server actions (e.g., 5 requests/min). If limit exceeded, return a redirect to `/too-fast`.
- **NextAuth Configuration** (`src/app/api/auth/[...nextauth]/route.ts`):
  - Providers: `CredentialsProvider` only (for now) with authorize callback hooking into Drizzle/Neon.
  - Session strategy: `jwt` (default) or `database` depending on planned features. JWT simplifies edge deployments.
  - Callbacks: map session/user fields (id, role, name, avatar).
  - Events: trigger Upstash workflows (e.g., onboarding) if not handled in server action.
  - Use `authOptions` exported from `@/lib/auth` to share between API route and server actions (`signIn`, `signOut`).
- **Database**:
  - `users` table with fields: `id`, `fullName`, `email` (unique), `hashedPassword`, `universityId`, `universityCardUrl`, `role`, timestamps.
  - Upstash Redis stores rate limiting metadata and optionally session cache.

---

## Detailed Implementation Steps

### 1. Prepare Validation & Types
- Create `src/lib/validations/auth.ts` with Zod schemas and TypeScript types (`SignInValues`, `SignUpValues`). Export types for React Hook Form generics.
- Add a derived `defaultSignInValues` / `defaultSignUpValues` object for React Hook Form initialization.
- Ensure schemas are shared between client (for instant validation) and server (for trusted validation before DB interactions).

### 2. Build Shared AuthForm Component
- Create `src/components/auth/AuthForm.tsx`:
  - `"use client"` directive.
  - Accept props: `type: "sign_in" | "sign_up"`, `schema`, `defaultValues`, `onSubmit`, `fields` (array of field config), `submitLabel`, `helper`, `footerLink`.
  - Initialize `useForm` with `resolver: zodResolver(schema)`, `defaultValues`.
  - Render `Form` from Shadcn with mapped `FormField`s.
  - Each field uses `Input` component by default; allow overrides (for file upload component, using `Controller` from React Hook Form if needed).
  - Display error messages via `FormMessage`. On submit, call `toast` with success/error states.

### 3. File Upload Integration
- Create `src/components/auth/UniversityCardUpload.tsx` (client component) wrapping ImageKit upload widget (`ikUpload`).
  - Props: `value`, `onChange`, `label`, `helper`.
  - Validate file size (< 20MB) and type (image).
  - Provide progress indicator + ability to remove uploaded file.
  - `AuthForm` uses this component for `universityCard` field (via prop overrides).

### 4. NextAuth Setup
- Create `src/lib/auth/index.ts` exporting `authOptions` and helper wrappers:
  - Import `getServerSession`, `NextAuthOptions`, Drizzle client, `compare` from `bcryptjs`.
  - Configure `CredentialsProvider` with `authorize` that fetches user and verifies hashed password.
  - Include session and JWT callbacks to attach `user.id`, `role`, etc.
  - Add events or custom logic (if sign-up server action should revalidate).
- Add API route handler in `src/app/api/auth/[...nextauth]/route.ts` using `NextAuth(authOptions)`.
- Update middleware or server utilities (e.g., `src/middleware.ts`) if route protection is required.

### 5. Server Actions & Rate Limiting
- In `src/lib/actions/auth.ts`:
  - Initialize Upstash Ratelimit: `const limiter = new Ratelimit({ redis: redisClient, limiter: Ratelimit.slidingWindow(5, "1 m") });`
  - Helper `enforceRateLimit(ip: string, identifier: string)` used by both actions.
  - `signUp`: parse form data, rate-limit, check user existence, hash password, store user (Drizzle), optionally upload file if not already uploaded, call `signIn("credentials")`, return `ActionResult` with success flag and message.
  - `signInWithCredentials`: parse data, rate-limit, call `signIn`, handle `AuthError` codes, return `ActionResult`.
- Provide typed `ActionResult` union to inform client of next steps.

### 6. Wire Up Auth Pages
- Update `src/app/(auth)/sign-in/page.tsx` to use `AuthForm`:
  ```tsx
  import { signInSchema, defaultSignInValues } from "@/lib/validations/auth";
  import { signInWithCredentials } from "@/lib/actions/auth";
  import { signInFields } from "@/constants/auth";
  
  export default function SignInPage() {
    return (
      <AuthForm
        type="sign_in"
        schema={signInSchema}
        defaultValues={defaultSignInValues}
        fields={signInFields}
        submitLabel="Login"
        helper="Access the vast collection of resources and stay updated."
        footerLink={{ href: "/sign-up", label: "Register here" }}
        onSubmit={signInWithCredentials}
      />
    );
  }
  ```
- Perform similar wiring for `sign-up/page.tsx`, passing `signUpSchema`, `signUpFields`, `onSubmit={signUp}`.
- Ensure `AuthLayout` continues to provide layout and background, but avoid duplicating form logic there.

### 7. Client Feedback & Redirects
- `AuthForm` handles the promise returned from `onSubmit`:
  - On success, show toast (success) and redirect using `router.push("/")` or `Router.replace` depending on the form type.
  - On error, show toast (destructive variant) with message from server action.
- Add loading state to the submit button using React Hook Form's `formState.isSubmitting`.

### 8. Sign Out & Session Access
- Provide `signOut` button on profile page using NextAuth `signOut` helper.
- Create server utility `getCurrentUser()` that wraps `getServerSession(authOptions)` for use in protected server components and actions.

### 9. Testing Strategy
- Unit test schemas using Zod's `safeParse` to ensure validation rules.
- Integration test server actions with mocked Drizzle and NextAuth utilities.
- Playwright/React Testing Library tests for form submission (client validation & error display).

### 10. Deployment Considerations
- Ensure environment variables (Neon, ImageKit, Upstash, Resend, AUTH_SECRET) are configured in production.
- For edge deployments (Vercel Edge Runtime), use the `neon-http` driver and confirm `bcryptjs` usage (consider `bcryptjs` vs `bcrypt` for compatibility).
- Monitor rate-limiting limits and adjust as needed.

---

## Future Enhancements

- **OAuth Providers**: Extend NextAuth providers (Google, GitHub) by adding new provider configs and updating `AuthForm` to show social login buttons above the credentials form.
- **MFA**: Integrate TOTP or WebAuthn with additional schema steps.
- **Audit Logging**: Create `auth_logs` table to store sign-in attempts for admin insights.
- **Session Management**: Build an admin panel to invalidate user sessions via NextAuth adapter or Upstash key deletes.

---

## Directory Checklist

- `src/components/auth/AuthForm.tsx`
- `src/components/auth/UniversityCardUpload.tsx`
- `src/constants/auth.ts`
- `src/lib/validations/auth.ts`
- `src/lib/actions/auth.ts`
- `src/lib/auth/index.ts`
- `src/app/api/auth/[...nextauth]/route.ts`
- `src/app/(auth)/sign-in/page.tsx`
- `src/app/(auth)/sign-up/page.tsx`
- `src/middleware.ts` (if we add auth guards)

Each section above keeps implementation consistent with the reference repository while aligning to the project’s theme and production-readiness goals.
