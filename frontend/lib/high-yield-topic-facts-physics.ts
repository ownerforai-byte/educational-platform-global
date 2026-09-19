import type { HighYieldTopicData } from "@/lib/high-yield-topic-facts";

/**
 * Physics high-yield bank, part 1 — measurement and mechanics.
 *
 * The original `HIGH_YIELD_TOPIC_BANK` held five subject-wide entries, so most
 * physics units fell through to whatever entry happened to match the subject.
 * Entries here are unit-scoped so the topic page shows facts that actually
 * belong to the topic. Heat, optics, electricity, semiconductors and nuclear
 * physics live in `high-yield-topic-facts-physics-2.ts`.
 *
 * REQUIRED: every entry here must list the `unitSlugs` it serves, copied from
 * `frontend/lib/syllabus.ts`. Unit-aware callers (the topic page passes its
 * `unitId`) only resolve entries through `unitSlugs`; `topicKeywords` is a
 * legacy fallback for callers that do not know the unit. An entry with no
 * matching `unitSlugs` is therefore never shown on a topic page, which looks
 * exactly like missing content.
 *
 * One entry may serve several units — e.g. a single ray-optics entry covering
 * mirrors, plane refraction, prisms and dispersion.
 *
 * Keyword guidance: prefer slugs and the exact words used in
 * `frontend/lib/syllabus.ts` unit/topic names, and keep keywords long enough
 * that they do not collide with other units (e.g. "orbital-speed" is better
 * than "speed").
 *
 * See `high-yield-topic-facts.ts` for the resolution rules.
 */
export const HIGH_YIELD_TOPIC_BANK_PHYSICS: HighYieldTopicData[] = [
  // ─────────────────────────────────────────────────────────────
  // PHYSICS — Physical Quantities & Measurement
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "physical-quantities",
      "physical-quantity",
      "measurement",
      "dimension",
      "dimensional",
      "significant-figure",
      "significant-figures",
      "s-f-rules",
      "error-analysis",
      "error",
      "l-s-a-q-and-n",
      "vernier",
      "screw-gauge",
      "units-and-measurement",
    ],
    subject: "physics",
    title: "Physical Quantities, Units, Dimensions & Error Analysis",
    // "mechanics" is a legacy pooled unit in the content manifests whose topics
    // are measurement and vectors; keyword scoring splits them between this
    // entry and the vectors entry.
    unitSlugs: ["physical-quantities", "mechanics"],
    category: "Measurement & Instrumentation",
    governingLaws: [
      {
        name: "Principle of Homogeneity of Dimensions",
        statement:
          "Every term on both sides of a physically correct equation must have the same dimensions. Dimensional homogeneity is a necessary but NOT sufficient condition for an equation to be physically correct — a dimensionally balanced equation can still be wrong by a dimensionless factor.",
        formula: "[LHS] = [RHS]",
        conditions:
          "Applies only to equations involving sums/differences of terms; cannot validate dimensionless constants such as the 1/2 in kinetic energy.",
      },
      {
        name: "Combination of Errors",
        statement:
          "For sums and differences the absolute errors add; for products and quotients the relative (fractional) errors add. If a quantity is raised to a power n, its relative error is multiplied by n.",
        formula:
          "Z = A^p B^q / C^r \\implies \\frac{\\Delta Z}{Z} = p\\frac{\\Delta A}{A} + q\\frac{\\Delta B}{B} + r\\frac{\\Delta C}{C}",
        conditions:
          "Errors are treated as independent and always add (worst case); sign of the exponent is ignored.",
      },
    ],
    speedFormulas: [
      {
        name: "Vernier Callipers Least Count",
        formula: "LC = \\frac{\\text{1 main scale division}}{\\text{number of vernier divisions}}",
        description:
          "For the standard vernier, LC = 1 MSD − 1 VSD = 0.1 mm = 0.01 cm.",
        unit: "cm or mm",
      },
      {
        name: "Screw Gauge Least Count",
        formula: "LC = \\frac{\\text{pitch}}{\\text{number of circular scale divisions}}",
        description:
          "Standard screw gauge: pitch 0.5 mm and 50 divisions, so LC = 0.01 mm. Always check for zero error and apply its sign correction.",
        unit: "mm",
      },
      {
        name: "Mean Absolute, Relative and Percentage Error",
        formula:
          "\\Delta \\bar{a} = \\frac{1}{n}\\sum |a_i - \\bar{a}|, \\quad \\text{relative} = \\frac{\\Delta \\bar{a}}{\\bar{a}}, \\quad \\% = \\frac{\\Delta \\bar{a}}{\\bar{a}} \\times 100",
        description:
          "Report a measured value as (mean ± mean absolute error) with the same number of decimal places as the mean.",
        unit: "same as the quantity",
      },
      {
        name: "Significant Figures in Arithmetic",
        formula:
          "\\text{multiplication/division} \\to \\text{least s.f.}, \\quad \\text{addition/subtraction} \\to \\text{least decimal places}",
        description:
          "Rounding rule: the result of 4.237 × 2.1 keeps 2 significant figures, giving 8.9.",
        unit: "dimensionless count",
      },
    ],
    constantsAndValues: [
      { symbol: "g", name: "Acceleration due to gravity (standard)", value: "9.8", unit: "m s^-2" },
      { symbol: "G", name: "Universal gravitational constant", value: "6.67 x 10^-11", unit: "N m^2 kg^-2" },
      { symbol: "c", name: "Speed of light in vacuum", value: "3 x 10^8", unit: "m s^-1" },
      { symbol: "h", name: "Planck's constant", value: "6.63 x 10^-34", unit: "J s" },
      { symbol: "e", name: "Elementary charge", value: "1.6 x 10^-19", unit: "C" },
      { symbol: "N_A", name: "Avogadro's number", value: "6.022 x 10^23", unit: "mol^-1" },
      { symbol: "R", name: "Universal gas constant", value: "8.314", unit: "J mol^-1 K^-1" },
      { symbol: "k", name: "Boltzmann constant", value: "1.38 x 10^-23", unit: "J K^-1" },
      { symbol: "1 amu", name: "Atomic mass unit (energy equivalent)", value: "931.5", unit: "MeV" },
      { symbol: "P_atm", name: "Standard atmospheric pressure", value: "1.013 x 10^5", unit: "Pa" },
    ],
    entranceTraps: [
      {
        trap: "A dimensionally correct formula must be the correct formula.",
        truth:
          "Dimensional correctness is only a necessary condition. Kinetic energy 1/2 mv^2 and mv^2 are both dimensionally valid, but only the first is right — dimensionless factors cannot be checked by dimensions.",
        examRef: "IOE/CEE — dimensional analysis questions",
      },
      {
        trap: "A dimensionless quantity has no unit.",
        truth:
          "Plane angle is dimensionless yet is measured in radians, and strain is dimensionless with no unit. Dimensionless and unitless are not the same thing.",
        examRef: "IOE — units and dimensions",
      },
      {
        trap: "Errors always subtract when quantities are divided.",
        truth:
          "Relative errors always ADD in the worst case, regardless of whether the quantities are multiplied or divided.",
        examRef: "IOE/CEE — error analysis numericals",
      },
    ],
    workedNumericals: [
      {
        problem:
          "The mass of a cube is measured as 5.00 g and its edge as 1.20 cm with a least count of 0.01 cm. Find its density with percentage error.",
        given: "m = 5.00 g, a = 1.20 cm, \\Delta m = 0.01 g, \\Delta a = 0.01 cm",
        steps: [
          "Volume: V = a^3 = (1.20)^3 = 1.728 \\text{ cm}^3",
          "Density: \\rho = \\frac{m}{V} = \\frac{5.00}{1.728} = 2.894 \\text{ g cm}^{-3}",
          "Relative error: \\frac{\\Delta \\rho}{\\rho} = \\frac{\\Delta m}{m} + 3\\frac{\\Delta a}{a} = \\frac{0.01}{5.00} + 3\\left(\\frac{0.01}{1.20}\\right)",
          "\\frac{\\Delta \\rho}{\\rho} = 0.002 + 0.025 = 0.027 = 2.7\\%",
          "Absolute error: \\Delta \\rho = 0.027 \\times 2.894 = 0.078 \\text{ g cm}^{-3}",
        ],
        answer: "\\rho = (2.89 \\pm 0.08) \\text{ g cm}^{-3} \\quad (2.7\\%)",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Least Count",
        definition:
          "The smallest measurement an instrument can read reliably — for vernier callipers LC = 1 MSD − 1 VSD, and for a screw gauge LC = pitch / number of circular scale divisions.",
        significance:
          "Determines the number of decimal places in the reported reading, and therefore the absolute error.",
      },
      {
        term: "Dimensional Formula",
        definition:
          "The expression of a derived quantity in terms of the base quantities M (mass), L (length), T (time), and where required A (current), K (temperature), mol and cd.",
        significance:
          "Used to check equations, derive relations and convert units between systems — never to fix dimensionless constants.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // PHYSICS — Dynamics (Newton's laws, friction, momentum)
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "dynamics",
      "newton",
      "friction",
      "momentum",
      "impulse",
      "inertia",
      "angle-of-repose",
      "tension",
      "pulley",
    ],
    subject: "physics",
    title: "Dynamics — Newton's Laws, Friction, Momentum & Impulse",
    unitSlugs: ["dynamics"],
    category: "Mechanics",
    governingLaws: [
      {
        name: "Newton's Second Law (general form)",
        statement:
          "The net external force on a body equals the rate of change of its linear momentum. The familiar F = ma holds only when the mass is constant.",
        formula: "\\vec{F}_{net} = \\frac{d\\vec{p}}{dt} = m\\vec{a} \\quad (m \\text{ constant})",
        conditions:
          "Valid only in an inertial (non-accelerating) frame; in a rotating frame a pseudo-force must be added.",
      },
      {
        name: "Law of Conservation of Linear Momentum",
        statement:
          "If the net external force on a system is zero, the total linear momentum of the system remains constant.",
        formula: "m_1\\vec{u}_1 + m_2\\vec{u}_2 = m_1\\vec{v}_1 + m_2\\vec{v}_2",
        conditions:
          "Requires net external force = 0. Internal forces (explosions, collisions) do not change total momentum.",
      },
      {
        name: "Laws of Limiting Friction / Angle of Repose",
        statement:
          "Limiting friction is directly proportional to the normal reaction and is independent of the area of contact, provided the normal reaction is unchanged.",
        formula: "f_s^{max} = \\mu_s N, \\quad \\tan\\theta = \\mu_s",
        conditions:
          "Angle of repose equals the angle of inclination at which a body just begins to slide.",
      },
    ],
    speedFormulas: [
      {
        name: "Impulse–Momentum Theorem",
        formula: "\\vec{J} = \\vec{F}\\Delta t = \\Delta \\vec{p} = m(v - u)",
        description:
          "Area under a force–time graph gives impulse. Explains why follow-through and airbags reduce peak force.",
        unit: "N s",
      },
      {
        name: "Momentum–Kinetic Energy Relation",
        formula: "KE = \\frac{p^2}{2m}, \\quad p = \\sqrt{2m\\,KE}",
        description:
          "Very useful in collision and recoil problems where momentum is easier to track than velocity.",
        unit: "See p in kg m s^-1",
      },
      {
        name: "Pulley / Two-Body System Acceleration",
        formula: "a = \\frac{(m_1 - m_2)g}{m_1 + m_2}, \\quad T = \\frac{2m_1 m_2 g}{m_1 + m_2}",
        description:
          "Ideal massless string over a frictionless pulley with masses m1 and m2 hanging on either side.",
        unit: "m s^-2",
      },
      {
        name: "Recoil / Explosion Velocity",
        formula: "v_2 = -\\frac{m_1 v_1}{m_2}",
        description:
          "A system initially at rest splitting into two parts: momenta are equal and opposite.",
        unit: "m s^-1",
      },
    ],
    constantsAndValues: [
      { symbol: "g", name: "Acceleration due to gravity", value: "9.8", unit: "m s^-2" },
      { symbol: "mu_s", name: "Typical static friction (wood on wood)", value: "0.4 - 0.6", unit: "dimensionless" },
      { symbol: "mu_k", name: "Typical kinetic friction (wood on wood)", value: "0.2 - 0.4", unit: "dimensionless" },
      { symbol: "mu", name: "Friction: steel on steel (dry)", value: "0.5 - 0.8", unit: "dimensionless" },
    ],
    entranceTraps: [
      {
        trap: "Action and reaction cancel out, so a body can never start moving.",
        truth:
          "Action and reaction act on two DIFFERENT bodies, so they can never cancel within a single free-body diagram. Only forces on the same body cancel.",
        examRef: "NEB / IOE — Newton's third law",
      },
      {
        trap: "Friction always opposes the motion of a body.",
        truth:
          "Friction opposes relative slipping at the surface, not necessarily the motion. Friction on a car's driving wheel, and friction on a conveyor belt, acts in the direction of motion.",
        examRef: "CEE — friction directions",
      },
      {
        trap: "Kinetic friction depends on the area of contact.",
        truth:
          "To first approximation friction is independent of area — it depends only on the normal reaction and the nature of the surfaces.",
        examRef: "IOE — laws of friction",
      },
    ],
    workedNumericals: [
      {
        problem:
          "A 5 kg block on a horizontal surface is pulled by a 20 N horizontal force. If the coefficient of kinetic friction is 0.2, find its acceleration.",
        given: "m = 5 kg, F = 20 N, \\mu_k = 0.2, g = 9.8 m s^{-2}",
        steps: [
          "Normal reaction: N = mg = 5 \\times 9.8 = 49 \\text{ N}",
          "Friction: f = \\mu_k N = 0.2 \\times 49 = 9.8 \\text{ N}",
          "Net force: F_{net} = 20 - 9.8 = 10.2 \\text{ N}",
          "Acceleration: a = \\frac{F_{net}}{m} = \\frac{10.2}{5}",
        ],
        answer: "a = 2.04 \\text{ m s}^{-2}",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Inertia",
        definition:
          "The property by which a body resists any change in its state of rest or of uniform motion; measured quantitatively by its mass.",
        significance:
          "Mass is a measure of inertia, which is why the same force produces a smaller acceleration in a heavier body.",
      },
      {
        term: "Impulse",
        definition:
          "The product of a force and the time for which it acts, equal to the total change in momentum produced.",
        significance:
          "Makes it possible to find the average force in a collision when only the durations and velocities are known.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // PHYSICS — Work, Energy and Power
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "work-energy",
      "work-energy-and-power",
      "collision",
      "conservative",
      "spring",
      "potential-energy",
      "kinetic-energy",
      "elastic-collision",
    ],
    subject: "physics",
    title: "Work, Energy, Power & Collisions",
    unitSlugs: ["work-energy-and-power", "work-energy-power"],
    category: "Mechanics",
    governingLaws: [
      {
        name: "Work–Energy Theorem",
        statement:
          "The net work done on a body equals the change in its kinetic energy.",
        formula: "W_{net} = \\Delta KE = \\frac{1}{2}mv^2 - \\frac{1}{2}mu^2",
        conditions:
          "Valid for both constant and variable forces, provided the work is the net work done by all forces.",
      },
      {
        name: "Conservation of Mechanical Energy",
        statement:
          "In a conservative field with no non-conservative forces doing work, the total mechanical energy (kinetic + potential) remains constant.",
        formula: "\\frac{1}{2}mv_1^2 + mgh_1 = \\frac{1}{2}mv_2^2 + mgh_2",
        conditions:
          "Holds only when friction, air resistance and applied forces do no net work.",
      },
    ],
    speedFormulas: [
      {
        name: "Work by a Constant Force",
        formula: "W = Fs\\cos\\theta",
        description:
          "Maximum work occurs at theta = 0, zero work at 90 degrees, and negative work beyond 90 degrees.",
        unit: "J",
      },
      {
        name: "Power",
        formula: "P_{avg} = \\frac{W}{t}, \\quad P_{inst} = \\vec{F}\\cdot\\vec{v}",
        description:
          "The instantaneous form F.v is the fastest route in vehicle and conveyor questions.",
        unit: "W (1 hp = 746 W)",
      },
      {
        name: "Elastic and Inelastic Collision Velocities",
        formula:
          "v_1 = \\frac{m_1 - m_2}{m_1 + m_2}u_1 + \\frac{2m_2}{m_1 + m_2}u_2, \\quad v_2 = \\frac{2m_1}{m_1+m_2}u_1 + \\frac{m_2 - m_1}{m_1+m_2}u_2",
        description:
          "For a perfectly inelastic collision the two bodies move with the common velocity v = (m1u1 + m2u2)/(m1 + m2).",
        unit: "m s^-1",
      },
      {
        name: "Spring Potential Energy",
        formula: "U = \\frac{1}{2}kx^2",
        description:
          "Elastic potential energy stored in a stretched or compressed spring of force constant k.",
        unit: "J",
      },
      {
        name: "Coefficient of Restitution",
        formula: "e = \\frac{v_2 - v_1}{u_1 - u_2}",
        description:
          "e = 1 for a perfectly elastic collision, e = 0 for a perfectly inelastic one; for a ball dropped from height h rebounding to h', e = sqrt(h'/h).",
        unit: "dimensionless",
      },
    ],
    constantsAndValues: [
      { symbol: "1 hp", name: "One horsepower (metric-ish, watts)", value: "746", unit: "W" },
      { symbol: "g", name: "Acceleration due to gravity", value: "9.8", unit: "m s^-2" },
      { symbol: "1 kWh", name: "One commercial unit of energy", value: "3.6 x 10^6", unit: "J" },
    ],
    entranceTraps: [
      {
        trap: "Work done by the centripetal force on a body in uniform circular motion is positive.",
        truth:
          "It is exactly ZERO: centripetal force is always perpendicular to the velocity, so cos 90 degrees = 0.",
        examRef: "IOE — work and circular motion",
      },
      {
        trap: "Friction always does negative work.",
        truth:
          "Friction can do positive work — for example the friction that accelerates a car or a box resting on an accelerating belt.",
        examRef: "CEE — work by friction",
      },
      {
        trap: "Momentum and kinetic energy are both always conserved in a collision.",
        truth:
          "Momentum is conserved in every collision without external force, but kinetic energy is conserved only in elastic collisions. Inelastic collisions lose KE as heat, sound and deformation.",
        examRef: "NEB / IOE — collisions",
      },
    ],
    workedNumericals: [
      {
        problem:
          "A 2 kg block slides down a frictionless track from rest at a height of 5 m. Find its speed at the bottom.",
        given: "m = 2 kg, h = 5 m, u = 0, g = 9.8 m s^{-2}",
        steps: [
          "Mechanical energy is conserved: mgh = \\frac{1}{2}mv^2",
          "Cancel m: v = \\sqrt{2gh}",
          "v = \\sqrt{2 \\times 9.8 \\times 5} = \\sqrt{98}",
        ],
        answer: "v = 9.9 \\text{ m s}^{-1}",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Conservative Force",
        definition:
          "A force for which the work done in moving a body between two points is independent of the path taken, so the work around any closed loop is zero.",
        significance:
          "Only conservative forces allow a potential energy function to be defined (gravity, spring force, electrostatic force).",
      },
      {
        term: "Elastic Collision",
        definition:
          "A collision in which both linear momentum and kinetic energy are conserved, with a coefficient of restitution of exactly one.",
        significance:
          "For equal masses in a head-on elastic collision, the two bodies simply exchange velocities.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // PHYSICS — Circular Motion
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "circular-motion",
      "centripetal",
      "centrifugal",
      "banking",
      "conical-pendulum",
      "vertical-circle",
      "angular-velocity",
      "radial",
    ],
    subject: "physics",
    title: "Circular Motion — Centripetal Force, Banking & Vertical Circle",
    unitSlugs: ["circular-motion"],
    category: "Mechanics",
    governingLaws: [
      {
        name: "Centripetal Acceleration",
        statement:
          "A body in uniform circular motion has a constant speed but a continuously changing velocity, so it accelerates toward the centre of the circle.",
        formula: "a_c = \\frac{v^2}{r} = \\omega^2 r = 4\\pi^2 n^2 r",
        conditions:
          "Applies to uniform circular motion only; the acceleration is directed along the radius toward the centre.",
      },
      {
        name: "Banking of Road (with friction)",
        statement:
          "For a banked track, the horizontal component of the normal reaction supplies part of the required centripetal force, allowing a higher safe speed than a flat road.",
        formula:
          "\\tan\\theta = \\frac{v^2}{rg}, \\quad v_{max} = \\sqrt{rg\\frac{\\mu + \\tan\\theta}{1 - \\mu\\tan\\theta}}",
        conditions:
          "For the ideal banked surface with mu = 0 the friction-free safe speed is v = sqrt(rg tan theta).",
      },
    ],
    speedFormulas: [
      {
        name: "Vertical Circle — Minimum Speeds",
        formula:
          "v_{top} = \\sqrt{gr}, \\quad v_{bottom} = \\sqrt{5gr}, \\quad v_{middle} = \\sqrt{3gr}",
        description:
          "The minimum speeds for a body on the inside of a vertical circle (string or track) to remain in contact.",
        unit: "m s^-1",
      },
      {
        name: "Vertical Circle — Tension at Any Point",
        formula: "T = \\frac{mv^2}{r} + mg\\cos\\theta",
        description:
          "Theta is measured from the lowest point. At the top T = mv^2/r − mg; at the bottom T = mv^2/r + mg.",
        unit: "N",
      },
      {
        name: "Conical Pendulum Time Period",
        formula: "T = 2\\pi\\sqrt{\\frac{l\\cos\\theta}{g}}",
        description:
          "A bob whirling in a horizontal circle, with theta the semi-vertical angle. Note T increases as theta increases.",
        unit: "s",
      },
      {
        name: "Speed Limit on a Flat Road",
        formula: "v_{max} = \\sqrt{\\mu r g}",
        description:
          "Friction alone supplies the centripetal force, so banking is required at higher design speeds.",
        unit: "m s^-1",
      },
    ],
    constantsAndValues: [
      { symbol: "g", name: "Acceleration due to gravity", value: "9.8", unit: "m s^-2" },
      { symbol: "\\mu_s", name: "Typical tyre on dry road", value: "0.5 - 0.8", unit: "dimensionless" },
      { symbol: "1 rpm", name: "One revolution per minute", value: "\\pi/30", unit: "rad s^-1" },
    ],
    entranceTraps: [
      {
        trap: "Centrifugal force is a real reaction force and can be used in an inertial frame.",
        truth:
          "Centrifugal force is a pseudo-force needed only when working in the rotating (non-inertial) frame. It has no reaction pair and does not exist in an inertial frame.",
        examRef: "IOE/CEE — pseudo-forces",
      },
      {
        trap: "In a vertical circle the tension at the top can be zero while the body is still in contact.",
        truth:
          "At the minimum speed v = sqrt(gr) the tension is exactly zero and gravity alone supplies the centripetal force. Below this speed the body leaves the circular path.",
        examRef: "NEB — vertical circular motion",
      },
    ],
    workedNumericals: [
      {
        problem:
          "A car rounds a flat circular road of radius 100 m. If the coefficient of friction is 0.4, find the maximum safe speed.",
        given: "r = 100 m, \\mu = 0.4, g = 9.8 m s^{-2}",
        steps: [
          "Friction supplies the centripetal force: \\mu mg = \\frac{mv^2}{r}",
          "Cancel m: v = \\sqrt{\\mu r g}",
          "v = \\sqrt{0.4 \\times 100 \\times 9.8} = \\sqrt{392}",
        ],
        answer: "v = 19.8 \\text{ m s}^{-1} \\approx 71 \\text{ km h}^{-1}",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Centripetal Force",
        definition:
          "The net inward force required to keep a body moving in a circular path, of magnitude mv^2/r.",
        significance:
          "It is not a new kind of force — it is always supplied by an existing force such as tension, friction, gravity or the normal reaction.",
      },
      {
        term: "Angular Velocity",
        definition:
          "The rate of change of angular displacement, equal to the angle swept per unit time.",
        significance:
          "Related to linear speed by v = omega r, and to time period by omega = 2 pi / T.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // PHYSICS — Gravitation
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "gravitation",
      "gravity",
      "kepler",
      "orbital-velocity",
      "escape-velocity",
      "geostationary",
      "satellite",
      "gravitational-potential",
    ],
    subject: "physics",
    title: "Gravitation — Orbits, Satellites & Escape Velocity",
    unitSlugs: ["gravitation"],
    category: "Mechanics & Fields",
    governingLaws: [
      {
        name: "Newton's Law of Universal Gravitation",
        statement:
          "Every particle attracts every other particle with a force directly proportional to the product of their masses and inversely proportional to the square of the distance between them, directed along the line joining them.",
        formula: "F = G\\frac{m_1 m_2}{r^2}",
        conditions:
          "For extended spherical bodies r is measured from centre to centre. G is a universal constant valid everywhere.",
      },
      {
        name: "Kepler's Third Law",
        statement:
          "The square of the period of revolution of a planet is directly proportional to the cube of the semi-major axis of its orbit.",
        formula: "T^2 \\propto a^3, \\quad T^2 = \\frac{4\\pi^2 a^3}{GM}",
        conditions:
          "Applies to any satellite orbiting a much more massive central body, planet-to-planet comparisons under the same primary.",
      },
    ],
    speedFormulas: [
      {
        name: "Variation of g with Altitude and Depth",
        formula:
          "g_h = g\\left(1 - \\frac{2h}{R}\\right) \\text{ (h << R)}, \\quad g_d = g\\left(1 - \\frac{d}{R}\\right)",
        description:
          "g is maximum at the surface, decreases with height as well as depth, and is zero at the centre of the Earth.",
        unit: "m s^-2",
      },
      {
        name: "Orbital Velocity",
        formula: "v_o = \\sqrt{\\frac{GM}{r}} = \\sqrt{\\frac{GM}{R + h}}",
        description:
          "For a satellite close to the surface, v_o = sqrt(gR) = 7.9 km/s. Independent of the satellite's own mass.",
        unit: "m s^-1",
      },
      {
        name: "Escape Velocity",
        formula: "v_e = \\sqrt{\\frac{2GM}{R}} = \\sqrt{2gR} = \\sqrt{2}\\,v_o",
        description:
          "About 11.2 km/s for the Earth. Independent of the mass, shape and direction of projection of the body.",
        unit: "m s^-1",
      },
      {
        name: "Satellite Period and Height",
        formula: "T = 2\\pi\\sqrt{\\frac{r^3}{GM}}, \\quad h = \\left(\\frac{T^2 R^2 g}{4\\pi^2}\\right)^{1/3} - R",
        description:
          "For a geostationary satellite T must be 24 h, giving h approximately 35,800 km.",
        unit: "s and m",
      },
      {
        name: "Gravitational Potential Energy",
        formula: "U = -\\frac{GMm}{r}, \\quad U_{surface} = -\\frac{GMm}{R}",
        description:
          "Negative, taking potential at infinity as zero, which is why escape needs total energy >= 0.",
        unit: "J",
      },
    ],
    constantsAndValues: [
      { symbol: "G", name: "Universal gravitational constant", value: "6.67 x 10^-11", unit: "N m^2 kg^-2" },
      { symbol: "M_E", name: "Mass of the Earth", value: "5.97 x 10^24", unit: "kg" },
      { symbol: "R_E", name: "Mean radius of the Earth", value: "6.37 x 10^6", unit: "m" },
      { symbol: "g", name: "Acceleration due to gravity at the surface", value: "9.8", unit: "m s^-2" },
      { symbol: "v_e", name: "Escape velocity from the Earth", value: "11.2", unit: "km s^-1" },
      { symbol: "v_o", name: "Orbital velocity near the Earth's surface", value: "7.9", unit: "km s^-1" },
      { symbol: "h_geo", name: "Geostationary altitude above the surface", value: "35,800", unit: "km" },
    ],
    entranceTraps: [
      {
        trap: "A satellite is weightless because there is no gravity at its height.",
        truth:
          "There is plenty of gravity — it is the force holding the satellite in orbit. The apparent weightlessness is free fall: the satellite and everything in it accelerate toward the Earth at the same rate, so the normal reaction is zero.",
        examRef: "NEB / IOE — satellites",
      },
      {
        trap: "Escape velocity depends on the mass of the body being projected.",
        truth:
          "It depends only on the mass and radius of the planet. A cricket ball and a rocket need the same 11.2 km/s — the rocket just needs more fuel to fight drag and to keep accelerating.",
        examRef: "CEE — escape velocity",
      },
      {
        trap: "g is maximum at some height above the surface.",
        truth:
          "g decreases both above and below the surface. It is maximum exactly at the surface and zero at the centre of the Earth.",
        examRef: "IOE — variation of g",
      },
    ],
    workedNumericals: [
      {
        problem:
          "Calculate the orbital velocity of a satellite revolving very close to the Earth's surface. Take R = 6.4 x 10^6 m and g = 9.8 m s^-2.",
        given: "R = 6.4 \\times 10^6 m, g = 9.8 m s^{-2}, h \\approx 0",
        steps: [
          "Gravitational force supplies the centripetal force: \\frac{GMm}{R^2} = \\frac{mv^2}{R}",
          "Using GM = gR^2: v_o = \\sqrt{gR}",
          "v_o = \\sqrt{9.8 \\times 6.4 \\times 10^6} = \\sqrt{6.272 \\times 10^7}",
        ],
        answer: "v_o = 7.92 \\times 10^3 \\text{ m s}^{-1} = 7.92 \\text{ km s}^{-1}",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Geostationary Satellite",
        definition:
          "A satellite whose period of revolution equals the Earth's rotational period of 24 h, placed in an equatorial orbit and revolving in the same sense as the Earth.",
        significance:
          "It stays fixed above one point of the equator, which is what makes it usable for communication and weather monitoring.",
      },
      {
        term: "Escape Velocity",
        definition:
          "The minimum speed that must be given to a body so that it just escapes the gravitational field of a planet and never returns.",
        significance:
          "Found by setting total mechanical energy to zero at infinity, giving sqrt(2GM/R) — independent of the body's mass.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // PHYSICS — Elasticity
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "elasticity",
      "young-modulus",
      "hooke",
      "stress",
      "strain",
      "bulk-modulus",
      "poisson",
      "elastic-limit",
      "breaking-stress",
    ],
    subject: "physics",
    title: "Elasticity — Stress, Strain & Elastic Moduli",
    unitSlugs: ["elasticity"],
    category: "Properties of Matter",
    governingLaws: [
      {
        name: "Hooke's Law",
        statement:
          "Within the elastic limit, the stress produced in a body is directly proportional to the strain produced.",
        formula: "\\text{stress} \\propto \\text{strain} \\implies \\text{stress} = E \\times \\text{strain}",
        conditions:
          "Valid only up to the proportional limit (which lies at or below the elastic limit); beyond it the stress-strain graph becomes non-linear.",
      },
      {
        name: "Moduli of Elasticity",
        statement:
          "Young's modulus relates longitudinal stress to longitudinal strain, the bulk modulus relates volumetric stress to volumetric strain, and the shear modulus (rigidity) relates tangential stress to shear strain.",
        formula:
          "Y = \\frac{F/A}{\\Delta l/l}, \\quad K = -\\frac{\\Delta P}{\\Delta V / V}, \\quad \\eta = \\frac{F/A}{\\theta}",
        conditions:
          "K is defined with a negative sign because volume decreases as pressure increases.",
      },
    ],
    speedFormulas: [
      {
        name: "Elongation of a Wire",
        formula: "\\Delta l = \\frac{Fl}{AY}",
        description:
          "The working formula for numericals. For a wire of the same material carrying its own weight, use the average tension, i.e. half its weight.",
        unit: "m",
      },
      {
        name: "Poisson's Ratio",
        formula: "\\sigma = -\\frac{\\Delta r / r}{\\Delta l / l}",
        description:
          "Theoretical limits are −1 to 0.5 and practically 0 to 0.5. A negative sign makes sigma positive since lateral strain is opposite in sense.",
        unit: "dimensionless",
      },
      {
        name: "Elastic Potential Energy per Unit Volume",
        formula: "u = \\frac{1}{2} \\times \\text{stress} \\times \\text{strain} = \\frac{1}{2}\\frac{(\\text{stress})^2}{Y}",
        description:
          "Total stored energy equals this energy density multiplied by the volume of the stretched body.",
        unit: "J m^-3",
      },
      {
        name: "Thermal Stress",
        formula: "\\text{stress} = Y\\alpha\\Delta\\theta",
        description:
          "Developed when a rod is clamped rigidly at both ends and its temperature changes, so it cannot expand or contract.",
        unit: "Pa",
      },
    ],
    constantsAndValues: [
      { symbol: "Y_{steel}", name: "Young's modulus of steel", value: "2.0 x 10^11", unit: "N m^-2" },
      { symbol: "Y_{copper}", name: "Young's modulus of copper", value: "1.2 x 10^11", unit: "N m^-2" },
      { symbol: "Y_{brass}", name: "Young's modulus of brass", value: "1.0 x 10^11", unit: "N m^-2" },
      { symbol: "Y_{al}", name: "Young's modulus of aluminium", value: "7.0 x 10^10", unit: "N m^-2" },
      { symbol: "\\sigma", name: "Poisson's ratio of steel", value: "0.28 - 0.30", unit: "dimensionless" },
    ],
    entranceTraps: [
      {
        trap: "Rubber is more elastic than steel because it stretches much more.",
        truth:
          "Elasticity is measured by the modulus, not by the extension. Steel has a far larger Young's modulus, so for the same stress it strains less — steel is MORE elastic than rubber.",
        examRef: "IOE/CEE — elasticity concepts",
      },
      {
        trap: "The elastic limit and the proportional limit are the same thing.",
        truth:
          "The proportional limit is where stress stops being proportional to strain. The elastic limit lies at or slightly beyond it and is the point beyond which permanent deformation occurs.",
        examRef: "NEB — stress-strain curve",
      },
    ],
    workedNumericals: [
      {
        problem:
          "A steel wire of length 2 m and cross-sectional area 1 x 10^-6 m^2 is stretched by a force of 100 N. Find the elongation. Take Y = 2 x 10^11 N m^-2.",
        given: "l = 2 m, A = 1 \\times 10^{-6} m^2, F = 100 N, Y = 2 \\times 10^{11} N m^{-2}",
        steps: [
          "Working formula: \\Delta l = \\frac{Fl}{AY}",
          "Substitute: \\Delta l = \\frac{100 \\times 2}{1 \\times 10^{-6} \\times 2 \\times 10^{11}}",
          "\\Delta l = \\frac{200}{2 \\times 10^{5}} = 1 \\times 10^{-3} m",
        ],
        answer: "\\Delta l = 1 \\text{ mm}",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Elastic Fatigue",
        definition:
          "The loss of elastic strength of a material caused by repeated cycles of stress and strain, so it eventually breaks under a stress smaller than its normal breaking stress.",
        significance:
          "Explains why bridges and machinery parts fail after long service, and why periodic annealing is needed.",
      },
      {
        term: "Strain",
        definition:
          "The fractional deformation produced in a body, expressed as the change in dimension divided by the original dimension.",
        significance:
          "A dimensionless ratio, quoted in the same units as the deformation when expressed as a percentage.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // PHYSICS — Ideal Gas & Kinetic Theory
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "ideal-gas",
      "gas-laws",
      "kinetic-theory",
      "boyle",
      "charles",
      "rms",
      "molecular-speed",
      "degrees-of-freedom",
      "cp-cv",
      "mean-free-path",
    ],
    subject: "physics",
    title: "Ideal Gas & Kinetic Theory of Gases",
    unitSlugs: ["ideal-gas"],
    category: "Heat & Thermodynamics",
    governingLaws: [
      {
        name: "Equation of State for an Ideal Gas",
        statement:
          "For a fixed mass of an ideal gas, the product of pressure and volume is directly proportional to the absolute temperature.",
        formula: "PV = nRT = NkT",
        conditions:
          "Strictly true only for an ideal gas (negligible molecular volume, no intermolecular forces). Real gases approach it at low pressure and high temperature.",
      },
      {
        name: "Kinetic Theory: Pressure of a Gas",
        statement:
          "The pressure exerted by a gas equals one third of the product of its density and the mean square speed of its molecules.",
        formula: "P = \\frac{1}{3}\\rho \\overline{c^2} = \\frac{1}{3}\\frac{mN}{V}\\overline{c^2}",
        conditions:
          "Assumes perfectly elastic collisions, negligible molecular volume and no intermolecular attraction.",
      },
      {
        name: "Law of Equipartition of Energy",
        statement:
          "In thermal equilibrium, the average kinetic energy associated with each degree of freedom of a molecule is (1/2)kT.",
        formula: "E_{avg} = \\frac{f}{2}kT",
        conditions:
          "Monatomic f = 3, diatomic f = 5, polyatomic f = 6 (ignoring vibrational modes at ordinary temperatures).",
      },
    ],
    speedFormulas: [
      {
        name: "Molecular Speeds",
        formula:
          "c_{rms} = \\sqrt{\\frac{3RT}{M}} = \\sqrt{\\frac{3kT}{m}}, \\quad c_{avg} = \\sqrt{\\frac{8RT}{\\pi M}}, \\quad c_{mp} = \\sqrt{\\frac{2RT}{M}}",
        description:
          "The three speeds are in the fixed ratio c_mp : c_avg : c_rms = 1 : 1.128 : 1.224, i.e. rms is always the largest.",
        unit: "m s^-1",
      },
      {
        name: "Mayer's Relation",
        formula: "C_p - C_v = R, \\quad \\gamma = \\frac{C_p}{C_v} = 1 + \\frac{2}{f}",
        description:
          "gamma = 1.67 for monatomic, 1.40 for diatomic and 1.33 for polyatomic gases.",
        unit: "J mol^-1 K^-1",
      },
      {
        name: "Average Kinetic Energy per Molecule",
        formula: "KE_{avg} = \\frac{f}{2}kT",
        description:
          "Depends only on the absolute temperature and the number of degrees of freedom, not on the molecular mass.",
        unit: "J",
      },
      {
        name: "Mean Free Path",
        formula: "\\lambda = \\frac{1}{\\sqrt{2}\\,\\pi n d^2} = \\frac{kT}{\\sqrt{2}\\,\\pi d^2 P}",
        description:
          "Increases with temperature and decreases with pressure, since the number density n = P/kT.",
        unit: "m",
      },
      {
        name: "Graham's Law of Diffusion",
        formula: "\\frac{r_1}{r_2} = \\sqrt{\\frac{M_2}{M_1}}",
        description:
          "The rate of diffusion of a gas is inversely proportional to the square root of its molar mass.",
        unit: "dimensionless ratio",
      },
    ],
    constantsAndValues: [
      { symbol: "R", name: "Universal gas constant", value: "8.314", unit: "J mol^-1 K^-1" },
      { symbol: "k", name: "Boltzmann constant", value: "1.38 x 10^-23", unit: "J K^-1" },
      { symbol: "N_A", name: "Avogadro's number", value: "6.022 x 10^23", unit: "mol^-1" },
      { symbol: "V_m", name: "Molar volume at STP", value: "22.4", unit: "L mol^-1" },
      { symbol: "P_0", name: "Standard atmospheric pressure", value: "1.013 x 10^5", unit: "Pa" },
      { symbol: "T_0", name: "Standard temperature", value: "273.15", unit: "K" },
    ],
    entranceTraps: [
      {
        trap: "If the absolute temperature of a gas is doubled, the rms speed doubles.",
        truth:
          "Because c_rms is proportional to the square root of T, doubling T multiplies the rms speed by only sqrt(2) = 1.41 times.",
        examRef: "IOE/CEE — kinetic theory",
      },
      {
        trap: "C_p - C_v = R holds for every substance.",
        truth:
          "It holds only for an ideal gas. For real gases and for solids and liquids the relation fails, and for water near 4 degrees C C_p can even be less than C_v is not applicable.",
        examRef: "NEB — specific heats",
      },
      {
        trap: "The internal energy of an ideal gas depends on its volume.",
        truth:
          "Internal energy of an ideal gas depends only on temperature. At constant temperature it stays constant however the pressure and volume change.",
        examRef: "IOE — thermodynamics",
      },
    ],
    workedNumericals: [
      {
        problem:
          "Calculate the rms speed of oxygen molecules at 300 K. Take R = 8.314 J mol^-1 K^-1 and the molar mass of oxygen as 0.032 kg mol^-1.",
        given: "T = 300 K, M = 0.032 kg mol^{-1}, R = 8.314 J mol^{-1} K^{-1}",
        steps: [
          "Use c_{rms} = \\sqrt{\\frac{3RT}{M}}",
          "Numerator: 3 \\times 8.314 \\times 300 = 7482.6",
          "Divide by M: \\frac{7482.6}{0.032} = 2.338 \\times 10^5",
          "Take the square root: c_{rms} = \\sqrt{2.338 \\times 10^5}",
        ],
        answer: "c_{rms} = 483 \\text{ m s}^{-1}",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Degrees of Freedom",
        definition:
          "The number of independent ways in which a molecule can store energy — translational, rotational or vibrational.",
        significance:
          "Fixes the values of gamma, C_v and C_p for the gas: gamma = 1 + 2/f.",
      },
      {
        term: "Mean Free Path",
        definition:
          "The average distance travelled by a gas molecule between two successive collisions.",
        significance:
          "Explains why diffusion is slow at high pressure and why gases become good insulators when evacuated.",
      },
    ],
  },
];
