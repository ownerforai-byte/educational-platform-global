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
| 28 | Gravitation (7h) | Newton's law of gravitation | `01-newton-s-law-of-gravitation.json` | **Completed** |
| 29 | Gravitation (7h) | Gravitational field strength | `02-gravitational-field-strength.json` | **Completed** |
| 30 | Gravitation (7h) | Gravitational potential; gravitational potential energy | `03-gravitational-potential-gravitational-potential-energy.json` | **Completed** |
| 31 | Gravitation (7h) | Variation in value of 'g' due to altitude and depth | `04-variation-in-value-of-g-due-to-altitude-and-depth.json` | **Completed** |
| 32 | Gravitation (7h) | Centre of mass and centre of gravity | `05-centre-of-mass-and-centre-of-gravity.json` | **Completed** |
| 33 | Gravitation (7h) | Motion of a satellite: orbital velocity and time period of the satellite | `06-motion-of-a-satellite-orbital-velocity-and-time-period-of-the-satellite.json` | **Completed** |
| 34 | Gravitation (7h) | Escape velocity | `07-escape-velocity.json` | **Completed** |
| 35 | Gravitation (7h) | Potential and kinetic energy of the satellite | `08-potential-and-kinetic-energy-of-the-satellite.json` | **Completed** |
| 36 | Gravitation (7h) | Geostationary satellite | `09-geostationary-satellite.json` | **Completed** |
| 37 | Gravitation (7h) | GPS | `10-gps.json` | **Completed** |
| 38 | Elasticity (4h) | Hooke's law: force constant | `01-hooke-s-law-force-constant.json` | **Completed** |
| 39 | Elasticity (4h) | Stress; strain; elasticity and plasticity | `02-stress-strain-elasticity.json` | **Completed** |
| 40 | Elasticity (4h) | Elastic modulus: Young modulus, bulk modulus, shear modulus | `03-elastic-modulus-young-modulus-bulk-modulus-shear-modulus.json` | **Completed** |
| 41 | Elasticity (4h) | Poisson's ratio | `04-poisson-s-ratio.json` | **Completed** |
| 42 | Elasticity (4h) | Elastic potential energy | `05-elastic-potential-energy.json` | **Completed** |
| 43 | Heat and Temperature (4h) | Molecular concept of thermal energy, heat and temperature; cause and direction of heat flow | `01-molecular-concept-of-thermal-energy-heat-and-temperature-cause-and-direction-of-heat-flow.json` | **Completed** |
| 44 | Heat and Temperature (4h) | Meaning of thermal equilibrium and Zeroth law of thermodynamics | `01-first-law.json` | **Completed** |
| 45 | Heat and Temperature (4h) | Thermal equilibrium as a working principle of a mercury thermometer | `03-thermal-equilibrium-as-a-working-principle-of-a-mercury-thermometer.json` | **Completed** |
| 46 | Thermal Expansion (4h) | Linear expansion and its measurement | `01-linear-expansion.json` | **Completed** |
| 47 | Thermal Expansion (4h) | Cubical expansion, superficial expansion and their relation with linear expansion | `01-linear-expansion.json` | **Completed** |
| 48 | Thermal Expansion (4h) | Liquid expansion: absolute and apparent | `03-liquid-expansion-absolute-and-apparent.json` | **Completed** |
| 49 | Thermal Expansion (4h) | Dulong and Petit method of determining expansivity of liquid | `03-liquid-expansion-absolute-and-apparent.json` | **Completed** |
| 50 | Quantity of Heat (5h) | Newton's law of cooling | `01-newton-s-law-of-cooling.json` | **Completed** |
| 51 | Quantity of Heat (5h) | Measurement of specific heat capacity of solids and liquids | `02-measurement-of-specific-heat-capacity-of-solids-and-liquids.json` | **Completed** |
| 52 | Quantity of Heat (5h) | Change of phases: latent heat | `03-change-of-phases-latent-heat.json` | **Completed** |
| 53 | Quantity of Heat (5h) | Specific latent heat of fusion and vaporization | `05-measurement-of-specific-latent-heat-of-fusion-and-vaporization.json` | **Completed** |
| 54 | Quantity of Heat (5h) | Measurement of specific latent heat of fusion and vaporization | `02-measurement-of-specific-heat-capacity-of-solids-and-liquids.json` | **Completed** |
| 55 | Quantity of Heat (5h) | Triple point | `04-triple-point.json` | **Completed** |
| 56 | Rate of Heat Flow (5h) | Conduction: thermal conductivity and measurement | `01-conduction-thermal-conductivity.json` | **Completed** |
| 57 | Rate of Heat Flow (5h) | Convection | `02-convection.json` | **Completed** |
| 58 | Rate of Heat Flow (5h) | Radiation: ideal radiator | `03-radiation-ideal-radiator.json` | **Completed** |
| 59 | Rate of Heat Flow (5h) | Black-body radiation | `04-black-body-radiation.json` | **Completed** |
| 60 | Rate of Heat Flow (5h) | Stefan-Boltzmann law | `04-stefan-boltzmann-law.json` | **Completed** |
| 61 | Ideal Gas (5h) | Ideal gas equation | `01-ideal-gas-equation.json` | **Completed** |
| 62 | Ideal Gas (5h) | Molecular properties of matter | `02-molecular-properties-of-matter.json` | **Completed** |
| 63 | Ideal Gas (5h) | Kinetic-molecular model of an ideal gas | `02-kinetic-molecular-model.json` | **Completed** |
| 64 | Ideal Gas (5h) | Derivation of pressure exerted by gas | `04-derivation-of-pressure-exerted-by-gas.json` | **Completed** |
| 65 | Ideal Gas (5h) | Average translational kinetic energy of gas molecule | `05-average-translational-kinetic-energy-of-gas-molecule.json` | **Completed** |
| 66 | Ideal Gas (5h) | Boltzmann constant, root mean square speed | `06-boltzmann-constant-root-mean-square-speed.json` | **Completed** |
| 67 | Ideal Gas (5h) | Heat capacities of gases and solids | `07-heat-capacities-of-gases-and-solids.json` | **Completed** |
| 68 | Reflection at Curved Mirror (3h) | Real and virtual images | `01-real-and-virtual-images.json` | **Completed** |
| 69 | Reflection at Curved Mirror (3h) | Mirror formula | `02-mirror-formula.json` | **Completed** |
| 70 | Refraction at Plane Surfaces (4h) | Laws of refraction: refractive index | `01-laws-of-refraction-refractive-index.json` | **Completed** |
| 71 | Refraction at Plane Surfaces (4h) | Relation between refractive indices | `02-relation-between-refractive-indices.json` | **Completed** |
| 72 | Refraction at Plane Surfaces (4h) | Lateral shift | `02-lateral-shift.json` | **Completed** |
| 73 | Refraction at Plane Surfaces (4h) | Total internal reflection | `03-total-internal-reflection.json` | **Completed** |
| 74 | Refraction through Prisms (4h) | Minimum deviation condition | `01-minimum-deviation.json` | **Completed** |
| 75 | Refraction through Prisms (4h) | Relation between the angle of prism, minimum deviation and refractive index | `01-minimum-deviation.json` | **Completed** |
| 76 | Refraction through Prisms (4h) | Deviation in small-angle prism | `03-deviation-in-small-angle-prism.json` | **Completed** |
| 77 | Lenses (4h) | Spherical lenses, angular magnification | `01-spherical-lenses-angular-magnification.json` | **Completed** |
| 78 | Lenses (4h) | Lens maker's formula | `02-lens-maker-s-formula.json` | **Completed** |
| 79 | Lenses (4h) | Power of a lens | `03-power-of-a-lens.json` | **Completed** |
| 80 | Dispersion (3h) | Pure spectrum and dispersive power | `01-pure-spectrum-and-dispersive-power.json` | **Completed** |
| 81 | Dispersion (3h) | Chromatic and spherical aberration | `02-chromatic-and-spherical-aberration.json` | **Completed** |
| 82 | Dispersion (3h) | Achromatism and its applications | `03-achromatism-and-its-applications.json` | **Completed** |
| 83 | Electric Charges (4h) | Electric charges | `01-electric-charges.json` | **Completed** |
| 84 | Electric Charges (4h) | Charging by induction | `02-charging-by-induction.json` | **Completed** |
| 85 | Electric Charges (4h) | Coulomb's law: force between two point charges | `03-coulomb-s-law-force-between-two-point-charges.json` | **Completed** |
| 86 | Electric Charges (4h) | Force between multiple electric charges | `04-force-between-multiple-electric-charges.json` | **Completed** |
| 87 | Electric Field (5h) | Electric field due to point charges; field lines | `01-electric-field-due-to-point-charges-field-lines.json` | **Completed** |
| 88 | Electric Field (5h) | Gauss law: electric flux | `02-gauss-law-electric-flux.json` | **Completed** |
| 89 | Electric Field (5h) | Application of Gauss law: field of a charge sphere, line charge, charged plane conductor | `03-application-of-gauss-law-field-of-a-charge-sphere-line-charge-charged-plane-conductor.json` | **Completed** |
| 90 | Potential, Potential Difference and Potential Energy (5h) | Potential difference, potential due to a point charge, potential energy, electron volt | `01-potential-difference-potential-due-to-a-point-charge-potential-energy-electron-volt.json` | **Completed** |
| 91 | Potential, Potential Difference and Potential Energy (5h) | Equipotential lines and surfaces | `02-equipotential-lines-and-surfaces.json` | **Completed** |
| 92 | Potential, Potential Difference and Potential Energy (5h) | Potential gradient | `03-potential-gradient.json` | **Completed** |
| 93 | Capacitor (4h) | Capacitance and capacitor | `01-capacitance-and-capacitor.json` | **Completed** |
| 94 | Capacitor (4h) | Parallel plate capacitor | `02-parallel-plate-capacitor.json` | **Completed** |
| 95 | Capacitor (4h) | Combination of capacitors | `03-combination-of-capacitors.json` | **Completed** |
| 96 | Capacitor (4h) | Energy of charged capacitor | `04-energy-of-charged-capacitor.json` | **Completed** |
| 97 | Capacitor (4h) | Effect of a dielectric: polarization and displacement | `05-effect-of-a-dielectric-polarization-and-displacement.json` | **Completed** |
| 98 | DC Circuits (7h) | Electric currents; drift velocity and its relation with current | `01-electric-currents-drift-velocity-and-its-relation-with-current.json` | **Completed** |
| 99 | DC Circuits (7h) | Ohm's law; electrical resistance; resistivity; conductivity | `02-ohm-s-law-electrical-resistance-resistivity-conductivity.json` | **Completed** |
| 100 | DC Circuits (7h) | Current-voltage relations; ohmic and non-ohmic resistance | `01-electric-currents-drift-velocity-and-its-relation-with-current.json` | **Completed** |
| 101 | DC Circuits (7h) | Resistances in series and parallel | `04-resistances-in-series-and-parallel.json` | **Completed** |
| 102 | DC Circuits (7h) | Potential divider | `01-potential-difference-potential-due-to-a-point-charge-potential-energy-electron-volt.json` | **Completed** |
| 103 | DC Circuits (7h) | Electromotive force of a source, internal resistance | `06-electromotive-force-of-a-source-internal-resistance.json` | **Completed** |
| 104 | DC Circuits (7h) | Work and power in electrical circuits | `07-work-and-power-in-electrical-circuits.json` | **Completed** |
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
- Session 7 — Unit 7 Gravitation (10 topics) upgraded: Newton's law of gravitation; gravitational field strength; gravitational potential & PE; variation of g (altitude/depth); centre of mass & gravity; satellite motion (orbital velocity & period); escape velocity; satellite PE/KE; geostationary satellite; GPS. Verified PYQs used: law + G 2024 2m, third law 2019 2m, planet g 2021 3m, satellite PE 2021 3m, orbital speed 2022 4m, escape derivation 2023 5m, escape planet 2022 3m. Field strength, potential/PE, centre of mass, geostationary and GPS labelled NEB-style (no verified PYQ). Next: Unit 8 Elasticity (5 topics).
- Session 8 — Unit 8 Elasticity (5 topics) upgraded: Hooke's law & force constant; stress, strain, elasticity & plasticity; elastic moduli (Young, bulk, shear); Poisson's ratio; elastic potential energy. Verified PYQs used: Hooke + k 2024 3m, stored energy 2024 3m, definitions 2023+2024 3m, steel wire 2022+2024 3m, copper wire 2020 4m, cable mass 2024 3m, bulk modulus + Poisson 2024 3m. Next: Unit 9 Heat and Temperature (3 topics).
- Session 9 — Unit 9 Heat and Temperature (3 topics) upgraded: molecular concept of thermal energy, heat & temperature, cause & direction of heat flow; thermal equilibrium & zeroth law; thermal equilibrium as the working principle of a mercury thermometer. Verified PYQs used: heat vs temperature 2021+2022+2024 2m, zeroth law statement+numbering 2023+2024 2m, A-C-B reasoning 2024 2m, faulty thermometer 2023 3m. Next: Unit 10 Thermal Expansion (4 topics).
- Session 10 — Unit 10 Thermal Expansion (4 topics) upgraded: linear expansion & measurement; superficial & cubical expansion with β=2α, γ=3α; liquid expansion (absolute & apparent) incl. anomalous expansion of water; Dulong & Petit method. Verified PYQs used: α definition 2019+2022 2m, rod numericals 2021 3m + 2024 2m, pendulum clock 2024 2m, anomalous expansion 2024 3m. Next: Unit 11 Quantity of Heat (6 topics).
- Session 11 — Unit 11 Quantity of Heat (6 topics) upgraded: Newton's law of cooling; specific heat capacity & its measurement (method of mixtures); change of phases & latent heat; specific latent heat of fusion & vaporization with measurement (one canonical file serves both syllabus topics); triple point. Verified PYQs used: Q=mcΔT 2020 3m, definitions 2023 3m, Al block 2024 3m, latent heat fusion 2017 2m, fusion vs vaporization 2023 3m, steam numerical 2021 5m. Newton's cooling and triple point labelled NEB-style. Next: Unit 12 Rate of Heat Flow (5 topics).
- Session 12 — Unit 12 Rate of Heat Flow (5 topics) upgraded: conduction, thermal conductivity & measurement (Fourier law); convection; radiation & ideal radiator; black-body radiation (Wien, Planck context); Stefan–Boltzmann law. Verified PYQs used (all 2024): three modes 3m, Fourier law 3m, rod numerical 3m, utensils/clothes 2m, Stefan law + 16× factor 3m. Next: Unit 13 Ideal Gas (7 topics).
- Session 13 — Unit 13 Ideal Gas (7 topics) upgraded: ideal gas equation (Boyle+Charles+pressure law combination); molecular properties of matter; kinetic molecular model (statement + assumptions); derivation of gas pressure (six-step, P = ⅓ρc̄²); average translational KE ((3/2)kT); Boltzmann constant & rms speeds; heat capacities & equipartition (Cp−Cv = R). Verified PYQs used: gas-law combination 2024 3m, P=nRT/V 2024 2m, Charles numerical 2022 4m, kinetic theory 2023+2024 5m, KE per molecule 2024 2m, rms speed of O₂ 2022+2024 3m, equipartition 2021+2024 2m. Next: Unit 14 Reflection at Curved Mirror (2 topics).
- Session 14 — Unit 14 Reflection at Curved Mirror (2 topics) upgraded: real and virtual images (concave vs convex, object-position ladder, uses); mirror formula (sign convention, f = R/2 derivation, mirror formula derivation, magnification, numericals). Verified PYQs used: image at infinity 2023 3m, concave vs convex 2020 3m, sign convention 2021 3m, magnification+focal length 2022 3m, 30cm/10cm numerical 2022 4m, uses 2024 2m, headlight 2024 2m, mirror formula 2024 5m, f=R/2 2024 4m, 10cm/15cm numerical 2024 3m, magnification definition 2024 2m. Next: Unit 15 Refraction at Plane Surfaces (4 topics).
- Session 15 — Unit 15 Refraction at Plane Surfaces (4 topics) upgraded: laws of refraction & refractive index; relation between refractive indices (apparent depth); lateral shift; total internal reflection (critical angle, prisms, fibres). Verified PYQs used: Snell + speed 2023 3m & 2024 3m, water-glass 60° 2024 3m, fish apparent depth 2024 3m, lateral-shift factors 2024 2m, TIR + conditions 2022 2m & 2024 2m, critical angle 1.5 2024 2m, C=42° → n 2021 2m, reflecting prisms 2024 3m. Next: Unit 16 Refraction through Prisms (3 topics).
- Session 16 — Unit 16 Refraction through Prisms (3 topics) upgraded: minimum deviation condition (symmetric ray, i–δ curve, parallel-to-base derivation); prism formula (δ = i + e − A, n = sin((A+δm)/2)/sin(A/2), numericals); small-angle prism (δ = (n−1)A). Verified PYQs used: symmetrical-ray MCQ 2023 1m, min deviation + parallel base 2020 4m, i–δ curve 2024 2m, δm + factors 2024 2m, δ = i + e − A 2024 4m, prism formula 2024 5m, δm numerical 2024 3m, e and δ numerical 2022 4m, δ = (n−1)A 2024 2m. Next: Unit 17 Lenses (3 topics).
- Session 17 — Unit 17 Lenses (3 topics) upgraded: spherical lenses & angular magnification (lens formula, magnification, simple microscope); lens maker’s formula (derivation, numericals); power of a lens (dioptres, combinations, myopia/hypermetropia). Verified PYQs used: lens numerical 2023 4m & 2024 3m, simple microscope 2024 2m, lens maker derivation 2022 5m & 2024 5m, radii numerical 2024 3m, power combination 2024 2m, myopia/hypermetropia 2024 3m. Next: Unit 18 Dispersion (3 topics).
- Session 18 — Unit 18 Dispersion (3 topics) upgraded: pure spectrum & dispersive power (angular dispersion, ω formula, rainbow); chromatic & spherical aberration; achromatism & applications (achromatic combination condition). Verified PYQs used: dispersion + reason 2022 3m & 2024 3m, deviation vs dispersion 2020 3m, ω derivation 2021 4m, definitions 2024 3m, ω numerical 2024 3m, rainbow 2024 3m, red/violet 2024 2m, achromatic combination 2024 3m. Next: Unit 19 Electric Charges (4 topics).
- Session 19 — Unit 19 Electric Charges (4 topics) upgraded: electric charges (quantisation, conservation, additivity); charging by induction (four-step process); Coulomb’s law (statement + numericals); force between multiple charges (superposition). Verified PYQs used: quantisation 2021 3m, Coulomb law + 5.4 N 2024 3m, 0.15 N attractive MCQ 2022 1m. Induction and superposition topics: NEB-style practice. Next: Unit 20 Electric Field (3 topics).
- Session 20 — Unit 20 Electric Field (3 topics) upgraded: field due to point charges & field lines (dipole too); Gauss’s law & electric flux (plane sheet); applications of Gauss’s law (spherical shell, line charge, conducting plane). Verified PYQs used: E from 4 μC 2023 3m, E from 6 μC 2024 2m, midpoint cancellation 2020 3m, field-line properties 2024 2m, dipole 2024 3m, Gauss + plane sheet 2023 5m & 2024 5m, shell 2024 5m, zero field in conductor 2024 2m. Next: Unit 21 Potential (3 topics).
- Session 21 — Unit 21 Potential (3 topics) upgraded: potential difference, point-charge potential, potential energy & electron volt; equipotential surfaces; potential gradient (E = −dV/dr, shell interior). Verified PYQs used: definitions 2021 2m, volt MCQ 2023 1m, W–V–n 2022 4m, eV numerical 2020 3m, V numerical 2024 2m, eV definition 2024 2m, PE numerical 2024 3m, equipotential properties 2024 3m, potential+unit+E–V 2024 3m, hollow sphere 2024 3m. Next: Unit 22 Capacitor (5 topics).
- Session 22 — Unit 22 Capacitor (5 topics) upgraded: capacitance & capacitor; parallel plate capacitor (derivation C = ε₀A/d); combination of capacitors; energy of charged capacitor; effect of a dielectric (polarization). Verified PYQs used: uses 2024 2m, capacitance derivation 2023 5m & 2024 5m, 177 pF numerical 2024 3m, series/parallel 2024 3m, 0.03 J 2022 3m, 0.06 J 2024 2m, dielectric explanation 2024 3m. Next: Unit 23 DC Circuits (7 topics).
- Session 23 — Unit 23 DC Circuits (7 topics) upgraded: current & drift velocity (I = neAv_d); Ohm’s law & resistivity; ohmic/non-ohmic I–V relations; resistances in series & parallel (+ Wheatstone bridge); potential divider (+ potentiometer); emf & internal resistance (+ Kirchhoff’s laws); work & power in circuits. Verified PYQs used: drift derivation 2024 3m, Kirchhoff 2022 5m & 2024 5m, 2-3-6 Ω parallel 2021 4m, 6/3 Ω parallel 2024 3m, Wheatstone 2024 3m, potentiometer 2024 3m, terminal voltage 2024 3m. Ohm’s law, ohmic/non-ohmic, work & power: NEB-style practice. Next: Unit 24 Nuclear Physics (7 topics).
