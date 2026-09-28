import { ef01Notes } from "./ef01-notes.mjs";

export const ef01 = {
  title: "Electric Field Due to Point Charges and Field Lines",
  unitSlug: "electric-field",
  topicSlug: "electric-field-due-to-point-charges-and-field-lines",
  topicTitle: "Electric field due to point charges and field lines",
  relevance: 100,
  notes: ef01Notes,
  confusion: [
    "Confusing field line direction with trajectory of a moving charge: An electric field line represents the direction of electrostatic force on a stationary positive charge, NOT the trajectory of a moving charge. A moving charge accelerates along $\\vec{F} = q\\vec{E}$, so velocity and field vectors generally diverge due to inertia.",
    "Assuming field lines can intersect: If two field lines crossed, a test charge at the intersection would experience two distinct electrostatic forces in different directions simultaneously, which violates the uniqueness theorem of vector fields.",
    "Confusing the radial fall-off of dipoles versus point charges: Point charge field scales as $1/r^2$, whereas an electric dipole field decays as $1/r^3$ because the positive and negative charges largely cancel each other out at long distances ($r \\gg a$)."
  ],
  practice: [
    "Two point charges $q_1 = +5.0\\,\\mu\\text{C}$ and $q_2 = -5.0\\,\\mu\\text{C}$ are separated by $10\\text{ cm}$ along the x-axis ($2a = 0.1\\text{ m}$). (a) Find the electric dipole moment. (b) Find the electric field magnitude at an axial point $20\\text{ cm}$ from the dipole center. Solution: (a) $p = q(2a) = (5.0 \\times 10^{-6}\\text{ C})(0.1\\text{ m}) = 5.0 \\times 10^{-7}\\,\\text{C}\\cdot\\text{m}$. (b) Using the axial field formula with $r = 0.2\\text{ m}$ ($r \\gg a$ approximation): $E_{axial} = \\frac{1}{4\\pi\\varepsilon_0} \\frac{2p}{r^3} = \\frac{(9 \\times 10^9)(2 \\times 5.0 \\times 10^{-7})}{(0.2)^3} = \\frac{9000}{0.008} = 1.125 \\times 10^6\\,\\text{N/C}$, directed along the dipole axis in the direction of $\\vec{p}$."
  ],
  universalFacts: [
    "The terrestrial fair-weather atmosphere maintains a downward-directed vertical electric field of approximately $100\\,\\text{to}\\,150\\,\\text{V/m}$ near the Earth's surface due to the global electrical thunderstorm battery circuit.",
    "Electric fields in nerve cells (action potentials) reach immense intensities of roughly $10^7\\,\\text{V/m}$ across thin ($7\\text{ nm}$) phospholipid bilayer cell membranes, driving ion pumps that enable animal thought and heartbeat."
  ],
  animation3D: "electric-field",
  motionGraphics: "electric-field"
};
