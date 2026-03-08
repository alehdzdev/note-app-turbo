# Note App — Next.js Frontend Context

## Project Purpose

Note-taking app UI built as a job assessment, consuming a Django REST API.
Must match the provided Figma designs exactly.

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS (extended with design tokens below)
- SWR for data fetching
- React Hook Form + Zod for form validation
- TipTap for rich text editing
- Sonner for toast notifications
- JWT stored in httpOnly cookie via Next.js route handler

## Note Color based on category

- Personal: #78ABA8;
- School: #FCDC94;
- Random Thoughts: #EF9C6680;

## Fonts

- Inria serif for the title(h1,h2,h3)
- Inter for normal text

## Assets

- /src/assets/

## App Routes

- / → redirects to /notes if logged in, else /login
- /login → login page
- /signup → signup page
- /notes → main dashboard (protected)
- /notes/[id] → note editor (protected)

## API Base URL

NEXT_PUBLIC_API_URL=http://localhost:8000

## Component Rules

- All components in /components, one file per component
- Use cn() utility (clsx + tailwind-merge) for conditional classes
- All API calls go through /lib/api.ts — never fetch() directly in components
- Auth state managed via SWR hitting /api/v1/auth/me/ — no Redux/Context needed
- Every async state needs: loading skeleton, error state, empty state
