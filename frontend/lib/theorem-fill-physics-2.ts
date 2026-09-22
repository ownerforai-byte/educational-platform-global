/**
 * Theorem Fill — Physics Part B (optics, band theory, Hubble, class-12).
 */

import type { DerivationOrTheorem } from "@/lib/derivations-data";

const P2: DerivationOrTheorem[] = [
  {
    id: "tf-phy-11-refraction-laws",
    slug: "laws-of-refraction-refractive-index",
    title: "Laws of Refraction and Refractive Index",
    subject: "physics",
    unit: "Refraction at Plane Surfaces",
    unitId: "refraction-at-plane-surfaces",
    gradeTrack: "grade-11",
    nebCode: "Phy. 101 (Refraction)",
    isExtra: false,
    statement:
      "Refraction follows two laws: (1) the incident ray, refracted ray and normal lie in one plane; (2) Snell's law — sin i / sin r = μ₂₁ = n₂/n₁, a constant for a given pair of media and colour of light. The refractive index μ = c/v measures optical slowness of a medium.",
    coreFormula: "\\frac{\\sin i}{\\sin r} = \\frac{n_2}{n_1} = \\mu_{21}, \\qquad \\mu = \\frac{c}{v} = \\frac{\\lambda_{vac}}{\\lambda_{med}}",
    concernedTerms: [
      { term: "Absolute refractive index", symbol: "μ", units: "—", definition: "Ratio of light speed in vacuum to that in the medium." },
      { term: "Relative refractive index", symbol: "μ₂₁", units: "—", definition: "n₂/n₁ — bending power of medium 2 with respect to medium 1." },
      { term: "Optical density", symbol: "—", units: "—", definition: "Slowness of light; higher μ = optically denser (NOT mass density)." },
    ],
    assumptions: ["Isotropic, transparent media.", "Monochromatic light (μ depends on wavelength — dispersion)."],
    proofSteps: [
      { stepNumber: 1, title: "Huygens' wavefront at the boundary", latex: "\\frac{\\sin i}{\\sin r} = \\frac{v_1 t / \\overline{BC}}{v_2 t / \\overline{BC}} = \\frac{v_1}{v_2}", explanation: "In time t the incident wavefront advances v₁t while the refracted advances v₂t; the geometry of the shared hypotenuse gives Snell's law directly." },
      { stepNumber: 2, title: "Identify the constant as refractive index", latex: "\\frac{v_1}{v_2} = \\frac{c/v_1 \\text{ inverse}}{c/v_2} \\;\\Rightarrow\\; \\frac{\\sin i}{\\sin r} = \\frac{n_2}{n_1}", explanation: "Since μ = c/v, the ratio of sines equals the ratio of refractive indices — medium-independent, colour-dependent." },
      { stepNumber: 3, title: "Frequency invariance", latex: "f \\text{ fixed}; \\; v = f\\lambda \\;\\Rightarrow\\; \\lambda_{med} = \\frac{\\lambda_{vac}}{\\mu}", explanation: "Crossing a boundary changes speed and wavelength but never frequency — the wave must oscillate in step on both sides." },
    ],
    conclusion:
      "Light bends towards the normal entering a denser medium because it SLOWS; Snell's constant is the ratio of speeds, and no information-carrying signal changes frequency.",
    keyTakeaways: [
      "When μ₂ > μ₁ light bends TOWARD the normal; reverse direction is reversible (principle of reversibility).",
      "μ ≥ 1 for all material media against vacuum.",
      "Snell in vector form: n₁ sin i = n₂ sin r for every wavelength — shorter λ, larger μ (violet bends most).",
    ],
    examTraps: [
      "❌ Confusing optical density with mass density (lead glass vs heavy but transparent oil).",
      "❌ Reporting μ without specifying the colour — μ_violet > μ_red.",
    ],
    visualType: "tv-snells-law",
    specialCases: [
      { name: "Normal incidence", condition: "i = 0", formula: "r = 0", meaning: "No bending — speed changes but direction does not." },
      { name: "Denser → rarer", condition: "μ₁ > μ₂", formula: "r > i", meaning: "Bends away from the normal; total internal reflection beyond the critical angle." },
      { name: "Reversibility", condition: "Ray reversed", formula: "\\mu_{21} = 1/\\mu_{12}", meaning: "The path retraces exactly — basis of optical systems' reciprocity." },
    ],
    solvedProblems: [
      {
        id: "tf-p-ref-1",
        question: "Light enters water (μ = 4/3) from air at 45°. Find the refraction angle.",
        examBadge: "NEB Board",
        given: "i = 45°, μ = 4/3",
        stepByStep: ["sin r = sin i / μ = 0.707 / 1.333 = 0.530.", "r = sin⁻¹(0.530)."],
        finalAnswer: "r \\approx 32°",
        tipOrTrap: "Into denser medium: r < i, always.",
      },
    ],
  },
  {
    id: "tf-phy-11-refractive-index-relation",
    slug: "relation-between-refractive-indices",
    title: "Relation between Refractive Indices of Media",
    subject: "physics",
    unit: "Refraction at Plane Surfaces",
    unitId: "refraction-at-plane-surfaces",
    gradeTrack: "grade-11",
    nebCode: "Phy. 101 (Refraction)",
    isExtra: false,
    statement:
      "Refractive indices chain across media: μ₂₁ × μ₃₂ = μ₃₁ (telescoping), so relative indices invert on reversal: μ₂₁ = 1/μ₁₂. For media separated by parallel-sided slabs the emergent ray is laterally shifted but parallel to the incident ray.",
    coreFormula: "\\mu_{21} = \\frac{1}{\\mu_{12}}, \\qquad \\mu_{31} = \\mu_{32}\\cdot\\mu_{21}, \\qquad t = \\frac{t_{real}}{\\mu}",
    concernedTerms: [
      { term: "Telescoping product", symbol: "μ₃₁", units: "—", definition: "Index of 3 w.r.t. 1 via intermediate medium 2 — intermediate factors cancel." },
      { term: "Lateral shift", symbol: "d", units: "m", definition: "Perpendicular displacement of the emergent ray by a parallel slab: d = t sin(i−r)/cos r." },
      { term: "Real depth", symbol: "t_real", units: "m", definition: "Actual thickness; apparent depth = t_real/μ (basis of the coin-in-water experiment)." },
    ],
    assumptions: ["Media are homogeneous and isotropic.", "Same colour of light throughout the chain."],
    proofSteps: [
      { stepNumber: 1, title: "Inversion", latex: "\\mu_{12} = \\frac{n_1}{n_2} = \\frac{1}{\\mu_{21}}", explanation: "Reversing the direction of light swaps the sine ratio — immediate from Snell's law." },
      { stepNumber: 2, title: "Telescoping", latex: "\\mu_{32}\\cdot\\mu_{21} = \\frac{n_3}{n_2}\\cdot\\frac{n_2}{n_1} = \\frac{n_3}{n_1} = \\mu_{31}", explanation: "The intermediate medium's index cancels — only the endpoints matter." },
      { stepNumber: 3, title: "Apparent depth", latex: "\\mu = \\frac{\\text{real depth}}{\\text{apparent depth}}", explanation: "Refracted rays from a submerged point appear to come from a shallower image — the standard μ-measurement method." },
    ],
    conclusion:
      "Relative refractive indices behave like ratios of absolutes: they invert on reversal and telescope across chains — three short algebraic facts that solve most slab and layered-media problems.",
    keyTakeaways: [
      "Air's μ ≈ 1, so glass-to-air ≈ 1/μ_glass.",
      "Normal viewing: object raised by t(1 − 1/μ) — the raised-coin distance.",
      "Lateral shift grows with thickness and angle, is zero at normal incidence.",
    ],
    examTraps: [
      "❌ Adding indices across a chain instead of multiplying.",
      "❌ Using μ > 1 for a rarer-to-denser reverse pair — inversion makes it < 1.",
    ],
    visualType: "tv-index-relations",
    specialCases: [
      { name: "Through parallel slab", condition: "Air–glass–air", formula: "i = e, \\; d = t\\frac{\\sin(i-r)}{\\cos r}", meaning: "Net bending zero; only lateral displacement." },
      { name: "Normal incidence", condition: "i = 0", formula: "d = 0", meaning: "Ray passes straight through." },
      { name: "Thin layer sandwich", condition: "Multiple slabs", formula: "\\prod \\mu_{i+1,i}", meaning: "Chains telescope to first/last medium only." },
    ],
    solvedProblems: [
      {
        id: "tf-p-rir-1",
        question: "A pond appears 1.5 m deep. Find the real depth (μ_water = 4/3).",
        examBadge: "NEB 2076",
        given: "apparent = 1.5 m, μ = 4/3",
        stepByStep: ["real = μ × apparent = (4/3)(1.5) = 2.0 m."],
        finalAnswer: "t_{real} = 2.0\\ \\text{m}",
        tipOrTrap: "Water always makes bottoms look shallower — never dive by appearance.",
      },
    ],
  },
  {
    id: "tf-phy-11-prism-formula",
    slug: "relation-between-the-angle-of-prism-minimum-deviation-and-refractive-index",
    title: "Prism Relation: Angle of Prism, Minimum Deviation and Refractive Index",
    subject: "physics",
    unit: "Refraction through Prisms",
    unitId: "refraction-through-prisms",
    gradeTrack: "grade-11",
    nebCode: "Phy. 101 (Prism)",
    isExtra: false,
    statement:
      "A ray through a prism of angle A suffers deviation δ = (i₁ + i₂) − A. At minimum deviation the ray crosses symmetrically (i₁ = i₂ = i, r₁ = r₂ = r), giving the prism formula μ = sin((A + δm)/2) / sin(A/2).",
    coreFormula: "A = r_1 + r_2, \\qquad \\delta = i_1 + i_2 - A, \\qquad \\mu = \\frac{\\sin\\left(\\frac{A+\\delta_m}{2}\\right)}{\\sin\\frac{A}{2}}",
    concernedTerms: [
      { term: "Prism angle", symbol: "A", units: "°", definition: "Refracting angle between the two refracting faces." },
      { term: "Minimum deviation", symbol: "δm", units: "°", definition: "Smallest δ as incidence varies — the symmetric passage." },
      { term: "Deviation", symbol: "δ", units: "°", definition: "Total turning of the ray by the two refractions." },
    ],
    assumptions: ["Monochromatic light.", "Thin/principal section geometry.", "Refracting faces polished, base frosted."],
    proofSteps: [
      { stepNumber: 1, title: "Geometry of the prism section", latex: "r_1 + r_2 = A", explanation: "The two internal refraction angles compose with the apex angle — from the quadrilateral of normals." },
      { stepNumber: 2, title: "Deviation at each face", latex: "\\delta = (i_1 - r_1) + (i_2 - r_2) = i_1 + i_2 - A", explanation: "Total bend is the sum of the bends at the two surfaces." },
      { stepNumber: 3, title: "Minimum-deviation symmetry", latex: "\\delta_m: \\; i_1 = i_2 = i, \\; r_1 = r_2 = r = \\frac{A}{2}, \\; i = \\frac{A + \\delta_m}{2}", explanation: "At the stationary point the curve δ(i) is flat and symmetric — a horizontal tangent argument gives equal angles." },
      { stepNumber: 4, title: "Prism formula", latex: "\\mu = \\frac{\\sin i}{\\sin r} = \\frac{\\sin\\left(\\frac{A+\\delta_m}{2}\\right)}{\\sin\\frac{A}{2}}", explanation: "Snell's law at the symmetric configuration — the standard μ-measurement for transparent solids." },
    ],
    conclusion:
      "The prism formula converts two easily measured angles (A, δm) into μ — and because μ varies with colour, δm does too, splitting white light into its spectrum.",
    keyTakeaways: [
      "δ is minimum exactly when the passage is symmetric.",
      "Dispersion: δ_violet > δ_red ⇒ angular dispersion δv − δr, mean deviation via δ_yellow.",
      "For a thin prism (A small): δ = (μ − 1)A — independent of incidence.",
    ],
    examTraps: [
      "❌ Using δm in degrees inside a sine while A is in radians — both must share units.",
      "❌ Forgetting that beyond minimum deviation TWO incidences give the same δ (one may exceed the critical angle on exit).",
    ],
    visualType: "tv-prism-formula",
    specialCases: [
      { name: "Thin prism", condition: "A ≲ 10°", formula: "\\delta = (\\mu - 1)A", meaning: "Small-angle sine ≈ angle; deviation independent of i." },
      { name: "Grazing incidence", condition: "i → 90°", formula: "\\delta \\text{ large}", meaning: "Ray skims the first face; exit may fail (TIR)." },
      { name: "A = 60°, μ = 1.5 (crown glass)", condition: "Typical lab prism", formula: "\\delta_m \\approx 37°", meaning: "The standard spectrometer measurement." },
    ],
    solvedProblems: [
      {
        id: "tf-p-prs-1",
        question: "A 60° prism shows δm = 40°. Find μ.",
        examBadge: "NEB 2078",
        given: "A = 60°, δm = 40°",
        stepByStep: ["μ = sin((60+40)/2)/sin(30) = sin 50°/sin 30° = 0.766/0.5."],
        finalAnswer: "\\mu = 1.53",
        tipOrTrap: "sin 30° = 0.5 in the denominator makes this the classic exam set-up.",
      },
    ],
  },
  {
    id: "tf-phy-11-lens-makers-2",
    slug: "lens-maker-s-formula",
    title: "Lens Maker's Formula",
    subject: "physics",
    unit: "Lenses",
    unitId: "lenses",
    gradeTrack: "grade-11",
    nebCode: "Phy. 101 (Lenses)",
    isExtra: false,
    statement:
      "For a thin lens of refractive index μ in a medium μm, the focal length obeys 1/f = (μ/μm − 1)(1/R₁ − 1/R₂). Sign convention: convex R₁ > 0, R₂ < 0 makes f > 0 (converging); the formula is how lenses are DESIGNED from glass and geometry.",
    coreFormula: "\\frac{1}{f} = \\left(\\frac{\\mu}{\\mu_m} - 1\\right)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)",
    concernedTerms: [
      { term: "First surface radius", symbol: "R₁", units: "m", definition: "Radius of the surface facing the object (positive if centre of curvature lies on the transmission side)." },
      { term: "Refractivity factor", symbol: "(μ/μm − 1)", units: "—", definition: "Zero when lens and medium share index — glass lens in same-index oil vanishes optically." },
      { term: "Power", symbol: "P = 1/f", units: "dioptre (m⁻¹)", definition: "Convergence strength; thin lenses in contact add powers." },
    ],
    assumptions: ["Thin lens (thickness ≪ radii).", "Paraxial rays (small angles).", "Same medium (μ_m) on both sides."],
    proofSteps: [
      { stepNumber: 1, title: "Refraction at the first surface", latex: "\\frac{\\mu}{v'} - \\frac{\\mu_m}{u} = \\frac{\\mu - \\mu_m}{R_1}", explanation: "Single-surface formula forms an intermediate image v' inside the lens glass." },
      { stepNumber: 2, title: "Refraction at the second surface", latex: "\\frac{\\mu_m}{v} - \\frac{\\mu}{v'} = \\frac{\\mu_m - \\mu}{R_2}", explanation: "The intermediate image acts as the object for surface 2 (object distance −v' in glass)." },
      { stepNumber: 3, title: "Add — v' cancels", latex: "\\frac{1}{v} - \\frac{1}{u} = (\\mu/\\mu_m - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)", explanation: "The internal intermediate image is a bookkeeping device; adding eliminates it." },
      { stepNumber: 4, title: "Identify f via u → ∞", latex: "u \\to \\infty \\Rightarrow v = f \\;\\Rightarrow\\; \\frac{1}{f} = (\\mu/\\mu_m - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)", explanation: "Parallel rays focus at f — completing the lens maker's formula." },
    ],
    conclusion:
      "Focal length is not fixed: it is set by glass index, surrounding medium and the two curvatures — squeeze a lens in water and f doubles; bury it in same-index oil and it stops focusing entirely.",
    keyTakeaways: [
      "Lens in medium: f multiplies by (μ−1)/(μ/μm−1) — water weakens a glass lens.",
      "Equiconvex in air: R₁ = R, R₂ = −R ⇒ 1/f = 2(μ−1)/R.",
      "Lenses in contact: 1/F = 1/f₁ + 1/f₂ (powers add).",
    ],
    examTraps: [
      "❌ Sign errors on R₂ — for a biconvex lens R₂ is NEGATIVE.",
      "❌ Using (μ−1) when the lens sits in water — the factor is (μ/μm − 1).",
    ],
    visualType: "tv-lens-makers-2",
    specialCases: [
      { name: "Equiconvex, air", condition: "R₁ = R, R₂ = −R", formula: "f = \\frac{R}{2(\\mu-1)}", meaning: "Standard design starting point." },
      { name: "Lens in water", condition: "μm = 1.33", formula: "f_{water} = f_{air}\\cdot\\frac{\\mu-1}{\\mu/\\mu_m - 1}", meaning: "Focal length increases ~4× for μ = 1.5 glass." },
      { name: "μ_lens = μ_medium", condition: "Matched index", formula: "f \\to \\infty", meaning: "Lens becomes invisible — no refraction at its surfaces." },
    ],
    solvedProblems: [
      {
        id: "tf-p-lmk-1",
        question: "Equiconvex lens, μ = 1.5, R = 20 cm. Find f in air.",
        examBadge: "NEB 2079",
        given: "R₁ = 20, R₂ = −20, μ = 1.5",
        stepByStep: ["1/f = (1.5−1)(1/20 − (−1/20)) = 0.5 × 0.1 = 0.05."],
        finalAnswer: "f = 20\\ \\text{cm}",
        tipOrTrap: "Subtracting the negative R₂ turns it into addition — the most common slip.",
      },
    ],
  },
  {
    id: "tf-phy-11-band-theory",
    slug: "difference-between-metals-insulators-and-semiconductors-using-band-theory",
    title: "Band Theory: Metals, Insulators and Semiconductors",
    subject: "physics",
    unit: "Solids",
    unitId: "solids",
    gradeTrack: "grade-11",
    nebCode: "Phy. 101 (Solids)",
    isExtra: false,
    statement:
      "In solids, atomic levels widen into bands. Conductors have a partly filled conduction band (electrons move freely); insulators have a large gap E_g ≳ 3 eV between filled valence and empty conduction bands; semiconductors have a small gap E_g ≈ 1 eV where thermal excitation populates the conduction band — conductivity rising with temperature (negative temperature coefficient).",
    coreFormula: "E_g(\\text{Si}) \\approx 1.1\\ \\text{eV}, \\quad E_g(\\text{Ge}) \\approx 0.7\\ \\text{eV}, \\quad E_g(\\text{insulator}) \\gtrsim 3\\ \\text{eV}",
    concernedTerms: [
      { term: "Valence band", symbol: "VB", units: "eV", definition: "Highest band filled at 0 K; bonds live here." },
      { term: "Conduction band", symbol: "CB", units: "eV", definition: "Next empty/partially filled band; mobile electrons here conduct." },
      { term: "Forbidden gap", symbol: "E_g", units: "eV", definition: "Energy range with no allowed states — the classification ruler." },
    ],
    assumptions: ["Periodic crystal lattice (Bloch states).", "Qualitative band picture suffices at NEB level."],
    proofSteps: [
      { stepNumber: 1, title: "From levels to bands", latex: "N \\text{ atoms} \\;\\Rightarrow\\; N \\text{ levels per atomic level} \\Rightarrow \\text{bands}", explanation: "Pauli exclusion splits each atomic level into N closely spaced states when atoms bond into a crystal." },
      { stepNumber: 2, title: "Metal: overlapping or half-filled band", latex: "E_g = 0 \\; (\\text{or overlap})", explanation: "Electrons find empty states immediately above — tiny field accelerates them: high σ." },
      { stepNumber: 3, title: "Insulator: wide gap", latex: "E_g \\gtrsim 3\\ \\text{eV}", explanation: "Thermal energy kT ≈ 0.025 eV cannot lift electrons across — CB stays empty, σ ≈ 0." },
      { stepNumber: 4, title: "Semiconductor: narrow gap", latex: "n_i^2 \\propto e^{-E_g/kT}", explanation: "The Boltzmann factor gives measurable carrier population; heating multiplies carriers faster than scattering slows them ⇒ σ ↑ with T." },
    ],
    conclusion:
      "One diagram classifies all solids: where the Fermi level sits and how wide the gap is. Metals conduct always, insulators never (practically), semiconductors conduct on demand — the basis of every diode and transistor.",
    keyTakeaways: [
      "Semiconductors have NEGATIVE temperature coefficient of resistance; metals positive.",
      "Doping shifts the balance: n-type (donors near CB), p-type (acceptors near VB).",
      "At 0 K a pure semiconductor is a perfect insulator.",
    ],
    examTraps: [
      "❌ Saying semiconductors conduct 'better when hot' without noting this is opposite to metals.",
      "❌ Confusing intrinsic (pure) with extrinsic (doped) behaviour.",
    ],
    visualType: "tv-band-theory",
    specialCases: [
      { name: "Intrinsic Si", condition: "Pure crystal", formula: "n = p = n_i", meaning: "Equal electrons and holes." },
      { name: "n-type doping", condition: "P donor in Si", formula: "E_d \\approx 0.05\\ \\text{eV below CB}", meaning: "Donors ionize easily — majority carriers electrons." },
      { name: "Metal at 0 K", condition: "T = 0", formula: "\\sigma \\ne 0", meaning: "Still conducts — half-filled band needs no thermal help." },
    ],
    solvedProblems: [],
  },
  {
    id: "tf-phy-11-hubble-law",
    slug: "universe-big-bang-and-hubble-law-expansion-of-the-universe",
    title: "Universe: Big Bang and Hubble's Law — Expansion of the Universe",
    subject: "physics",
    unit: "Recent Trends in Physics",
    unitId: "recent-trends-in-physics",
    gradeTrack: "grade-11",
    nebCode: "Phy. 101 (Recent Trends)",
    isExtra: false,
    statement:
      "Hubble's law states the recession speed of a distant galaxy is proportional to its distance: v = H₀ d, with H₀ ≈ 70 km s⁻¹ Mpc⁻¹. Running the expansion backwards points to a hot, dense origin — the Big Bang — 13.8 billion years ago; redshift of spectral lines (Doppler) supplies v.",
    coreFormula: "v = H_0 d, \\qquad t_0 \\approx \\frac{1}{H_0} \\approx 14\\ \\text{billion years}",
    concernedTerms: [
      { term: "Hubble constant", symbol: "H₀", units: "km s⁻¹ Mpc⁻¹", definition: "Slope of the velocity–distance plot; the current expansion rate." },
      { term: "Redshift", symbol: "z = Δλ/λ", units: "—", definition: "Stretching of spectral lines by recession: v ≈ cz for small z." },
      { term: "CMB", symbol: "—", units: "—", definition: "Cosmic microwave background — cooled relic radiation of the early universe at 2.7 K." },
    ],
    assumptions: ["Hubble flow dominates (local galaxies excluded — gravitational binding).", "Constant H₀ as a first approximation (no deceleration history)."],
    proofSteps: [
      { stepNumber: 1, title: "Doppler redshift gives v", latex: "z = \\frac{\\lambda_{obs} - \\lambda_0}{\\lambda_0} \\approx \\frac{v}{c}", explanation: "Comparing known spectral lines with observed wavelengths yields recession speed — red for receding." },
      { stepNumber: 2, title: "Cepheid/Type-Ia distances", latex: "d \\text{ from standard candles}", explanation: "Distance ladder: luminosity of standard candles versus observed brightness gives d." },
      { stepNumber: 3, title: "Hubble plot", latex: "v \\text{ vs } d \\text{ is a straight line through } 0", explanation: "1929: every distant galaxy recedes, and faster ones are farther — space itself expands, with no centre." },
      { stepNumber: 4, title: "Age estimate", latex: "t_0 \\approx \\frac{d}{v} = \\frac{1}{H_0} \\approx 1.4\\times 10^{10}\\ \\text{yr}", explanation: "Inverting the slope gives the time since everything was together — the Big Bang age." },
    ],
    conclusion:
      "Expansion is not galaxies flying through space but space stretching between them — hence the finite-age, finite-density Big Bang picture confirmed by CMB radiation and light-element abundances.",
    keyTakeaways: [
      "1/H₀ sets the age scale of the universe.",
      "CMB at 2.7 K is the cooled afterglow of the primordial fireball.",
      "Except for a few nearby galaxies (Andromeda approaches), everything recedes.",
    ],
    examTraps: [
      "❌ Thinking the Big Bang happened AT a point in pre-existing space — space itself expanded.",
      "❌ Using Hubble's law for nearby bound systems (planets, Milky Way).",
    ],
    visualType: "tv-hubble-law",
    specialCases: [
      { name: "Small z", condition: "v ≪ c", formula: "v \\approx cz", meaning: "Linear Doppler regime." },
      { name: "High z galaxies", condition: "v ~ c", formula: "\\text{relativistic } z", meaning: "Needs the full redshift formula (1+z = √((1+β)/(1−β)))." },
      { name: "Gravitationally bound", condition: "Local group", formula: "v = 0 \\text{ (Hubble)}", meaning: "Expansion does not pull apart bound clusters." },
    ],
    solvedProblems: [
      {
        id: "tf-p-hub-1",
        question: "A galaxy at 100 Mpc recedes at what speed (H₀ = 70 km s⁻¹ Mpc⁻¹)?",
        examBadge: "NEB Board",
        given: "d = 100 Mpc",
        stepByStep: ["v = H₀d = 70 × 100 = 7000 km s⁻¹.", "z ≈ v/c = 7000/3×10⁵ ≈ 0.023."],
        finalAnswer: "v = 7000\\ \\text{km s}^{-1} \\; (z \\approx 0.023)",
        tipOrTrap: "Mpc units ride along cleanly — no conversion needed until z.",
      },
    ],
  },
  {
    id: "tf-phy-12-coulomb-law",
    slug: "coulomb-s-law-and-its-applications",
    title: "Coulomb's Law and Its Applications",
    subject: "physics",
    unit: "Electrostatics",
    unitId: "electrostatics",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Electrostatics)",
    isExtra: true,
    statement:
      "Two point charges interact along their line of joining with F = q₁q₂/(4πε₀r²), force on each equal and opposite. Superposition extends it to any charge distribution; the same inverse-square structure gives the electric field E = F/q and the field of a dipole, ring and sheet.",
    coreFormula: "F = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q_1 q_2}{r^2}, \\qquad k = 9\\times 10^9\\ \\text{N m}^2\\text{C}^{-2}",
    concernedTerms: [
      { term: "Permittivity of free space", symbol: "ε₀", units: "C² N⁻¹ m⁻²", definition: "8.85 × 10⁻¹² — sets the strength of electrostatic coupling in vacuum." },
      { term: "Electric field", symbol: "E", units: "N C⁻¹", definition: "Force per unit positive test charge; vector sum over sources." },
      { term: "Dielectric constant", symbol: "K", units: "—", definition: "Medium divides the force: F_medium = F_vacuum/K." },
    ],
    assumptions: ["Point charges (or spherically symmetric ones, acting from centres).", "Static charges (no magnetic effects).", "Vacuum unless K is inserted."],
    proofSteps: [
      { stepNumber: 1, title: "Torsion-balance inverse square", latex: "F \\propto q_1 q_2, \\;\\; F \\propto \\frac{1}{r^2}", explanation: "Coulomb (1785) balanced electric against torsional torque: halving r quadruples the twist." },
      { stepNumber: 2, title: "Constant of proportionality", latex: "F = k\\frac{q_1q_2}{r^2}, \\; k = \\frac{1}{4\\pi\\varepsilon_0}", explanation: "The 4π convention moves the geometry factor into ε₀, cleaning Gauss's law." },
      { stepNumber: 3, title: "Field of a point charge", latex: "E = \\frac{F}{q_0} = \\frac{kq}{r^2}", explanation: "Divide by a test charge: the field exists whether or not the test charge is there." },
      { stepNumber: 4, title: "Superposition", latex: "\\vec F_{net} = \\sum \\vec F_i, \\qquad \\vec E_{net} = \\sum \\vec E_i", explanation: "Each pair interacts independently — vector addition solves multi-charge configurations." },
    ],
    conclusion:
      "Coulomb's inverse-square law is the foundation of electrostatics: from it flow field, potential, Gauss's law, capacitors and the atomic bond itself (the force holding electrons to nuclei).",
    keyTakeaways: [
      "Like charges repel, unlike attract — sign of q₁q₂ carries direction.",
      "Compare with gravity: both 1/r², but electricity is ~10³⁶ stronger and can repel.",
      "In a medium of constant K, everything divides by K — including fields and potentials.",
    ],
    examTraps: [
      "❌ Using r (diameter) instead of centre-to-centre distance for spheres.",
      "❌ Forgetting the vector nature: forces at 120° between three equal charges need components, not arithmetic.",
    ],
    visualType: "tv-coulomb-law",
    specialCases: [
      { name: "In dielectric medium", condition: "Constant K", formula: "F = \\frac{1}{4\\pi\\varepsilon_0 K}\\frac{q_1q_2}{r^2}", meaning: "Water (K≈80) kills the force 80-fold." },
      { name: "Between charges in equilibrium", condition: "Third charge placed", formula: "\\sum \\vec F = 0", meaning: "Stable zero-force point between like charges, outside for unlike." },
      { name: "Charge inside conductor shell", condition: "r < R", formula: "F = 0 \\text{ (on internal charge by shell)}", meaning: "Electrostatic shielding." },
    ],
    solvedProblems: [
      {
        id: "tf-p-col-1",
        question: "Two 1 μC charges 3 cm apart in water (K = 80). Find F.",
        examBadge: "CEE Entrance",
        given: "q = 10⁻⁶ C, r = 0.03 m, K = 80",
        stepByStep: ["F = 9×10⁹ × 10⁻¹² / (9×10⁻⁴) = 10 N (vacuum).", "In water: F = 10/80."],
        finalAnswer: "F = 0.125\\ \\text{N (repulsive)}",
        tipOrTrap: "Compute vacuum value first, then divide by K — fewer sign/unit slips.",
      },
    ],
  },
  {
    id: "tf-phy-12-ohm-limitations",
    slug: "ohm-s-law-and-its-limitations",
    title: "Ohm's Law and Its Limitations",
    subject: "physics",
    unit: "Current Electricity",
    unitId: "current-electricity",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Current Electricity)",
    isExtra: true,
    statement:
      "Ohm's law: over a wide range, current through a conductor is proportional to the potential difference across it, V = IR, at constant physical conditions. It FAILS for non-ohmic devices (diodes, electrolytes, gas tubes), for elements that heat significantly, and at very high frequencies or fields.",
    coreFormula: "V = IR \\; (\\text{ohmic}), \\qquad \\frac{dV}{dI} \\ne \\frac{V}{I} \\; (\\text{non-ohmic})",
    concernedTerms: [
      { term: "Resistance", symbol: "R", units: "Ω", definition: "Ratio V/I for ohmic conductors; constant slope of the I–V line." },
      { term: "Ohmic device", symbol: "—", units: "—", definition: "I–V graph is a straight line through the origin." },
      { term: "Non-ohmic device", symbol: "—", units: "—", definition: "Diode, thermistor, filament: dynamic resistance differs from static ratio." },
    ],
    assumptions: ["Temperature and all physical conditions constant.", " conductor geometry fixed."],
    proofSteps: [
      { stepNumber: 1, title: "Drift-velocity derivation", latex: "I = neAv_d, \\qquad v_d = \\frac{eE\\tau}{m}", explanation: "Between collisions electrons accelerate for relaxation time τ; drift speed ∝ E." },
      { stepNumber: 2, title: "Assemble resistance", latex: "V = El, \\; I = neAv_d \\Rightarrow R = \\frac{V}{I} = \\frac{ml}{ne^2\\tau A}", explanation: "Resistivity ρ = m/(ne²τ) emerges from electron dynamics — the microscopic origin of Ohm's law." },
      { stepNumber: 3, title: "Where τ fails", latex: "\\tau \\to \\tau(T, E), \\; n \\to n(T)", explanation: "When temperature or field changes τ and n, V/I is no longer constant — the law's domain ends where its constants stop being constant." },
    ],
    conclusion:
      "Ohm's law is a material behaviour, not a law of nature: it holds while n and τ stay fixed, which is why a filament (self-heating) and a p-n junction (barrier potential) break it.",
    keyTakeaways: [
      "Metal filament: R rises as it heats — I–V curve bends downward (concave).",
      "Diode conducts above the knee (~0.7 V Si) — heavily non-ohmic.",
      "Dynamic resistance dV/dI vs static V/I distinguish non-ohmic analysis.",
    ],
    examTraps: [
      "❌ Applying V = IR to a diode in forward bias as if R were constant.",
      "❌ Ignoring temperature rise in 'a bulb just switched on' problems.",
    ],
    visualType: "tv-ohm-limitations",
    specialCases: [
      { name: "Filament lamp", condition: "Self-heating", formula: "R(T) = R_0(1+\\alpha\\Delta T)", meaning: "Bending I–V curve." },
      { name: "Thermistor (NTC)", condition: "Semiconductor", formula: "R \\propto e^{E_g/2kT}", meaning: "Resistance FALLS on heating." },
      { name: "p-n junction", condition: "Forward bias", formula: "I \\propto e^{eV/kT} - 1", meaning: "Shockley diode equation — the extreme non-ohmic case." },
    ],
    solvedProblems: [
      {
        id: "tf-p-ohm-1",
        question: "A 60 W bulb rated 120 V: find hot resistance and explain the cold difference.",
        examBadge: "NEB 2077",
        given: "P = 60 W, V = 120 V",
        stepByStep: ["R_hot = V²/P = 14400/60 = 240 Ω.", "Cold tungsten R ≈ 1/15 of hot — the inrush current spikes."],
        finalAnswer: "R_{hot} = 240\\ \\Omega; \\; R_{cold} \\ll R_{hot}",
        tipOrTrap: "Bulbs burn out at switch-on because cold resistance is tiny.",
      },
    ],
  },
  {
    id: "tf-phy-12-lenz-law",
    slug: "lenz-s-law-and-conservation-of-energy",
    title: "Lenz's Law and Conservation of Energy",
    subject: "physics",
    unit: "Electromagnetic Induction",
    unitId: "electromagnetic-induction",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (EMI)",
    isExtra: true,
    statement:
      "The induced current flows in the direction whose magnetic effect OPPOSES the change producing it (Lenz's law) — the minus sign in ε = −dΦ/dt. This opposition is exactly what makes energy conservation hold: the mechanical work done against the opposing force equals the electrical energy generated.",
    coreFormula: "\\varepsilon = -\\frac{d\\Phi_B}{dt}, \\qquad W_{mech} = \\varepsilon I t = I^2 R t",
    concernedTerms: [
      { term: "Magnetic flux", symbol: "Φ_B", units: "Wb", definition: "Field lines through a loop: Φ = BA cosθ." },
      { term: "Lenz opposition", symbol: "−", units: "—", definition: "Induced effects fight the CHANGE of flux, not the flux itself." },
      { term: "Magnetic drag", symbol: "F", units: "N", definition: "The retarding force felt when moving a conductor through a field — Lenz made mechanical." },
    ],
    assumptions: ["Quasi-static loops (neglect self-field radiation).", "Ohmic circuits for the energy-balance argument."],
    proofSteps: [
      { stepNumber: 1, title: "Flux change induces EMF", latex: "|\\varepsilon| = \\frac{d\\Phi}{dt}", explanation: "Faraday's experimental law — magnitude from the flux change rate." },
      { stepNumber: 2, title: "Direction opposes change", latex: "I_{ind} \\text{ creates } B_{ind} \\text{ against } \\Delta\\Phi", explanation: "A growing flux induces a counter-field; a shrinking one induces a supporting field — Lenz's rule." },
      { stepNumber: 3, title: "Energy balance", latex: "P_{mech} = Fv = I^2 R = P_{elec}", explanation: "Pulling a loop out of a field drags against the induced-current force; the work done reappears as Joule heat — no free energy, ever." },
    ],
    conclusion:
      "Lenz's law IS energy conservation in electromagnetic disguise: if induced currents helped the change instead of opposing it, flux would feed itself in a runaway loop — a perpetual-motion machine the minus sign forbids.",
    keyTakeaways: [
      "Eddy currents obey Lenz too — magnetic braking in trains and scales.",
      "The minus sign makes the induced EMF a 'back-EMF' in motors.",
      "Lenz's direction can be found by right-hand grip on the opposing field.",
    ],
    examTraps: [
      "❌ Saying induced current opposes the FLUX — it opposes the CHANGE in flux.",
      "❌ Forgetting the energy bookkeeping: motion against magnetic drag is where the electrical energy comes from.",
    ],
    visualType: "tv-lenz-law",
    specialCases: [
      { name: "Magnet falling through a pipe", condition: "Conducting tube", formula: "v_{terminal} = \\frac{mgR}{B^2l^2}", meaning: "Eddy currents give a terminal velocity — slow-motion fall." },
      { name: "Motional EMF", condition: "Rod on rails", formula: "\\varepsilon = Blv", meaning: "Lenz dictates current direction; drag F = B²l²v/R." },
      { name: "Flux constant", condition: "dΦ/dt = 0", formula: "\\varepsilon = 0", meaning: "Uniform motion through uniform field induces nothing." },
    ],
    solvedProblems: [
      {
        id: "tf-p-lnz-1",
        question: "A rod (l = 0.5 m, R = 0.1 Ω) slides at 4 m s⁻¹ across B = 0.2 T. Find ε and the drag force.",
        examBadge: "NEB 2078",
        given: "B = 0.2, l = 0.5, v = 4, R = 0.1",
        stepByStep: ["ε = Blv = 0.2 × 0.5 × 4 = 0.4 V.", "I = ε/R = 4 A.", "F = BI l = 0.2 × 4 × 0.5 = 0.4 N (opposing)."],
        finalAnswer: "\\varepsilon = 0.4\\ \\text{V}, \\; F = 0.4\\ \\text{N}",
        tipOrTrap: "Check: mechanical power Fv = 1.6 W = I²R = 1.6 W ✓ — Lenz's ledger balances.",
      },
    ],
  },
  {
    id: "tf-phy-12-transformer",
    slug: "transformer-principle-types-and-losses",
    title: "Transformer: Principle, Types and Losses",
    subject: "physics",
    unit: "Alternating Current",
    unitId: "alternating-current",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (AC)",
    isExtra: true,
    statement:
      "A transformer transfers AC power between coils sharing a flux: mutual induction gives ε = −N dΦ/dt, so voltage scales with turns, V_s/V_p = N_s/N_p. Step-up raises voltage (current falls); step-down the reverse. Real transformers lose energy to copper (I²R), eddy currents, hysteresis and flux leakage.",
    coreFormula: "\\frac{V_s}{V_p} = \\frac{N_s}{N_p}, \\qquad I_s = I_p\\frac{N_p}{N_s}, \\qquad \\eta = \\frac{P_{out}}{P_{in}} \\approx 96\\text{–}99\\%",
    concernedTerms: [
      { term: "Mutual induction", symbol: "M", units: "H", definition: "Flux linkage in the secondary per unit primary current." },
      { term: "Step-up / step-down", symbol: "—", units: "—", definition: "N_s > N_p raises voltage; N_s < N_p lowers it." },
      { term: "Laminated core", symbol: "—", units: "—", definition: "Insulated sheets break eddy-current paths, cutting that loss ~100×." },
    ],
    assumptions: ["Ideal coupling (all flux links both coils) for the basic relations.", "Sinusoidal AC — transformers cannot transform DC steady flux."],
    proofSteps: [
      { stepNumber: 1, title: "Same flux through both coils", latex: "\\Phi \\text{ per turn equal}", explanation: "Iron core guides nearly all flux through both windings." },
      { stepNumber: 2, title: "EMFs proportional to turns", latex: "\\varepsilon_p = -N_p\\frac{d\\Phi}{dt}, \\; \\varepsilon_s = -N_s\\frac{d\\Phi}{dt} \\Rightarrow \\frac{\\varepsilon_s}{\\varepsilon_p} = \\frac{N_s}{N_p}", explanation: "Dividing the two Faraday expressions cancels the common dΦ/dt." },
      { stepNumber: 3, title: "Power balance (ideal)", latex: "V_pI_p = V_sI_s \\Rightarrow \\frac{I_s}{I_p} = \\frac{N_p}{N_s}", explanation: "A step-up transformer trades current for voltage — power (minus losses) is conserved." },
    ],
    conclusion:
      "The transformer is AC's superpower: raise voltage for transmission (cut I²R line loss by the square), lower it for safe use — with the four classic losses as the engineering tax.",
    keyTakeaways: [
      "Transformers work ONLY on changing current — DC gives steady flux, zero secondary EMF.",
      "Line-loss motive: raising V 10× cuts loss 100×.",
      "Losses: copper (I²R), eddy currents (laminate!), hysteresis (soft iron), flux leakage (interleaved windings).",
    ],
    examTraps: [
      "❌ Claiming a transformer multiplies POWER — it trades voltage against current.",
      "❌ Saying DC works because V = IR still holds — dΦ/dt = 0 gives zero secondary voltage.",
    ],
    visualType: "tv-transformer",
    specialCases: [
      { name: "Open secondary", condition: "No load", formula: "I_p \\approx 0 \\text{ (magnetizing only)}", meaning: "Ideal transformer draws almost no current unloaded." },
      { name: "Step-up then line, then step-down", condition: "Transmission", formula: "P_{loss} = I^2R = (P/V)^2R", meaning: "Why grids use hundreds of kV." },
      { name: "Eddy currents", condition: "Solid core", formula: "P_{eddy} \\propto B^2 f^2 t^2", meaning: "Lamination thickness t enters squared — thin sheets win." },
    ],
    solvedProblems: [
      {
        id: "tf-p-trn-1",
        question: "100% efficient transformer steps 220 V to 22 V. If primary current is 0.5 A, find secondary current.",
        examBadge: "NEB 2077",
        given: "V_p = 220, V_s = 22, I_p = 0.5",
        stepByStep: ["V_pI_p = V_sI_s ⇒ 220×0.5 = 22×I_s.", "I_s = 110/22 = 5 A."],
        finalAnswer: "I_s = 5\\ \\text{A}",
        tipOrTrap: "Step-down multiplies current 10× — exactly the turns ratio inverted.",
      },
    ],
  },
  {
    id: "tf-phy-12-huygens",
    slug: "wavefront-and-huygens-principle",
    title: "Wavefront and Huygens' Principle",
    subject: "physics",
    unit: "Wave Optics",
    unitId: "wave-optics",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Wave Optics)",
    isExtra: true,
    statement:
      "A wavefront is the locus of points oscillating in phase. Huygens' principle: every point on a wavefront acts as a source of secondary wavelets; the new wavefront is the forward envelope of all wavelets after time t. From it follow the laws of reflection and refraction, and the wave theory of interference and diffraction.",
    coreFormula: "v = \\frac{\\Delta x}{\\Delta t} \\text{ (envelope speed)}, \\qquad \\frac{\\sin i}{\\sin r} = \\frac{v_1}{v_2}",
    concernedTerms: [
      { term: "Wavefront", symbol: "—", units: "—", definition: "Surface of constant phase: plane (far source), spherical (point source), cylindrical (line source)." },
      { term: "Secondary wavelet", symbol: "—", units: "—", definition: "Spherical disturbance emitted from each wavefront point at local speed v." },
      { term: "Forward envelope", symbol: "—", units: "—", definition: "Only the forward-going tangent surface counts — the backward one is ignored (Kirchhoff's refinement)." },
    ],
    assumptions: ["Medium homogeneous and isotropic.", "Wavelets add incoherently for envelope construction (full treatment needs interference — Fresnel)."],
    proofSteps: [
      { stepNumber: 1, title: "Construction", latex: "\\text{radius of each wavelet} = v\\,\\Delta t", explanation: "In time Δt every wavefront point sprouts a sphere of radius vΔt." },
      { stepNumber: 2, title: "Reflection from a plane", latex: "\\angle i = \\angle r", explanation: "The envelope tangent geometry gives equal angles — law of reflection derived." },
      { stepNumber: 3, title: "Refraction between media", latex: "\\frac{\\sin i}{\\sin r} = \\frac{v_1}{v_2} = \\frac{n_2}{n_1}", explanation: "Slower wavelets in medium 2 tilt the envelope — Snell's law derived from wave geometry." },
    ],
    conclusion:
      "Huygens turns propagation into geometry: draw the wavelets, connect the envelope, and reflection, refraction — and with Fresnel's additions, diffraction — all drop out.",
    keyTakeaways: [
      "Wavefront shape reveals source shape: point → spherical, distant → plane.",
      "Rays are normals to wavefronts — two languages for the same propagation.",
      "Huygens explains why waves bend around edges (diffraction) — particles cannot.",
    ],
    examTraps: [
      "❌ Drawing wavelets only from the centre — every point of the front is a source.",
      "❌ Ignoring that the envelope uses only FORWARD wavelets.",
    ],
    visualType: "tv-huygens-principle",
    specialCases: [
      { name: "Plane wave at interface", condition: "Oblique incidence", formula: "\\sin i/\\sin r = v_1/v_2", meaning: "The classic refraction derivation." },
      { name: "Point source", condition: "Spherical front", formula: "I \\propto 1/r^2", meaning: "Energy spreads over growing spheres." },
      { name: "Obstruction", condition: "Aperture ~ λ", formula: "\\text{strong bending}", meaning: "Wavelets from the aperture edges spread widely — diffraction." },
    ],
    solvedProblems: [],
  },

  {
    id: "tf-phy-12-bohr-model",
    slug: "atom-bohr-s-model-and-hydrogen-spectrum",
    title: "Atom: Bohr's Model and the Hydrogen Spectrum",
    subject: "physics",
    unit: "Modern Physics",
    unitId: "modern-physics",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Modern Physics)",
    isExtra: true,
    statement:
      "Bohr quantised the hydrogen atom: electrons occupy stable orbits of fixed angular momentum (mvr = nℏ) without radiating, and radiate only in jumps between levels — Eₙ = −13.6/n² eV. The emitted photon carries exactly the level gap, giving the observed spectral series.",
    coreFormula:
      "mvr = n\\hbar, \n E_n = -\\dfrac{13.6}{n^2}\\,\\text{eV}, \n h\u0009 = E_i - E_f",
    concernedTerms: [
      { term: "Bohr radius", symbol: "a₀", units: "m", definition: "Ground-orbit radius 0.529 Å; orbits scale as n²a₀." },
      { term: "Energy levels", symbol: "Eₙ", units: "eV", definition: "Binding energy of orbit n; zero at n = ∞ (free electron)." },
      { term: "Spectral series", symbol: "—", units: "—", definition: "Named families of lines: Lyman, Balmer, Paschen, Brackett, Pfund." },
    ],
    assumptions: [
      "Electrons move in fixed circular orbits without radiating (contradicting classical EM — the model's ad-hoc postulate).",
      "Angular momentum is quantised in units of ℏ; radiation happens only during transitions.",
      "Nucleus is infinitely massive and the electron orbits it classically (reduced-mass correction ignored).",
    ],
    proofSteps: [
      { stepNumber: 1, title: "Force balance in orbit n", latex: "\\frac{mv^2}{r} = \\frac{1}{4\\pi\\varepsilon_0}\\frac{e^2}{r^2}", explanation: "Coulomb attraction supplies the centripetal force for circular motion at radius r and speed v." },
      { stepNumber: 2, title: "Quantisation postulate", latex: "mvr = n\\hbar \\; (n = 1, 2, 3, ...)", explanation: "Angular momentum is restricted to integer multiples of ℏ — this closes the system and yields discrete r and v." },
      { stepNumber: 3, title: "Energy of level n", latex: "E_n = -\\frac{13.6}{n^2}\\,\\text{eV}", explanation: "Total energy = KE + PE, negative (bound), scaling as 1/n² with ground-state depth 13.6 eV." },
      { stepNumber: 4, title: "Transition rule", latex: "h\\nu = E_{n_i} - E_{n_f} \\;\\Rightarrow\\; \\frac{1}{\\lambda} = R\\left(\\frac{1}{n_f^2} - \\frac{1}{n_i^2}\\right)", explanation: "A jump from nᵢ to n_f emits a photon whose energy equals the level gap — the Rydberg formula for 1/λ follows." },
    ],
    specialCases: [
      { name: "Ionisation from ground state", condition: "n = 1 → ∞", formula: "E = +13.6 eV", meaning: "Minimum photon energy to free the electron — the ionisation potential is 13.6 V." },
      { name: "Lyman limit", condition: "nᵢ → ∞ into n_f = 1", formula: "\\lambda \\to 91.2\\ \\text{nm}", meaning: "Shortest-wavelength Lyman line; the series converges (quantum signature)." },
      { name: "Balmer Hα", condition: "3 → 2", formula: "\\lambda = 656.3\\ \\text{nm}", meaning: "Red visible line; the whole visible spectrum of hydrogen is Balmer." },
      { name: "He⁺ scaled energies", condition: "Hydrogen-like ion, Z > 1", formula: "E_n = -\\dfrac{13.6Z^2}{n^2}\\,\\text{eV}", meaning: "Nuclear charge enters squared — He⁺ lines are 4× hydrogen's energy." },
    ],
    conclusion:
      "Quantised orbits plus the transition rule reproduce hydrogen's entire line spectrum: Eₙ = −13.6/n² eV and 1/λ = R(1/n_f² − 1/nᵢ²) with R = 1.097 × 10⁷ m⁻¹ — the first successful quantisation of an atom.",
    keyTakeaways: [
      "Orbits are stable only because angular momentum is quantised: mvr = nℏ.",
      "Energy, orbit radius and speed all scale with n (E ∝ −1/n², r ∝ n², v ∝ 1/n).",
      "Photon energy = exact level gap; the series are just families of landing orbits (Lyman → 1, Balmer → 2, Paschen → 3).",
      "The model works only for one-electron (hydrogen-like) species; multi-electron atoms need quantum mechanics.",
    ],
    examTraps: [
      "Sign discipline: Eₙ is negative (bound); ionisation energy is +13.6 eV from the ground state.",
      "Series are named by the LANDING orbit (n_f), not the starting one.",
      "For He⁺ or Li²⁺ multiply by Z² — forgetting this is the most common CEE slip.",
      "'Shortest wavelength' means the series limit (nᵢ → ∞), not the first line.",
    ],
    visualType: "tv-bohr-model",
    solvedProblems: [
      {
        id: "tf-bohr-balmer-ha",
        question: "Find the wavelength of the Balmer Hα line (3 → 2).",
        examBadge: "NEB Board",
        given: "nᵢ = 3, n_f = 2, R = 1.097 × 10⁷ m⁻¹",
        stepByStep: ["1/λ = R(1/2² − 1/3²) = R × 5/36.", "λ = 36/(5 × 1.097 × 10⁷) ≈ 6.56 × 10⁻⁷ m."],
        finalAnswer: "\\lambda = 656.3\\ \\text{nm}",
        tipOrTrap: "Balmer means the electron LANDS on n = 2 — students often land it on 1.",
      },
    ],
  },
];

export const THEOREM_FILL_PHYSICS_2 = P2;
