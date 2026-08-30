"use client";

import { useState } from "react";
import { BookOpen, Lightbulb, CheckCircle, AlertCircle, XCircle, ChevronDown, Pencil } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Katex } from "@/components/content/katex";

interface TheoryPanelProps {
  // Old interface (used by existing labs)
  title?: string;
  vocabulary?: string;
  look?: string | React.ReactNode;
  predict?: string;
  principle?: string | React.ReactNode;
  why?: string;
  // New interface (for theory lab pages)
  subject?: string;
  topic?: string;
}

interface SectionData {
  heading: string;
  content: string;
  formula?: string;
  example?: string;
}

interface TopicData {
  title: string;
  overview: string;
  sections: SectionData[];
  keyPoints: string[];
  commonMistakes: string[];
  practiceQuestions: string[];
}

const THEORY_CONTENT: Record<string, Record<string, TopicData>> = {
  physics: {
    kinematics: {
      title: "Kinematics — Motion in One and Two Dimensions",
      overview: "Kinematics is the branch of classical mechanics that describes the motion of points, objects, and systems without reference to the forces that cause the motion. It covers linear motion with constant acceleration, projectile motion, relative velocity, and graphical representations of motion.",
      sections: [
        {
          heading: "1. Basic Quantities in Motion",
          content: "Before analyzing any motion, we must distinguish between scalar and vector quantities. Distance is the total path covered (scalar), while displacement is the shortest distance from initial to final position with direction (vector). Similarly, speed is distance/time (scalar), while velocity is displacement/time (vector). Acceleration is the rate of change of velocity — an object can have constant speed but still accelerate if its direction changes.",
          formula: "\\begin{aligned} \\text{Average speed} &= \\frac{\\text{total distance}}{\\text{total time}} \\\\ \\text{Average velocity} &= \\frac{\\Delta \\vec{s}}{\\Delta t} = \\frac{\\vec{s}_f - \\vec{s}_i}{t_f - t_i} \\\\ \\text{Instantaneous velocity} &= \\frac{d\\vec{s}}{dt} \\end{aligned}",
        },
        {
          heading: "2. Equations of Motion (Constant Acceleration)",
          content: "When acceleration is constant, three kinematic equations relate initial velocity (u), final velocity (v), acceleration (a), displacement (s), and time (t). These are derived from the definitions of velocity and acceleration. They are valid only for constant acceleration.",
          formula: "\\begin{aligned} v &= u + at \\\\ s &= ut + \\tfrac{1}{2}at^2 \\\\ v^2 &= u^2 + 2as \\end{aligned}",
          example: "Example: A car accelerates from rest at 2 m/s² for 5 seconds. Find (a) final velocity and (b) distance covered.\n(a) v = u + at = 0 + (2)(5) = 10 m/s\n(b) s = ut + ½at² = 0 + ½(2)(25) = 25 m",
        },
        {
          heading: "3. Projectile Motion",
          content: "Projectile motion is the motion of an object thrown into the air, subject only to acceleration due to gravity. The key insight is that horizontal and vertical motions are independent. The horizontal motion has constant velocity; the vertical motion has constant downward acceleration g. The trajectory is a parabola.",
          formula: "\\begin{aligned} R &= \\frac{u^2 \\sin 2\\theta}{g} \\\\ H &= \\frac{u^2 \\sin^2 \\theta}{2g} \\\\ T &= \\frac{2u \\sin\\theta}{g} \\end{aligned}",
          example: "Example: A ball is projected at 20 m/s at 30° to the horizontal. Find range, max height, and time of flight. (g = 10 m/s²)\nT = 2(20)sin30°/10 = 2 s\nR = (400)(sin60°)/10 = 34.64 m\nH = (400)(sin²30°)/20 = 5 m",
        },
        {
          heading: "4. Relative Velocity",
          content: "Relative velocity is the velocity of one object as observed from another moving object. If object A has velocity v_A and object B has velocity v_B (both measured in the same frame), the velocity of A relative to B is v_AB = v_A - v_B.",
          formula: "\\vec{v}_{AB} = \\vec{v}_A - \\vec{v}_B, \\qquad \\vec{v}_{BA} = -\\vec{v}_{AB}",
        },
      ],
      keyPoints: [
        "Kinematic equations apply ONLY for constant acceleration",
        "Horizontal and vertical components of projectile motion are independent",
        "Range is maximum at θ = 45° (same launch speed)",
        "At the highest point of projectile motion, vertical velocity is zero but acceleration is still g downward",
        "The slope of an s-t graph = velocity; slope of v-t graph = acceleration; area under v-t graph = displacement",
      ],
      commonMistakes: [
        "Using kinematic equations when acceleration is not constant",
        "Forgetting that acceleration due to gravity is always downward",
        "Confusing distance (scalar) with displacement (vector)",
        "Using R = u²/g for non-level ground",
      ],
      practiceQuestions: [
        "A stone is thrown vertically upward with velocity 50 m/s. Find the maximum height reached. (g = 10 m/s²)",
        "A projectile is launched at 30° with initial speed 40 m/s. Calculate time of flight, range, and maximum height. (g = 9.8 m/s²)",
        "A car traveling at 20 m/s applies brakes and decelerates at 4 m/s². How far does it travel before stopping?",
        "A boat crosses a 200 m wide river flowing at 3 m/s. The boat heads perpendicular to the current at 4 m/s. Find time to cross and downstream drift.",
        "Two cars move toward each other at 30 m/s and 20 m/s. What is the relative velocity of one car with respect to the other?",
      ],
    },
    "laws-motion": {
      title: "Newton's Laws of Motion and Friction",
      overview: "Newton's three laws of motion form the foundation of classical mechanics. The first law defines inertia, the second law quantifies force (F = ma), and the third law describes action-reaction pairs. Friction is a contact force that opposes relative motion between surfaces.",
      sections: [
        {
          heading: "1. Newton's First Law (Inertia)",
          content: "An object at rest stays at rest, and an object in motion continues in uniform motion in a straight line, unless acted upon by a net external force. Inertia is the property of matter that resists changes in motion. The mass of an object is a measure of its inertia.",
          formula: "\\text{If } \\sum \\vec{F} = 0, \\text{ then } \\vec{a} = 0 \\implies \\vec{v} = \\text{constant}",
        },
        {
          heading: "2. Newton's Second Law",
          content: "The net force acting on an object equals the rate of change of its momentum. For constant mass, this simplifies to F = ma. This is the most important equation in mechanics. When multiple forces act, resolve them into components and apply F_net = ma separately for each direction.",
          formula: "\\vec{F}_{\\text{net}} = m\\vec{a}",
          example: "Example: A 5 kg block is pulled by a 20 N horizontal force on a frictionless surface. Find acceleration.\nF_net = ma → 20 = 5a → a = 4 m/s²",
        },
        {
          heading: "3. Newton's Third Law",
          content: "For every action there is an equal and opposite reaction. Action-reaction pairs act on DIFFERENT bodies — they never cancel each other on a single body.",
          formula: "\\vec{F}_{AB} = -\\vec{F}_{BA}",
        },
        {
          heading: "4. Friction",
          content: "Friction opposes relative motion between surfaces. Static friction (f_s) prevents motion from starting: f_s ≤ μ_s N. Kinetic friction (f_k) acts when surfaces slide: f_k = μ_k N. Typically μ_s > μ_k.",
          formula: "\\begin{aligned} f_s &\\leq \\mu_s N \\\\ f_k &= \\mu_k N \\end{aligned}",
        },
        {
          heading: "5. Motion on an Inclined Plane",
          content: "On an incline at angle θ, weight resolves into mg sin θ down the slope and mg cos θ perpendicular to the slope. The normal force equals mg cos θ. If frictionless, acceleration down the plane is g sin θ.",
          formula: "\\begin{aligned} N &= mg\\cos\\theta \\\\ a &= g\\sin\\theta - \\mu g\\cos\\theta \\end{aligned}",
        },
      ],
      keyPoints: [
        "F = ma is valid in inertial (non-accelerating) reference frames",
        "Action-reaction pairs act on different bodies — they don't cancel",
        "Static friction is self-adjusting up to its maximum value μ_s N",
        "On an incline: normal force = mg cos θ, component down slope = mg sin θ",
      ],
      commonMistakes: [
        "Thinking a larger mass falls faster (in vacuum, all objects fall at same rate)",
        "Confusing weight (mg) with mass (m)",
        "Forgetting that friction opposes relative motion, not necessarily motion itself",
        "Using f = μN for static friction (should be f ≤ μ_s N)",
      ],
      practiceQuestions: [
        "A 10 kg box is pushed with 50 N on a rough surface (μ = 0.3). Find the acceleration.",
        "Two masses (3 kg and 5 kg) are connected by a string over a frictionless pulley. Find acceleration and tension.",
        "A block just begins to slide down a 35° incline. Find the coefficient of static friction.",
        "A 60 kg person stands on a scale in an elevator accelerating upward at 2 m/s². What does the scale read?",
        "A car rounds a curve of radius 50 m. If μ = 0.6, find the maximum safe speed.",
      ],
    },
    "work-energy": {
      title: "Work, Energy, and Power",
      overview: "The work-energy theorem relates the work done by net force to the change in kinetic energy. Conservative forces store energy as potential energy. Power is the rate at which work is done.",
      sections: [
        {
          heading: "1. Work Done by a Force",
          content: "Work is done when a force causes displacement. For a constant force, W = F·s·cos θ. Work is a scalar measured in joules (J). If force is perpendicular to displacement, no work is done.",
          formula: "W = \\vec{F} \\cdot \\vec{s} = Fs\\cos\\theta",
        },
        {
          heading: "2. Kinetic and Potential Energy",
          content: "Kinetic energy (KE = ½mv²) is the energy of motion. Gravitational potential energy (PE = mgh) is energy due to position. Elastic PE in a spring is PE = ½kx².",
          formula: "\\begin{aligned} KE &= \\tfrac{1}{2}mv^2 \\\\ PE_{\\text{grav}} &= mgh \\\\ PE_{\\text{spring}} &= \\tfrac{1}{2}kx^2 \\end{aligned}",
        },
        {
          heading: "3. Work-Energy Theorem",
          content: "The net work done on an object equals its change in kinetic energy: W_net = ΔKE. This is valid for any net force (constant or variable).",
          formula: "W_{\\text{net}} = \\Delta KE = \\tfrac{1}{2}mv_f^2 - \\tfrac{1}{2}mv_i^2",
          example: "Example: A 2 kg ball dropped from 20 m. Find speed before hitting ground.\nmgh = ½mv² → v = √(2gh) = √(2×10×20) = 20 m/s",
        },
        {
          heading: "4. Conservation of Mechanical Energy",
          content: "When only conservative forces do work, KE + PE = constant. Non-conservative forces (friction) convert mechanical energy into heat.",
          formula: "KE_i + PE_i = KE_f + PE_f",
        },
        {
          heading: "5. Power",
          content: "Power is the rate at which work is done: P = W/t = F·v. The SI unit is the watt (W = J/s).",
          formula: "P_{\\text{avg}} = \\frac{W}{t}, \\qquad P_{\\text{inst}} = \\vec{F} \\cdot \\vec{v}",
        },
      ],
      keyPoints: [
        "Work is a scalar (dot product of force and displacement)",
        "Conservative forces conserve mechanical energy",
        "Power measures how fast work is done",
        "In elastic collisions, both KE and momentum are conserved",
      ],
      commonMistakes: [
        "Forgetting that work can be negative",
        "Assuming mechanical energy is always conserved",
        "Using W = Fd without the cos θ factor when force and displacement are not parallel",
      ],
      practiceQuestions: [
        "A 500 N force pulls a 20 kg box 10 m across a frictionless floor. Find the final speed if the box starts from rest.",
        "A spring with k = 200 N/m is compressed 0.1 m. A 0.5 kg ball is placed against it. Find the ball's speed when released.",
        "A 60 kg climber ascends 10 m in 20 s. Find the average power output.",
        "A 1000 kg car traveling at 20 m/s brakes to a stop over 50 m. Find the braking force.",
        "A pendulum of length 1 m is released from 30° from vertical. Find its speed at the lowest point.",
      ],
    },
    gravitation: {
      title: "Universal Gravitation and Satellite Motion",
      overview: "Newton's law of universal gravitation states that every particle attracts every other particle with a force proportional to the product of their masses and inversely proportional to the square of the distance between them.",
      sections: [
        {
          heading: "1. Newton's Law of Gravitation",
          content: "Every mass attracts every other mass with a force along the line joining them. G = 6.674 × 10⁻¹¹ N·m²/kg² is the universal gravitational constant.",
          formula: "F = G\\,\\dfrac{m_1\\, m_2}{r^2}, \\qquad G = 6.674 \\times 10^{-11} \\; \\text{N·m}^2/\\text{kg}^2",
        },
        {
          heading: "2. Gravitational Field Strength",
          content: "The gravitational field strength g at distance r from mass M is g = GM/r². Near Earth's surface, g ≈ 9.8 m/s².",
          formula: "g = \\dfrac{GM}{r^2}",
        },
        {
          heading: "3. Orbital Velocity",
          content: "For a satellite in circular orbit, gravitational force provides centripetal force: GMm/r² = mv²/r.",
          formula: "v_{\\text{orb}} = \\sqrt{\\dfrac{GM}{r}}, \\qquad T = 2\\pi\\sqrt{\\dfrac{r^3}{GM}}",
          example: "Example: Find orbital velocity of a satellite 300 km above Earth. (R = 6400 km, M = 6×10²⁴ kg)\nr = 6700 km. v = √(GM/r) ≈ 7730 m/s",
        },
        {
          heading: "4. Escape Velocity",
          content: "Escape velocity is the minimum speed needed to escape a planet's gravitational field: v_e = √(2GM/R) ≈ 11.2 km/s for Earth.",
          formula: "v_e = \\sqrt{\\dfrac{2GM}{R}} = \\sqrt{2gR} \\approx 11.2 \\; \\text{km/s}",
        },
      ],
      keyPoints: [
        "Gravitational force is always attractive and follows inverse-square law",
        "Escape velocity is independent of the escaping object's mass",
        "Geostationary satellites have orbital period = 24 hours",
        "Gravitational PE is negative (zero at infinity)",
      ],
      commonMistakes: [
        "Using F = mg everywhere (only valid near surface)",
        "Thinking escape velocity depends on projectile mass",
        "Confusing orbital velocity with escape velocity (v_orb = v_e/√2)",
      ],
      practiceQuestions: [
        "Find the gravitational force between two 1000 kg spheres whose centers are 2 m apart.",
        "Calculate the orbital period of a satellite 500 km above Earth's surface.",
        "What is the escape velocity from the Moon? (M_moon = 7.35×10²² kg, R_moon = 1.74×10⁶ m)",
        "At what height above Earth's surface is g reduced to 1/4 of its surface value?",
        "A satellite orbits Earth at radius 2R. Find its orbital speed.",
      ],
    },
    thermodynamics: {
      title: "Thermodynamics",
      overview: "Thermodynamics deals with heat, work, and internal energy. The first law is energy conservation; the second law introduces entropy and the direction of spontaneous processes.",
      sections: [
        {
          heading: "1. First Law of Thermodynamics",
          content: "Conservation of energy for thermal systems: ΔU = Q - W, where ΔU is change in internal energy, Q is heat added, and W is work done by the system.",
          formula: "\\Delta U = Q - W",
        },
        {
          heading: "2. Heat and Temperature",
          content: "Heat required to change temperature: Q = mcΔT. For phase change: Q = mL. Specific latent heat of fusion (ice) = 334 kJ/kg; vaporization (water) = 2260 kJ/kg.",
          formula: "Q = mc\\,\\Delta T, \\qquad Q = mL",
        },
        {
          heading: "3. Ideal Gas Laws",
          content: "PV = nRT relates pressure, volume, temperature, and amount of gas. R = 8.314 J/(mol·K).",
          formula: "PV = nRT",
        },
        {
          heading: "4. Second Law and Entropy",
          content: "Entropy of an isolated system never decreases. Heat cannot spontaneously flow from cold to hot.",
          formula: "\\Delta S_{\\text{universe}} \\geq 0",
        },
        {
          heading: "5. Carnot Efficiency",
          content: "Maximum theoretical efficiency of a heat engine: η = 1 - T_C/T_H (temperatures in kelvin).",
          formula: "\\eta = 1 - \\dfrac{T_C}{T_H}",
          example: "Example: Carnot engine between 500 K and 300 K absorbs 1000 J. Find work done.\nη = 1 - 300/500 = 0.4. W = 0.4 × 1000 = 400 J",
        },
      ],
      keyPoints: [
        "First law: energy is conserved; ΔU = Q - W",
        "Second law: entropy of the universe always increases",
        "Carnot efficiency is the maximum possible",
        "Always use Kelvin in thermodynamic formulas",
      ],
      commonMistakes: [
        "Using Celsius instead of Kelvin",
        "Forgetting sign convention: W is work done BY the system",
        "Thinking heat and temperature are the same",
      ],
      practiceQuestions: [
        "How much heat is needed to convert 2 kg of ice at -10°C to steam at 100°C?",
        "A Carnot engine has efficiency 40% with cold reservoir at 300 K. Find hot reservoir temperature.",
        "5 moles of ideal gas at 300 K expands isothermally from 2 L to 5 L. Find work done.",
        "An adiabatic compression reduces volume by half. If γ = 1.4, by what factor does temperature increase?",
        "A heat engine absorbs 800 J and rejects 500 J per cycle. Find efficiency.",
      ],
    },
    optics: {
      title: "Optics — Reflection and Refraction",
      overview: "Optics studies light behavior. Reflection and refraction govern how light interacts with surfaces and media. Lenses and mirrors form images described by the thin lens/mirror equations.",
      sections: [
        {
          heading: "1. Mirror Equation",
          content: "For spherical mirrors: 1/v + 1/u = 1/f. Magnification m = -v/u. Concave mirrors can form real or virtual images; convex mirrors always form virtual, diminished images.",
          formula: "\\dfrac{1}{v} + \\dfrac{1}{u} = \\dfrac{1}{f}, \\qquad m = -\\dfrac{v}{u}",
          example: "Example: Object 3 cm tall at 20 cm from concave mirror (f = 10 cm).\n1/v = 1/10 - 1/20 = 1/20 → v = 20 cm\nm = -20/20 = -1 → real, inverted, same size",
        },
        {
          heading: "2. Snell's Law",
          content: "Refraction at interface: n₁ sin θ₁ = n₂ sin θ₂. Light bends toward normal entering denser medium.",
          formula: "n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2",
        },
        {
          heading: "3. Total Internal Reflection",
          content: "When light travels dense→rare at angle > critical angle, all light reflects back. Critical angle: sin C = n₂/n₁.",
          formula: "\\sin C = \\dfrac{n_2}{n_1}",
        },
        {
          heading: "4. Thin Lenses",
          content: "Lens maker's formula: 1/f = (n-1)(1/R₁ - 1/R₂). Thin lens equation: 1/v - 1/u = 1/f. Power P = 1/f (diopters when f in meters).",
          formula: "\\dfrac{1}{f} = (n-1)\\!\\left(\\dfrac{1}{R_1} - \\dfrac{1}{R_2}\\right), \\qquad P = \\dfrac{1}{f}",
        },
      ],
      keyPoints: [
        "Mirror/lens equation: 1/v ± 1/u = 1/f",
        "Concave mirrors and convex lenses converge; convex mirrors and concave lenses diverge",
        "TIR requires: dense→rare AND angle > critical angle",
        "Power of lenses in contact adds: P_total = P₁ + P₂",
      ],
      commonMistakes: [
        "Mixing up mirror and lens sign conventions",
        "Forgetting focal length is negative for diverging elements",
        "Confusing real and virtual images",
      ],
      practiceQuestions: [
        "An object is placed 15 cm from a convex lens of focal length 10 cm. Find image distance and magnification.",
        "Light passes from glass (n = 1.5) to water (n = 1.33). Find the critical angle.",
        "A convex lens (f = 20 cm) and concave lens (f = -10 cm) are in contact. Find combined focal length.",
        "An object is placed at the focus of a concave mirror (f = 10 cm). Where is the image?",
        "A ray passes from air into glass (n = 1.5) at 60° incidence. Find angle of refraction.",
      ],
    },
    electrostatics: {
      title: "Electrostatics",
      overview: "Electrostatics deals with electric charges at rest. Coulomb's law gives the force between point charges. Electric field and potential describe the influence of charges on their surroundings.",
      sections: [
        {
          heading: "1. Coulomb's Law",
          content: "Force between two point charges: F = kq₁q₂/r². Like charges repel; opposite charges attract. k = 9 × 10⁹ N·m²/C².",
          formula: "F = \\dfrac{1}{4\\pi\\varepsilon_0}\\cdot\\dfrac{q_1\\, q_2}{r^2} = k\\,\\dfrac{q_1\\, q_2}{r^2}",
          example: "Example: Two charges +2μC and -3μC are 0.1 m apart.\nF = (9×10⁹)(2×10⁻⁶)(3×10⁻⁶)/(0.1)² = 5.4 N (attractive)",
        },
        {
          heading: "2. Electric Field",
          content: "Electric field E = F/q₀ = kQ/r² for a point charge. Field lines start on positive charges and end on negative charges.",
          formula: "\\vec{E} = \\dfrac{\\vec{F}}{q_0} = \\dfrac{1}{4\\pi\\varepsilon_0}\\cdot\\dfrac{Q}{r^2}\\,\\hat{r}",
        },
        {
          heading: "3. Electric Potential",
          content: "Potential V = kQ/r. Potential is a scalar. Equipotential surfaces are perpendicular to field lines.",
          formula: "V = \\dfrac{1}{4\\pi\\varepsilon_0}\\cdot\\dfrac{Q}{r}",
        },
        {
          heading: "4. Gauss's Law",
          content: "Total electric flux through a closed surface equals enclosed charge divided by ε₀. Most useful for symmetric charge distributions.",
          formula: "\\oint \\vec{E}\\cdot d\\vec{A} = \\dfrac{Q_{\\text{enc}}}{\\varepsilon_0}",
        },
        {
          heading: "5. Capacitors",
          content: "Capacitance C = Q/V. Parallel plate: C = ε₀A/d. Energy stored: U = ½CV². Capacitors in parallel add; in series, reciprocals add.",
          formula: "C = \\dfrac{Q}{V}, \\quad C_0 = \\dfrac{\\varepsilon_0 A}{d}, \\quad U = \\tfrac{1}{2}CV^2",
        },
      ],
      keyPoints: [
        "Coulomb force follows inverse-square law",
        "Electric field inside a conductor is zero in electrostatic equilibrium",
        "Potential is scalar; superposition is simpler for potential",
        "Capacitors in parallel: add capacitances; in series: add reciprocals",
      ],
      commonMistakes: [
        "Confusing electric field (vector) with electric potential (scalar)",
        "Choosing a poor Gaussian surface",
        "Adding capacitances for series connection",
      ],
      practiceQuestions: [
        "Two charges +4μC and +6μC are 0.3 m apart. Find where the electric field is zero.",
        "A parallel plate capacitor has plates of area 0.01 m² separated by 1 mm. Find capacitance.",
        "Three capacitors (2μF, 3μF, 6μF) in series. Find equivalent capacitance.",
        "An electron accelerated through 1000 V. Find its final speed. (m_e = 9.1×10⁻³¹ kg)",
        "Find electric field at midpoint between +10μC and -10μC separated by 10 cm.",
      ],
    },
    current: {
      title: "Current Electricity",
      overview: "Current electricity deals with flow of electric charge. Ohm's law (V = IR) relates voltage, current, and resistance. Kirchhoff's laws govern complex circuits.",
      sections: [
        {
          heading: "1. Ohm's Law and Resistance",
          content: "V = IR for ohmic conductors. Resistance depends on material and geometry: R = ρL/A, where ρ is resistivity.",
          formula: "V = IR, \\qquad R = \\rho\\dfrac{L}{A}",
        },
        {
          heading: "2. Resistors in Series and Parallel",
          content: "Series: R_eq = R₁ + R₂ + R₃ + ... (same current). Parallel: 1/R_eq = 1/R₁ + 1/R₂ + ... (same voltage).",
          formula: "\\begin{aligned} \\text{Series:} \\quad R_{\\text{eq}} &= R_1 + R_2 + R_3 \\\\ \\text{Parallel:} \\quad \\dfrac{1}{R_{\\text{eq}}} &= \\dfrac{1}{R_1} + \\dfrac{1}{R_2} + \\dfrac{1}{R_3} \\end{aligned}",
        },
        {
          heading: "3. Kirchhoff's Laws",
          content: "KCL (junction rule): sum of currents entering = sum leaving. KVL (loop rule): sum of potential differences around any loop = 0.",
          formula: "\\sum I_{\\text{in}} = \\sum I_{\\text{out}}, \\qquad \\sum \\Delta V = 0",
        },
        {
          heading: "4. Electrical Power",
          content: "Power dissipated in a resistor: P = IV = I²R = V²/R. Energy: E = Pt.",
          formula: "P = IV = I^2R = \\dfrac{V^2}{R}",
        },
        {
          heading: "5. EMF and Internal Resistance",
          content: "Terminal voltage: V = ε - Ir. A real battery has internal resistance r.",
          formula: "V_{\\text{terminal}} = \\varepsilon - Ir",
        },
      ],
      keyPoints: [
        "Current is same through series components; voltage is same across parallel components",
        "Kirchhoff's laws apply charge and energy conservation to circuits",
        "Internal resistance causes terminal voltage to drop under load",
      ],
      commonMistakes: [
        "Adding resistances for parallel connection",
        "Forgetting internal resistance in battery calculations",
        "Sign errors in Kirchhoff's loop rule",
      ],
      practiceQuestions: [
        "Three resistors (2Ω, 3Ω, 6Ω) in parallel. Find equivalent resistance.",
        "A 12V battery with internal resistance 1Ω is connected to a 5Ω resistor. Find current and terminal voltage.",
        "A 100W bulb is connected to 220V mains. Find current and resistance.",
        "Two cells (2V, r=0.5Ω) and (3V, r=1Ω) in parallel across 4Ω. Find current through resistor.",
        "Find the equivalent resistance between two corners of a cube made of 1Ω resistors.",
      ],
    },
    emw: {
      title: "Electromagnetic Waves",
      overview: "EM waves are oscillating electric and magnetic fields propagating at the speed of light. They are transverse waves with E and B perpendicular to each other and to the direction of propagation.",
      sections: [
        {
          heading: "1. EM Wave Properties",
          content: "All EM waves travel at c = 3 × 10⁸ m/s in vacuum. E and B are in phase: E = cB. EM waves carry energy and momentum.",
          formula: "c = \\lambda\\nu = 3 \\times 10^8 \\; \\text{m/s}, \\qquad E = cB",
        },
        {
          heading: "2. EM Spectrum",
          content: "Ordered by frequency: radio < microwave < IR < visible < UV < X-ray < gamma ray. Higher frequency = higher photon energy.",
          formula: "\\lambda: \\text{radio} > \\text{microwave} > \\text{IR} > \\text{visible} > \\text{UV} > \\text{X-ray} > \\gamma\\text{-ray}",
        },
        {
          heading: "3. Photon Energy",
          content: "Energy of a photon: E = hν = hc/λ, where h = 6.626 × 10⁻³⁴ J·s.",
          formula: "E = h\\nu = \\dfrac{hc}{\\lambda}",
        },
      ],
      keyPoints: [
        "EM waves are transverse and need no medium",
        "Higher frequency = higher photon energy",
        "EM waves can be polarized",
      ],
      commonMistakes: [
        "Thinking EM waves need a medium",
        "Confusing frequency with wavelength",
      ],
      practiceQuestions: [
        "Find the frequency of a radio wave with wavelength 300 m.",
        "What is the energy of a photon of green light (λ = 550 nm)?",
        "An EM wave has E₀ = 100 V/m. Find B₀.",
        "Calculate radiation pressure by 1000 W/m² light on a reflecting surface.",
        "Find wavelength of EM wave with frequency 10¹⁵ Hz.",
      ],
    },
    modern: {
      title: "Modern Physics",
      overview: "Modern physics covers phenomena unexplained by classical physics: photoelectric effect, atomic spectra, de Broglie waves, and nuclear physics.",
      sections: [
        {
          heading: "1. Photoelectric Effect",
          content: "Light behaves as photons. KE_max = hν - φ, where φ is the work function. If hν < φ, no electrons are emitted regardless of intensity.",
          formula: "KE_{\\max} = h\\nu - \\phi = h\\nu - h\\nu_0",
          example: "Example: Light of λ = 300 nm on metal with φ = 2.13 eV.\nE_photon = hc/λ = 4.14 eV. KE = 4.14 - 2.13 = 2.01 eV",
        },
        {
          heading: "2. Bohr Model",
          content: "Electrons orbit in quantized levels: E_n = -13.6/n² eV for hydrogen. Photons are emitted/absorbed during transitions.",
          formula: "E_n = -\\dfrac{13.6}{n^2}\\;\\text{eV}",
        },
        {
          heading: "3. de Broglie Wavelength",
          content: "Matter has wave properties: λ = h/p = h/mv. For electron accelerated through V: λ = h/√(2meV).",
          formula: "\\lambda = \\dfrac{h}{p} = \\dfrac{h}{mv}",
        },
        {
          heading: "4. Nuclear Physics",
          content: "Binding energy: BE = Δm·c². Radioactive decay: N = N₀e^(-λt). Half-life: T₁/₂ = ln2/λ.",
          formula: "\\text{BE} = \\Delta m\\,c^2, \\qquad N = N_0\\,e^{-\\lambda t}, \\qquad T_{1/2} = \\dfrac{\\ln 2}{\\lambda}",
        },
      ],
      keyPoints: [
        "Photoelectric effect proves particle nature of light",
        "Bohr model: angular momentum is quantized",
        "de Broglie wavelength applies to ALL matter",
        "Binding energy per nucleon peaks at iron-56",
      ],
      commonMistakes: [
        "Thinking photoelectric effect depends on intensity for electron energy",
        "Using E_n = -13.6/n (should be n²)",
        "Forgetting mass defect in nuclear reactions",
      ],
      practiceQuestions: [
        "Work function of sodium is 2.3 eV. Find threshold wavelength.",
        "Calculate wavelength of photon emitted when H electron jumps from n=3 to n=2.",
        "An electron and proton have same KE. Which has larger de Broglie wavelength?",
        "A radioactive sample has half-life 10 days. What fraction remains after 30 days?",
        "4 ¹H nuclei fuse to form ⁴He. Find energy released. (mass ¹H = 1.007825 u, ⁴He = 4.002603 u)",
      ],
    },
  },

  chemistry: {
    atomic: {
      title: "Atomic Structure",
      overview: "Atomic structure describes the arrangement of electrons in atoms using quantum numbers. The quantum mechanical model uses orbitals (probability clouds) instead of fixed orbits.",
      sections: [
        {
          heading: "1. Quantum Numbers",
          content: "Four quantum numbers describe each electron: n (principal, shell), l (azimuthal, subshell: 0=s, 1=p, 2=d, 3=f), m_l (magnetic, orbital orientation), m_s (spin, +½ or -½).",
          formula: "\\begin{aligned} n &\\rightarrow \\text{shell (1, 2, 3, ...)} \\\\ l &\\rightarrow \\text{subshell: } 0\\text{(s)},\\; 1\\text{(p)},\\; 2\\text{(d)},\\; 3\\text{(f)} \\\\ m_l &\\rightarrow -l,\\;\\ldots,\\; +l \\\\ m_s &\\rightarrow +\\tfrac{1}{2}\\text{ or } -\\tfrac{1}{2} \\end{aligned}",
        },
        {
          heading: "2. Aufbau Principle",
          content: "Electrons fill orbitals in order of increasing energy: 1s → 2s → 2p → 3s → 3p → 4s → 3d → 4p → 5s → 4d → 5p → 6s → 4f → ...",
          formula: "1s \\lt 2s \\lt 2p \\lt 3s \\lt 3p \\lt 4s \\lt 3d \\lt 4p \\lt 5s \\lt 4d \\lt 5p \\lt 6s \\lt 4f \\lt \\cdots",
        },
        {
          heading: "3. Pauli Exclusion Principle",
          content: "No two electrons can have the same four quantum numbers. Each orbital holds max 2 electrons with opposite spins.",
          formula: "Each orbital: max 2 electrons with opposite spins (m_s = +½, -½)",
        },
        {
          heading: "4. Hund's Rule",
          content: "For degenerate orbitals (same energy), electrons fill singly first with parallel spins before pairing up.",
          formula: "\\underline{\\uparrow\\,}\\;\\underline{\\uparrow\\,}\\;\\underline{\\uparrow\\,} \\quad (3\\text{ unpaired in } p^3)",
        },
        {
          heading: "5. Exceptions to Aufbau",
          content: "Cr (Z=24) is [Ar]4s¹3d⁵ and Cu (Z=29) is [Ar]4s¹3d¹⁰ for extra stability of half-filled and fully-filled d subshells.",
          formula: "\\text{Cr: } [Ar]\\,4s^1\\,3d^5 \\quad (\\text{not } 4s^2\\,3d^4)",
        },
      ],
      keyPoints: [
        "Maximum electrons in shell n = 2n²",
        "Half-filled and fully-filled subshells are extra stable",
        "s subshell: 1 orbital; p: 3; d: 5; f: 7",
      ],
      commonMistakes: [
        "Writing 4s²3d⁴ for Cr (should be 4s¹3d⁵)",
        "Forgetting 4s fills before 3d but 3d is written first",
        "Assigning l = 2 to a p orbital",
      ],
      practiceQuestions: [
        "Write electron configuration for: (a) O (Z=8), (b) Ca (Z=20), (c) Fe³⁺ (Z=26), (d) Cu (Z=29).",
        "What are the four quantum numbers for the last electron in chlorine (Z = 17)?",
        "How many electrons can have n = 3? How many can have n = 3, l = 2?",
        "Explain why Cr has [Ar]4s¹3d⁵ instead of [Ar]4s²3d⁴.",
        "Which element has [Ar]4s²3d¹⁰4p³? What is its group and period?",
      ],
    },
    bonding: {
      title: "Chemical Bonding and Molecular Structure",
      overview: "Chemical bonds hold atoms together. Ionic bonds form by electron transfer; covalent bonds by electron sharing. VSEPR theory and hybridization explain molecular geometries.",
      sections: [
        {
          heading: "1. Ionic Bonding",
          content: "Ionic bonds form by complete electron transfer from metal to non-metal, creating ions that attract electrostatically. Ionic compounds have high melting points and conduct when molten or dissolved.",
          formula: "\\text{Na} \\rightarrow \\text{Na}^+ + e^- \\qquad \\text{Cl} + e^- \\rightarrow \\text{Cl}^- \\qquad \\text{Na}^+ + \\text{Cl}^- \\rightarrow \\text{NaCl}",
        },
        {
          heading: "2. Covalent Bonding",
          content: "Covalent bonds form by sharing electron pairs. Single bond = 1σ; double bond = 1σ+1π; triple bond = 1σ+2π. σ bonds allow rotation; π bonds restrict rotation.",
          formula: "\\text{H}\\cdot \\; + \\; \\cdot\\text{H} \\rightarrow \\text{H:H} \\quad (\\sigma\\text{ bond})",
        },
        {
          heading: "3. VSEPR Theory",
          content: "Electron pairs around a central atom arrange to minimize repulsion. Order: LP-LP > LP-BP > BP-BP. Steric number determines geometry.",
          formula: "\\begin{aligned} \\text{SN=2:} &\\quad \\text{linear, } 180° \\\\ \\text{SN=3:} &\\quad \\text{trigonal planar, } 120° \\\\ \\text{SN=4:} &\\quad \\text{tetrahedral, } 109.5° \\end{aligned}",
          example: "Example: Predict geometry of CH₄, NH₃, H₂O.\nCH₄: SN=4 (4 BP, 0 LP) → tetrahedral, 109.5°\nNH₃: SN=4 (3 BP, 1 LP) → trigonal pyramidal, 107°\nH₂O: SN=4 (2 BP, 2 LP) → bent, 104.5°",
        },
        {
          heading: "4. Hybridization",
          content: "Hybridization mixes atomic orbitals: sp³ (tetrahedral, 4 hybrids), sp² (trigonal planar, 3 hybrids), sp (linear, 2 hybrids).",
          formula: "\\begin{aligned} sp^3 &: 4\\text{ hybrids, tetrahedral} \\\\ sp^2 &: 3\\text{ hybrids, trigonal planar} \\\\ sp &: 2\\text{ hybrids, linear} \\end{aligned}",
        },
      ],
      keyPoints: [
        "Lone pairs compress bond angles more than bonding pairs",
        "sp³ = 4 hybrids; sp² = 3; sp = 2",
        "Resonance structures are not real — actual molecule is a hybrid",
      ],
      commonMistakes: [
        "Predicting tetrahedral for NH₃ (it's trigonal pyramidal)",
        "Confusing electron geometry with molecular geometry",
        "Thinking double bonds are twice as strong as single bonds",
      ],
      practiceQuestions: [
        "Predict geometry of: (a) BeCl₂, (b) BF₃, (c) CH₄, (d) SF₄, (e) XeF₄.",
        "What is the hybridization of central atom in: (a) NH₃, (b) C₂H₄, (c) C₂H₂?",
        "Draw resonance structures for O₃ and CO₃²⁻.",
        "Arrange in order of increasing bond length: C₂H₆, C₂H₄, C₂H₂.",
        "Explain why BF₃ is nonpolar but NF₃ is polar.",
      ],
    },
    equilibrium: {
      title: "Chemical Equilibrium",
      overview: "At equilibrium, forward and reverse rates are equal. The equilibrium constant K quantifies the position. Le Chatelier's principle predicts shifts when conditions change.",
      sections: [
        {
          heading: "1. Equilibrium Constant",
          content: "For aA + bB ⇌ cC + dD: Kc = [C]ᶜ[D]ᵈ/([A]ᵃ[B]ᵇ). K > 1 favors products; K < 1 favors reactants. Pure solids and liquids are excluded.",
          formula: "K_c = \\dfrac{[C]^c[D]^d}{[A]^a[B]^b}, \\qquad K_p = K_c(RT)^{\\Delta n}",
        },
        {
          heading: "2. Le Chatelier's Principle",
          content: "System opposes imposed changes. Increase T → shifts endothermic direction. Increase P → shifts toward fewer gas moles. Catalyst does not shift equilibrium.",
          formula: "\\begin{aligned} \\text{Increase } T &: \\text{shifts in endothermic direction} \\\\ \\text{Increase } P &: \\text{shifts toward fewer gas moles} \\end{aligned}",
        },
        {
          heading: "3. pH and Buffers",
          content: "pH = -log[H⁺]. Henderson-Hasselbalch: pH = pK_a + log([A⁻]/[HA]). Buffers resist pH change when [A⁻] ≈ [HA].",
          formula: "\\text{pH} = -\\log[\\text{H}^+], \\qquad \\text{pH} = \\text{p}K_a + \\log\\dfrac{[\\text{A}^-]}{[\\text{HA}]}",
        },
      ],
      keyPoints: [
        "K depends only on temperature",
        "Q < K → shifts right; Q > K → shifts left",
        "Catalysts speed up both directions equally",
      ],
      commonMistakes: [
        "Including pure solids in K expressions",
        "Thinking catalysts shift equilibrium",
        "Forgetting to use Kelvin with Kp = Kc(RT)^Δn",
      ],
      practiceQuestions: [
        "For N₂ + 3H₂ ⇌ 2NH₃, Kc = 0.5. If [N₂]=0.1, [H₂]=0.3, [NH₃]=0.2, is system at equilibrium?",
        "Calculate pH of 0.1 M acetic acid (Ka = 1.8 × 10⁻⁵).",
        "For 2SO₂ + O₂ ⇌ 2SO₃, Kp = 40 at 1000 K. Find Kc.",
        "Solubility of AgCl is 1.3 × 10⁻⁵ M. Find K_sp.",
        "How does increasing pressure affect N₂O₄(g) ⇌ 2NO₂(g)?",
      ],
    },
    thermo: {
      title: "Thermochemistry",
      overview: "Thermochemistry studies heat changes in reactions. Enthalpy (ΔH) measures heat at constant pressure. Gibbs free energy (ΔG) determines spontaneity.",
      sections: [
        {
          heading: "1. Enthalpy",
          content: "ΔH = H_products - H_reactants. Exothermic: ΔH < 0 (releases heat). Endothermic: ΔH > 0 (absorbs heat).",
          formula: "\\Delta H = H_{\\text{products}} - H_{\\text{reactants}}",
        },
        {
          heading: "2. Hess's Law",
          content: "Enthalpy is a state function. Total ΔH equals sum of ΔH for individual steps, regardless of path.",
          formula: "\\Delta H_{\\text{total}} = \\sum \\Delta H_{\\text{steps}}",
          example: "Example: Find ΔH for C + ½O₂ → CO given:\nC + O₂ → CO₂, ΔH = -393.5 kJ; CO + ½O₂ → CO₂, ΔH = -283.0 kJ\nReverse second and add: ΔH = -393.5 + 283.0 = -110.5 kJ",
        },
        {
          heading: "3. Gibbs Free Energy",
          content: "ΔG = ΔH - TΔS. Spontaneous when ΔG < 0. ΔG° = -RT ln K.",
          formula: "\\Delta G = \\Delta H - T\\Delta S, \\qquad \\Delta G^\\circ = -RT\\ln K",
        },
        {
          heading: "4. Entropy",
          content: "Entropy (S) measures disorder. ΔS_universe > 0 for spontaneous processes. Entropy increases with temperature, phase changes (solid→liquid→gas), and increasing gas moles.",
          formula: "\\Delta S_{\\text{universe}} = \\Delta S_{\\text{system}} + \\Delta S_{\\text{surroundings}} > 0",
        },
      ],
      keyPoints: [
        "Enthalpy is a state function — Hess's law applies",
        "ΔG < 0 → spontaneous; ΔG > 0 → non-spontaneous",
        "Entropy of universe always increases in spontaneous processes",
      ],
      commonMistakes: [
        "Forgetting to reverse sign of ΔH when reversing reactions",
        "Not converting Celsius to Kelvin in ΔG = ΔH - TΔS",
        "Assuming all exothermic reactions are spontaneous",
      ],
      practiceQuestions: [
        "Using ΔH_f° values, find ΔH for CH₃OH + ½O₂ → CO₂ + 2H₂O. (ΔH_f°: CH₃OH = -238.7, CO₂ = -393.5, H₂O = -285.8 kJ/mol)",
        "A reaction has ΔH = -100 kJ and ΔS = -200 J/K. At what temperature does it become non-spontaneous?",
        "Calculate ΔG° for K = 10³ at 298 K.",
        "Enthalpy of combustion of methane is -890 kJ/mol. How much heat from 8 g CH₄?",
        "Why is ice melting at 25°C spontaneous even though ΔH > 0?",
      ],
    },
    kinetics: {
      title: "Chemical Kinetics",
      overview: "Chemical kinetics studies reaction rates. Rate = k[A]ᵐ[B]ⁿ. Order is determined experimentally. Half-life and Arrhenius equation describe time dependence and temperature effects.",
      sections: [
        {
          heading: "1. Rate Law",
          content: "Rate = k[A]ᵐ[B]ⁿ. Orders m and n are determined experimentally, not from stoichiometry. Overall order = m + n.",
          formula: "\\text{Rate} = k[\\text{A}]^m[\\text{B}]^n",
        },
        {
          heading: "2. Integrated Rate Laws",
          content: "Zero order: [A] = [A]₀ - kt. First order: ln[A] = ln[A]₀ - kt. Second order: 1/[A] = 1/[A]₀ + kt.",
          formula: "\\begin{aligned} \\text{Zero order:} \\quad &[A] = [A]_0 - kt \\\\ \\text{First order:} \\quad &\\ln[A] = \\ln[A]_0 - kt \\\\ \\text{Second order:} \\quad &\\dfrac{1}{[A]} = \\dfrac{1}{[A]_0} + kt \\end{aligned}",
        },
        {
          heading: "3. Half-life",
          content: "First order: t₁/₂ = ln2/k (constant, independent of concentration). Second order: t₁/₂ = 1/(k[A]₀).",
          formula: "t_{1/2} = \\dfrac{\\ln 2}{k} \\quad (\\text{first order}), \\qquad t_{1/2} = \\dfrac{1}{k[A]_0} \\quad (\\text{second order})",
        },
        {
          heading: "4. Arrhenius Equation",
          content: "k = Ae^(-Ea/RT). Higher activation energy → smaller rate constant. Catalysts lower Ea.",
          formula: "k = A\\,e^{-E_a/RT}, \\qquad \\ln\\dfrac{k_2}{k_1} = \\dfrac{E_a}{R}\\!\\left(\\dfrac{1}{T_1} - \\dfrac{1}{T_2}\\right)",
        },
      ],
      keyPoints: [
        "Rate law orders are determined experimentally",
        "First-order half-life is constant",
        "Catalysts lower activation energy without changing ΔH",
      ],
      commonMistakes: [
        "Assuming reaction order equals stoichiometric coefficient",
        "Using t₁/₂ = 0.693/k for zero or second order",
        "Thinking catalysts change equilibrium position",
      ],
      practiceQuestions: [
        "First-order half-life is 50 min. How long to drop to 25% of initial?",
        "For second-order with k = 0.5 L/mol·s and [A]₀ = 0.1 M, find [A] after 10 s.",
        "Rate constant doubles from 300 K to 310 K. Find Ea. (R = 8.314 J/mol·K)",
        "Zero-order reaction: k = 0.02 M/s. Time to reduce [A] from 0.5 to 0.1 M?",
        "Ea = 75 kJ/mol. By what factor does rate increase from 300 K to 350 K?",
      ],
    },
    "acid-base": {
      title: "Acid-Base Chemistry",
      overview: "Acid-base chemistry covers pH, strong/weak acids and bases, buffers, and titrations. The Brønsted-Lowry theory defines acids as proton donors and bases as proton acceptors.",
      sections: [
        {
          heading: "1. pH and pOH",
          content: "pH = -log[H⁺]; pOH = -log[OH⁻]; pH + pOH = 14 at 25°C. Strong acids/bases dissociate completely; weak acids/bases partially.",
          formula: "\\text{pH} = -\\log[\\text{H}^+], \\qquad \\text{pH} + \\text{pOH} = 14",
        },
        {
          heading: "2. Weak Acids",
          content: "For weak acid HA: [H⁺] ≈ √(Ka·C). pH ≈ ½pKa - ½log C (when Ka << C).",
          formula: "[\\text{H}^+] \\approx \\sqrt{K_a \\cdot C}, \\qquad \\text{pH} \\approx \\tfrac{1}{2}\\text{p}K_a - \\tfrac{1}{2}\\log C",
        },
        {
          heading: "3. Buffers",
          content: "Buffers resist pH change. Henderson-Hasselbalch: pH = pKa + log([A⁻]/[HA]). Best buffer when [A⁻] = [HA] (pH = pKa).",
          formula: "\\text{pH} = \\text{p}K_a + \\log\\dfrac{[\\text{A}^-]}{[\\text{HA}]}",
        },
        {
          heading: "4. Salt Hydrolysis",
          content: "Salt of weak acid + strong base → basic solution. Salt of strong acid + weak base → acidic solution. Salt of strong + strong → neutral.",
          formula: "K_h = \\dfrac{K_w}{K_a} \\quad (\\text{WA+SB salt}), \\qquad K_h = \\dfrac{K_w}{K_b} \\quad (\\text{SA+WB salt})",
        },
      ],
      keyPoints: [
        "Strong acids/bases dissociate completely",
        "Buffers work best when pH ≈ pKa",
        "Conjugate acid-base pairs differ by one H⁺",
      ],
      commonMistakes: [
        "Using pH = -log C for weak acids (need √(Ka·C))",
        "Thinking all salts are neutral",
        "Choosing wrong indicator for titration",
      ],
      practiceQuestions: [
        "Calculate pH of 0.1 M CH₃COOH (Ka = 1.8 × 10⁻⁵).",
        "Find pH of buffer with 0.1 M CH₃COOH and 0.1 M CH₃COONa.",
        "What is pH at equivalence point of 50 mL 0.1 M NaOH + 50 mL 0.1 M CH₃COOH?",
        "Calculate pH of 0.01 M NH₄Cl (Kb = 1.8 × 10⁻⁵).",
        "How many grams of NaCH₃COO (M = 82) in 1 L of 0.1 M CH₃COOH for pH 4.74?",
      ],
    },
    redox: {
      title: "Redox Reactions and Electrochemistry",
      overview: "Redox reactions involve electron transfer. Oxidation is loss (OIL); reduction is gain (RIG). Electrochemical cells convert chemical energy to electricity.",
      sections: [
        {
          heading: "1. Oxidation and Reduction",
          content: "Oxidation: loss of electrons (increase in oxidation number). Reduction: gain of electrons (decrease in oxidation number). Mnemonic: OIL RIG.",
          formula: "\\text{Oxidation: } \\text{A} \\rightarrow \\text{A}^+ + e^- \\qquad \\text{Reduction: } \\text{B} + e^- \\rightarrow \\text{B}^-",
        },
        {
          heading: "2. Balancing Redox Reactions",
          content: "Use ion-electron method: split into half-reactions, balance atoms and charges, then combine. In acidic medium, balance O with H₂O and H with H⁺.",
          formula: "\\text{Acidic: balance O with H}_2\\text{O, then H with H}^+",
        },
        {
          heading: "3. Cell Potential",
          content: "E°_cell = E°_cathode - E°_anode. If E°_cell > 0, reaction is spontaneous.",
          formula: "E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}}",
        },
        {
          heading: "4. Nernst Equation",
          content: "E = E° - (0.0591/n)log Q at 25°C. As cell discharges, Q increases and E decreases.",
          formula: "E = E^\\circ - \\dfrac{0.0591}{n}\\log Q",
        },
        {
          heading: "5. Faraday's Laws",
          content: "Mass deposited: m = MIt/(nF), where F = 96,485 C/mol. One Faraday deposits one equivalent weight of substance.",
          formula: "m = \\dfrac{MIt}{nF}, \\qquad F = 96485 \\; \\text{C/mol}",
        },
      ],
      keyPoints: [
        "Anode = oxidation (negative in galvanic cell)",
        "Cathode = reduction (positive in galvanic cell)",
        "E°_cell > 0 means spontaneous",
        "Faraday's constant: 1 mol e⁻ = 96,485 C",
      ],
      commonMistakes: [
        "Confusing anode and cathode",
        "Using E°_anode - E°_cathode (should be cathode - anode)",
        "Forgetting sign convention in electrolytic cells",
      ],
      practiceQuestions: [
        "Balance: MnO₄⁻ + Fe²⁺ + H⁺ → Mn²⁺ + Fe³⁺ + H₂O (acidic).",
        "Calculate E°_cell for Zn|Zn²⁺||Cu²⁺|Cu. (E°_Zn = -0.76 V, E°_Cu = +0.34 V)",
        "How many grams of Cu deposited by 2 F through CuSO₄?",
        "Calculate E at 25°C for Zn|Zn²⁺(0.01 M)||Cu²⁺(0.1 M)|Cu. (E° = 1.10 V)",
        "What charge deposits 5.4 g Al from AlCl₃? (Al = 27 g/mol)",
      ],
    },
    organic: {
      title: "Organic Chemistry Fundamentals",
      overview: "Organic chemistry studies carbon compounds. Carbon's tetravalency and catenation enable diverse molecules. IUPAC nomenclature provides systematic names. Functional groups determine reactivity.",
      sections: [
        {
          heading: "1. IUPAC Nomenclature",
          content: "Name = prefix(substituents) + root(chain length) + suffix(function group). Number chain to give lowest locants to substituents. Alphabetical order for prefixes.",
          formula: "\\text{Name} = \\text{prefix} + \\text{root} + \\text{suffix}",
          example: "Example: Name CH₃CH(CH₃)CH₂CH₃.\nLongest chain: 4 carbons (butane). Branch: methyl at C2.\nName: 2-methylbutane",
        },
        {
          heading: "2. Functional Groups",
          content: "Key groups: -OH (alcohol), -CHO (aldehyde), -CO- (ketone), -COOH (carboxylic acid), -NH₂ (amine), -X (halide), -O- (ether), -CN (nitrile).",
          formula: "\\begin{aligned} \\text{Alcohol:} && \\text{-OH} &\\rightarrow \\text{R-OH} \\\\ \\text{Aldehyde:} && \\text{-CHO} &\\rightarrow \\text{R-CHO} \\\\ \\text{Ketone:} && \\text{-CO-} &\\rightarrow \\text{R-CO-R'} \\\\ \\text{Carboxylic acid:} && \\text{-COOH} &\\rightarrow \\text{R-COOH} \\\\ \\text{Amine:} && \\text{-NH}_2 &\\rightarrow \\text{R-NH}_2 \\end{aligned}",
        },
        {
          heading: "3. Isomerism",
          content: "Structural isomers: same formula, different connectivity. Types: chain, position, functional, metamerism, tautomerism. Stereoisomers: same connectivity, different spatial arrangement.",
          formula: "\\begin{aligned} \\text{Chain:} &\\quad \\text{different carbon skeleton} \\\\ \\text{Position:} &\\quad \\text{different position of functional group} \\\\ \\text{Functional:} &\\quad \\text{different functional groups} \\end{aligned}",
        },
        {
          heading: "4. Reaction Mechanisms",
          content: "Homolytic fission: each atom gets one electron (free radicals). Heterolytic fission: one atom gets both electrons (ions). Electrophiles (E⁺) seek electrons; nucleophiles (Nu⁻) donate electrons.",
          formula: "\\begin{aligned} \\text{Homolytic:} \\quad &\\text{A-B} \\rightarrow \\text{A}^\\cdot + \\text{B}^\\cdot \\\\ \\text{Heterolytic:} \\quad &\\text{A-B} \\rightarrow \\text{A}^+ + \\text{B}^- \\end{aligned}",
        },
        {
          heading: "5. Electronic Effects",
          content: "Inductive effect (+I/-I): electron donation/withdrawal through σ bonds. Resonance effect (+R/-R): delocalization through π bonds. Hyperconjugation stabilizes carbocations: 3° > 2° > 1°.",
          formula: "\\text{Carbocation stability:} \\quad 3^\\circ > 2^\\circ > 1^\\circ > \\text{CH}_3^+",
        },
      ],
      keyPoints: [
        "Carbon forms 4 covalent bonds (tetravalency) and can catenate",
        "IUPAC: longest chain first, lowest numbers, alphabetical prefixes",
        "Electrophiles accept electrons; nucleophiles donate electrons",
        "3° carbocations are most stable (hyperconjugation)",
      ],
      commonMistakes: [
        "Numbering chain to give higher locants",
        "Confusing electrophiles with nucleophiles",
        "Forgetting that resonance structures are not real",
      ],
      practiceQuestions: [
        "Name: CH₃CH(CH₃)CH₂CH₃",
        "Draw all structural isomers of C₄H₁₀.",
        "Identify the electrophile and nucleophile in: CH₃Br + OH⁻ → CH₃OH + Br⁻",
        "Arrange in order of increasing acidity: ethanol, phenol, acetic acid.",
        "Explain why t-butyl carbocation is more stable than ethyl carbocation.",
      ],
    },
  },

  mathematics: {
    calculus: {
      title: "Calculus",
      overview: "Calculus deals with limits, derivatives, and integrals. Derivatives measure instantaneous rates of change; integrals compute accumulated quantities. The Fundamental Theorem of Calculus connects differentiation and integration.",
      sections: [
        {
          heading: "1. Limits",
          content: "The limit of f(x) as x approaches a is L if f(x) gets arbitrarily close to L. Standard limits: lim(x→0) sin x/x = 1, lim(x→0) (eˣ-1)/x = 1, lim(x→0) ln(1+x)/x = 1. Indeterminate forms: 0/0, ∞/∞, 0·∞, ∞-∞, 1^∞, 0^0, ∞^0.",
          formula: "\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1, \\quad \\lim_{x \\to 0} \\frac{e^x - 1}{x} = 1",
        },
        {
          heading: "2. Derivatives — Basic Rules",
          content: "Power rule: d/dx[xⁿ] = nxⁿ⁻¹. Derivatives of trig functions: d/dx[sin x] = cos x, d/dx[cos x] = -sin x. Exponential: d/dx[eˣ] = eˣ. Logarithmic: d/dx[ln x] = 1/x.",
          formula: "\\dfrac{d}{dx}\\big[x^n\\big] = nx^{n-1}, \\quad \\dfrac{d}{dx}[\\sin x] = \\cos x, \\quad \\dfrac{d}{dx}[e^x] = e^x",
        },
        {
          heading: "3. Product and Quotient Rules",
          content: "Product rule: d/dx[fg] = f'g + fg'. Quotient rule: d/dx[f/g] = (f'g - fg')/g².",
          formula: "\\dfrac{d}{dx}[f \\cdot g] = f'g + fg', \\qquad \\dfrac{d}{dx}\\!\\left[\\dfrac{f}{g}\\right] = \\dfrac{f'g - fg'}{g^2}",
        },
        {
          heading: "4. Chain Rule",
          content: "For composite functions: d/dx[f(g(x))] = f'(g(x))·g'(x). Essential for differentiating nested functions.",
          formula: "\\dfrac{dy}{dx} = \\dfrac{dy}{du}\\cdot\\dfrac{du}{dx}",
          example: "Example: Find d/dx[sin(x²)].\nu = x², dy/du = cos u, du/dx = 2x\nd/dx = cos(x²)·2x = 2x cos(x²)",
        },
        {
          heading: "5. Integration — Basic Formulas",
          content: "Integration is the inverse of differentiation. Standard integrals: ∫xⁿ dx = xⁿ⁺¹/(n+1) + C, ∫1/x dx = ln|x| + C, ∫eˣ dx = eˣ + C, ∫sin x dx = -cos x + C.",
          formula: "\\int x^n\\,dx = \\dfrac{x^{n+1}}{n+1} + C, \\quad \\int \\dfrac{1}{x}\\,dx = \\ln|x| + C, \\quad \\int e^x\\,dx = e^x + C",
        },
        {
          heading: "6. Fundamental Theorem of Calculus",
          content: "If F is an antiderivative of f, then ∫_a^b f(x) dx = F(b) - F(a). This connects differentiation and integration — they are inverse operations.",
          formula: "\\int_a^b f(x)\\,dx = F(b) - F(a), \\quad \\text{where } F'(x) = f(x)",
        },
        {
          heading: "7. Integration by Parts",
          content: "For products: ∫u dv = uv - ∫v du. Choose u using LIATE rule: Logarithmic, Inverse trig, Algebraic, Trigonometric, Exponential.",
          formula: "\\int u\\,dv = uv - \\int v\\,du",
        },
      ],
      keyPoints: [
        "Derivative = instantaneous rate of change (slope of tangent)",
        "Integration = accumulation / area under curve",
        "Differentiation and integration are inverse operations",
        "Don't forget the constant of integration (+C) for indefinite integrals",
      ],
      commonMistakes: [
        "Forgetting the chain rule when differentiating composite functions",
        "Writing ∫xⁿ dx = xⁿ/n (should be xⁿ⁺¹/(n+1))",
        "Forgetting +C in indefinite integrals",
        "Confusing differentiation rules with integration rules",
      ],
      practiceQuestions: [
        "Find derivative of f(x) = x³ + 2x² - 5x + 3.",
        "Find d/dx[ln(sin x)].",
        "Evaluate ∫(3x² + 2x + 1) dx.",
        "Find ∫x·eˣ dx using integration by parts.",
        "Evaluate ∫₀¹ x²eˣ dx.",
      ],
    },
    trigonometry: {
      title: "Trigonometry",
      overview: "Trigonometry studies relationships between angles and sides of triangles. Key identities, equations, and inverse functions are essential tools in calculus and beyond.",
      sections: [
        {
          heading: "1. Basic Ratios",
          content: "In a right triangle: sin θ = opposite/hypotenuse, cos θ = adjacent/hypotenuse, tan θ = opposite/adjacent = sin θ/cos θ. Remember SOH CAH TOA.",
          formula: "\\sin\\theta = \\dfrac{\\text{opp}}{\\text{hyp}}, \\quad \\cos\\theta = \\dfrac{\\text{adj}}{\\text{hyp}}, \\quad \\tan\\theta = \\dfrac{\\sin\\theta}{\\cos\\theta}",
        },
        {
          heading: "2. Pythagorean Identities",
          content: "The fundamental identity sin²θ + cos²θ = 1 generates two others by dividing by cos²θ or sin²θ.",
          formula: "\\sin^2\\theta + \\cos^2\\theta = 1, \\qquad 1 + \\tan^2\\theta = \\sec^2\\theta, \\qquad 1 + \\cot^2\\theta = \\csc^2\\theta",
        },
        {
          heading: "3. Double Angle Formulas",
          content: "Sin 2θ = 2sin θ cos θ. Cos 2θ has three forms: cos²θ - sin²θ, 2cos²θ - 1, 1 - 2sin²θ.",
          formula: "\\sin 2\\theta = 2\\sin\\theta\\cos\\theta, \\quad \\cos 2\\theta = \\cos^2\\theta - \\sin^2\\theta",
        },
        {
          heading: "4. Sum and Difference",
          content: "sin(A ± B) = sin A cos B ± cos A sin B. cos(A ± B) = cos A cos B ∓ sin A sin B.",
          formula: "\\sin(A \\pm B) = \\sin A\\cos B \\pm \\cos A\\sin B, \\quad \\cos(A \\pm B) = \\cos A\\cos B \\mp \\sin A\\sin B",
        },
        {
          heading: "5. Law of Sines and Cosines",
          content: "For any triangle: a/sin A = b/sin B = c/sin C. Law of cosines: c² = a² + b² - 2ab cos C.",
          formula: "\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C}, \\qquad c^2 = a^2 + b^2 - 2ab\\cos C",
        },
      ],
      keyPoints: [
        "Period of sin/cos: 2π; period of tan: π",
        "All angles in radians for calculus",
        "sin²θ + cos²θ = 1 is the most important identity",
        "Law of sines/cosines work for ANY triangle, not just right triangles",
      ],
      commonMistakes: [
        "Using degrees instead of radians in calculus",
        "Forgetting that sin²θ means (sin θ)², not sin(θ²)",
        "Applying law of sines to find all angles without checking for ambiguous case",
        "Confusing sin(A+B) with sin A + sin B (they are NOT equal)",
      ],
      practiceQuestions: [
        "Find sin 75° using sum formula.",
        "Solve: 2sin²x - sin x - 1 = 0 for 0 ≤ x ≤ 2π.",
        "Prove: sin 2θ = 2tan θ/(1 + tan²θ).",
        "In triangle ABC, a = 5, b = 7, C = 60°. Find c.",
        "Find the general solution of tan θ = 1.",
      ],
    },
    algebra: {
      title: "Algebra — Matrices, Determinants, and Complex Numbers",
      overview: "Matrix algebra handles arrays of numbers with operations like addition, multiplication, and inversion. Determinants help solve systems of equations. Complex numbers extend the real number system.",
      sections: [
        {
          heading: "1. Matrix Operations",
          content: "Matrices are rectangular arrays. Addition: element-wise. Scalar multiplication: multiply each element. Matrix multiplication: row-by-column dot product. AB ≠ BA in general (not commutative).",
          formula: "\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}\\begin{pmatrix} e & f \\\\ g & h \\end{pmatrix} = \\begin{pmatrix} ae+bg & af+bh \\\\ ce+dg & cf+dh \\end{pmatrix}",
        },
        {
          heading: "2. Determinant (2×2)",
          content: "For A = [[a,b],[c,d]], det(A) = ad - bc. Properties: det(AB) = det(A)·det(B), det(Aᵀ) = det(A), det(A⁻¹) = 1/det(A).",
          formula: "\\det\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = ad - bc",
        },
        {
          heading: "3. Inverse of a Matrix",
          content: "For 2×2 matrix: A⁻¹ = (1/det(A))·[[d,-b],[-c,a]]. A matrix has an inverse only if det(A) ≠ 0 (non-singular).",
          formula: "A^{-1} = \\dfrac{1}{\\det(A)}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}",
        },
        {
          heading: "4. Complex Numbers",
          content: "i² = -1. A complex number z = a + bi has real part a and imaginary part b. Conjugate: z̄ = a - bi. Modulus: |z| = √(a² + b²). Multiplying by conjugate: (a+bi)(a-bi) = a² + b².",
          formula: "i^2 = -1, \\qquad |a+bi| = \\sqrt{a^2 + b^2}, \\qquad (a+bi)(a-bi) = a^2 + b^2",
        },
        {
          heading: "5. Quadratic Formula",
          content: "For ax² + bx + c = 0: x = (-b ± √(b²-4ac))/(2a). Discriminant D = b²-4ac determines nature of roots: D > 0 (two real), D = 0 (one repeated), D < 0 (complex).",
          formula: "x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
        },
      ],
      keyPoints: [
        "Matrix multiplication is not commutative (AB ≠ BA)",
        "Conjugate of a + bi is a - bi",
        "det(AB) = det(A)·det(B)",
        "A matrix is invertible iff det(A) ≠ 0",
      ],
      commonMistakes: [
        "Assuming AB = BA for matrices",
        "Writing √(-4) = 2i (should be 2i, but √(-9) = 3i not -3i — principal root)",
        "Forgetting that complex roots come in conjugate pairs for real-coefficient equations",
      ],
      practiceQuestions: [
        "Find determinant of [[2,3],[1,4]].",
        "Find the inverse of [[1,2],[3,4]].",
        "Solve: z² - 4z + 13 = 0.",
        "If A = [[2,1],[1,3]], find A² and A⁻¹.",
        "Find the modulus and conjugate of z = 3 + 4i.",
      ],
    },
    statistics: {
      title: "Statistics and Probability",
      overview: "Statistics summarizes and analyzes data. Probability quantifies uncertainty. Key concepts include measures of central tendency, dispersion, and fundamental probability rules.",
      sections: [
        {
          heading: "1. Measures of Central Tendency",
          content: "Mean: x̄ = Σxᵢ/n. Median: middle value when data is ordered. Mode: most frequent value. Mean is affected by outliers; median is robust.",
          formula: "\\bar{x} = \\dfrac{\\sum_{i=1}^{n} x_i}{n}",
        },
        {
          heading: "2. Variance and Standard Deviation",
          content: "Variance measures spread: σ² = Σ(xᵢ - μ)²/n. Standard deviation is the square root: σ = √σ². For sample data, use n-1 in denominator (unbiased estimator).",
          formula: "\\sigma^2 = \\dfrac{\\sum (x_i - \\mu)^2}{n}, \\qquad \\sigma = \\sqrt{\\sigma^2}",
        },
        {
          heading: "3. Probability Basics",
          content: "P(E) = n(E)/n(S) for equally likely outcomes. P(A∪B) = P(A) + P(B) - P(A∩B). For independent events: P(A∩B) = P(A)·P(B).",
          formula: "P(E) = \\dfrac{n(E)}{n(S)}, \\qquad P(A \\cup B) = P(A) + P(B) - P(A \\cap B)",
        },
        {
          heading: "4. Conditional Probability and Bayes' Theorem",
          content: "P(A|B) = P(A∩B)/P(B). Bayes' theorem: P(Aᵢ|B) = P(B|Aᵢ)·P(Aᵢ) / ΣP(B|Aⱼ)·P(Aⱼ).",
          formula: "P(A|B) = \\dfrac{P(A \\cap B)}{P(B)}, \\qquad P(A_i|B) = \\dfrac{P(B|A_i)\\cdot P(A_i)}{\\sum_j P(B|A_j)\\cdot P(A_j)}",
        },
        {
          heading: "5. Binomial Distribution",
          content: "For n independent trials with success probability p: P(X = k) = C(n,k)·pᵏ·(1-p)ⁿ⁻ᵏ. Mean = np, variance = np(1-p).",
          formula: "P(X = k) = \\binom{n}{k}\\,p^k\\,(1-p)^{n-k}",
        },
      ],
      keyPoints: [
        "Mean is affected by outliers; median is robust",
        "Standard deviation measures average distance from the mean",
        "P(A∩B) = P(A)·P(B) only for independent events",
        "Binomial requires: fixed n, independent trials, constant p, two outcomes",
      ],
      commonMistakes: [
        "Using population formula (divide by n) for sample data (should divide by n-1)",
        "Adding probabilities for independent events (should multiply for intersection)",
        "Confusing permutation with combination (order matters in permutation)",
        "Applying binomial distribution when trials are not independent",
      ],
      practiceQuestions: [
        "Find mean, median, and mode of: 2, 3, 3, 4, 5, 5, 5, 6.",
        "A die is rolled twice. Find P(sum = 7).",
        "In a class, 60% study math, 50% study physics, 30% study both. Find P(studying math or physics).",
        "A bag has 3 red and 2 blue balls. Two balls are drawn without replacement. Find P(both red).",
        "Find the probability of getting exactly 3 heads in 5 coin tosses.",
      ],
    },
    geometry: {
      title: "Coordinate Geometry",
      overview: "Coordinate geometry uses algebra to solve geometric problems. Key concepts include distance, slope, equations of lines, circles, and conic sections.",
      sections: [
        {
          heading: "1. Distance and Section Formulas",
          content: "Distance between (x₁,y₁) and (x₂,y₂): d = √[(x₂-x₁)² + (y₂-y₁)²]. Section formula: point dividing line in ratio m:n is ((mx₂+nx₁)/(m+n), (my₂+ny₁)/(m+n)).",
          formula: "d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}, \\qquad \\left(\\dfrac{mx_2 + nx_1}{m+n},\\; \\dfrac{my_2 + ny_1}{m+n}\\right)",
        },
        {
          heading: "2. Slope and Equation of a Line",
          content: "Slope: m = (y₂-y₁)/(x₂-x₁) = tan θ. Forms: point-slope y-y₁ = m(x-x₁), slope-intercept y = mx + c, general ax + by + c = 0.",
          formula: "m = \\dfrac{y_2 - y_1}{x_2 - x_1}, \\qquad y - y_1 = m(x - x_1)",
        },
        {
          heading: "3. Circle",
          content: "Standard form: (x-h)² + (y-k)² = r² with center (h,k) and radius r. General form: x² + y² + 2gx + 2fy + c = 0 with center (-g,-f) and radius √(g²+f²-c).",
          formula: "(x - h)^2 + (y - k)^2 = r^2",
        },
        {
          heading: "4. Conic Sections",
          content: "Parabola: y² = 4ax (opens right). Ellipse: x²/a² + y²/b² = 1. Hyperbola: x²/a² - y²/b² = 1. Each has specific eccentricity: e = 1 (parabola), e < 1 (ellipse), e > 1 (hyperbola).",
          formula: "\\text{Parabola: } y^2 = 4ax, \\quad \\text{Ellipse: } \\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1, \\quad \\text{Hyperbola: } \\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 1",
        },
      ],
      keyPoints: [
        "Parallel lines: equal slopes (m₁ = m₂)",
        "Perpendicular lines: m₁·m₂ = -1",
        "Distance from point to line: d = |ax₁+by₁+c|/√(a²+b²)",
        "Eccentricity determines the type of conic section",
      ],
      commonMistakes: [
        "Using wrong sign in circle equation (center is (-g,-f) not (g,f))",
        "Confusing slope formula (y₁-y₂ vs y₂-y₁ — should be consistent)",
        "Forgetting that vertical lines have undefined slope",
      ],
      practiceQuestions: [
        "Find distance between (1,2) and (4,6).",
        "Find the equation of the line through (2,3) with slope -1/2.",
        "Find the center and radius of x² + y² - 6x + 8y - 11 = 0.",
        "Find the equation of the parabola with focus (3,0) and directrix x = -3.",
        "Find the area of triangle with vertices (1,2), (3,4), (5,0).",
      ],
    },
  },

  biology: {
    cell: {
      title: "Cell Theory & Structure",
      overview: "The cell is the basic unit of life. Cell theory states that all organisms are composed of cells, cells are the smallest unit of life, and all cells come from pre-existing cells. Prokaryotic cells lack a nucleus; eukaryotic cells have membrane-bound organelles.",
      sections: [
        {
          heading: "1. Cell Theory",
          content: "Cell theory has three main tenets: (1) All living organisms are composed of one or more cells. (2) The cell is the basic unit of structure and organization in organisms. (3) All cells arise from pre-existing cells (Virchow, 1855). Cells range from 0.1 μm (bacteria) to over 100 μm (some plant/animal cells).",
          formula: "\\text{Schleiden (1838) + Schwann (1839) + Virchow (1855) = Cell Theory}",
        },
        {
          heading: "2. Prokaryotic vs Eukaryotic Cells",
          content: "Prokaryotes (bacteria, archaea) lack a membrane-bound nucleus and organelles. Their DNA is a single circular chromosome in the nucleoid region. Eukaryotes (plants, animals, fungi, protists) have a true nucleus and membrane-bound organelles. Eukaryotic cells are typically 10-100 μm; prokaryotic cells are 0.1-5 μm.",
          formula: "\\text{Prokaryote: } 0.1{-}5\\,\\mu\\text{m} \\qquad \\text{Eukaryote: } 10{-}100\\,\\mu\\text{m}",
        },
        {
          heading: "3. Cell Membrane",
          content: "The cell membrane (plasma membrane) is a selectively permeable phospholipid bilayer with embedded proteins (fluid mosaic model). It controls what enters and exits the cell, provides structural support, and contains receptors for cell signaling.",
          formula: "\\text{Fluid Mosaic Model: } \\text{phospholipids} + \\text{proteins} + \\text{cholesterol}",
        },
        {
          heading: "4. Key Organelles",
          content: "Nucleus: stores DNA, controls cell activities. Mitochondria: ATP production (cell's powerhouse). Ribosomes: protein synthesis. Endoplasmic reticulum (ER): rough ER (with ribosomes) synthesizes proteins; smooth ER synthesizes lipids. Golgi apparatus: modifies, sorts, and packages proteins. Lysosomes: digest waste. Vacuoles: storage (large central vacuole in plant cells). Chloroplasts: photosynthesis (plant cells only).",
          formula: "\\text{Mitochondria: } 2C_6H_{12}O_6 + 6O_2 \\rightarrow 6CO_2 + 6H_2O + 38\\,ATP",
        },
        {
          heading: "5. Plant vs Animal Cells",
          content: "Plant cells have: cell wall (cellulose), chloroplasts, large central vacuole. Animal cells have: centrioles, lysosomes, smaller vacuoles. Both have: nucleus, mitochondria, ER, Golgi, ribosomes, plasma membrane.",
          formula: "\\text{Cell wall: } (C_6H_{10}O_5)_n \\quad (\\text{cellulose})",
        },
      ],
      keyPoints: [
        "Cell is the smallest unit of life",
        "All cells come from pre-existing cells",
        "Plant cells have cell walls; animal cells do not",
        "Mitochondria and chloroplasts have their own DNA (endosymbiotic theory)",
        "The nucleus contains the cell's genetic material (DNA)",
      ],
      commonMistakes: [
        "Thinking all cells have a nucleus (prokaryotes don't)",
        "Confusing cell wall with cell membrane (wall is outside membrane, made of cellulose in plants)",
        "Thinking animal cells have chloroplasts (they don't — only plant cells do)",
        "Forgetting that ribosomes are found in both prokaryotes and eukaryotes",
      ],
      practiceQuestions: [
        "Label the parts of a plant cell and state the function of each.",
        "What are the key differences between prokaryotic and eukaryotic cells?",
        "Why are mitochondria called the 'powerhouse of the cell'?",
        "Explain the fluid mosaic model of the cell membrane.",
        "How does the cell wall differ from the cell membrane in structure and function?",
      ],
    },
    genetics: {
      title: "Genetics & Heredity",
      overview: "Genetics studies heredity and variation. Mendel's laws describe inheritance patterns. DNA is the genetic material — a double helix with complementary base pairing. The central dogma describes information flow: DNA → RNA → protein.",
      sections: [
        {
          heading: "1. Mendel's Laws",
          content: "Law of Segregation: allele pairs separate during gamete formation — each gamete gets one allele. Law of Independent Assortment: genes for different traits segregate independently (true for genes on different chromosomes). Monohybrid cross (Aa × Aa) gives 3:1 phenotypic ratio; dihybrid cross (AaBb × AaBb) gives 9:3:3:1 ratio.",
          formula: "\\text{Monohybrid cross: } Aa \\times Aa \\rightarrow 1\\,AA : 2\\,Aa : 1\\,aa \\quad (3:1 \\text{ phenotypic ratio})",
        },
        {
          heading: "2. DNA Structure",
          content: "DNA is a double helix with two antiparallel strands. The backbone is sugar-phosphate; bases project inward. Base pairing: A=T (2 hydrogen bonds), G≡C (3 hydrogen bonds). This complementarity enables replication and transcription.",
          formula: "A = T \\;(2\\;\\text{H-bonds}), \\qquad G \\equiv C \\;(3\\;\\text{H-bonds})",
        },
        {
          heading: "3. DNA Replication",
          content: "Replication is semi-conservative: each new DNA molecule has one old strand and one new strand. Helicase unwinds the double helix. DNA polymerase adds nucleotides in the 5'→3' direction. Leading strand is synthesized continuously; lagging strand in Okazaki fragments.",
          formula: "Helicase opens → DNA polymerase adds nucleotides 5'\\rightarrow 3'",
        },
        {
          heading: "4. Transcription",
          content: "Transcription is the synthesis of mRNA from a DNA template. RNA polymerase reads the template strand (3'→5') and synthesizes mRNA (5'→3'). In eukaryotes, the pre-mRNA undergoes processing: 5' cap, poly-A tail, and splicing (removal of introns).",
          formula: "DNA: 3'-TACGG-5' \\rightarrow \\text{mRNA: } 5'-AUGCC-3'",
        },
        {
          heading: "5. Translation",
          content: "Translation is protein synthesis at the ribosome. mRNA codons (triplets of nucleotides) specify amino acids. tRNA molecules carry specific amino acids and have anticodons complementary to mRNA codons. The genetic code is degenerate (multiple codons can code for the same amino acid) but unambiguous (each codon codes for only one amino acid).",
          formula: "\\text{Genetic code: } 64\\;\\text{codons} \\rightarrow 20\\;\\text{amino acids} \\quad (\\text{degenerate but unambiguous})",
        },
      ],
      keyPoints: [
        "DNA is a double helix with complementary base pairing (A=T, G≡C)",
        "mRNA carries genetic information from nucleus to ribosome",
        "One gene → one polypeptide (central dogma)",
        "Codon: 3 nucleotides = 1 amino acid; start codon = AUG (methionine)",
        "Replication is semi-conservative",
      ],
      commonMistakes: [
        "Thinking DNA replication is conservative (it's semi-conservative)",
        "Confusing transcription (DNA→RNA) with translation (RNA→protein)",
        "Forgetting that RNA has uracil (U) instead of thymine (T)",
        "Thinking each codon can code for multiple amino acids (each codon is unambiguous)",
      ],
      practiceQuestions: [
        "If a DNA strand is 3'-TACGTA-5', write the mRNA sequence.",
        "A monohybrid cross between two heterozygotes (Aa × Aa) produces what genotypic and phenotypic ratios?",
        "What is the complementary DNA strand to 5'-ATGGCC-3'?",
        "If a protein has 300 amino acids, what is the minimum number of nucleotides in the coding DNA?",
        "Explain why the genetic code is described as 'degenerate but unambiguous.'",
      ],
    },
    ecology: {
      title: "Ecology & Environment",
      overview: "Ecology studies interactions between organisms and their environment. Energy flows through ecosystems in one direction; nutrients cycle. The 10% rule states that only about 10% of energy transfers between trophic levels.",
      sections: [
        {
          heading: "1. Ecosystem Components",
          content: "Biotic components: producers (autotrophs), consumers (heterotrophs), decomposers (detritivores). Abiotic components: sunlight, water, soil, temperature, nutrients. An ecosystem includes all biotic and abiotic components in a defined area.",
          formula: "\\text{Energy flow: Sun} \\rightarrow \\text{Producer} \\rightarrow \\text{Consumer} \\rightarrow \\text{Decomposer}",
        },
        {
          heading: "2. Food Chain and Food Web",
          content: "A food chain shows linear feeding relationships: producer → primary consumer → secondary consumer → tertiary consumer. A food web is a network of interconnected food chains. The 10% rule: only ~10% of energy transfers to the next trophic level; the rest is lost as heat.",
          formula: "10\\%\\;\\text{rule: only ~10\\% energy transfers to next trophic level}",
        },
        {
          heading: "3. Biogeochemical Cycles",
          content: "Carbon cycle: photosynthesis fixes CO₂ into organic compounds; respiration and decomposition release CO₂ back. Nitrogen cycle: N₂ is fixed by bacteria into usable forms (nitrification), taken up by plants, returned to soil by decomposition, and converted back to N₂ by denitrifying bacteria.",
          formula: "\\text{Carbon: } 6CO_2 + 6H_2O \\xrightarrow{\\text{light}} C_6H_{12}O_6 + 6O_2",
        },
        {
          heading: "4. Population Ecology",
          content: "Population growth can be exponential (J-curve, unlimited resources) or logistic (S-curve, limited by carrying capacity K). The logistic equation: dN/dt = rN((K-N)/K), where r is the intrinsic growth rate.",
          formula: "\\dfrac{dN}{dt} = rN\\left(\\dfrac{K - N}{K}\\right) \\quad (\\text{logistic growth})",
        },
        {
          heading: "5. Biodiversity and Conservation",
          content: "Biodiversity exists at genetic, species, and ecosystem levels. Biodiversity hotspots have high species richness and significant habitat loss. Conservation strategies: in-situ (protecting habitats: national parks, reserves) and ex-situ (protecting outside habitats: zoos, seed banks, botanical gardens).",
          formula: "\\text{Biodiversity hotspots: } \\gt 1500\\;\\text{vascular plant species, } \\gt 70\\%\\;\\text{original habitat lost}",
        },
      ],
      keyPoints: [
        "Energy flows one way; nutrients cycle",
        "Only ~10% energy transfers between trophic levels",
        "Biodiversity = variety of life at all levels (genetic, species, ecosystem)",
        "Carrying capacity (K) limits population growth in logistic model",
        "In-situ conservation protects species in their natural habitat",
      ],
      commonMistakes: [
        "Thinking energy cycles in ecosystems (it flows one way and is lost as heat)",
        "Confusing biotic (living) with abiotic (non-living) components",
        "Thinking all ecosystems have the same number of trophic levels (usually 3-5)",
        "Confusing in-situ with ex-situ conservation",
      ],
      practiceQuestions: [
        "Draw a food web for a forest ecosystem and identify trophic levels.",
        "If a producer has 10,000 J of energy, how much reaches the tertiary consumer?",
        "Explain the difference between exponential and logistic population growth.",
        "Describe the nitrogen cycle and the role of bacteria in each step.",
        "What makes a region a biodiversity hotspot? Give one example from Nepal.",
      ],
    },
    human: {
      title: "Human Physiology",
      overview: "Human physiology studies the functions of organ systems. The circulatory system transports substances; the respiratory system exchanges gases; the digestive system breaks down food; the nervous system coordinates activities; the excretory system removes waste.",
      sections: [
        {
          heading: "1. Circulatory System",
          content: "The heart has 4 chambers: right atrium, right ventricle, left atrium, left ventricle. Blood flows: body → right atrium → right ventricle → lungs → left atrium → left ventricle → body. Cardiac output = heart rate × stroke volume ≈ 70 × 70 = 4900 mL/min at rest.",
          formula: "\\text{Cardiac output} = \\text{HR} \\times \\text{SV} = 70 \\times 70 = 4900\\;\\text{mL/min}",
        },
        {
          heading: "2. Respiratory System",
          content: "Gas exchange occurs in alveoli: O₂ diffuses into blood, CO₂ diffuses out. Hemoglobin (Hb) carries O₂: O₂ + 4Hb ⇌ Hb₄O₈. Breathing is controlled by the medulla oblongata, responding to CO₂ levels in blood.",
          formula: "O_2 + 4Hb \\rightleftharpoons Hb_4O_8 \\quad (\\text{hemoglobin})",
        },
        {
          heading: "3. Digestive System",
          content: "Mechanical and chemical digestion breaks food into absorbable units. Enzymes: amylase (carbs in mouth), pepsin (protein in stomach), lipase (fats in small intestine). The small intestine is the primary site of absorption with villi and microvilli increasing surface area.",
          formula: "\\text{Starch} \\xrightarrow{\\text{amylase}} \\text{Maltose} \\xrightarrow{\\text{maltase}} \\text{Glucose}",
        },
        {
          heading: "4. Nervous System",
          content: "Neurons transmit electrical signals. Resting potential: -70 mV. Action potential: +30 mV. The signal travels: dendrite → cell body → axon → terminal. Synapses transmit signals via neurotransmitters. The brain has cerebrum (thinking), cerebellum (coordination), and brainstem (vital functions).",
          formula: "\\text{Resting potential: } -70\\,\\text{mV} \\quad \\text{Action potential: } +30\\,\\text{mV}",
        },
        {
          heading: "5. Excretory System",
          content: "Kidneys filter blood to produce urine. Each kidney has ~1 million nephrons. Glomerular filtration rate (GFR) ≈ 125 mL/min. The nephron filters blood, reabsorbs useful substances, and secretes waste. Urine passes through ureter → bladder → urethra.",
          formula: "\\text{GFR} \\approx 125\\;\\text{mL/min} \\quad (\\text{glomerular filtration rate})",
        },
      ],
      keyPoints: [
        "Blood circulates in a closed double circulation system",
        "Alveoli provide huge surface area for gas exchange",
        "Nephron is the functional unit of the kidney",
        "Neurons communicate via electrical signals and chemical neurotransmitters",
        "The heart's pacemaker (SA node) generates electrical impulses",
      ],
      commonMistakes: [
        "Confusing pulmonary circulation (heart-lungs) with systemic circulation (heart-body)",
        "Thinking the heart pumps blood to the lungs (it receives blood FROM the lungs)",
        "Forgetting that the small intestine is the primary site of digestion and absorption",
        "Thinking action potential travels continuously along axon (it jumps between nodes of Ranvier in myelinated neurons)",
      ],
      practiceQuestions: [
        "Describe the path of a red blood cell from the heart to the big toe and back.",
        "Explain how the structure of alveoli is adapted for efficient gas exchange.",
        "What happens to blood glucose levels after a meal, and how does insulin regulate this?",
        "Describe the process of nerve impulse transmission across a synapse.",
        "Explain how the nephron filters blood and forms urine.",
      ],
    },
    evolution: {
      title: "Evolution & Classification",
      overview: "Evolution explains the diversity of life through descent with modification. Natural selection is the primary mechanism. Evidence comes from fossils, comparative anatomy, embryology, and molecular biology. Classification organizes life into a hierarchical system.",
      sections: [
        {
          heading: "1. Origin of Life",
          content: "The Oparin-Haldane hypothesis proposed that organic molecules formed from inorganic precursors under early Earth conditions (reducing atmosphere with CH₄, NH₃, H₂, H₂O). Miller and Urey's experiment (1953) demonstrated this by producing amino acids from these gases using electrical sparks.",
          formula: "\\text{Miller-Urey: } CH_4 + NH_3 + H_2 + H_2O \\xrightarrow{\\text{spark}} \\text{amino acids}",
        },
        {
          heading: "2. Natural Selection",
          content: "Darwin's theory: individuals with favorable variations survive and reproduce more (survival of the fittest). Key observations: (1) Populations produce more offspring than can survive. (2) Variation exists within populations. (3) Some variation is heritable. (4) Individuals with advantageous traits leave more offspring.",
          formula: "\\text{Fitness} = \\dfrac{\\text{reproductive success}}{\\text{population}} \\propto \\text{adaptation}",
        },
        {
          heading: "3. Evidence of Evolution",
          content: "Fossil record shows progression of life forms. Comparative anatomy: homologous structures (same origin, different function — e.g., human arm and whale flipper) indicate common ancestry. Analogous structures (different origin, same function — e.g., wing of insect and wing of bird) indicate convergent evolution. Molecular evidence: DNA similarity between species reflects evolutionary relationship.",
          formula: "\\text{Human-Chimp DNA similarity} \\approx 98.7\\%",
        },
        {
          heading: "4. Taxonomy and Classification",
          content: "Linnaean classification hierarchy: Kingdom → Phylum → Class → Order → Family → Genus → Species. Binomial nomenclature: each species has a two-part Latin name (Genus species, e.g., Homo sapiens). The five-kingdom system: Monera, Protista, Fungi, Plantae, Animalia.",
          formula: "\\text{Binomial nomenclature: } \\textit{Homo\\;sapiens}",
        },
        {
          heading: "5. Phylogenetic Trees",
          content: "Phylogenetic trees (cladograms) show evolutionary relationships. Nodes represent common ancestors; branches represent lineages. Closely related species share more recent common ancestors. Molecular data (DNA/protein sequences) are now the primary basis for constructing phylogenetic trees.",
          formula: "\\text{Cladogram: nodes = common ancestors, branches = lineages}",
        },
      ],
      keyPoints: [
        "Natural selection drives evolution",
        "Homologous structures indicate common ancestry; analogous structures indicate convergent evolution",
        "Five-kingdom system: Monera, Protista, Fungi, Plantae, Animalia",
        "DNA similarity reflects evolutionary relatedness",
        "Extinction is natural; current extinction rate is unusually high due to human activity",
      ],
      commonMistakes: [
        "Thinking evolution is goal-oriented or 'progressive' (it has no direction or goal)",
        "Confusing homologous with analogous structures",
        "Thinking individuals evolve (populations evolve, not individuals)",
        "Thinking use/disuse of organs leads to inheritance of acquired characteristics (Lamarck was wrong)",
      ],
      practiceQuestions: [
        "Explain how homologous structures provide evidence for evolution.",
        "What is the difference between analogous and homologous structures? Give examples.",
        "Describe the evidence for evolution from molecular biology (DNA/protein comparisons).",
        "Why is the current rate of extinction considered alarming?",
        "Construct a simple phylogenetic tree for: human, chimpanzee, gorilla, orangutan (given DNA similarity data).",
      ],
    },
    plant: {
      title: "Plant Physiology",
      overview: "Plant physiology studies how plants function. Photosynthesis converts light energy to chemical energy. Transpiration drives water transport. Plants respond to environmental stimuli through hormones.",
      sections: [
        {
          heading: "1. Photosynthesis",
          content: "Photosynthesis occurs in chloroplasts. Light-dependent reactions (thylakoid membrane) produce ATP and NADPH. The Calvin cycle (stroma) fixes CO₂ into glucose using ATP and NADPH. Overall: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂. C₃, C₄, and CAM plants have different adaptations for carbon fixation.",
          formula: "6CO_2 + 6H_2O \\xrightarrow{\\text{light, chlorophyll}} C_6H_{12}O_6 + 6O_2",
        },
        {
          heading: "2. Transpiration",
          content: "Transpiration is water loss as vapor through stomata. It creates transpiration pull, which drives water ascent in xylem. Factors affecting transpiration rate: temperature, humidity, wind, light intensity, and stomatal opening.",
          formula: "\\text{Transpiration rate} \\propto \\dfrac{\\Delta RH \\times \\text{leaf area}}{\\text{stomatal resistance}}",
        },
        {
          heading: "3. Transport in Plants",
          content: "Xylem transports water and minerals upward (transpiration pull). Phloem transports sugars bidirectionally (pressure flow hypothesis). Source (leaf) to sink (root, fruit, growing tip).",
          formula: "\\text{Pressure flow: } P_{\\text{source}} \\gt P_{\\text{sink}} \\rightarrow \\text{mass flow}",
        },
        {
          heading: "4. Plant Hormones",
          content: "Auxin: cell elongation, apical dominance, phototropism. Gibberellin: stem elongation, seed germination. Cytokinin: cell division. Abscisic acid: stress response, stomatal closure. Ethylene: fruit ripening, leaf abscission.",
          formula: "\\text{Phototropism: } \\text{auxin accumulates on shaded side} \\rightarrow \\text{bending toward light}",
        },
        {
          heading: "5. Plant Nutrition",
          content: "Essential elements: macronutrients (N, P, K, Ca, Mg, S) and micronutrients (Fe, Mn, Zn, Cu, B, Mo, Cl). Nitrogen deficiency causes chlorosis (yellowing) of older leaves. Potassium deficiency causes weak stems and poor disease resistance.",
          formula: "\\text{N deficiency: } \\text{chlorosis (yellowing) of older leaves}",
        },
      ],
      keyPoints: [
        "Photosynthesis occurs in chloroplasts; light reactions produce ATP+NADPH; Calvin cycle fixes CO₂",
        "Xylem transports water up; phloem transports food both ways",
        "Plant hormones regulate growth and responses to environment",
        "Transpiration pull is the main force for water ascent in tall trees",
        "C₄ and CAM plants have adaptations for hot/dry environments",
      ],
      commonMistakes: [
        "Thinking plants get their mass from soil (most comes from CO₂ in air)",
        "Confusing xylem (water up) with phloem (food both ways)",
        "Thinking all plant hormones are produced in the same organ",
        "Forgetting that transpiration is a passive process (no energy required)",
      ],
      practiceQuestions: [
        "Explain the light-dependent and light-independent reactions of photosynthesis.",
        "How does transpiration pull help water ascend in tall trees?",
        "Describe the role of auxin in phototropism.",
        "What are the symptoms of nitrogen deficiency in plants? Why does it appear in older leaves first?",
        "Compare C₃, C₄, and CAM photosynthesis. Why are C₄ and CAM adaptations beneficial in hot environments?",
      ],
    },
  },
};

function NewTheoryPanel({ subject, topic }: { subject?: string; topic?: string }) {
  const [activeSection, setActiveSection] = useState(0);
  const [showMistakes, setShowMistakes] = useState(false);
  const [showPractice, setShowPractice] = useState(false);

  if (!subject || !topic) return null;

  const data = THEORY_CONTENT[subject]?.[topic];

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <BookOpen className="h-12 w-12 text-muted-foreground/50 mb-4" />
        <h2 className="text-lg font-semibold">Theory Content Coming Soon</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Detailed theory for {subject} — {topic} is being prepared.
        </p>
      </div>
    );
  }

  const currentSection = data.sections[activeSection];

  return (
    <div className="space-y-5">
      {/* Title banner */}
      <div className="bg-gradient-to-r from-primary/10 to-transparent p-4 rounded-lg border-l-4 border-primary">
        <h2 className="text-xl font-bold">{data.title}</h2>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{data.overview}</p>
      </div>

      {/* Section tabs */}
      <div className="flex flex-wrap gap-1.5">
        {data.sections.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveSection(idx)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeSection === idx
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            }`}
          >
            {idx + 1}. {data.sections[idx].heading.replace(/^\d+\.\s*/, "")}
          </button>
        ))}
      </div>

      {/* Current section card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <BookOpen className="h-5 w-5 text-primary" />
            {currentSection.heading}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground leading-relaxed text-sm">{currentSection.content}</p>
          {currentSection.formula && (
            <div className="rounded-xl border border-border bg-muted/40 overflow-hidden">
              <div className="px-4 py-2.5 border-b border-border bg-muted/60">
                <p className="flex items-center gap-2 text-primary font-semibold text-sm">
                  <span>📐 Key Formula</span>
                </p>
              </div>
              <div className="p-4 flex items-center justify-center overflow-x-auto">
                <Katex math={currentSection.formula} displayMode={true} />
              </div>
            </div>
          )}
          {currentSection.example && (
            <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="flex items-center gap-2 mb-2 text-blue-700 dark:text-blue-400 font-semibold text-sm">
                <Lightbulb className="h-4 w-4" />
                <span>Worked Example</span>
              </p>
              <pre className="whitespace-pre-wrap text-sm font-mono text-foreground/90">{currentSection.example}</pre>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Key Points */}
      <Card className="bg-green-50/50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg text-green-700 dark:text-green-400">
            <CheckCircle className="h-5 w-5" />
            Key Points to Remember
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {data.keyPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                <span className="text-sm">{point}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Common Mistakes */}
      <Card className="bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
        <CardHeader
          className="cursor-pointer pb-3"
          onClick={() => setShowMistakes(!showMistakes)}
        >
          <CardTitle className="flex items-center gap-2 text-lg text-amber-700 dark:text-amber-400">
            <AlertCircle className="h-5 w-5" />
            Common Mistakes to Avoid
            <ChevronDown
              className={`h-4 w-4 ml-auto transition-transform ${showMistakes ? "rotate-180" : ""}`}
            />
          </CardTitle>
        </CardHeader>
        {showMistakes && (
          <CardContent>
            <ul className="space-y-2">
              {data.commonMistakes.map((mistake, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                  <span className="text-sm">{mistake}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        )}
      </Card>

      {/* Practice Questions */}
      <Card className="bg-violet-50/50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800">
        <CardHeader
          className="cursor-pointer pb-3"
          onClick={() => setShowPractice(!showPractice)}
        >
          <CardTitle className="flex items-center gap-2 text-lg text-violet-700 dark:text-violet-400">
            <Pencil className="h-5 w-5" />
            Practice Questions ({data.practiceQuestions.length})
            <ChevronDown
              className={`h-4 w-4 ml-auto transition-transform ${showPractice ? "rotate-180" : ""}`}
            />
          </CardTitle>
        </CardHeader>
        {showPractice && (
          <CardContent>
            <ol className="space-y-3">
              {data.practiceQuestions.map((q, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300">
                    {idx + 1}
                  </span>
                  <span className="text-sm">{q}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        )}
      </Card>
    </div>
  );
}

// Old TheoryPanel rendering (for existing labs)
function OldTheoryPanel({ title, vocabulary, look, predict, principle, why }: {
  title?: string;
  vocabulary?: string;
  look?: string | React.ReactNode;
  predict?: string;
  principle?: string | React.ReactNode;
  why?: string;
}) {
  if (!title && !vocabulary) return null;
  
  return (
    <div className="mt-4 space-y-3">
      {title && <h3 className="font-semibold text-sm text-primary">{title}</h3>}
      {vocabulary && (
        <div className="bg-muted p-3 rounded-lg">
          <p className="text-xs font-semibold text-muted-foreground mb-1">Vocabulary</p>
          <p className="text-sm">{vocabulary}</p>
        </div>
      )}
      {look && (
        <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
          <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-1">Look</p>
          <div className="text-sm">{look}</div>
        </div>
      )}
      {predict && (
        <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-lg">
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1">Predict</p>
          <p className="text-sm">{predict}</p>
        </div>
      )}
      {principle && (
        <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
          <p className="text-xs font-semibold text-green-700 dark:text-green-400 mb-1">Principle</p>
          <div className="text-sm">{principle}</div>
        </div>
      )}
      {why && (
        <div className="bg-purple-50 dark:bg-purple-950/20 p-3 rounded-lg">
          <p className="text-xs font-semibold text-purple-700 dark:text-purple-400 mb-1">Why</p>
          <p className="text-sm">{why}</p>
        </div>
      )}
    </div>
  );
}

export function TheoryPanel(props: TheoryPanelProps) {
  if (props.subject && props.topic) {
    return <NewTheoryPanel subject={props.subject} topic={props.topic} />;
  }
  return <OldTheoryPanel {...props} />;
}
