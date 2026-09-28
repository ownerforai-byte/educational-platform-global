export const ef02Meta = {
  examples: [
    "Faraday Cage: A closed conducting mesh or metal box shields its interior completely from external electric fields because any enclosed charge is zero and mobile charges redistribute along exterior surfaces, making $\\vec{E} = 0$ inside.",
    "Airplane lightning safety: Commercial aircraft bodies made of aluminum act as hollow Gaussian surfaces. When struck by lightning, immense electrostatic current flows across the outer skin without penetrating the passenger cabin.",
    "Microwave oven shielding: The wire mesh on a microwave door has holes much smaller than the 12 cm wavelength of 2.45 GHz radiation, acting as a conducting Gaussian barrier that keeps radiation safely inside."
  ],
  practiceQuestions: [
    "Q1. Define electric flux and write its SI unit and dimensional formula. Under what condition is electric flux zero through a surface placed in an electric field?",
    "Q2. State and prove Gauss's theorem in electrostatics for a point charge enclosed by an arbitrary closed surface.",
    "Q3. A point charge q is placed at one corner of a cube of edge length a. Calculate the electric flux passing through each face of the cube.",
    "Q4. State Gauss's law in differential form and explain how it relates to Maxwell's first equation of electromagnetism."
  ],
  formulas: [
    "Electric flux definition: $\\Phi_E = \\iint_S \\vec{E} \\cdot d\\vec{A} = \\iint_S E\\cos\\theta\\,dA$",
    "Gauss's Law (integral form): $\\oint_S \\vec{E} \\cdot d\\vec{A} = \\frac{Q_{enc}}{\\varepsilon_0}$",
    "Gauss's Law (differential form): $\\vec{\\nabla} \\cdot \\vec{E} = \\frac{\\rho}{\\varepsilon_0}$",
    "Flux through one face of cube (charge at center): $\\Phi = \\frac{q}{6\\varepsilon_0}$",
    "Flux through cube (charge at corner): $\\Phi_{total} = \\frac{q}{8\\varepsilon_0}$"
  ],
  keyPoints: [
    "Electric flux is the surface integral of normal electric field: $\\Phi_E = \\int \\vec{E} \\cdot d\\vec{A}$.",
    "Total electric flux through any closed Gaussian surface equals $Q_{enc} / \\varepsilon_0$, independent of surface shape.",
    "External charges contribute zero net flux to a closed Gaussian surface.",
    "Gauss's law is valid only because Coulomb's law is an exact inverse-square law ($E \\propto 1/r^2$).",
    "In differential form, $\\vec{\\nabla} \\cdot \\vec{E} = \\rho / \\varepsilon_0$, representing Maxwell's first equation."
  ]
};
