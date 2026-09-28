import { cap05Notes } from "./cap05-notes.mjs";

export const cap05 = {
  title: "Effect of a Dielectric — Polarization and Displacement",
  unitSlug: "capacitor",
  topicSlug: "effect-of-a-dielectric-polarization-and-displacement",
  topicTitle: "Effect of a dielectric: polarization and displacement",
  relevance: 100,
  notes: cap05Notes,
  confusion: [
    "Thinking polarization field cancels external field completely: Unlike an ideal conductor where mobile charges move until E_inside = 0 (so κ → ∞), dielectric bound charges are anchored to molecules, so E_p < E_0 and the net field inside is non-zero: E = E_0 / κ > 0.",
    "Confusing free charge with bound charge: Free charge resides on the metal capacitor plates (Q_free = σ A), whereas bound charge resides on the dielectric surfaces (Q_p = σ_p A = P A). Bound charges cannot move freely off the dielectric.",
    "Conflating electric susceptibility χ_e with dielectric constant κ: χ_e measures ease of polarization, whereas κ = 1 + χ_e measures total relative permittivity. In vacuum, χ_e = 0 while κ = 1."
  ],
  practice: [
    "A parallel plate capacitor with plate area 100 cm² and plate separation 2 mm is charged to 100 V with air. A dielectric slab of κ = 5 is inserted with battery disconnected. Find (a) initial capacitance, (b) free surface charge density on plates, (c) net electric field inside dielectric, and (d) induced bound surface charge density. Solution: (a) C₀ = ε₀A/d = (8.854 × 10⁻¹²)(0.01) / (2 × 10⁻³) = 44.27 pF. (b) Q = C₀V₀ = 4.427 nC; σ = Q/A = 4.427 × 10⁻⁷ C/m². (c) E₀ = V₀/d = 50000 V/m; inside dielectric E = E₀/κ = 10000 V/m. (d) Bound charge density σ_p = P = (κ - 1)ε₀E = 4 × (8.854 × 10⁻¹²) × 10000 = 3.542 × 10⁻⁷ C/m²."
  ],
  universalFacts: [
    "The dielectric constant of liquid water at room temperature is exceptionally high (κ ≈ 80) due to permanent electric dipole moments of bent H₂O molecules, explaining why water dissolves ionic salts so readily.",
    "Dielectric strength is the maximum electric field an insulator can withstand before electrical breakdown (dry air ≈ 3 MV/m, mica ≈ 100 MV/m, Teflon ≈ 60 MV/m)."
  ],
  animation3D: "capacitor",
  motionGraphics: "capacitor"
};
