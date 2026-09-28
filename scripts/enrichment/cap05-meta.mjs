export const cap05Meta = {
  examples: [
    "Electrolytic capacitors: Use microscopic aluminum oxide dielectric films (κ ≈ 9) of nanometer thickness to achieve ultra-high capacitance (thousands of μF) in miniature form.",
    "Microwave oven: Microwaves oscillate electric fields at 2.45 GHz; water molecules in food rapidly rotate to align their permanent dipoles, generating frictional thermal heat throughout food.",
    "Piezoelectric crystals: Dielectric materials like quartz and lead zirconate titanate (PZT) polarize when subjected to mechanical pressure, converting stress into electrical voltage for ultrasound and spark igniters."
  ],
  practiceQuestions: [
    "Q1. Differentiate between polar and non-polar dielectrics with two examples of each.",
    "Q2. Define electric polarization vector P and electric displacement vector D. Write their SI units and dimensional formulas.",
    "Q3. Derive the relation between dielectric constant κ and electric susceptibility χ_e, showing that κ = 1 + χ_e.",
    "Q4. A parallel plate capacitor is charged and isolated. Explain what happens to the electric field, potential difference, and capacitance when a dielectric slab fills the plate gap."
  ],
  formulas: [
    "Electric polarization: $\\vec{P} = \\chi_e \\varepsilon_0 \\vec{E}$",
    "Electric displacement: $\\vec{D} = \\varepsilon_0 \\vec{E} + \\vec{P} = \\kappa \\varepsilon_0 \\vec{E}$",
    "Susceptibility relation: $\\kappa = 1 + \\chi_e$",
    "Reduced field in dielectric: $E = E_0 - E_p = \\frac{E_0}{\\kappa}$",
    "Induced bound surface charge density: $\\sigma_p = P = \\sigma_{free}\\left(1 - \\frac{1}{\\kappa}\\right)$"
  ],
  keyPoints: [
    "Dielectrics lack free electrons; applied electric fields induce dipole alignment and bound surface charge ±σ_p.",
    "Induced bound surface charge creates an opposing internal field E_p, reducing the net field to E = E₀/κ.",
    "Polarization vector P has units of C/m² and equals induced bound surface charge density σ_p.",
    "Displacement vector D depends solely on free charges on the conducting plates (D = σ_free).",
    "Dielectric constant κ relates to electric susceptibility χ_e by κ = 1 + χ_e."
  ]
};
