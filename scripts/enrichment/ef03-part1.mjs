import { ef03Notes } from "./ef03-notes.mjs";

export const ef03 = {
  title: "Applications of Gauss's Law",
  unitSlug: "electric-field",
  topicSlug: "applications-of-gauss-law",
  topicTitle: "Applications of Gauss's law",
  relevance: 100,
  notes: ef03Notes,
  confusion: [
    "Confusing field of a non-conducting infinite sheet with a conducting plate: An isolated non-conducting sheet has $E = \\frac{\\sigma}{2\\varepsilon_0}$ on both sides because charge is embedded in a single layer. A conducting plate has charge on two separate faces; just outside any conducting surface, the boundary condition gives $E = \\frac{\\sigma}{\\varepsilon_0}$.",
    "Assuming field inside a charged sphere is always zero: Inside a hollow shell or conductor, $E = 0$. However, inside a uniformly charged *non-conducting solid sphere*, the field increases linearly with radius: $E = \\frac{\\rho r}{3\\varepsilon_0} = \\frac{k Q r}{R^3}$.",
    "Neglecting Gaussian end-caps in line charge: Students often forget to justify why the two flat circular ends of a Gaussian cylinder contribute zero flux (because $\\vec{E} \\perp d\\vec{A}$, making $\\vec{E} \\cdot d\\vec{A} = 0$)."
  ],
  practice: [
    "An infinite line of charge produces an electric field of $9.0 \\times 10^4\\,\\text{N/C}$ at a perpendicular distance of $2.0\\text{ cm}$ in air. Calculate the linear charge density $\\lambda$. Solution: The electric field of a long wire is $E = \\frac{\\lambda}{2\\pi\\varepsilon_0 r} = \\frac{2k\\lambda}{r}$. Rearranging for $\\lambda$: $\\lambda = \\frac{E \\cdot r}{2k} = \\frac{(9.0 \\times 10^4\\,\\text{N/C})(0.02\\text{ m})}{2 \\times (9.0 \\times 10^9\\,\\text{N}\\cdot\\text{m}^2/\\text{C}^2)} = \\frac{1800}{1.8 \\times 10^{10}} = 1.0 \\times 10^{-7}\\,\\text{C/m} = 0.10\\,\\mu\\text{C/m}$."
  ],
  universalFacts: [
    "Electrostatic shielding (Faraday cage effect) is an exact consequence of Gauss's law: because $E = 0$ inside any empty conducting cavity, sensitive electronics or occupants in an automobile or airplane are immune to external high-voltage discharges and lightning.",
    "The linear dependence of electric field $E \\propto r$ inside a uniform non-conducting charge sphere is mathematically identical to the gravitational acceleration $g(r) \\propto r$ inside a hypothetical uniform planetary Earth."
  ],
  animation3D: "electric-field",
  motionGraphics: "electric-field"
};
