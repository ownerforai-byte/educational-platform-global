import type { LeafDepth } from "./mindmap-depth";

/** Physics fallback leaves (ph-6 … ph-9). */
export const FALLBACK_PHYSICS_B: Record<string, LeafDepth> = {
  "ph-6": {
    keyFacts: [
      "Moment of inertia is the rotational analogue of mass: $F = ma$ becomes $\\tau = I\\alpha$, so $I$ is what resists angular acceleration.",
      "The parallel-axis theorem $I = I_{cm} + Md^2$ applies to EVERY 3D body, while the perpendicular-axis theorem $I_z = I_x + I_y$ applies ONLY to planar laminae.",
    ],
    edgeCases: [
      "All mass concentrated ON the axis gives $I \\to 0$, so a point mass has no rotational inertia about an axis through itself and can be spun at no cost.",
      "For rotation about a FIXED axis, $I$ is a scalar. Only for free 3D rotation is it a tensor, and the body then settles about the principal axis of maximum $I$.",
    ],
    examAsked: [
      "NEB: 'Find the MOI of a uniform rod of mass M and length L about one end.' — $\\tfrac13 ML^2$.",
      "CEE: 'Why is the perpendicular-axis theorem invalid for a solid sphere?' — a sphere is not a planar lamina.",
    ],
    commonMistakes: [
      "Applying the perpendicular-axis theorem to a 3D solid instead of a thin plate.",
      "Using $\\tfrac{1}{12}ML^2$ (about the centre) when the axis is at the end; the parallel-axis theorem then gives $\\tfrac13 ML^2$.",
    ],
  },
  "ph-7": {
    keyFacts: [
      "With a STRING, minimum top speed is $\\sqrt{gr}$ so that $T \\ge 0$; below that the string slackens and the path is not circular.",
      "With a light ROD the top speed can be ZERO, giving $v_{bottom} = \\sqrt{4gr}$ against the string's $\\sqrt{5gr}$.",
    ],
    edgeCases: [
      "The critical speed differs by CONSTRAINT, not algebra: string $\\sqrt{gr}$, rod 0. That substitution is the whole question.",
      "The rod case still works for an INVERTED loop while the string case cannot — a standard MCQ discriminator.",
    ],
    examAsked: [
      "NEB: 'Minimum velocities at top and bottom of a vertical circle on a string.' — $\\sqrt{gr}$ and $\\sqrt{5gr}$.",
      "CEE: 'Same question with a light rod.' — 0 and $2\\sqrt{gr}$.",
    ],
    commonMistakes: [
      "Using the string answer for a rod, giving $\\sqrt{5gr}$ where $2\\sqrt{gr}$ is required.",
      "Forgetting energy conservation across the $4r$ height difference.",
    ],
  },
  "ph-8": {
    keyFacts: [
      "Momentum is ALWAYS conserved in a collision; kinetic energy only when $e = 1$. Confusing which is conserved is the central error.",
      "For $e = 0$ the energy loss is MAXIMAL, $\\Delta K = \\tfrac12\\mu u_{rel}^2$, and the bodies move at the common momentum velocity.",
    ],
    edgeCases: [
      "A collision can conserve momentum perfectly while losing ALL kinetic energy — conservation of one quantity never implies the other.",
      "In 2D, momentum applies PER COMPONENT while KE applies to the scalar total, so an extra geometric condition is needed.",
    ],
    examAsked: [
      "NEB: 'A 2 kg body at 3 m/s hits a stationary 1 kg body and they stick.' — $v = 2$ m/s, 3 J lost.",
      "CEE: 'Momentum conserved but KE not?' — every type except perfectly elastic.",
    ],
    commonMistakes: [
      "Applying KE conservation to a perfectly inelastic collision, which contradicts the bodies moving together.",
      "Using $\\tfrac12 mv^2$ with the COMBINED mass against the initial single mass.",
    ],
  },
  "ph-9": {
    keyFacts: [
      "Escape velocity is INDEPENDENT of the mass of the body AND of the launch angle: $v_e = \\sqrt{2GM/R}$, because $m$ cancels from $KE = GMm/R$.",
      "Escape and orbital speed differ by exactly $\\sqrt2$: $v_e = \\sqrt2\\,v_{orb}$.",
    ],
    edgeCases: [
      "$v_e$ depends on distance from the CENTRE, so a mountain top has a marginally lower escape speed than sea level.",
      "Escape needs only that the speed be REACHED, not directed radially outward — a tangential launch at $v_e$ still escapes.",
    ],
    examAsked: [
      "NEB: 'Escape velocity from the Earth's surface.' — about 11.2 km/s.",
      "CEE: 'Relation between escape and orbital velocity?' — $v_e = \\sqrt2\\,v_{orb}$.",
    ],
    commonMistakes: [
      "Leaving $m$ in the algebra so the answer appears to depend on the body thrown.",
      "Writing $v_e = \\sqrt{gR}$; the factor under the root is 2, not 1.",
    ],
  },
};
