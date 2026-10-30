# ⚛️ PHYSICS NOTES REBUILD — Master Plan (book-grade)

> **Mission:** raise the Physics notes from their current ~3–4% of textbook depth to
> **book-grade, visionary notes** — every topic of every NEB Physics unit (**35 units ·
> 165 topics**: Class 11 = 26 units/117 topics, Class 12 = 9 units/48 topics) gets a proper
> introduction, strict hierarchy, **derivation blocks**, classified tables with examples,
> worked numericals, and rich English diagrams (authored SVG + curated Google figures).
>
> - **Benchmark books:** *Pioneer Physics Grade XI* (Sita Ram Bahadur Thapa / Kamal Bahadur
>   Rayamajhi et al., Dreamland Publication — ~712 pages: theory + very short, short and
>   long questions + numerical exercises) · *Numerical Problems in Physics* (V.K. Jha,
>   Heritage) · NEB/CDC Physics textbook.
> - **Golden rules:** ① **Simply no removal** — existing notes are upgraded in place.
>   ② **All existing CEE / entrance-exam content stays**; new material grows an Exam Zone
>   around it. ③ Order owned by `frontend/lib/syllabus.ts`. ④ Facts valid & sourced —
>   SI units/definitions follow the 2019 redefinition, constants follow CODATA
>   (KNOWLEDGE-PLAN.md §8.3); modern-physics claims are validity-checked.
> - **Method home:** the shared method, licensing pipeline and session mechanics live in
>   [biology-plan.md](biology-plan.md) §3/§7; this file is Physics' own interface + blueprints.
> - **Sequencing:** interfaces (all 165 skeletons) first; note-filling in later sessions.

---

## 0. The gap

Today's Physics notes are short summaries. *Pioneer Physics* gives: concept → derivation →
formula box → solved numericals → graphs → exercises. A topic is "done" only when a student
can **derive, calculate and draw** — not just recognize. Target: the Book-Grade Bar (§4).

## 1. Scope

Class 11 (26 units, 117 topics) first in syllabus order, then Class 12 (9 units, 48 topics).
Architecture stays open for Bachelor-level physics later (levels are data).

## 2. Benchmarks & sources

| Source | Role |
|---|---|
| `frontend/lib/syllabus.ts` | topic skeleton + order |
| *Pioneer Physics XI* (Thapa/Rayamajhi, Dreamland) | depth & format benchmark (theory + question ladder + numericals) |
| V.K. Jha, *Numerical Problems in Physics* (Heritage) | numerical difficulty ladder |
| NEB/CDC Physics textbook | curriculum wording, prescribed figures |
| BIPM SI Brochure · NIST CODATA | units, constants (validity — KNOWLEDGE-PLAN §8.3) |
| Google/Wikimedia/open textbooks | diagram intake (license-checked, English labels) |

## 3. The Note Interface v2 — Physics

| # | Block | Standard | Schema home |
|---|---|---|---|
| I | **Introduction** | 150–300 words: physical picture, real-world hook (Nepal context where possible), learning outcomes | `notes` heading + prose |
| II | **Concepts & laws** | strict H2→H4; every law stated **exactly** (words + equation + units + sign convention + limits of validity) | `notes`, `keyPoints` |
| III | **Derivation block** (Physics' flagship) | numbered steps, each with the reason it follows; **"Assumptions" box** first; final equation boxed with units and validity condition | `notes`, `importantStatements` |
| IV | **Formula & units table** | symbol → meaning → SI unit → condition of validity (every formula in the topic) | markdown table |
| V | **Solved numericals** | ≥ 5 per calculation topic: Given → Formula → Substitution → Answer **with unit + significant figures**; difficulty ladder (Pioneer/Jha style) | `numericals`, `examples` |
| VI | **Diagrams** | ≥ 4 per topic (§3.2) | `figures`/`blocks` + visuals registry |
| VII | **Exam Zone** | NEB derivation list + typical numericals + **all existing CEE lines preserved** + new MCQs (`mcs`) + short tricks | `mcs`, `practiceQuestions`, `examNotes` |
| VIII | **Summary & self-check** | key results table, common mistakes, self-check problems | `summary`, `confusion`, `practice` |

### 3.1 Table standard
Law-statement table (law → statement → equation → units) · comparison tables (e.g., static
vs kinetic friction, concave vs convex mirror cases) · constant tables (CODATA values,
year noted) · graph-reading table (graph → slope/area meaning). Every table captioned and
referenced from text; ≤ 12 rows; example column or example rows mandatory.

### 3.2 Diagram standard
- **A — Authored SVG (≥ 2/topic):** ray diagrams (mirrors/lenses/prisms, ≥ 3 principal rays
  each), circuit diagrams (standard symbols), free-body diagrams, graphs (correct axes,
  units, labels), field/flux diagrams. 900×640 viewBox, English labels, `role="img"`,
  caption "Fig. x.y".
- **B — Curated Google/external (≥ 2/topic):** license-checked (CC/PD), English labels,
  most detailed available; source/author/license recorded (biology-plan.md §3.4 pipeline).
- Graphs must be *plotted from data the note provides* (table → graph), so numbers agree.

## 4. Book-Grade Bar (Physics)

Per topic: **≥ 8 sections · ≥ 2 derivations where the syllabus implies them (marked
"derive/establish/show that") · ≥ 5 solved numericals on calculation topics · complete
formula-units table · ≥ 4 diagrams (2 SVG + 2 curated) · sign conventions stated ·
validity conditions stated · ≥ 10 MCQs (CEE preserved) + NEB short/long set · summary +
self-check.** Constants/units must match SI 2019 + CODATA.

## 5. Polish track (newer version, no removal)
Additive v2 around existing fields; CEE lines frozen in place; de-garble, merge duplicates
into one strong line (originals kept as "extra points"), attach table/diagram slots; every
corrected constant/unit logged in the validity ledger (KNOWLEDGE-PLAN flow).

## 6. Per-unit blueprints (35 units)

### Class 11 (26 units, 117 topics)

| Unit | h | Must produce |
|---|---:|---|
| Physical Quantities | 3 | SI base/derived units table, dimensional-analysis table, significant-figures rules, vernier/screw-gauge SVG |
| Vectors | 4 | resolution & parallelogram SVG set, unit-vector tables, dot/cross comparison table |
| Kinematics | 5 | graph gallery (s-t, v-t, a-t) SVG with slope/area table, equations-of-motion table + derivations |
| Dynamics | 5 | free-body diagram gallery, friction comparison table, momentum/impulse worked set |
| Work, Energy and Power | 6 | work-energy theorem derivation, energy-transformations table, power table, vertical-circle SVG |
| Circular Motion | 6 | angular-quantities table, conical pendulum/vehicle-on-bank SVG + derivations |
| Gravitation | 10 | g-variation table (depth/height/rotation), Kepler laws table, satellite/orbit SVG, escape-velocity derivation + numerical ladder |
| Elasticity | 5 | stress-strain graph SVG, moduli table, bending/extension numericals |
| Heat and Temperature | 3 | scale-conversion table, calorimetry numericals |
| Thermal Expansion | 4 | expansion-coefficients table, bimetallic/thermometer SVG |
| Quantity of Heat | 6 | latent-heat table, calorimetry principle + worked set, humidity definitions table |
| Rate of Heat Flow | 5 | conduction/convection/radiation comparison table, thermal-conductivity values, Stefan–Boltzmann numericals |
| Ideal Gas | 7 | gas-laws table, kinetic-theory derivations, PV/PT graphs SVG |
| Reflection at Curved Mirror | 2 | mirror-formula derivation, ray-diagram case gallery SVG, magnification table |
| Refraction at Plane Surfaces | 4 | Snell's law + TIR, apparent-depth derivation, refractive-index table, optical-fibre SVG |
| Refraction through Prisms | 3 | prism formula + minimum-deviation derivation, dispersion graph SVG |
| Lenses | 3 | lens-maker derivation, ray-diagram gallery SVG, power/combination table |
| Dispersion | 3 | spectrum SVG, dispersive-power table, angular-dispersion numericals |
| Electric Charges | 4 | Coulomb's law + quantization, superposition worked set |
| Electric Field | 3 | field-lines SVG gallery, dipole derivations, flux table |
| Potential, Potential Difference and Potential Energy | 3 | V–E relation table, equipotential SVG, energy worked set |
| Capacitor | 5 | combinations table + SVG, dielectric table, energy derivation, RC charging curve SVG |
| DC Circuits | 10 | Ohm/Kirchhoff/Wheatstone/maximum-power derivations, meter bridge & potentiometer SVG, numerical ladder (Jha-style) |
| Nuclear Physics | 7 | decay-law derivation, half-life graph SVG, binding-energy curve SVG, radioactivity table |
| Solids | 3 | band-structure SVG, p-n junction + logic-gates symbol table SVG |
| Recent Trends in Physics | 3 | frontier-physics summary tables (astrophysics, quantum computing) — **validity-checked**, one modern figure each |

### Class 12 (9 units, 48 topics)

| Unit | h | Must produce |
|---|---:|---|
| Electrostatics | 10 | Gauss's law derivations (standard geometries table), capacitor combos, dipole field derivation set |
| Current Electricity | 10 | drift/Ohm derivations, cells & internal-resistance table, Wheatstone/potentiometer numericals, temperature-resistance graph SVG |
| Magnetism & Magnetic Effect | 12 | Biot–Savart/Ampere derivations, solenoid/toroid SVG, force-on-conductor numericals, magnetic-materials table |
| Electromagnetic Induction | 8 | Faraday–Lenz derivations, eddy-current/mutual-induction tables, generator/motor SVG |
| Alternating Current | 8 | phasor SVG set (R/L/C), RMS-average table, impedance/resonance graphs, Q-factor table |
| Ray Optics | 10 | mirror/lens formulas re-derived, **telescope & microscope SVG + magnification table**, optical-instruments comparison |
| Wave Optics | 8 | Huygens construction SVG, YDSE derivation + intensity graph, diffraction/resolution table |
| Modern Physics | 12 | photoelectric graphs SVG (V₀ vs ν), Bohr-model derivations, de Broglie table, laser/semiconductor devices SVG — validity-checked |
| Communication Systems | 4 | bandwidth/modulation table, AM/FM wave SVG, propagation-mode table |

## 7. Interfaces-first roadmap
**S1 (next):** all 165 skeleton files (blocks I–VIII, empty formula/derivation/numerical
shells, figure slots declared, CEE lines seeded) → gates: `ConceptNoteSchema` passes,
`check:content` green, no placeholder rise. **S2+:** one unit per session in the order above
(heavy units get 2 sessions: Gravitation, DC Circuits, Modern Physics). Parallel polish.
Final: `npm run check:all` + coverage report.

## 8. Quality gates
`npm run check:schema` · `npm run check:content` · `content:build:check` · `audit:scopes`
(thin/placeholder must not rise) · `audit:visuals` · no-removal diff review ·
constants/units spot-audit vs CODATA per unit.

## 9. Tracking checklist

> `node scripts/subject-plan-inventory.mjs physics` regenerates this. Legend: **I** =
> interface · **N** = filled to bar · **D** = diagrams placed · **P** = polished.

<!-- PHYSICS-PLAN:TOPICS:START -->

> Regenerated by `node scripts/subject-plan-inventory.mjs physics` from `frontend/lib/syllabus.ts`.
> Coverage: **35 units · 165 topics** (Class 11: 26 units, 117 topics; Class 12: 9 units, 48 topics).

## Class 11

### `physical-quantities` — Physical Quantities (2 topics · 3h)

- [x] I · [x] N · [x] D · [ ] P — **Precision and significant figures**
- [x] I · [x] N · [x] D · [ ] P — **Dimensions and uses of dimensional analysis**

### `vectors` — Vectors (3 topics · 4h)

- [x] I · [ ] N · [ ] D · [ ] P — **Triangle, parallelogram and polygon laws of vectors**
- [x] I · [ ] N · [ ] D · [ ] P — **Resolution of vectors; unit vectors**
- [x] I · [ ] N · [ ] D · [ ] P — **Scalar and vector products**

### `kinematics` — Kinematics (5 topics · 5h)

- [x] I · [ ] N · [ ] D · [ ] P — **Instantaneous velocity and acceleration**
- [x] I · [ ] N · [ ] D · [ ] P — **Relative velocity**
- [x] I · [ ] N · [ ] D · [ ] P — **Equation of motion (graphical treatment)**
- [x] I · [ ] N · [ ] D · [ ] P — **Motion of a freely falling body**
- [x] I · [ ] N · [ ] D · [ ] P — **Projectile motion and its applications**

### `dynamics` — Dynamics (5 topics · 6h)

- [x] I · [ ] N · [ ] D · [ ] P — **Linear momentum, impulse**
- [x] I · [ ] N · [ ] D · [ ] P — **Conservation of linear momentum**
- [x] I · [ ] N · [ ] D · [ ] P — **Application of Newton's laws**
- [x] I · [ ] N · [ ] D · [ ] P — **Moment, torque and equilibrium**
- [x] I · [ ] N · [ ] D · [ ] P — **Solid friction: laws of solid friction and their verifications**

### `work-energy-and-power` — Work, Energy and Power (6 topics · 6h)

- [x] I · [ ] N · [ ] D · [ ] P — **Work done by a constant force and a variable force**
- [x] I · [ ] N · [ ] D · [ ] P — **Power**
- [x] I · [ ] N · [ ] D · [ ] P — **Work-energy theorem; kinetic and potential energy**
- [x] I · [ ] N · [ ] D · [ ] P — **Conservation of energy**
- [x] I · [ ] N · [ ] D · [ ] P — **Conservative and non-conservative forces**
- [x] I · [ ] N · [ ] D · [ ] P — **Elastic and inelastic collisions**

### `circular-motion` — Circular Motion (6 topics · 6h)

- [x] I · [ ] N · [ ] D · [ ] P — **Angular displacement, velocity and acceleration**
- [x] I · [ ] N · [ ] D · [ ] P — **Relation between angular and linear velocity and acceleration**
- [x] I · [ ] N · [ ] D · [ ] P — **Centripetal acceleration and centripetal force**
- [x] I · [ ] N · [ ] D · [ ] P — **Conical pendulum**
- [x] I · [ ] N · [ ] D · [ ] P — **Motion in a vertical circle**
- [x] I · [ ] N · [ ] D · [ ] P — **Applications of banking**

### `gravitation` — Gravitation (10 topics · 10h)

- [x] I · [ ] N · [ ] D · [ ] P — **Newton's law of gravitation**
- [x] I · [ ] N · [ ] D · [ ] P — **Gravitational field strength**
- [x] I · [ ] N · [ ] D · [ ] P — **Gravitational potential; gravitational potential energy**
- [x] I · [ ] N · [ ] D · [ ] P — **Variation in value of 'g' due to altitude and depth**
- [x] I · [ ] N · [ ] D · [ ] P — **Centre of mass and centre of gravity**
- [x] I · [ ] N · [ ] D · [ ] P — **Motion of a satellite: orbital velocity and time period of the satellite**
- [x] I · [ ] N · [ ] D · [ ] P — **Escape velocity**
- [x] I · [ ] N · [ ] D · [ ] P — **Potential and kinetic energy of the satellite**
- [x] I · [ ] N · [ ] D · [ ] P — **Geostationary satellite**
- [x] I · [ ] N · [ ] D · [ ] P — **GPS**

### `elasticity` — Elasticity (5 topics · 5h)

- [x] I · [ ] N · [ ] D · [ ] P — **Hooke's law: force constant**
- [x] I · [ ] N · [ ] D · [ ] P — **Stress; strain; elasticity and plasticity**
- [x] I · [ ] N · [ ] D · [ ] P — **Elastic modulus: Young modulus, bulk modulus, shear modulus**
- [x] I · [ ] N · [ ] D · [ ] P — **Poisson's ratio**
- [x] I · [ ] N · [ ] D · [ ] P — **Elastic potential energy**

### `heat-and-temperature` — Heat and Temperature (3 topics · 3h)

- [x] I · [ ] N · [ ] D · [ ] P — **Molecular concept of thermal energy, heat and temperature; cause and direction of heat flow**
- [x] I · [ ] N · [ ] D · [ ] P — **Meaning of thermal equilibrium and Zeroth law of thermodynamics**
- [x] I · [ ] N · [ ] D · [ ] P — **Thermal equilibrium as a working principle of a mercury thermometer**

### `thermal-expansion` — Thermal Expansion (4 topics · 4h)

- [x] I · [ ] N · [ ] D · [ ] P — **Linear expansion and its measurement**
- [x] I · [ ] N · [ ] D · [ ] P — **Cubical expansion, superficial expansion and their relation with linear expansion**
- [x] I · [ ] N · [ ] D · [ ] P — **Liquid expansion: absolute and apparent**
- [x] I · [ ] N · [ ] D · [ ] P — **Dulong and Petit method of determining expansivity of liquid**

### `quantity-of-heat` — Quantity of Heat (6 topics · 6h)

- [x] I · [ ] N · [ ] D · [ ] P — **Newton's law of cooling**
- [x] I · [ ] N · [ ] D · [ ] P — **Measurement of specific heat capacity of solids and liquids**
- [x] I · [ ] N · [ ] D · [ ] P — **Change of phases: latent heat**
- [x] I · [ ] N · [ ] D · [ ] P — **Specific latent heat of fusion and vaporization**
- [x] I · [ ] N · [ ] D · [ ] P — **Measurement of specific latent heat of fusion and vaporization**
- [x] I · [ ] N · [ ] D · [ ] P — **Triple point**

### `rate-of-heat-flow` — Rate of Heat Flow (5 topics · 5h)

- [x] I · [ ] N · [ ] D · [ ] P — **Conduction: thermal conductivity and measurement**
- [x] I · [ ] N · [ ] D · [ ] P — **Convection**
- [x] I · [ ] N · [ ] D · [ ] P — **Radiation: ideal radiator**
- [x] I · [ ] N · [ ] D · [ ] P — **Black-body radiation**
- [x] I · [ ] N · [ ] D · [ ] P — **Stefan-Boltzmann law**

### `ideal-gas` — Ideal Gas (7 topics · 8h)

- [x] I · [ ] N · [ ] D · [ ] P — **Ideal gas equation**
- [x] I · [ ] N · [ ] D · [ ] P — **Molecular properties of matter**
- [x] I · [ ] N · [ ] D · [ ] P — **Kinetic-molecular model of an ideal gas**
- [x] I · [ ] N · [ ] D · [ ] P — **Derivation of pressure exerted by gas**
- [x] I · [ ] N · [ ] D · [ ] P — **Average translational kinetic energy of gas molecule**
- [x] I · [ ] N · [ ] D · [ ] P — **Boltzmann constant, root mean square speed**
- [x] I · [ ] N · [ ] D · [ ] P — **Heat capacities of gases and solids**

### `reflection-at-curved-mirror` — Reflection at Curved Mirror (2 topics · 2h)

- [x] I · [ ] N · [ ] D · [ ] P — **Real and virtual images**
- [x] I · [ ] N · [ ] D · [ ] P — **Mirror formula**

### `refraction-at-plane-surfaces` — Refraction at Plane Surfaces (4 topics · 4h)

- [x] I · [ ] N · [ ] D · [ ] P — **Laws of refraction: refractive index**
- [x] I · [ ] N · [ ] D · [ ] P — **Relation between refractive indices**
- [x] I · [ ] N · [ ] D · [ ] P — **Lateral shift**
- [x] I · [ ] N · [ ] D · [ ] P — **Total internal reflection**

### `refraction-through-prisms` — Refraction through Prisms (3 topics · 4h)

- [x] I · [ ] N · [ ] D · [ ] P — **Minimum deviation condition**
- [x] I · [ ] N · [ ] D · [ ] P — **Relation between the angle of prism, minimum deviation and refractive index**
- [x] I · [ ] N · [ ] D · [ ] P — **Deviation in small-angle prism**

### `lenses` — Lenses (3 topics · 3h)

- [x] I · [ ] N · [ ] D · [ ] P — **Spherical lenses, angular magnification**
- [x] I · [ ] N · [ ] D · [ ] P — **Lens maker's formula**
- [x] I · [ ] N · [ ] D · [ ] P — **Power of a lens**

### `dispersion` — Dispersion (3 topics · 3h)

- [x] I · [ ] N · [ ] D · [ ] P — **Pure spectrum and dispersive power**
- [x] I · [ ] N · [ ] D · [ ] P — **Chromatic and spherical aberration**
- [x] I · [ ] N · [ ] D · [ ] P — **Achromatism and its applications**

### `electric-charges` — Electric Charges (4 topics · 3h)

- [x] I · [ ] N · [ ] D · [ ] P — **Electric charges**
- [x] I · [ ] N · [ ] D · [ ] P — **Charging by induction**
- [x] I · [ ] N · [ ] D · [ ] P — **Coulomb's law: force between two point charges**
- [x] I · [ ] N · [ ] D · [ ] P — **Force between multiple electric charges**

### `electric-field` — Electric Field (3 topics · 3h)

- [x] I · [ ] N · [ ] D · [ ] P — **Electric field due to point charges; field lines**
- [x] I · [ ] N · [ ] D · [ ] P — **Gauss law: electric flux**
- [x] I · [ ] N · [ ] D · [ ] P — **Application of Gauss law: field of a charge sphere, line charge, charged plane conductor**

### `potential-potential-difference-and-potential-energy` — Potential, Potential Difference and Potential Energy (3 topics · 4h)

- [x] I · [ ] N · [ ] D · [ ] P — **Potential difference, potential due to a point charge, potential energy, electron volt**
- [x] I · [ ] N · [ ] D · [ ] P — **Equipotential lines and surfaces**
- [x] I · [ ] N · [ ] D · [ ] P — **Potential gradient**

### `capacitor` — Capacitor (5 topics · 5h)

- [x] I · [ ] N · [ ] D · [ ] P — **Capacitance and capacitor**
- [x] I · [ ] N · [ ] D · [ ] P — **Parallel plate capacitor**
- [x] I · [ ] N · [ ] D · [ ] P — **Combination of capacitors**
- [x] I · [ ] N · [ ] D · [ ] P — **Energy of charged capacitor**
- [x] I · [ ] N · [ ] D · [ ] P — **Effect of a dielectric: polarization and displacement**

### `dc-circuits` — DC Circuits (7 topics · 10h)

- [x] I · [ ] N · [ ] D · [ ] P — **Electric currents; drift velocity and its relation with current**
- [x] I · [ ] N · [ ] D · [ ] P — **Ohm's law; electrical resistance; resistivity; conductivity**
- [x] I · [ ] N · [ ] D · [ ] P — **Current-voltage relations; ohmic and non-ohmic resistance**
- [x] I · [ ] N · [ ] D · [ ] P — **Resistances in series and parallel**
- [x] I · [ ] N · [ ] D · [ ] P — **Potential divider**
- [x] I · [ ] N · [ ] D · [ ] P — **Electromotive force of a source, internal resistance**
- [x] I · [ ] N · [ ] D · [ ] P — **Work and power in electrical circuits**

### `nuclear-physics` — Nuclear Physics (7 topics · 4h)

- [x] I · [ ] N · [ ] D · [ ] P — **Nucleus: discovery of nucleus**
- [x] I · [ ] N · [ ] D · [ ] P — **Nuclear density; mass number; atomic number**
- [x] I · [ ] N · [ ] D · [ ] P — **Atomic mass; isotopes**
- [x] I · [ ] N · [ ] D · [ ] P — **Einstein's mass-energy relation**
- [x] I · [ ] N · [ ] D · [ ] P — **Mass defect, packing fraction, binding energy per nucleon**
- [x] I · [ ] N · [ ] D · [ ] P — **Creation and annihilation**
- [x] I · [ ] N · [ ] D · [ ] P — **Nuclear fission and fusion**

### `solids` — Solids (3 topics · 3h)

- [x] I · [ ] N · [ ] D · [ ] P — **Energy bands in solids (qualitative ideas)**
- [x] I · [ ] N · [ ] D · [ ] P — **Difference between metals, insulators and semiconductors using band theory**
- [x] I · [ ] N · [ ] D · [ ] P — **Intrinsic and extrinsic semiconductors**

### `recent-trends-in-physics` — Recent Trends in Physics (3 topics · 6h)

- [x] I · [ ] N · [ ] D · [ ] P — **Particle physics: particles and antiparticles, quarks (baryons and mesons) and leptons (neutrinos)**
- [x] I · [ ] N · [ ] D · [ ] P — **Universe: Big Bang and Hubble law — expansion of the Universe**
- [x] I · [ ] N · [ ] D · [ ] P — **Dark matter, black hole and gravitational wave**

## Class 12

### `electrostatics` — Electrostatics (6 topics · 10h)

- [x] I · [ ] N · [ ] D · [ ] P — **Coulomb's law and its applications**
- [x] I · [ ] N · [ ] D · [ ] P — **Electric field and electric field intensity due to point charges, line charges, and charged sheets**
- [x] I · [ ] N · [ ] D · [ ] P — **Electric potential and potential difference**
- [x] I · [ ] N · [ ] D · [ ] P — **Capacitance and capacitors — parallel plate, series and parallel combination**
- [x] I · [ ] N · [ ] D · [ ] P — **Dielectric and dielectric constant**
- [x] I · [ ] N · [ ] D · [ ] P — **Energy stored in a capacitor**

### `current-electricity` — Current Electricity (8 topics · 10h)

- [x] I · [ ] N · [ ] D · [ ] P — **Electric current, drift velocity, and relaxation time**
- [x] I · [ ] N · [ ] D · [ ] P — **Ohm's law and its limitations**
- [x] I · [ ] N · [ ] D · [ ] P — **Resistance and resistivity — temperature dependence**
- [x] I · [ ] N · [ ] D · [ ] P — **Series and parallel combination of resistors**
- [x] I · [ ] N · [ ] D · [ ] P — **Kirchhoff's laws and their applications**
- [x] I · [ ] N · [ ] D · [ ] P — **Electromotive force (emf), internal resistance, and cells in combination**
- [x] I · [ ] N · [ ] D · [ ] P — **Wheatstone bridge and meter bridge**
- [x] I · [ ] N · [ ] D · [ ] P — **Potentiometer and its applications**

### `magnetism-and-magnetic-effect` — Magnetism and Magnetic Effect of Current (6 topics · 12h)

- [x] I · [ ] N · [ ] D · [ ] P — **Magnetic field and magnetic force on moving charges**
- [x] I · [ ] N · [ ] D · [ ] P — **Lorentz force and motion of charged particles in magnetic fields**
- [x] I · [ ] N · [ ] D · [ ] P — **Biot-Savart law and its applications (straight wire, circular loop, solenoid)**
- [x] I · [ ] N · [ ] D · [ ] P — **Ampere's circuital law and its applications**
- [x] I · [ ] N · [ ] D · [ ] P — **Force between two parallel current-carrying conductors**
- [x] I · [ ] N · [ ] D · [ ] P — **Moving coil galvanometer, ammeter, and voltmeter**

### `electromagnetic-induction` — Electromagnetic Induction (5 topics · 8h)

- [x] I · [ ] N · [ ] D · [ ] P — **Faraday's laws of electromagnetic induction**
- [x] I · [ ] N · [ ] D · [ ] P — **Lenz's law and conservation of energy**
- [x] I · [ ] N · [ ] D · [ ] P — **Self-induction and self-inductance**
- [x] I · [ ] N · [ ] D · [ ] P — **Mutual induction and mutual inductance**
- [x] I · [ ] N · [ ] D · [ ] P — **Growing and decaying current in LR circuits**

### `alternating-current` — Alternating Current (4 topics · 8h)

- [x] I · [ ] N · [ ] D · [ ] P — **AC voltage applied to resistor, inductor, and capacitor**
- [x] I · [ ] N · [ ] D · [ ] P — **LC oscillations and resonance**
- [x] I · [ ] N · [ ] D · [ ] P — **LCR series circuit and power factor**
- [x] I · [ ] N · [ ] D · [ ] P — **Transformer — principle, types, and losses**

### `ray-optics` — Ray Optics (6 topics · 10h)

- [x] I · [ ] N · [ ] D · [ ] P — **Reflection at plane and curved surfaces — mirrors**
- [x] I · [ ] N · [ ] D · [ ] P — **Refraction at plane surfaces — total internal reflection**
- [x] I · [ ] N · [ ] D · [ ] P — **Refraction through prisms — angle of deviation and minimum deviation**
- [x] I · [ ] N · [ ] D · [ ] P — **Thin lenses — lens maker's formula and power of lens**
- [x] I · [ ] N · [ ] D · [ ] P — **Combination of lenses and mirrors**
- [x] I · [ ] N · [ ] D · [ ] P — **Optical instruments — microscope and telescope**

### `wave-optics` — Wave Optics (4 topics · 8h)

- [x] I · [ ] N · [ ] D · [ ] P — **Wavefront and Huygens' principle**
- [x] I · [ ] N · [ ] D · [ ] P — **Interference of light — Young's double slit experiment**
- [x] I · [ ] N · [ ] D · [ ] P — **Diffraction of light — single slit diffraction**
- [x] I · [ ] N · [ ] D · [ ] P — **Polarization — Brewster's law and polaroids**

### `modern-physics` — Modern Physics (6 topics · 12h)

- [x] I · [ ] N · [ ] D · [ ] P — **Photoelectric effect and Einstein's photoelectric equation**
- [x] I · [ ] N · [ ] D · [ ] P — **De Broglie wavelength and matter waves**
- [x] I · [ ] N · [ ] D · [ ] P — **Atom — Bohr's model and hydrogen spectrum**
- [x] I · [ ] N · [ ] D · [ ] P — **Nucleus — binding energy, nuclear fission and fusion**
- [x] I · [ ] N · [ ] D · [ ] P — **Semiconductors — intrinsic and extrinsic, p-n junction, diode, transistor**
- [x] I · [ ] N · [ ] D · [ ] P — **Logic gates — AND, OR, NOT, NAND, NOR**

### `communication-systems` — Communication Systems (3 topics · 4h)

- [x] I · [ ] N · [ ] D · [ ] P — **Elements of a communication system**
- [x] I · [ ] N · [ ] D · [ ] P — **Modulation — amplitude modulation and frequency modulation**
- [x] I · [ ] N · [ ] D · [ ] P — **Bandwidth and propagation of electromagnetic waves**

<!-- PHYSICS-PLAN:TOPICS:END -->

## 10. Risks & hard rules
No removal ever · CEE content frozen · syllabus order sacred · diagram licensing recorded ·
skeletons carry real shells (no placeholders) · SI 2019 + CODATA authority for units/
constants · sign conventions stated in every derivation · 3-variant duplication handled
consistently until the generator is fixed.
