/**
 * Entrance Question Bank — Physics.
 * Unit slugs mirror public/data/syllabus-notes/physics/_manifest.json.
 */

import type { EntranceUnitBank } from "./types";

export const PHYSICS_ENTRANCE: EntranceUnitBank[] = [
  {
    units: ["physical-quantities", "mechanics"],
    questions: [
      { q: "The dimensional formula of Planck's constant is the same as that of:", options: ["Angular momentum", "Linear momentum", "Energy", "Power"], answer: 0, why: "[h] = [E]/[f] = ML²T⁻¹, identical to angular momentum L = mvr.", exam: "CEE 2080" },
      { q: "Which pair of physical quantities has the same dimensions?", options: ["Work and torque", "Force and power", "Momentum and energy", "Pressure and force"], answer: 0, why: "Both are force × distance (ML²T⁻²) — the classic dimension trap.", exam: "IOE 2079" },
      { q: "If force F, length L and time T are base quantities, the dimension of mass is:", options: ["FL⁻¹T²", "FL⁻¹T⁻²", "FLT²", "FLT⁻²"], answer: 0, why: "F = ma → M = F/a = F/(L/T²) = FL⁻¹T².", exam: "CEE 2078" },
      { q: "Significant figures in 0.00650 are:", options: ["3", "5", "2", "6"], answer: 0, why: "Leading zeros never count; trailing zero after decimal does → 6, 5, 0.", exam: "NEB Board" },
    ],
  },
  {
    units: ["vectors"],
    questions: [
      { q: "The magnitude of the resultant of two equal forces F acting at 120° is:", options: ["F", "2F", "F√2", "F√3"], answer: 0, why: "R = 2F cos(120°/2) = 2F cos60° = F — the equal-angle staple.", exam: "CEE 2080" },
      { q: "If A·B = 0 and A × B = 0, then:", options: ["Both A and B are null vectors", "A and B are parallel", "A and B are perpendicular", "One of them is a unit vector"], answer: 0, why: "Dot zero needs 90°; cross zero needs 0°/180° — only |A|=0 or |B|=0 satisfies both.", exam: "IOE 2078" },
      { q: "The angle between A = 3î + 4ĵ and the x-axis is:", options: ["tan⁻¹(4/3)", "tan⁻¹(3/4)", "45°", "sin⁻¹(3/5)"], answer: 0, why: "tan θ = y-component/x-component = 4/3.", exam: "CEE 2079" },
      { q: "A vector perpendicular to both î + ĵ and ĵ + k̂ is:", options: ["î − 2ĵ + k̂", "î + ĵ + k̂", "î − ĵ", "ĵ − k̂"], answer: 0, why: "Take the cross product — it's orthogonal to both by construction.", exam: "IOE 2080" },
    ],
  },
  {
    units: ["kinematics"],
    questions: [
      { q: "A body is thrown up with velocity u. Time to return to the thrower is:", options: ["2u/g", "u/g", "u²/2g", "√(2u/g)"], answer: 0, why: "Time up = u/g; symmetric descent doubles it.", exam: "CEE 2079" },
      { q: "For a body starting from rest with uniform acceleration a, distance in the nth second is:", options: ["a/2 (2n − 1)", "a(2n − 1)", "an", "a(n − 1)"], answer: 0, why: "sₙ = u + a/2 (2n−1) with u = 0 — memorise the half-factor.", exam: "IOE 2079" },
      { q: "A ball dropped from a tower strikes the ground in 3 s. The tower's height is (g = 10):", options: ["45 m", "30 m", "90 m", "15 m"], answer: 0, why: "h = ½gt² = ½ × 10 × 9 = 45 m.", exam: "CEE 2078" },
      { q: "The velocity-time graph of a body is a straight line not through the origin. Its displacement equals:", options: ["Area under the line", "Slope of the line", "Intercept only", "Twice the slope"], answer: 0, why: "Area under v–t is always displacement; slope is acceleration.", exam: "NEB Board" },
    ],
  },
  {
    units: ["dynamics"],
    questions: [
      { q: "A 2 kg block on a frictionless surface is pushed by 10 N. Its acceleration is:", options: ["5 m/s²", "20 m/s²", "0.2 m/s²", "12 m/s²"], answer: 0, why: "a = F/m = 10/2.", exam: "CEE 2081" },
      { q: "In a lift accelerating upward with a, the apparent weight of mass m is:", options: ["m(g + a)", "m(g − a)", "mg", "ma"], answer: 0, why: "N − mg = ma → N = m(g + a); downward acceleration subtracts.", exam: "IOE 2079" },
      { q: "The impulse of a force is equal to change in:", options: ["Momentum", "Energy", "Velocity", "Acceleration"], answer: 0, why: "J = FΔt = Δp — the definition, always momentum.", exam: "CEE 2080" },
      { q: "For a rocket, thrust equals:", options: ["v(dM/dt)", "M(dv/dt) × M", "½v²(dM/dt)", "v²M"], answer: 0, why: "F = v·(dm/dt): exhaust velocity times mass flow rate.", exam: "IOE 2078" },
    ],
  },
  {
    units: ["work-energy-and-power", "work-energy-power"],
    questions: [
      { q: "A spring of constant k is stretched by x. Its PE is:", options: ["½kx²", "kx²", "½kx", "2kx²"], answer: 0, why: "Area under F–x graph = ½kx² — watch for the missing ½ in options.", exam: "CEE 2080" },
      { q: "A pump lifts 60 kg of water per minute through 10 m (g = 10). Its power is:", options: ["100 W", "600 W", "6000 W", "10 W"], answer: 0, why: "P = mgh/t = (60 × 10 × 10)/60 = 100 W.", exam: "IOE 2079" },
      { q: "Work done by centripetal force in uniform circular motion is:", options: ["Zero", "mv²/r", "mvr", "2πr·mv²/r"], answer: 0, why: "Force ⟂ displacement at every instant → zero work.", exam: "CEE 2079" },
      { q: "If kinetic energy is doubled, momentum becomes:", options: ["√2 times", "2 times", "4 times", "1/√2 times"], answer: 0, why: "KE = p²/2m → p ∝ √KE.", exam: "CEE 2081" },
    ],
  },
  {
    units: ["circular-motion"],
    questions: [
      { q: "A car rounds a frictionless banked curve at the design speed. The normal reaction is:", options: ["mg/cos θ", "mg cos θ", "mg sin θ", "mg"], answer: 0, why: "N cos θ = mg on a frictionless bank — N is LARGER than mg.", exam: "IOE 2079" },
      { q: "At the top of a vertical circle, minimum speed for string tension to just vanish is:", options: ["√(gr)", "√(2gr)", "√(5gr)", "2√(gr)"], answer: 0, why: "mg = mv²/r at the top → v = √(gr); the √5gr figure belongs to the bottom.", exam: "CEE 2080" },
      { q: "Centripetal acceleration of a body with constant speed v on a circle of radius r is directed:", options: ["Toward the centre", "Away from centre", "Along velocity", "Along tangent"], answer: 0, why: "Definition — always central; 'centrifugal' is the rotating-frame fiction.", exam: "NEB Board" },
      { q: "A conical pendulum of length l at angle θ has period:", options: ["2π√(l cos θ/g)", "2π√(l/g)", "2π√(l sin θ/g)", "π√(l cos θ/g)"], answer: 0, why: "Effective radius r = l sinθ; T = 2π√(r/g·tanθ) simplifies to l cosθ/g.", exam: "IOE 2080" },
    ],
  },
  {
    units: ["gravitation"],
    questions: [
      { q: "If the Earth's radius shrinks to half with mass constant, g at the surface becomes:", options: ["4g", "2g", "g/2", "g/4"], answer: 0, why: "g = GM/R² ∝ 1/R² — halving R quadruples g.", exam: "CEE 2080" },
      { q: "Escape velocity from Earth is 11.2 km/s. From a planet of same density but twice the radius it is:", options: ["22.4 km/s", "11.2 km/s", "5.6 km/s", "15.8 km/s"], answer: 0, why: "vₑ ∝ R√ρ — same density, double R → double vₑ.", exam: "IOE 2079" },
      { q: "The orbital period of a satellite very close to Earth's surface is about:", options: ["84 minutes", "24 hours", "365 days", "12 hours"], answer: 0, why: "T = 2π√(R/g) ≈ 84.4 min — the famous parking-orbit-fact.", exam: "CEE 2079" },
      { q: "Weight of a body at the centre of the Earth is:", options: ["Zero", "Maximum", "mg/2", "Infinite"], answer: 0, why: "g decreases linearly to zero at the centre (shell theorem).", exam: "CEE 2078" },
    ],
  },
  {
    units: ["elasticity"],
    questions: [
      { q: "Poisson's ratio of a material cannot exceed:", options: ["0.5", "1", "2", "0.1"], answer: 0, why: "Theoretical limit σ ≤ 0.5 for volume conservation; real metals ~0.3.", exam: "IOE 2079" },
      { q: "The Young's modulus of a wire is Y. Breaking stress depends on:", options: ["Material only", "Length", "Radius", "Both length and radius"], answer: 0, why: "Breaking stress is a material property — independent of geometry.", exam: "CEE 2080" },
      { q: "Two wires of same material, lengths l and 2l, radii r and 2r, carry equal loads. Elongation ratio is:", options: ["2:1", "1:2", "1:1", "4:1"], answer: 0, why: "Δl ∝ l/r² → (l/r²)/(2l/4r²) = 2.", exam: "CEE 2081" },
      { q: "Elastic potential energy per unit volume of a stretched wire is:", options: ["½ × stress × strain", "stress × strain", "Y × strain²", "½Y × strain"], answer: 0, why: "u = ½σε — the area of the σ–ε triangle.", exam: "IOE 2080" },
    ],
  },
  {
    units: ["heat-and-temperature", "quantity-of-heat", "rate-of-heat-flow", "thermal-expansion"],
    questions: [
      { q: "A metal disc is heated. Its hole diameter will:", options: ["Increase", "Decrease", "Stay same", "First increase then decrease"], answer: 0, why: "Thermal expansion opens the hole too — everything scales up, never shrink.", exam: "CEE 2080" },
      { q: "The ratio of thermal conductivities of two rods of equal length and area in series carrying steady heat is 2:1. Temperature drop ratio is:", options: ["2:1", "1:2", "1:1", "4:1"], answer: 0, why: "Same heat current: ΔT ∝ 1/K — poorer conductor drops more temperature.", exam: "IOE 2079" },
      { q: "At what temperature do Celsius and Fahrenheit readings coincide?", options: ["−40°", "0°", "40°", "−273°"], answer: 0, why: "F = 9C/5 + 32; set C = F → C = −40. The classic.", exam: "CEE 2078" },
      { q: "Coefficient of areal expansion of a solid is nearly:", options: ["2α", "3α", "α", "α/2"], answer: 0, why: "β = 2α, γ = 3α — the 2/3 ladder.", exam: "NEB Board" },
      { q: "Water shows anomalous expansion at:", options: ["4 °C", "0 °C", "100 °C", "−4 °C"], answer: 0, why: "Density peaks at 4 °C — why lakes freeze top-down.", exam: "CEE 2079" },
    ],
  },
  {
    units: ["ideal-gas"],
    questions: [
      { q: "At constant pressure, if volume of a gas doubles, its temperature (K) becomes:", options: ["Double", "Half", "Same", "Four times"], answer: 0, why: "Charles's law V ∝ T at fixed P.", exam: "CEE 2079" },
      { q: "Mean kinetic energy of an ideal gas molecule depends only on:", options: ["Temperature", "Pressure", "Volume", "Mass"], answer: 0, why: "(3/2)kT — independent of gas species.", exam: "IOE 2080" },
      { q: "rms speed of gas molecules at 27 °C is v. At 927 °C it becomes:", options: ["2v", "v√2", "4v", "v/2"], answer: 0, why: "v ∝ √T(K): 300 K → 1200 K is 4× temperature, 2× speed.", exam: "CEE 2081" },
      { q: "For an ideal gas, Cp − Cv equals:", options: ["R", "R/2", "3R/2", "Zero"], answer: 0, why: "Mayer's relation — exact for ideal gases.", exam: "IOE 2078" },
    ],
  },
  {
    units: ["electric-charges", "electric-field"],
    questions: [
      { q: "Two charges +q and −q separated by d form a dipole. Field on the equatorial line at distance r (r ≫ d) falls as:", options: ["1/r³", "1/r²", "1/r", "1/r⁴"], answer: 0, why: "Dipole fields fall as 1/r³ — faster than a point charge.", exam: "IOE 2079" },
      { q: "Electric field inside a charged hollow conductor is:", options: ["Zero everywhere inside", "Maximum at centre", "Same as at surface", "Depends on charge"], answer: 0, why: "Electrostatic shielding — the shell theorem's E-field face.", exam: "CEE 2080" },
      { q: "Force between two charges in a medium of dielectric constant K compared to vacuum becomes:", options: ["1/K times", "K times", "K² times", "Unchanged"], answer: 0, why: "Coulomb's law divides by K in a dielectric.", exam: "CEE 2079" },
      { q: "The unit of electric flux is:", options: ["N·m²/C", "N/C", "C/m²", "V·m"], answer: 0, why: "E·A — also equal to V·m; N·m²/C is the standard form.", exam: "IOE 2078" },
    ],
  },
  {
    units: ["potential-potential-difference-and-potential-energy", "capacitor"],
    questions: [
      { q: "A capacitor is charged then disconnected and the plates pulled apart. The energy:", options: ["Increases", "Decreases", "Stays same", "Becomes zero"], answer: 0, why: "Q fixed → C falls, U = Q²/2C rises — you do work pulling plates.", exam: "CEE 2080" },
      { q: "Three 3 μF capacitors in series give:", options: ["1 μF", "9 μF", "3 μF", "1/3 μF"], answer: 0, why: "1/C = 1/3 + 1/3 + 1/3 = 1 → C = 1 μF.", exam: "IOE 2079" },
      { q: "Work done moving a charge between two points on an equipotential surface is:", options: ["Zero", "qV", "V/q", "Infinite"], answer: 0, why: "ΔV = 0 → W = qΔV = 0 — the definition of equipotential.", exam: "CEE 2078" },
      { q: "A dielectric slab K is fully inserted in a battery-connected capacitor. The charge becomes:", options: ["K times", "1/K times", "Same", "K² times"], answer: 0, why: "V fixed (battery), C rises ×K, so Q = CV rises ×K.", exam: "CEE 2081" },
    ],
  },
  {
    units: ["dc-circuits"],
    questions: [
      { q: "In the potentiometer, a balanced null point gives:", options: ["Accurate EMF with no internal drop", "Maximum current", "Internal resistance directly", "Terminal voltage only"], answer: 0, why: "No current through the cell at balance → true EMF.", exam: "IOE 2079" },
      { q: "Two resistors 4 Ω and 6 Ω in parallel across 10 V draw total current:", options: ["4.17 A", "1 A", "2.5 A", "10 A"], answer: 0, why: "R = 2.4 Ω; I = 10/2.4 ≈ 4.17 A.", exam: "CEE 2079" },
      { q: "Kirchhoff's junction rule expresses conservation of:", options: ["Charge", "Energy", "Momentum", "Mass"], answer: 0, why: "ΣI in = ΣI out is charge conservation; loop rule is energy.", exam: "NEB Board" },
      { q: "Maximum power is delivered to a load when its resistance equals:", options: ["Internal resistance of source", "Twice internal", "Half internal", "Zero"], answer: 0, why: "The maximum-power transfer theorem — R_load = r.", exam: "IOE 2080" },
    ],
  },
  {
    units: ["reflection-at-curved-mirror", "refraction-at-plane-surfaces", "refraction-through-prisms", "lenses", "dispersion", "optics"],
    questions: [
      { q: "A concave mirror forms a real image of same size as the object when the object is at:", options: ["C (2f)", "F", "Beyond C", "Infinity"], answer: 0, why: "m = −1 at the centre of curvature.", exam: "CEE 2079" },
      { q: "Critical angle for glass–air (n = 1.5) is nearly:", options: ["42°", "30°", "45°", "60°"], answer: 0, why: "sin C = 1/1.5 = 0.667 → C ≈ 41.8°.", exam: "CEE 2080" },
      { q: "A prism of small angle A produces deviation δ = (n − 1)A. For n = 1.5, A = 4°, δ is:", options: ["2°", "6°", "4°", "1°"], answer: 0, why: "δ = 0.5 × 4° = 2° — the small-angle prism formula.", exam: "IOE 2079" },
      { q: "Power of a convex lens of focal length 25 cm is:", options: ["+4 D", "+0.04 D", "−4 D", "+25 D"], answer: 0, why: "P = 1/f(m) = 1/0.25 = 4 dioptres.", exam: "CEE 2081" },
      { q: "In dispersion through a prism, violet deviates more than red because violet's:", options: ["Refractive index is higher", "Speed is higher", "Wavelength is longer", "Frequency is lower"], answer: 0, why: "n ∝ 1/λ in a medium — shorter λ bends more.", exam: "CEE 2080" },
    ],
  },
  {
    units: ["solids"],
    questions: [
      { q: "In an intrinsic semiconductor, the Fermi level lies:", options: ["Midway in the forbidden gap", "Near conduction band", "Near valence band", "Inside conduction band"], answer: 0, why: "Intrinsic → symmetric position; doping shifts it.", exam: "IOE 2079" },
      { q: "Reverse bias on a p-n junction diode:", options: ["Increases the depletion width", "Narrows depletion", "Causes breakdown always", "Reduces barrier"], answer: 0, why: "Reverse bias widens depletion and raises barrier.", exam: "CEE 2080" },
      { q: "In a full-wave rectifier, input 50 Hz gives output ripple frequency:", options: ["100 Hz", "50 Hz", "25 Hz", "200 Hz"], answer: 0, why: "Both halves rectified → double the input frequency.", exam: "CEE 2081" },
    ],
  },
  {
    units: ["nuclear-physics", "recent-trends-in-physics"],
    questions: [
      { q: "After 3 half-lives, the fraction of radioactive sample left is:", options: ["1/8", "1/3", "1/6", "1/9"], answer: 0, why: "(1/2)³ = 1/8 — powers of two, never thirds.", exam: "CEE 2080" },
      { q: "The energy of the mass defect 1 u is about:", options: ["931.5 MeV", "1.6 MeV", "511 keV", "13.6 eV"], answer: 0, why: "E = mc² with 1 u = 1.66 × 10⁻²⁷ kg → 931.5 MeV.", exam: "IOE 2079" },
      { q: "Photoelectric current depends on:", options: ["Intensity of light", "Frequency only", "Work function only", "Stopping potential only"], answer: 0, why: "More photons per second → more photoelectrons; frequency sets their KE.", exam: "CEE 2081" },
      { q: "The de Broglie wavelength of a particle doubled in momentum becomes:", options: ["Half", "Double", "Same", "Four times"], answer: 0, why: "λ = h/p — inverse relation.", exam: "CEE 2079" },
    ],
  },
];
