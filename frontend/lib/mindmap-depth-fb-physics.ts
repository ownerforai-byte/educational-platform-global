import type { LeafDepth } from "./mindmap-depth";

/** Physics fallback leaves (ph-1 … ph-5). */
export const FALLBACK_PHYSICS_A: Record<string, LeafDepth> = {
  "ph-1": {
    keyFacts: [
      "Range depends on SPEED and angle only — never on mass, because $m$ cancels from both $T$ and $R$ as gravity scales with $m$.",
      "All drag-free projectiles follow the same parabola regardless of launch speed; the envelope of their paths peaks at $v^2/2g$ for a 45° launch.",
      "At the top of the trajectory only the vertical component vanishes: $v_{top} = v\\cos\\theta$ is horizontal and non-zero — the velocity is never zero there.",
      "The trajectory can be written $y = x\\tan\\theta\\left(1 - \\dfrac{x}{R}\\right)$: the parabola in terms of its own range, so $y = 0$ at $x = 0$ and $x = R$ exactly.",
    ],
    edgeCases: [
      "At 0° the trajectory degenerates to a horizontal throw with no air time; at 90° it degenerates to a vertical throw with zero range. Both are limits, not special cases.",
      "With air resistance the ascent and descent are NOT symmetric and range falls below the drag-free value, so 'symmetric at 45°' holds only in vacuum.",
      "Thrown from a height $h$, the standard range formula breaks: solve $h + x\\tan\\theta - \\dfrac{gx^2}{2v^2\\cos^2\\theta} = 0$ and take the larger root.",
      "Complementary angles $\\theta$ and $90° - \\theta$ share the same range but not the same flight time: $T \\propto \\sin\\theta$, so the steeper throw stays airborne longer.",
    ],
    examAsked: [
      "NEB: 'Thrown at 20 m/s at 30°, find time of flight, max height and range.' — $T = 2\\,\\text{s}$, $H = 5\\,\\text{m}$, $R = 34.6\\,\\text{m}$.",
      "CEE: 'Why does mass not affect the trajectory?' — it cancels identically from $T$ and $R$.",
      "NEB: 'Find the speed at the highest point of a body projected at 20 m/s at 60°.' — $20\\cos60 = 10$ m/s, horizontal.",
      "CEE: 'Two complementary angles give equal ranges. Compare the flight times.' — $T_1/T_2 = \\tan\\theta$ for the shallower $\\theta$.",
    ],
    commonMistakes: [
      "Omitting the factor 2 in $\\sin 2\\theta$ inside $R = \\frac{v^2\\sin 2\\theta}{g}$.",
      "Adding ascent and descent times when $T = \\frac{2v\\sin\\theta}{g}$ already includes both.",
      "Substituting $\\sin2\\theta = 2\\sin\\theta$ — the identity is $\\sin2\\theta = 2\\sin\\theta\\cos\\theta$.",
      "Mixing sign conventions: calling upward positive while also measuring the range downward. Fix ONE convention before writing equations.",
    ],
  },
  "ph-2": {
    keyFacts: [
      "The angle of repose satisfies $\\tan\\theta = \\mu_s$, so it measures the STATIC friction coefficient directly — which is why it is a practical way to measure $\\mu$.",
      "Static friction self-adjusts ($0 \\le f_s \\le \\mu_s N$) while kinetic friction is fixed at $\\mu_k N$; that difference is the jerk felt when a box starts moving.",
      "Friction is independent of the contact AREA: a wide and a narrow block of the same mass slip at the same angle, because $N$ is unchanged.",
      "Kinetic friction is nearly speed-independent at ordinary speeds, so $f_k = \\mu_k N$ can be treated as constant throughout the slide.",
    ],
    edgeCases: [
      "Down the plane gravity gives $mg\\sin\\theta$ while the reaction is $mg\\cos\\theta$, so $\\mu_s = \\tan\\theta$ — using $mg$ instead of $mg\\cos\\theta$ is the classic slip.",
      "On a curved surface $N$ varies with position, so the critical angle differs from the flat-plane prediction.",
      "Raise $\\theta$ until slip, then lower it: sliding continues until a LOWER angle where $\\tan\\theta = \\mu_k$ — hysteresis in one line.",
      "If $\\mu_s = \\tan\\theta$ exactly, the block is in neutral equilibrium on the verge — any nudge decides the motion, so 'just begins to slide' means take the limiting value.",
    ],
    examAsked: [
      "NEB: 'A 5 kg block on a 30° incline just begins to slide. Find $\\mu_s$.' — 0.577.",
      "CEE: 'Why does friction decrease on an incline?' — because $N = mg\\cos\\theta$ falls as $\\theta$ grows.",
      "NEB: 'A body just begins to slide at 30°. Find $\\mu_s$ and the acceleration once sliding with $\\mu_k = 0.2$.' — $0.577$ and $a = g(\\sin30 - 0.2\\cos30) \\approx 3.2\\,\\text{m/s}^2$.",
      "CEE: 'Does the angle of repose depend on mass?' — no; $\\tan\\theta = \\mu_s$ contains no mass.",
    ],
    commonMistakes: [
      "Setting $f = \\mu_s N$ for a block that has not moved. Static friction equals the applied force up to the limit, not always $\\mu_s N$.",
      "Using $\\mu_k$ when the problem says 'just begins to slide', which defines a STATIC coefficient.",
      "Writing friction as $\\mu mg$ on an incline instead of $\\mu mg\\cos\\theta$.",
      "Assuming $N = mg$ on a slope. It is $mg\\cos\\theta$ — and it vanishes at $\\theta = 90°$.",
    ],
  },
  "ph-3": {
    keyFacts: [
      "Mechanical energy $E = KE + PE$ is conserved only when every force is conservative; with friction the lost mechanical energy becomes thermal energy of the system.",
      "The work–energy theorem $W_{net} = \\Delta KE$ holds for ANY net force, so unlike energy conservation it never needs a caveat.",
      "Only the force component along the displacement changes the speed — the perpendicular component bends the path but does no work.",
      "Power is $P = \\vec F \\cdot \\vec v$; a vehicle at constant speed delivers $P = fv$ exactly against the resistive force $f$.",
    ],
    edgeCases: [
      "Constant energy does not mean rest: at the top of a vertical circle the KE is minimal but non-zero unless $v_{top} = \\sqrt{gr}$ exactly.",
      "For a spring on a rough surface, $\\tfrac12kx^2 = \\tfrac12mv^2 + \\mu mg x$. Both PE terms scale with $x$, so the maximum compression $x = 2\\mu mg/k$ is INDEPENDENT of mass — a classic surprise.",
      "If the net work is zero the speed is unchanged even though forces acted — a satellite in a circular orbit has $W_{net} = 0$ per revolution.",
      "The theorem applies to the SYSTEM: for a leaking truck or a falling chain the mass changes and 'the body' alone is not a valid system.",
    ],
    examAsked: [
      "NEB: 'A block slides from rest down a smooth track of height h. Find its speed at the bottom.' — $v = \\sqrt{2gh}$.",
      "CEE: 'A ball falls from height h with air resistance ignored. With what speed does it strike?' — the same $\\sqrt{2gh}$, independent of mass.",
      "NEB: 'A 2 kg body changes speed from 3 m/s to 5 m/s. Find the work done.' — $W = \\tfrac12 m(5^2 - 3^2) = 16$ J.",
      "CEE: 'Can a force do work without changing the speed?' — yes: a centripetal force changes only the direction.",
    ],
    commonMistakes: [
      "Reading $mgh = \\tfrac12mv^2$ as $h = v$. The mass cancels on both sides, exactly why gravitational PE and KE scale together.",
      "Cancelling $m$ where it should not cancel. In $\\tfrac12kx^2 = \\tfrac12mv^2 + \\mu mgx$ the mass stays, because $k$ is mass-independent.",
      "Using $W = Fd$ with the full path length when the force acts over only part of it.",
      "Equating the work of one force to $\\Delta KE$. That is valid only when that force is the net force.",
    ],
  },
  "ph-4": {
    keyFacts: [
      "A force is conservative when its work is path-independent — equivalently when $\\oint \\vec F \\cdot d\\vec r = 0$ around every closed loop.",
      "Potential energy belongs to a CONFIGURATION of the system: $U = mgh$, $U = \\tfrac12kx^2$, $U = -GmM/r$ each encode the force of that interaction.",
      "The relation $\\vec F = -\\nabla U$ means the force points DOWNHILL on the energy graph; equilibrium sits where the slope is zero.",
      "Potential energy is defined up to an additive constant — only differences $\\Delta U$ are physical, so the zero level is a choice, not a fact.",
    ],
    edgeCases: [
      "Stable equilibrium needs a potential MINIMUM ($d^2U/dx^2 > 0$); a maximum is unstable; a flat region is neutral — the standard 'classify the equilibrium' question.",
      "The zero of $U = -GmM/r$ is at infinity, so bound-orbit energies are NEGATIVE — the sign is not a mistake.",
      "A force may be conservative even where it vanishes everywhere (the trivial $U = \\text{const}$ case): zero work does not mean 'non-conservative'.",
      "Inside a uniform sphere the gravitational potential varies as $r^2$ near the centre, not linearly — the classic extension problem.",
    ],
    examAsked: [
      "NEB: 'Show that the work done by a conservative force round a closed path is zero.' — split the path out and back; the two integrals cancel.",
      "CEE: 'Given $U(x) = x^3 - 3x$, find the equilibria and their nature.' — $x = \\pm1$; the minimum at $x = +1$ is stable.",
      "NEB: 'State the relation between force and potential energy.' — $F = -dU/dx$ in one dimension.",
      "CEE: 'Why is the total energy of a bound satellite negative?' — the zero of $U$ is fixed at infinite separation.",
    ],
    commonMistakes: [
      "Dropping the minus sign in $F = -dU/dx$ and then getting the force direction backwards.",
      "Using $U = mgh$ with $h$ measured from a different zero in the same problem. Anchor ONE zero level first.",
      "Calling friction 'conservative' because it does no work in one special case (static friction on a rolling wheel) — path independence is the test, not that one case.",
      "Adding $U$ for overlapping interactions twice — one interaction, one $U$ term.",
    ],
  },
  "ph-5": {
    keyFacts: [
      "At the design speed $v_0 = \\sqrt{rg\\tan\\theta}$ the friction force is exactly zero — the whole centripetal force comes from the normal component.",
      "Banked roads reduce wear and noise because friction is not needed at the design speed; that is why expressway curves are banked.",
      "The banking relation is independent of vehicle MASS, so trucks and cars share the same design speed on one curve.",
      "On the bank, $N\\cos\\theta$ balances $mg$ and $N\\sin\\theta$ supplies $mv^2/r$ — resolve along horizontal and vertical axes, never along the slope.",
    ],
    edgeCases: [
      "For $v > v_0$ the car tends to slide OUTWARD and friction acts DOWN the slope; for $v < v_0$ it slides inward and friction acts UP the slope. Draw the tendency first.",
      "With friction present there is a whole speed BAND $[v_{min}, v_{max}]$ the curve tolerates — the full-width result asked in entrance papers.",
      "At $\\theta = 0$ the bank formula collapses to $v_0 = 0$: an unbanked curve needs friction for ANY speed.",
      "On a banked track, if $\\tan\\theta > \\mu_s$ the stationary car itself slides down even at rest — banking alone cannot hold it.",
    ],
    examAsked: [
      "CEE: 'Why are curved roads banked?' — so the normal reaction supplies the centripetal force, reducing reliance on friction.",
      "NEB: 'Find the angle of banking for a curve of radius 50 m at 20 m/s.' — $\\theta = \\tan^{-1}(400/490) \\approx 39°$.",
      "CEE: 'A banked road is designed for 30 m/s. Does a slow car slip up or down?' — down the slope, since $v < v_0$.",
      "NEB: 'Show that the design speed of a banked curve is independent of mass.' — both $N\\sin\\theta$ and $mg$ scale with $m$.",
    ],
    commonMistakes: [
      "Setting $mg\\tan\\theta = mv^2/rg$ (an extra $r$). The centripetal term is $mv^2/r$.",
      "Resolving $N$ as $mg\\cos\\theta$ on a banked curve — that holds on an incline under gravity alone, not on a banked turn.",
      "Forgetting that friction can act in EITHER direction along the slope; the direction follows the sliding tendency, not the motion.",
      "Adding $\\mu mg$ to the banking formula instead of $\\mu N$ — friction scales with the normal force, which the bank itself changes.",
    ],
  },
};
