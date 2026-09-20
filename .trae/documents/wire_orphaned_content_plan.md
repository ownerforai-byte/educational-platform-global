# Wire Orphaned Content Implementation Plan

## Repository Research

### Current Architecture
- **Content System**: Two parallel content pipelines exist:
  1. **Legacy Markdown Lessons** (`content/lessons/*.md`) — Old-style raw markdown. Only 1 of 12 is wired up (`classification-of-elements-and-periodic-table.md`) via the `/api/periodic-table/notes` endpoint in the backend.
  2. **Ravikishan JSON System** (`content/ravikishan/{class}/{subject}/{unit}/`) — Canonical structured JSON system, loaded via `/api/ravikishan-notes?path=...` backend route and `syllabus-notes/` frontend manifest. The **single source of truth for unit slugs** is `frontend/lib/syllabus.ts`.

- **Home Page Layout** (`frontend/app/(app)/home/page.tsx`) has 7 sections, rendered via components in `frontend/components/home/`:
  1. `HomeCommandCenter` — Hero + quick search + 6 live metrics
  2. `CurriculumTracksHub` — Class 11/12 subject cards with Notes/Theory, Mind Map, Syllabus, Subject Lab buttons
  3. `VirtualLabsCatalog` — 3D labs grid
  4. `AcademicRigorHub` — Theorems + Derivations + Practicals
  5. `AssessmentExamHub` — AI Quizzes + Exams
  6. `KnowledgeLoksewaHub` — High-yield knowledge cards (6 cards: Physics/Chem numericals, Biology diagrams, Grammar, Byakaran, Writing) + Loksewa/World knowledge
  7. `AIAssistantWorkspace` — AI workspace section

### Orphaned Content Inventory (from audit)

**A. 11 Orphaned Lesson Markdowns** — 11 `.md` files in `content/lessons/` are never loaded by file path. Only the slug keywords are used as identifiers. They contain raw lesson content.

| # | File | Subject | Canonical Equivalent Unit |
|---|------|---------|---------------------------|
| 1 | `algebra.md` | Mathematics | `algebra` |
| 2 | `atomic-structure.md` | Chemistry | `atomic-structure` |
| 3 | `biomolecules-and-cell-biology.md` | Biology | `biomolecules-and-cell-biology` |
| 4 | `calculus.md` | Mathematics | `calculus` |
| 5 | `floral-diversity.md` | Biology | `floral-diversity` |
| 6 | `gravitation.md` | Physics | `gravitation` |
| 7 | `optics.md` | Physics | Split across: reflection-at-curved-mirror, refraction-at-plane-surfaces, refraction-through-prisms, lenses, dispersion |
| 8 | `quantity-of-heat.md` | Physics | `quantity-of-heat` |
| 9 | `stoichiometry.md` | Chemistry | `stoichiometry` |
| 10 | `trigonometry.md` | Mathematics | `trigonometry` |
| 11 | `vectors.md` | Math + Physics | `vectors` (in both subjects) |

**B. 6 Orphaned Chemistry Unit Folders** — Non-canonical short-name folders in `content/ravikishan/class-11-notes/chemistry/`. Content loaders look for the canonical long unit slugs from the syllabus.

| Orphaned Folder | Canonical Target Folder |
|-----------------|------------------------|
| `classification-of-elements/` | `classification-of-elements-and-periodic-table/` |
| `chemical-bonding/` | `chemical-bonding-and-shapes-of-molecules/` |
| `oxidation-reduction/` | `oxidation-and-reduction/` |
| `basic-concept-organic/` | `basic-concept-of-organic-chemistry/` |
| `fundamental-principles-organic/` | `fundamental-principles-of-organic-chemistry/` |
| `modern-manufactures/` | `modern-chemical-manufactures/` |

**C. 1 Orphaned Math Folder**
- `limits-and-continuity/` → Content belongs inside `calculus/` (syllabus line 578-590 defines calculus as containing all limits/continuity/derivatives/integration).

**D. 3 Orphaned Physics Folders**
- `mechanics/` — Catch-all folder, not in syllabus. Needs to be split into the canonical physics units it overlaps with (physical-quantities, vectors, kinematics, dynamics, work-energy-and-power).
- `optics/` — Random unstructured n1.json, n2.json etc. Needs to be evaluated for unique content vs canonical optics units.
- `work-energy-power/` → Duplicate of `work-energy-and-power/`.

### Loop Error (Confirmed Critical)
- **Periodic Table useEffect Loop** at `periodic-table-view.tsx#L140-L186`: `measuredHeight` is read from DOM, set via state, then included in the effect's dependency array. Combined with `setZoom()` changing the scaled DOM height, this creates a classic read-measure-set loop. 2-decimal rounding provides probabilistic stabilization only.

## Files and Modules to Change

### Content Wiring Changes
1. **`backend/src/api/lessons.ts` (NEW FILE)** — General-purpose lessons API endpoint to serve all 12 markdown lesson files from `content/lessons/`, following the same pattern as `periodic-table.ts#L105-L110`.
2. **`backend/src/app.ts`** — Register the new `/api/lessons/*` route.
3. **`frontend/app/(app)/lessons/page.tsx` (NEW FILE)** — Lessons Library landing page listing all 12 subject lessons as cards, linking to each viewer.
4. **`frontend/app/(app)/lessons/[slug]/page.tsx` (NEW FILE)** — Dynamic route to display a single markdown lesson using the existing MathMarkdown/KaTeX renderer.
5. **`frontend/components/home/knowledge-loksewa-hub.tsx`** — Add a "Lessons Library (Classic)" card to the High-Yield section (6 cards → 7 cards, or replace empty slot, or add as a featured row).
6. **`frontend/components/home/home-command-center.tsx`** — Add "Classic Lesson Library" to `QUICK_SEARCH_ITEMS` (as a Knowledge category item).

### Chemistry Folder Aliasing / Merging
7. **`frontend/lib/syllabus-notes-manifest.ts`** (or content loader layer) — Add a unit-slug alias map so content in the 6 orphaned short-name chemistry folders resolves to the correct canonical long-name unit. OR:
8. **(Alternative: Physical merge)** — For each of the 6 chem folders, recursively move any unique JSON files into the canonical folder, using filename prefixes to avoid collisions. De-dupe files that have byte-identical copies in both locations.

### Physics + Math Folder Aliasing
9. **Content aliasing logic** — Add alias `limits-and-continuity` → `calculus` for math. Add alias `work-energy-power` → `work-energy-and-power` for physics.
10. **`mechanics/` and `optics/` orphans** — For physics `mechanics/`, extract unique concept JSONs and merge into their canonical home units (physical-quantities → concepts/dimensions-errors, vectors → vector concepts, kinematics/dynamics/Work-Energy). For the loose `optics/*.json` files, try to map to the correct sub-unit.

### Loop Error Fix
11. **`frontend/components/periodic-table/periodic-table-view.tsx#L140-L186`** — Fix the infinite re-render: add `Math.abs(h - measuredHeight) > 1` equality guard before `setMeasuredHeight(h)` to break the ping-pong, and use a `useRef` deadman counter to hard-stop after N attempts.

### Route Wiring (Next.js config)
12. **`frontend/next.config.mjs`** — (If needed) Add any rewrites or redirect rules for the new `/lessons` routes.

## Implementation Steps (Dependency Order)

### Phase 1 — Loop Error Fix (Standalone, safe to ship first)
1. Fix Periodic Table useEffect loop in `periodic-table-view.tsx`:
   - Wrap `setMeasuredHeight(h)` with guard: `if (h > 150 && Math.abs(h - measuredHeight) > 1)`
   - Add a `useRef` stabilization counter: `const layoutAttemptsRef = useRef(0)` that increments on each `calculateLayout()` call and short-circuits after 10 attempts.
   - Verify in browser DevTools that the useEffect runs at most ~3 times and stabilizes.

### Phase 2 — Wire 11 Orphaned Lesson Markdown Files (New Pipeline)
2. Create `backend/src/api/lessons.ts` new route:
   - `GET /api/lessons` → List all 12 lessons (slug, title, subject, class).
   - `GET /api/lessons/:slug` → Load and return markdown content for that slug from `content/lessons/{slug}.md` (using the existing `resolveDataPath` helper).
3. Register route in `backend/src/app.ts`.
4. Create `frontend/app/(app)/lessons/page.tsx` (Lessons Library):
   - Fetch all lessons metadata via the API.
   - Show 12 subject-themed cards (match SUBJECT_THEMES from CurriculumTracksHub).
   - Each card links to `/lessons/[slug]`.
5. Create `frontend/app/(app)/lessons/[slug]/page.tsx` (Lesson Viewer):
   - Fetch markdown content via `/api/lessons/[slug]`.
   - Render with `MathMarkdown` / `KaTeX` renderer from `frontend/components/content/math-markdown.tsx`.
6. Add "Classic Lessons Library" to Home Page:
   - Insert new card into `KnowledgeLoksewaHub` High-Yield grid (currently 6 cards → bump to 8 or reorganize). Card:
     - Title: "Classic Lesson Library (Full Chapters)"
     - Desc: "Original in-depth chapter markdown lessons for Physics, Chem, Math & Biology — complete theory with derivations."
     - Icon: `ScrollText` or `FileText`
     - Color: `text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20`
     - Href: `/lessons`
   - Add item to `QUICK_SEARCH_ITEMS` in home-command-center.tsx:
     ```
     { label: "Classic Lessons Library (Full Chapters)", href: "/lessons", category: "Knowledge" }
     ```

### Phase 3 — Wire Orphaned Unit Folders (Alias Strategy)
7. Add a **unit-slug alias map** at the content-loading layer (front-end manifests and backend API):
   - Create a single `UNIT_SLUG_ALIASES` constant (recommended location: `frontend/lib/syllabus-notes-manifest.ts` and mirror in backend).
   - Map:
     ```
     "classification-of-elements" → "classification-of-elements-and-periodic-table"
     "chemical-bonding" → "chemical-bonding-and-shapes-of-molecules"
     "oxidation-reduction" → "oxidation-and-reduction"
     "basic-concept-organic" → "basic-concept-of-organic-chemistry"
     "fundamental-principles-organic" → "fundamental-principles-of-organic-chemistry"
     "modern-manufactures" → "modern-chemical-manufactures"
     "limits-and-continuity" → "calculus"
     "work-energy-power" → "work-energy-and-power"
     ```
   - Apply aliasing in:
     - **Frontend**: `components/content/topic-vertical-notes.tsx` lines 138-153 (syllabus-notes manifest loading)
     - **Frontend**: `components/content/ravikishan-topic-resources.tsx` lines 150-170
     - **Backend**: `api/ravikishan-notes.ts` direct file lookup logic (line 42-48)
8. For Physics `mechanics/` orphan (complex split):
   - Review each concept JSON and match it to the correct canonical physics unit based on content keywords:
     - `dimensions.json`, `errors.json`, `physical-quantity.json`, `s-f-rules.json`, `m-p-errors.json`, `l-s-a-q-and-n.json` → `physical-quantities/concepts/`
     - `vector.json` → `vectors/concepts/`
     - `pyqs/c-q-and-mcq.json` and `sets/*` → Split by content keyword into matching canonical units
   - Add merged files with `{slug}-from-mechanics.json` naming to avoid collisions.
9. For Physics `optics/` orphan:
   - Evaluate `n1.json`, `n2.json`, `n3.json`, `on1.json`, `opticsn1.json`, `reflection-at-curve-surface.json` for unique content.
   - Match each file to canonical optics sub-units (reflection-at-curved-mirror, refraction-at-plane-surfaces, etc.) by keyword. If content is too vague/unstructured, add as `notes/` general fallback under most relevant unit.

### Phase 4 — Verify All Content Is Discoverable
10. Manually test (or write a small script) that:
    - Every orphaned .md file renders at `/lessons/{slug}`.
    - `/lessons` library page lists all 12.
    - The home page new card links correctly.
    - A sample from each orphaned chemistry folder alias resolves in the Class 11 notes viewer.
    - The periodic table component stabilizes on load with < 5 useEffect runs.

## Dependencies and Considerations

- **Backward compatibility**: The alias strategy preserves both folder names on disk so nothing breaks for existing links that might reference the short slugs directly.
- **Content merge vs alias**: Aliasing is preferred over physical deletion for this iteration because:
  - No risk of data loss (deleting is destructive).
  - Users who may have bookmarked short paths still work.
  - We can do a physical merge + delete as a follow-up pass after confirming the alias layer works correctly.
- **Markdown rendering**: Frontend already has `MathMarkdown` (math-markdown.tsx) and `KaTeX` (katex.tsx) components — reuse these for the lessons viewer. Do NOT invent a new renderer.
- **Home page card grid**: KnowledgeLoksewaHub uses 2-col grid (sm:grid-cols-2), adding a 7th/8th card will display correctly in a 4/3 wrap pattern. No layout rewrite needed.
- **Backend route**: `/api/lessons/:slug` must sanitize slugs against a whitelist of known lesson names (path traversal protection). Do NOT accept arbitrary slug strings.

## Validation

1. **TypeScript build**: Run `npx tsc --noEmit -w frontend` and `npx tsc --noEmit -w backend` to confirm zero TS errors after changes.
2. **Content routing test**:
   - Visit `/lessons` → 12 cards rendered
   - Visit `/lessons/algebra` → markdown renders correctly, math expressions render
   - Visit `/home` → "Classic Lessons Library" card appears in Knowledge Hub; appears in Quick Search dropdown when typing "lesson"
3. **Periodic table loop check**: Load `/periodic-table` with React DevTools Profiler — useEffect for layout should fire < 5 times (currently may fire up to 20-30 or infinite depending on viewport).
4. **Alias resolution**: Open Class 11 Chemistry → Chemical Bonding notes tab in notes viewer. Confirm content from `chemical-bonding/` is merged with `chemical-bonding-and-shapes-of-molecules/` (more concepts than before).
5. **Run tests**: `npm run test -w frontend` if tests exist; otherwise manual spot-check is sufficient.

## Risks

| Risk | Handling |
|------|----------|
| Content merge creates duplicate files visible in UI | Use `Map<fileKey, entry>` dedupe in manifest builder to drop duplicate filenames; canonical folder wins over alias folder on conflict (prefer more fully-named folder's copy) |
| Lessons markdown contains raw LaTeX that breaks KaTeX | Use existing MathMarkdown renderer's error boundary / fallback. Wrap in Suspense + error boundary |
| `/lessons` route conflicts with any existing route | Glob-check first; report shows no conflict. If a conflict is found, use `/lesson-library` instead |
| Alias layer forgotten in ravikishan API route → 404s | Add unit tests or a script that probes every alias path through both the API and the frontend loader |
| Periodic table fix breaks zoom on some viewports | Test at breakpoints: 360px (mobile), 768px (tablet), 1440px (desktop). The `> 1` pixel guard should be safe everywhere. |
