/**
 * Graph Bank — detail layer, Physics 1 (motion, heat, gravitation).
 *
 * Authored per graph: what the graph GIVES, where it APPLIES (what it works
 * for), WHAT HAPPENS as you move along / change conditions, and its LIMITS.
 * Merged into lib/graphs.ts → getGraphDetail().
 */

import type { GraphDetailInfo } from "@/lib/graphs";

export const DETAIL_PHYSICS_1: Record<string, GraphDetailInfo> = {
  "phy-displacement-time": {
    gives: [
      "Exact position of the body at every chosen instant — read y directly against t.",
      "Velocity without computing: the slope at any point IS the instantaneous velocity.",
      "Direction of travel: a rising line means forward, a falling line means returning, a peak means a turn-around point.",
      "Average velocity over any interval: chord slope = (s₂ − s₁)/(t₂ − t₁).",
    ],
    applies: [
      "Analysing uniform and non-uniform straight-line motion in kinematics problems.",
      "Reading journeys: rest stops (flat), outward and return legs (rising/falling).",
      "CEB/NEB numericals asking 'when was the body fastest / at rest / reversing?'",
    ],
    happens: [
      "Drag along the axis: on a straight line the slope never changes — velocity is constant.",
      "On a bending-upward curve the slope keeps growing — the body speeds up continuously.",
      "At the top of a dome-shaped curve the slope passes through zero — that instant is the turning point (velocity momentarily zero).",
      "A flat stretch means however long time runs, position does not change — the body is at rest.",
    ],
    limits: [
      "Only 1-D motion: the curve says nothing about the actual path shape — a curved s–t graph is still straight-line motion.",
      "No cause shown: the graph cannot tell you what force produced the motion.",
      "Two bodies cannot overlap on one axis cleanly — comparisons get cluttered fast.",
    ],
  },
  "phy-velocity-time": {
    gives: [
      "Acceleration at any instant — the slope of the v–t curve.",
      "Displacement over any interval — the area trapped between curve and t-axis.",
      "Stopping time and maximum speed directly from intercepts.",
      "Direction reversal: the instant the curve crosses the t-axis.",
    ],
    applies: [
      "The master graph for all uniform-acceleration problems (the three equations of motion come straight from it).",
      "Braking-distance and reaction-time calculations in road safety.",
      "Free fall and vertical throw problems, where a = −g throughout.",
    ],
    happens: [
      "Drag along a tilted straight line: slope constant → uniform acceleration; area grows quadratically with time.",
      "Cross the t-axis: displacement starts decreasing (area below the axis counts negative).",
      "A curved v–t line means acceleration itself is changing with time.",
      "Two speeds on the same straight line? The steeper one has the larger acceleration, whatever the speeds are.",
    ],
    limits: [
      "Only displacement comes from area — you need the initial position separately.",
      "Area below the t-axis must be subtracted, a step students constantly miss.",
      "Works only for motion along one straight line; turning at an angle breaks it.",
    ],
  },
  "phy-acceleration-time": {
    gives: [
      "Acceleration at every instant read straight off the y-axis.",
      "Change in velocity over any interval — the area under the a–t curve (Δv = ∫a dt).",
      "Whether velocity is increasing (area above axis) or decreasing (area below).",
    ],
    applies: [
      "Variable-force problems where acceleration is not constant (e.g. rocket thrust phases).",
      "Reading launch/braking profiles in engineering and sports biomechanics.",
      "Converting between the three kinematic graphs (s–t, v–t, a–t) — each is the slope/area of the previous.",
    ],
    happens: [
      "Drag across a horizontal line at a ≠ 0: velocity changes at a steady rate forever after.",
      "Cross the t-axis: acceleration reverses sign — the body begins slowing in its direction of travel.",
      "Area accumulates: every slice of width dt adds a·dt to the velocity.",
    ],
    limits: [
      "Gives only Δv — the actual velocity needs the initial velocity added.",
      "Idealised jump discontinuities (a flipping instantly) are unphysical; real transitions take time.",
      "Say nothing about position without going through the v–t graph first.",
    ],
  },
  "phy-projectile-trajectory": {
    gives: [
      "The full parabolic path: height y for every horizontal position x.",
      "Maximum height at the apex — where the tangent is horizontal (vertical velocity zero).",
      "Range from the two ground intercepts; symmetry confirms equal rise and fall times (no air drag).",
      "Velocity direction at any point: the tangent to the path there.",
    ],
    applies: [
      "Ball games, javelin, artillery, water fountains — anything launched at an angle under gravity.",
      "Deriving range R = u²sin2θ/g and max height H = u²sin²θ/2g graphically.",
      "Explaining why 45° gives maximum range (the sin2θ peak).",
    ],
    happens: [
      "Drag from launch: height climbs, but the rise flattens as vertical velocity drains away.",
      "At the apex the tangent is flat — vertical velocity is momentarily zero while horizontal velocity is unchanged.",
      "Past the apex the same curve is traced downward: descent mirrors ascent exactly (no air resistance).",
      "Changing the launch angle in your head: same speed, different angle → different parabola, same 'envelope' limit.",
    ],
    limits: [
      "Air resistance ignored — real long-range projectiles fall short and asymmetric.",
      "g taken constant and ground taken flat — breaks for very high or intercontinental shots.",
      "Earth's rotation and curvature neglected.",
    ],
  },
  "phy-shm-graphs": {
    gives: [
      "Displacement, velocity and acceleration as sinusoids of the same period — and their phase relations.",
      "Velocity leads displacement by π/2; acceleration is exactly antiphase with displacement (a = −ω²y).",
      "Amplitude and period read directly: peak value = amplitude, one full cycle = period T = 2π/ω.",
    ],
    applies: [
      "Simple pendulums, mass–spring systems, tuning forks, atoms in a lattice.",
      "Comparing SHM with circular motion (projection of uniform circular motion).",
      "AC circuit analogies: charge, current and voltage in LC oscillations mirror these curves.",
    ],
    happens: [
      "Drag time: the y-point oscillates between +A and −A; energy sloshes between kinetic (zero at extremes) and potential (max at extremes).",
      "At maximum displacement velocity is zero and acceleration is at its peak — the body is momentarily at rest at the turning points.",
      "Passing through equilibrium: velocity peaks, acceleration (and force) is zero.",
      "Half a period later the displacement repeats inverted — the pattern is perfectly periodic.",
    ],
    limits: [
      "Strict SHM needs small amplitudes (pendulum sinθ ≈ θ); large swings drift from sinusoids.",
      "No damping or driving shown — real oscillators decay unless energy is supplied.",
      "One-dimensional projection only; 2-D oscillations (Lissajous patterns) don't fit.",
    ],
  },
  "phy-isothermal-adiabatic": {
    gives: [
      "Pressure–volume curves for ideal gas processes: pV = constant (isotherm), pV^γ = constant (adiabat).",
      "Work done in expansion/compression: the area under the curve down to the V-axis.",
      "The visual rule that the adiabat is always steeper than the isotherm through the same state.",
    ],
    applies: [
      "Heat-engine and refrigerator cycles (Carnot, Otto, Diesel analysis).",
      "Comparing work output of slow (isothermal) vs fast (adiabatic) expansion.",
      "Explaining why rapid pumping warms a bicycle pump (adiabatic compression).",
    ],
    happens: [
      "Drag along the isotherm: pressure falls hyperbolically as volume grows; temperature stays pinned.",
      "Drag along the adiabat: pressure falls faster — the gas pays for expansion from its own internal energy.",
      "Same volume change: the isotherm encloses more area → more work extracted at constant temperature.",
      "Compressing back up either curve lands on a hotter state only for the adiabat.",
    ],
    limits: [
      "Ideal-gas behaviour only — real gases near liquefaction deviate badly.",
      "Quasistatic (infinitely slow) processes assumed; real engines cut corners.",
      "Reversibility assumed — friction and turbulence would wreck the exact curves.",
    ],
  },
  "phy-isobaric-isochoric": {
    gives: [
      "Constant-pressure line (horizontal): work = p·ΔV is the rectangle under it.",
      "Constant-volume line (vertical): zero work by construction — no area is trapped.",
      "Charles' and Gay-Lussac's layouts: V–T and p–T straight lines through the origin (in kelvin).",
    ],
    applies: [
      "Gas-law laboratory verification (straight-line extrapolation to −273°C).",
      "Splitting any cyclic engine process into isobaric/isochoric/isothermal pieces to total the work.",
      "Pressure-cooker and syringe reasoning at constant pressure or volume.",
    ],
    happens: [
      "Drag along the isobar: volume grows linearly with temperature (V ∝ T) and work accumulates as a rectangle.",
      "Drag along the isochore: pressure changes but the piston never moves — the area (work) stays exactly zero.",
      "Heat added at constant volume goes entirely into raising internal energy; at constant pressure some leaks out as work.",
    ],
    limits: [
      "Ideal gas only; kelvin scale mandatory for the straight-line-through-origin claim.",
      "Real pistons have friction; perfect constant pressure needs a frictionless movable piston.",
    ],
  },
  "phy-newton-cooling-graph": {
    gives: [
      "Excess temperature (θ − θ₀) decaying exponentially with time: the cooling curve.",
      "The cooling rate at any moment is proportional to the excess then — slope ∝ (θ − θ₀).",
      "Time to cool halfway, and verification that equal temperature drops take equal-ish times early on.",
    ],
    applies: [
      "Calorimetry corrections: extrapolating final temperatures in mixing experiments.",
      "Forensics-style reasoning about how long ago a body cooled to a given temperature.",
      "Design of cooling systems, hot-drink thermodynamics, industrial heat treatment.",
    ],
    happens: [
      "Drag early: the curve plunges steeply — big excess, fast heat loss.",
      "Drag later: the curve flattens toward room temperature, never quite touching it.",
      "Halve the excess → halve the cooling rate, at every point (the graph's own definition).",
    ],
    limits: [
      "Valid for small excess temperatures with mainly convection; radiation breaks the linearity.",
      "Assumes uniform body temperature inside (lumped model) — big objects have gradients.",
      "Ambient temperature must stay constant throughout.",
    ],
  },
  "phy-g-variation": {
    gives: [
      "g versus distance from Earth's centre: rises linearly inside, falls as 1/r² outside.",
      "The surface maximum — the two branches meet exactly at R (Earth's radius).",
      "g = 0 at the centre: the two branches make the whole story obvious.",
    ],
    applies: [
      "Satellite and orbital mechanics corrections at altitude (g at height h).",
      "Mine-shaft and deep-tunnel problems (g at depth d).",
      "Explaining why gravity would be weightless at Earth's centre.",
    ],
    happens: [
      "Drag upward from the surface: g drops with the square of distance — halve r from the centre? No: double altitude → quarter of surface g.",
      "Drag downward: inside a uniform Earth g falls linearly, reaching zero at the centre.",
      "The peak at the surface is the graph's signature feature — both branches agree there.",
    ],
    limits: [
      "Assumes uniform Earth density — real Earth's core is denser, so the inner branch isn't exactly linear.",
      "Ignores Earth's rotation and oblateness (equatorial vs polar g difference).",
    ],
  },
  "phy-thermal-expansion-graph": {
    gives: [
      "Length vs temperature as a straight line: L = L₀(1 + αT).",
      "The expansion coefficient α straight from the slope (steeper line = more expansive material).",
      "The L₀ intercept — the original length extrapolated back to 0°C.",
    ],
    applies: [
      "Railway gaps, bridge expansion joints, bimetallic thermostat strips.",
      "Comparing materials: aluminium's line is steeper than steel's — why bimetals bend.",
      "Precision-instrument design where expansion must be minimised (invar).",
    ],
    happens: [
      "Drag along the line: every degree adds the same tiny fraction of length — heating is perfectly predictable.",
      "Compare two materials: the steeper line wins the bimetal bending contest.",
      "Back-extrapolate toward 0°C: the intercept gives the reference length used in all α problems.",
    ],
    limits: [
      "Linear only over moderate ranges — near phase changes the graph bends.",
      "α itself varies slowly with temperature; the graph pretends it's constant.",
      "Isotropic solids only — crystals expand differently along different axes.",
    ],
  },
};
