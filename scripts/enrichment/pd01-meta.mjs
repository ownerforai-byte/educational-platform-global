export const pd01Meta = {
  examples: [
    "Electron gun in a cathode ray tube: Electrons accelerated through a potential difference V gain kinetic energy eV. For V = 10 kV, each electron gains 10 keV = 1.6 × 10⁻¹⁵ J, which determines the spot size on the fluorescent screen.",
    "Photocell and photoelectric effect: Incoming photons with energies quoted in electron volts (visible light ≈ 1.5–3 eV, UV up to tens of eV) eject photoelectrons only if the photon energy exceeds the work function, the basis of all photoelectric devices.",
    "Nucleosome-free grounding of tall buildings: Lightning-induced potential differences of 10⁸ V are bled harmlessly to earth through lightning rods and thick grounding strips, since $W = qV$ for a large charge at huge potential would otherwise be catastrophic."
  ],
  practiceQuestions: [
    "Q1. Define electrostatic potential at a point. State its SI unit and dimensional formula, and explain why electric potential is a scalar while electric field is a vector.",
    "Q2. Derive an expression for the potential at a point due to a point charge Q, and compare its distance dependence with that of the electric field.",
    "Q3. A charge q is brought from infinity to a point in the field of a dipole of moment p placed along the x-axis. Show that the potential energy is $U = -kq p \\cos\\theta / r^2$.",
    "Q4. An electron is accelerated from rest through a potential difference of 500 V. Calculate the energy gained in joules and in electron volts, and the resulting speed. (e = 1.6 × 10⁻¹⁹ C, m = 9.1 × 10⁻³¹ kg)"
  ],
  formulas: [
    "Potential: $V = \\frac{W}{q_0} = -\\int_\\infty^P \\vec{E} \\cdot d\\vec{r}$",
    "Potential difference: $\\Delta V = V_B - V_A = -\\int_A^B \\vec{E} \\cdot d\\vec{r}$",
    "Potential due to point charge: $V = \\frac{1}{4\\pi\\varepsilon_0}\\frac{Q}{r} = k\\frac{Q}{r}$",
    "Field–potential link: $\\vec{E} = -\\vec{\\nabla}V$",
    "Potential energy of two charges: $U = k\\frac{q_1 q_2}{r}$",
    "System potential energy: $U = k\\sum_{i<j} \\frac{q_i q_j}{r_{ij}}$",
    "Energy–work relation: $\\Delta U = -W_{electric}$",
    "Electron volt: $1\\,\\text{eV} = 1.602 \\times 10^{-19}\\,\\text{J}$"
  ],
  keyPoints: [
    "Potential V is work done per unit positive charge; SI unit is volt (1 V = 1 J/C).",
    "Potential is a path-independent scalar; electric field is a vector with direction given by -∇V.",
    "Potential due to a point charge falls as 1/r, while its electric field falls as 1/r².",
    "Like charges give positive U (repulsive, unbound); unlike charges give negative U (attractive, bound).",
    "1 eV = 1.602 × 10⁻¹⁹ J, an energy unit; 1 MeV = 10⁶ eV is standard in nuclear physics."
  ]
};
