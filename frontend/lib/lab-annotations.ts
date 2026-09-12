/**
 * Lab Annotation Overlays — the long-arrow labels ("label + sublabel") shown
 * ON TOP of every lab animation, everywhere in the Lab.
 *
 * Each entry maps a lab id to an array of ArrowLabel props. The lab detail
 * page wraps the animation component in <AnimationFrame> and renders these
 * overlays so every animation is annotated, not just rendered.
 */
import type { ComponentProps } from "react";
import type { ArrowLabel } from "@/components/lab/annotation/arrow-label";

export type LabAnnotation = ComponentProps<typeof ArrowLabel>[];

export const LAB_ANNOTATIONS: Record<string, LabAnnotation> = {
  // Physics
  "ph-3d-dynamics": [
    { label: "Weight mg", sub: "mg·sinθ drives the slide", x1: 18, y1: 30, x2: 8, y2: 68, color: "#3b82f6" },
    { label: "Normal force N", sub: "⊥ to surface", x1: 72, y1: 22, x2: 44, y2: 18, color: "#3b82f6" },
    { label: "Incline plane", sub: "30° slope", x1: 78, y1: 62, x2: 24, y2: 84, color: "#64748b" },
  ],
  "ph-3d-wave": [
    { label: "Crest", x1: 26, y1: 82, x2: 30, y2: 62, color: "#3b82f6" },
    { label: "Wavelength λ", sub: "crest-to-crest", x1: 30, y1: 58, x2: 70, y2: 58, color: "#8b5cf6" },
    { label: "Amplitude A", sub: "rest → peak", x1: 62, y1: 24, x2: 66, y2: 50, color: "#f59e0b" },
  ],
  "ph-3d-advanced": [
    { label: "Work W = mgh", sub: "50 J on 5 m drop", x1: 20, y1: 20, x2: 34, y2: 42, color: "#3b82f6" },
    { label: "KE = ½mv²", sub: "v = 10 m/s", x1: 72, y1: 30, x2: 56, y2: 56, color: "#10b981" },
    { label: "Mass–energy", sub: "E = mc²", x1: 78, y1: 76, x2: 60, y2: 76, color: "#f59e0b" },
  ],
  "ph-3d-quantum": [
    { label: "n = 2", sub: "E = −3.4 eV", x1: 24, y1: 22, x2: 34, y2: 30, color: "#3b82f6" },
    { label: "n = 1", sub: "E = −13.6 eV", x1: 24, y1: 76, x2: 34, y2: 66, color: "#3b82f6" },
    { label: "Photon", sub: "E = 10.2 eV", x1: 62, y1: 46, x2: 48, y2: 48, color: "#f59e0b" },
  ],
  "ph-3d-vectors": [
    { label: "A = 3 m east", x1: 20, y1: 58, x2: 40, y2: 58, color: "#3b82f6" },
    { label: "B = 4 m north", x1: 44, y1: 66, x2: 44, y2: 42, color: "#3b82f6" },
    { label: "Resultant 5 m", sub: "at 53.13°", x1: 66, y1: 34, x2: 52, y2: 52, color: "#10b981" },
  ],
  "ph-3d-optics": [
    { label: "Incident ray", sub: "60° to normal", x1: 22, y1: 22, x2: 44, y2: 44, color: "#f59e0b" },
    { label: "Reflected ray", sub: "θᵣ = 60°", x1: 22, y1: 78, x2: 44, y2: 56, color: "#3b82f6" },
    { label: "Mirror", x1: 74, y1: 50, x2: 56, y2: 50, color: "#64748b" },
  ],
  "ph-3d-refraction": [
    { label: "Air n = 1", x1: 26, y1: 22, x2: 40, y2: 38, color: "#f59e0b" },
    { label: "Glass n = 1.5", sub: "bends toward normal", x1: 30, y1: 78, x2: 44, y2: 62, color: "#3b82f6" },
    { label: "Critical angle", sub: "θc ≈ 48.59°", x1: 74, y1: 40, x2: 58, y2: 46, color: "#8b5cf6" },
  ],
  "ph-3d-classic": [
    { label: "Oscillator", sub: "T = 2π√(m/k)", x1: 24, y1: 30, x2: 38, y2: 44, color: "#3b82f6" },
    { label: "Equilibrium", x1: 50, y1: 56, x2: 50, y2: 66, color: "#64748b" },
    { label: "Max energy", sub: "½kA² = 0.16 J", x1: 72, y1: 30, x2: 60, y2: 46, color: "#10b981" },
  ],
  "ph-3d-em": [
    { label: "E field", sub: "oscillates ⊥ to propagation", x1: 26, y1: 30, x2: 40, y2: 44, color: "#f59e0b" },
    { label: "B field", sub: "oscillates ⊥ to E", x1: 30, y1: 76, x2: 44, y2: 60, color: "#3b82f6" },
    { label: "Propagation", sub: "v = c", x1: 72, y1: 50, x2: 56, y2: 50, color: "#10b981" },
  ],
  "ph-3d-pendulum": [
    { label: "Max height", sub: "PE max, KE 0", x1: 18, y1: 26, x2: 30, y2: 36, color: "#f59e0b" },
    { label: "Fastest point", sub: "KE max, PE min", x1: 50, y1: 76, x2: 46, y2: 62, color: "#3b82f6" },
    { label: "String tension T", x1: 76, y1: 22, x2: 58, y2: 30, color: "#10b981" },
  ],
  "ph-3d-magnetic": [
    { label: "B field", sub: "into page", x1: 26, y1: 26, x2: 40, y2: 40, color: "#3b82f6" },
    { label: "Force F", sub: "F = qv×B", x1: 72, y1: 64, x2: 56, y2: 52, color: "#f59e0b" },
    { label: "Velocity v", x1: 44, y1: 76, x2: 56, y2: 66, color: "#10b981" },
  ],
  "ch-3d-advanced": [
    { label: "Carbon", sub: "sp³ central", x1: 26, y1: 40, x2: 40, y2: 46, color: "#10b981" },
    { label: "Hydrogen ×4", sub: "109.5° apart", x1: 72, y1: 40, x2: 58, y2: 44, color: "#10b981" },
    { label: "C–H bond", sub: "1.09 Å", x1: 50, y1: 30, x2: 54, y2: 44, color: "#64748b" },
  ],
  "ch-3d-periodic": [
    { label: "Metals", sub: "left side", x1: 22, y1: 30, x2: 38, y2: 40, color: "#10b981" },
    { label: "Non-metals", sub: "right side", x1: 76, y1: 30, x2: 60, y2: 40, color: "#f59e0b" },
    { label: "Period 1", x1: 50, y1: 20, x2: 50, y2: 34, color: "#64748b" },
  ],
  "bio-3d-cell": [
    { label: "Nucleus", sub: "genetic control", x1: 28, y1: 34, x2: 40, y2: 42, color: "#22c55e" },
    { label: "Mitochondria", sub: "ATP power", x1: 74, y1: 30, x2: 60, y2: 40, color: "#f59e0b" },
    { label: "Cell membrane", x1: 50, y1: 84, x2: 50, y2: 66, color: "#64748b" },
  ],
  "bio-3d-dna": [
    { label: "Double helix", x1: 50, y1: 80, x2: 50, y2: 60, color: "#22c55e" },
    { label: "Base pairs", sub: "A–T, G–C", x1: 26, y1: 38, x2: 38, y2: 46, color: "#8b5cf6" },
    { label: "Sugar–phosphate backbone", x1: 74, y1: 40, x2: 60, y2: 46, color: "#10b981" },
  ],
  "bio-3d-advanced": [
    { label: "ATP synthase", sub: "38 ATP/glucose", x1: 28, y1: 30, x2: 40, y2: 42, color: "#22c55e" },
    { label: "Electron transport", sub: "34 ATP here", x1: 72, y1: 30, x2: 58, y2: 42, color: "#f59e0b" },
  ],
  "bio-3d-ecology": [
    { label: "Carrying capacity K", sub: "K = 500", x1: 74, y1: 24, x2: 58, y2: 34, color: "#22c55e" },
    { label: "Growth rate", sub: "dN/dt = 96/yr", x1: 26, y1: 58, x2: 40, y2: 50, color: "#3b82f6" },
  ],
  "bio-3d-human": [
    { label: "Heart", sub: "CO = HR×SV", x1: 28, y1: 36, x2: 42, y2: 46, color: "#22c55e" },
    { label: "Blood flow", sub: "4.9 L/min rest", x1: 74, y1: 40, x2: 60, y2: 46, color: "#f59e0b" },
  ],
  "bio-3d-evolution": [
    { label: "Parental", sub: "p = 0.7, q = 0.3", x1: 24, y1: 30, x2: 38, y2: 40, color: "#22c55e" },
    { label: "F₂ 3:1", sub: "p²+2pq+q² = 1", x1: 76, y1: 70, x2: 56, y2: 56, color: "#8b5cf6" },
  ],
  "math-3d-advanced": [
    { label: "Tangent", sub: "slope f′ = 12", x1: 24, y1: 70, x2: 42, y2: 58, color: "#8b5cf6" },
    { label: "f(x) = x³", sub: "at x = 2", x1: 30, y1: 22, x2: 44, y2: 34, color: "#8b5cf6" },
  ],
  "math-3d-geometry": [
    { label: "Face normal", x1: 26, y1: 30, x2: 40, y2: 42, color: "#8b5cf6" },
    { label: "Edge length", sub: "a", x1: 72, y1: 60, x2: 56, y2: 56, color: "#8b5cf6" },
  ],
  "class11-physics": [
    { label: "vy = 0 at top", sub: "H = 33.75 m", x1: 50, y1: 24, x2: 44, y2: 38, color: "#f43f5e" },
    { label: "ux constant", sub: "u = 15 m/s", x1: 26, y1: 66, x2: 40, y2: 58, color: "#f43f5e" },
    { label: "Range R", sub: "77.9 m", x1: 76, y1: 76, x2: 60, y2: 66, color: "#f43f5e" },
  ],
  "class11-chemistry": [
    { label: "1 mol CO₂", sub: "= 44 g", x1: 30, y1: 36, x2: 42, y2: 46, color: "#f43f5e" },
    { label: "6.022×10²³", sub: "molecules", x1: 72, y1: 36, x2: 58, y2: 46, color: "#f43f5e" },
  ],
  "class11-math": [
    { label: "sinθ/θ → 1", x1: 28, y1: 70, x2: 44, y2: 60, color: "#f43f5e" },
    { label: "d/dx sin x = cos x", sub: "at π/2 → 0", x1: 72, y1: 26, x2: 58, y2: 40, color: "#f43f5e" },
  ],
  "class11-biology": [
    { label: "Mitosis", sub: "46 → 46", x1: 26, y1: 68, x2: 40, y2: 58, color: "#f43f5e" },
    { label: "Meiosis", sub: "46 → 23", x1: 74, y1: 68, x2: 60, y2: 58, color: "#f43f5e" },
  ],
};