# PLAN 02 — 3D Component Rebuild (35 Stubs → 35 Real Scenes)

**Program:** Simulation Library Rebuild
**Plan code:** `SCENE`
**Owner slot:** Technical Artist / Creative Developer
**Status:** Blocked by Plan 01
**Window:** 2026-11-23 → 2027-01-15 (32 engineer-days)
**Depends on:** Plan 01 / P1.2 (LegendSpec), P1.4 (Label3DSpec, MotionSpec), Plan 06 / P6.5
**Blocks:** Plan 04 / P4.4 (component dirs cannot be pruned until filled)

---

## 1. Objective

Replace all 35 placeholder components with genuinely interactive, labelled, lit 3D scenes that
a Class 11 student can steer, read and learn from. Every scene ships with a permanently visible
control region, a legend bound to its labels, and a concept panel.

## 2. Evidence (measured 2026-11-08)

**35 of 35 `.tsx` files are stubs.** Every one is 2 lines, 210–384 bytes, returning a bare
`<div>` containing a title string. Zero contain `Canvas`, `useFrame`, `useState`, `three`, or
`@react-three`. Representative specimen:

```tsx
// components/biology/03-cell-biology/mitochondria/mitochondria-3d.tsx  (entire file)
import React from 'react'; export default function Mitochondria3D(){ return <div>Mitochondria 3D — Double membrane, Cristae, Matrix, mtDNA, ATP synthase</div>; }
```

There is no `package.json`, no CSS, no app entry point. **The library cannot currently run at all.**

| Subject | Stub count | Files |
|---|---|---|
| Biology | 19 | animal-cell, chloroplast, er, golgi, lysosome, mitochondria, nucleus, plant-cell, ribosome, vacuole, meiosis, mitosis, dna-transcription, ecosystem, evolution, angiosperm, microbiology, human-body, taxonomy |
| Physics | 8 | mechanics, waves, em, modern, thermo, thermal, optics, induction |
| Chemistry | 5 | stoichiometry, atomic, bonding, redox, gas |
| Mathematics | 3 | algebra, calculus, stats |

## 3. Scope

**In scope:** runtime bootstrap, shared scene shell, control region, legend overlay, label
system, all 35 scenes, performance budget, runtime QA.

**Out of scope:** topic prose (Plan 03/05), premium/AI features, the old `lab` page in
`old-lab-page-reference.tsx` (reference only, not a migration target).

## 4. Technical approach

Vite + React 18 + TypeScript + `three` + `@react-three/fiber` + `@react-three/drei`.
No competing state library — scene params live in one `useReducer` per scene, URL-synced.

**Performance contract (non-negotiable, applies to all 35):**

- One `requestAnimationFrame` loop via R3F `frameloop="always"`; no ad-hoc rAF in components
- `dpr={[1, 2]}` — pixel ratio capped, never render every device pixel
- `OrbitControls` with `enableDamping`, `dampingFactor 0.08`; drag-to-orbit, wheel-to-zoom
- Environment map and shadows **baked once** (`<Environment preset>` / accumulated static
  shadows), never recomputed per frame
- Geometry and materials created in a module-level registry and **reused**, not rebuilt on
  re-render; `useMemo` keyed on primitive params only
- **No quality reduction while dragging.** Resolution, effects and shadow quality stay at the
  level the scene opened with
- Target: 60 fps at 1440×900 on integrated graphics; 30 fps floor at 390×844 mobile
- Dispose geometries/materials/textures on unmount; assert zero WebGL context growth across
  20 mount/unmount cycles

**Lighting contract:** drama over correctness. Colored key + rim + fill, fog for atmosphere,
emissive accents on the quantities that matter, drifting particle field where the subject
supports it, bloom on emissive only. No default gray geometry-test look.

## 5. Work packages

| ID | Title | Effort | Priority | Depends on |
|---|---|---|---|---|
| P2.1 | Bootstrap runnable app (Vite/React/R3F) + perf harness | 3.0 d | Critical | P6.2 |
| P2.2 | Shared `<LabScene>` shell: control region, legend, labels, concept drawer | 4.0 d | Critical | P1.2, P1.4, P2.1 |
| P2.3 | Vertical slice: Mitochondria (full quality, proves the shell) | 2.5 d | Critical | P2.2 |
| P2.4 | Biology wave 1 — remaining 9 organelles | 5.0 d | High | P2.3 |
| P2.5 | Biology wave 2 — 9 systems/diversity scenes | 6.0 d | High | P2.3 |
| P2.6 | Chemistry — 5 scenes | 3.5 d | High | P2.3 |
| P2.7 | Physics — 8 scenes | 5.0 d | Critical | P2.3 |
| P2.8 | Mathematics — 3 scenes | 2.0 d | Medium | P2.3 |
| P2.9 | Runtime QA: resize, replay, remount, orbit fluidity, console clean | 1.0 d | Critical | P2.4–P2.8 |

### P2.2 — The shared shell

Every scene renders inside `<LabScene>` which guarantees, at the shell level (so no individual
scene can forget them):

**Permanently visible control region — minimum 7 live adjustment tools, never in a modal:**

1. Slider — simulation speed / time scale (0.1×–4×)
2. Slider — subject-specific primary quantity (e.g. substrate concentration, field strength, λ)
3. Slider — camera distance / zoom
4. Stepper — particle or instance count
5. Select — display mode (solid / wireframe / ghosted / x-ray)
6. Toggle — labels on/off
7. Toggle — legend on/off
8. Toggle — grid + guides
9. Color select — palette / lighting mood
10. Slider — light intensity + azimuth
11. Buttons — Reset, Randomize, Export PNG, Export state JSON

All applied live on `input`, not on `change`/submit. Reset restores the seeded defaults;
Randomize produces a valid in-range state; Export returns the scene **in its current state**.

**Legend overlay:** rendered from `LegendSpec`, entries cross-linked to `Label3DSpec.legendId`.
Hovering a legend entry highlights its 3D anchor and dims the rest; clicking isolates it.
Each entry shows swatch + pattern + symbol + label + unit, so it reads without color.

**Concept drawer:** `ConceptSpec` rendered beside the scene — definition, intuition, derivation,
misconceptions, real-world anchor. Open by default on first visit, dismissible, state remembered.

**Custom scrollbars:** every scrolling region (control rail, concept drawer, legend list) styled
from the scene's own palette — track, thumb, hover, width. No browser default anywhere.

### P2.3 — Mitochondria vertical slice

Chosen because it is the only unit with real source content and an existing `3D LABELS` line.
Required anatomy: outer membrane, inner membrane, cristae (folded, not decorative), matrix,
mtDNA (circular), ATP synthase (F₁Fo, rotary), intermembrane space.

Required motion: ATP synthase 3-fold rotary catalysis driven by proton flux; electron transport
chain complexes I–IV with lateral diffusion in the inner membrane; proton gradient accumulation
in the intermembrane space; Krebs cycle turning in the matrix. Scrubbable timeline, pausable.

This slice is the acceptance gate for P2.4–P2.8. Nothing else starts until it passes review.

### P2.7 — Physics scenes (highest exam weight)

| Scene | Must show | Primary live control |
|---|---|---|
| mechanics | projectile arc, inclined plane + friction vector, collision momentum bars | launch angle / μ |
| waves | travelling transverse wave with A, λ, crest, trough labelled in place | frequency / amplitude |
| em | field lines, capacitor plates + dielectric, Lorentz orbit | E / B strength |
| modern | Bohr shells with rₙ = r₀n², photon hν emission, photoelectric cutoff | n / incident λ |
| thermo | PV diagram cycle tracing, Carnot efficiency readout | T_hot / T_cold |
| thermal | Lee's disc / Searle's bar apparatus, expansion ΔL | material / ΔT |
| optics | ray traced lens + mirror, live 1/v − 1/u = 1/f | object distance / f |
| induction | Faraday flux change, Lenz opposition, LR readouts | magnet velocity / turns |

## 6. Acceptance criteria

- [ ] `npm run dev` boots; app entry exists; 0 console errors on load
- [ ] 35 / 35 components render real geometry (no `<div>`-only returns remain)
- [ ] Every scene: drag orbits with damping, wheel zooms, view follows pointer smoothly
- [ ] Frame rate does **not** drop and effects do **not** disable during drag
- [ ] `dpr` capped at 2; geometry/material registry reused; no per-frame shadow recompute
- [ ] Every scene exposes ≥7 live controls in a permanently visible region
- [ ] Every scene renders a legend whose entries resolve to real 3D label anchors
- [ ] Every legend entry distinguishable without color (pattern + symbol + label)
- [ ] Every scene renders its `ConceptSpec` panel
- [ ] Reset / Randomize / Export all functional; export reflects current state
- [ ] Resize 390→1920 verified; no clipping, overlap, unreachable controls
- [ ] 20 mount/unmount cycles: no duplicated rAF loops, no leaked listeners, no WebGL context growth
- [ ] Pause / replay / scrub verified on every scene that has a `MotionSpec`
- [ ] All scrollbars custom-styled from palette

## 7. Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| 35 scenes at full quality overruns budget | High | High | P2.3 slice gates the rest; shell absorbs 80% of shared work |
| Mobile WebGL context loss | Medium | High | Cap instances on mobile; graceful 2D SVG fallback per scene, still labelled |
| Biology organelle geometry is hard to make readable | Medium | Medium | Cutaway/x-ray display mode is a shell-level control, available everywhere |
| Schema changes mid-build | Medium | High | Plan 01 freezes at v1.0.0 before P2.2 starts |
| Autoring 35 scenes serially stalls | Medium | Medium | P2.4–P2.8 are independent after P2.3; parallelize across owners |

## 8. Definition of done

All 35 scenes interactive at the quality they open with, every acceptance box ticked against a
real browser run (not a type check), performance harness green, and the runtime QA report
attached. A student can open any unit, steer it, read its legend, and understand the concept
without leaving the page.

## 9. Artifacts produced

```
package.json, vite.config.ts, tsconfig.json, index.html
src/main.tsx, src/App.tsx
src/lab/LabScene.tsx
src/lab/ControlRegion.tsx
src/lab/LegendOverlay.tsx
src/lab/LabelAnchors.tsx
src/lab/ConceptDrawer.tsx
src/lab/registry.ts            (shared geometry + material cache)
src/lab/perf.ts                (dpr cap, fps harness, disposal assertions)
src/lab/scrollbars.css
src/scenes/biology/*.tsx       (19)
src/scenes/chemistry/*.tsx     (5)
src/scenes/physics/*.tsx       (8)
src/scenes/mathematics/*.tsx   (3)
reports/scene-runtime-qa.json
reports/scene-perf.json
```