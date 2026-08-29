# Cloudflare Deployment Migration Audit

## Root Cause of 3 MiB Error

The monolithic Next.js application bundles **all server-side code** (API routes, middleware, Supabase clients, AI SDKs, content pipeline, database drivers, Drizzle ORM, Three.js imports, unified/remark/rehype pipeline, KaTeX) into a single Cloudflare Worker entrypoint. Even though most content is static, the Worker bundle includes the entire server runtime because Cloudflare Pages + next-on-pages converts the app into a single Pages Function.

**Largest contributors to Worker bundle:**
- `three` (600KB+, imported by lab components)
- `@google/generative-ai` + AI provider chain
- `@supabase/ssr` + `@supabase/supabase-js`
- `drizzle-orm` + `@neondatabase/serverless`
- `unified` + `remark-*` + `rehype-*` + `katex` content pipeline
- `next-mdx-remote`
- `lib/syllabus.ts` (large static curriculum data)
- `content/` JSON files bundled into server chunks

## Old Architecture

```
Cloudflare Pages
  └── Build: node scripts/build.mjs
       └── @cloudflare/next-on-pages (deprecated)
            └── Vercel build
                 └── Single Worker entrypoint (.vercel/output/static/_worker.js)
                      ├── SSR all pages
                      ├── API routes (16 endpoints)
                      ├── Middleware (rate limiting, auth, security headers)
                      ├── Supabase clients
                      ├── AI providers
                      ├── Content pipeline (unified/remark/rehype/katex)
                      ├── Three.js (lab)
                      └── Static assets
```

**Problem:** Everything runs in one Worker. The 3 MiB free limit is exceeded.

## New Architecture (Target)

```
┌─────────────────────────────────────┐
│     CLOUDFLARE PAGES (Frontend)     │
│  - Static assets                     │
│  - Client-side React                 │
│  - Three.js/lab (client-only)        │
│  - Calls BACKEND_API_URL             │
└─────────────────────────────────────┘
              │ HTTPS
              ▼
┌─────────────────────────────────────┐
│     SEPARATE BACKEND (Node.js)      │
│  - API routes (Express/Fastify)      │
│  - Authentication (Supabase)         │
│  - Authorization                     │
│  - Database access                   │
│  - AI providers                      │
│  - Content pipeline                  │
│  - Server secrets                    │
└─────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│     Supabase (PostgreSQL)            │
│  - Users, auth                       │
│  - Resources, topics, chapters       │
│  - Educational content               │
└─────────────────────────────────────┘
```

## Classification of Major Modules

| Module | Classification | Reason |
|--------|---------------|---------|
| `app/page.tsx`, `app/class-11/`, etc. | A. Frontend | Pure UI, navigation, client interactions |
| `components/lab/*` | A. Frontend | Three.js, WebGL, client-only |
| `components/ui/*` | A. Frontend | ShadCN UI components |
| `components/layout/*` | A. Frontend | Header, sidebar, navigation |
| `components/content/*` | A/C. Frontend/Shared | Math rendering, notes display — can be frontend-only |
| `app/api/auth/*` | E/B. Auth/Backend | Supabase auth, server-only |
| `app/api/resources/*` | B. Backend | Database CRUD, authz |
| `app/api/subjects/*`, `topics/*`, etc. | B. Backend | Database queries |
| `middleware.ts` | B/E. Backend/Auth | Rate limiting, session refresh, security headers |
| `lib/db/server.ts` | E/D. Auth/Database | Supabase server client |
| `lib/db/client.ts` | A/C. Frontend/Shared | Supabase browser client |
| `lib/ai/service.ts` | F/B. AI/Backend | AI providers, secrets |
| `lib/ai/providers/*` | F/B. AI/Backend | Gemini, OpenRouter, internal |
| `lib/content/pipeline.ts` | B/G. Backend/Content | unified/remark/rehype/katex — server-side rendering |
| `lib/syllabus.ts` | G/C. Content/Shared | Static curriculum data |
| `lib/imported-notes.ts` | G/C. Content/Shared | Note loading logic |
| `lib/data-loader.ts` | G/C. Content/Shared | Fetch-based data loading |
| `features/auth/*` | E. Authentication | Auth logic, server + client |
| `features/syllabus/*` | C/G. Shared/Content | Syllabus components and queries |
| `features/mindmap/*` | C/G. Shared/Content | Mindmap components |
| `features/knowledge/*` | A/C. Frontend/Shared | Loksewa, world knowledge |
| `db/schema.ts` | D. Database | Drizzle ORM schema |
| `db/seed.ts` | H. Build | Build-time only |
| `content/**/*.json` | G. Content | Static content files |
| `public/data/**/*.json` | G. Content | Mirrored content for serving |
| `scripts/*` | H. Build | Build-time scripts, never in bundle |
| `components/content/math-markdown.tsx` | A. Frontend | Client-safe markdown renderer |
| `components/content/notes-viewer.tsx` | A. Frontend | Client component |
| `components/content/numerical-viewer.tsx` | A. Frontend | Client component |

## Files Changed (So Far)

Already modified in this session:
- `lib/webgl.ts` — new WebGL check utility
- `components/lab/webgl-fallback.tsx` — new WebGL fallback UI
- `components/lab/*.tsx` — WebGL checks added to all 10 lab files
- `lib/content/pipeline.ts` — removed `rehype-raw`
- `package.json` / `package-lock.json` — removed `rehype-raw` dependency
- `components/content/math-markdown.tsx` — updated JSDoc

## Dependencies to Remove from Frontend

These should **not** be in the Cloudflare Pages frontend bundle:
- `@cloudflare/next-on-pages` (deprecated, build-time only)
- `drizzle-orm` (database, backend-only)
- `@neondatabase/serverless` (database, backend-only)
- `@google/generative-ai` (AI, backend-only)
- `dotenv` (build-time only)
- `rehype-raw` (removed)
- `next-mdx-remote` (if not used client-side)
- `three` (keep, but only in client bundle — already handled by `"use client"`)

## Required Cloudflare Environment Variables

### Frontend (Cloudflare Pages)
- `NEXT_PUBLIC_SUPABASE_URL` — public
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — public
- `NEXT_PUBLIC_SITE_URL` — public (optional, defaults to localhost)

### Backend (separate deployment)
- `SUPABASE_URL` — private
- `SUPABASE_SERVICE_ROLE_KEY` — private
- `DATABASE_URL` — private
- `GEMINI_API_KEY` — private
- `OPENROUTER_API_KEY` — private
- `AI_PROVIDER` — private
- `AI_DEFAULT_PROVIDER` — private

## Next Steps

1. Create `frontend/` and `backend/` directory structure
2. Move frontend-only code to `frontend/`
3. Move backend code to `backend/`
4. Create API contract
5. Update build configuration
6. Test independently
7. Deploy
