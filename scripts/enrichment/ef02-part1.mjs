import { ef02Notes } from "./ef02-notes.mjs";

export const ef02 = {
  title: "Gauss's Law and Electric Flux",
  unitSlug: "electric-field",
  topicSlug: "gauss-law-and-electric-flux",
  topicTitle: "Gauss's law and electric flux",
  relevance: 100,
  notes: ef02Notes,
  confusion: [
    "Thinking electric flux requires an actual physical fluid to flow: Electric flux is purely a geometric measure of field line penetration across a surface, not a transfer of physical mass or fluid.",
    "Believing that zero net flux implies zero electric field everywhere: If a Gaussian surface encloses zero net charge, $\\oint \\vec{E} \\cdot d\\vec{A} = 0$, but the electric field $\\vec{E}$ at points on the surface need not be zero (e.g., an uncharged sphere placed in a uniform external field has entering flux equal to exiting flux).",
    "Confusing the field $\\vec{E}$ in Gauss's law with the field produced only by enclosed charges: $\\vec{E}$ in the integral $\\oint \\vec{E} \\cdot d\\vec{A}$ is the total resultant electric field produced by ALL charges in the universe, whereas the right-hand side $Q_{enc}$ counts strictly enclosed charges."
  ],
  practice: [
    "A point charge $q = +8.854\\,\\text{nC}$ is placed at the center of an imaginary cube of side $10\\text{ cm}$. (a) Calculate the total electric flux emerging through the entire surface of the cube. (b) Find the electric flux passing through each of the six individual faces of the cube. Solution: (a) By Gauss's Law, total flux through the closed cube is $\\Phi_{total} = \\frac{q}{\\varepsilon_0} = \\frac{8.854 \\times 10^{-9}\\,\\text{C}}{8.854 \\times 10^{-12}\\,\\text{C}^2/(\\text{N}\\cdot\\text{m}^2)} = 1000\\,\\text{N}\\cdot\\text{m}^2/\\text{C}$. (b) By symmetry, the charge is equidistant from all six faces, so flux distributes equally: $\\Phi_{face} = \\frac{\\Phi_{total}}{6} = \\frac{1000}{6} = 166.7\\,\\text{N}\\cdot\\text{m}^2/\\text{C}$."
  ],
  universalFacts: [
    "Gauss's law is mathematically equivalent to the inverse-square power in Coulomb's law. If Coulomb's force varied as $1/r^{2+\\delta}$, Gauss's law would break down because flux through concentric spheres would depend on their radius.",
    "Gauss's law for magnetism is $\\oint \\vec{B} \\cdot d\\vec{A} = 0$, signifying that magnetic field lines never originate or terminate on isolated sources; magnetic monopoles have never been observed in nature."
  ],
  animation3D: "electric-field",
  motionGraphics: "electric-field"
};
