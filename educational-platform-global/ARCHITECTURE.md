# ARCHITECTURE

NEB Study Vault / Educational Platform Global — Revised system design
(PHASE 1, FINAL DIRECTION). No implementation has begun. This document is
submitted for review and approval before proceeding to PHASE 2.

---

## 1. EXECUTIVE SUMMARY

NEB Study Vault is a free, open-access educational platform for NEB (+2)
students. It delivers curriculum content (syllabus, mind maps, notes,
numericals, flashcards, quizzes, videos), a limited interactive 3D/graph lab
for Physics, Chemistry and Mathematics, and a single lightweight Blue AI
Widget that helps students find internal resources.

The platform is built to be **FREE to operate** and **scalable in content**
without paid infrastructure. Primary stack:

```
GitHub  +  Next.js  +  Supabase  +  free/open-source browser libraries
         +  ONE optional free AI provider
```

No paid service is mandatory. Every additional service is introduced only
when the existing stack provably cannot handle a demonstrated requirement.

---

## 2. CORE PRINCIPLES

- **Free-first**: No required paid services. Use free/open-source whenever
  practical.
- **Content scale over infrastructure complexity**: The database is designed
  so thousands of resources can be added without schema change.
- **Data-driven curriculum**: The curriculum is read from the database. It is
  never hard-coded into frontend components.
- **Simplicity rule** (every dependency must answer):
  1. Why is it necessary?
  2. Can the existing stack do it?
  3. Is there a free/open-source option?
  4. Does it increase maintenance?
  5. Does it create vendor lock-in?
  6. Can the feature gracefully work without it?
  If the answer does not justify it, do not add it.
- **AI is an enhancement, not a dependency**: Core navigation/search works
  with or without AI.
- **One auth authority**: Supabase Auth only.

---

## 3. SYSTEM OVERVIEW

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser)                           │
│  Next.js PWA │ Tailwind/shadcn/ui │ Three.js (lazy) │ KaTeX/MDX    │
│  Blue AI Widget (lazy) │ Black "N" Controller (role-gated)         │
├─────────────────────────────────────────────────────────────────────┤
│                        EDGE / API LAYER                            │
│  Next.js Route Handlers │ Middleware (auth, RBAC, rate-limit)     │
├─────────────────────────────────────────────────────────────────────┤
│                        SERVICE LAYER                               │
│  ContentService │ SearchService │ StorageService │ AIWidgetService│
│  (AI optional, behind abstraction)                                 │
├─────────────────────────────────────────────────────────────────────┤
│                        DATA LAYER                                  │
│  Supabase (PostgreSQL + RLS │ Auth │ Storage)                     │
├─────────────────────────────────────────────────────────────────────┤
│                        OPTIONAL EXTERNAL                           │
│  ONE free-tier AI provider (Gemini / OpenRouter free / other)     │
└─────────────────────────────────────────────────────────────────────┘
```

Removed from earlier draft (per free-first direction): Prisma ORM,
Cloudflare R2 (mandatory), Redis, Meilisearch (mandatory), multiple paid AI
providers.

---

## 4. AUTHENTICATION — ONE SYSTEM ONLY

- **Exactly one authentication authority: Supabase Auth.**
- Used for: email/password, supported OAuth providers, sessions, login/logout,
  password recovery, identity.
- **No Prisma Account/Session models. No Prisma-recreated auth.**
- Application profile data lives in `profiles` linked to `auth.users`.
- Roles are data: `STUDENT` (default), `TEACHER`, `ADMIN`, `OWNER`.
- **OWNER is a protected role**: it is seeded/granted by an existing owner,
  never exposed as a public registration option.
- Public registration yields `STUDENT` only.
- All sensitive operations are authorized **server-side** (middleware + RLS).

---

## 5. CURRICULUM HIERARCHY & CONTENT MODEL

### 5.1 Hierarchy (data-driven, not hard-coded)

```
Education Level        (e.g., "NEB +2" / "Higher Secondary")
  └── Class / Grade    (e.g., "Class 11", "Class 12")
        └── Subject    (e.g., Physics, Chemistry, Mathematics)
              └── Chapter
                    └── Topic / Subchapter
                          ├── Official Syllabus
                          ├── Mind Map
                          ├── Notes
                          ├── Numericals
                          ├── Flashcards
                          ├── Quiz
                          └── Video
```

All levels (education level, class, subject, chapter, topic) are database
rows. Adding more of any level requires **no code change**.

### 5.2 Resource Types

| Type | Description |
|------|-------------|
| `syllabus` | Official NEB curriculum excerpt (supplied by owner/admin) |
| `mindmap` | Interactive mind map for chapter/topic |
| `notes` | Structured MDX notes |
| `numerical` | Problem + step-by-step solution (LaTeX in metadata) |
| `flashcard` | Q/A card with SRS scheduling |
| `quiz` | Assessment (structured in metadata) |
| `video` | Embedded or referenced video lesson |

### 5.3 Reusability — ORIGINAL / REFERENCE / DERIVED

- `ORIGINAL` — authored directly for this platform.
- `REFERENCE` — points to a canonical resource (`canonical_resource_id`).
- `DERIVED` — adapted from another resource; retains source/attribution.

Repeated material is stored once (canonical) and referenced, never fully
duplicated. `resource_references` tracks the relationship, type, and
attribution.

### 5.4 Syllabus

First-class resource. Owner/admin supplies legitimate syllabus material.
System never invents an official syllabus. Workflow:

```
official source supplied
  → structured syllabus content
  → chapter/topic association
  → review
  → publish
```

### 5.5 Mind Map

Every appropriate chapter/topic may have a Mind Map. Owner/admin supplies the
source material; the system may assist in producing a mind-map structure, but
generated maps are **reviewable before publication** and must never be
presented as official.

---

## 6. THE BLUE AI WIDGET (ONE AI INTERFACE ONLY)

- There is **exactly one** AI interface: the **Blue AI Widget**.
- It is a lightweight **educational navigation / resource finder**, NOT a
  general reasoning chatbot, NOT a tutor dashboard, NOT a separate AI page.
- Primary flow:

```
User request
  → understand the requested educational topic (internal search)
  → search the platform's own indexed curriculum/content
  → return the most relevant internal resource/topic/note link
  → user opens that resource
```

- Examples:
  - "Where can I study Newton's laws?" → "Newton's Laws — Physics → Chapter →
    Topic" + [Open Topic]
  - "I need notes for thermodynamics." → "Thermodynamics Notes" + [Open Notes]
  - "Where is the official syllabus for this chapter?" → "Official Syllabus —
    [Chapter]" + [Open Syllabus]
- The widget understands the **current page/context** so "show me the notes"
  returns notes of the current topic.
- It **prefers internal platform content** and does **not** perform
  unrestricted internet research.
- If a topic cannot be found internally, it returns a controlled message such
  as: *"I couldn't find that topic in this platform. Please check the official
  source for the relevant curriculum."* and may include an official website
  link configured by the platform (settings).
- The widget is lazy-loaded and must not load AI code on every page.

---

## 7. AI PROVIDER ARCHITECTURE (LIGHTWEIGHT)

- Do **not** over-engineer. One provider abstraction only.
- Implementation uses a currently available **free-tier** provider
  (e.g., Gemini, OpenRouter free models, or other genuinely free provider at
  implementation time).
- The architecture must **not** assume a provider's free tier stays
  unchanged. Swapping providers = swap one adapter.
- No multiple paid AI providers. No required paid AI API.
- Preferred flow (AI is optional enhancement):

```
User query
  → normal internal search (PostgreSQL FTS)
  → optional AI interpretation/ranking
  → internal resource results
  → links
```

- The **resource search works without AI**. AI only helps interpret/rank.
- Do **not** send unnecessary platform content to external AI providers.
- AI API keys are **server-side only**; never exposed in the browser.
- If AI is temporarily unavailable, the widget still returns search results.

---

## 8. BLACK "N" CONTROLLER (PROTECTED)

- The Black "N" control is **NOT** the AI widget. It is a protected
  developer/controller/admin control panel.
- Authorization-controlled; students cannot access it merely because it
  exists in the UI.
- Possible responsibilities: developer tools, system diagnostics, feature
  enable/disable, content status, AI provider status, storage status,
  database status, application health, cache/status info, controlled
  maintenance functions, admin shortcuts.
- **OWNER** has full control. **ADMIN** receives only explicitly granted
  permissions. **TEACHER** receives only relevant content-management
  permissions.
- No secrets are exposed through this panel.

---

## 9. 3D / GRAPH LABORATORY (LIMITED)

- **One** Graph/Lab area containing Physics, Chemistry, and Mathematics.
- Goal: a **small collection** of highly useful, interactive visualizations —
  not hundreds of simulations, not a custom physics engine.
- Prioritize educational usefulness over quantity.
- Use 2D when it explains better; use 3D only when genuinely useful.
- Every visualization is: browser-based, interactive, responsive,
  parameter-driven where appropriate, lightweight, reusable, progressively
  enhanced, and functional without paid services.

Physics (examples): motion/projectile visualization, vectors, simple
mechanics, selected wave / electric-field visualizations where practical.

Chemistry (examples): molecular structures, selected reaction visualization,
periodic-table visualization where useful.

Mathematics (examples): function graphs, selected 3D surfaces, vectors /
geometric visualization.

3D libraries are lazy-loaded; they are not loaded on normal curriculum pages.

---

## 10. STORAGE

- **Supabase Storage initially.**
- A `StorageService` abstraction prevents tight coupling to implementation
  details and allows storage expansion later without rewriting the app.
- Store database metadata and text/structured content in the database (or
  content files); use object storage **only** for actual media/files.
- Do not duplicate large files. Do not require multiple paid storage
  accounts.

---

## 11. SEARCH

- Build **internal search first** using PostgreSQL full-text search /
  indexed database search.
- Search understands: education levels, classes, subjects, chapters, topics,
  notes, syllabus, and resources.
- The AI widget may optionally improve query interpretation/ranking.
- **No external search engine is mandatory. Meilisearch is NOT mandatory.**

---

## 12. PREMIUM / OWNER WORKFLOW

- Keep premium lightweight and free. No paid payment gateway unless
  explicitly requested later.
- Manual approval workflow:

```
Student
  → Upgrade / Premium request
  → Owner contact/request workflow
  → Owner/Admin review
  → Approve or reject
  → Access state updated
  → Audit log
```

- Owner contact information is configurable via protected settings, not
  hard-coded throughout the application.

---

## 13. ROLES & PERMISSIONS

| Role | Permissions |
|------|-------------|
| `STUDENT` | Learning access: read published resources, progress, bookmarks, quizzes, flashcards, AI widget, premium request. |
| `TEACHER` | Student + content authoring/review permissions (create/edit/review resources). |
| `ADMIN` | Delegated control; only explicitly granted permissions. |
| `OWNER` | Full control. Protected; not a public registration option. |

- Permission checks are **centralized** (shared guard/utilities + middleware +
  RLS). Role checks are not scattered randomly through UI components.
- All sensitive operations are authorized server-side.

---

## 14. AUDITABILITY

Important administrative operations are tracked in `audit_events`:

- content creation / modification / publication / unpublication
- user role changes
- premium approval / rejection
- important settings changes
- administrative actions (including Black "N" operations)

---

## 15. DATABASE SCHEMA (PostgreSQL / Supabase)

Designed for **content scale** using normalized relational structures. JSON is
used only where data is naturally variable (quiz/numerical metadata).

```sql
-- Curriculum hierarchy
CREATE TABLE education_levels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  description text,
  "order" int DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE classes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  education_level_id uuid NOT NULL REFERENCES education_levels(id) ON DELETE CASCADE,
  slug text NOT NULL,
  name text NOT NULL,
  description text,
  "order" int DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(education_level_id, slug)
);

CREATE TABLE subjects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id uuid NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  slug text NOT NULL,
  name text NOT NULL,
  description text,
  icon text,
  "order" int DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(class_id, slug)
);

CREATE TABLE chapters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id uuid NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  slug text NOT NULL,
  title text NOT NULL,
  description text,
  "order" int DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(subject_id, slug)
);

CREATE TABLE topics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id uuid NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
  slug text NOT NULL,
  title text NOT NULL,
  description text,
  "order" int DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(chapter_id, slug)
);

-- Resources
CREATE TYPE resource_type AS ENUM ('SYLLABUS','MINDMAP','NOTES','NUMERICAL','FLASHCARD','QUIZ','VIDEO');
CREATE TYPE content_type AS ENUM ('ORIGINAL','REFERENCE','DERIVED');
CREATE TYPE reference_type AS ENUM ('INCLUDE','LINK','EMBED','CITE');

CREATE TABLE resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id uuid NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  type resource_type NOT NULL,
  content_type content_type DEFAULT 'ORIGINAL',
  canonical_resource_id uuid REFERENCES resources(id),
  title text NOT NULL,
  content jsonb,
  media_url text,
  metadata jsonb,
  is_published boolean DEFAULT false,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE resource_references (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_id uuid NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
  referenced_id uuid NOT NULL REFERENCES resources(id),
  reference_type reference_type NOT NULL,
  attribution text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(resource_id, referenced_id)
);

CREATE TABLE tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE resource_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_id uuid NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
  tag_id uuid NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  UNIQUE(resource_id, tag_id)
);

-- Identity / profile (Supabase Auth user)
CREATE TYPE user_role AS ENUM ('STUDENT','TEACHER','ADMIN','OWNER');

CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  avatar_url text,
  role user_role DEFAULT 'STUDENT',
  premium_status boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- User activity
CREATE TABLE user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  topic_id uuid NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  completed boolean DEFAULT false,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, topic_id)
);

CREATE TABLE bookmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  resource_id uuid NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
  folder text,
  notes text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, resource_id)
);

CREATE TABLE flashcard_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  resource_id uuid NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
  quality int,
  "interval" int DEFAULT 0,
  repetition int DEFAULT 0,
  ease_factor float DEFAULT 2.5,
  next_review_at timestamptz DEFAULT now(),
  reviewed_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE quiz_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  resource_id uuid NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
  score float,
  total int,
  answers jsonb,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Premium workflow
CREATE TYPE premium_request_status AS ENUM ('PENDING','APPROVED','REJECTED');

CREATE TABLE premium_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status premium_request_status DEFAULT 'PENDING',
  message text,
  reviewed_by uuid REFERENCES auth.users(id),
  reviewed_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Audit
CREATE TABLE audit_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id uuid REFERENCES auth.users(id),
  action text NOT NULL,
  entity_type text,
  entity_id uuid,
  details jsonb,
  created_at timestamptz DEFAULT now()
);

-- Protected settings (owner contact, official links, feature flags)
CREATE TABLE settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb,
  updated_by uuid REFERENCES auth.users(id),
  updated_at timestamptz DEFAULT now()
);
```

### 15.1 Row-Level Security (RLS)

- User-scoped tables (`profiles` self, `user_progress`, `bookmarks`,
  `flashcard_reviews`, `quiz_attempts`, `premium_requests`) enforce
  row-level access: a user sees/edits only their own rows.
- `resources` are public-read when published; writes require
  TEACHER/ADMIN/OWNER.
- `audit_events` readable by ADMIN/OWNER only.
- `settings` readable/writable by ADMIN/OWNER only.
- All writes are additionally authorized via Next.js middleware/guards.

---

## 16. SECURITY

Mandatory: Supabase RLS; server-side authorization; secure environment
variables; no secrets in Git or client bundles; input validation (Zod);
safe content rendering; safe MDX handling (sandbox, disable scripts/iframes);
rate limiting where needed; protected controller/admin routes; audit logging;
secure headers (CSP); abuse prevention.

---

## 17. PERFORMANCE

Usable on ordinary student devices. Server rendering where useful; lazy
loading; code splitting; lazy-load 3D libraries; lazy-load the AI widget;
optimized images; caching; database indexes; pagination; efficient queries.
Do not load the entire 3D system on normal curriculum pages. Do not load
unnecessary AI code on every page.

---

## 18. UI REQUIREMENTS (from reference designs)

- **Header**: match provided reference design as closely as practical;
  preserve all functional controls; responsive.
- **Blue AI Widget**: one global widget, available throughout the site;
  resource/navigation assistant only.
- **Black "N"**: protected developer/controller interface.
- **Dashboard**: inspirational quotes with visual effects; quote changes
  approximately every 4 seconds; must remain performant.
- **Navigation**: Back arrow on internal pages; Home is the exception;
  browser history must behave correctly; do not break navigation through
  nested curriculum pages.
- Buttons shown in reference designs are implemented as functional controls,
  not decorative placeholders.

---

## 19. TESTING

- **Vitest** (unit/integration), **@testing-library/react** (component),
  **Playwright** (E2E, free/open-source), **k6** (load, free/open-source).
- Target 80%+ coverage on business logic.

---

## 20. DEPLOYMENT (FREE-TIER, SIMPLE)

- **Frontend + API**: Vercel or Cloudflare Pages (free tier).
- **Database + Auth + Storage**: Supabase (free tier).
- **CI/CD**: GitHub Actions (free for public repos).
- No mandatory Cloudflare R2, Redis, Meilisearch, paid monitoring, paid AI,
  paid storage, paid database, or paid queue.

Pipeline: GitHub push → GitHub Actions (lint, typecheck, test, build) →
deploy to Vercel / Cloudflare Pages. Preview per PR; production on `main`.

---

## 21. DEPENDENCIES (REDUCED)

### Core
```
next, react, react-dom
typescript, @types/react, @types/node
tailwindcss, postcss, autoprefixer
@radix-ui/react-* (via shadcn/ui)
@supabase/supabase-js, @supabase/ssr
zustand
@tanstack/react-query
react-hook-form, zod, @hookform/resolvers
framer-motion
katex, rehype-katex, remark-math
next-mdx-remote, gray-matter
lucide-react
class-variance-authority, clsx, tailwind-merge
```

### 3D / Graph (lazy-loaded, limited)
```
three, @types/three
@react-three/fiber, @react-three/drei   (only if 3D needed for a viz)
3dmol                                     (chemistry molecular view, if used)
plotly.js-dist-min or recharts           (2D graphs)
```

### AI (one free provider behind abstraction)
```
Provider SDK chosen at implementation (e.g., @google/generative-ai) OR plain fetch.
```

### Testing / Dev
```
vitest, @vitest/coverage-v8
@testing-library/react, @testing-library/jest-dom, jsdom
playwright, @playwright/test
eslint, prettier, husky, lint-staged
next-pwa
```

**Removed**: Prisma, Cloudflare R2 SDK, Redis client, Meilisearch client,
multiple paid AI SDKs.

---

## 22. RISKS

| Risk | Mitigation |
|------|-----------|
| Free-tier limits exceeded | Usage tracking; caching; portable schema. |
| AI provider free tier changes | Abstraction; one adapter swap; AI optional. |
| 3D performance on low-end devices | Lazy-load; 2D preferred; progressive enhancement. |
| Content sourcing delays | Incremental population; owner-supplied syllabus. |
| Scope creep | Strict phase gating; simplicity rule; central review. |
| Security in MDX | Sandbox; audit; RLS. |

---

## 23. DECISIONS REQUIRING APPROVAL

See `DECISIONS.md`. Key items: single Supabase Auth; four roles; one Blue AI
Widget; Black "N" controller; limited 3D lab; EducationLevel→Class→Subject
hierarchy; StorageService abstraction; manual premium workflow; audit log;
removal of Prisma/Redis/Meilisearch/R2 as mandatory.

**The orchestrator will not proceed to implementation until approval is
received.**
