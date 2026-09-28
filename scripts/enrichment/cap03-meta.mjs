export const cap03Meta = {
  examples: [
    "High-voltage capacitor banks: Utility power sub-stations connect capacitors in series-parallel matrices to improve power factor and withstand tens of kilovolts without breakdown.",
    "Bypass capacitor networks in ICs: A small 0.1 μF ceramic capacitor in parallel with a 10 μF electrolytic capacitor decouples both high-frequency spikes and low-frequency power supply ripple.",
    "Marx generator: Charges capacitors in parallel at low DC voltage, then rapidly switches them into series via spark gaps to produce mega-volt pulses for lightning simulation."
  ],
  practiceQuestions: [
    "Q1. Derive expressions for the equivalent capacitance of three capacitors connected (a) in series, and (b) in parallel.",
    "Q2. Two capacitors C₁ and C₂ charged to potentials V₁ and V₂ are connected in parallel. Derive the expression for the common potential and the energy dissipated during charge sharing.",
    "Q3. How would you connect three capacitors of 6 μF each to obtain an equivalent capacitance of (a) 9 μF, (b) 4 μF?",
    "Q4. Why does charge sharing between two charged capacitors always result in a net loss of electrostatic potential energy?"
  ],
  formulas: [
    "Series combination: $\\frac{1}{C_s} = \\sum_{i=1}^n \\frac{1}{C_i}$ ; for two: $C_s = \\frac{C_1 C_2}{C_1 + C_2}$",
    "Parallel combination: $C_p = \\sum_{i=1}^n C_i$",
    "Common potential on parallel connection: $V_c = \\frac{C_1 V_1 + C_2 V_2}{C_1 + C_2}$",
    "Energy dissipated on sharing charge: $\\Delta U = \\frac{1}{2}\\frac{C_1 C_2}{C_1 + C_2}(V_1 - V_2)^2$"
  ],
  keyPoints: [
    "In series connection, charge Q is identical across all capacitors, while potential divides inversely with capacitance.",
    "In parallel connection, potential difference V is identical across all branches, while charge distributes directly proportional to capacitance.",
    "Common potential is determined by total charge divided by total capacitance.",
    "Energy loss during charge sharing depends quadratically on initial voltage difference (V₁ - V₂)²."
  ]
};
