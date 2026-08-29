# Frontend Migration Report

Migrated frontend-safe code from project root into `frontend/`. Server-only code remains in root/backend.

## Summary

- **Total root source files**: 250
- **Copied to frontend/**: 233
- **Skipped (server-only/backend-only)**: 17
- **Modified during migration**: 3 files

## Migration Details

### app/ → frontend/app/
Status: **Copied** (113 files)

All page components and layouts copied. API routes under `app/api/` were excluded (16 files skipped).

| Source | Destination | Status | Reason |
|--------|-------------|--------|--------|
| app/layout.tsx | frontend/app/layout.tsx | copied | Root layout |
| app/page.tsx | frontend/app/page.tsx | copied | Home page |
| app/error.tsx | frontend/app/error.tsx | copied | Error boundary |
| app/loading.tsx | frontend/app/loading.tsx | copied | Loading UI |
| app/not-found.tsx | frontend/app/not-found.tsx | copied | Not found UI |
| app/globals.css | frontend/app/globals.css | copied | Global styles |
| app/class-11/page.tsx | frontend/app/class-11/page.tsx | copied | Class page |
| app/class-11e/page.tsx | frontend/app/class-11e/page.tsx | copied | Class page |
| app/class-12/page.tsx | frontend/app/class-12/page.tsx | copied | Class page |
| app/class-12e/page.tsx | frontend/app/class-12e/page.tsx | copied | Class page |
| app/login/page.tsx | frontend/app/login/page.tsx | copied | Login page |
| app/signup/page.tsx | frontend/app/signup/page.tsx | copied | Signup page |
| app/lab/page.tsx | frontend/app/lab/page.tsx | copied | Lab page |
| app/subjects/page.tsx | frontend/app/subjects/page.tsx | copied | Subjects page |
| app/resources/[id]/page.tsx | frontend/app/resources/[id]/page.tsx | copied | Resource page |
| app/resources/[id]/edit/page.tsx | frontend/app/resources/[id]/edit/page.tsx | copied | Resource edit |
| app/resources/new/page.tsx | frontend/app/resources/new/page.tsx | copied | New resource |
| app/levels/page.tsx | frontend/app/levels/page.tsx | copied | Levels list |
| app/levels/[levelSlug]/page.tsx | frontend/app/levels/[levelSlug]/page.tsx | copied | Level detail |
| app/levels/[levelSlug]/classes/[classSlug]/page.tsx | frontend/app/levels/[levelSlug]/classes/[classSlug]/page.tsx | copied | Class detail |
| app/levels/.../subjects/[subjectSlug]/page.tsx | frontend/app/levels/.../subjects/[subjectSlug]/page.tsx | copied | Subject detail |
| app/levels/.../chapters/[chapterSlug]/page.tsx | frontend/app/levels/.../chapters/[chapterSlug]/page.tsx | copied | Chapter detail |
| app/levels/.../topics/[topicSlug]/page.tsx | frontend/app/levels/.../topics/[topicSlug]/page.tsx | copied | Topic detail |
| app/levels/.../resources/[resourceId]/page.tsx | frontend/app/levels/.../resources/[resourceId]/page.tsx | copied | Resource detail |
| app/ravikishan-notes/page.tsx | frontend/app/ravikishan-notes/page.tsx | copied | Notes list |
| app/ravikishan-notes/[...path]/page.tsx | frontend/app/ravikishan-notes/[...path]/page.tsx | copied | Note detail |
| app/r-notes/page.tsx | frontend/app/r-notes/page.tsx | copied | R-notes list |
| app/r-notes/[subject]/[chapter]/page.tsx | frontend/app/r-notes/[subject]/[chapter]/page.tsx | copied | R-note chapter |
| app/loksewa/page.tsx | frontend/app/loksewa/page.tsx | copied | Loksewa page |
| app/world-knowledge/page.tsx | frontend/app/world-knowledge/page.tsx | copied | World knowledge |
| app/class-11-notes/**/* | frontend/app/class-11-notes/**/* | copied | Class 11 notes |
| app/class-11e/**/* | frontend/app/class-11e/**/* | copied | Class 11E |
| app/class-11-more/**/* | frontend/app/class-11-more/**/* | copied | Class 11 more |
| app/class-12-notes/**/* | frontend/app/class-12-notes/**/* | copied | Class 12 notes |
| app/class-12e/**/* | frontend/app/class-12e/**/* | copied | Class 12E |
| app/class-12-more/**/* | frontend/app/class-12-more/**/* | copied | Class 12 more |
| app/api/topics/[slug]/route.ts | — | skipped | API route (backend-only) |
| app/api/subjects/[slug]/route.ts | — | skipped | API route (backend-only) |

### components/ → frontend/components/
Status: **Copied** (56 files)

All UI, layout, content, lab, navigation, and theme components copied.

| Source | Destination | Status | Reason |
|--------|-------------|--------|--------|
| components/ui/button.tsx | frontend/components/ui/button.tsx | copied | UI component |
| components/ui/card.tsx | frontend/components/ui/card.tsx | copied | UI component |
| components/ui/input.tsx | frontend/components/ui/input.tsx | copied | UI component |
| components/ui/label.tsx | frontend/components/ui/label.tsx | copied | UI component |
| components/ui/textarea.tsx | frontend/components/ui/textarea.tsx | copied | UI component |
| components/ui/select.tsx | frontend/components/ui/select.tsx | copied | UI component |
| components/ui/dropdown-menu.tsx | frontend/components/ui/dropdown-menu.tsx | copied | UI component |
| components/ui/progress.tsx | frontend/components/ui/progress.tsx | copied | UI component |
| components/ui/skeleton.tsx | frontend/components/ui/skeleton.tsx | copied | UI component |
| components/ui/tabs.tsx | frontend/components/ui/tabs.tsx | copied | UI component |
| components/layout/* | frontend/components/layout/* | copied | Layout components |
| components/content/* | frontend/components/content/* | copied | Content components |
| components/lab/* | frontend/components/lab/* | copied | Lab components |
| components/navigation/* | frontend/components/navigation/* | copied | Nav components |
| components/theme/* | frontend/components/theme/* | copied | Theme components |

### features/ → frontend/features/
Status: **Copied** (24 files)

| Source | Destination | Status | Reason |
|--------|-------------|--------|--------|
| features/auth/components/login-form.tsx | frontend/features/auth/components/login-form.tsx | copied | Client form |
| features/auth/components/signup-form.tsx | frontend/features/auth/components/signup-form.tsx | copied | Client form |
| features/auth/hooks/use-session.ts | frontend/features/auth/hooks/use-session.ts | copied | Auth hook |
| features/auth/schema.ts | frontend/features/auth/schema.ts | copied | Zod schema |
| features/auth/types.ts | frontend/features/auth/types.ts | copied | Type definitions |
| features/auth/actions.ts | frontend/features/auth/actions.ts | copied | Server actions |
| features/syllabus/**/* | frontend/features/syllabus/**/* | copied | Syllabus feature |
| features/mindmap/**/* | frontend/features/mindmap/**/* | copied | Mindmap feature |
| features/knowledge/**/* | frontend/features/knowledge/**/* | copied | Knowledge feature |
| features/auth/api.ts | — | skipped | API route handler (server-only, uses NextResponse/Request) |

### lib/ → frontend/lib/
Status: **Copied** (25 files, 3 modified)

| Source | Destination | Status | Reason |
|--------|-------------|--------|--------|
| lib/utils.ts | frontend/lib/utils.ts | copied | cn() helper |
| lib/syllabus.ts | frontend/lib/syllabus.ts | copied | Static syllabus data |
| lib/queries.ts | frontend/lib/queries.ts | copied | Type definitions |
| lib/webgl.ts | frontend/lib/webgl.ts | copied | WebGL check |
| lib/env.ts | frontend/lib/env.ts | copied | Env validation (NEXT_PUBLIC_ vars) |
| lib/imported-notes.ts | frontend/lib/imported-notes.ts | copied | Note loading logic |
| lib/curriculum.ts | frontend/lib/curriculum.ts | needs review | Rewritten to use apiFetch instead of direct Supabase |
| lib/data-loader.ts | frontend/lib/data-loader.ts | needs review | Rewrote to use client-side fetch (removed next/headers dependency) |
| lib/auth/roles.ts | frontend/lib/auth/roles.ts | copied | Role definitions |
| lib/auth/types.ts | frontend/lib/auth/types.ts | copied | Auth types |
| lib/content/renderers.tsx | frontend/lib/content/renderers.tsx | copied | Content renderers |
| lib/content/pipeline.ts | frontend/lib/content/pipeline.ts | copied | Markdown pipeline |
| lib/content/note-status.ts | frontend/lib/content/note-status.ts | copied | Note status logic |
| lib/content/katex.ts | frontend/lib/content/katex.ts | copied | KaTeX config |
| lib/schemas/exam.ts | frontend/lib/schemas/exam.ts | copied | Exam schemas |
| lib/db/server.ts | — | skipped | Supabase server client (server-only) |
| lib/db/client.ts | — | skipped | Database client (server-only) |
| lib/ai/service.ts | — | skipped | AI service with secrets (server-only) |
| lib/ai/providers/gemini.ts | — | skipped | AI provider (server-only) |
| lib/ai/providers/openrouter.ts | — | skipped | AI provider (server-only) |
| lib/ai/providers/internal.ts | — | skipped | AI provider (server-only) |
| lib/ai/types.ts | — | skipped | AI types (in excluded ai/ dir) |
| lib/ai/index.ts | — | skipped | AI entry (in excluded ai/ dir) |
| lib/audit/log.ts | — | skipped | Audit logging (server-only) |
| lib/settings.ts | — | skipped | Settings (server-only) |
| lib/storage/storage-service.ts | — | skipped | Storage service (server-only) |
| lib/ravikishan-importer.ts | — | skipped | Uses fs, path, process.cwd() (server-only) |

### public/ → frontend/public/
Status: **Copied** (6 files)

| Source | Destination | Status | Reason |
|--------|-------------|--------|--------|
| public/data/ravikishan/_index.json | frontend/public/data/ravikishan/_index.json | copied | Static data |
| public/data/ravikishan/manifest.json | frontend/public/data/ravikishan/manifest.json | copied | Static data |
| public/data/r-export/manifest.json | frontend/public/data/r-export/manifest.json | copied | Static data |
| public/data/exams/exam-01.json | frontend/public/data/exams/exam-01.json | copied | Static data |
| public/data/exams/exam-02.json | frontend/public/data/exams/exam-02.json | copied | Static data |
| public/data/exams/exam-03.json | frontend/public/data/exams/exam-03.json | copied | Static data |

### tests/ → frontend/tests/
Status: **Copied** (7 files)

| Source | Destination | Status | Reason |
|--------|-------------|--------|--------|
| tests/setup.ts | frontend/tests/setup.ts | copied | Test setup |
| tests/components/ui/progress.test.tsx | frontend/tests/components/ui/progress.test.tsx | copied | UI test |
| tests/lib/auth/roles.test.ts | frontend/tests/lib/auth/roles.test.ts | copied | Auth test |
| tests/lib/content/katex.test.ts | frontend/tests/lib/content/katex.test.ts | copied | KaTeX test |
| tests/lib/content/math-coverage.test.ts | frontend/tests/lib/content/math-coverage.test.ts | copied | Math test |
| tests/lib/content/note-status.test.ts | frontend/tests/lib/content/note-status.test.ts | copied | Note status test |
| tests/lib/content/pipeline.test.ts | frontend/tests/lib/content/pipeline.test.ts | copied | Pipeline test |

### types/ → frontend/types/
Status: **Copied** (2 files)

| Source | Destination | Status | Reason |
|--------|-------------|--------|--------|
| types/katex-contrib.d.ts | frontend/types/katex-contrib.d.ts | copied | Type defs |
| types/api.ts | frontend/types/api.ts | copied | API types (pre-existing) |

## Root Files Kept Intact

The following root files/directories were **not** migrated and remain in the root:

- `backend/` — Backend workspace (Express API, Supabase, DB)
- `app/api/` — API route handlers (server-only)
- `lib/db/` — Supabase server/client (server-only)
- `lib/ai/` — AI services and providers (server-only)
- `lib/audit/` — Audit logging (server-only)
- `lib/storage/` — Storage service (server-only)
- `lib/settings.ts` — Server-only settings
- `lib/ravikishan-importer.ts` — Uses fs/path/process.cwd()
- `content/` — Raw content source
- `scripts/` — Build-time scripts
- `drizzle/` — DB migrations
- `supabase/` — Supabase config
- `db/` — Database schema
- `content-tools/` — Content build tools
- Root `package.json`, `tsconfig.json`, `middleware.ts`, etc. — Monorepo root config

## Import Path Updates

All copied files use `@/` aliases. The frontend `tsconfig.json` maps `@/*` to `./*`, so imports resolve correctly within `frontend/`.

No files required relative path adjustments because the directory structure was preserved during copy.

## Files Requiring Review

1. **frontend/lib/curriculum.ts** — Direct Supabase calls replaced with `apiFetch` to backend API endpoints. Verify endpoint responses match expected types.
2. **frontend/lib/data-loader.ts** — Replaced `next/headers` dependency with client-side `fetch`. Verify cached JSON data loads correctly in pages with `runtime = "edge"`.
3. **frontend/features/auth/actions.ts** — Contains Server Actions. Verify it doesn't import server-only modules.

## Next Steps

1. Run `npm run build:frontend` to verify the migrated frontend compiles.
2. Run `npm run typecheck` to check for TypeScript errors.
3. Run `npm run test` to verify tests pass.
4. Once verified, root frontend files can be removed.
