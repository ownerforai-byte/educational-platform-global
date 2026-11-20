# Physics XI Mastery Plan — NEB Physics 101 (Phy. 101)

Goal: upgrade every Class-11 Physics topic note to mastery depth, one unit at a time, following the same template proven on Biology XI (see `biology-xi-mastery-plan.md`).

## Scope

- Subject: **Physics XI** — `frontend/lib/core/syllabus.ts`, "Official NEB Physics XI (Phy. 101)".
- **26 units, 117 topics.**
- Canonical note files: `content/notes/concepts/class-11/physics/<unit>/<NN>-<slug>.json`; rendered mirror `frontend/public/data/syllabus-notes/physics/...` synced by `npx tsx frontend/scripts/content/build.ts physics`.
- Manifest: `frontend/public/data/syllabus-notes/physics/_manifest.json` — flat array; many duplicate short-slug files exist (214 `duplicateType: 1` entries vs 117 topics). **Canonical file rule (same as biology):** resolve per unit via topicSlug match + lowest `duplicateType` wins; full-syllabus-slug filenames win over short-slug duplicates. Resolve each unit's canonical files with the matcher script before editing.
- PYQ bank: `content/practice/questions/class-11/physics/**` — includes year files `neb-2014…neb-2024` (unit-tagged) plus per-topic question files. Only verified questions from this bank may be labelled NEB PYQs; everything else is labelled "NEB-style practice".
- Physics is numerical: every topic's mastery content must include **worked numericals** (Given → Formula → Substitution → Answer with units) in `practiceQuestions[]` and formula tables in `formulas[]`.

## Mastery template (per topic note JSON)

1. `notes[]` — Topic Introduction; Fundamental Concepts; main content with tables; Conceptual Relationships; Exam Orientation (PYQ table + model answer, or labelled NEB-style practice); Common examination mistakes.
2. `confusion[]`, `keyPoints[]`, `importantConcepts[]`, `examples[]`, `universalFacts[]`, `importantStatements[]`, `importantNotes[]`, `examShortTricks[]`, `examNotes[]`, `practice[]`, `practiceQuestions[]` (with worked model answers), `formulas[]`, `summary`, `mcqs[]` (5–10 MCQs with explanations).
3. No invented facts; no fabricated PYQs.

## Per-unit pipeline

1. Resolve canonical files for the unit (manifest matcher).
2. Write `.mastery-src/p<N>.md` part files (`@@field@@` / `%%%` markers), assemble with `assemble.py` (handles Windows long paths via `\\?\`).
3. `npx tsx frontend/scripts/content/build.ts physics` → `node scripts/validate-content.mjs` (expect 0 broken).
4. Update this doc's progress rows + session log.
5. `git add -A && git commit -m "feat(physics): mastery-depth notes for class-11 physics Unit N <name> (all X topics)" && git push origin main`.

## Roadmap and progress

| # | Unit | Topic | Canonical file | Status |
|---|---|---|---|---|
| 1 | Physical Quantities (3h) | Precision and significant figures | `01-precision-and-significant-figures.json` | **Completed** |
| 2 | Physical Quantities (3h) | Dimensions and uses of dimensional analysis | `02-dimensions-and-uses-of-dimensional-analysis.json` | **Completed** |
| 3 | Vectors (4h) | Triangle, parallelogram and polygon laws of vectors |  | **Completed** |
| 4 | Vectors (4h) | Resolution of vectors; unit vectors |  | **Completed** |
| 5 | Vectors (4h) | Scalar and vector products |  | **Completed** |
| 6 | Kinematics (5h) | Instantaneous velocity and acceleration | `01-instantaneous-velocity-and-acceleration.json` | **Completed** |
| 7 | Kinematics (5h) | Relative velocity | `02-relative-velocity.json` | **Completed** |
| 8 | Kinematics (5h) | Equation of motion (graphical treatment) | `03-equation-of-motion-graphical-treatment.json` | **Completed** |
| 9 | Kinematics (5h) | Motion of a freely falling body | `04-motion-of-a-freely-falling-body.json` | **Completed** |
| 10 | Kinematics (5h) | Projectile motion and its applications | `05-projectile-motion-and-its-applications.json` | **Completed** |
| 11 | Dynamics (6h) | Linear momentum, impulse | `01-linear-momentum-and-impulse.json` | **Completed** |
| 12 | Dynamics (6h) | Conservation of linear momentum | `02-conservation-of-linear-momentum.json` | **Completed** |
| 13 | Dynamics (6h) | Application of Newton's laws | `03-application-of-newton-s-laws.json` | **Completed** |
| 14 | Dynamics (6h) | Moment, torque and equilibrium | `04-moment-torque-and-equilibrium.json` | **Completed** |
| 15 | Dynamics (6h) | Solid friction: laws of solid friction and their verifications | `05-solid-friction-laws-of-solid-friction-and-their-verifications.json` | **Completed** |
| 16 | Work, Energy and Power (6h) | Work done by a constant force and a variable force | `01-work-done-by-a-constant-force-and-a-variable-force.json` | **Completed** |
| 17 | Work, Energy and Power (6h) | Power | `02-power.json` | **Completed** |
| 18 | Work, Energy and Power (6h) | Work-energy theorem; kinetic and potential energy | `03-work-energy-theorem-kinetic-and-potential-energy.json` | **Completed** |
| 19 | Work, Energy and Power (6h) | Conservation of energy | `04-conservation-of-energy.json` | **Completed** |
| 20 | Work, Energy and Power (6h) | Conservative and non-conservative forces | `05-conservative-and-non-conservative-forces.json` | **Completed** |
| 21 | Work, Energy and Power (6h) | Elastic and inelastic collisions | `06-elastic-and-inelastic-collisions.json` | **Completed** |
| 22 | Circular Motion (6h) | Angular displacement, velocity and acceleration | `01-angular-displacement-velocity.json` | **Completed** |
| 23 | Circular Motion (6h) | Relation between angular and linear velocity and acceleration | `02-relation-between-angular-and-linear-velocity-and-acceleration.json` | **Completed** |
| 24 | Circular Motion (6h) | Centripetal acceleration and centripetal force | `03-centripetal-acceleration-and-centripetal-force.json` | **Completed** |
| 25 | Circular Motion (6h) | Conical pendulum | `03-conical-pendulum.json` | **Completed** |
| 26 | Circular Motion (6h) | Motion in a vertical circle | `05-motion-in-a-vertical-circle.json` | **Completed** |
| 27 | Circular Motion (6h) | Applications of banking | `06-applications-of-banking.json` | **Completed** |
| 28 | Gravitation (7h) | Newton's law of gravitation | TBD | Not started |
| 29 | Gravitation (7h) | Gravitational field strength | TBD | Not started |
| 30 | Gravitation (7h) | Gravitational potential; gravitational potential energy | TBD | Not started |
| 31 | Gravitation (7h) | Variation in value of 'g' due to altitude and depth | TBD | Not started |
| 32 | Gravitation (7h) | Centre of mass and centre of gravity | TBD | Not started |
| 33 | Gravitation (7h) | Motion of a satellite: orbital velocity and time period of the satellite | TBD | Not started |
| 34 | Gravitation (7h) | Escape velocity | TBD | Not started |
| 35 | Gravitation (7h) | Potential and kinetic energy of the satellite | TBD | Not started |
| 36 | Gravitation (7h) | Geostationary satellite | TBD | Not started |
| 37 | Gravitation (7h) | GPS | TBD | Not started |
| 38 | Elasticity (4h) | Hooke's law: force constant | TBD | Not started |
| 39 | Elasticity (4h) | Stress; strain; elasticity and plasticity | TBD | Not started |
| 40 | Elasticity (4h) | Elastic modulus: Young modulus, bulk modulus, shear modulus | TBD | Not started |
| 41 | Elasticity (4h) | Poisson's ratio | TBD | Not started |
| 42 | Elasticity (4h) | Elastic potential energy | TBD | Not started |
| 43 | Heat and Temperature (4h) | Molecular concept of thermal energy, heat and temperature; cause and direction of heat flow | TBD | Not started |
| 44 | Heat and Temperature (4h) | Meaning of thermal equilibrium and Zeroth law of thermodynamics | TBD | Not started |
| 45 | Heat and Temperature (4h) | Thermal equilibrium as a working principle of a mercury thermometer | TBD | Not started |
| 46 | Thermal Expansion (4h) | Linear expansion and its measurement | TBD | Not started |
| 47 | Thermal Expansion (4h) | Cubical expansion, superficial expansion and their relation with linear expansion | TBD | Not started |
| 48 | Thermal Expansion (4h) | Liquid expansion: absolute and apparent | TBD | Not started |
| 49 | Thermal Expansion (4h) | Dulong and Petit method of determining expansivity of liquid | TBD | Not started |
| 50 | Quantity of Heat (5h) | Newton's law of cooling | TBD | Not started |
| 51 | Quantity of Heat (5h) | Measurement of specific heat capacity of solids and liquids | TBD | Not started |
| 52 | Quantity of Heat (5h) | Change of phases: latent heat | TBD | Not started |
| 53 | Quantity of Heat (5h) | Specific latent heat of fusion and vaporization | TBD | Not started |
| 54 | Quantity of Heat (5h) | Measurement of specific latent heat of fusion and vaporization | TBD | Not started |
| 55 | Quantity of Heat (5h) | Triple point | TBD | Not started |
| 56 | Rate of Heat Flow (5h) | Conduction: thermal conductivity and measurement | TBD | Not started |
| 57 | Rate of Heat Flow (5h) | Convection | TBD | Not started |
| 58 | Rate of Heat Flow (5h) | Radiation: ideal radiator | TBD | Not started |
| 59 | Rate of Heat Flow (5h) | Black-body radiation | TBD | Not started |
| 60 | Rate of Heat Flow (5h) | Stefan-Boltzmann law | TBD | Not started |
| 61 | Ideal Gas (5h) | Ideal gas equation | TBD | Not started |
| 62 | Ideal Gas (5h) | Molecular properties of matter | TBD | Not started |
| 63 | Ideal Gas (5h) | Kinetic-molecular model of an ideal gas | TBD | Not started |
| 64 | Ideal Gas (5h) | Derivation of pressure exerted by gas | TBD | Not started |
| 65 | Ideal Gas (5h) | Average translational kinetic energy of gas molecule | TBD | Not started |
| 66 | Ideal Gas (5h) | Boltzmann constant, root mean square speed | TBD | Not started |
| 67 | Ideal Gas (5h) | Heat capacities of gases and solids | TBD | Not started |
| 68 | Reflection at Curved Mirror (3h) | Real and virtual images | TBD | Not started |
| 69 | Reflection at Curved Mirror (3h) | Mirror formula | TBD | Not started |
| 70 | Refraction at Plane Surfaces (4h) | Laws of refraction: refractive index | TBD | Not started |
| 71 | Refraction at Plane Surfaces (4h) | Relation between refractive indices | TBD | Not started |
| 72 | Refraction at Plane Surfaces (4h) | Lateral shift | TBD | Not started |
| 73 | Refraction at Plane Surfaces (4h) | Total internal reflection | TBD | Not started |
| 74 | Refraction through Prisms (4h) | Minimum deviation condition | TBD | Not started |
| 75 | Refraction through Prisms (4h) | Relation between the angle of prism, minimum deviation and refractive index | TBD | Not started |
| 76 | Refraction through Prisms (4h) | Deviation in small-angle prism | TBD | Not started |
| 77 | Lenses (4h) | Spherical lenses, angular magnification | TBD | Not started |
| 78 | Lenses (4h) | Lens maker's formula | TBD | Not started |
| 79 | Lenses (4h) | Power of a lens | TBD | Not started |
| 80 | Dispersion (3h) | Pure spectrum and dispersive power | TBD | Not started |
| 81 | Dispersion (3h) | Chromatic and spherical aberration | TBD | Not started |
| 82 | Dispersion (3h) | Achromatism and its applications | TBD | Not started |
| 83 | Electric Charges (4h) | Electric charges | TBD | Not started |
| 84 | Electric Charges (4h) | Charging by induction | TBD | Not started |
| 85 | Electric Charges (4h) | Coulomb's law: force between two point charges | TBD | Not started |
| 86 | Electric Charges (4h) | Force between multiple electric charges | TBD | Not started |
| 87 | Electric Field (5h) | Electric field due to point charges; field lines | TBD | Not started |
| 88 | Electric Field (5h) | Gauss law: electric flux | TBD | Not started |
| 89 | Electric Field (5h) | Application of Gauss law: field of a charge sphere, line charge, charged plane conductor | TBD | Not started |
| 90 | Potential, Potential Difference and Potential Energy (5h) | Potential difference, potential due to a point charge, potential energy, electron volt | TBD | Not started |
| 91 | Potential, Potential Difference and Potential Energy (5h) | Equipotential lines and surfaces | TBD | Not started |
| 92 | Potential, Potential Difference and Potential Energy (5h) | Potential gradient | TBD | Not started |
| 93 | Capacitor (4h) | Capacitance and capacitor | TBD | Not started |
| 94 | Capacitor (4h) | Parallel plate capacitor | TBD | Not started |
| 95 | Capacitor (4h) | Combination of capacitors | TBD | Not started |
| 96 | Capacitor (4h) | Energy of charged capacitor | TBD | Not started |
| 97 | Capacitor (4h) | Effect of a dielectric: polarization and displacement | TBD | Not started |
| 98 | DC Circuits (7h) | Electric currents; drift velocity and its relation with current | TBD | Not started |
| 99 | DC Circuits (7h) | Ohm's law; electrical resistance; resistivity; conductivity | TBD | Not started |
| 100 | DC Circuits (7h) | Current-voltage relations; ohmic and non-ohmic resistance | TBD | Not started |
| 101 | DC Circuits (7h) | Resistances in series and parallel | TBD | Not started |
| 102 | DC Circuits (7h) | Potential divider | TBD | Not started |
| 103 | DC Circuits (7h) | Electromotive force of a source, internal resistance | TBD | Not started |
| 104 | DC Circuits (7h) | Work and power in electrical circuits | TBD | Not started |
| 105 | Nuclear Physics (6h) | Nucleus: discovery of nucleus | TBD | Not started |
| 106 | Nuclear Physics (6h) | Nuclear density; mass number; atomic number | TBD | Not started |
| 107 | Nuclear Physics (6h) | Atomic mass; isotopes | TBD | Not started |
| 108 | Nuclear Physics (6h) | Einstein's mass-energy relation | TBD | Not started |
| 109 | Nuclear Physics (6h) | Mass defect, packing fraction, binding energy per nucleon | TBD | Not started |
| 110 | Nuclear Physics (6h) | Creation and annihilation | TBD | Not started |
| 111 | Nuclear Physics (6h) | Nuclear fission and fusion | TBD | Not started |
| 112 | Solids (2h) | Energy bands in solids (qualitative ideas) | TBD | Not started |
| 113 | Solids (2h) | Difference between metals, insulators and semiconductors using band theory | TBD | Not started |
| 114 | Solids (2h) | Intrinsic and extrinsic semiconductors | TBD | Not started |
| 115 | Recent Trends in Physics (4h) | Particle physics: particles and antiparticles, quarks (baryons and mesons) and leptons (neutrinos) | TBD | Not started |
| 116 | Recent Trends in Physics (4h) | Universe: Big Bang and Hubble law — expansion of the Universe | TBD | Not started |
| 117 | Recent Trends in Physics (4h) | Dark matter, black hole and gravitational wave | TBD | Not started |

## Session log

- Session 1 — Plan created; Unit 1 (Physical Quantities, 2 topics) upgraded: precision & significant figures; dimensions & dimensional analysis. Verified PYQs from `content/practice/questions/class-11/physics/` year files (neb-2014…neb-2024) matched per topic. Next: Unit 2 Vectors (3 topics).
- Session 2 — Unit 2 Vectors (3 topics) upgraded: triangle/parallelogram/polygon laws; resolution & unit vectors; scalar & vector products. Verified PYQs used: 2021 parallelogram numerical 5m + component addition 3m, 2020 scalar vs vector 2m, 2024 rectangular components 3m, 2023 dot/cross definitions 3m. Next: Unit 3 Kinematics (5 topics).
- Session 3 — Unit 3 Kinematics (5 topics) upgraded: instantaneous velocity/acceleration; relative velocity; equations of motion (graphical); freely falling body; projectile motion. Verified PYQs used: 2024 position/velocity/acceleration definitions 2m, 2014 car numerical 3m, 2017 relative velocity 2m, 2023 car numerical 3m, 2023 dropped-stone 3m, 2024 projectile 3m, 2022 complementary-angles 3m + horizontal projection 5m + vertical projection 4m, 2019 T=2·t_up derivation 3m. Next: Unit 4 Dynamics (5 topics).
- Session 4 — Unit 4 Dynamics (5 topics) upgraded: linear momentum & impulse; conservation of linear momentum; application of Newton’s laws; moment/torque/equilibrium; solid friction. Verified PYQs used: 2024 gun recoil 3m, 2023 force numerical 3m, 2018 conservation derivation 3m, 2022 bullet-block 4m, 2021+2022+2024 three laws 3m each, 2020 mass vs weight 2m, 2014 second law 2m, 2021 terminal velocity 2m, 2023 static friction 3m, 2021 incline friction 3m, 2024 angle of repose 3m. No PYQ for torque (NEB-style labelled). Next: Unit 5 Work, Energy and Power (6 topics).
- Session 5 — Unit 5 Work, Energy and Power (6 topics) upgraded: work (constant/variable); power; work-energy theorem & KE/PE; conservation of energy; conservative vs non-conservative forces; elastic & inelastic collisions. Verified PYQs used: 2024 spring work 3m + motor 3m + car power 3m + kWh 2m + mechanical-energy conservation 3m + WET proof 5m, 2022 motor 3m + staircase 3m, 2021 definitions 3m, 2023 WET proof 5m + falling-body KE 4m, 2020 WET statement 3m + conservation verification 3m + elastic vs inelastic 3m, 2022 bullet-block 4m. No PYQ for conservative forces (NEB-style labelled). Next: Unit 6 Circular Motion (6 topics).
- Session 6 — Canonical-file audit: replicated noteMatchesTopic + selectCanonicalNoteEntry over the physics manifest; found 7 earlier topics whose mastery content sat in non-served duplicate files. Ported mastery content into the served canonical files (vectors 02-addition..., kinematics 03-equation-of-motion-graphical, 05-projectile-motion; dynamics 01-linear-momentum-impulse, 03-moment-torque-and-equilibrium, 05-solid-friction; work-energy 02-power--2) and reverted the duplicate files to pre-edit state. All 21 done topics now resolve to mastery files. Then Unit 6 Circular Motion (6 topics) upgraded: angular quantities; angular-linear relations; centripetal acceleration & force; conical pendulum; vertical circle; banking. Verified PYQs used: flywheel 2023 4m, wheel 2024 3m, car-turn 2022+2024 3m, centripetal derivation 2023+2024 5m, conical pendulum 2024 3m, vertical-circle top speed 2024 3m, banking derivation+numerical 2024 5m. Next: Unit 7 Gravitation (9 topics).
