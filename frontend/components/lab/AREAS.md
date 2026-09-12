# Lab Component Areas & Conflict Resolution

This document defines the **area (responsibility)** of every component in `components/lab/` and documents how to resolve the conflicts between them.

## Component Area Map

### Shared UI (reusable primitives)

| Component | File | Area |
|-----------|------|------|
| `CollapsibleControls` | `collapsible-controls.tsx` | Reusable collapsible wrapper for a group of lab controls. Owns its own open/close state. Used by `physics-3d.tsx` and `chemistry-interactive.tsx`. |
| `ControlGroup` / `ControlPanel` | `control-group.tsx` | Reusable grouped control panel (label + items). Used by `physics-interactive.tsx`. |
| `TheoryPanel` | `theory-panel.tsx` | Reusable theory/observation panel (Picture it / Predict / Principle / Why it matters / Vocabulary). Used by `physics-interactive.tsx`. |

### Physics

| Component | File | Area |
|-----------|------|------|
| `PhysicsInteractive` | `physics-interactive.tsx` | 2D physics calculators & simulators: Ohm's Law, Waves, Pendulum, Circuits, Energy, Lens/Mirror. |
| `PhysicsOptics` | `physics-optics.tsx` | Optics: Reflection, Refraction (+ Total Internal Reflection) with **29 optical-medium presets** (refractive indices), Lateral Shift (glass slab), Optical Medium Explorer (compare n & speed of light), Prism & Dispersion, Aperture & Light Cone, Diffraction (single/double slit), Wave Interference. Maps to syllabus units `reflection-at-curved-mirror`, `refraction-at-plane-surfaces`, `refraction-through-prisms`, `lenses`, `dispersion`. All plugins are **input-responsive** (number input + slider). *(No overlap with `PhysicsInteractive`'s LensCalculator — uses ray-diagram canvases, not equations.)* |
| `PhysicsHeatLab` | `physics-heat.tsx` | **Heat & Temperature** labs: Measurement of Specific Heat Capacity of a Solid (Calorimetry), Specific Heat of a Liquid (Method of Mixtures), Latent Heat & Phase Change (Q = mL), Newton's Law of Cooling, Thermal Expansion (ΔL = L₀·α·ΔT). Maps to syllabus units `heat-and-temperature`, `quantity-of-heat`, `thermal-expansion`. Uses canvas diagrams + TheoryPanel. *(No overlap with any other physics component.)* |
| `PhysicsLab` | `physics-lab.tsx` | 3D physics sims: Projectile Motion, Uniform Circular Motion, Simple Harmonic Motion. |
| `Physics3D` | `physics-3d.tsx` | 3D physics visualizers: Electric Field, Double Pendulum, Gravitational Field. *(No topic overlap with `PhysicsLab`.)* |

### Chemistry

| Component | File | Area |
|-----------|------|------|
| `ChemistryInteractive` | `chemistry-interactive.tsx` | 2D chemistry calculators: pH, Titration, Concentration, Molar Mass, Gas Laws. |
| `ChemistryStoichiometry` | `chemistry-stoichiometry.tsx` | **Stoichiometry calculators: Moles & Particles, Percent Composition, Limiting Reagent.** *(No overlap with `ChemistryInteractive` — gas laws are NOT duplicated.)* |
| `ChemistryLab` | `chemistry-lab.tsx` | 3D Periodic Table explorer + **embeds `Chemistry3D`** in its "3D Models & Geometry" tab. |
| `Chemistry3D` | `chemistry-3d.tsx` | 3D chemistry models: Molecules, Molecular Orbitals, VSEPR, Crystal Lattices, Bohr Models, States of Matter, Hybridization. *(Embedded inside `ChemistryLab` only; no standalone usage.)* |
| `ChemistryAdvanced3D` | `chemistry-advanced-3d.tsx` | 3D: Molecular Orbitals + Crystal Lattice Structures. |
| `Quantum3D` | `quantum-3d.tsx` | 3D quantum physics/chemistry: Rutherford Model, Heisenberg Uncertainty, Hydrogen Spectral Series, Modern Periodic Table. |

### Mathematics

| Component | File | Area |
|-----------|------|------|
| `MathInteractive` | `math-interactive.tsx` | 2D math calculators: Derivatives/Integrals, Quadratics, Statistics, Matrices, Limits, Systems, Vectors, 3D Plotter. |
| `MathTrigonometry` | `math-trigonometry.tsx` | **Trigonometry: Unit Circle (sin/cos/tan) and Trigonometric Function Graphs.** *(No overlap with existing math components.)* |
| `MathSeriesLab` | `math-series-lab.tsx` | **Sequences & Series: Arithmetic, Geometric, Series Summation.** *(No overlap with existing math components.)* |
| `MathLab` | `math-lab.tsx` | 2D function graphs + 3D: Coordinate Geometry, Math Surfaces, Parabola. |
| `MathGeometry3D` | `math-geometry-3d.tsx` | 3D: Coordinate Plane/Axes, Vectors & Angles, Parabola Explorer. |
| `MathAdvanced3D` | `math-advanced-3d.tsx` | 3D: Parametric Curves, Vector Fields, Complex Functions. |

## Conflicts & Resolutions

### Conflict 1 — `Chemistry3D` rendered twice ✅ RESOLVED
- **Cause:** `ChemistryLab` embeds `<Chemistry3D />` internally (its "3D Models & Geometry" tab), **and** `app/lab/page.tsx` also rendered `<Chemistry3D />` as a standalone top-level component on the Chemistry tab.
- **Resolution:** Removed the standalone `<Chemistry3D />` from `app/lab/page.tsx`. It is now embedded inside `ChemistryLab` only.

### Conflict 2 — `Chemistry3D` vs `ChemistryAdvanced3D` duplicate topics
- **Cause:** Both render **molecular orbitals** and **crystal lattices**.
- **Resolution:** Assign `Chemistry3D` the **molecular/atomic models** (molecules, VSEPR, Bohr, states of matter, hybridization) and remove its `OrbitalViewer` and `CrystalLatticeViewer` tabs. Assign `ChemistryAdvanced3D` the **orbitals + crystal lattices** exclusively. (Alternatively, keep `Chemistry3D` as-is and remove `ChemistryAdvanced3D` from the page — pick one source of truth.)

### Conflict 3 — Duplicate 3D periodic table (`ChemistryLab` vs `Quantum3D`)
- **Cause:** `ChemistryLab` exports `Element` type + `PERIODIC_TABLE`; `Quantum3D` defines its own `ElementDef` type + `ELEMENTS`/`PERIODIC_LAYOUT` data.
- **Resolution:** Consolidate to a single source of truth. Move the periodic table data/type into a shared module (e.g. `components/lab/periodic-table-data.ts`) and have both `ChemistryLab` and `Quantum3D` import from it. Remove the duplicated definitions.

### Conflict 4 — `MathLab` vs `MathGeometry3D` duplicate topics
- **Cause:** Both render **coordinate geometry** and **parabola** visualizations.
- **Resolution:** Assign `MathLab` the **2D function graphing + 3D surfaces** area. Assign `MathGeometry3D` the **coordinate geometry, vectors, and parabola** area exclusively. Remove the overlapping `CoordinateGeometry3D` and `Parabola3D` from `MathLab`.

### Conflict 5 — `MathLab` vs `MathAdvanced3D` 3D surface overlap
- **Cause:** `MathLab` has `MathSurfaces3D`; `MathAdvanced3D` has `ParametricCurvePlotter` (3D curves/surfaces).
- **Resolution:** Assign `MathLab` the **basic 3D surfaces** (e.g. standard quadric surfaces) and `MathAdvanced3D` the **parametric curves, vector fields, and complex functions**. Keep them distinct; if they still overlap, remove `MathSurfaces3D` from `MathLab` and keep only `MathAdvanced3D` for advanced 3D plotting.

### Conflict 6 — Shared component usage
- **Note:** `ControlGroup`/`ControlPanel` and `TheoryPanel` ARE used by `physics-interactive.tsx` (they are not orphaned). Other 3D components (`physics-3d.tsx`, `chemistry-3d.tsx`, etc.) hand-roll their own "Observation & Conclusion" panels.
- **Resolution (optional):** Refactor other 3D components to also use `TheoryPanel` for consistency.

## Usage Site (`app/lab/page.tsx`)

The only consumer of these components is `app/lab/page.tsx`. Current composition (no overlapping topics):

- **Physics tab:** `PhysicsInteractive`, `PhysicsOptics`, `PhysicsHeatLab`, `PhysicsLab`, `Physics3D`
- **Chemistry tab:** `ChemistryInteractive`, `ChemistryStoichiometry`, `ChemistryLab` (embeds `Chemistry3D`), `ChemistryAdvanced3D`, `Quantum3D`
- **Mathematics tab:** `MathInteractive`, `MathTrigonometry`, `MathSeriesLab`, `MathLab`, `MathGeometry3D`, `MathAdvanced3D`

### Non-overlapping area assignment (new components)

| New Component | Unique Area (not covered by any pre-existing component) |
|---------------|-----------------------------------------------------------|
| `PhysicsOptics` | Reflection, refraction + TIR, prism dispersion, aperture cone, diffraction, wave interference — all canvas visuals; `PhysicsInteractive` only does lens/mirror equations. |
| `PhysicsHeatLab` | All heat & temperature experiments: specific heat (solid/liquid), latent heat, Newton's cooling, thermal expansion — no heat tool existed before. |
| `ChemistryStoichiometry` | Moles/particles, percent composition, limiting reagents — `ChemistryInteractive` covers pH/titration/concentration/molar mass/gas laws only. |
| `MathTrigonometry` | Unit circle and sine/cosine/tangent graphs — no trig visual tool existed. |
| `MathSeriesLab` | Arithmetic/geometric sequences and series summation — no sequences tool existed. |

## Advanced 3D Explorers (24 new visualizations, added as `status: "new"`)

All three components live in `components/lab/` (and mirrored in `frontend/components/lab/`) and are registered on `app/lab/page.tsx` / `frontend/app/lab/page.tsx`.

| Component | File | Tabs (topics) |
|-----------|------|---------------|
| `Physics3DAdvanced` | `physics-advanced-3d.tsx` | Electromagnetism (B-field around wire), Wave optics (diffraction/interference), Relativity (spacetime curvature), Quantum (hydrogen orbitals), Nuclear (α/β/γ decay), Fluid dynamics (streamlines), Astrophysics (N-body + gravitational well), Thermodynamics (PVT surface). |
| `ChemistryModern3D` | `chemistry-modern-3d.tsx` | Molecular dynamics (vibration/rotation/torsion), Crystallography (SC/BCC/FCC/HCP + Miller indices), Spectroscopy (IR/NMR), Reaction mechanisms (SN1/SN2), Biomolecules (DNA helix), VSEPR (shapes + lone pairs), Electrochemistry (galvanic cell), Phase diagram (triple/critical points). |
| `MathModern3D` | `math-modern-3d.tsx` | Multivariable calculus (surface + contours), Vector calculus (divergence/curl), Fractals (Mandelbulb), Differential geometry (torus/Klein/Möbius), Linear algebra (matrix transforms), Complex analysis (Riemann surfaces), Game theory (payoff + Nash), Topology (twist deformation). |

Shared infrastructure: `three-scene.ts` (scene/camera/renderer/controls bootstrap + disposal + `titleText` labels) and `sim-card.tsx` (uniform card layout). All three use the same hand-rolled WebGL + `OrbitControls` pattern as the existing 3D components, with `useWebGLCanvas`/`isWebGLAvailable` fallbacks.

> Note: `app/lab/page.tsx` keeps a mirror copy in `frontend/app/lab/page.tsx`. Both were updated in the same commit; keep them in sync.
