import { pd01Notes } from "./pd01-notes.mjs";

export const pd01 = {
  title: "Potential Difference, Potential Due to a Point Charge, Potential Energy and Electron Volt",
  unitSlug: "potential-potential-difference-and-potential-energy",
  topicSlug: "potential-difference-potential-due-to-point-charge-potential-energy-and-electron-volt",
  topicTitle: "Potential difference, potential due to point charge, potential energy and electron volt",
  relevance: 100,
  notes: pd01Notes,
  confusion: [
    "Treating potential as a vector and adding components: Potential V is a scalar. Only in a region with a clear directional symmetry (e.g. along the axis of a line charge) is it meaningful to write $V = -Ex$; you must never resolve V into vector components like x, y, z components.",
    "Confusing potential difference with potential: Potential difference is a change $\\Delta V = V_B - V_A$ between two points and can be positive or negative. Potential V itself is defined relative to infinity ($V_\\infty = 0$), so a positive charge gives positive V while an electron gives negative V.",
    "Believing the electron volt is a unit of charge or potential: The electron volt (eV) is a unit of ENERGY, defined as the energy of a charge of magnitude e accelerated through 1 V. 1 eV = 1.602 × 10⁻¹⁹ J.",
    "Computing total potential energy by summing over all ordered pairs (i, j) instead of distinct pairs (i < j): Every interaction must be counted exactly once; summing both $q_i q_j$ and $q_j q_i$ double-counts each pair energy."
  ],
  practice: [
    "Two charges $q_1 = +2\\,\\mu\\text{C}$ and $q_2 = -3\\,\\mu\\text{C}$ are separated by $30\\,\\text{cm}$ in vacuum. (a) Find the potential at the midpoint. (b) Find the potential energy of the system. Solution: (a) At the midpoint, $r_1 = r_2 = 0.15\\,\\text{m}$, so $V = k\\left(\\frac{q_1}{r_1} + \\frac{q_2}{r_2}\\right) = (9 \\times 10^9)\\left(\\frac{2 \\times 10^{-6} - 3 \\times 10^{-6}}{0.15}\\right) = (9 \\times 10^9)\\left(\\frac{-1 \\times 10^{-6}}{0.15}\\right) = (9 \\times 10^9)(-6.67 \\times 10^{-6}) = -6.0 \\times 10^4\\,\\text{V}$. (b) $U = k\\frac{q_1 q_2}{r} = (9 \\times 10^9)\\frac{(2 \\times 10^{-6})(-3 \\times 10^{-6})}{0.30} = (9 \\times 10^9)(-2 \\times 10^{-11}) = -1.8 \\times 10^{-1}\\,\\text{J} = -0.18\\,\\text{J}$."
  ],
  universalFacts: [
    "The electron volt is named after the electron but is a universal energy unit: an alpha particle with charge +2e accelerated through 1 V gains 2 eV, while a proton accelerated through the same 1 V gains 1 eV.",
    "The resting membrane potential of a human nerve axon (about −70 mV measured inside relative to outside) corresponds to a stored energy of roughly 1.1 × 10⁻¹⁰ J per ion crossing the membrane, which is the physical basis of neural signaling."
  ],
  animation3D: "potential-potential-difference-and-potential-energy",
  motionGraphics: "potential-potential-difference-and-potential-energy"
};
