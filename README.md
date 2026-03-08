# Note App — Frontend

A note-taking app built as a job assessment. Consumes the Django REST API in `note-app-turbo-backend`.

## Tech Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Runtime | React 19 |
| Linting | ESLint 9 |

## App Routes

| Route | Description |
|---|---|
| `/` | Redirects to `/notes` if logged in, else `/login` |
| `/login` | Login page |
| `/signup` | Signup page |
| `/notes` | Main dashboard (protected) |
| `/notes/[id]` | Note editor (protected) |
| `/notes/new` | Create new note (protected) |

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Root redirect
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   ├── notes/
│   │   ├── page.tsx          # Notes dashboard
│   │   ├── new/page.tsx      # Create note
│   │   └── [id]/page.tsx     # Edit note
│   └── api/auth/
│       ├── login/route.ts    # Sets httpOnly JWT cookie
│       └── logout/route.ts
├── components/
│   ├── LoginForm.tsx
│   ├── SignupForm.tsx
│   ├── NoteCard.tsx
│   ├── NoteEditor.tsx
│   └── NewNoteButton.tsx
└── lib/
    ├── api.ts                # All API calls (never fetch directly in components)
    └── utils.ts              # cn() utility (clsx + tailwind-merge)
```

## Getting Started

### Prerequisites

- Node.js >= 20
- The backend running at `http://localhost:8000` (see `note-app-turbo-backend`)

### Setup

```bash
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Lint

```bash
npm run lint
```

### Build

```bash
npm run build
npm run start
```

## Note Categories & Colors

| Category | Color |
|---|---|
| Personal | `#78ABA8` |
| School | `#FCDC94` |
| Random Thoughts | `#EF9C6680` |

## Use of AI

Claude Code (Anthropic) was used throughout this project to assist with:

- Scaffolding the file structure from the `CONTEXT.md` spec
- Converting all inline styles to Tailwind CSS classes
- Implementing responsive layouts (mobile category tabs, responsive grid)
- Writing auth redirect logic (`/` → `/notes` or `/login` via server-side cookie check)
- Fixing ESLint errors (ref-during-render rule)
- Debugging API error formatting (nested `{ error: { field: [...] } }` shape)

All business logic, design decisions, and final review were done by the developer.
