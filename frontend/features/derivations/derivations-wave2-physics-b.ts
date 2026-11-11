/**
 * Physics Derivations — Wave 2B (Class 12: AC, Ray & Wave Optics, Modern Physics).
 */

import type { DerivationOrTheorem } from "@/lib/derivations-data";

const p2b: DerivationOrTheorem[] = [
  {
    id: "phy-12-ac-lcr-resonance",
    slug: "ac-lcr-series-resonance-power-factor",
    title: "AC: Series LCR Circuit, Impedance, Resonance & Power Factor",
    subject: "physics",
    unit: "Alternating Current",
    unitId: "alternating-current",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (AC)",
    isExtra: true,
    statement:
      "With AC source V = V₀sin ωt driving a series LCR loop, the impedance Z = √(R² + (X_L − X_C)²) is minimum at resonance ω₀ = 1/√(LC), where the current peaks and the power factor is unity.",
    coreFormula: "Z = \\sqrt{R^2 + (X_L - X_C)^2}, \\quad \\omega_0 = \\frac{1}{\\sqrt{LC}}, \\quad \\cos\\phi = \\frac{R}{Z}",
    concernedTerms: [
      { term: "Inductive reactance", symbol: "X_L", units: "Ω", definition: "ωL — grows with frequency." },
      { term: "Capacitive reactance", symbol: "X_C", units: "Ω", definition: "1/ωC — shrinks with frequency." },
      { term: "Power factor", symbol: "cos φ", units: "—", definition: "Fraction of apparent power that is real." },
    ],
    assumptions: ["Series (same current) ideal elements.", "Steady-state sinusoidal response."],
    proofSteps: [
      { stepNumber: 1, title: "Element voltages", latex: "V_R = IR,\\ V_L = IX_L,\\ V_C = IX_C", explanation: "Same current I through all three; V_L leads I by 90°, V_C lags by 90°." },
      { stepNumber: 2, title: "Phasor addition", latex: "V^2 = (IR)^2 + (IX_L - IX_C)^2", explanation: "L and C voltages are antiphased — they subtract; R is in phase with I." },
      { stepNumber: 3, title: "Impedance", latex: "Z = \\frac{V}{I} = \\sqrt{R^2 + (X_L-X_C)^2}", explanation: "Definition of impedance from the phasor triangle; phase tan φ = (X_L − X_C)/R." },
      { stepNumber: 4, title: "Resonance", latex: "X_L = X_C \\Rightarrow \\omega_0 = \\frac{1}{\\sqrt{LC}},\\ f_0 = \\frac{1}{2\\pi\\sqrt{LC}}", explanation: "At ω₀ the reactances cancel: Z = R (minimum), I maximum, φ = 0 (power factor 1)." },
      { stepNumber: 5, title: "Average power", latex: "P_{avg} = V_{rms}I_{rms}\\cos\\phi", explanation: "Only the in-phase component delivers net power over a cycle." },
    ],
    conclusion:
      "Phasor geometry gives Z, resonance makes L and C cancel exactly (Z = R, cos φ = 1), and P = VI cos φ quantifies real power transfer.",
    keyTakeaways: [
      "At resonance: I_max = V_rms/R — independent of L and C individually.",
      "Sharpness of resonance ~ Q = ω₀L/R.",
      "Pure L or pure C consumes zero average power.",
    ],
    examTraps: [
      "Adding R and reactances arithmetically instead of vectorially.",
      "Forgetting ω₀ = 1/√(LC) uses radians per second, not Hz.",
    ],
    visualType: "graph",
    specialCases: [
      { name: "Pure resistor", condition: "X_L = X_C = 0", formula: "Z = R,\\ \\phi = 0", meaning: "V and I in phase; P = V_rms I_rms." },
      { name: "Pure inductor / capacitor", condition: "R = 0", formula: "\\phi = \\pm 90^\\circ,\\ P_{avg} = 0", meaning: "Wattless current — energy just sloshes back and forth." },
      { name: "Below/above resonance", condition: "ω < ω₀ vs ω > ω₀", formula: "X_C > X_L \\ (\\text{capacitive}),\\ X_L > X_C\\ (\\text{inductive})", meaning: "Circuit changes character as frequency sweeps through ω₀." },
    ],
    solvedProblems: [],
  },
  {
    id: "phy-12-ray-optics-mirror-formula",
    slug: "mirror-formula-ray-optics-grade12",
    title: "Ray Optics: Mirror Formula & Magnification (Concave/Convex)",
    subject: "physics",
    unit: "Ray Optics",
    unitId: "ray-optics",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Ray Optics)",
    isExtra: true,
    statement:
      "For spherical mirrors, object distance u, image distance v and focal length f obey 1/v + 1/u = 1/f = 2/R with magnification m = −v/u.",
    coreFormula: "\\frac{1}{v} + \\frac{1}{u} = \\frac{1}{f} = \\frac{2}{R}, \\qquad m = -\\frac{v}{u} = \\frac{h'}{h}",
    concernedTerms: [
      { term: "Focal length", symbol: "f", units: "m", definition: "f = R/2 for a spherical mirror; negative for convex under the sign convention." },
      { term: "Magnification", symbol: "m", units: "—", definition: "Negative m ⇒ inverted (real) image; positive m ⇒ erect (virtual) image." },
    ],
    assumptions: ["Paraxial rays (small apertures).", "Cartesian sign convention: distances measured from pole, against incident light is negative."],
    proofSteps: [
      { stepNumber: 1, title: "Similar-triangle geometry", latex: "\\frac{h'}{h} = \\frac{v}{u}", explanation: "From the ray through the pole (angle of incidence = reflection) the image/object heights scale with distances." },
      { stepNumber: 2, title: "Small-angle relation at the mirror", latex: "\\frac{h'}{h} = \\frac{v - f}{f}", explanation: "Using the ray through the focus reflected parallel, with the paraxial tan θ ≈ θ substitution." },
      { stepNumber: 3, title: "Eliminate heights", latex: "\\frac{v}{u} = \\frac{v-f}{f} \\Rightarrow \\frac{1}{v} + \\frac{1}{u} = \\frac{1}{f}", explanation: "Algebraic rearrangement with the sign convention yields the mirror formula." },
      { stepNumber: 4, title: "Magnification", latex: "m = -\\frac{v}{u}", explanation: "Sign-convention version of the similar triangles — encodes inversion automatically." },
    ],
    conclusion:
      "One formula 1/v + 1/u = 1/f serves concave and convex mirrors alike once the Cartesian signs are applied; m = −v/u tells nature and orientation.",
    keyTakeaways: [
      "Real image ⇔ v negative on a concave mirror with object beyond F.",
      "Convex mirrors ALWAYS give virtual, erect, diminished images.",
      "Magnification of a plane mirror is exactly +1 (v = u behind).",
    ],
    examTraps: [
      "Sign errors — the formula only works with consistent Cartesian signs.",
      "Using R where f = R/2 belongs.",
    ],
    visualType: "schematic",
    specialCases: [
      { name: "Object at C (u = R)", condition: "Object on the centre of curvature", formula: "v = R,\\ m = -1", meaning: "Image same size, inverted, at C itself." },
      { name: "Object at F", condition: "u = f", formula: "v \\to \\infty", meaning: "Reflected rays parallel — image at infinity." },
      { name: "Convex virtual image", condition: "f < 0, real object", formula: "v > 0,\\ |m| < 1", meaning: "Always erect and diminished — the rear-view mirror case." },
      { name: "Plane mirror limit", condition: "R → ∞", formula: "v = -u", meaning: "Image as far behind as object in front, m = +1." },
    ],
    solvedProblems: [],
  },
  {
    id: "phy-12-ray-optics-lens-combination",
    slug: "combination-of-lenses-and-mirrors",
    title: "Ray Optics: Combination of Lenses & Mirrors (Equivalent Power)",
    subject: "physics",
    unit: "Ray Optics",
    unitId: "ray-optics",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Ray Optics)",
    isExtra: true,
    statement:
      "Thin lenses in contact behave as one lens of power P = P₁ + P₂ + … (1/F = 1/f₁ + 1/f₂ + …); a lens–mirror stack uses the image of one element as the object of the next.",
    coreFormula: "\\frac{1}{F} = \\frac{1}{f_1} + \\frac{1}{f_2} + \\cdots, \\qquad P = P_1 + P_2 + \\cdots",
    concernedTerms: [
      { term: "Power of a lens", symbol: "P", units: "D (dioptre)", definition: "P = 1/f in metres; converging positive." },
      { term: "Equivalent lens", symbol: "F", units: "m", definition: "Single thin lens producing the same final image." },
    ],
    assumptions: ["Thin lenses in contact (negligible separation).", "Paraxial rays."],
    proofSteps: [
      { stepNumber: 1, title: "First lens forms an image", latex: "\\frac{1}{v_1} - \\frac{1}{u} = \\frac{1}{f_1}", explanation: "Standard thin-lens equation for the first element." },
      { stepNumber: 2, title: "Second lens acts on that image", latex: "\\frac{1}{v} - \\frac{1}{v_1} = \\frac{1}{f_2}", explanation: "For contact lenses the intermediate image is the object of the next lens." },
      { stepNumber: 3, title: "Add the equations", latex: "\\frac{1}{v} - \\frac{1}{u} = \\frac{1}{f_1} + \\frac{1}{f_2} = \\frac{1}{F}", explanation: "The intermediate distance cancels — the pair behaves as one lens of focal length F." },
    ],
    conclusion:
      "Powers add for contact lenses: P = P₁ + P₂; separated systems are handled step-by-step (image → object chaining), the method behind eyeglasses-plus-eye and telescopes.",
    keyTakeaways: [
      "Dioptres are additive — the optician's unit exists for exactly this.",
      "A lens plus mirror: light passes the lens twice — count P twice.",
      "Diverging lens contributes negative power.",
    ],
    examTraps: [
      "Forgetting the double pass through a lens in front of a mirror.",
      "Adding focal lengths instead of inverse focal lengths.",
    ],
    visualType: "schematic",
    specialCases: [
      { name: "Two identical convex lenses", condition: "f₁ = f₂ = f", formula: "F = f/2", meaning: "Doubling power halves the focal length." },
      { name: "Convex + concave equal power", condition: "f₁ = −f₂", formula: "F \\to \\infty", meaning: "The pair cancels — behaves like a plane glass plate." },
      { name: "Lens + plane mirror", condition: "Object at distance u in front", formula: "Image returns at u\\text{ if } u = f", meaning: "Autocollimation method of measuring f." },
    ],
    solvedProblems: [],
  },
  {
    id: "phy-12-wave-optics-brewster",
    slug: "brewsters-law-polarization",
    title: "Wave Optics: Brewster's Law of Polarization by Reflection",
    subject: "physics",
    unit: "Wave Optics",
    unitId: "wave-optics",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Wave Optics)",
    isExtra: true,
    statement:
      "At the polarizing angle θ_B, reflected light is completely plane-polarized and the reflected and refracted rays are perpendicular, giving tan θ_B = n (Brewster's law).",
    coreFormula: "\\tan\\theta_B = n = \\frac{n_2}{n_1}, \\qquad \\theta_B + \\theta_r = 90^\\circ",
    concernedTerms: [
      { term: "Polarizing angle", symbol: "θ_B", units: "°", definition: "Incidence angle producing fully polarized reflected light (~53° for glass)." },
      { term: "Plane of polarization", symbol: "—", units: "—", definition: "Plane containing the polarized E-vector — parallel to the surface for reflected light." },
    ],
    assumptions: ["Non-absorbing dielectric interface.", "Unpolarized incident light."],
    proofSteps: [
      { stepNumber: 1, title: "Reflection and refraction angles", latex: "\\theta_i = \\theta_B, \\quad \\frac{\\sin\\theta_B}{\\sin\\theta_r} = n", explanation: "Snell's law at the polarizing angle." },
      { stepNumber: 2, title: "Brewster geometry", latex: "\\theta_B + \\theta_r = 90^\\circ", explanation: "At full polarization the reflected and refracted beams are perpendicular (experiment + EM boundary conditions)." },
      { stepNumber: 3, title: "Eliminate θ_r", latex: "\\sin\\theta_r = \\cos\\theta_B \\Rightarrow \\tan\\theta_B = n", explanation: "Substituting sin θ_r = sin(90° − θ_B) = cos θ_B into Snell's law gives Brewster's law directly." },
    ],
    conclusion:
      "tan θ_B = n: the polarizing angle exists because at that incidence the reflected and refracted rays stand at 90° — polarization is a geometric consequence of the transverse nature of light.",
    keyTakeaways: [
      "Polarization proves light is transverse — the historic significance.",
      "Brewster angle for air–glass ≈ 57°? compute tan⁻¹(1.5) ≈ 56.3°; for air–water ≈ 53°.",
      "Polaroid sunglasses cut horizontal glare from roads/water for exactly this reason.",
    ],
    examTraps: [
      "Using sin θ_B = n instead of tan.",
      "Confusing the plane of polarization with the plane of incidence.",
    ],
    visualType: "schematic",
    specialCases: [
      { name: "Normal incidence", condition: "θ = 0", formula: "\\text{no polarization}", meaning: "Reflection symmetry leaves the beam unpolarized." },
      { name: "From denser to rarer", condition: "n₂ < n₁", formula: "\\tan\\theta_B = n_2/n_1 < 1", meaning: "Polarizing angle below 45° (internal reflection case)." },
      { name: "Stack of plates (pile of plates)", condition: "N glass plates at θ_B", formula: "Transmission \\to \\text{highly polarized}", meaning: "Practical polarizer before Polaroids existed." },
    ],
    solvedProblems: [],
  },
  {
    id: "phy-12-photoelectric-einstein",
    slug: "einsteins-photoelectric-equation",
    title: "Modern Physics: Einstein's Photoelectric Equation & Stopping Potential",
    subject: "physics",
    unit: "Modern Physics",
    unitId: "modern-physics",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Modern Physics)",
    isExtra: true,
    statement:
      "A photon of energy hν ejects an electron if hν > φ (work function); the maximum kinetic energy obeys K_max = hν − φ = eV₀, where V₀ is the stopping potential.",
    coreFormula: "h\\nu = \\phi + K_{max}, \\qquad eV_0 = h\\nu - \\phi = h(\\nu - \\nu_0)",
    concernedTerms: [
      { term: "Work function", symbol: "φ", units: "eV or J", definition: "Minimum energy to free an electron from the metal surface." },
      { term: "Threshold frequency", symbol: "ν₀", units: "Hz", definition: "φ/h — below it no emission regardless of intensity." },
      { term: "Stopping potential", symbol: "V₀", units: "V", definition: "Reverse potential that just stops the fastest photoelectrons." },
    ],
    assumptions: ["One photon interacts with one electron.", "Maximum KE belongs to surface electrons (no internal losses)."],
    proofSteps: [
      { stepNumber: 1, title: "Energy conservation for one photon–electron event", latex: "h\\nu = \\phi + K_{max}", explanation: "The photon energy splits into escape cost (φ) and kinetic energy — Einstein's photon picture." },
      { stepNumber: 2, title: "Stopping potential definition", latex: "eV_0 = K_{max}", explanation: "The retarding potential that halts even the fastest electron measures K_max in electron-volts." },
      { stepNumber: 3, title: "Threshold condition", latex: "K_{max} = 0 \\Rightarrow \\nu_0 = \\frac{\\phi}{h}", explanation: "At threshold the whole photon is spent on escape; below ν₀ emission is impossible — the intensity cannot compensate." },
      { stepNumber: 4, title: "Graph predictions", latex: "V_0 = \\frac{h}{e}\\nu - \\frac{\\phi}{e}", explanation: "V₀ vs ν is a straight line of slope h/e and intercept −φ/e — Millikan's method of measuring h." },
    ],
    conclusion:
      "K_max = hν − φ explains every photoelectric oddity: instantaneous emission, threshold frequency, intensity-independence of K_max, and it delivered the first clean measurement of h.",
    keyTakeaways: [
      "Intensity controls the NUMBER of photoelectrons (current), not their KE.",
      "Frequency controls K_max (and hence V₀).",
      "Slope of V₀–ν graph is universal: h/e for every metal.",
    ],
    examTraps: [
      "Doubling intensity and expecting double K_max.",
      "Using wavelength in the exponent-style formulas without converting to frequency.",
    ],
    visualType: "graph",
    specialCases: [
      { name: "At threshold", condition: "ν = ν₀", formula: "K_{max} = 0,\\ V_0 = 0", meaning: "Electrons just escape with zero speed." },
      { name: "Saturation current", condition: "All emitted electrons collected", formula: "I_{sat} \\propto \\text{intensity}", meaning: "Plateau of the I–V characteristic." },
      { name: "Photon momentum transfer", condition: "Emission recoil", formula: "p_{photon} = \\frac{h\\nu}{c} = \\frac{h}{\\lambda}", meaning: "Connects to de Broglie and Compton contexts." },
    ],
    solvedProblems: [],
  },
  {
    id: "phy-12-de-broglie-wavelength",
    slug: "de-broglie-wavelength-matter-waves",
    title: "Modern Physics: De Broglie Wavelength & Matter Waves",
    subject: "physics",
    unit: "Modern Physics",
    unitId: "modern-physics",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Modern Physics)",
    isExtra: true,
    statement:
      "Every moving particle carries a wave of wavelength λ = h/p; for an electron accelerated through V, λ = h/√(2meV) ≈ 12.27/√V Å.",
    coreFormula: "\\lambda = \\frac{h}{p} = \\frac{h}{mv}, \\qquad \\lambda_e = \\frac{h}{\\sqrt{2meV}} \\approx \\frac{12.27}{\\sqrt{V}}\\ \\text{Å}",
    concernedTerms: [
      { term: "Matter wave", symbol: "λ", units: "m", definition: "Wave associated with any moving particle." },
      { term: "Accelerating potential", symbol: "V", units: "V", definition: "eV = ½mv² sets the electron's momentum." },
    ],
    assumptions: ["Non-relativistic speeds (V ≲ 10 kV for electrons).", "Free particles."],
    proofSteps: [
      { stepNumber: 1, title: "Symmetry postulate", latex: "E = h\\nu \\ \\xrightarrow{\\ p = E/c\\ }\\ \\lambda = \\frac{h}{p}", explanation: "Light carries momentum p = E/c with the same h; de Broglie postulated the converse holds for matter." },
      { stepNumber: 2, title: "Kinetic energy from potential", latex: "\\tfrac{1}{2}mv^2 = eV \\Rightarrow p = \\sqrt{2meV}", explanation: "For an electron accelerated through V, momentum comes from the work-energy theorem." },
      { stepNumber: 3, title: "Wavelength", latex: "\\lambda = \\frac{h}{\\sqrt{2meV}}", explanation: "Substituting constants gives the handy λ(Å) = 12.27/√V for electrons — verified by Davisson–Germer diffraction." },
    ],
    conclusion:
      "λ = h/p makes diffraction a property of matter too; electron microscopes and neutron diffraction are this equation engineered.",
    keyTakeaways: [
      "λ matters only when comparable to aperture size — macroscopic objects never diffract measurably.",
      "Faster particle ⇒ shorter wavelength.",
      "Same formula for neutrons, protons, molecules — the universality is the point.",
    ],
    examTraps: [
      "Using λ = hc/E for matter particles (that is the photon form).",
      "Forgetting the √ in the accelerated-electron denominator.",
    ],
    visualType: "graph",
    specialCases: [
      { name: "Thermal neutron", condition: "kT at 300 K", formula: "\\lambda \\approx 1.45\\ \\text{Å}", meaning: "Matches atomic spacings — why neutron diffraction works." },
      { name: "Same V, proton vs electron", condition: "Equal accelerating voltage", formula: "\\lambda_p = \\lambda_e\\sqrt{m_e/m_p} \\approx \\lambda_e/43", meaning: "Heavier particles diffract far less." },
      { name: "Relativistic reminder", condition: "V > ~25 kV", formula: "\\lambda = h/\\sqrt{2meV(1+eV/2mc^2)}", meaning: "Correction term — usually ignored at NEB level." },
    ],
    solvedProblems: [],
  },
  {
    id: "phy-12-binding-energy-mass-defect",
    slug: "mass-defect-binding-energy-per-nucleon",
    title: "Modern Physics: Mass Defect & Binding Energy per Nucleon",
    subject: "physics",
    unit: "Modern Physics",
    unitId: "modern-physics",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Modern Physics)",
    isExtra: true,
    statement:
      "A nucleus weighs less than its parts; the missing mass times c² is the binding energy, and BE/A per nucleon peaks near iron (~8.8 MeV) — the energy bookkeeping of fission and fusion.",
    coreFormula: "\\Delta m = Zm_p + Nm_n - M_{nuc}, \\qquad BE = \\Delta m c^2 \\approx 931.5\\,\\Delta m\\ \\text{MeV}",
    concernedTerms: [
      { term: "Mass defect", symbol: "Δm", units: "u", definition: "Sum of free-nucleon masses minus actual nuclear mass." },
      { term: "Binding energy per nucleon", symbol: "BE/A", units: "MeV", definition: "Stability measure; higher = more tightly bound." },
    ],
    assumptions: ["Masses measured in atomic mass units (1 u = 931.5 MeV/c²).", "Ground-state nuclei."],
    proofSteps: [
      { stepNumber: 1, title: "Mass defect from constituents", latex: "\\Delta m = Zm_p + (A-Z)m_n - M", explanation: "Compare the assembled nucleus with free protons and neutrons." },
      { stepNumber: 2, title: "Einstein bridge", latex: "BE = \\Delta m c^2", explanation: "Mass–energy equivalence converts the deficit to the energy that would unbind the nucleus." },
      { stepNumber: 3, title: "Per-nucleon stability curve", latex: "\\frac{BE}{A} \\text{ peaks at } A \\approx 56\\ (\\text{Fe})", explanation: "Light nuclei gain by fusion toward iron; heavy nuclei gain by fission — both climb the BE/A hill." },
      { stepNumber: 4, title: "Energy release bookkeeping", latex: "Q = (BE_f - BE_i)", explanation: "Reactions release energy when products are more tightly bound per nucleon." },
    ],
    conclusion:
      "BE = Δmc² (≈931.5 Δm MeV) and the BE/A curve explain why stars fuse, reactors fission, and iron sits at the summit of nuclear stability.",
    keyTakeaways: [
      "1 u = 931.5 MeV — the conversion constant of all nuclear numericals.",
      "Fission of U vs fusion of H both slide UP the BE/A curve.",
      "BE/A ≈ 8.5 MeV for most mid-mass nuclei — nearly flat plateau.",
    ],
    examTraps: [
      "Using atomic mass M with proton masses (electron mismatch) — use hydrogen atoms throughout or subtract electrons.",
      "Forgetting to divide by A when asked for BE/A.",
    ],
    visualType: "graph",
    specialCases: [
      { name: "Fission of ²³⁵U", condition: "Splitting into ~A/2 fragments", formula: "Q \\approx 200\\ \\text{MeV}", meaning: "BE/A rises from ~7.6 to ~8.5 MeV — the deficit is the bomb/reactor energy." },
      { name: "Fusion of 4 protons → He", condition: "Stellar pp-chain", formula: "Q \\approx 26.7\\ \\text{MeV}", meaning: "Sun's output per helium assembled." },
      { name: "Most stable nucleus", condition: "Maximum BE/A", formula: "^{62}Ni\\ /^{56}Fe \\approx 8.8\\ \\text{MeV}", meaning: "Endpoint of stellar exothermic burning." },
    ],
    solvedProblems: [],
  },
];

export const PHYSICS_WAVE2B_DERIVATIONS = p2b;
