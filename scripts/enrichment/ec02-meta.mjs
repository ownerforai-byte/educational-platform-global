export const ec02Meta = {
  examples: [
    "Ionic lattice cohesion in minerals: Table salt crystals ($NaCl$) are held together by Coulomb attraction between alternating $Na^+$ cations and $Cl^-$ anions, providing a high melting point of 801 °C.",
    "Atomic electron orbitals: In Bohr's model of the hydrogen atom, the electrostatic Coulomb attraction between the single proton nucleus and orbiting electron ($F = \\frac{e^2}{4\\pi\\varepsilon_0 r^2}$) provides the required centripetal acceleration ($m v^2 / r$).",
    "Dissolution in polar solvents: The high dielectric constant of liquid water ($\\kappa \\approx 80$) reduces ionic attraction by a factor of 80, permitting thermal agitation to break ionic bonds and dissolve salts."
  ],
  practiceQuestions: [
    "Q1. State Coulomb's law in electrostatics. Express it in vector form and show that it satisfies Newton's third law of motion.",
    "Q2. Define the SI unit of electric charge (1 Coulomb) in terms of Coulomb's law.",
    "Q3. Two point charges $+4q$ and $+q$ are fixed at a distance $L$ apart. Where should a third charge $Q$ be placed on the line joining them so that the entire system remains in electrostatic equilibrium?",
    "Q4. Explain the principle of linear superposition of electrostatic forces and describe how to calculate the net force on a charge located at the vertex of an equilateral triangle with charges at the other two vertices."
  ],
  formulas: [
    "Coulomb's Law (magnitude): $F = \\frac{1}{4\\pi\\varepsilon_0} \\frac{|q_1 q_2|}{r^2}$",
    "Coulomb's Law (vector form): $\\vec{F}_{12} = \\frac{1}{4\\pi\\varepsilon_0} \\frac{q_1 q_2}{r^2}\\hat{r}_{21} = -\\vec{F}_{21}$",
    "Force in dielectric medium: $F_m = \\frac{F_0}{\\varepsilon_r} = \\frac{F_0}{\\kappa} = \\frac{1}{4\\pi\\kappa\\varepsilon_0} \\frac{|q_1 q_2|}{r^2}$",
    "Principle of Superposition: $\\vec{F}_{net} = \\sum_{i=1}^N \\vec{F}_i$",
    "Proportionality constant in vacuum: $k = \\frac{1}{4\\pi\\varepsilon_0} \\approx 8.99 \\times 10^9\\,\\text{N}\\cdot\\text{m}^2/\\text{C}^2$"
  ],
  keyPoints: [
    "Coulomb's law is an inverse-square central force acting along the line connecting two stationary point charges.",
    "Vector formulation demonstrates mutual symmetry: $\\vec{F}_{12} = -\\vec{F}_{21}$, fulfilling Newton's third law.",
    "Presence of a dielectric medium with relative permittivity $\\kappa > 1$ reduces electrostatic force by a factor of $\\kappa$.",
    "The principle of superposition allows independent pairwise summation of forces in multi-charge configurations.",
    "Earnshaw's theorem establishes that stable electrostatic equilibrium of stationary point charges is impossible without non-electrostatic constraints."
  ]
};
