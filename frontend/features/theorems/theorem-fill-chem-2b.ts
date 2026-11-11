/**
 * Theorem Fill — Chemistry B (Werner coordination compounds entry).
 */

import type { DerivationOrTheorem } from "@/lib/derivations-data";

export const THEOREM_FILL_CHEM_1B: DerivationOrTheorem[] = [
  {
    id: "tf-chem-12-werner-coordination",
    slug: "coordination-compounds-werner-s-theory-iupac-nomenclature-vbt-cft-qualitative-isomerism",
    title: "Coordination Compounds: Werner's Theory, Nomenclature, VBT, CFT & Isomerism",
    subject: "chemistry",
    unit: "Chemistry of Element",
    unitId: "chemistry-of-element",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Inorganic)",
    isExtra: true,
    statement:
      "Werner distinguished primary (ionizable) and secondary (coordinate) valence: central metals bind ligands in fixed geometries. Nomenclature names ligands alphabetically before the metal with its oxidation state. VBT uses hybridized orbitals (d²sp³ inner-orbital, sp³d² outer-orbital); CFT splits d-orbitals in the ligand field (Δoct gap between t₂g and e_g) explaining colour, high/low spin and magnetism. Isomerism spans ionization, hydrate, linkage, coordination, geometrical and optical types.",
    coreFormula: "[Co(NH_3)_6]Cl_3: \\ \\text{6 ligands, octahedral}; \\quad \\Delta_o = E(e_g) - E(t_{2g})",
    concernedTerms: [
      { term: "Ligand", symbol: "L", units: "—", definition: "Lewis base donating a pair to the metal (NH₃, CN⁻, Cl⁻)." },
      { term: "Coordination number", symbol: "CN", units: "—", definition: "Number of donor atoms attached (4 tetrahedral/square planar, 6 octahedral)." },
      { term: "Crystal field splitting", symbol: "Δo", units: "cm⁻¹", definition: "d-orbital energy gap in an octahedral field; strong-field ligands (CN⁻) give large Δ → low spin." },
    ],
    assumptions: ["Qualitative CFT (no Jahn-Teller detail needed).", "Standard IUPAC names for common complexes."],
    proofSteps: [
      { stepNumber: 1, title: "Werner's evidence", latex: "[Co(NH_3)_6]Cl_3: \\ 3\\ \\text{AgCl precipitated}", explanation: "All three chlorides ionize (primary valence); six NH₃ never leave (secondary) — the two-valence distinction." },
      { stepNumber: 2, title: "CFT splitting", latex: "t_{2g} \\text{ lowered}, \\; e_g \\text{ raised (barycentre fixed)}", explanation: "Ligands approach along axes: e_g (dz², dx²−y²) repelled up; t₂g (dxy, dyz, dxz) between axes, lower." },
      { stepNumber: 3, title: "High vs low spin", latex: "\\Delta_o < P: \\text{high spin}; \\; \\Delta_o > P: \\text{low spin}", explanation: "Pairing energy P versus splitting decides d⁴–d⁷ configurations — colour and magnetism follow." },
    ],
    conclusion:
      "Coordination chemistry is valence beyond the octet: Werner's secondary valence, VBT's hybrids and CFT's split d-levels each explain a layer — structure, bonding geometry, and colour/magnetism.",
    keyTakeaways: [
      "Spectrochemical series: I⁻ < F⁻ < H₂O < NH₃ < en < CN⁻ ≈ CO.",
      "d⁶ strong-field (Co³⁺ low spin): diamagnetic, often intensely coloured.",
      "Optical isomers are non-superimposable mirror images (Δ/Λ for octahedral).",
    ],
    examTraps: [
      "❌ Counting chloride inside the bracket as ionizable — only outside-the-bracket ions precipitate with AgNO₃.",
      "❌ Ignoring that CN⁻ vs H₂O flips d⁶ magnetism (low vs high spin).",
    ],
    visualType: "tv-werner-cft",
    specialCases: [
      { name: "Linkage isomerism", condition: "NO₂⁻ ambidentate", formula: "M-ONO \\text{ vs } M-NO_2", meaning: "Nitrito vs nitro — red/yellow pair." },
      { name: "Ionization isomerism", condition: "[CoBr(NH₃)₅]SO₄", formula: "\\text{vs } [CoSO_4(NH_3)_5]Br", meaning: "Different ions outside give different precipitates." },
      { name: "Geometric (cis/trans)", condition: "MA₄B₂ octahedral", formula: "cis-\\text{mauve} \\ne trans-\\text{green}", meaning: "Classical [Co(NH₃)₄Cl₂]⁺ pair." },
    ],
    solvedProblems: [],
  },
];
