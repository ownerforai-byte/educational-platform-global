import type { LeafDepth } from "./mindmap-depth";

/** Physics fallback leaves (ph-1 … ph-5). */
export const FALLBACK_PHYSICS_A: Record<string, LeafDepth> = {
  "ph-1": {
    keyFacts: [
      "Range depends on SPEED and angle only — never on mass, because $m$ cancels from both $T$ and $R$ as gravity scales with $m$.",
      "All drag-free projectiles follow the same parabola regardless of launch speed; the envelope of their paths peaks at $v^2/2g$ for a 45° launch.",
    ],
    edgeCases: [
      "At 0° the trajectory degenerates to a horizontal throw with no air time; at 90° it degenerates to a vertical throw with zero range. Both are limits, not special cases.",
      "With air resistance the ascent and descent are NOT symmetric and range falls below the drag-free value, so 'symmetric at 45°' holds only in vacuum.",
    ],
    examAsked: [
      "NEB: 'Thrown at 20 m/s at 30°, find time of flight, max height and range.' — $T = 2\\,\\text{s}$, $H = 5\\,\\text{m}$, $R = 34.6\\,\\text{m}$.",
      "CEE: 'Why does mass not affect the trajectory?' — it cancels identically from $T$ and $R$.",
    ],
    commonMistakes: [
      "Omitting the factor 2 in $\\sin 2\\theta$ inside $R = \\frac{v^2\\sin 2\\theta}{g}$.",
      "Adding ascent and descent times when $T = \\frac{2v\\sin\\theta}{g}$ already includes both.",
    ],
  },
  "ph-2": {
    keyFacts: [
      "The angle of repose satisfies $\\tan\\theta = \\mu_s$, so it measures the STATIC friction coefficient directly — which is why it is a practical way to measure $\\mu$.",
      "Static friction self-adjusts ($0 \\le f_s \\le \\mu_s N$) while kinetic friction is fixed at $\\mu_k N$; that difference is the jerk felt when a box starts moving.",
    ],
    edgeCases: [
      "Down the plane gravity gives $mg\\sin\\theta$ while the reaction is $mg\\cos\\theta$, so $\\mu_s = \\tan\\theta$ — using $mg$ instead of $mg\\cos\\theta$ is the classic slip.",
      "On a curved surface $N$ varies with position, so the critical angle differs from the flat-plane prediction.",
    ],
    examAsked: [
      "NEB: 'A 5 kg block on a 30° incline just begins to slide. Find $\\mu_s$.' — 0.577.",
      "CEE: 'Why does friction decrease on an incline?' — because $N = mg\\cos\\theta$ falls as $\\theta$ grows.",
    ],
    commonMistakes: [
      "Setting $f = \\mu_s N$ for a block that has not moved. Static friction equals the applied force up to the limit, not always $\\mu_s N$.",
      "Using $\\mu_k$ when the problem says 'just begins to slide', which defines a STATIC coefficient.",
    ],
  },
  "ph-3": {
    keyFacts: [
      "The work–energy theorem concerns the NET work only: $W_{net} = \\Delta KE$ holds whatever the individual forces do, so it needs no 'conservative' caveat.",
      "Work is energy transferred BY a force through a displacement; a force never creates or destroys energy, it only moves it.",
    ],
    edgeCases: [
      "A body at constant speed in a circle has $W = 0$ yet is not at rest — zero work means constant KE, not zero KE.",
      "If $W_{net} = 0$ the speed is unchanged even though the direction may change completely, so 'zero work ⇒ no change in motion' is false.",
    ],
    examAsked: [
      "NEB: 'A 2 kg body under a net force of 8 N moves 5 m along the force. Find $\\Delta KE$.' — 40 J.",
      "CEE: 'Work done by gravity on a satellite in one revolution?' — zero.",
    ],
    commonMistakes: [
      "Computing the work of ONE force and calling it 'the change in KE'. Only the net work does that.",
      "Using the work–energy theorem where conservation of mechanical energy is required, then omitting friction when it is present.",
    ],
  },
  "ph-4": {
    keyFacts: [
      "A force is conservative exactly when $F = -\\frac{dU}{dx}$ is a function of position ALONE; a velocity- or time-dependent force (friction, drag) admits no single potential.",
      "The negative slope of the U-versus-x graph IS the force graph, so the two read off one another.",
    ],
    edgeCases: [
      "Magnetic forces are non-conservative yet do no work, so they are excluded from the potential rather than folded into it.",
      "Potential may be shifted by an arbitrary constant, so only DIFFERENCES in $U$ are observable.",
    ],
    examAsked: [
      "NEB: 'For $U = ax^3$, find the force and the equilibrium.' — $F = -3ax^2$, equilibrium at $x = 0$.",
      "CEE: 'Why is gravity conservative but air drag not?' — gravity depends only on position, drag on velocity.",
    ],
    commonMistakes: [
      "Writing $F = +\\frac{dU}{dx}$. The sign is negative; force always acts to reduce potential energy.",
      "Calling a potential maximum stable equilibrium. It is UNSTABLE — a zero slope at a maximum, not a minimum.",
    ],
  },
  "ph-5": {
    keyFacts: [
      "Banking lets the NORMAL REACTION alone supply the centripetal force, removing the need for lateral friction — hence a speed limit even on frictionless ice.",
      "There is a minimum safe speed as well as a maximum: too slow and the vehicle slides down the banking inward.",
    ],
    edgeCases: [
      "Frictionless banking admits exactly ONE design speed, $v = \\sqrt{rg\\tan\\theta}$; with friction a RANGE of speeds is safe.",
      "On an over-banked curve the normal reaction can fall to zero at high speed, after which the vehicle becomes airborne.",
    ],
    examAsked: [
      "NEB: 'Derive the speed on a frictionless banked road of angle θ.' — $v = \\sqrt{rg\\tan\\theta}$.",
      "CEE: 'What happens if a vehicle is too slow on a banked curve?' — it slides down the bank inward.",
    ],
    commonMistakes: [
      "Omitting friction when the diagram supplies a coefficient of friction; two entirely different results follow.",
      "Inverting to $\\tan\\theta = v^2/(rg)$ when it should be $v^2 = rg\\tan\\theta$.",
    ],
  },
};
