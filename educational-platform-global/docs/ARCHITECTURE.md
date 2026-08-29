# Architecture Decisions

## Overview
Educational platform for NEB (+2) students in Nepal with 3D interactive labs, theory content, and assessment tools.

## Tech Stack
- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Express + Supabase (PostgreSQL), TypeScript
- **Content**: JSON files under `content/ravikishan/`, synced to Supabase
- **Auth**: Supabase Auth
- **AI**: OpenAI/Anthropic providers via backend service layer

## Key Decisions

### 1. Monorepo Structure
All code in one repo with workspaces:
- `frontend/` — Next.js app
- `backend/` — Express API server
- `content/` — Shared educational content (JSON)
- `scripts/` — Build/migration tools

### 2. Syllabus as Single Source of Truth
`frontend/lib/syllabus.ts` is the canonical curriculum data. All content, notes, PYQs, and resources MUST map to this structure. Never create content outside the syllabus hierarchy.

### 3. Content Organization
All course content lives in `content/ravikishan/{classSlug}/{subjectSlug}/{unitSlug}/` with subfolders:
- `concepts/` — explanatory notes (one JSON per topic)
- `formula/` — formula sheets
- `notes/` — general fallback notes
- `pyqs/` — previous year questions
- `sets/` — problem sets
- `examples/` — worked examples
- `mindmap/` — concept map JSON

### 4. Lab System Architecture
- `frontend/lib/lab-registry.tsx` — Central registry of all lab components
- `frontend/app/lab/[labId]/page.tsx` — Dynamic route renders component from registry
- Each lab component is a self-contained React component
- Components use SVG-based labelled diagrams (no Three.js dependency for biology)
- Physics uses Three.js where appropriate

### 5. API Proxy Pattern
Frontend proxies `/api/*` → `localhost:3001` (backend). No CORS issues in dev. In production, same origin.

### 6. 3D Component Pattern
All biology 3D components follow this pattern:
```tsx
// Tab-based navigation
const TABS = [{ id, label, icon, color }];
// Each tab renders an SVG diagram with labelled parts
// Labels use LabelTag component with symbol, name, desc
// Supporting info panels below the visualization
```

### 7. State Management
- Local component state (useState) for lab interactions
- No global state library needed (platform is mostly read-heavy)
- Credits state managed via context in layout

## Directory Map
```
educational-platform-global/
├── frontend/           # Next.js 16 app
│   ├── app/            # App Router pages
│   ├── components/     # React components (lab/, ui/, layout/)
│   ├── features/       # Feature modules (mindmap/, syllabus/)
│   ├── lib/            # Utilities, API client, syllabus data
│   └── public/         # Static assets
├── backend/            # Express + Supabase API
│   ├── src/
│   │   ├── api/        # Route handlers (20+ endpoints)
│   │   ├── auth/       # Supabase auth integration
│   │   ├── db/         # Database clients
│   │   ├── services/   # Business logic
│   │   ├── ai/         # AI provider services
│   │   └── middleware/ # Auth, rate limiting, CORS
│   └── package.json
├── content/            # Educational content (JSON)
├── content-tools/      # Content migration/validation tools
├── docs/               # Architecture & API documentation
├── scripts/            # Build scripts
└── ARCHITECTURE.md     # This file
```
