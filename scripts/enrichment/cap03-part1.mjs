export const cap03 = {
  title: "Combination of Capacitors",
  unitSlug: "capacitor",
  topicSlug: "combination-of-capacitors",
  topicTitle: "Combination of capacitors",
  relevance: 100,
  notes: [
    "**Series Combination Theory:** In a series arrangement, capacitors $C_1, C_2, \\dots, C_n$ are connected end-to-end such that an identical magnitude of charge $Q$ is deposited on each plate via electrostatic induction. The total applied voltage across the combination is the sum of individual potential drops: $V = V_1 + V_2 + \\dots + V_n$.",
    "**Equivalent Capacitance (Series):** Since $V_i = \\frac{Q}{C_i}$, substituting yields $V = Q(\\frac{1}{C_1} + \\frac{1}{C_2} + \\dots + \\frac{1}{C_n})$. For an equivalent capacitor $C_s$, $V = \\frac{Q}{C_s}$. Equating gives $\\frac{1}{C_s} = \\frac{1}{C_1} + \\frac{1}{C_2} + \\dots + \\frac{1}{C_n}$. For two capacitors: $C_s = \\frac{C_1 C_2}{C_1 + C_2}$. The equivalent capacitance is always strictly smaller than the smallest individual capacitor in series.",
    "**Voltage Division in Series:** The potential drop across any capacitor in series is inversely proportional to its capacitance: $V_i \\propto \\frac{1}{C_i}$. For two capacitors: $V_1 = \\frac{C_2}{C_1 + C_2}V$ and $V_2 = \\frac{C_1}{C_1 + C_2}V$.",
    "**Parallel Combination Theory:** In a parallel arrangement, the positive plates of all capacitors are connected to a common terminal and negative plates to another common terminal. Consequently, the potential difference across every capacitor is identical ($V$), while the total charge supplied by the source splits among them: $Q = Q_1 + Q_2 + \\dots + Q_n$.",
    "**Equivalent Capacitance (Parallel):** Substituting $Q_i = C_i V$ gives $Q = (C_1 + C_2 + \\dots + C_n)V$. For an equivalent capacitor $C_p$, $Q = C_p V$. Hence, $C_p = C_1 + C_2 + \\dots + C_n$. The equivalent capacitance in parallel is always larger than the greatest individual capacitor in the network.",
    "**Redistribution of Charge & Loss of Energy:** When two isolated capacitors carrying charges $Q_1 = C_1 V_1$ and $Q_2 = C_2 V_2$ are connected in parallel, charge flows until both reach a common potential $V_c = \\frac{\\text{Total charge}}{\\text{Total capacitance}} = \\frac{C_1 V_1 + C_2 V_2}{C_1 + C_2}$. During charge sharing, some electrostatic energy is irrevocably dissipated as heat and electromagnetic radiation through connecting wires: $\\Delta U = U_i - U_f = \\frac{1}{2}\\frac{C_1 C_2}{C_1 + C_2}(V_1 - V_2)^2 > 0$."
  ],
  confusion: [
    "Confusing series/parallel capacitor rules with resistor rules: Capacitors add directly in parallel ($C_p = \\sum C_i$) and reciprocally in series ($1/C_s = \\sum 1/C_i$), which is the exact mathematical inverse of resistors ($R_s = \\sum R_i$, $1/R_p = \\sum 1/R_i$).",
    "Assuming energy is conserved during charge sharing: While total charge is strictly conserved ($\sum Q_i = \\text{const}$), electrostatic potential energy is NOT conserved. $\\Delta U = \\frac{1}{2}\\frac{C_1 C_2}{C_1+C_2}(V_1-V_2)^2$ is always lost as Joule heat in connecting leads and radiation, regardless of wire resistance.",
    "Incorrect polarity connection: If opposite-polarity terminals are joined (positive of $C_1$ to negative of $C_2$), initial net charge is $|C_1 V_1 - C_2 V_2|$, yielding $V_c = \\frac{|C_1 V_1 - C_2 V_2|}{C_1 + C_2}$ and greater energy loss: $\\Delta U = \\frac{1}{2}\\frac{C_1 C_2}{C_1 + C_2}(V_1 + V_2)^2$."
  ],
  practice: [
    "Three capacitors of $2\\,\\mu\\text{F}$, $3\\,\\mu\\text{F}$, and $6\\,\\mu\\text{F}$ are connected (a) in series, (b) in parallel across $100\\text{ V}$. Find $C_{eq}$ and charge in each case. Solution: (a) Series: $\\frac{1}{C_s} = \\frac{1}{2} + \\frac{1}{3} + \\frac{1}{6} = \\frac{3+2+1}{6} = 1 \\implies C_s = 1\\,\\mu\\text{F}$. Charge $Q = C_s V = 10^{-6} \\times 100 = 100\\,\\mu\\text{C}$ on each. (b) Parallel: $C_p = 2 + 3 + 6 = 11\\,\\mu\\text{F}$. Total charge $Q = 11 \\times 100 = 1100\\,\\mu\\text{C}$.",
    "A $4\\,\\mu\\text{F}$ capacitor is charged to $200\\text{ V}$ and then connected in parallel with an uncharged $2\\,\\mu\\text{F}$ capacitor. Find common potential and energy lost. Solution: $V_c = \\frac{C_1 V_1 + C_2 (0)}{C_1 + C_2} = \\frac{4 \\times 200}{4 + 2} = \\frac{800}{6} = 133.33\\text{ V}$. Energy lost $\\Delta U = \\frac{1}{2}\\frac{C_1 C_2}{C_1 + C_2}(V_1 - 0)^2 = \\frac{1}{2}\\frac{4 \\times 2}{6} \\times 10^{-6} \\times (200)^2 = \\frac{4}{6} \\times 10^{-6} \\times 40000 = 0.0267\\text{ J} = 26.7\\text{ mJ}$."
  ],
  universalFacts: [
    "The energy loss formula $\\Delta U = \\frac{1}{2}\\frac{C_1 C_2}{C_1 + C_2}(V_1 - V_2)^2$ holds true even for ideal superconducting zero-resistance connecting wires, where the missing energy is radiated away as electromagnetic waves.",
    "Connecting identical capacitors in series of $N$ units increases the breakdown voltage rating by factor $N$ while reducing overall capacitance to $C/N$."
  ],
  animation3D: "capacitor",
  motionGraphics: "capacitor"
};
