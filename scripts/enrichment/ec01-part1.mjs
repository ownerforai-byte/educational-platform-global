import { ec01Notes } from "./ec01-notes.mjs";

export const ec01 = {
  title: "Electric Charges and Charging by Induction",
  unitSlug: "electric-charges",
  topicSlug: "electric-charges-and-charging-by-induction",
  topicTitle: "Electric charges; charging by induction",
  relevance: 100,
  notes: ec01Notes,
  confusion: [
    "Thinking induction creates new charge: Induction does not generate charge from nothing; it redistributes existing mobile valence electrons within the conductor while preserving net charge conservation of the combined system.",
    "Believing grounding always pulls electrons down to Earth: If a positively charged rod is inducing negative charge near it, grounding pulls electrons UP from the Earth into the conductor. If a negative rod is near, electrons flow DOWN into the Earth.",
    "Assuming insulators can be charged permanently by induction: Only materials with delocalized mobile charges (conductors) can be charged by induction and grounding. Insulators experience only molecular dielectric polarization."
  ],
  practice: [
    "A neutral metallic sphere on an insulating stand is to be charged with $+3.2 \\times 10^{-10}\\,\\text{C}$ using an inducing rod. (a) What sign of charge must the inducing rod carry? (b) How many electrons must be removed from the sphere? Solution: (a) To induce a net positive charge on the conductor, a negatively charged rod must be brought near it, driving electrons to ground when earthed. (b) Using quantization $q = ne$: $n = \\frac{q}{e} = \\frac{3.2 \\times 10^{-10}\\,\\text{C}}{1.602 \\times 10^{-19}\\,\\text{C}} = 2.0 \\times 10^9$ electrons transferred to Earth."
  ],
  universalFacts: [
    "Charge is an absolute relativistic invariant: an electron's charge remains exactly $1.602176634 \\times 10^{-19}\\,\\text{C}$ whether at rest in a laboratory or traveling at $99.999\\%$ the speed of light in the Large Hadron Collider.",
    "Quarks carry fractional charges ($+\\frac{2}{3}e$ and $-\\frac{1}{3}e$), but because of quantum chromodynamic color confinement, quarks never exist as isolated free particles; all observable free entities have integer charge multiples $ne$."
  ],
  animation3D: "electric-charges",
  motionGraphics: "electric-charges"
};
