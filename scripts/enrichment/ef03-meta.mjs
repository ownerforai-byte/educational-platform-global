export const ef03Meta = {
  examples: [
    "Van de Graaff Generator: Charges carried to the hollow metallic upper terminal immediately transfer to the outer sphere surface because E = 0 inside, allowing accumulation of potentials up to millions of volts.",
    "Electrostatic air precipitators: High-voltage central wire electrodes generate intense radial fields (E ∝ 1/r) that ionize air molecules, charging smoke particles which then migrate to grounded collection plates.",
    "Coaxial cable design: In transmission lines, the electric field is strictly contained between the inner cylinder and outer grounded shielding conductor (E = λ / (2πε₀r)), preventing signal radiation and electromagnetic interference."
  ],
  practiceQuestions: [
    "Q1. Using Gauss's law, derive an expression for the electric field intensity at a distance r from an infinitely long straight wire carrying uniform linear charge density λ.",
    "Q2. Derive an expression for the electric field intensity due to an infinite plane sheet of charge with uniform surface charge density σ. Why is this field uniform?",
    "Q3. Apply Gauss's law to find the electric field intensity due to a uniformly charged thin spherical shell of radius R at points (a) outside the shell (r > R), (b) on the surface (r = R), and (c) inside the shell (r < R). Sketch a graph of E versus r.",
    "Q4. A spherical conductor of radius 10 cm has a charge of 3.2 × 10⁻⁷ C distributed uniformly on its surface. What is the electric field at (a) a point 15 cm from the center, and (b) inside the conductor at 5 cm from the center?"
  ],
  formulas: [
    "Infinite line charge: $E = \\frac{\\lambda}{2\\pi\\varepsilon_0 r} = \\frac{2k\\lambda}{r}$",
    "Infinite non-conducting plane sheet: $E = \\frac{\\sigma}{2\\varepsilon_0}$",
    "Conducting surface boundary: $E = \\frac{\\sigma}{\\varepsilon_0}$",
    "Between oppositely charged plates: $E = \\frac{\\sigma}{\\varepsilon_0}$",
    "Spherical shell (outside, $r \\ge R$): $E = \\frac{1}{4\\pi\\varepsilon_0} \\frac{Q}{r^2}$",
    "Spherical shell (inside, $r < R$): $E = 0$",
    "Non-conducting sphere (inside, $r \\le R$): $E = \\frac{\\rho r}{3\\varepsilon_0} = \\frac{1}{4\\pi\\varepsilon_0}\\frac{Q r}{R^3}$"
  ],
  keyPoints: [
    "Line charge field decreases inversely with radial distance: $E \\propto 1/r$.",
    "Infinite sheet field is completely uniform and distance-independent: $E = \\sigma / (2\\varepsilon_0)$.",
    "Inside any hollow conductor or spherical shell in electrostatic equilibrium, $E = 0$ (electrostatic shielding).",
    "Outside a spherical charge distribution, the field behaves as if all charge is concentrated at the center ($E \\propto 1/r^2$).",
    "Inside a uniformly charged solid dielectric sphere, field increases linearly from center to surface ($E \\propto r$)."
  ]
};
