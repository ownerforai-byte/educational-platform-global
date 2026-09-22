/**
 * Pro Knowledge — Numerical Physics, chapters 1–3.
 *
 * Every chapter carries all five knowledge kinds: theory (basic → pro),
 * formulas (with symbol meanings + validity), special cases, tricks and
 * classic mistakes. Authored to NEB Class 11/12 depth.
 */

import type { KnowledgeChapter } from "@/features/knowledge/types";

export const PHYSICS_CHAPTERS_A: KnowledgeChapter[] = [
  /* ══════════════════════ 1 · KINEMATICS ══════════════════════ */
  {
    id: "kinematics",
    title: "Kinematics",
    classLevel: "class-11",
    blurb:
      "Motion described without asking why: displacement vs distance, the three equations, graphs, relative velocity and projectiles.",
    theory: [
      {
        heading: "Scalars, vectors and the meaning of displacement",
        level: "basic",
        body:
          "Distance is the whole path length travelled (scalar, never negative). Displacement is the straight-line change of position from start to end (vector, can be zero even after a long journey). A runner completing one lap of a 400 m track covers 400 m distance but 0 m displacement — the distinction is the root of almost every kinematics question.",
        math: "\\vec{s} = \\vec{r}_2 - \\vec{r}_1, \\qquad |\\vec{s}| \\le \\text{path length}",
      },
      {
        heading: "Average vs instantaneous quantities",
        level: "standard",
        body:
          "Average velocity uses total displacement over total time and says nothing about the middle of the trip. Instantaneous velocity is the limit as the time interval shrinks to zero — the tangent slope on a position–time graph. Speed is the magnitude of velocity; average speed (path length / time) is generally greater than |average velocity|.",
        math: "v_{avg} = \\frac{\\Delta s}{\\Delta t}, \\qquad v_{inst} = \\lim_{\\Delta t \\to 0} \\frac{\\Delta s}{\\Delta t} = \\frac{ds}{dt}",
      },
      {
        heading: "The three equations of motion under uniform acceleration",
        level: "standard",
        body:
          "For constant acceleration only, three equations link the five quantities u, v, a, t and s. Each equation omits exactly one of them, so choosing the equation is really asking which quantity you neither know nor need. Non-uniform acceleration must be handled with calculus.",
        math: "v = u + at; \\quad s = ut + \\tfrac{1}{2}at^2; \\quad v^2 = u^2 + 2as",
      },
      {
        heading: "Distance travelled in the nth second",
        level: "pro",
        body:
          "The distance covered during the nth second (between t = n−1 and t = n) is the difference of the position functions, giving s_n = u + (a/2)(2n − 1). The odd-number sequence 1 : 3 : 5 : 7 for successive seconds (starting from rest) is a direct signature of uniform acceleration and is a favourite reasoning question.",
        math: "s_n = u + \\frac{a}{2}(2n - 1)",
      },
      {
        heading: "Projectile motion — the two-motion superposition",
        level: "pro",
        body:
          "A projectile is two independent 1-D motions glued together: uniform velocity horizontally, free fall vertically. Time of flight comes only from the vertical motion; range comes from horizontal velocity × that time. Maximum range occurs at 45°, and complementary angles (θ and 90°−θ) give equal ranges.",
        math: "T = \\frac{2u\\sin\\theta}{g}, \\quad H = \\frac{u^2\\sin^2\\theta}{2g}, \\quad R = \\frac{u^2\\sin 2\\theta}{g}",
      },
      {
        heading: "Relative velocity and river/rain problems",
        level: "pro",
        body:
          "Relative velocity is vector subtraction: velocity of A as seen from B is v_A − v_B. Crossing a river by the shortest path requires heading upstream to cancel the current; crossing in the shortest time means heading straight across. The wind/rain problems use the same subtraction with a tangent for the required drift angle.",
        math: "\\vec{v}_{AB} = \\vec{v}_A - \\vec{v}_B",
      },
    ],
    formulas: [
      {
        name: "First equation of motion",
        latex: "v = u + at",
        symbols: [
          { sym: "u", meaning: "initial velocity", unit: "m/s" },
          { sym: "v", meaning: "final velocity", unit: "m/s" },
          { sym: "a", meaning: "uniform acceleration", unit: "m/s²" },
          { sym: "t", meaning: "time elapsed", unit: "s" },
        ],
        when: "Acceleration must be constant (uniform). Not valid for variable acceleration.",
        hook: "Velocity is just 'start plus how much it grew'.",
      },
      {
        name: "Second equation of motion",
        latex: "s = ut + \\tfrac{1}{2}at^2",
        symbols: [
          { sym: "s", meaning: "displacement in time t", unit: "m" },
          { sym: "u", meaning: "initial velocity", unit: "m/s" },
          { sym: "a", meaning: "uniform acceleration", unit: "m/s²" },
        ],
        when: "Constant acceleration. If a = 0 it reduces to s = ut.",
      },
      {
        name: "Third equation of motion",
        latex: "v^2 = u^2 + 2as",
        symbols: [
          { sym: "v", meaning: "final velocity", unit: "m/s" },
          { sym: "u", meaning: "initial velocity", unit: "m/s" },
          { sym: "a", meaning: "uniform acceleration", unit: "m/s²" },
          { sym: "s", meaning: "displacement", unit: "m" },
        ],
        when: "Constant acceleration and time is unknown — the 'time-free' equation.",
        hook: "Whenever t is not mentioned, reach for this one.",
      },
      {
        name: "Distance in the nth second",
        latex: "s_n = u + \\frac{a}{2}(2n - 1)",
        symbols: [
          { sym: "s_n", meaning: "distance during the nth second", unit: "m" },
          { sym: "n", meaning: "which second (n = 1, 2, 3…)" },
        ],
        when: "Uniform acceleration, counting the interval between (n−1) s and n s.",
      },
      {
        name: "Time of flight (projectile)",
        latex: "T = \\frac{2u\\sin\\theta}{g}",
        symbols: [
          { sym: "u", meaning: "launch speed", unit: "m/s" },
          { sym: "θ", meaning: "angle above horizontal", unit: "°" },
          { sym: "g", meaning: "acceleration due to gravity", unit: "m/s²" },
        ],
        when: "Level ground (launch and landing at same height), no air resistance.",
      },
      {
        name: "Maximum height (projectile)",
        latex: "H = \\frac{u^2\\sin^2\\theta}{2g}",
        symbols: [
          { sym: "H", meaning: "peak height above launch level", unit: "m" },
          { sym: "u", meaning: "launch speed", unit: "m/s" },
        ],
        when: "At the top the vertical velocity is momentarily zero; horizontal velocity is unchanged.",
      },
      {
        name: "Horizontal range (projectile)",
        latex: "R = \\frac{u^2\\sin 2\\theta}{g}",
        symbols: [
          { sym: "R", meaning: "horizontal range", unit: "m" },
          { sym: "θ", meaning: "launch angle", unit: "°" },
        ],
        when: "Level ground, no air resistance. Maximum at θ = 45°.",
        hook: "R is maximum when sin 2θ = 1, i.e. 2θ = 90°.",
      },
      {
        name: "Trajectory equation",
        latex: "y = x\\tan\\theta - \\frac{gx^2}{2u^2\\cos^2\\theta}",
        symbols: [
          { sym: "y", meaning: "height at horizontal distance x", unit: "m" },
          { sym: "x", meaning: "horizontal distance from launch", unit: "m" },
        ],
        when: "Describes the parabolic path; useful to find where it lands on a slope or wall.",
      },
    ],
    specialCases: [
      {
        title: "Starting from rest",
        condition: "u = 0",
        result: "v = at, \\quad s = \\tfrac{1}{2}at^2, \\quad v^2 = 2as",
        why: "Half the terms vanish, so free-fall distances follow 1 : 4 : 9 for 1 s, 2 s, 3 s — the t² signature.",
        askedIn: "Free-fall depth and time questions.",
      },
      {
        title: "Body thrown vertically upward (top of flight)",
        condition: "v = 0 at the highest point",
        result: "H = \\frac{u^2}{2g}, \\qquad T_{total} = \\frac{2u}{g}",
        why: "Gravity decelerates on the way up and accelerates on the way down; the two legs are symmetric, so total time is twice the rise time.",
        askedIn: "Almost every vertical-motion numerical.",
      },
      {
        title: "Complementary angles give equal range",
        condition: "θ' = 90° − θ",
        result: "R(\\theta) = R(90^\\circ - \\theta)",
        why: "sin 2θ = sin(180° − 2θ). A 30° shot and a 60° shot land at the same spot, but the 60° shot flies higher and stays longer.",
        askedIn: "Conceptual range comparison, 2-mark theory.",
      },
      {
        title: "Projectile on maximum range",
        condition: "θ = 45°",
        result: "R_{max} = \\frac{u^2}{g}, \\qquad H = \\frac{R_{max}}{4}",
        why: "sin 2θ peaks at 1 when θ = 45°; the height–range relation 4H = R only holds at this angle.",
        askedIn: "Short numericals and MCQ.",
      },
      {
        title: "Zero displacement, non-zero distance",
        condition: "Return to the starting point",
        result: "\\vec{s} = 0 \\text{ but distance} \\neq 0, \\quad v_{avg} = 0",
        why: "Displacement is a vector difference of endpoints; average velocity divides it by time, so it becomes zero while average speed stays positive.",
        askedIn: "Trick MCQs on average speed vs velocity.",
      },
    ],
    tricks: [
      {
        title: "Pick the equation by the missing quantity",
        how:
          "List u, v, a, t, s and mark what is absent. No t → use v² = u² + 2as; no s → use v = u + at; no v → use s = ut + ½at².",
        example: "'A car accelerates from 10 m/s at 2 m/s² for 50 m' — t is missing, so $v^2 = 10^2 + 2(2)(50) = 300$.",
        saves: "~20 s per numerical",
      },
      {
        title: "Symmetry halving",
        how:
          "For a body thrown up, solve only the upward half (v = 0) then double the time. Never solve the full parabola twice.",
        example: "u = 20 m/s up: rise time $t = 20/10 = 2$ s, so the whole flight is 4 s.",
        saves: "~30 s",
      },
      {
        title: "Area and slope of graphs",
        how:
          "On a v–t graph the area gives displacement and the slope gives acceleration. On x–t the slope gives velocity. Sketching is often faster than algebra.",
        example: "Velocities 0→20 m/s over 10 s: area $= \\tfrac{1}{2}(20)(10) = 100$ m.",
      },
      {
        title: "Odd-number sequence from rest",
        how:
          "If a body starts from rest with uniform a, distances in 1st, 2nd, 3rd second are in ratio 1 : 3 : 5. Spot it instantly in ratio questions.",
        example: "Distance in the 4th second = $\\tfrac{a}{2}(2 \\times 4 - 1) = 3.5a$.",
        saves: "~40 s in ratio MCQs",
      },
      {
        title: "River crossing: two separate answers",
        how:
          "Shortest TIME → head straight across, time = width / v_boat. Shortest PATH → tilt upstream by sin θ = v_river / v_boat.",
        example: "Width 60 m, boat 3 m/s, current 1 m/s: shortest time $= 60/3 = 20$ s.",
      },
    ],
    mistakes: [
      {
        wrong: "Using average speed formulas for non-uniform motion.",
        right: "Average speed = total path / total time, always — never (u + v)/2 unless acceleration is uniform.",
        why: "(u+v)/2 is valid only for constant acceleration; examiners plant non-uniform pieces to catch this.",
      },
      {
        wrong: "Treating distance and displacement as equal.",
        right: "Use displacement for velocity questions and distance for speed questions, and never cancel the two.",
        why: "A to-and-fro journey gives zero average velocity but positive average speed; the two answers differ.",
      },
      {
        wrong: "Applying v² = u² + 2as when acceleration is not constant.",
        right: "Check uniformity first; otherwise integrate: v = ∫a dt, s = ∫v dt.",
        why: "The three equations are derived assuming a = constant.",
      },
      {
        wrong: "Taking g positive while going up without signing it correctly.",
        right: "Fix one sign convention first (up = +), then a = −g for the whole flight.",
        why: "Mixed signs produce a physically impossible negative height or wrong flight time.",
      },
    ],
  },

  /* ══════════ 2 · LAWS OF MOTION & WORK–ENERGY ══════════ */
  {
    id: "laws-of-motion-work-energy",
    title: "Laws of Motion & Work–Energy",
    classLevel: "class-11",
    blurb:
      "Newton's three laws, free-body diagrams, friction, circular dynamics, and the work–energy theorem with power and collisions.",
    theory: [
      {
        heading: "Newton's laws and inertia",
        level: "basic",
        body:
          "The first law defines force as the agent that changes velocity — a body keeps its state unless a net external force acts. The second law quantifies it: net force equals the rate of change of momentum. The third law pairs every force with an equal, opposite force on a different body, which is why a single object can never self-accelerate.",
        math: "\\vec{F}_{net} = \\frac{d\\vec{p}}{dt} = m\\vec{a} \\quad (m \\text{ constant})",
      },
      {
        heading: "Free-body diagrams and equilibrium",
        level: "standard",
        body:
          "Every mechanics problem starts by isolating one body and drawing only the forces on it: weight, normal, tension, friction, applied. Resolve along the motion direction and perpendicular to it. Equilibrium means the net force is zero in every direction — but not that the body is at rest: constant-velocity motion is also equilibrium.",
      },
      {
        heading: "Friction: static vs kinetic",
        level: "standard",
        body:
          "Static friction is self-adjusting up to a maximum μ_sN; it equals whatever is needed to prevent sliding. Once sliding starts, kinetic friction takes over at f_k = μ_kN with μ_k < μ_s. On an incline the block begins to slide when tan θ = μ_s, which is the angle of repose — a clean way to measure μ experimentally.",
        math: "f_s \\le \\mu_s N, \\qquad f_k = \\mu_k N, \\qquad \\tan\\theta_{repose} = \\mu_s",
      },
      {
        heading: "Circular motion: centripetal force is a role, not a new force",
        level: "pro",
        body:
          "In uniform circular motion the speed is constant but the direction changes, so there is an inward acceleration v²/r. The net inward force is supplied by whatever real force exists — tension for a stone on a string, friction for a car on a bend, gravity for a satellite. On a banked road the design speed satisfies tan θ = v²/(rg), so no friction is needed at that speed.",
        math: "a_c = \\frac{v^2}{r} = \\omega^2 r, \\qquad \\tan\\theta_{bank} = \\frac{v^2}{rg}",
      },
      {
        heading: "Work–energy theorem",
        level: "pro",
        body:
          "The net work done on a body equals its change in kinetic energy. This converts force-and-distance problems into energy bookkeeping and often removes the need to know the path. Work is positive when force and displacement share a direction, negative when opposed, and zero when perpendicular.",
        math: "W_{net} = \\Delta KE = \\tfrac{1}{2}mv^2 - \\tfrac{1}{2}mu^2",
      },
      {
        heading: "Conservation of energy and power",
        level: "pro",
        body:
          "With only conservative forces, KE + PE stays constant, so a falling body trades height for speed: v = √(2gh) regardless of mass. Power is the rate of doing work; average power uses total work over total time, while instantaneous power is F·v. Efficiency compares useful output to total input.",
        math: "mgh = \\tfrac{1}{2}mv^2, \\qquad P_{avg} = \\frac{W}{t}, \\qquad P_{inst} = \\vec{F}\\cdot\\vec{v}",
      },
    ],
    formulas: [
      {
        name: "Newton's second law",
        latex: "\\vec{F}_{net} = m\\vec{a}",
        symbols: [
          { sym: "F_net", meaning: "vector sum of all external forces", unit: "N" },
          { sym: "m", meaning: "mass (inertia)", unit: "kg" },
          { sym: "a", meaning: "resulting acceleration", unit: "m/s²" },
        ],
        when: "Mass constant and speed far below light speed.",
      },
      {
        name: "Impulse–momentum",
        latex: "\\vec{F}\\Delta t = \\Delta \\vec{p} = m\\vec{v} - m\\vec{u}",
        symbols: [
          { sym: "F", meaning: "average force during contact", unit: "N" },
          { sym: "Δt", meaning: "contact time", unit: "s" },
          { sym: "Δp", meaning: "change in momentum", unit: "kg·m/s" },
        ],
        when: "Whenever the contact time is short — collisions, catches, kicks.",
        hook: "Longer contact time means smaller force for the same momentum change.",
      },
      {
        name: "Kinetic friction",
        latex: "f_k = \\mu_k N",
        symbols: [
          { sym: "μ_k", meaning: "coefficient of kinetic friction" },
          { sym: "N", meaning: "normal reaction", unit: "N" },
        ],
        when: "Body already sliding. On a horizontal surface N = mg; on an incline N = mg cos θ.",
      },
      {
        name: "Angle of repose",
        latex: "\\mu_s = \\tan\\theta",
        symbols: [
          { sym: "θ", meaning: "steepest angle at which the body stays put", unit: "°" },
        ],
        when: "Block just about to slide down a rough incline.",
      },
      {
        name: "Centripetal acceleration and force",
        latex: "a_c = \\frac{v^2}{r}, \\qquad F_c = \\frac{mv^2}{r}",
        symbols: [
          { sym: "v", meaning: "tangential speed", unit: "m/s" },
          { sym: "r", meaning: "radius of the circular path", unit: "m" },
        ],
        when: "Uniform circular motion (speed constant). Direction always toward the centre.",
      },
      {
        name: "Banking of roads",
        latex: "\\tan\\theta = \\frac{v^2}{rg}",
        symbols: [
          { sym: "θ", meaning: "banking angle", unit: "°" },
          { sym: "v", meaning: "design speed", unit: "m/s" },
        ],
        when: "Frictionless banking at the design speed; above or below it friction reappears.",
      },
      {
        name: "Work done by a force",
        latex: "W = Fs\\cos\\theta",
        symbols: [
          { sym: "F", meaning: "applied force", unit: "N" },
          { sym: "s", meaning: "displacement", unit: "m" },
          { sym: "θ", meaning: "angle between force and displacement", unit: "°" },
        ],
        when: "Constant force. Zero work when θ = 90°.",
      },
      {
        name: "Work–energy theorem",
        latex: "W_{net} = \\tfrac{1}{2}mv^2 - \\tfrac{1}{2}mu^2",
        symbols: [
          { sym: "W_net", meaning: "total work by all forces", unit: "J" },
          { sym: "u, v", meaning: "initial and final speeds", unit: "m/s" },
        ],
        when: "Always valid, including variable forces if W_net is computed correctly.",
        hook: "Energy is the lazy person's force problem.",
      },
      {
        name: "Power",
        latex: "P = \\frac{W}{t} = \\vec{F}\\cdot\\vec{v}",
        symbols: [
          { sym: "P", meaning: "power", unit: "W" },
          { sym: "W", meaning: "work done", unit: "J" },
          { sym: "t", meaning: "time taken", unit: "s" },
        ],
        when: "The first form is average power; F·v gives instantaneous power.",
      },
    ],
    specialCases: [
      {
        title: "Frictionless incline",
        condition: "μ = 0, angle θ",
        result: "a = g\\sin\\theta, \\qquad N = mg\\cos\\theta",
        why: "Only the component of weight along the slope drives motion; the perpendicular component gives the normal.",
        askedIn: "Block-on-incline numericals, connected bodies.",
      },
      {
        title: "Just about to slide",
        condition: "tan θ = μ_s",
        result: "f_s = f_{s,max} = \\mu_s mg\\cos\\theta",
        why: "At the critical angle static friction is fully used; beyond it the block accelerates.",
      },
      {
        title: "Vertical circle — minimum speed at the top",
        condition: "Tension at the top becomes zero",
        result: "v_{top} = \\sqrt{gr}, \\qquad v_{bottom} = \\sqrt{5gr}",
        why: "At the top, gravity alone must supply the centripetal force; at the bottom, tension must also carry the weight and the stored energy, giving the √5 factor.",
        askedIn: "String and roller-coaster conceptual questions.",
      },
      {
        title: "Perfectly elastic collision — equal masses",
        condition: "m₁ = m₂, e = 1",
        result: "v_1' = u_2, \\qquad v_2' = u_1",
        why: "The two bodies simply exchange velocities; a head-on billiard-ball hit is the textbook picture.",
      },
      {
        title: "Zero work with non-zero force",
        condition: "θ = 90° (or no displacement)",
        result: "W = 0",
        why: "Work needs a component of force along displacement. A porter carrying a load on a level road does zero work against gravity; a satellite in a circular orbit has gravity doing no work, hence constant speed.",
        askedIn: "Work-done conceptual MCQs.",
      },
    ],
    tricks: [
      {
        title: "Lift problems by apparent weight",
        how:
          "Read the normal reaction: N = m(g + a) when accelerating upward, N = m(g − a) downward, N = mg at rest or uniform speed.",
        example: "60 kg in a lift accelerating up at 2 m/s²: $N = 60(10+2) = 720$ N.",
        saves: "~25 s",
      },
      {
        title: "Connected bodies: one system equation",
        how:
          "Treat blocks joined by a taut string as one system for acceleration, then isolate one block for tension.",
        example: "$a = \\dfrac{F}{m_1 + m_2}$, then $T = m_2 a$.",
        saves: "~40 s vs two simultaneous equations",
      },
      {
        title: "Energy shortcut for height questions",
        how:
          "Any smooth descent converts mgh into ½mv² — mass cancels, so v = √(2gh) for all bodies.",
        example: "Dropped from 45 m: $v = \\sqrt{2 \\times 10 \\times 45} = 30$ m/s.",
        saves: "~30 s",
      },
      {
        title: "Momentum first, energy second",
        how:
          "In collisions always apply momentum conservation first (it holds in every type), then energy only if told elastic.",
        example: "Two 2 kg bodies 4 m/s and −2 m/s: combined momentum $= 4$, so $v = 1$ m/s for perfectly inelastic.",
      },
      {
        title: "Angle-of-repose check",
        how:
          "If the incline angle exceeds tan⁻¹μ the block slides; otherwise it stays. Compare numbers, do not solve equations.",
        example: "μ = 0.5 → critical angle ≈ 26.6°, so a 30° slope slides.",
        saves: "~20 s",
      },
    ],
    mistakes: [
      {
        wrong: "Adding action and reaction on the same body and calling it zero net force.",
        right: "Action and reaction act on different bodies; never cancel them within one free-body diagram.",
        why: "This is the single most common third-law misunderstanding.",
      },
      {
        wrong: "Assuming static friction is always μ_sN.",
        right: "Static friction takes any value from 0 up to μ_sN, depending on what is needed.",
        why: "Using the maximum value makes a resting block appear about to slide.",
      },
      {
        wrong: "Calling centripetal force an extra force in the diagram.",
        right: "Label the real force (tension, friction, gravity, normal) and say it plays the centripetal role.",
        why: "Adding a phantom 'centripetal force' double-counts and breaks the equations.",
      },
      {
        wrong: "Applying energy conservation on a rough surface.",
        right: "Include the friction term: initial energy = final energy + heat lost to friction.",
        why: "Friction is non-conservative; ignoring it inflates the final speed.",
      },
      {
        wrong: "Confusing power with energy.",
        right: "Power is energy per second (W); multiply by time to get joules.",
        why: "Unit slips and factor-of-time errors follow from this swap.",
      },
    ],
  },

  /* ══════════════════════ 3 · GRAVITATION ══════════════════════ */
  {
    id: "gravitation",
    title: "Gravitation",
    classLevel: "class-11",
    blurb:
      "Newton's law of gravitation, g variation, gravitational potential and energy, escape velocity, orbits and Kepler's laws.",
    theory: [
      {
        heading: "Newton's law of gravitation",
        level: "basic",
        body:
          "Every pair of masses attracts with a force proportional to the product of the masses and inversely proportional to the square of the separation measured centre-to-centre. The force is always attractive, acts along the line of centres, and forms an action–reaction pair. It is the weakest fundamental force but dominates on astronomical scales because it never cancels out.",
        math: "F = \\frac{Gm_1m_2}{r^2}, \\qquad G = 6.67 \\times 10^{-11}\\ \\text{N·m}^2/\\text{kg}^2",
      },
      {
        heading: "Acceleration due to gravity and its variation",
        level: "standard",
        body:
          "g is the field strength produced by a planet: g = GM/R². It decreases with height as (1 + h/R)⁻², decreases linearly with depth as (1 − d/R), and peaks at the poles while dipping slightly at the equator — because the Earth is flattened and the spinning equator needs some gravity to supply centripetal force.",
        math: "g_h = g\\left(1 - \\frac{2h}{R}\\right) \\ (h \\ll R), \\qquad g_d = g\\left(1 - \\frac{d}{R}\\right)",
      },
      {
        heading: "Gravitational potential and potential energy",
        level: "pro",
        body:
          "Potential is work per unit mass bringing a test mass from infinity to the point, hence V = −GM/r: negative because gravity is attractive and infinity is the zero reference. Potential energy is U = −GMm/r. The negative sign is what makes bound orbits possible — total energy is negative for a bound system.",
        math: "V = -\\frac{GM}{r}, \\qquad U = -\\frac{GMm}{r}",
      },
      {
        heading: "Escape velocity",
        level: "pro",
        body:
          "Escape velocity is the minimum launch speed needed so the total energy reaches zero at infinity. It is independent of the projectile's mass and direction (ignoring air resistance), and equals √2 times the orbital speed near the surface. For Earth it is about 11.2 km/s.",
        math: "v_e = \\sqrt{\\frac{2GM}{R}} = \\sqrt{2gR}",
      },
      {
        heading: "Orbital motion and satellites",
        level: "pro",
        body:
          "For a circular orbit gravity supplies exactly the centripetal force, giving v = √(GM/r) and T² ∝ r³. A geostationary satellite needs T = 24 h, which fixes r ≈ 42,000 km from the centre and forces it to sit over the equator. Orbital speed falls with height, so lower orbits are faster.",
        math: "v_{orb} = \\sqrt{\\frac{GM}{r}}, \\qquad T = 2\\pi\\sqrt{\\frac{r^3}{GM}}",
      },
      {
        heading: "Kepler's three laws",
        level: "pro",
        body:
          "Planets move on ellipses with the Sun at one focus; the radius vector sweeps equal areas in equal times (conservation of angular momentum, so a planet speeds up at perihelion); and T² ∝ a³ with the same constant for all planets of a system. Kepler's second law is the observable face of angular momentum conservation.",
        math: "\\frac{dA}{dt} = \\frac{L}{2m} = \\text{constant}, \\qquad T^2 \\propto a^3",
      },
    ],
    formulas: [
      {
        name: "Newton's law of gravitation",
        latex: "F = \\frac{Gm_1m_2}{r^2}",
        symbols: [
          { sym: "G", meaning: "universal gravitational constant", unit: "N·m²/kg²" },
          { sym: "r", meaning: "centre-to-centre separation", unit: "m" },
        ],
        when: "Point masses or uniform spheres (r measured from centres).",
      },
      {
        name: "Acceleration due to gravity",
        latex: "g = \\frac{GM}{R^2}",
        symbols: [
          { sym: "M", meaning: "mass of the planet", unit: "kg" },
          { sym: "R", meaning: "radius of the planet", unit: "m" },
        ],
        when: "At the surface of a spherically symmetric planet.",
      },
      {
        name: "g at height h",
        latex: "g_h = g\\left(\\frac{R}{R+h}\\right)^2 \\approx g\\left(1 - \\frac{2h}{R}\\right)",
        symbols: [
          { sym: "h", meaning: "height above the surface", unit: "m" },
        ],
        when: "The approximation needs h much smaller than R; use the exact form otherwise.",
      },
      {
        name: "g at depth d",
        latex: "g_d = g\\left(1 - \\frac{d}{R}\\right)",
        symbols: [{ sym: "d", meaning: "depth below the surface", unit: "m" }],
        when: "Uniform-density shell model; g → 0 at the centre.",
      },
      {
        name: "Gravitational potential",
        latex: "V = -\\frac{GM}{r}",
        symbols: [{ sym: "V", meaning: "potential (work per unit mass)", unit: "J/kg" }],
        when: "Zero reference taken at infinity; always negative for a bound point.",
        hook: "Negative potential is the signature of attraction.",
      },
      {
        name: "Gravitational potential energy",
        latex: "U = -\\frac{GMm}{r}",
        symbols: [{ sym: "U", meaning: "mutual potential energy", unit: "J" }],
        when: "Two-body system; near the surface it reduces to mgh.",
      },
      {
        name: "Escape velocity",
        latex: "v_e = \\sqrt{\\frac{2GM}{R}} = \\sqrt{2gR}",
        symbols: [{ sym: "v_e", meaning: "minimum escape speed", unit: "m/s" }],
        when: "Launch from the surface ignoring atmosphere; independent of mass and direction.",
        hook: "Escape speed is √2 × orbital speed, always.",
      },
      {
        name: "Orbital velocity and period",
        latex: "v = \\sqrt{\\frac{GM}{r}}, \\qquad T = 2\\pi\\sqrt{\\frac{r^3}{GM}}",
        symbols: [
          { sym: "r", meaning: "orbital radius from the centre", unit: "m" },
          { sym: "T", meaning: "orbital period", unit: "s" },
        ],
        when: "Circular orbit. Lower orbit = faster satellite.",
      },
      {
        name: "Kepler's third law",
        latex: "T^2 = \\frac{4\\pi^2 a^3}{GM}",
        symbols: [
          { sym: "a", meaning: "semi-major axis", unit: "m" },
          { sym: "M", meaning: "mass of the central body", unit: "kg" },
        ],
        when: "Any orbit around a dominant central mass.",
      },
    ],
    specialCases: [
      {
        title: "Height equal to Earth's radius",
        condition: "h = R",
        result: "g_h = \\frac{g}{4}, \\qquad v_e\\text{ unchanged at launch}",
        why: "Inverse-square fall: doubling the distance from the centre quarters the field strength.",
        askedIn: "Standard variation-of-g numerical.",
      },
      {
        title: "At the centre of the Earth",
        condition: "d = R",
        result: "g = 0, \\qquad V = -\\frac{3GM}{2R}",
        why: "All shells outside the point cancel, so the field vanishes but the potential does not.",
        askedIn: "Conceptual MCQ with a common wrong answer of V = 0.",
      },
      {
        title: "Escape velocity vs orbital velocity",
        condition: "Launch from the same radius",
        result: "v_e = \\sqrt{2}\\, v_{orb}",
        why: "Orbit needs half the escape energy — the 'far from a planet' half is the rest.",
      },
      {
        title: "Geostationary satellite",
        condition: "T = 24 h, equatorial plane",
        result: "r \\approx 42{,}000 \\text{ km}, \\quad h \\approx 36{,}000 \\text{ km}",
        why: "Period must match Earth's rotation, which pins the radius; only the equatorial plane lets it stay above one point.",
        askedIn: "Communication-satellite and height numericals.",
      },
      {
        title: "Weightlessness in orbit",
        condition: "Free-fall orbit",
        result: "N = 0 \\text{ while } g \\neq 0",
        why: "Astronaut and spacecraft fall with the same acceleration, so there is no normal reaction — not an absence of gravity.",
        askedIn: "Classic 'why do astronauts float' question.",
      },
      {
        title: "Perihelion vs aphelion speed",
        condition: "Equal areas in equal times",
        result: "v_p r_p = v_a r_a",
        why: "Angular momentum is conserved, so the planet moves fastest when closest.",
      },
    ],
    tricks: [
      {
        title: "Ratio scaling",
        how:
          "For planets, compare with Earth: g ∝ M/R² and v_e ∝ √(M/R). Set up a simple ratio instead of plugging G.",
        example: "A planet with 4× Earth's mass and 2× radius has $g = 10 \\times 4/4 = 10$ m/s².",
        saves: "~45 s",
      },
      {
        title: "Height vs depth in one line",
        how:
          "Approximate: going up by h reduces g by 2h/R; going down by h reduces g by h/R. Depth costs half as much.",
        example: "h = d = 1% of R: up loses 2%, down loses 1%.",
        saves: "~25 s",
      },
      {
        title: "Energy sign test for bound orbits",
        how:
          "Total energy E = −GMm/2r is negative for a closed orbit, zero for a parabolic escape, positive for a flyby.",
        example: "Doubling the orbital radius halves the kinetic energy and doubles the potential term.",
      },
      {
        title: "T² ∝ r³ shortcut",
        how:
          "Known the period and radius of one satellite, get any other: (T₂/T₁)² = (r₂/r₁)³.",
        example: "r × 4 → T × 8.",
        saves: "~30 s",
      },
    ],
    mistakes: [
      {
        wrong: "Using r as the height above the surface in orbit formulas.",
        right: "Orbital r is measured from the planet's centre: r = R + h.",
        why: "Substituting h directly underestimates by a factor R/(R+h) — huge for low orbits.",
      },
      {
        wrong: "Thinking escape velocity depends on the mass or direction of the projectile.",
        right: "v_e = √(2GM/R) depends only on the planet.",
        why: "The projectile's mass cancels between kinetic and potential energy.",
      },
      {
        wrong: "Saying gravity is zero in a satellite.",
        right: "g is still substantial; the satellite is in continuous free fall, so nothing pushes you.",
        why: "Confusing apparent weightlessness with zero field strength.",
      },
      {
        wrong: "Forgetting the minus sign in V or U.",
        right: "Keep V = −GM/r and U = −GMm/r; bound systems have negative total energy.",
        why: "Sign errors flip bound orbits into escaping ones.",
      },
    ],
  },
];
