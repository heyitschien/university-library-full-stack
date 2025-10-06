The building of the authentication forms for signing in and signing up is a core feature of the application, utilizing industry-standard and production-ready technologies for validation, reusability, and security.

### Core Form Technologies and Structure

The form building heavily relies on modern tooling to ensure validation and scalability:

*   **Technology Stack:** The application implements open-source authentication using **Next.js, TypeScript, and Next-Auth (Auth.js)**.
*   **Form Libraries:** The forms are managed using a combination of libraries regarded as industry standards:
    *   **Shadcn UI (shat nuui):** Provides components pre-built with necessary form infrastructure.
    *   **React Hook Form:** Used for managing form state and submission.
    *   **Zod:** Used for schema validation, ensuring data integrity.
*   **Reusable Component Design:** Both the sign-in and sign-up pages share a common, single **`AuthForm` component**.
    *   The `AuthForm` is designed to be fully reusable, accepting generic parameters (`T`) that extend field values from React Hook Form.
    *   It accepts props defining its nature, including `type` (either `sign_in` or `sign_up`), the Zod `schema` (for validation), `defaultValues`, and a custom `onSubmit` function.
    *   The structure of the fields is generated dynamically by mapping over the keys of the `defaultValues` passed into the component, preventing code duplication across the sign-in and sign-up pages.
    *   Since the form manages a lot of states, the `AuthForm` component requires the **`use client` directive** to be rendered on the client side.

### Sign-Up and Sign-In Validation Schemas

Validation logic, defined using Zod, dictates the required fields and constraints for each authentication type:

| Schema | Fields Required | Constraints/Details | Source |
| :--- | :--- | :--- | :--- |
| **Sign-Up (`signUpSchema`)** | `fullName` | String, minimum 3 characters. | |
| | `email` | String, valid email format. | |
| | `universityID` | Coerced number (takes a string and turns it into a number). | |
| | `universityCard` | Non-empty string; designated for the required image upload. | |
| | `password` | String, minimum length of 8 characters. | |
| **Sign-In (`signInSchema`)** | `email` | Standard email format. | |
| | `password` | Standard string. | |

### Specialized Form Components

The registration flow includes handling a specific media asset: the University ID card:

*   **Image Upload Component:** The `UniversityCard` field requires an image upload. This is handled by a reusable **`FileUpload` component** (originally `ImageUpload`).
*   This component integrates with **Image Kit** to handle media processing and storage securely.
*   The upload logic is client-side, using the `ikUpload` component. It tracks upload progress and applies file size validation (e.g., images limit of 20MB).
*   The uploaded file path is then passed back to the form via `field.onChange`.

### Authentication Flow and Server Actions

Client-side form submissions trigger secure server actions:

1.  **Sign-Up Process (`signUp` server action):**
    *   Checks the database for an existing user with the provided email.
    *   If the user is new, the password is **hashed** using `bcrypt.js`.
    *   A new user record is inserted into the PostgreSQL database (`users` table).
    *   Upon successful registration, the user is immediately signed in using the `signInWithCredentials` function.
    *   It triggers an automated **onboarding workflow** (using Upstash QStash).
2.  **Sign-In Process (`signInWithCredentials` server action):**
    *   Leverages the Next-Auth (`@/auth`) library's `signIn` method with the **credentials method**.
    *   The `credentials` provider authorizes the user by fetching the user record from the database using Drizzle and verifying the submitted password against the stored hash using `bcrypt.js`'s `compare` function.
3.  **Client Feedback:** Following submission, the `AuthForm` displays feedback via the **Shadcn `Toast` component** (indicating success, sign-in/sign-up errors, or validation issues). Successful authentication redirects the user to the homepage (`/`).
4.  **Sign Out:** Log out functionality is implemented via a server form action, accessible on the profile page, which calls the **`signOut` function** provided by Next-Auth (`@/auth`).

### Security Implementation (Rate Limiting)

To protect the authentication endpoints from abuse, **rate limiting** is applied directly to the server actions:

*   Rate limiting is implemented on both the **`signUp`** and **`signInWithCredentials`** server actions.
*   It utilizes **Upstash Redis** (specifically the `@upstash/ratelimit` library).
*   The limit is configured to allow a specific number of requests per time window (e.g., 5 requests per minute, which was changed from 1 per minute for testing) based on the user's IP address.
*   If the user exceeds the limit, the system returns a redirect to the **`/too-fast`** route, preventing further unauthorized attempts.