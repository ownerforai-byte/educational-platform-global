# AGENTS.md — Development Rules for This Project

## System Architecture

This is a monorepo educational platform for NEB (+2) students in Nepal.

- **Root**: `package.json` with workspaces
- **Frontend**: Next.js 16 (Turbopack), React 19, TypeScript, shadcn/ui, Tailwind
- **Backend**: Express + Supabase (API server)
- **Content**: JSON files under `content/ravikishan/`
- **Syllabus**: Single source of truth in `frontend/lib/syllabus.ts`

## Critical Rules

### 1. Syllabus Is the Single Source of Truth
`frontend/lib/syllabus.ts` contains ALL class/subject/unit/topic data. Every agent MUST read this file before adding any content. Never create content outside the syllabus structure.

### 2. Content Organization System (MANDATORY)
All notes, lessons, PYQs, and resources MUST follow the syllabus hierarchy:

```
content/ravikishan/{classSlug}/{subjectSlug}/{unitSlug}/
  ├── concepts/     ← explanatory notes (one JSON per topic)
  ├── formula/      ← formula sheets
  ├── notes/        ← general fallback notes
  ├── pyqs/         ← previous year questions
  ├── sets/         ← problem sets
  ├── examples/     ← worked examples
  └── mindmap/      ← concept map JSON
```

### 3. Before Adding Any Content — Follow This Flow
1. Read `frontend/lib/syllabus.ts` to find the correct subject + unit
2. Match content to the most relevant syllabus topic by keyword overlap
3. Calculate relevance score (0-100%) — must be >30% to qualify
4. Create JSON with required fields: `title`, `unitSlug`, `topicSlug`, `topicTitle`, `relevance`, `notes`
5. Place file in correct unit directory under correct sub-folder
6. Run `npm run content:build` to regenerate mindmaps

### 4. Never Do These Things
- ❌ Create files outside `content/ravikishan/{class}/{subject}/{unit}/`
- ❌ Place content in arbitrary folders ("misc", "general", "other")
- ❌ Use arbitrary file names instead of `{pad}.{topic-slug}.json`
- ❌ Skip reading the syllabus before adding content
- ❌ Create duplicate units or reorder syllabus units

### 5. PDF / Raw Content Handling
When given PDFs or raw text:
1. Parse and identify subject + class level
2. Match against syllabus topics
3. Organize into proper unit/topic structure
4. Never dump raw content directly into the filesystem

### 6. Content Validation
Run validation before committing content:
```bash
npx tsx scripts/validate-content.ts    # Check all content is properly organized
npx tsx scripts/organize-content.ts    # Scan for misplaced content
```

### 7. Backend + Frontend Must Run Together
- Frontend: `npm run dev -w frontend` (port 5173)
- Backend: `npm run dev:backend` (port 3001)
- API proxy: frontend proxies `/api/*` → `localhost:3001`

### 8. Adding New Routes
- Page routes go in `frontend/app/` (Next.js App Router)
- Shared components go in `frontend/components/`
- Feature modules go in `frontend/features/`

## Key Files
- `frontend/lib/syllabus.ts` — **ALL syllabus data** (DO NOT edit without approval)
- `frontend/features/mindmap/` — Mind map generation system
- `frontend/features/syllabus/` — Syllabus display components
- `content/ravikishan/` — All course content (JSON format)
- `scripts/validate-content.ts` — Content organization validator
- `scripts/organize-content.ts` — Content alignment scanner

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
