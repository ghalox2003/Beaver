# Beaver conventions

## Coding
- TypeScript strict. No `any`; use `unknown` and narrow.
- Function components only. One component per file, PascalCase filename (`ProCard.tsx`).
- Non-component files are camelCase (`formatPrice.ts`). Hooks start with `use` (`useAuth.ts`).
- Named exports for everything except pages and layouts, which use default exports.
- Tailwind for styling, using the existing palette tokens (forest, sage, cream, paper). No inline style objects, no extra CSS files.
- Icons from `lucide-react` only.
- No `console.log` left in committed code.
- Env vars go through `src/lib/env.ts`, never `import.meta.env` directly in components. Public ones must start with `VITE_`. Never put secrets in the frontend.

## Folder responsibilities
- `pages/`      one file per route. Compose features and components, hold no business logic.
- `layouts/`    shells that wrap routes (public, auth, dashboard).
- `components/` generic UI reused across features (Button, Modal, EmptyState).
- `features/`   domain code, one folder per domain: `auth/`, `jobs/`, `professionals/`, `reviews/`, `map/`.
- `services/`   API calls only. No React in here.
- `lib/`        setup and wrappers for third-party stuff (env, API client).
- `hooks/`      hooks shared across features. Feature-specific hooks live inside the feature.
- `types/`      shared TypeScript types.
- `data/`       static data and temporary mock data (delete mocks once the real API exists).
- `utils/`      small pure helper functions.

## Feature module convention
Each domain gets one folder under `features/`:

    features/jobs/
      components/   UI only used by this feature (JobCard.tsx)
      hooks/        useJobs.ts
      services/     jobsApi.ts
      types.ts
      index.ts      the only file other code imports from

Rules:
- Other code imports from `features/jobs`, never from its inner files.
- A feature never imports another feature's inner files. Share through `types/` or `components/`.
- Move something to `components/` only when a second feature needs it.
- Create a feature folder only when you build that feature. No empty scaffolding.

## Workflow
- One feature per commit. Message format: `feat: ...`, `fix: ...`, `chore: ...`.
- Before every commit: `npm run lint` and `npm run build` must pass.
- Update the README checklist in the same commit as the work.
