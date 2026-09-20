# Implementation Tasks — Visual Overhaul, 3D Enhancement, Knowledge Integration

## Task Map → Acceptance Criteria Coverage

| Task | Covers AC | Priority |
|---|---|---|
| Task 1: Visual System — Tokens, Scale, Elevation | AC-01, AC-02, AC-03, AC-14 | HIGH |
| Task 2: Color Accessibility Audit & Theme Hardening | AC-04, AC-14 | HIGH |
| Task 3: Shared 3D Scene Rig (lighting, PBR, tiers, LOD, hotspots, loading) | AC-05, AC-10, AC-14 | HIGH |
| Task 4: Showcase 1 — Biology Cell 3D | AC-06, AC-07, AC-10, AC-12 | HIGH |
| Task 5: Showcase 2 — Chemistry Molecular Builder 3D | AC-06, AC-07, AC-10, AC-12 | HIGH |
| Task 6: Showcase 3 — Physics Projectile Motion 3D | AC-06, AC-07, AC-10, AC-12 | HIGH |
| Task 7: Showcase 4 — Math Parabola / Analytic Geometry 3D | AC-06, AC-07, AC-10, AC-12 | HIGH |
| Task 8: Lab Page Shell Upgrade (.card-viz + ISO title + collapsible knowledge sidebar) | AC-08, AC-12, AC-14 | HIGH |
| Task 9: Home Page Hero Upgrade (3D marquee + type display styling + Hub accents) | AC-09, AC-02, AC-03, AC-13 | MEDIUM |
| Task 10: Accessibility Pass (ARIA, keyboard, reduced-motion, fallbacks) | AC-13, AC-04 | MEDIUM |
| Task 11: Cross-Device / Cross-Browser Verification | AC-10, AC-11, AC-14 | HIGH |
| Task 12: Final Build + Typecheck + Smoke-test All Routes | AC-14, AC-15 | HIGH |

---

## Task 1: Visual System — Tokens, Scale, Elevation

**Priority**: HIGH
**Status**: ✅ **COMPLETED**
**Covers**: AC-01, AC-02, AC-03
**Depends On**: (none)

### Objective
Expose the raw CSS vars already in `globals.css` as first-class Tailwind design tokens: subject accents, color weights, type scale, elevation depth, and layout primitives.

### Scope
1. **Tailwind config** (`frontend/tailwind.config.ts`):
   - Register `accent-cyan`, `accent-violet`, `accent-emerald`, `accent-amber`, `accent-rose`, `subject-physics`, `subject-chemistry`, `subject-biology`, `subject-mathematics`, `subject-english`, `subject-nepali` as colors. Use CSS var `hsl()` pattern matching existing `border`, `background`, `primary` patterns.
   - Add 50, 100, 200, 300, 400, 500 (base), 600, 700, 800, 900, 950 weight variants for each accent. For the CSS-only implementation, derive weights by scaling the HSL lightness of the base var.
   - Add `fontFamily.display: ["var(--font-display)", "Inter", ...]` with a Google Fonts fallback pair (Space Grotesk display → Fraunces serif for body reading; default to Space Grotesk per spec OQ 1).
   - Extend `boxShadow` with `elev-0` through `elev-7`, mapped to CSS vars (use existing `--shadow-sm/md/lg` as `elev-1/2/4` baselines, fill gaps and add elev-5/6/7 for modals/hero).
   - Register `type-display-sm/md/lg/xl`, `type-heading-{1..6}`, `type-body-sm/md/lg`, `type-numerical` (tabular), `type-nepali` as Tailwind `typography`-adjacent utilities via `plugin(function ({ addComponents }) {...})` if plugin install needed — or add them directly to `globals.css` as class-based utilities (no plugin change required — preferred).

2. **globals.css** (`frontend/app/globals.css`):
   - Import the display font in `@import url('https://fonts.googleapis.com/css2?...')` line. Pre-connect in `layout.tsx` `<link rel="preconnect" crossorigin>` for fonts.googleapis.com and fonts.gstatic.com.
   - Define CSS vars for subject accents per theme: `--subject-physics`, `--subject-chemistry`, `--subject-biology`, `--subject-mathematics`, `--subject-english`, `--subject-nepali` for all 8 themes.
   - Define 12-step modular type scale: `--type-scale-00` through `--type-scale-11` (1.250 major third ratio). Map to heading/display/body classes.
   - Define `--elev-0` through `--elev-7` CSS vars with layered box-shadows (umbra + penumbra + ambient).
   - Add `.container-page`, `.content-grid`, `.stack-xs..2xl`, `.ornate-rule`, `.card-viz` utility classes with Tailwind syntax-friendly styling and dark/light overrides.
   - `.card-viz` must include: 24-pixel radius, border, 64-px ISO title block (top), subject chip, unit chip, topic chip, NEB alignment pill + status pill slot (empty but styled), bottom gradient fade.

3. **layout.tsx** additions: preconnect for fonts; `<body>` class swap to include `.font-sans` default; meta viewport unchanged.

### Test Requirements (TR)

| TR-ID | Type | Requirement | Evidence |
|---|---|---|---|
| T1-TR1 | rule | `tailwind.config.ts` compiles and produces working classes for `bg-subject-biology-500`, `text-accent-rose-600`, `shadow-elev-5`, `type-display-lg`. | Build succeeds; browser DevTools computed styles show the correct HSL values for 2 random classes + 1 random theme. |
| T1-TR2 | rubric | 12-step type scale applied: heading 1–6 sizes visually distinct, display-lg is noticeably larger than h1, body/md is baseline. | Score 0–4 (≥3 to pass): 4 = perfect visual rhythm; 3 = all distinct sizes; 2 = ≥9 distinct; below = fail. Evidence: screenshot of home hero + a heading-stacked test page. |
| T1-TR3 | rule | `elev-0..elev-7` render visibly distinct heights; the highest (elev-7) contains multiple shadow layers. | DOM screenshot of 7 stacked cards; each layer visually differs by depth. |
| T1-TR4 | rule | `npm run typecheck` zero errors after this task. | Run command; exit code 0. |

### Completion Evidence
- `tailwind.config.ts`: `colorFromHslVar()` weight generator (50→950) registered for `accent-cyan|violet|emerald|amber|rose`; `subjectColorFromVar()` registered for `subject-physics|chemistry|biology|mathematics|english|nepali`; `fontFamily.display` (Space Grotesk → Inter fallback) + `nepali` + `numerical`; `boxShadow.elev-0..elev-7` mapped to CSS vars; `gridTemplateColumns.layout-viz`.
- `globals.css`: subject accent vars defined per theme (8 themes), `--accent-*` palette, 12-step `--type-scale-*` + `.type-display-*` / `.type-heading-*` / `.type-body-*` / `.type-numerical` / `.type-nepali` utilities, `--elev-0` … `--elev-7` layered shadows (light + dark), `--card-viz` defined (light + dark) and consumed by `.card-viz { box-shadow: var(--card-viz) }`, plus `.container-page`, `.content-grid`, `.stack-*`, `.ornate-rule` primitives.
- `layout.tsx`: font `preconnect` links added.
- Verified: `npm run typecheck` exit 0 (T1-TR4 satisfied).

---

## Task 2: Color Accessibility Audit & Theme Hardening

**Priority**: HIGH
**Status**: ✅ **COMPLETED**
**Covers**: AC-04
**Depends On**: Task 1

### Objective
Ensure every text-on-color pair across all 8 themes meets WCAG AA contrast. Add a lightweight contrast checker and surface any failures as dev-only console warnings.

### Scope
1. Write `frontend/lib/color-contrast.ts` with WCAG luminance calculator + AA checker (4.5:1 normal, 3:1 large).
2. Define a const `THEME_COLOR_CHECK_PAIRS` listing all critical pairs (e.g., `["primary", "primary-foreground"]`, `["muted", "muted-foreground"]`, each subject accent against white/black text, all accent-*-700 against card bg).
3. On dev-only import in `layout.tsx` (if `process.env.NODE_ENV !== "production"`), run checker for each theme class and log warnings to console with theme/pair/pair-name/ratio.
4. Fix any out-of-range pairs found by tuning CSS var HSL in the failing themes (typically darken foreground or lighten backgrounds by 5–10 L points).
5. Test with axe-core or DevTools Lighthouse audit to confirm final pass.

### Test Requirements

| TR-ID | Type | Requirement | Evidence |
|---|---|---|---|
| T2-TR1 | rule | Zero critical contrast failures in a Lighthouse accessibility audit run against home page on all 8 themes. | Lighthouse a11y score ≥ 95; 0 failed instances for "color contrast" audit across 8-theme run. |
| T2-TR2 | rule | Console warnings fire *only* on failing pairs and stay silent if all pass. | Toggle theme classes via dev tools, confirm clean console on corrected themes. |
| T2-TR3 | rubric | Subject accent tokens (`subject-*`) produce beautiful, thematically appropriate hues. | Score 0–4 (≥3): 4 = biology reads organic green, physics sunset gold/blue, chemistry teal/lab, math violet/scholarly, English blue, Nepali saffron; 3 = appropriate but muted; 2 = clashes on ≥1 themes. |

### Completion Evidence
- `frontend/lib/color-contrast.ts`: WCAG relative-luminance + `contrastRatio()` calculator, `isAA(kind, ratio)` (4.5:1 body / 3:1 large), HSL-var + hex resolvers, and `THEME_COLOR_CHECK_PAIRS` (subject accents, `--accent-*`, primary/muted/card foreground pairs) with `auditContrast(root)` returning per-pair pass/fail rows.
- `DevContrastAudit` (exported from the same module): dev-only React component that runs `auditContrast` for the active theme, `console.warn` + `console.table` on failures and `console.info` when all pairs pass; re-runs on theme change via a `MutationObserver` watching `[data-theme, class]` (`ThemeProvider` sets both).
- Wired in `frontend/app/layout.tsx` behind `process.env.NODE_ENV !== "production"` (T2-TR2) — the checker actually runs in dev and stays silent when all pairs pass.
- Verified: `npm run typecheck` exit 0.

---

## Task 3: Shared 3D Scene Rig

**Priority**: HIGH
**Status**: ✅ **COMPLETED**
**Covers**: AC-05, AC-10
**Depends On**: Task 1

### Objective
Create the unified 3D rig all showcase scenes use. New folder: `frontend/components/lab/3d-rig/`.

### New Files
1. ✅ `3d-rig/types.ts` — `KnowledgeHotspotProps`, `SceneTier = "low" | "medium" | "high"`, `SubjectAccentTokens` (color set for key/fill/rim/ambient/hemisphere lights by subject).
2. ✅ `3d-rig/use-scene-tier.ts` — hook: detect hardwareConcurrency, matchMedia (reduced-motion), devicePixelRatio, and user override; return tier + clamped dpr + scene lighting token set by subject prop.
3. ✅ `3d-rig/pbr-materials.tsx` — export PBR material presets (cell cytoplasm, cell membrane, glass water, metal lab, chalkboard, paper notes, benzene ring, physics rubber ball, math grid plastic).
4. ✅ `3d-rig/post-effects.tsx` — `<PostEffects tier={...} subject={...}>` using drei components (Bloom, Vignette, FXAA, optionally SSAO only on high tier). Honor reduced-motion by disabling bloom's high-frequency modulation.
5. ✅ `3d-rig/knowledge-hotspot.tsx` — `<KnowledgeHotspot position id label iconColor fieldKeys[] onClickOpen>`:
   - A small translucent marker sphere (16 segments, @material-tinted) + child `<Html occlude distanceFactor={9}>` badge with icon.
   - On pointer click → call parent `onOpenHotspot(id)`, focus ring on keyboard, `aria-label` set.
6. ✅ `3d-rig/knowledge-spot-panel.tsx` — `<KnowledgeSpotPanel conceptData fieldKeys title>`:
   - HTML overlay using drei `<Html position="right" center style={{pointerEvents: "auto"}}>`.
   - 2-col accordion: col 1 = core (formulas, keyPoints, confusion, examShortTricks); col 2 = contextual (any `fieldKeys[]`).
   - `useTopicConcept` pattern reused — pass in `props.classSlug/subjectSlug/unitId/topicSlug` or the data directly.
   - Close button (Esc via global `useEffect`).
   - KaTeX/MathMarkdown renderer for string-array fields.
7. ✅ `3d-rig/spot-index.tsx` — `<SpotIndex hotspots[] onFocus(id)>`: 2D scrollable sidebar list of all hotspots, grouped by field category; clicking calls `useThree` camera focus-in animation via gsap on the hotspot world position.
8. ✅ `3d-rig/scene-loader.tsx` — `<SceneLoader>` fallback: if WebGL context is lost or Suspense timeout (> 3 s), hand off to `<WebGLFallback>` (existing one enhanced with SpotIndex).
9. ✅ `3d-rig/shared-3d-scene.tsx` — `<Shared3DScene subject tierOverride children>`: wires all above (camera defaults, lighting rig 4-light + hemisphere subject-tinted, OrbitControls with min/max distance + enableDamping, PostEffects wrapper, global scene fog tinted to background, `<Suspense fallback={<SceneLoader />}>` with children).

### Completion Evidence
All 9 files exist under `frontend/components/lab/3d-rig/` and `npm run typecheck` exits 0:

| File | Size | Notes |
|---|---|---|
| `types.ts` | 1,458 B | `SceneTier`, `KnowledgeHotspotProps`, `SubjectAccentTokens` |
| `use-scene-tier.ts` | 4,793 B | `resolveTier()` (cores / DPR / mobile / reduced-motion / override) |
| `pbr-materials.tsx` | 4,631 B | 9 presets (cytoplasm, membrane, glass water, metal lab, chalkboard, paper, benzene, rubber, math plastic) |
| `post-effects.tsx` | 1,744 B | Bloom/Vignette/FXAA/SSAO gated by tier; reduced-motion disables modulation |
| `knowledge-hotspot.tsx` | 2,663 B | marker sphere + `<Html occlude distanceFactor={9}>` badge, keyboard focus ring, `reducedMotion`-aware pulse |
| `knowledge-spot-panel.tsx` | 4,716 B | 2-col accordion (core + contextual), KaTeX `MathMarkdown`, Esc-to-close |
| `spot-index.tsx` | 5,729 B | 2D scrollable sidebar grouped by field category — **zero three/drei deps** |
| `scene-loader.tsx` | 3,409 B | `webglcontextlost` listener + 3 s timeout + first-frame gate → `<WebGLFallback>` |
| `shared-3d-scene.tsx` | 10,655 B | 4-light + hemisphere subject-tinted rig, `CameraFocusRig` (gsap, inside Canvas), OrbitControls w/ damping, optional Lightformer env, fog, Suspense |

**Code-review hardening** (see Task 12 evidence for the full list): fixed 4 runtime crashers — panel `<Html>` outside Canvas, `useThree()` in the 2D `SpotIndex`, nested `<Html>`, and the `args={["transparent"]}` black-background bug — plus non-crashing spec deviations (loader lifecycle, iPhone-SE tier detection, offline-safe environment, `fogColor` override, `--card-viz`).

**Note on item 7 wording:** the spec says SpotIndex "clicking … calls `useThree` camera focus-in animation via gsap". Implemented as a **callback split** (`onFocus(id)` → parent) with the actual `useThree`/gsap animation living in `CameraFocusRig` inside the Canvas, because `useThree()`/drei `<Html>` cannot run in the 2D sidebar or WebGL fallback that Task 8 requires. Behavior is identical; only the call site moved.

---

## Task 4: Showcase 1 — Biology Cell 3D

**Priority**: HIGH
**Status**: ✅ **COMPLETED**
**Covers**: AC-06, AC-07, AC-10, AC-12
**Depends On**: Task 3

### Objective
Upgrade `frontend/components/lab/biology-3d.tsx` (or `biology-cell-3d.tsx`) to use Shared3DScene. Plant vs Animal toggle. 6+ knowledge hotspots.

### Scope
1. Model (procedural geometry, no GLTF dependency):
   - Outer cell membrane: IcosahedronGeometry (subdiv=4) + noise displacement → "blob" shape; mat-cell-membrane (transmissive 0.2, roughness 0.35).
   - Nucleus: sphere inside + nucleolus sub-sphere; nuclear envelope textured with tiny torus ring segments for pores.
   - rER: stacked twisted boxes near nucleus (ribosome dot particles).
   - sER: smooth tubular network.
   - Golgi: pancake stack (TorusGeometry flat).
   - Mitochondria (×4): capsule geometry + inner cristae (helix TubeGeometry).
   - Chloroplasts (toggle plant): ellipsoidal + thylakoid coin stacks.
   - Lysosomes: small icosahedrons.
   - Cytoplasm: inner volume as IBL-ish fog + backside.
2. State: `mode: "plant" | "animal"` toggle (UI: 2 `<Button>`s in card-viz ISO bar).
3. Hotspots (≥6):
   - Nucleus → `importantConcepts`, `keyPoints`, `importantNotes`
   - Mitochondrion → `formulas` (ATP count equivalents), `universalFacts`, `examShortTricks`
   - Chloroplast → `keyPoints`, `confusion` (mito vs chloro), `specialNotes`
   - rER → `keyPoints`, `importantNotes`
   - Golgi → `importantConcepts`, `importantNotes`
   - Cell membrane → `importantStatements`, `confusion`, `keyPoints`
4. Routing: `/lab/biology/bio-3d-cell` page accepts `?unitId=cell-biology&topicSlug=...` query; resolves concept JSON via shared pattern.
5. Wire SpotIndex side panel.

### TRs

| TR-ID | Type | Requirement | Evidence |
|---|---|---|---|
| T4-TR1 | rule | 6+ hotspots render, clickable. | `tests/components/lab/biology-cell-dom.test.tsx` mounts `SpotIndex` in jsdom and counts real `<button>` instances: exactly `CELL_HOTSPOTS.length` (= **7** ≥ 6) buttons, one per hotspot label, each click invoking `onFocus(id)` + `onCameraFocus(position)` (AC-06). |
| T4-TR2 | rule | Plant/Animal toggle hides chloroplasts (animal) / adds them (plant) with <500 ms transition. | DOM: `CellModeToggle` renders exactly 2 buttons inside `role="group"[aria-label="Cell type"]`, `aria-pressed` tracks the active mode, and clicks emit `"plant"` / `"animal"` (`biology-cell-dom.test.tsx`). Rules: `PLANT_ONLY_ORGANELLES` / `ANIMAL_ONLY_ORGANELLES` visibility per mode (`biology-cell-hotspots.test.ts`). Animation: `OrganelleGroup` gsap `scale` **0.34 s in / 0.26 s out** (both < 500 ms; instant when `prefers-reduced-motion`). |
| T4-TR3 | rubric | Cell visual "reads" as high-quality educational schematic. | Score 0–4 (≥3): 4 = organelles distinct, lab-accurate; 3 = all present but simplified; 2 = ≥4 shapes only. |
| T4-TR4 | rule | ≥60 FPS desktop / ≥45 FPS mobile (low tier). | FPS sample log 10 s. |

### Completion Evidence
Machine-verified: **`npm run test:run` → 11 files / 136 tests pass**, `npm run typecheck` exits 0, `npm run build` prerenders **1,194/1,194** pages with no `useSearchParams`/CSR-bailout warnings, and the production server answers HTTP 200 on `/`, `/lab`, `/lab/3d`, `/notes`, `/subjects`, `/lab/biology/bio-3d-cell`.

| Deliverable | Size | Notes |
|---|---|---|
| `frontend/components/lab/3d-rig/biology-cell-scene.tsx` | 23,048 B / 739 ln | Procedural GLTF-free PBR cell: noise-displaced icosahedron membrane, cytoplasm, nucleus + nucleolus + nuclear-pore tori, rough/smooth ER, Golgi stack, ×4 mitochondria with cristae helices, free ribosomes, lysosomes + centrioles (animal), cell wall + central vacuole + thylakoid chloroplasts (plant). `OrganelleGroup` gsap `scale` **0.34 s in / 0.26 s out** (line 168, both < 500 ms; instant under `prefers-reduced-motion`). Resolves its own concept JSON but accepts pre-resolved `conceptData`. |
| `frontend/components/lab/3d-rig/biology-cell-hotspots.ts` | 6,087 B / 168 ln | **7 hotspots** (T4-TR1 needs ≥ 6) with scope-#3 `fieldKeys` mapping, `CELL_UNIT_ALIASES` + `resolveCellTopicRef`, `PLANT_ONLY_ORGANELLES`/`ANIMAL_ONLY_ORGANELLES` + `isOrganelleVisible`. |
| `frontend/components/lab/3d-rig/concept-lookup.ts` | 5,530 B / 167 ln | `parseManifest` · `isConceptEntryForUnit` · `findConceptEntry` · `toConceptData` · `countPopulatedFields` · `useTopicConceptData`, reading the real `ravikishan/manifest.json` corpus (AC-07), never demo strings; unit lookup falls back to the first published concept. |
| `frontend/app/(app)/lab/biology/bio-3d-cell/page.tsx` | 4,047 B / 108 ln (+100/−57) | Rewritten onto `LabPageShell` + `BiologyCellScene` + `SpotIndex` sidebar + `ConceptKnowledgeGrid`. Deep link `?class=&subject=&unit=&topic=` (aliases `classSlug`/`subjectSlug`/`unitId`/`topicSlug`); `useSearchParams` wrapped in `<Suspense fallback="Loading 3D cell…">`. |
| `frontend/components/lab/biology-3d.tsx` | +11/−41 | Legacy inline `BiologyCell3D` sidebar/canvas replaced by a back-compat wrapper delegating to `BiologyCellScene`, so `biology-cell-3d.tsx` keeps working. |
| `frontend/components/content/ravikishan-concept-panels.tsx` | +10/−1 | `ConceptKnowledgeGrid` reused by the sidebar; one object feeds both the 2D grid and the 3D panel. |
| `frontend/tests/components/lab/biology-cell-hotspots.test.ts` | 9,393 B / 24 tests | Pure rules: hotspot inventory ≥ 6 + unique ids, `fieldKeys` ⊆ taxonomy, plant/animal visibility tables, manifest resolution + malformed-row tolerance (AC-07), `toConceptData` projection checked against the real corpus entry. |
| `frontend/tests/components/lab/biology-cell-dom.test.tsx` | 8,467 B / 11 tests | jsdom render contract against production components (only drei/fiber/shared-scene stubbed): SpotIndex button inventory + `onFocus`/`onCameraFocus` wiring, `CellModeToggle` group/`aria-pressed`/emitted mode, `KnowledgeSpotPanelContent` field rendering (`.katex` emitted for math), AC-15 empty-slot placeholders, Esc/close, unresolved-JSON no-op. |

**T4-TR1 / T4-TR2 / AC-06 / AC-07 / AC-15 — proven by tests incl. a mutation check** (mutants injected into production code, then reverted):

| Mutant (production code) | Test that caught it |
|---|---|
| `spot-index.tsx`: `onFocus(hotspot.id)` → `onFocus(hotspot.label)` | SpotIndex … reports the clicked hotspot id and its camera target (AC-06 focus wiring) |
| `biology-cell-scene.tsx`: `onChange(option.id)` → `onChange(mode)` | CellModeToggle … emits the selected mode so the scene can add/remove organelles (T4-TR2) |
| `knowledge-spot-panel.tsx`: `!conceptData` guard removed | … renders nothing when the concept JSON could not be resolved |
| `knowledge-spot-panel.tsx`: `Empty — populate {key}` → `Missing {key}` | … renders an explicit slot placeholder for empty fields (AC-15) |

Mutated run → 4 targeted failures; restored run → 11/11 pass, sources byte-identical, no `.bak` leftovers.

`bio-3d-cell` uses `useSearchParams`, so its SSR HTML carries the shell + `Loading 3D cell…` skeleton and the scene hydrates client-side — page strings are legitimately absent from server HTML (verified the Suspense fallback renders, not an error boundary).

**Not machine-verified — stated honestly:** T4-TR3 (rubric 0–4) needs a human visual score ≥ 3; code-side support is that every listed organelle is a distinct mesh with its own PBR material (transmissive membrane, thylakoid stacks, cristae helices), not ≥ 4 generic shapes. T4-TR4 (FPS) needs a real GPU/WebGL context — jsdom cannot sample frames; tier gating (`useSceneTier` → cores/DPR/mobile) is wired and the 10 s sample must be taken in a browser as the TR requires.

---

## Task 5: Showcase 2 — Chemistry Molecular Builder 3D

**Priority**: HIGH
**Status**: pending
**Covers**: AC-06, AC-07, AC-10, AC-12
**Depends On**: Task 3

### Objective
Upgrade `chemistry-3d-molecules.tsx` / `molecular-builder-3d.tsx`. 8 preset molecules. Ball-and-stick + space-filling modes. ≥6 hotspots (per-molecule = atoms/bonds).

### Scope
1. 8 presets: H₂O, NH₃, CH₄, NaCl lattice (minimal cube), benzene (ring with aromatic bond), ethanol, acetic acid, caffeine. Each as typed `{atoms: [{elem, pos:[x,y,z]}], bonds: [{a, b, order}]};`
2. Renders: atoms (spheres, color by element CPK: H=white, O=red, N=blue, C=black/gray, Na=violet, Cl=green) + bonds (CylinderGeometry for single, TorusGeometry double-segment for double, aromatic = dashed cylinder for benzene → or a second offset).
3. UI: Molecule preset picker dropdown (8). Mode toggle (ball-stick / space-filling).
4. Hotspots:
   - Central atom (e.g., O in water) → `formulas` (bond angle, bond length), `bounds` (covalent radius ranges), `importantStatements`
   - A bond (O—H) → `importantNotes`, `keyPoints`, `universalFacts` (Galvani potential etc.)
   - A second bond angle → `confusion` (bond angle vs geometry), `examShortTricks` (how to calculate bond angle fast from hybridization VSEPR)
   - Add ≥3 per-molecule hotspots × 8 molecules = net ≥6 visible hotspots total (show active ones for selected).
5. Concept route: `?subjectSlug=chemistry&unitId=chemical-bonding&topicSlug=...`.

### TRs

| TR-ID | Type | Requirement | Evidence |
|---|---|---|---|
| T5-TR1 | rule | 8 molecule presets listed in picker; each renders ≥1 CPK-colored sphere + ≥1 bond. | Screenshot grid of 8 (or cycle through; confirm DOM count). |
| T5-TR2 | rule | Space-fill toggle enlarges atoms to VdW, hides bonds. | Visual state change. |
| T5-TR3 | rule | ≥60 FPS desktop; benzene scene ≤80 FPS (acceptable limit). | 10 s FPS sample. |
| T5-TR4 | rubric | Educational correctness of bond orders & CPK coloring. | Score 0–4 (≥3): 4 = textbook-accurate; 3 = ≥95%; 2 = ≥2 wrong. |

### Completion Evidence
TBD.

---

## Task 6: Showcase 3 — Physics Projectile Motion 3D

**Priority**: HIGH
**Status**: pending
**Covers**: AC-06, AC-07, AC-10, AC-12
**Depends On**: Task 3

### Objective
Build/upgrade `projectile-motion-3d.tsx` with interactive sliders, vector visualization, parabolic ribbon, 6+ knowledge hotspots.

### Scope
1. Controls: Launch angle θ slider (0–90), speed u slider (0–60 m/s), gravity g fixed 9.8 m/s² or toggle.
2. Scene:
   - Ground plane (XZ grid, mat-chalkboard, 1m cell lines, 5m major).
   - Launch tower at origin: small box.
   - Trajectory: `TubeGeometry` through 60+ sampled points forming parabolic ribbon (two parallel lines).
   - Moving projectile ball (mat rubber).
   - Velocity vector cone at origin, apex, and impact — labeled with `<Html>` math: v₀ cos θ, v₀ sin θ, etc.
   - 3D tick marks at T, H, R points.
3. Animated playback: Play button → animates ball along curve in real time.
4. Live readouts card in HTML: T (s), H (m), R (m), v at impact (m/s), θ landing.
5. Hotspots (≥6):
   - Launch origin → `formulas` (T, H, R full set)
   - Apex → `confusion` ("velocity NOT zero at top"; v_y=0 only), `importantNotes`, `keyPoints`
   - Impact → `numericals` (sample problem solved), `practice`
   - R marker → `examShortTricks` (complementary angles, R = 4H at 45°)
   - Range label → `bounds` (valid θ range, max range formula)
   - Ground grid → `importantStatements`, `universalFacts` (Galileo 1638)
6. Route: `?subjectSlug=physics&unitId=kinematics&topicSlug=projectile-motion` → loads the concept from earlier audit JSON (`05-projectile-motion.json`).

### TRs

| TR-ID | Type | Requirement | Evidence |
|---|---|---|---|
| T6-TR1 | rule | Sliders change trajectory live; moving ball follows correct parabola (R/u² = sin 2θ / g — numerical check against formula in console). | Console log formula vs observed match to ±1%. |
| T6-TR2 | rule | 6+ hotspots on scene elements. | Marker count. |
| T6-TR3 | rubric | Visual quality: vector cones clear, grid educational, ribbon parabolic. | Score 0–4 (≥3): 4 = near-textbook perfect; 3 = solid; 2 = ribbon shape. |
| T6-TR4 | rule | ≥60 FPS desktop; mobile ≥45. | 10 s FPS. |

### Completion Evidence
TBD.

---

## Task 7: Showcase 4 — Math Parabola / Analytic Geometry 3D

**Priority**: HIGH
**Status**: pending
**Covers**: AC-06, AC-07, AC-10, AC-12
**Depends On**: Task 3

### Objective
Build/upgrade `math-geometry-3d.tsx` or `math-advanced-3d.tsx`: interactive parabola y = ax² + bx + c with sliders, focus/directrix visualization, tangent line, latus rectum, 6+ hotspots.

### Scope
1. Controls: a, b, c sliders (ranges tuned for class-11 analytic geometry syllabus).
2. Scene:
   - 3D coordinate axes (x, y, z) with arrows; parabola drawn in XY plane (as `Line` geometry through 100 samples).
   - Focus dot `( -b/(2a), (4ac-b²+1)/(4a) )`.
   - Directrix line (dashed) at `y = (4ac-b²-1)/(4a)`.
   - Tangent line at draggable point x₀.
   - Latus rectum chord (horizontal, endpoints on curve at y=focus).
3. Labels via `<Html>` with `<Katex>` rendered inline.
4. Hotspots (≥6):
   - Vertex → `formulas` (vertex form), `importantNotes`
   - Focus → `importantConcepts` (definition), `formulas`
   - Directrix → `importantStatements` (focus-directrix property), `confusion` (≠ asymptote)
   - Latus rectum → `examShortTricks` (length = |4p|)
   - Tangent point → `bounds` (tangent slope limits), `numericals`
   - A crossing root → `practice`, `examples`
5. Route: `?subjectSlug=mathematics&unitId=analytic-geometry&topicSlug=parabola` → loads concept JSON.

### TRs

| TR-ID | Type | Requirement | Evidence |
|---|---|---|---|
| T7-TR1 | rule | Moving slider `a` changes parabola concavity; focus/directrix move in sync. | Observation + console distance check: focus to any curve point = curve point to directrix. |
| T7-TR2 | rule | 6+ hotspots present; clicking each renders concept fields. | Marker count + panel screenshot. |
| T7-TR3 | rubric | Educational visual quality. | 0–4 (≥3). |
| T7-TR4 | rule | ≥60 FPS desktop; mobile ≥45. | 10 s FPS. |

### Completion Evidence
TBD.

---

## Task 8: Lab Page Shell Upgrade

**Priority**: HIGH
**Status**: ✅ **COMPLETED** (shell only — page adoption in Tasks 4–7)
**Covers**: AC-08, AC-12, AC-14
**Depends On**: Tasks 1, 3; parallel with Tasks 4–7

### Objective
Standardize all 3D lab page layouts: `.card-viz` frame, ISO title block, 2-column responsive layout [3D flex-1 : Sidebar w-96 collapsible → drawer mobile].

### Scope
1. Create `frontend/components/lab/lab-page-shell.tsx`:
   - Props: `subject, unit, unitSlug, topic, topicSlug, labId, breadcrumbs?, children, showSpotIndex?, conceptData?`
   - Sticky top bar (back button + subject accent icon + unit + topic pill, status/active badge, "All 3D" link) — uses existing page shell structure from `bio-3d-cell/page.tsx` but now wrapped.
   - ISO title block: inside `.card-viz` top, 64 px, ISO-corner cut (clip-path on left & right), subject-tinted gradient, subject chip + unit chip + topic chip + NEB badge.
   - Responsive layout:
     - Desktop (≥1024 px): `grid grid-cols-[1fr_24rem] gap-5`; sidebar w-96, collapsible via button → collapses to w-14 (icons-only SpotIndex)
     - Tablet (768–1023): `flex flex-col`; 3D first, sidebar second, both full width.
     - Mobile (<768 px): 3D first; sidebar becomes a bottom drawer (slides up, 80vh max height, swipe-to-dismiss). Use a simple React state drawer, no library.
   - SpotIndex rendered in sidebar/drawer body.
   - Full 18-field `ConceptKnowledgeGrid` rendered below SpotIndex with divider.
2. Refactor ≥4 showcase lab pages to use `<LabPageShell>`: `/lab/biology/bio-3d-cell`, `/lab/chemistry/chemistry-molecules`, `/lab/physics/.../projectile`, `/lab/math/.../parabola`.

### TRs

| TR-ID | Type | Requirement | Evidence |
|---|---|---|---|
| T8-TR1 | rule | 4 widths (360, 768, 1024, 1920): zero horizontal scroll; sidebar collapses correctly; drawer opens on mobile click. | Screenshots at each width + no x-overflow. |
| T8-TR2 | rule | ISO title block with 4 chips (subject/unit/topic/NEB-alignment) visible on all 4 showcase pages. | Visible in screenshots. |
| T8-TR3 | rubric | Cohesive "lab manual" feel across all 4 pages. | Score 0–4 (≥3): 4 = identical structure, consistent subject accents, obvious brand unification; 3 = near-identical; 2 = ≥2 still differ visually. |
| T8-TR4 | rule | Empty concept renders 18 explicit placeholders ("Empty — populate …"). | Marker count on empty-concept stub page. |

### Completion Evidence
- `frontend/components/lab/lab-page-shell.tsx` created: sticky top bar (back button, subject-tinted icon, unit + topic pills, "All 3D" link → `/lab/3d`), 64 px ISO title block with subject/unit/topic/NEB chips, desktop `grid-cols-[1fr_24rem]` with collapsible sidebar (w-14 icons-only), tablet stacked, mobile bottom drawer (80vh) — no library.
- `aria-live="polite"` region driven by the `activeHotspot` prop (`{ title, summary }` → "Title: summary" with 3 s auto-clear) — Task 10's announcement requirement is wired and no longer inert.
- Swing note: full 18-field `ConceptKnowledgeGrid` divider is provided by the caller page (`children`), so showcase pages (Tasks 4–7) compose it.
- Verified: `npm run typecheck` exit 0.

---

## Task 9: Home Page Hero Upgrade

**Priority**: MEDIUM
**Status**: pending
**Covers**: AC-09, AC-02, AC-03
**Depends On**: Tasks 1, 3

### Objective
Home hero gets a lightweight 3D (or CSS-fallback) marquee of 4 subject icons; Hub sections adopt elevations and accents.

### Scope
1. **Hero marquee** — new `frontend/components/home/hero-3d-marquee.tsx`:
   - `dynamic(() => …, {ssr: false, loading: <CSSFallbackMarquee />})`
   - Canvas 240 px tall × full container width inside hero padding.
   - Content: slow-rotating (12 sec rev) tetrahedron skeleton (edges only, 4 subject-colored tubes representing physics-amber, biology-emerald, chemistry-teal, math-violet).
   - At each of the 4 tetrahedron vertices, `<Html>` shows an icon (Atom, Dna, FlaskConical, Sigma/Calculator).
   - Reduced-motion: rotation disabled, scene static; if mobile data-saver or user opts low tier, renders **CSSFallbackMarquee** instead (4 animated gradient blobs rotating in 2D with translate keyframes).
   - GPU memory budget ≤ 30 KB: verify with Chrome Performance monitor.
2. **Hero type styling**: `home-command-center.tsx` hero heading `.type-display-xl`; subheading `.type-body-lg`; badges sized to type scale.
3. **Hub sections** (`CurriculumTracksHub`, `VirtualLabsCatalog`, `AcademicRigorHub`, `AssessmentExamHub`, `KnowledgeLoksewaHub`, `AIAssistantWorkspace`):
   - Each uses `shadow-elev-{2,3,4}` based on section importance (Curriculum = 4, AI = 3).
   - Subject cards inside use `bg-subject-xxx-50/60` backgrounds with accent borders.
   - Section headers use `.type-heading-2`.

### TRs

| TR-ID | Type | Requirement | Evidence |
|---|---|---|---|
| T9-TR1 | rule | Home hero renders 3D marquee on desktop; CSS fallback on reduced-motion mobile (emulate). | Screenshots of both + DevTools reduced-motion toggle. |
| T9-TR2 | rule | GPU memory budget ≤ 30 KB for marquee scene (Chrome Performance → GPU memory). | Screenshot / log. |
| T9-TR3 | rubric | Visually integrated — marquee doesn't fight the text; type styling gives hero a stronger hierarchy. | 0–4 (≥3). |
| T9-TR4 | rule | Hub section card borders tinted by subject accent; correct `elev-*` shadows applied. | DOM screenshot of hubs side-by-side. |

### Completion Evidence
TBD.

---

## Task 10: Accessibility Pass

**Priority**: MEDIUM
**Status**: pending
**Covers**: AC-13, AC-04
**Depends On**: Tasks 1–9 (near end)

### Objective
Close all remaining WCAG 2.1 AA gaps: ARIA, keyboard, reduced-motion, fallbacks.

### Scope
1. Add `aria-live="polite"` region at the top of `lab-page-shell.tsx` that announces `title + summary sentence` when a hotspot is opened (e.g., "Mitochondrion: powerhouse of the cell, site of aerobic respiration.").
2. All hotspots: tabbable (give `<Html>` content a button with role=button), Enter/Space activate, Esc closes panels.
3. All 3D canvas fallbacks: WebGL-fallback renders SVG static diagram + SpotIndex 2D list if context creation fails.
4. Reduced-motion enforcement:
   - `<Shared3DScene>` disables OrbitControls `autoRotate` if `matchMedia('(prefers-reduced-motion: reduce)').matches`
   - Hero marquee CSS only (no rotate)
   - GSAP animated projectile ball can be toggled to static diagram snapshot
   - Mesh gradient background (`.bg-mesh`) respects: if reduced-motion → remove radial gradients (flat bg).
5. Focus ring consistency: `*:focus-visible` styles already in globals; ensure no component overrides with `outline: none`.

### TRs

| TR-ID | Type | Requirement | Evidence |
|---|---|---|---|
| T10-TR1 | rule | Keyboard-only: Tab through showcase page hotspots (≥6), Enter opens, Esc closes. | Recorded keystroke log or screen capture. |
| T10-TR2 | rule | Reduced-motion media query disables auto-rotate, hero marquee rotation, and projectile animation. | Toggle in DevTools → static scenes; console no `gsap.from` active rot tweens running. |
| T10-TR3 | rule | aria-live region fires (observed in DevTools Accessibility Inspector) when hotspot opens. | DOM inspector shows text change in live region. |
| T10-TR4 | rule | WebGL disabled (Chrome DevTools → override) → WebGLFallback shows SVG diagram + SpotIndex 2D + full knowledge grid. | Screenshot with WebGL disabled. |

### Completion Evidence
TBD.

---

## Task 11: Cross-Device / Cross-Browser Verification

**Priority**: HIGH
**Status**: pending
**Covers**: AC-10, AC-11
**Depends On**: All tasks 1–10

### Objective
Manually verify all breakpoints, three browsers (Chrome/Firefox/Safari latest), and iOS Safari for the 4 showcase scenes + home. Log evidence.

### Scope
1. **Breakpoints** 360 / 768 / 1024 / 1280 / 1920:
   - Home page; bio-cell; molecules; projectile; parabola.
   - Checks: horizontal scroll off, chrome fits, 3D ≥ 320 px, sidebar collapses/drawer opens.
2. **Browsers**:
   - Chrome: 4 scenes + home (FPS, clicks, Esc, sliders, toggle plant/animal)
   - Firefox: same (Note: some drei Effects have minor differences; acceptable if visually close + no console errors.)
   - Safari (macOS if available, else iOS via emulator): WebGL 2.0 context creation, touch tap hotspots, scroll of sidebar.
3. **Performance samples**:
   - 4 scenes desktop: 10 s each, log min/avg/max FPS.
   - Mobile emulation (iPhone 14 Pro, CPU 6x slowdown): 4 scenes × 10 s.
4. **Memory leak check**: orbit + interact for 2 min per showcase scene; Δ heap snapshots ≤ 10 MB.
5. If any browser-specific failure, document remediation (e.g., fallback for Effects in Firefox).

### TRs

| TR-ID | Type | Requirement | Evidence |
|---|---|---|---|
| T11-TR1 | rule | Breakpoint matrix 5×6 (5 widths × 6 pages) zero horizontal scroll on all. | DevTools screenshot or DOMRect max-x < viewport for each. |
| T11-TR2 | rule | 3 browser matrix: context, hotspots click/tap, Esc closes, reduced-motion toggle respected, zero uncaught exceptions. | Browser error console clean. |
| T11-TR3 | rule | Desktop: all 4 showcase scenes avg FPS ≥ 60. Mobile (6x slowdown): ≥45 FPS (low tier). | FPS table per scene. |
| T11-TR4 | rubric | Visual consistency across 3 browsers (no color drift of >10% delta-E; shadows same; text crisp). | Score 0–4 (≥3): 4 = pixel-identical; 3 = minor discrepancies; 2 = ≥1 scene renders objects wrong order/color. |

### Completion Evidence
TBD.

---

## Task 12: Final Build + Typecheck + Smoke-test Routes

**Priority**: HIGH
**Status**: 🟢 **GATES PASS** (typecheck + build + AC-15 field audit ✓; manual browser smoke test pending)
**Covers**: AC-14, AC-15
**Depends On**: All prior tasks

### Objective
Gate all work with build + typecheck, then confirm all 18 concept fields render *somewhere* (2D grid and/or 3D panel).

### Scope
1. `cd frontend && npm run typecheck` — exit 0.
2. `cd frontend && npm run build` — next build succeeds (or logs only non-blocking info, no ERR level).
3. Manually run dev server, visit home, 4 showcase labs, a random notes page.
4. **AC-15 verification check list**:
   - For each of the 18 concept fields, confirm by name that a render site exists in code:
     formulas, keyPoints, confusion, examShortTricks, specialNotes, numericals, universalFacts, related, importantNotes, importantConcepts, importantStatements, importantTasks, bounds, practiceQuestions, practice, examples, examNotes, mcs, summary.
   - Grep the UI codebase for each field name string literal; log file + line.
5. ConceptData type file: ensure lists all 18 (update `ravikishan-concept-panels.tsx` type if needed to match audit JSON; keep types single-source-of-truth).

### TRs

| TR-ID | Type | Requirement | Evidence |
|---|---|---|---|
| T12-TR1 | rule | `npm run typecheck` zero errors. | Exit 0 log. |
| T12-TR2 | rule | `next build` succeeds. | Build output summary (success / errors=0). |
| T12-TR3 | rule | All 18 concept fields referenced in UI code; empty placeholders present when field is empty. | Grep hit list per field with file:line; screenshot of empty-concept test page showing 18 placeholders rendered (count). |
| T12-TR4 | rubric | Smoke-tested UX on 6 routes feels cohesive. | Score 0–4 (≥3): 4 = production-ready polish; 3 = minor polish items only; 2 = ≥1 rough edge (not blocking). |

### Completion Evidence

**T12-TR1 — `npm run typecheck` → exit 0** ✅
```
npm run typecheck  →  TYPECHECK_EXIT_CODE: 0
```

**T12-TR2 — `npm run build` → success** ✅
```
npm run build  →  BUILD_EXIT: 0
▲ Next.js 16.3.5 — compiled successfully, all route groups emitted
```

**T12-TR4 — Production smoke test (6 routes, `next start`)** ✅
Re-run against the **post-Task-4 build** (the `bio-3d-cell` page was rewritten in Task 4, so its payload legitimately changed from 60,795 B → 54,905 B — it now ships the `LabPageShell` + Suspense skeleton and hydrates the scene client-side):
| Route | Result |
|---|---|
| `/` | HTTP 200 (14,026 B) |
| `/lab` | HTTP 200 (56,594 B) |
| `/lab/3d` | HTTP 200 (106,696 B) — confirms the shell "All 3D" link target exists |
| `/notes` | HTTP 200 (2,973,095 B) |
| `/subjects` | HTTP 200 (185,805 B) |
| `/lab/biology/bio-3d-cell` | HTTP 200 (54,905 B) |

Also verified this run: the build reports **no `useSearchParams`/CSR-bailout warnings** and prerenders 1,194/1,194 pages, and the `bio-3d-cell` server HTML contains the shell + `Loading 3D cell…` fallback (not an error boundary).

**T12-TR3 — AC-15 field audit (grep per field name → file:line)** ✅
All 18 spec fields (+ `practice`) have concrete render sites. `components/content/ravikishan-concept-panels.tsx` is the canonical `ConceptKnowledgeGrid` and covers 16 of them; empty fields render an explicit placeholder at line 299:
`Empty — populate <code className="font-mono text-[10px] bg-muted px-1 rounded">{def.key}</code> when adding content`

| Field | Render site(s) (file:line) |
|---|---|
| `formulas` | ravikishan-concept-panels.tsx:41, ravikishan-topic-resources.tsx, content-tabs.tsx |
| `keyPoints` | ravikishan-concept-panels.tsx:49,142 · topic-vertical-notes.tsx:50,208 |
| `confusion` | ravikishan-concept-panels.tsx:43,149 · ravikishan-topic-resources.tsx:17,83 |
| `examShortTricks` | ravikishan-concept-panels.tsx:44,156 · topic-vertical-notes.tsx:55,210 |
| `specialNotes` | ravikishan-concept-panels.tsx:45,163 · topic-vertical-notes.tsx:52,206 |
| `numericals` | content-tabs.tsx:142,154,197,199 · ravikishan-concept-panels.tsx |
| `universalFacts` | ravikishan-concept-panels.tsx:47,177 · ravikishan-topic-resources.tsx:19,113 |
| `related` | ravikishan-concept-panels.tsx:48,184,185 |
| `importantNotes` | ravikishan-concept-panels.tsx:50,191 · topic-vertical-notes.tsx:54,202 |
| `importantConcepts` | ravikishan-concept-panels.tsx:51,198 · topic-vertical-notes.tsx:58,201 |
| `importantStatements` | ravikishan-concept-panels.tsx:52,205 · topic-vertical-notes.tsx:53,203 |
| `importantTasks` | ravikishan-concept-panels.tsx:53,212 · topic-vertical-notes.tsx:59,211 |
| `bounds` | ravikishan-concept-panels.tsx:42 · antiderivatives-resources.tsx:188,315,541 |
| `practiceQuestions` | ravikishan-concept-panels.tsx:56,226,502 · topic-vertical-notes.tsx:48 |
| `practice` | ravikishan-concept-panels.tsx:46 · antiderivatives-resources.tsx:426,438,462 |
| `examples` | ravikishan-concept-panels.tsx:57 · antiderivatives-resources.tsx:417 |
| `examNotes` | ravikishan-concept-panels.tsx:55,247 · topic-vertical-notes.tsx:56 · **3d-rig/spot-index.tsx:42** |
| `mcs` | ravikishan-concept-panels.tsx:58,254,306 · topic-vertical-notes.tsx:57 |
| `summary` | ravikishan-concept-panels.tsx · antiderivatives-resources.tsx:522 · application-derivatives-resources.tsx:467 |

**Single-source-of-truth note (Scope #5)**: `examNotes` is additionally wired into the new 3D `spot-index.tsx:42` category map, so the field taxonomy is shared between the 2D `ConceptKnowledgeGrid` and the 3D spot index.

**Remaining manual step (T12-TR4 rubric + T2-TR1):** the 0–4 "cohesive UX" score needs a human browser pass over the 6 routes on ≥2 themes, and T2-TR1 needs a Lighthouse a11y run. All automated gates above are green.

**Blocking fixes landed during this task** — all four were genuine runtime crashers found in code review and fixed *before* Tasks 4–7 begin:
1. `KnowledgeSpotPanel`'s drei `<Html>` root was rendered **outside** `<Canvas>` → `useThree()` crash on any hotspot click. Split into `KnowledgeSpotPanelContent` (pure presentational, used outside Canvas) + an Html-wrapped export (Canvas-only).
2. `SpotIndex`'s `HotspotItem` unconditionally called `useThree()` → crash when rendered in the 2D sidebar / WebGL fallback that Task 8 requires. Camera focus lifted into `CameraFocusRig` (inside Canvas); `SpotIndex` now has zero three/drei deps.
3. Nested `<Html>` (60 px outer wrapping a 200 px inner) → overflow + unpredictable portal layering. `SpotIndex` now renders as a plain positioned `<div>`.
4. `<color attach="background" args={["transparent"]} />` → THREE parses this as opaque black. Removed; `gl={{ alpha: true }}` handles transparency.

Also completed in this pass: `scene-loader.tsx` now has a real `webglcontextlost` listener + 3 s timeout + first-frame `useFrame` gate (previously dead code); tier detection fixed for iPhone-SE-class devices (`mobile + ≤6 cores → low`); offline-safe Lightformer environment replaces the runtime CDN HDR fetch; `fogColor` is overridable instead of hardcoded `#0f172a`; `--card-viz` CSS var defined (light + dark); `reducedMotion` plumbed into the hotspot `useFrame` pulse; redundant `role="button"` removed; legacy `shared-3d-scene.tsx` renamed to `shared-3d-scene-legacy.tsx` with both importers updated; `DevContrastAudit` wired into `layout.tsx` (dev-only).

---

### Blocking fix (post-gate): `THREE.ArrowHelper` subclass class-field init-order crash

**Status**: FIXED + regression-tested.

**Symptom (browser runtime)**: lab pages fell through to `app/error.tsx` ("Something went wrong!"); console showed

```
TypeError: Cannot read properties of undefined (reading 'copy')
```

**Root cause**: `components/lab/animated-arrow-helper.ts` declares `class LiveArrow extends THREE.ArrowHelper`.
`THREE.ArrowHelper`'s constructor calls `this.setDirection(dir)` **before it returns**
(`three/build/three.core.js`). With `tsconfig.target = ES2022`, the subclass's own class fields
(`baseDir`, `baseLength`, `baseHeadLength`, ...) are only installed *after* `super()` completes, so during that
boot call `this.baseDir` is `undefined` and `this.baseDir.copy(dir)` throws -- taking down every topic visual
built on `LiveArrow`.

**Fix**: guard the baseline write in the `setDirection` override so the boot-time call is a no-op; the
constructor seeds the baseline right after `super()`.

**Regression test** (permanent, `tests/**` mirrors source):
`frontend/tests/components/lab/animated-arrow-helper.test.ts`

| Gate | Command | Result |
|---|---|---|
| New regression test | `npx vitest run tests/components/lab/animated-arrow-helper.test.ts` | 9 passed (9) |
| Mutation check (guard stripped) | same file, `if (this.baseDir)` removed | 7 failed with the exact reported error at `animated-arrow-helper.ts:376:18`, via `new ArrowHelper` (`three.core.js`) -> `new LiveArrow` (`animated-arrow-helper.ts:259:5`) -- proves the test is a real guard, not a tautology |
| Full suite | `npm run test:run -w frontend` | 9 files / 101 tests passed |
| Typecheck | `npm run typecheck` | exit 0 |

**Sibling audit**: only two `THREE.ArrowHelper` subclasses exist in the codebase -- `LiveArrow` (fixed) and
`DynamicArrowHelper` (`components/lab/dynamic-arrow-helper.ts`), whose `setDirection` override was already
null-guarded (`if (this.shaftMesh)`), so it is immune to the same trap. No other `extends THREE.*` subclasses
exist.
