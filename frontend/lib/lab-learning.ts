/**
 * Lab Learning Packs — the standard content structure rendered below every
 * lab animation, everywhere in the Lab.
 *
 * Every lab page shows, under its animation:
 *   1. Non-General Proof — a worked PROOF on a specific case/numbers
 *      (not the general symbolic proof — the concrete one that builds belief)
 *   2. Theory — concise conceptual backbone
 *   3. Confusion Clarity — misconception vs reality pairs
 *   4. Practice Questions — with click-to-reveal answers
 */

export type LabProofStep = {
  text: string;
  math?: string;
};

export type LabProof = {
  /** e.g. "Proof on a specific case: 2 kg block, 30° incline" */
  title: string;
  /** The concrete case being proven */
  case: string;
  steps: LabProofStep[];
  /** One-line takeaway connecting the case back to the general law */
  takeaway: string;
};

export type LabTheoryBlock = {
  heading: string;
  body: string;
};

export type LabConfusion = {
  /** what students wrongly believe */
  wrong: string;
  /** what is actually true */
  right: string;
  /** why the confusion happens */
  why: string;
};

export type LabQuestion = {
  q: string;
  a: string;
  hint?: string;
};

export type LabLearningPack = {
  proof: LabProof;
  theory: LabTheoryBlock[];
  confusions: LabConfusion[];
  questions: LabQuestion[];
};

/**
 * Registry of learning packs keyed by lab id (see lib/lab-registry.tsx).
 * Labs without an entry yet render the section with a graceful placeholder.
 */
export const LAB_LEARNING: Record<string, LabLearningPack> = {
  "ph-3d-dynamics": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "2 kg block on a 30° frictionless incline, g = 10 m/s²",
      steps: [
        { text: "Weight splits into two components on the incline:", math: "W∥ = mg·sin30° = 10 N,  W⊥ ≈ 17.3 N" },
        { text: "No friction, so net force along the slope is just W∥:", math: "F_net = 10 N" },
        { text: "Newton's second law along the slope:", math: "a = 10 / 2 = 5 m/s²" },
        { text: "Check against the general formula:", math: "a = g·sinθ = 5 m/s² ✓" },
        { text: "Energy cross-check after 1 m: v² = 2·a·s = 10 → v ≈ 3.16 m/s; matches mgh = ½mv² with h = 0.5 m." },
      ],
      takeaway: "The general law a = g·sinθ survives the concrete case — one verified case beats a memorized formula.",
    },
    theory: [
      { heading: "Newton's second law on inclines", body: "Resolve gravity into components parallel and perpendicular to the surface. Only the parallel component accelerates the block when frictionless; the perpendicular one is cancelled by the normal force." },
      { heading: "Momentum in collisions", body: "Total momentum is always conserved: m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂. Kinetic energy is fully conserved only in elastic collisions — in inelastic ones the deficit becomes heat, sound and deformation." },
    ],
    confusions: [
      { wrong: "A heavier block slides down faster.", right: "Acceleration is independent of mass (a = g·sinθ) — mass cancels.", why: "Daily life conflates 'heavier = more force' with 'heavier = faster'; the extra force comes with exactly proportional extra inertia." },
      { wrong: "Normal force always equals mg.", right: "On an incline N = mg·cosθ — only on flat ground is N = mg.", why: "Flat-ground intuition is over-generalized to all surfaces." },
      { wrong: "Momentum is lost when a ball stops after hitting a wall.", right: "Momentum transfers to the wall + Earth, effectively immovable.", why: "The recoiling partner is too massive to notice, so students conclude momentum vanished." },
    ],
    questions: [
      { q: "A 4 kg block rests on a 30° incline with μ = 0.5. Does it slide? (g = 10)", a: "Driving = mg·sin30° = 20 N. Max friction = μmg·cos30° ≈ 17.3 N. 20 > 17.3 → slides (barely).", hint: "Compare mg·sinθ against μmg·cosθ." },
      { q: "Why does the blue cart rebound higher off the elastic wall than the clay blob?", a: "The elastic wall reverses momentum (elastic bounce); clay deforms and sticks (inelastic), turning kinetic energy into heat and deformation.", hint: "Where does the kinetic energy go?" },
      { q: "Two identical carts collide head-on and stop dead. Where did the momentum go?", a: "Nowhere — total was zero before (equal and opposite) and zero after. Momentum is a vector.", hint: "Momentum has direction." },
    ],
  },
  "ph-3d-wave": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Wave of frequency 2 Hz, wavelength 1.5 m, amplitude 0.2 m",
      steps: [
        { text: "Wave speed from v = fλ:", math: "v = 2 × 1.5 = 3 m/s" },
        { text: "A crest travels one wavelength in one period:", math: "T = 1/f = 0.5 s → 1.5 m per 0.5 s = 3 m/s ✓" },
        { text: "Energy check: doubling amplitude quadruples transported power (P ∝ A²) — taller waves visibly do more work per crest." },
      ],
      takeaway: "v = fλ is not a definition to memorize — it is what you get when you track one crest for one period.",
    },
    theory: [
      { heading: "What a wave transports", body: "A mechanical wave transports energy and momentum through a medium — the medium itself only oscillates in place. Watch a marker on the ribbon: it bobs while the crest pattern races away." },
      { heading: "Superposition", body: "Overlapping waves add displacement point-by-point. In-phase → constructive; anti-phase → destructive cancellation. This one rule explains interference, standing waves and beats." },
    ],
    confusions: [
      { wrong: "Waves carry the water (or the rope) along with them.", right: "Only the disturbance travels; medium particles oscillate in place.", why: "Floating objects bob and drift slightly, masquerading as transport." },
      { wrong: "Doubling frequency doubles the wave speed.", right: "v is fixed by the medium; doubling f halves λ, so v = fλ is unchanged.", why: "v = fλ tempts students to see v as caused by f alone." },
      { wrong: "Amplitude affects wave speed.", right: "Amplitude carries energy, not speed — bigger waves do not arrive sooner.", why: "Louder/higher looks 'stronger', and stronger is misread as faster." },
    ],
    questions: [
      { q: "A wave has v = 3 m/s and f = 2 Hz. How long between crests at a fixed point?", a: "T = 1/f = 0.5 s — the point bobs twice per second even though the pattern moves at 3 m/s.", hint: "Period is the inverse of frequency." },
      { q: "Two speakers emit λ = 1.7 m in phase. You stand 3.4 m farther from one. Loud or quiet?", a: "Path difference 3.4 m = 2λ exactly → constructive → LOUD.", hint: "How many wavelengths fit in 3.4 m?" },
      { q: "In damped mode the wave dies with distance. What is conserved and what decays?", a: "Frequency stays constant (set by the source); amplitude decays as the medium dissipates energy.", hint: "Source dictates time behavior; the medium eats amplitude." },
    ],
  },
};

/** Returns the learning pack for a lab id, or undefined. */
export function getLabLearning(labId: string): LabLearningPack | undefined {
  return LAB_LEARNING[labId];
}
