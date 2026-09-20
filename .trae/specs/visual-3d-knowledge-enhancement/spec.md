# Specification — Visual Overhaul, 3D Enhancement, and Knowledge Content Integration

## Problem

Ravikisan's NEB (+2) Learning Platform has a functional foundation but currently:
1. **Visual design lacks brand cohesion** — accent colors (`--accent-cyan`, `--accent-violet`, etc.) are defined as raw HSL but not exposed through Tailwind utilities; typography uses Inter with no display/serif pairing; the page layout has consistent spacing but no responsive type scale, no decorative motif system, and no depth-layer vocabulary beyond `shadow-sm/md/lg`.
2. **3D components are technically present but visually underwhelming** — AnnotatedModelViewer ships 7 generic geometric primitives (icosahedron, torus, cube, etc.) with demo annotations; domain 3D scenes exist (biology cell, chemistry molecules, physics kinematics, math geometry) but do not share a unified visual pipeline (PBR materials, scene lighting rig, bloom/atmosphere, loading strategy, performance tiers). Knowledge content is not integrated *inside* 3D scenes — annotations are static and topic-agnostic.
3. **Knowledge content sits flat next to visuals, not within them** — the 18-field concept JSON (`formulas`, `keyPoints`, `confusion`, `examShortTricks`, `specialNotes`, `numericals`, `universalFacts`, `related`, `importantNotes`, `importantConcepts`, `importantStatements`, `importantTasks`, `bounds`, `practiceQuestions`, `practice`, `examples`, `examNotes`, `mcs`, `summary`) renders in the 2D `ConceptKnowledgeGrid` only; 3D viewers have no structured, clickable layer that exposes those fields as explorative hotspots.
4. **No cross-device / cross-browser verification harness** — three.js (R3F) works on desktop but mobile GPU constraints, WebGL context loss, SSR hydration, and reduced-motion fallbacks are handled by a single `webgl-fallback.tsx` with no LOD, no dpr clamping, and no performance budget.

This project systematically upgrades all three layers (visual system → 3D pipeline → content-in-3D integration) and closes the verification loop.

## Users

| Role | Context |
|---|---|
| **NEB Class 11/12 student (Nepal)** — primary. Reads on mobile (60%+), desktop at college. May have budget GPUs, intermittent data. Values exam focus over whiz-bang. Uses sepia/dark at night.
| **NEB Teacher / tutor** — secondary. Uses 3D on projector for class. Values label clarity, annotation persistence, quick jump between topics.
| **Platform content agent (AI / human)** — tertiary. Needs clear visual slotting so every new concept JSON field has a visible, discoverable UI target.

## Goals

1. **Visual System** — Define and implement a brand-aligned, accessible, responsive visual design system covering typography scale, extended color token palette (including per-subject accents), depth/elevation layers, motif/ornament, and responsive layout primitives.
2. **3D Pipeline** — Deliver a high-fidelity, performant shared 3D scene rig (lighting, PBR materials, atmosphere/bloom, post-processing, LOD tiers). Upgrade at least 4 domain showcase scenes (Biology: Cell, Chemistry: Molecule Builder, Physics: Projectile Motion, Math: Parabola/Geometry) to the new rig.
3. **Content Integration in 3D** — Connect every 3D hotspot/annotation to the 18 concept knowledge fields, so clicking a mitochondrion (cell) pops a compact `keyPoints`/`confusion`/`examShortTricks` mini-panel; clicking the H2O bond angle opens `formulas` + `importantStatements`. Provide keyboard, screen-reader, and pointer-friendly interaction.
4. **Performance & Accessibility** — Achieve 60 FPS target on desktop, 45+ on mid-tier mobile; WebGL fallback + reduced-motion honored; all knowledge text accessible via 2D fallback panels if WebGL is blocked.
5. **Verification** — Cross-browser (Chrome, Firefox, Safari) and cross-device (desktop ≥1024, tablet 768–1023, mobile <768) visual regression check; 3D perf sampling; accessibility (WCAG 2.1 AA target for all knowledge content, including 3D HTML overlays).

## Non-Goals

- Rewriting the syllabus router, auth, or backend API surface.
- Adding new subject content (e.g., adding more biology units).
- Real-time multiplayer or WebXR/VR hardware support (R3F `<XR>` is out of scope).
- Replacing three.js / React-Three-Fiber with a different engine.
- Changing the 8-theme class system (light/dark/cyberpunk/emerald/sepia/nord/amber/oled) — we extend tokens *within* each theme, not add themes.

---

## Functional Requirements

### FR-1: Visual Design System — Typography
- Establish a 12-step modular type scale on Inter (body) with a display pairing (use a free academic serif/sans such as Fraunces or Space Grotesk as `font-display`).
- Add utility classes for `.type-display-{sm|md|lg|xl}`, `.type-heading-{1..6}`, `.type-body-{sm|md|lg}`, `.type-numerical` (tabular), `.type-nepali` (Noto Sans Devanagari hinting).
- Nepali language glyphs must render ≥ 18 px before anti-aliasing visibly softens on mobile.
- Headings must use optical tracking adjustments (Tailwind `tracking-tight/tighter`).

### FR-2: Visual Design System — Color Palette
- Expose `--accent-cyan`, `--accent-violet`, `--accent-emerald`, `--accent-amber`, `--accent-rose` (already in globals.css) as first-class Tailwind colors with 50–950 weight variants.
- Add per-subject accent tokens that derive from the palette: `--subject-physics`, `--subject-chemistry`, `--subject-biology`, `--subject-mathematics`, `--subject-english`, `--subject-nepali`. These must be applied to lab page headers, sidebar icons, and 3D scene accent lighting.
- All text-on-color combinations must meet WCAG AA contrast (4.5:1 body, 3:1 large text) in *every* theme. Add a build-time lint or runtime dev warning if not.

### FR-3: Visual Design System — Depth, Elevation, and Layout Primitives
- Replace ad-hoc `shadow-sm/md/lg` classes with a semantic elevation scale: `elev-0` (flat) through `elev-7` (modal). Export via CSS vars mapped to Tailwind.
- Add responsive layout primitives: `.container-page` (max-w gated per breakpoint), `.content-grid` (auto 2/3/4-col responsive), `.stack-{xs..2xl}` (gap scale), `.ornate-rule` (a gradient subject-themed divider rule), and `.card-viz` (a reusable styled frame for visual/3D content with ISO title block + status chips).
- Ensure page chrome (AppShell) respects the elevation scale so headers are always visually above content.

### FR-4: Shared 3D Scene Rig
- Build a single `Shared3DScene` wrapper component that:
  - Applies a consistent 4-light rig (key, fill, rim, ambient + hemisphere) tinted to the per-subject accent color.
  - Adds `EffectComposer`-based post-processing with **tiered effects**: `low` (no effects), `medium` (FXAA + subtle bloom), `high` (Bloom + Vignette + AO). Tier is set automatically based on `navigator.hardwareConcurrency` + devicePixelRatio + mobile detection; user can override.
  - Implements automatic dpr clamping (max dpr ≤ 2 on mobile, ≤ 2.5 on desktop hiDPI).
  - Provides a loading strategy: Suspense + Fallback with progress for GLTFs, `<Preload all>` for small primitives.
  - Exports a `KnowledgeHotspot` primitive: `<Html>`-backed 3D-positioned marker that opens `<KnowledgeSpotPanel>` containing rendered fields from a concept JSON key set.
- Define PBR material presets: `mat-cell-cytoplasm`, `mat-cell-membrane`, `mat-glass-water`, `mat-metal-lab`, `mat-chalkboard`, `mat-paper-notes`.

### FR-5: 4 Upgraded Showcase 3D Scenes
Each upgraded scene must use the Shared3DScene rig and expose ≥ 6 `KnowledgeHotspot`s linked to concept JSON fields.

| Scene | Showcase ID | Upgrade Targets |
|---|---|---|
| **Biology — Cell Ultrastructure** | `/lab/biology/bio-3d-cell` → `biology-cell-3d.tsx` | PBR nucleus + nucleolus + rER + sER + Golgi + mitochondria + chloroplasts (plant toggle) + lysosomes. Hotspots link `keyPoints`, `importantConcepts`, `universalFacts`, `confusion`, `examShortTricks`, `specialNotes` from biology concept JSON. Switch between Plant/Animal with label set swap. |
| **Chemistry — Molecular Builder** | `/lab/chemistry/chemistry-molecules` → `chemistry-3d-molecules.tsx` | 8 preset molecules (H₂O, NH₃, CH₄, NaCl lattice, benzene, ethanol, acetic acid, caffeine). Ball-and-stick + space-filling toggle. Bond angle hotspots open `formulas` + `importantStatements` + `bounds` (bond length ranges). |
| **Physics — Projectile Motion** | `/lab/physics/...` → `projectile-motion-3d.tsx` | Animated trajectory with draggable θ and u sliders, live T/H/R readouts, velocity vector cones at each sample, parabolic parabola ribbon. Hotspots at launch, apex, impact → `formulas`, `keyPoints`, `confusion`, `examShortTricks`, `numericals`, `practice`. |
| **Mathematics — Parabola & Analytic Geometry** | `/lab/math/...` → `math-geometry-3d.tsx` | Interactive parabola y = ax² + bx + c with a/b/c sliders, focus/directrix visualization, tangent line, latus rectum. Hotspots open `formulas` + `importantNotes` + `examShortTricks` + `bounds` (limits at infinity). |

### FR-6: Knowledge Content Integrated Inside 3D
- `KnowledgeSpotPanel` (HTML overlay inside R3F `<Html occlude>`): compact 2-column accordion card. Column 1 = core fields (`formulas`, `keyPoints`, `confusion`, `examShortTricks`); Column 2 = contextual fields (varies by hotspot type). Markdown + KaTeX must render. Close button; keyboard Esc closes.
- Concept JSON routing: the 3D scene page must accept `classSlug`, `subjectSlug`, `unitId`, `topicSlug` via query params (or route) and resolve the matching concept entry via existing `useTopicConcept` hook. Fallback gracefully if missing.
- **Every `KnowledgeHotspot` must also emit to a 2D side panel `SpotIndex`** — a scrollable list of all hotspots with icons and counts (click-to-focus). This ensures accessibility if user cannot use pointer + WebGL.

### FR-7: Lab Page Shell Upgrade
- Every 3D lab page (`/lab/<subject>/<labId>/page.tsx`) uses the new `.card-viz` visual frame: ISO title block (subject chip, unit chip, topic chip, NEB alignment badge + status chip), content split into `[ 3D viewer (flex-1) : Knowledge sidebar (w-96 on desktop, collapsible to drawer on mobile) ]`.
- The sidebar must expose: SpotIndex → Summary card → Full 18-field knowledge grid (reusing existing `ConceptKnowledgeGrid`).

### FR-8: Home Page Hero Visual Upgrade
- Home hero (`home-command-center.tsx`) gains a **3D brand marquee** — a lightweight R3F canvas (auto pauses on reduced-motion / mobile data saver) showing a slow-rotating tetrahedron of 4 subject icons (nucleus/atom/DNA/calculus curves) with subject-tinted lighting. Must load ≤ 30 KB GPU memory.
- Quick-search dock items get per-category visual pill styling based on subject tokens (FR-2).
- All HUB sections (`CurriculumTracksHub`, `VirtualLabsCatalog`, `AcademicRigorHub`, `AssessmentExamHub`, `KnowledgeLoksewaHub`, `AIAssistantWorkspace`) adopt the elevation (FR-3) and per-subject accents (FR-2) consistently.

### FR-9: Cross-Device & Cross-Browser Verification Harness
- **Responsive breakpoints verified** by running the page through manual layout checks at 360, 768, 1024, 1280, 1920 widths. At each width: confirm AppShell chrome fits without horizontal scroll; 3D viewer ≥ 320 px wide; sidebar collapses correctly <1024; text does not clip.
- **3D performance budget**: Desktop FPS ≥ 60 for all showcase scenes on Intel Iris Xe class GPU (sampled 10 s). Mobile (mid-tier) FPS ≥ 45 with `low` tier, ≥ 30 with `medium`. No memory leaks over 2 min of orbit/animation cycles.
- **Browser matrix**: Chrome (latest), Firefox (latest), Safari (latest macOS + iOS) — WebGL 2.0 context creation succeeds, hotspots are clickable, panels close.
- **Fallback / Accessibility**: If WebGL fails, `webgl-fallback.tsx` renders the 2D `SpotIndex` + full knowledge grid + a labeled diagram (SVG or static image) in place of canvas. Reduced-motion disables auto-rotate, particle systems, and marquee background animations.

---

## Non-Functional Requirements

### NFR-1: Performance
- First Input Delay ≤ 100 ms; Largest Contentful Paint ≤ 2.5 s (home) and ≤ 3.5 s (any 3D lab page), as measured by Lighthouse (mobile throttled).
- 3D memory budget per page (GPU + main) ≤ 250 MB on desktop, ≤ 120 MB on mid-tier mobile.
- JS bundle delta: ≤ 40 KB gzipped net increase over current frontend build (measured via `next build` analysis of the affected chunks).

### NFR-2: Accessibility
- WCAG 2.1 AA for all knowledge content, all 2D UI, and all HTML-overlays-on-3D.
- Color contrast compliance for text in every theme (FR-2).
- All interactive elements (hotspots, sliders, collapse buttons, theme toggles) have visible focus rings and keyboard interaction (Tab/Enter/Space/Esc).
- `aria-live="polite"` region announces the currently active 3D hotspot title + summary sentence when it opens.
- Reduced-motion media query honored: disable auto-rotate, marquees, and animated trajectories (replaced with static diagrams).

### NFR-3: Maintainability & Agent Guidance
- All 18 concept fields must have **explicitly visible, always-discoverable** empty-state placeholder UI when not populated (already partially done in `ravikishan-concept-panels.tsx`; extend to 3D `SpotIndex` and `KnowledgeSpotPanel` so every agent adding content sees the 18-field *slot map* in both 2D and 3D).
- Write type contracts: `KnowledgeHotspotProps`, `SubjectAccentTokens`, `3DTierPreset`.
- Keep file modification surface minimal; when adding new components, group under `frontend/components/lab/3d-rig/` subfolder so 3D pipeline code lives in one module.

### NFR-4: Build Stability
- `npm run typecheck -w frontend` passes with zero errors after every change.
- No new `any` types introduced without a `// eslint-disable-next-line` + 1-line rationale comment.
- `next build` (frontend) succeeds; SSR hydration for 3D pages uses `dynamic(() → …, { ssr: false })` pattern where R3F is used.

---

## Constraints, Dependencies, Assumptions

### Constraints
- Use only dependencies already in `frontend/package.json` (R3F, drei, gsap, three, lucide-react, katex, tailwind). No new 3D/post-processing libraries are added unless a sub-dependency of drei.
- Keep the existing 8-theme class names and color foundations; *extend* tokens, do not restructure themes.
- NEB-aligned content accuracy takes priority over visual flair: if a PBR material would obscure a required label, legibility wins.

### Dependencies
- Existing: `@react-three/fiber`, `@react-three/drei`, `three`, `gsap`, `lucide-react`, `katex`, `class-variance-authority`, `tailwind-merge`.
- Explicit: concept JSON manifests at `frontend/public/data/ravikishan/manifest.json` (through `useTopicConcept`) are the *sole* source of knowledge data — do not hardcode content strings inside 3D components.

### Assumptions
- The user's device supports WebGL 2.0 as baseline; if not, the existing fallback path is enhanced per FR-9.
- Mobile is ≥60% of traffic; all breakpoints and tier defaults assume mobile-first optimization.
- Students prefer exam-focused hotspots (`examShortTricks`, `confusion`, `numericals`) to decorative animations — hence panels default to those fields open.

---

## Open Questions

1. **Brand display font**: Inter body + Fraunces (serif) vs Inter body + Space Grotesk (display sans)? Default to Space Grotesk unless user overrides; it pairs with Noto Sans Devanagari better for mixed-language headings.
2. **Post-processing scope**: FXAA + Bloom is the baseline; is SSAO (Screen-Space Ambient Occlusion) worth the GPU cost on `high` tier *only*? Proceed with AO on high tier with toggle.
3. **Home 3D marquee payload**: 30 KB budget. If an animated tetrahedron exceeds that, fall back to a CSS-animated 2D gradient blob canvas (no R3F on home).

---

## Acceptance Criteria

All ACs are either `rule` (binary pass) or `rubric` (scored 0–4, threshold ≥ 3).

| ID | Type | Criterion | Threshold / Evidence |
|---|---|---|---|
| AC-01 | rule | `tailwind.config.ts` exposes subject accent tokens and 50–950 weight variants for all 6 `accent-*` colors. | Inspect `globals.css` + Tailwind config; `text-subject-biology-600` compiles without errors; CSS vars are set per theme. |
| AC-02 | rule | Modular type scale (12-step) with `font-display` pairing is implemented; `.type-display-*` and `.type-heading-*` utilities exist, compile, and render. | DOM inspection of home hero headings; computed font families include the display pair. |
| AC-03 | rule | Elevation scale `elev-0..elev-7` CSS vars are defined in globals.css, exported to Tailwind, and used by the AppShell + Hub cards + lab page shells. | Grep for `elev-` usage across 2D UI; the 7-tiered shadows visibly differ by height. |
| AC-04 | rubric | Color contrast compliance (WCAG AA) on all text-on-color combos across all 8 themes (body 4.5:1, large text 3:1). | Score 0–4: 4 = zero failures; 3 = 1–2 low-priority fails in decorative only; 2+ fails on primary text → fail. Evidence: axe-core or manual Stark/Contrast ratios logged. |
| AC-05 | rule | `Shared3DScene` wrapper implements: 4-light subject-tinted rig, `low/medium/high` post-processing tiers, dpr clamping, Suspense+Fallback loading, and `KnowledgeHotspot` primitive. | Render each showcase scene; toggle tiers in dev tools; confirm light colors shift by subject; confirm `dpr` caps at ≤ 2 on mobile via Chrome DevTools device emulator. |
| AC-06 | rule | 4 showcase scenes (Cell, Molecules, Projectile, Geometry) each import `Shared3DScene`, use PBR material presets, have ≥ 6 KnowledgeHotspots, and 2D SpotIndex sidebar. | Code review: each scene renders `<Shared3DScene>` at root; count hotspots ≥ 6; SpotIndex present in DOM. |
| AC-07 | rule | Clicking any KnowledgeHotspot in any showcase scene opens `KnowledgeSpotPanel` rendering real concept JSON fields (not demo strings) resolved via the existing `useTopicConcept` hook pattern. | On projectile page with `?class=class-11-notes&subject=physics&unit=kinematics&topic=projectile-motion`, click the apex hotspot — panel shows 5+ formulas/markdown strings matching the concept JSON manifest. |
| AC-08 | rule | 3D lab pages adopt `.card-viz` shell with ISO title block and collapsible knowledge sidebar (drawer on mobile). | Screenshots at 360/768/1280 widths; title block chips are present; sidebar collapses; zero horizontal scroll. |
| AC-09 | rubric | Home hero marquee (3D or CSS fallback) is subject-themed, respects reduced-motion, and loads within 30 KB GPU memory. | Score 0–4. 4 = R3F marquee, respects media, ≤30 KB; 3 = CSS fallback on mobile only; 2 = loads but is heavier than budget; fail otherwise. Evidence: performance sampler. |
| AC-10 | rule | Performance budget: ≥ 60 FPS desktop / ≥ 45 FPS mid-tier mobile (low tier) across 4 showcases; no leaks over 2 min. | FPS sampled via R3F `useFrame`; Δ memory ≤ 10 MB after 2 min orbit stress. |
| AC-11 | rule | Cross-browser matrix (Chrome, Firefox, Safari latest — desktop + iOS Safari): 3D context creation succeeds; KnowledgeHotspots respond to click/tap; Esc closes panel; reduced-motion disables auto-rotate. | Manual check or CI screenshot matrix; pass/fail logged per browser. |
| AC-12 | rubric | Knowledge content discoverability in 3D: agents/students can identify all 18 concept fields' slot locations in ≤ 20 s of landing on a lab page. | Score 0–4: 4 = every empty field shows an explicit placeholder ("Empty — populate keyPoints…") in both 2D grid AND 3D SpotIndex; 3 = 12+ visible; 2 = 8+; below = fail. Evidence: count placeholders on an empty-concept stub. |
| AC-13 | rule | Accessibility: all hotspots have focus rings and keyboard activation; `aria-live` region announces hotspot summary; `prefers-reduced-motion` disables all scene auto-animation. | Tab through hotspots with keyboard; turn on NVDA/VoiceOver; verify aria-live fires; reduced-motion media query removes marquee + auto-rotate. |
| AC-14 | rule | Build stability: `npm run typecheck` zero errors; `next build` succeeds; no SSR hydration errors on `/lab/**` routes. | Run both commands; clean output. |
| AC-15 | rule | All 18 concept fields (`formulas`, `keyPoints`, `confusion`, `examShortTricks`, `specialNotes`, `numericals`, `universalFacts`, `related`, `importantNotes`, `importantConcepts`, `importantStatements`, `importantTasks`, `bounds`, `practiceQuestions`, `practice`, `examples`, `examNotes`, `mcs`, `summary`) are rendered by at least one UI surface (2D grid OR 3D hotspot panel) with a typed contract on `ConceptData`. | `ConceptData` type lists all 18+ fields; grep for each field name in UI code — all are referenced and rendered. |
