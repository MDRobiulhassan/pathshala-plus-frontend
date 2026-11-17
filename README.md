# Pathshala Plus

Pathshala Plus is a learning platform frontend for students and teachers. It
provides a public landing page, authentication flows, student dashboards,
profile management, and a structured question-bank experience for browsing
subjects, units, exam sessions, shifts, and questions.

## Features

- Public landing page with product overview, pricing, and quick actions
- Login, signup, password-reset, and authentication-callback flows
- Cookie-based authentication with server-side route protection
- Student dashboard with recent tests and test-attempt information
- Profile and security settings
- Question-bank browsing and practice/test flows
- Responsive dashboard UI built with reusable Radix UI components
- Automatic API token refresh and user-friendly API error messages

## Tech Stack

- [Next.js](https://nextjs.org/) 16.2.3 with the App Router
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 4
- [Axios](https://axios-http.com/) for API communication
- [TanStack Query](https://tanstack.com/query) for server-state management
- [Radix UI](https://www.radix-ui.com/) and [shadcn/ui](https://ui.shadcn.com/)
- [Zod](https://zod.dev/) and React Hook Form for validation

## Prerequisites

- Node.js 20 or newer
- npm 10 or newer
- A running Pathshala Plus backend API

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a local environment file named `.env.local`:

   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api/v1
   ```

   `NEXT_PUBLIC_API_BASE_URL` is optional. If it is not set, the frontend uses
   `http://localhost:8080/api/v1`.

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

The API uses cookies for authentication, so the backend must allow credentialed
requests from the frontend origin.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server with Webpack |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

## Project Structure

```text
app/                 App Router pages and layouts
components/          Reusable UI and feature components
hooks/               Shared React hooks
lib/api/             Domain-specific API clients
lib/                 Shared configuration, validation, and utilities
public/               Static assets
middleware.ts        Protected-route authentication guard
```

The API layer is organized by domain:

- `lib/api/auth.ts` — authentication and password flows
- `lib/api/profile.ts` — profile and security operations
- `lib/api/question-bank.ts` — question-bank navigation
- `lib/api/test-attempt.ts` — practice and timed-test attempts
- `lib/api/client.ts` — shared Axios configuration and error handling

## Routes

### Public

- `/` — landing page
- `/auth/login` — login
- `/auth/signup` — account registration
- `/auth/forgot-password` — password reset

### Authenticated

- `/student` — student dashboard
- `/student/question-bank` — question-bank landing page
- `/student/profile` — student profile
- `/student/ai` — AI learning area
- `/student/duel` — speed duel area
- `/student/leaderboard` — leaderboard area
- `/student/tests` — mock-test area
- `/teacher` — teacher dashboard
- `/teacher/profile` — teacher profile

Routes under `/student`, `/teacher`, `/dashboard`, and `/profile` are guarded
by `middleware.ts` and redirect unauthenticated users to `/auth/login`.

## Code Quality

Before opening a pull request, run:

```bash
npm run lint
npm run build
```

Keep API access in the domain modules under `lib/api/`, reuse existing
components and hooks, and avoid committing environment files or credentials.

## Deployment

Build the application with:

```bash
npm run build
```

Run the production server with:

```bash
npm run start
```

Set `NEXT_PUBLIC_API_BASE_URL` to the deployed backend URL in the hosting
provider's environment configuration. Ensure the backend's cookie, CORS, and
HTTPS settings are configured for the deployed frontend domain.
