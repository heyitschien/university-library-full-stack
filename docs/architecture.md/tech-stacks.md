The Build: A Production-Grade University Library Management System
====================================================================================================

The build—a production-grade University Library Management System consisting of two interconnected applications (a public-facing app and an admin interface) tied together into a monorepo—utilizes a modern and robust tech stack.

Core Frameworks, Language, and Architecture
---------------------------------------------------------

### Next.js

Next.js (Next.js 15) is used as the React framework for building high-quality web applications. The project utilizes the App Router.

### React

React is the underlying library powering the application interfaces.

### TypeScript

TypeScript is used for industry-standard development and scalability, providing numerous benefits.

### Monorepo Architecture

The project structure ties two apps (the user platform and the admin panel) seamlessly together.

Databases and Data Management
-----------------------------------

### PostgreSQL

PostgreSQL is used as the world's most advanced open-source relational database.

### Neon

Neon is a service providing a serverless, fast, Edge-ready PostgreSQL database built to scale. Neon allows for Git-like database management using branches.

### Drizzle (ORM)

Drizzle (ORM) is described as the "hottest ORM right now," and is used to make database interactions faster and simpler, and to power up the PostgreSQL database. Drizzle is essential for declaring schemas and generating SQL migrations.

### Drizzle Kit

Drizzle Kit is used for configuration and managing database migrations.

Styling and UI/UX
---------------------------

### Tailwind CSS

Tailwind CSS is the preferred method of styling applications, offering utility classes for full styling flexibility.

### Shadcn/ui (shaten)

Shadcn/ui (shaten) is a component library that works with Tailwind CSS, allowing developers to use pre-built components and style them to their liking.

### react-colorful

react-colorful is used to create the Color Picker component for selecting book cover colors.

Authentication, Security, and Optimization
---------------------------------------------

### NextAuth.js (Auth.js/O.js)

NextAuth.js (Auth.js/O.js) is used for implementing open-source, industry-standard authentication.

### bcrypt.js

bcrypt.js is used to encrypt/hash passwords for secure storage and comparison during login.

### Upstash Redis (Appstash)

Upstash Redis (Appstash) is a serverless Redis database used for efficient caching, low latency data storage, and session management.

### Upstash Rate Limit

Upstash Rate Limit is used for rate limiting authentication pages (sign-in/sign-up) to prevent DDOS attacks.

### Next Server (after function)

Next Server (after function) is a Next.js feature used to execute scheduled work (like updating user activity) after a response is finished, without blocking the UI.

Media, Assets, and Workflows
---------------------------------

### Image Kit

Image Kit is used for real-time media processing APIs, asset management, offering free storage, dynamic transformations, and streaming capabilities. It is utilized for optimizing and transforming images and videos for any device.

### Upstash Workflows (QStash)

Upstash Workflows (QStash) is used for building detailed and durable automated workflows, managing multi-step tasks, and sending custom notifications (like welcome emails, due date reminders, and activity checks).

### Resend

Resend is an email API used to send out emails, often integrated with Upstash Workflows, and allowing emails to be crafted using React components.

Utility and Development Tools
-----------------------------------

### Zod

Zod is used alongside React Hook Form for schema validation to ensure the fields are structured and filled correctly.

### React Hook Form

React Hook Form is used for managing form state and validation.

### ESLint and Prettier

ESLint and Prettier are used to maintain a clean, scalable, and well-structured codebase.

### dayjs (DJs)

dayjs (DJs) is a library used for date management, specifically calculating book due dates.

### TSX

TSX is used to run the standalone database seeding script.
