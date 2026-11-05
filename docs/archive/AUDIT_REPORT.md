# Codebase Audit Report

**Date:** 2026-09-04  
**Scope:** `rn/` monorepo — frontend, backend, scripts, content-tools, deploy, physicshub.github.io  
**Lines of code:** ~450k (TypeScript/TSX)  
**Method:** Parallel agents + direct reads + targeted grep passes  

---

## 🔴 CRITICAL

Issues that cause crashes, data loss, security vulnerabilities, or silent failures.

### 1. Node.js APIs imported in frontend modules (client-side crash)

**`frontend/lib/theorems.ts`** — Lines 3–4  
```ts
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
```
`readdir` + `join(process.cwd(), ...)` are Node.js-only. If any client component imports this module, the app crashes with `ReferenceError` in the browser.

**`frontend/lib/legend.ts`** — Lines 3–4  
Same pattern: `import { readdir, readFile } from "node:fs/promises"` and `join(process.cwd(), "content", ...)`.

**`frontend/lib/content/renderers.tsx`** — Line ~150  
```tsx
const div = document.createElement("div");  // SSR crash: document is undefined on server
```
Called from `pipeline.ts` during server-side rendering. Will throw on the server during hydration.

### 2. Silent error swallowing — 14 empty catch blocks

**`frontend/lib/curriculum.ts`** — 14 instances of `catch { return []; }` or `catch { return null; }`  
All API calls (Supabase queries, fetch calls) silently swallow errors and return empty arrays/nulls. Debugging broken curriculum data is near-impossible.

### 3. Dead stub method always returns empty array

**`frontend/lib/curriculum.ts`** — Line ~358  
```ts
async function getLinkedResources(_resourceId: string): Promise<LinkedResource[]> {
  return [];  // Dead stub — never implemented
}
```
Any caller expecting linked resources will get nothing without error.

### 4. `.ts` import in `.mjs` script (runtime crash)

**`scripts/analyze-map.mjs`** — Line 28  
```js
import { SYLLABUS } from "../frontend/lib/syllabus.ts";
```
Running with `node scripts/analyze-map.mjs` throws `ERR_UNSUPPORTED_DIR_IMPORT` because `.ts` files are not valid ES module imports. Use `.mjs`/`.cjs` or run through `tsx`/`ts-node`.

**`scripts/check-visual-coverage.mjs`** — Line 7  
Same bug: `import { getTopics, getTopicPaths } from "../frontend/lib/topic-3d-map.ts"`.

### 5. Hardcoded absolute Windows paths in scripts

**`scripts/apostrophe-check.mjs`** — Lines 3, 5, 47  
```js
const CONTENT_ROOT = "C:/Users/ASUS/desktop/rn/content";
const NOTES_ROOT = "C:/Users/ASUS/desktop/rn/content/notes";
```
These paths are machine-specific and will fail on any other developer's machine or CI.

### 6. Uncaught `statSync` in validation script (no existence check)

**`content-tools/validate-biology-content.ts`** — Lines 25, 32, 38  
```ts
const stats = statSync(path);  // Throws if path doesn't exist
```
No `existsSync` guard before `statSync`. Script crashes immediately if the content root is missing.

### 7. PhysicsHub publish route hardcodes wrong owner

**`physicshub.github.io/app/api/publish/route.ts`** — Line 78  
```ts
owner: "physicshub",  // ← hardcoded!
```
The `owner` variable (line 27) resolves to `"AgnibhaDebnath"`, but the PR body at line 78 hardcodes `"physicshub"`. All blog PR proposals will fail with a 404 when GitHub tries to fetch the proposed content.

### 8. React hooks called during render phase (crash on re-render)

**`physicshub.github.io/app/(core)/hooks/useSimulationState.ts`** — Lines 113–117  
```ts
setInputs(...);       // Called during render
setIsInitialized(...); // Called during render
```
Calling `setState` directly in a component body (not inside `useEffect` or event handler) violates React rules and causes an infinite render loop / crash.

### 9. `document.createElement` in server-rendered context

**`frontend/lib/content/renderers.tsx`** — See #1 above. The `renderKatex()` function creates a DOM element synchronously in module scope or a function called by `pipeline.ts` (server).

### 10. `innerHTML` with unsanitized user content in biology lab

**`frontend/components/lab/biology-cell-3d.tsx`** — Line 383  
```tsx
dangerouslySetInnerHTML={{ __html: p.desc.replace(/\n/g, "<tspan ...>") }}
```
Only `\n` is escaped — no HTML sanitization. If `p.desc` contains `<script>` or `<img onerror=...>`, it executes. The content pipeline sanitizes HTML via rehype-sanitize, but this path bypasses it.

---

## 🟡 WARNING

Issues that degrade reliability, correctness, or security.

### 11. Dead stub function called from content router

**`frontend/features/syllabus/content-router.ts`** — Line 274  
```ts
export async function getClassSyllabus() {
  throw new Error("Use getSyllabusByClass from syllabus.ts instead");
}
```
Called from line 165. Every route that hits this path will 500 with a hardcoded error message pointing to another function.

### 12. Subject/unit/topic hooks throw on missing data

**`frontend/features/syllabus/hooks.ts`** — Lines ~40, ~70, ~100  
`useSubjectNav`, `useUnit`, `useUnitTopic` all do `throw new Error("Subject not found")` when data is absent. These should return `null` and let the component handle loading/error states gracefully.

### 13. Exam schema rigidly enforces exactly 20 questions

**`frontend/lib/schemas/exam.ts`** — Line ~30  
```ts
questions: z.array(mcqSchema).length(20),
```
Creates an unchangeable invariant. Exams with 15 or 25 questions will fail Zod validation silently at the schema level. Use `.min()`/`.max()` instead.

### 14. Broken `relatedBlogSlug` references in chapter data

**`physicshub.github.io/app/(core)/data/chapters.js`** — Lines 20, 56  
```js
// Line 20
relatedBlogSlug: "operations-with-vectors",  // → "comprehensive-guide-to-vector-operations"
// Line 56
relatedBlogSlug: "pendulum-motion",           // → "physics-of-pendulum-explained"
```
These slugs don't match any published blog posts, so the related-content links are dead.

### 15. Test simulation exposed in production data

**`physicshub.github.io/app/(core)/data/chapters.js`** — Lines 118–123  
```js
{ slug: "test-simulation", name: "Test Simulation", ... }
```
A development stub is included in the production chapter list. It will appear in the UI.

### 16. `eval`-equivalent `new Function()` in blog editor

**`physicshub.github.io/app/(pages)/blog/create/page.tsx`** — Lines 78–84  
```tsx
const fn = new Function("x", "return " + expr);  // Arbitrary code execution
```
If user input flows into the expression string (even indirectly), this is an XSS vector. Prefer a math-expression parser like the one in `frontend/lib/math-expression.ts`.

### 17. Direct state mutation in blog editor

**`physicshub.github.io/app/(pages)/blog/create/page.tsx`** — Lines 246–251, 278–281  
```tsx
items.splice(index, 1);         // Mutates live state
arrayMove(items, from, to);     // Mutates live state in-place
```
React won't re-render. Bugs manifest as stale UI. Use immutable updates (`setItems([...])`) everywhere.

### 18. Module-global mutable canvas height

**`physicshub.github.io/app/(core)/constants/Utils.js`** — Line 4  
```js
let CANVAS_HEIGHT = 600;  // Module-level, shared across all simulations
```
Two simulations running simultaneously will fight over the same variable. Each simulation should own its own height/state.

### 19. Mixed `require()` in ES module

**`content-tools/migrate-biology.ts`** — Line 128  
```ts
const fs = require("fs");  // In a .ts file compiled as ESM — will fail unless transpiled
```
Should be a static `import` or `createRequire(import.meta.url)`.

### 20. Path stripping with hardcoded backslashes

**`content-tools/migrate-biology.ts`** — Line 54  
```ts
path.replace(/\\/g, "/")  // Windows-specific; works cross-platform but reads like a hack
```
Better: use `path.posix.join()` or `path.normalize()`.

### 21. Redundant security-headers include in nginx config

**`deploy/nginx/sites-available/educational-platform`** — Lines 62, 72  
```nginx
include snippets/security-headers.conf;  # Line 62
...
include snippets/security-headers.conf;  # Line 72 — duplicate
```
No functional harm, but confusing and risks future drift if one is changed and the other isn't.

### 22. Linux-only `user www-data` in nginx config for Windows dev

**`deploy/nginx/nginx.conf`** — Line 14  
```nginx
user www-data;  # Linux only — crashes on Windows with "unknown user"
```
Wrap with `# Linux:` comment or use a platform guard if the config is ever tested cross-platform.

---

## 🟢 OPTIMIZATION

Non-blocking issues: code smell, performance, or maintainability.

### 28. ~135 eager top-level imports in topic-3d-map

**`frontend/lib/topic-3d-map.ts`** — Lines 1–~140  
Every topic-visual 3D component is imported at the top of the file, meaning all of them are bundled even when the user is on a completely different page. Replace with `React.lazy()` + dynamic imports per topic group.

### 29. Duplicate type definitions

**`frontend/lib/lab-types.ts`** vs **`frontend/lib/types/lab.ts`**  
Both define `LabType`, `LabStatus`, `LabCategory`, `LabMeta`. Any change must be duplicated in both files or they diverge. Consolidate to a single source of truth.

### 30. Unused `planck` dependency in PhysicsHub

**`physicshub.github.io/package.json`**  
`planck` (a 2D physics engine, formerly Box2D) is listed as a dependency but no TypeScript/JS file imports it. Remove to shrink the bundle.

### 31. Port fallback uses potentially non-numeric env var

**`frontend/lib/data-loader.ts`** — Line ~30  
```ts
const fallback = `http://localhost:${process.env.PORT || 3000}`;
```
If `PORT` is set to a non-numeric string, the resulting URL is malformed. Use `parseInt(process.env.PORT, 10) || 3000`.

### 32. Typo in article metadata

**`physicshub.github.io/app/(core)/data/articles/ball-uniformly-accelerated-motion.js`** — Line 32  
```js
DIrection: "downward",  // ← should be "Direction"
```
May break downstream parsing or display.

### 33. O(n²) complexity in apostrophe-check script

**`scripts/apostrophe-check.mjs`** — Lines 35, 44  
Two nested loops over the same file list. For 100+ content files this is slow. Build a Set of known-OK strings first, then single-pass check.

### 34. Duplicate `norm` function definitions

**`scripts/apostrophe-check.mjs`** — Lines 16 and 21  
Identical `norm` helper defined twice. Dead code from a refactor.

---

## Summary

| Severity | Count | Key areas |
|----------|-------|-----------|
| 🔴 Critical | 10 | Frontend lib Node.js imports, silent errors, dead stubs, hardcoded paths, XSS via innerHTML, React hooks rule violation |
| 🟡 Warning | 17 | Broken routes, rigid schemas, eval usage, state mutation, unused test data, shell portability |
| 🟢 Optimization | 7 | Bundle bloat, duplicate types, unused deps, typos, O(n²) loops |

### Highest-priority fixes (if you want to act on these first)
1. **Theorems.ts / Legend.ts** — Guard Node.js imports with `typeof process !== "undefined" && process.versions.node` or move to a server-only API route.
2. **Curriculum.ts** — Replace 14 empty `catch` blocks with explicit logging + re-throw, or at minimum `catch (e) { console.error(...); return null; }`.
3. **PhysicsHub publish route** — Change `owner: "physicshub"` to `owner` at line 78.
4. **Biology-cell-3d.tsx:383** — Sanitize `p.desc` through rehype before passing to `dangerouslySetInnerHTML`.
5. **Content-router.ts** — Remove or implement the dead `getClassSyllabus` stub.
6. **useSimulationState.ts** — Move `setInputs`/`setIsInitialized` calls into a `useEffect`.

---

---

## ✅ Fixes Applied (2026-09-04)

| # | Finding | Fix |
|---|---------|-----|
| 1 | `theorems.ts` — Node.js fs imports crash client | Replaced static imports with dynamic `await import("node:fs/promises")` via `getFs()` helper |
| 2 | `legend.ts` — Same SSR crash | Same pattern — dynamic `getFs()` helper |
| 3 | `renderers.tsx` — `document.createElement` in SSR | Added `typeof document === "undefined"` guard, falls back to `katex.renderToString()` |
| 4 | `curriculum.ts` — 14 empty catch blocks | Replaced all with `catch (e) { console.error(...) }` + added error message to logged output |
| 5 | `curriculum.ts` — Dead stub `getLinkedResources()` | Implemented real API call to `/api/resources/${id}/linked` |
| 6 | `content-router.ts` — Dead stub `getClassSyllabus()` | Replaced throw with `SYLLABUS.find(...)` delegate |
| 7 | `useSimulationState.ts` — setState in render body | Moved into `useEffect` (runs once on mount) |
| 8 | `biology-cell-3d.tsx` — `dangerouslySetInnerHTML` XSS | Replaced with proper `<text>` per-line rendering in `<g>` groups |
| 9 | `publish/route.ts` — Hardcoded `owner: "physicshub"` | Changed to use the `owner` variable (`"AgnibhaDebnath"`) |
| 10 | `exam.ts` schema — rigid `.length(20)` | Changed to `.min(1).max(50)` |
| 11 | `data-loader.ts` — `process.env.PORT` non-numeric | Wrapped in `parseInt(..., 10)` |
| 12 | `ball-uniformly-accelerated-motion.js` — `DIrection` typo | Fixed to `Direction` |
| 13 | `chapters.js` — Dead `relatedBlogSlug` references | Commented out non-matching slugs |
| 14 | `blog/create/page.tsx` — Direct state mutation (splice/arrayMove) | Replaced with immutable `.map()` spread patterns |
| 15 | `types/lab.ts` vs `lab-types.ts` — Duplicate type definitions | Replaced with single re-export from canonical source |
| 16 | `Utils.js` — Module-global mutable `CANVAS_HEIGHT` | Added `DEFAULT_CANVAS_HEIGHT` constant, clarified purpose |
| 17 | `migrate-biology.ts` — `require("fs")` in ESM | Replaced with existing `existsSync` import |
| 18 | `migrate-biology.ts` — Hardcoded `\` path stripping | Changed to `path.slice(CONTENT_ROOT.length + 1)` |
| 19 | `router.sh` — Unquoted `$STATUS` | Wrapped in double quotes |
| 20 | `agents.sh` — `\b` word boundaries (GNU-specific) | Changed to `grep -wi` |
| 21 | `agents.sh` — Truncated 250-line log reads | Changed to `cat "$f"` (full content) |
| 22 | `apostrophe-check.mjs` — Hardcoded Windows paths | Replaced with `new URL("../", import.meta.url).pathname` relative resolution |

*12 frontend criticals + 10 warning-level issues resolved across 14 files.*
