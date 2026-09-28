import { writeDual } from "./enrich-helper.mjs";
import { cap02 } from "./cap02-part1.mjs";
import { cap02Meta } from "./cap02-meta.mjs";

const fullCap02 = {
  ...cap02,
  ...cap02Meta,
  summary: "A parallel plate capacitor consists of two planar conductors of area A separated by distance d. Gauss's Law determines the uniform internal electric field E = σ/ε₀ = Q/(ε₀A), yielding capacitance C₀ = ε₀A/d. Introducing a dielectric slab of thickness t weakens the field across t via polarization, giving C = ε₀A / [d - t(1 - 1/κ)]. The electrostatic attraction between the plates is F = Q²/(2ε₀A).",
  specialNotes: [
    "When a conducting slab of thickness t (t < d) is inserted, κ → ∞, so C = ε₀A / (d - t). If t = d, the plates short-circuit.",
    "If multiple dielectric slabs of thicknesses t₁, t₂ with constants κ₁, κ₂ fill the gap, C = ε₀A / (t₁/κ₁ + t₂/κ₂)."
  ],
  importantStatements: [
    "Statement 1: The electric field between two infinite oppositely charged parallel plates is uniform and equal to σ/ε₀.",
    "Statement 2: The capacitance of a parallel plate capacitor with air is given by C = ε₀A/d.",
    "Statement 3: Inserting a dielectric slab of thickness t increases capacitance by reducing the effective plate separation by t(1 - 1/κ).",
    "Statement 4: For an isolated charged capacitor, the attractive force between plates does not change when plate separation is altered.",
    "Statement 5: Fringing fields at plate edges lead to a slightly higher actual capacitance than predicted by C = ε₀A/d."
  ],
  importantNotes: [
    "Remember the fundamental difference between inserting a dielectric with battery connected (V constant, C↑, Q↑, U↑) versus disconnected (Q constant, C↑, V↓, U↓)."
  ],
  examShortTricks: [
    "Dielectric slab formula trick: effective air distance becomes d_eff = d - t + t/κ.",
    "Conducting slab trick: effective distance becomes d_eff = d - t.",
    "Attractive force: F = ½ Q E_total = ½ Q (V/d)."
  ],
  examNotes: [
    "Derivation of C = ε₀A / [d - t(1 - 1/κ)] is one of the most frequently asked long questions in the NEB Class 11 Physics board exam (4 marks)."
  ],
  mcs: [
    {
      question: "The capacitance of a parallel plate capacitor does NOT depend on:",
      options: [
        "area of the plates",
        "medium between plates",
        "distance between plates",
        "metal material of the plates"
      ],
      answer: "D",
      explanation: "Capacitance depends strictly on geometry (area, separation) and dielectric medium (permittivity), not on the metal composition of the conducting plates."
    },
    {
      question: "If a copper sheet of thickness t = d/2 is placed between plates of separation d, the new capacitance is:",
      options: [
        "halved",
        "doubled",
        "unchanged",
        "zero"
      ],
      answer: "B",
      explanation: "For a metal (conductor), κ → ∞. Effective distance becomes d' = d - t = d - d/2 = d/2. Thus C' = ε₀A / (d/2) = 2C₀."
    },
    {
      question: "The attractive force between the plates of an isolated charged parallel plate capacitor:",
      options: [
        "increases as separation d increases",
        "decreases as separation d increases",
        "is independent of separation d",
        "is inversely proportional to d²"
      ],
      answer: "C",
      explanation: "For an isolated capacitor, charge Q is constant. Force F = Q² / (2ε₀A), which has no dependence on separation distance d."
    }
  ],
  importantConcepts: [
    "Uniform field between infinite charged planes: E = σ/ε₀.",
    "Derivation of C₀ = ε₀A/d using V = Ed.",
    "Capacitance with partially filled dielectric slab: C = ε₀A / [d - t(1 - 1/κ)].",
    "Origin of the factor of 1/2 in electrostatic plate attraction force F = Q²/(2ε₀A)."
  ],
  importantTasks: [
    "Derive C = ε₀A/d from Gauss's Law and V = Ed.",
    "Derive C = ε₀A / [d - t(1 - 1/κ)] for a slab of thickness t.",
    "Calculate changes in Q, V, E, and U when a dielectric is inserted with battery connected vs disconnected."
  ],
  duplicateType: 1,
  visualType: "parallel-plate-capacitor"
};

writeDual(
  "physics/capacitor/02-parallel-plate-capacitor.json",
  "class-11-notes/physics/capacitor/concepts/02-parallel-plate-capacitor.json",
  fullCap02
);
writeDual(
  "physics/capacitor/01-capacitance-parallel-plate.json",
  "class-11-notes/physics/capacitor/concepts/01-capacitance-parallel-plate.json",
  { ...fullCap02, title: "Capacitance and Parallel Plate Capacitor", topicSlug: "parallel-plate-capacitor", duplicateType: 2 }
);
