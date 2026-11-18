import type { LeafDepth } from "./mindmap-depth";

/** Physics fallback leaves (ph-6 … ph-9). */
export const FALLBACK_PHYSICS_B: Record<string, LeafDepth> = {
  "ph-6": {
    keyFacts: [
      "Moment of inertia is the rotational analogue of mass: $F = ma$ becomes $\\tau = I\\alpha$, so $I$ is what resists angular acceleration.",
      "The parallel-axis theorem $I = I_{cm} + Md^2$ applies to EVERY 3D body, while the perpendicular-axis theorem $I_z = I_x + I_y$ applies ONLY to planar laminae.",
      "MOI is additive over parts: a composite body is broken into standard shapes, each transferred by the parallel-axis theorem, then summed.",
      "Rotational KE is $K = \\tfrac12 I\\omega^2$ and angular momentum is $L = I\\omega$; with $L$ conserved, cutting $I$ in half doubles $\\omega$ and doubles $K$ — the classic 'where does the energy come from?' question (internal work).",
    ],
    edgeCases: [
      "All mass concentrated ON the axis gives $I \\to 0$, so a point mass has no rotational inertia about an axis through itself and can be spun at no cost.",
      "For rotation about a FIXED axis, $I$ is a scalar. Only for free 3D rotation is it a tensor, and the body then settles about the principal axis of maximum $I$.",
      "The parallel-axis theorem requires the first axis to pass through the CENTRE of mass — transferring between two arbitrary parallel axes is invalid.",
      "For a body rolling without slipping, $K = \\tfrac12 Mv_{cm}^2\\left(1 + \\tfrac{I}{MR^2}\\right)$ — the $\\tfrac12 I\\omega^2$ term is not extra, it replaces part of the translational share.",
    ],
    examAsked: [
      "NEB: 'Find the MOI of a uniform rod of mass M and length L about one end.' — $\\tfrac13 ML^2$.",
      "CEE: 'Why is the perpendicular-axis theorem invalid for a solid sphere?' — a sphere is not a planar lamina.",
      "NEB: 'A skater with arms out has $I_1$ at $\\omega_1$. Find $\\omega_2$ with arms in at $I_2$.' — $\\omega_2 = \\omega_1 I_1/I_2$ by conservation of $L$.",
      "CEE: 'Find the MOI of a disc about a tangent in its plane.' — $\\tfrac14 MR^2 + MR^2 = \\tfrac54 MR^2$.",
    ],
    commonMistakes: [
      "Applying the perpendicular-axis theorem to a 3D solid instead of a thin plate.",
      "Using $\\tfrac{1}{12}ML^2$ (about the centre) when the axis is at the end; the parallel-axis theorem then gives $\\tfrac13 ML^2$.",
      "Mixing $I\\omega$ and $\\tfrac12 I\\omega^2$: $L$ is conserved, $K$ is not, when the body changes shape.",
      "Adding $Md^2$ with $d$ measured from the wrong axis — $d$ is the distance between the two parallel axes only.",
    ],
  },
  "ph-7": {
    keyFacts: [
      "With a STRING, minimum top speed is $\\sqrt{gr}$ so that $T \\ge 0$; below that the string slackens and the path is not circular.",
      "With a light ROD the top speed can be ZERO, giving $v_{bottom} = \\sqrt{4gr}$ against the string's $\\sqrt{5gr}$.",
      "Energy conservation across the $2r$ diameter links top and bottom: $v_b^2 = v_t^2 + 4gr$ — valid for BOTH the string and the rod case.",
      "The tension at the bottom is always the top tension plus $6mg$: $T_b - T_t = 6mg$, independent of speed — a favourite short-answer result.",
    ],
    edgeCases: [
      "The critical speed differs by CONSTRAINT, not algebra: string $\\sqrt{gr}$, rod 0. That substitution is the whole question.",
      "The rod case still works for an INVERTED loop while the string case cannot — a standard MCQ discriminator.",
      "If released from rest exactly at the level of the centre, a bead on a wire reaches the top only with an infinitesimal nudge; otherwise it oscillates in the lower half.",
      "In a vertical ellipse (a roller loop) the critical condition is set by the TOP radius of curvature alone, not the average radius.",
    ],
    examAsked: [
      "NEB: 'Minimum velocities at top and bottom of a vertical circle on a string.' — $\\sqrt{gr}$ and $\\sqrt{5gr}$.",
      "CEE: 'Same question with a light rod.' — 0 and $2\\sqrt{gr}$.",
      "NEB: 'Find the tension at the lowest point if the body just completes the circle.' — $T_b = 6mg$.",
      "CEE: 'A body is released from rest at the level of the centre on a smooth wire loop. Does it reach the top?' — only with an initial nudge; energy alone leaves it short of the unstable top.",
    ],
    commonMistakes: [
      "Using the string answer for a rod, giving $\\sqrt{5gr}$ where $2\\sqrt{gr}$ is required.",
      "Forgetting energy conservation across the $4r$ height difference.",
      "Setting $T = 0$ at the TOP for the rod case — the rod can support compression, so the critical speed is 0, not $\\sqrt{gr}$.",
      "Writing the centripetal force as $T + mg\\cos\\theta$ at every point; at the bottom gravity acts outward, so it is $T - mg = mv^2/r$.",
    ],
  },
  "ph-8": {
    keyFacts: [
      "Momentum is ALWAYS conserved in a collision; kinetic energy only when $e = 1$. Confusing which is conserved is the central error.",
      "For $e = 0$ the energy loss is MAXIMAL, $\\Delta K = \\tfrac12\\mu u_{rel}^2$, and the bodies move at the common momentum velocity.",
      "The coefficient of restitution obeys $e = \\dfrac{v_2 - v_1}{u_1 - u_2}$: the ratio of relative speed of separation to approach along the line of impact.",
      "In the centre-of-mass frame the total momentum is zero, so both bodies reverse direction with speeds scaled by $e$ — the fastest route through 1D collision problems.",
    ],
    edgeCases: [
      "A collision can conserve momentum perfectly while losing ALL kinetic energy — conservation of one quantity never implies the other.",
      "In 2D, momentum applies PER COMPONENT while KE applies to the scalar total, so an extra geometric condition is needed.",
      "If a body rebounds to the original height, $e = 1$ with the FLOOR, but the floor-Earth system's momentum change is invisible because $M_{Earth} \\to \\infty$.",
      "For equal masses in a perfectly elastic 1D collision the velocities EXCHANGE — the fastest possible answer to the classic MCQ.",
    ],
    examAsked: [
      "NEB: 'A 2 kg body at 3 m/s hits a stationary 1 kg body and they stick.' — $v = 2$ m/s, 3 J lost.",
      "CEE: 'Momentum conserved but KE not?' — every type except perfectly elastic.",
      "NEB: 'A ball dropped from height h rises to $h/4$. Find $e$.' — $e = \\sqrt{1/4} = 0.5$.",
      "CEE: 'State the law of restitution and define the coefficient.' — $e = $ separation speed / approach speed along the line of impact.",
    ],
    commonMistakes: [
      "Applying KE conservation to a perfectly inelastic collision, which contradicts the bodies moving together.",
      "Using $\\tfrac12 mv^2$ with the COMBINED mass against the initial single mass.",
      "Putting signs into the restitution formula twice — the ratio itself carries the sign convention; pick approach positive once.",
      "Forgetting that momentum is a VECTOR: in 2D, cancel components before comparing magnitudes.",
    ],
  },
  "ph-9": {
    keyFacts: [
      "Escape velocity is INDEPENDENT of the mass of the body AND of the launch angle: $v_e = \\sqrt{2GM/R}$, because $m$ cancels from $KE = GMm/R$.",
      "Escape and orbital speed differ by exactly $\\sqrt2$: $v_e = \\sqrt2\\,v_{orb}$.",
      "Orbital speed $v = \\sqrt{GM/r}$ falls with radius while the escape speed does too — both are set by the central body, never by the satellite.",
      "For a circular orbit, $T^2 \\propto r^3$ (Kepler III) follows directly from $v = \\sqrt{GM/r}$ and $T = 2\\pi r/v$ — derivation one-liners win full marks.",
    ],
    edgeCases: [
      "$v_e$ depends on distance from the CENTRE, so a mountain top has a marginally lower escape speed than sea level.",
      "Escape needs only that the speed be REACHED, not directed radially outward — a tangential launch at $v_e$ still escapes.",
      "At $r = R_s$ (the Schwarzschild radius) the classical formula formally gives $v_e = c$ — the boundary where Newtonian mechanics hands over to relativity.",
      "A body with exactly orbital speed in a resistive atmosphere spirals IN (its speed increases as $r$ falls) — energy decreases while KE rises.",
    ],
    examAsked: [
      "NEB: 'Escape velocity from the Earth's surface.' — about 11.2 km/s.",
      "CEE: 'Relation between escape and orbital velocity?' — $v_e = \\sqrt2\\,v_{orb}$.",
      "NEB: 'A satellite orbits at radius 4R. Find its orbital speed in terms of $g$ and $R$.' — $v = \\tfrac12\\sqrt{gR}$ using $GM = gR^2$.",
      "CEE: 'Why does an astronaut feel weightless in orbit?' — both astronaut and craft fall together at the same centripetal acceleration $g(r)$.",
    ],
    commonMistakes: [
      "Leaving $m$ in the algebra so the answer appears to depend on the body thrown.",
      "Writing $v_e = \\sqrt{gR}$; the factor under the root is 2, not 1.",
      "Using surface $g$ at orbital height — the relation $GM = gR^2$ converts between them; $g(r) = gR^2/r^2$.",
      "Adding orbital speed and escape speed as energies: escape is the $\\sqrt2$ factor on SPEED, which doubles the energy, not the other way round.",
    ],
  },
};
