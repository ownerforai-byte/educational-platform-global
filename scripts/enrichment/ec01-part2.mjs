import { writeDual } from "./enrich-helper.mjs";
import { ec01 } from "./ec01-part1.mjs";
import { ec01Meta } from "./ec01-meta.mjs";

const fullEc01 = {
  ...ec01,
  ...ec01Meta,
  summary: "Electric charge is a fundamental, quantized ($q = ne$), and conserved property of matter. Objects can be charged by triboelectric friction, conduction, or electrostatic induction. Charging by induction polarizes mobile electrons in an insulated conductor; momentary grounding allows electron exchange with Earth, permanently trapping an opposite net charge on the conductor without losing inducing charge.",
  specialNotes: [
    "Grounding must be removed BEFORE withdrawing the inducing charged body; otherwise, mobile charges equalize back through ground, leaving the sphere neutral.",
    "Repulsion is the only sure test of electrification because an uncharged body can be attracted by a charged body due to electrostatic polarization."
  ],
  importantStatements: [
    "Statement 1: Electric charge is quantized, meaning it exists only in integral multiples of the fundamental charge e = 1.602 × 10⁻¹⁹ C.",
    "Statement 2: The total electric charge of an isolated system remains constant over time regardless of physical or chemical reactions.",
    "Statement 3: Electrostatic induction allows charging a conductor with a sign opposite to that of the inducing charged object without physical contact.",
    "Statement 4: Repulsion is the definitive test of electrification, since neutral matter is attracted to any charged body by polarization.",
    "Statement 5: Charge is invariant under relativistic transformations, independent of the relative velocity of the frame of reference."
  ],
  importantNotes: [
    "Remember that in conductors, only negative charges (free conduction electrons) physically move; positive ionic cores remain fixed in the crystal lattice."
  ],
  examShortTricks: [
    "Quantization check: divide given charge Q by 1.6 × 10⁻¹⁹ C; if n is not an integer, the charge is physically impossible.",
    "Induction charge sign: Induced net charge on conductor is ALWAYS opposite to the sign of the inducing rod.",
    "Identical spheres contact trick: Touching identical spheres of charges q₁ and q₂ redistributes charge equally to (q₁ + q₂)/2 each."
  ],
  examNotes: [
    "Explaining the four steps of charging a sphere by induction with neatly labeled diagrams is a frequent 3-mark NEB Board question."
  ],
  mcs: [
    {
      question: "Which of the following charges cannot exist on an isolated physical body?",
      options: [
        "3.2 × 10⁻¹⁹ C",
        "4.8 × 10⁻¹⁹ C",
        "2.4 × 10⁻¹⁹ C",
        "6.4 × 10⁻¹⁹ C"
      ],
      answer: "C",
      explanation: "From quantization q = ne, n = (2.4 × 10⁻¹⁹) / (1.6 × 10⁻¹⁹) = 1.5, which is not an integer. Therefore, this charge cannot exist."
    },
    {
      question: "Charging a metallic sphere by induction using a positively charged glass rod leaves the sphere:",
      options: [
        "positively charged",
        "negatively charged",
        "uncharged",
        "either positive or negative depending on sphere size"
      ],
      answer: "B",
      explanation: "A positively charged rod attracts electrons from ground during the earthing phase, leaving the sphere with an excess of electrons (negatively charged)."
    },
    {
      question: "The surest test to confirm whether a body is electrified is:",
      options: [
        "attraction",
        "repulsion",
        "polarization",
        "earthing"
      ],
      answer: "B",
      explanation: "Repulsion occurs exclusively between two bodies carrying like charges. Attraction can also occur between a charged body and a neutral body via polarization."
    }
  ],
  importantConcepts: [
    "Quantization and conservation of electric charge.",
    "Step-by-step mechanism of electrostatic induction and earthing.",
    "Origin of triboelectric series and conduction charge sharing.",
    "Gold-leaf electroscope working and repulsion as the sure test of electrification."
  ],
  importantTasks: [
    "Draw sequential schematic diagrams showing charging a conductor by induction.",
    "Calculate electron deficiency or excess for a given charge magnitude.",
    "Compute resulting charges when identical conductors are touched and separated."
  ],
  duplicateType: 1,
  visualType: "electric-charges"
};

// Write canonical Topic 1
writeDual(
  "physics/electric-charges/01-electric-charges-and-charging-by-induction.json",
  "class-11-notes/physics/electric-charges/concepts/01-electric-charges-and-charging-by-induction.json",
  fullEc01
);

// Write variant duplicateType: 2 files
writeDual(
  "physics/electric-charges/01-electric-charges-induction.json",
  "class-11-notes/physics/electric-charges/concepts/01-electric-charges-induction.json",
  {
    ...fullEc01,
    title: "Electric Charges and Induction",
    topicSlug: "electric-charges-induction",
    duplicateType: 2,
    tabGroup: "electric-charges-and-charging-by-induction"
  }
);

writeDual(
  "physics/electric-charges/01-electric-charges-induction-2.json",
  "class-11-notes/physics/electric-charges/concepts/01-electric-charges-induction.json",
  {
    ...fullEc01,
    title: "Electric Charges and Induction",
    topicSlug: "electric-charges-induction",
    duplicateType: 2,
    tabGroup: "electric-charges-and-charging-by-induction"
  }
);
