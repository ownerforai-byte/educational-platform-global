# 🧭 CORE_FILES.md — Platform Core Architecture & File Isolation Registry

> **THE GOLDEN RULE FOR ALL AGENTS:**
> **DO NOT READ ALL FILES.**
> There are over 8,800 files in this repository. Over 95% of them are repetitive **Content Files** (notes, JSON concepts, problem sets, mindmaps, rails).
> You MUST only read the **isolated core files** listed below that give you full routing, wiring, and architectural knowledge.
> **DO ONLY WHAT IS ASKED.**
> When asked to create or edit a file, read ONLY the specific routing and structure files that tell you **WHERE to put it** and **HOW to link/route it**.
> Once done, you MUST mark whether any touched or newly created file is an **Important Core File** or a **Content File**.

---

## 1. Classification System: Core vs Content

Every file in this project strictly belongs to one of two classes:

### 🏛️ Class 1: Important Core Files (Architecture & Routing)
- **What they are:** Files that define how the platform works, how URLs and routes are registered, global navigation, UI shells, authentication, database schemas, API endpoints, build scripts, and central indexes/registries.
- **Agent Behavior:** Read these when you need to understand how the platform works, find where to register a route, or learn how components link together.
- **Total Count:** ~30 to 40 primary files across the entire platform.

### 📄 Class 2: Content Files (Data & Topic Payloads)
- **What they are:** Topic JSON files under `content/ravikishan/**`, individual chapter concept notes, pyq question files, mindmap JSON trees, rail cards, raw textbook data.
- **Agent Behavior:** **IGNORE ALL CONTENT FILES UNLESS EXPLICITLY ORDERED** to edit or read a specific topic/content file! Never scan or mass-read content folders.
- **Total Count:** 8,000+ files.

---

## 2. The Isolated Main Files (The Essential Few)

Whenever you need to know how the platform works and where things route, refer ONLY to these isolated files:

### A. Routing & Navigation Core (Where pages live & how they link)
| File | Role |
|---|---|
| `frontend/lib/navigation.ts` | **Global Navigation Registry** (`NAV_SECTIONS`, `NAV_HREFS`). Defines sidebar, mobile drawer, all section hubs, access levels, and route paths. |
| `frontend/lib/site-index.ts` | **Everything Index Registry** (`/site-index`). Aggregates all routable sections across labs, graphs, syllabus, notes, proofs into a unified index. |
| `frontend/lib/syllabus.ts` | **Curriculum Single Source of Truth**. Contains official class, subject, unit, and topic hierarchies and slugs. |
| `frontend/app/(app)/layout.tsx` | Main App layout shell, wraps pages in header, sidebar, navigation, auth, and credit gates. |
| `frontend/components/layout/app-shell.tsx` | Main UI layout container and responsive navigation shell. |
| `frontend/lib/note-routes.ts` | Canonical routing logic for notes, mapping topics and legacy paths to current URLs. |

### B. Platform Foundations & System State
| File | Role |
|---|---|
| `CORE_FILES.md` | *This file* — the isolated routing and core architecture index. |
| `AGENTS.md` | Universal agentic workflow entrypoint, Golden Rule, and acceptance gates. |
| `AGENT_RULES.md` | Mandatory safety, security, and syllabus-order rules. |
| `project-conductor.md` | Task classification (`feature:`, `bugfix:`, etc.) and role assignment. |
| `PROJECT_STATUS.md` | Real-time truth of deployed architecture, databases, auth, and environments. |
| `SYSTEM_WORK_TRACKER.md` | Audit of all 31 platform work types and systems. |
| `BRANCHES.md` | Git branch assignment (48 area branches) and scoped test rules. |

### C. Backend API & Middlewares (Server Core)
| File | Role |
|---|---|
| `backend/src/app.ts` | Express app configuration, middleware mounting (CORS, rate limiting, security headers), and route mounting. |
| `backend/src/index.ts` | Backend server entrypoint and port listener. |
| `backend/src/middleware/auth.ts` | Supabase authentication middleware, session verification, user role injection. |
| `backend/src/middleware/creditCheck.ts` | AI and platform credit check and deduction gating. |
| `backend/src/config/env.ts` | Environment variable validation and production detection. |

### D. AI & Core Service Engines
| File | Role |
|---|---|
| `backend/src/ai/service.ts` | AI orchestration, provider fallback chain (Agnes → OpenRouter → Internal). |
| `backend/src/ai/prompts.ts` | Master academic prompt definitions. |
| `frontend/lib/ai/prompts.ts` | Frontend prompt configuration and system prompt mirrors. |
| `frontend/features/credits/constants.ts` | Tier quotas, credit pricing, coin gate constants. |

### E. Specialized Section Registries (Feature Routing)
| File | Role |
|---|---|
| `frontend/lib/lab-registry.tsx` | Registry of all 2D/3D interactive labs, simulations, and calculators. |
| `frontend/lib/graphs.ts` | Registry for all science graphs and visual data banks. |
| `frontend/lib/pyq-bank.ts` | Registry for past year question banks and solved papers. |
| `frontend/lib/formula-sheet.ts` | Formula vault data and derivation link associations. |
| `frontend/lib/physics-xi-academic.ts` | Physics XI Academic Companion registry — typed accessors over the 26-unit brief dataset (`frontend/public/data/physics-xi-academic/units.json`) plus the canonical brief/document URL helpers used by the `/resources/physics-xi` routes. The dataset is content; this file is the contract for it. |

---

## 3. How to Route or Create New Files (Step-by-Step)

When asked to add a new page, feature, or content:

1. **Do NOT read the whole codebase.**
2. **Find the parent route / category in `frontend/lib/navigation.ts` or `frontend/lib/syllabus.ts`.**
3. **Determine the file location:**
   - **New App Page:** `frontend/app/(app)/<route-name>/page.tsx`
   - **New API Endpoint:** `backend/src/api/<feature>.ts` (mounted in `backend/src/app.ts`)
   - **New UI Component:** `frontend/components/<feature>/<component>.tsx`
   - **New Content Topic:** `content/ravikishan/<class>/<subject>/<unit>/concepts/<slug>.json`
4. **Link / Route It:**
   - If it is a new user-accessible page, add its link to `frontend/lib/navigation.ts` and ensure it is covered in `frontend/lib/site-index.ts`.
   - If it is a content topic, ensure its `topicSlug` matches `frontend/lib/syllabus.ts`.
5. **Mark the file before completing the task** (see Section 4).

---

## 4. Mandatory Post-Task Marking Protocol

Before ending any task, an agent MUST state in its output and record whether the touched or created files are **Important Core Files** or **Content Files**:

```markdown
### 🏷️ File Classification Report
- `frontend/lib/navigation.ts` → **[IMPORTANT CORE FILE]**: (Reason, e.g. Added new route to navigation registry)
- `content/ravikishan/class-11-notes/physics/gravitation/concepts/01-newton-law-gravitation.json` → **[CONTENT FILE]**: (Reason, e.g. Authored concept note for Unit 3 Physics)
```

If a new architecture or routing file was created, add it to Section 2 of `CORE_FILES.md`.
If a content file was created, future agents will know it is a content file and must ignore it.
