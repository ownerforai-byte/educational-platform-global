import { writeDual } from "./enrich-helper.mjs";
import { cap03 } from "./cap03-part1.mjs";
import { cap03Meta } from "./cap03-meta.mjs";

const fullCap03 = {
  ...cap03,
  ...cap03Meta,
  summary: "Capacitors in series share identical charge with reciprocal addition 1/C_s = ∑ 1/C_i, yielding an equivalent capacitance smaller than any individual unit. Capacitors in parallel share identical voltage with direct addition C_p = ∑ C_i, maximizing charge storage. When two charged capacitors are coupled in parallel, charges redistribute to a common potential V_c = (C₁V₁ + C₂V₂) / (C₁ + C₂), accompanied by energy loss ΔU = ½ [C₁C₂/(C₁+C₂)](V₁ - V₂)² dissipated as heat.",
  specialNotes: [
    "To obtain 9 μF from three 6 μF capacitors: connect two in parallel (12 μF) in series with the third: (12 × 6)/(12 + 6) = 4 μF. For 9 μF: two in series (3 μF) in parallel with the third: 3 + 6 = 9 μF.",
    "For N identical capacitors of capacitance C: Series combination yields C/N; Parallel combination yields NC. The ratio C_p / C_s = N²."
  ],
  importantStatements: [
    "Statement 1: In a series combination of capacitors, each capacitor carries the same magnitude of electric charge regardless of its capacitance.",
    "Statement 2: The equivalent capacitance of a series combination is always less than the smallest capacitance in the group.",
    "Statement 3: In a parallel combination of capacitors, the potential difference across every individual capacitor is equal to the applied terminal voltage.",
    "Statement 4: When two capacitors are joined in parallel, total electric charge is conserved, but total electrostatic energy decreases.",
    "Statement 5: The ratio of equivalent parallel capacitance to equivalent series capacitance for N identical capacitors is N²."
  ],
  importantNotes: [
    "In bridge networks of capacitors, if C₁/C₂ = C₃/C₄, the bridge is balanced; no charge flows through the diagonal branch, which can be removed from calculation."
  ],
  examShortTricks: [
    "Two capacitors in series: product over sum $C_s = (C_1 C_2) / (C_1 + C_2)$.",
    "Energy loss is always positive: $\\Delta U \\ge 0$, vanishing only when initial voltages are already identical ($V_1 = V_2$).",
    "Ratio $C_p / C_s = N^2$ for $N$ identical capacitors."
  ],
  examNotes: [
    "Derivation of common potential and electrostatic energy loss on sharing charges is a prominent 4-mark derivation in NEB exams."
  ],
  mcs: [
    {
      question: "Three capacitors of capacitance 3 μF each are connected in series. The equivalent capacitance of the combination is:",
      options: [
        "9 μF",
        "1 μF",
        "3 μF",
        "0.33 μF"
      ],
      answer: "B",
      explanation: "In series, 1/C_s = 1/3 + 1/3 + 1/3 = 3/3 = 1 μF⁻¹, giving C_s = 1 μF."
    },
    {
      question: "When two charged capacitors at different potentials are connected together by a conducting wire, which quantity is conserved?",
      options: [
        "Total electrostatic energy only",
        "Total electric charge only",
        "Both total charge and total energy",
        "Neither charge nor energy"
      ],
      answer: "B",
      explanation: "Electric charge is strictly conserved by the law of conservation of charge. Electrostatic potential energy decreases due to dissipation as heat during current flow."
    },
    {
      question: "The ratio of equivalent capacitance in parallel to that in series for n identical capacitors is:",
      options: [
        "n",
        "1/n",
        "n²",
        "1/n²"
      ],
      answer: "C",
      explanation: "C_p = nC and C_s = C/n. Therefore C_p / C_s = nC / (C/n) = n²."
    }
  ],
  importantConcepts: [
    "Series combination: charge invariance and reciprocal capacitance summation.",
    "Parallel combination: voltage invariance and direct linear capacitance summation.",
    "Derivation of common potential V_c and energy loss formula ΔU."
  ],
  importantTasks: [
    "Derive equivalent capacitance formulas for series and parallel networks.",
    "Derive the common potential V_c and energy loss ΔU when two capacitors share charge.",
    "Solve mixed bridge and ladder capacitor network numerical problems."
  ],
  duplicateType: 1,
  visualType: "parallel-plate-capacitor"
};

writeDual(
  "physics/capacitor/03-combination-of-capacitors.json",
  "class-11-notes/physics/capacitor/concepts/03-combination-of-capacitors.json",
  fullCap03
);
writeDual(
  "physics/capacitor/02-combination-capacitors-2.json",
  "class-11-notes/physics/capacitor/concepts/02-combination-capacitors.json",
  { ...fullCap03, duplicateType: 2, tabGroup: "combination-of-capacitors" }
);
