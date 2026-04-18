# Glass121 Architecture

## Goals

- Keep **routing** in `src/app/` (Next.js App Router).
- Keep **UI** in `src/components/` (feature-based folders).
- Keep **state** behind hooks/context facades (`src/hooks/`, `src/context/`) even if the implementation uses Zustand.
- Keep **data access** in `src/lib/` (API clients, endpoints, error handling).
- Keep **domain types** in `src/types/`.

## Folder map

- `src/app/`: Route groups and API routes
  - `src/app/(marketplace)`: Public marketplace pages + layout
  - `src/app/(auth)`: Auth pages + layout
  - `src/app/(dashboard)`: Dashboard pages + layout
  - `src/app/api/`: Backend routes (Next.js route handlers)
- `src/components/`: Reusable UI components, grouped by feature
- `src/lib/`: Shared utilities (API client, endpoints, error helpers)
- `src/types/`: TypeScript types for domain + API responses
- `src/data/`: Mock/static data sources used by API routes and UI
- `src/hooks/`: App-facing hooks (prefer importing these over stores directly)
- `src/context/`: Providers + context hooks
- `src/store/`: Zustand implementation details (used by hooks/context)

## Routing conventions

Route groups don’t affect URLs; they only organize the code:

- `(marketplace)` contains `/`, `/products`, `/search`, `/rates`, `/vendors`, `/partners`, `/cart`, `/checkout`, `/estimates`
- `(auth)` contains `/login`, `/signup`
- `(dashboard)` contains `/dashboard`

## Data access conventions

- Use `src/lib/api.ts` for fetch wrappers and consistent error handling.
- Use `src/app/api/*` for server routes; keep responses shaped as:
  - `{ success: true, data: ... }` or `{ success: false, error: string }`

