import { writeDual } from "./enrich-helper.mjs";
import { cap04 } from "./cap04-part1.mjs";
import { cap04Meta } from "./cap04-meta.mjs";

const fullCap04 = {
  ...cap04,
  ...cap04Meta,
  summary: "The electrostatic energy stored in a charged capacitor is the total mechanical work done against mutual charge repulsion during charging, expressed as U = ½ CV² = Q² / (2C) = ½ QV. A battery of EMF V does total work W = QV, meaning 50% is stored while 50% is dissipated as heat. The energy is distributed throughout the space occupied by the electric field with uniform electrostatic energy density u = ½ ε₀ E².",
  specialNotes: [
    "When plates of an isolated charged capacitor are separated further from d to 2d, capacitance halves to C/2. Stored energy U = Q² / (2C) doubles. The increase in energy ΔU = U_initial comes directly from the external mechanical work done pulling apart the oppositely charged attractive plates.",
    "When plate separation is doubled while connected to a battery, voltage V remains constant. Capacitance halves, so stored energy U = ½ CV² is halved."
  ],
  importantStatements: [
    "Statement 1: The electrostatic potential energy of a capacitor is stored in the electric field existing between its conducting plates.",
    "Statement 2: The total work done in charging a capacitor to charge Q at potential V is U = ½ QV.",
    "Statement 3: Regardless of the resistance in the charging circuit, exactly half of the energy delivered by the charging source is dissipated as heat.",
    "Statement 4: The electrostatic energy density in vacuum is proportional to the square of the electric field intensity (u = ½ ε₀ E²).",
    "Statement 5: For an isolated capacitor, external mechanical work performed against plate attraction increases stored electrostatic energy."
  ],
  importantNotes: [
    "Always identify if Q or V is constant when evaluating work and energy changes: use U = Q²/(2C) when isolated (Q constant); use U = ½ CV² when connected (V constant)."
  ],
  examShortTricks: [
    "Average voltage trick: $W = Q \\times V_{avg} = Q \\times \\frac{V}{2} = \\frac{1}{2}QV$.",
    "Battery work is always double stored capacitor energy: $W_{battery} = 2 U_{cap}$.",
    "Energy density is quadratic with field: doubling $E$ quadruples energy density $u$."
  ],
  examNotes: [
    "Derivation of $U = \\frac{1}{2}CV^2$ by integration and subsequent derivation of energy density $u = \\frac{1}{2}\\varepsilon_0 E^2$ is an essential 3 to 4-mark question in NEB exams."
  ],
  mcs: [
    {
      question: "The energy stored in a capacitor of capacitance C charged to potential V is given by:",
      options: [
        "CV",
        "½ CV²",
        "2 CV²",
        "½ C² V"
      ],
      answer: "B",
      explanation: "U = ∫ (q/C) dq = Q² / (2C) = ½ CV²."
    },
    {
      question: "When a capacitor is charged directly by a battery of EMF V, what fraction of energy supplied by the battery is lost as heat?",
      options: [
        "0%",
        "25%",
        "50%",
        "100%"
      ],
      answer: "C",
      explanation: "The battery does work W = QV = CV². The capacitor stores U = ½ CV². The fraction lost is (W - U)/W = (CV² - ½ CV²)/CV² = 50%."
    },
    {
      question: "The plates of an isolated charged parallel plate capacitor are pulled further apart. The electrostatic potential energy stored in the capacitor:",
      options: [
        "increases",
        "decreases",
        "remains constant",
        "becomes zero"
      ],
      answer: "A",
      explanation: "Since the capacitor is isolated, charge Q is constant. Capacitance C = ε₀A/d decreases as d increases. Thus U = Q²/(2C) increases because external work is done against the attractive force of the plates."
    }
  ],
  importantConcepts: [
    "Integration derivation of electrostatic potential energy U = Q² / (2C) = ½ CV².",
    "Partition of battery work: 50% stored, 50% dissipated as heat.",
    "Derivation of electrostatic energy density u = ½ ε₀ E²."
  ],
  importantTasks: [
    "Derive U = ½ CV² using calculus dW = v dq.",
    "Derive energy density u = ½ ε₀ E² for a parallel plate capacitor.",
    "Calculate energy changes and work done when plate separation is altered under connected vs isolated conditions."
  ],
  duplicateType: 1,
  visualType: "parallel-plate-capacitor"
};

writeDual(
  "physics/capacitor/04-energy-of-a-charged-capacitor.json",
  "class-11-notes/physics/capacitor/concepts/04-energy-of-a-charged-capacitor.json",
  fullCap04
);
writeDual(
  "physics/capacitor/03-energy-charged-capacitor.json",
  "class-11-notes/physics/capacitor/concepts/03-energy-charged-capacitor.json",
  { ...fullCap04, duplicateType: 2, tabGroup: "energy-of-a-charged-capacitor" }
);
writeDual(
  "physics/capacitor/03-energy-charged-capacitor-2.json",
  "class-11-notes/physics/capacitor/concepts/03-energy-charged-capacitor.json",
  { ...fullCap04, duplicateType: 2, tabGroup: "energy-of-a-charged-capacitor" }
);
