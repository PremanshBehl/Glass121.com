# Contributing to Glass121

## Development

- Install deps: `npm install`
- Run dev server: `npm run dev`
- Type-check: `npm run type-check`
- Lint: `npm run lint`

## Conventions

- **Routing**: New routes go in `src/app/` under the correct route group.
- **UI components**: Put reusable UI in `src/components/` (feature folders).
- **Types**: Put domain types in `src/types/` and export via `src/types/index.ts`.
- **Data access**: API clients/utilities belong in `src/lib/`.
- **State**: Prefer `src/hooks/*` (and/or `src/context/*`) as the public surface. Avoid importing from `src/store/*` directly in UI code unless necessary.

## API routes

Route handlers return:

- `{ success: true, data: ... }`
- `{ success: false, error: string }`

