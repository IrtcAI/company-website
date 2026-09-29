# CLAUDE.md

IRTC's company website: a pnpm monorepo with one Next.js 16 app in `apps/site` (App Router, React 19, TypeScript, plain CSS, Three.js). Deployed on Vercel. Site copy is in pt-BR, en and es; code, commits and docs prose follow the language already used in each file.

Read before non-trivial work:

- `docs/architecture.md`: rendering model, routing, 3D pipeline, analytics, Iris security.
- `docs/site-guide.md`: where content lives, tone of voice, facts that are still placeholders.
- `README.md`: env vars, commands, hosting.

## Commands

Run from the repo root (they proxy to `apps/site`):

```bash
pnpm dev          # dev server
pnpm build        # production build (use this + `pnpm start` for Lighthouse, never dev)
pnpm test         # Vitest
pnpm lint         # ESLint + Prettier check
pnpm typecheck    # tsc --noEmit
pnpm format       # Prettier write
pnpm knowledge    # regenerate the Iris knowledge index after content changes (needs OPENAI_API_KEY)
```

Single test file: `cd apps/site && pnpm exec vitest run tests/site.test.tsx`.

All five checks (`format`, `lint`, `typecheck`, `test`, `build`) must pass before committing.

## Map

- `app/`: routes. pt-BR home is `app/page.tsx`; en/es homes and every inner page live under `app/[locale]/`. Localized URLs (`/servicos`, `/es/nosotros`...) are rewritten to them by `lib/routes.ts` + `next.config.ts`.
- `layout/main.tsx`: the real root layout (re-exported by `app/layout.tsx`), CSS imports, splash, global metadata.
- `components/`: server components by default; interactive pieces are small `"use client"` islands (`site-header`, `shell-provider`, `home-hero`, `project-showcase`, `contact-form`, ...).
- `lib/`: data and rules. `content.ts` (UI copy), `services.ts`, `company.ts`, `copy/*`, `stats.ts`, `routes.ts`, `seo.ts`, `structured-data.ts`, `iris-policy.ts` (Iris system prompt and grounding), `knowledge/` (RAG index and retrieval; regenerate with `pnpm knowledge` after content edits), `analytics.ts`.
- `styles/`: one CSS file per area, imported in `layout/main.tsx`. Colors are `light-dark()` tokens in `styles/globals.css`.
- `scripts/`: generators for 3D posters, the world map and the About photos.

## Rules that are easy to break

- Never import `lib/content.ts` or `lib/services.ts` as a value inside a `"use client"` file. It ships every locale and every FAQ to the browser. Use `import type` and pass the strings as props from a server component.
- Mobile Lighthouse must stay above 95 in every category. No new client dependencies without measuring. Three.js stays desktop-only and idle-loaded.
- Content visible at first paint must never start at `opacity: 0` in server HTML (it wrecks LCP). Reveal animations use transforms, or are gated behind `.is-visible` added by JS.
- Every animation needs a `prefers-reduced-motion` fallback and must stop with `.motion-paused`.
- Every user-facing string exists in pt-BR, en and es. `tests/locale.test.ts` only checks services and testimonials, so compare the other locales by hand.
- Sitemap, robots, `llms.txt` and JSON-LD are generated from `lib/`. Add pages and services there, not by hand.
- After changing a 3D model in `lib/studio-scene.ts`, regenerate its poster: `node apps/site/scripts/render-posters.mjs <kind>`.
- Changing copy in `lib/` that feeds Iris (`company.ts`, `services.ts`, `copy/*`, the `projects` block in `content.ts`, `stats.ts`) requires `pnpm knowledge`; `tests/knowledge-index.test.ts` will fail otherwise.
- Iris security (`lib/iris-policy.ts`, `app/api/chat/route.ts`) is covered by `tests/iris-security.test.ts`. Keep it green and don't weaken checks to make a feature work.
- New third-party scripts or GTM custom-HTML tags need a CSP entry in `next.config.ts`.
- Don't invent company facts. Placeholder figures and personal details are listed in `docs/site-guide.md`; keep that table current.

## Environment

- Env vars live in the root `.env` (loaded by `next.config.ts`) or `apps/site/.env.local` (takes precedence). See `.env.example`. Never print or commit their values.
- `NEXT_PUBLIC_GTM_ID` is inlined at build time.

## Code style

- Comments only for a non-obvious "why". No comments explaining what the code does or why a change was made.
- Blank lines between logical blocks. Match the surrounding code.
- Prettier defaults (`apps/site/.prettierrc.json`).

## Git

- Conventional commits with a scope, e.g. `feat(site): ...`, `fix(site): ...`, `docs: ...`.
- Keep `main` linear: rebase or cherry-pick, no merge commits.
- Don't add and then revert the same thing across commits; fold fixes into a clean history before pushing.
- Remote: `github.com/IrtcAI/company-website`. Vercel deploys `main`.

## Verifying UI changes

Build and serve on a free port, then check desktop (1440×900) and mobile (390×844) in light and dark themes, plus reduced motion. Stop only the server you started (by port); never `pkill` node or Next processes, other sessions may be running theirs.
