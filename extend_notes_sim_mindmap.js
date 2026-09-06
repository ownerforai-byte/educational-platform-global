// extend-notes-sim-mindmap.js
// Extends notes, adds simulation and mindmap fields to 01, 02, 03 circular-motion concepts.
const fs = require('fs');
const path = require('path');

const EXTEND_DATA = {
  '01-angular-displacement-velocity.json': {
    extraNotes: [
      "**Right-hand rule for angular quantities:** curl the fingers of your right hand in the direction of rotation; your thumb points along the angular velocity/acceleration vector. For anticlockwise rotation (as viewed from above), the vector points upward; for clockwise, it points downward.",
      "**Angular displacement is NOT a simple angle:** while measured in radians, angular displacement has direction (along the axis). For rotations greater than 2π, the magnitude keeps increasing — unlike a simple angle which resets after 360°. This is why angular displacement is a true vector quantity.",
      "**Non-uniform circular motion:** when angular acceleration α ≠ 0, both tangential acceleration (a_t = rα) and centripetal acceleration (a_c = rω²) are present. The total acceleration is the vector sum: a = √(a_t² + a_c²). The direction of total acceleration is at angle φ = arctan(a_c/a_t) from the tangential direction.",
      "**Small angle approximation:** for oscillatory motion (pendulums, springs), when θ is small (θ < 0.1 rad ≈ 6°), we can approximate sin θ ≈ θ and cos θ ≈ 1. This linearizes the equations and makes them solvable analytically.",
      "**Angular quantities as vectors — addition is NOT commutative for large angles:** while infinitesimal angular displacements dθ are vectors (they commute), finite angular displacements do NOT commute. Rotating 90° about x then 90° about y gives a different result than rotating 90° about y then 90° about x. This is why angular velocity is a true vector but finite angular displacement is not."
    ],
    simulation: {
      title: "Interactive Angular Motion Simulation",
      description: "Visualize angular displacement, velocity, and acceleration in real time. Controls: set initial angular velocity ω₀, angular acceleration α, and time t. Observe how θ, ω, and the number of revolutions evolve. Toggle between uniform (α = 0) and non-uniform (α ≠ 0) motion to see the difference.",
      parameters: [
        { name: "ω₀", label: "Initial angular velocity (rad/s)", default: 0, min: 0, max: 50 },
        { name: "α", label: "Angular acceleration (rad/s²)", default: 2, min: -20, max: 20 },
        { name: "r", label: "Radius (m)", default: 1, min: 0.1, max: 10 },
        { name: "t", label: "Time (s)", default: 5, min: 0.1, max: 30 }
      ],
      outputs: [
        "θ(t) = ω₀t + ½αt² — angular displacement",
        "ω(t) = ω₀ + αt — angular velocity",
        "N = θ/(2π) — number of revolutions",
        "v = rω — tangential speed",
        "a_t = rα — tangential acceleration",
        "a_c = rω² — centripetal acceleration"
      ],
      visualElements: [
        "Rotating disc with animated angle arc showing θ",
        "Velocity vector arrow rotating with the disc, length ∝ ω",
        "Acceleration components: tangential (along motion) and centripetal (toward center)",
        "Graph panel: θ vs t, ω vs t, α vs t (real-time updating)"
      ]
    },
    mindmap: {
      centralConcept: "Angular Displacement, Velocity & Acceleration",
      branches: [
        { topic: "Angular Displacement (θ)", details: ["Measured in radians: 2π rad = 360° = 1 rev", "Vector quantity — direction along axis (RHR)", "θ > 2π allowed (unlike plain angle)", "θ = s/r where s is arc length, r is radius"] },
        { topic: "Angular Velocity (ω)", details: ["ω = dθ/dt (instantaneous), ω = Δθ/Δt (average)", "Unit: rad/s; also rpm (revolutions per minute)", "Vector along axis via right-hand rule", "Uniform circular motion: ω = constant"] },
        { topic: "Angular Acceleration (α)", details: ["α = dω/dt = d²θ/dt²", "Unit: rad/s²", "Positive α: speeding up (if ω > 0)", "Negative α: slowing down (if ω > 0)"] },
        { topic: "Linear-Angular Links", details: ["v = rω (linear speed)", "a_t = rα (tangential acceleration)", "a_c = v²/r = rω² (centripetal acceleration)", "s = rθ (arc length)"] },
        { topic: "Kinematic Equations", details: ["ω = ω₀ + αt", "θ = ω₀t + ½αt²", "ω² = ω₀² + 2αθ", "θ = (ω + ω₀)t/2"] },
        { topic: "Conversions", details: ["rpm → rad/s: multiply by 2π/60", "rad/s → rpm: multiply by 60/2π", "Degrees → rad: multiply by π/180", "Revolutions → rad: multiply by 2π"] }
      ]
    }
  },
  '02-centripetal-acceleration-force.json': {
    extraNotes: [
      "**Centripetal force is not a force — it is a role:** the term 'centripetal force' describes the NET force pointing toward the center. It is always provided by some real force or combination of forces: tension (string), gravity (planets), friction (car on road), normal force (banked road), magnetic force (charged particle). Always draw an FBD and identify WHICH real force plays this role.",
      "**Centrifugal force in rotating frames:** in a reference frame attached to the rotating body (e.g., a car turning), passengers feel pushed outward. This is called centrifugal force. It is a pseudo-force — it arises from the inertia of the body wanting to move in a straight line. In an inertial (non-accelerating) frame, there is NO outward force — only the inward centripetal force.",
      "**Derivation via vector diagram:** consider a particle moving at constant speed v around a circle of radius r. After a small time Δt, it moves through angle Δθ = vΔt/r. The velocity vectors change direction by Δθ. From the similar triangles formed by position vectors and velocity vectors: |Δv|/v = |Δr|/r = Δs/r = vΔt/r. Therefore a = |Δv|/Δt = v²/r.",
      "**Worked example — satellite orbit:** a satellite orbits Earth at altitude 400 km (r = 6771 km) with speed 7.67 km/s. Centripetal acceleration: a_c = v²/r = (7670)²/6771000 = 8.69 m/s². This equals the local gravitational acceleration at that altitude, confirming that gravity provides the centripetal force.",
      "**Common NEB trap — direction of acceleration:** students often confuse the direction of centripetal acceleration (toward center) with the direction of velocity (tangential). Remember: a_c changes the DIRECTION of v, not its magnitude. If speed is changing too, there is also a tangential component a_t."
    ],
    simulation: {
      title: "Centripetal Force Visualizer",
      description: "Animate a particle moving in a circle. Visualize velocity (tangential), centripetal acceleration (inward), and the net centripetal force. Vary radius, speed, and mass to see how F_c = mv²/r changes. Toggle between string, gravity, and friction scenarios to see how different real forces provide the centripetal force.",
      parameters: [
        { name: "m", label: "Mass (kg)", default: 1, min: 0.1, max: 10 },
        { name: "v", label: "Speed (m/s)", default: 5, min: 0.5, max: 50 },
        { name: "r", label: "Radius (m)", default: 2, min: 0.5, max: 20 }
      ],
      outputs: [
        "F_c = mv²/r — centripetal force magnitude",
        "a_c = v²/r — centripetal acceleration",
        "T (tension) or f (friction) or F_g (gravity) — identifying the real force",
        "Period T = 2πr/v — time for one revolution"
      ],
      visualElements: [
        "Particle orbiting in circle with velocity arrow (tangential, blue)",
        "Acceleration arrow pointing to center (red)",
        "Force arrow pointing to center (green), labeled with source (Tension/Gravity/Friction)",
        "Real-time graph: F_c vs v, F_c vs r, F_c vs m",
        "Scenario selector: string, planet orbit, car on flat curve, banked curve"
      ]
    },
    mindmap: {
      centralConcept: "Centripetal Acceleration & Force",
      branches: [
        { topic: "Centripetal Acceleration (a_c)", details: ["a_c = v²/r = rω²", "Always directed toward center", "Changes direction of v, not magnitude", "Present in ALL circular motion"] },
        { topic: "Centripetal Force (F_c)", details: ["F_c = mv²/r = mrω²", "NOT a new force — it is a ROLE", "Provided by: tension, gravity, friction, normal", "Always points toward center"] },
        { topic: "Real Force Sources", details: ["String: tension provides F_c", "Planet: gravity provides F_c", "Car on road: friction provides F_c", "Banked road: normal force component provides F_c"] },
        { topic: "Max Speed Problems", details: ["String breaking: v_max = √(T_max·r/m)", "Car skidding: v_max = √(μ_s·r·g)", "Set F_c equal to maximum available force"] },
        { topic: "Common Misconceptions", details: ["Centrifugal force is a pseudo-force", "Centripetal force is not added to FBD", "If F_c removed → body moves tangent", "a_c ≠ 0 even at constant speed"] },
        { topic: "Applications", details: ["Satellite orbits (gravity = F_c)", "Car on curved road (friction = F_c)", "Banked curves (normal = F_c)", "Amusement park rides (normal = F_c)"] }
      ]
    }
  },
  '03-conical-pendulum.json': {
    extraNotes: [
      "**Deriving the key result step by step:** from vertical equilibrium: T cos θ = mg → T = mg/cos θ. From horizontal force: T sin θ = mω²r = mω²L sin θ. Canceling sin θ (assuming θ ≠ 0): T = mω²L. Equating: mω²L = mg/cos θ → ω² = g/(L cos θ) → ω = √(g/L cos θ). This derivation is the standard NEB proof question.",
      "**Period formula insight:** T_period = 2π/ω = 2π√(L cos θ/g). Note that L cos θ is the VERTICAL HEIGHT h of the cone. So T = 2π√(h/g) — the period depends only on the vertical height, not on the radius or the mass. A cone with height 1 m has the same period regardless of how wide it is.",
      "**Relation to simple pendulum:** a simple pendulum of length L has period T = 2π√(L/g). A conical pendulum of string length L has period T = 2π√(L cos θ/g) = 2π√(h/g). Since cos θ < 1, the conical pendulum's period is LONGER than a simple pendulum of the same string length — it swings more slowly.",
      "**Connection to banking of roads:** the conical pendulum and a banked road share identical force geometry. In the pendulum, tension provides both vertical support and centripetal force. In a banked road, the normal force plays the same dual role. The equation tan θ = v²/(rg) for banking is equivalent to the conical pendulum's geometry.",
      "**Watt's governor:** the conical pendulum is the basis of the centrifugal governor used in steam engines. As the engine speeds up, the bobs rise (θ increases), which mechanically reduces the steam supply. This is a real-world application that NEB sometimes references."
    ],
    simulation: {
      title: "Conical Pendulum Simulator",
      description: "Visualize a conical pendulum rotating in 3D. Adjust string length, angular speed, and bob mass. Watch the cone angle θ change in real time. Toggle mass to see that the period is independent of mass. Compare with a simple pendulum side by side.",
      parameters: [
        { name: "L", label: "String length (m)", default: 2, min: 0.5, max: 10 },
        { name: "ω", label: "Angular speed (rad/s)", default: 3, min: 0.5, max: 20 },
        { name: "m", label: "Bob mass (kg)", default: 0.5, min: 0.1, max: 5 },
        { name: "g", label: "Gravity (m/s²)", default: 9.8, min: 1, max: 20 }
      ],
      outputs: [
        "θ = arccos(g/(ω²L)) — cone angle",
        "T_period = 2π√(L cos θ/g) — period",
        "Tension = mω²L — string tension",
        "r = L sin θ — radius of circle",
        "Compare: T_simple = 2π√(L/g) vs T_conical = 2π√(L cos θ/g)"
      ],
      visualElements: [
        "3D rotating bob with string tracing a cone",
        "Force vectors: Tension (along string), Weight (down), resultant (horizontal inward)",
        "Angle θ indicator between string and vertical",
        "Period comparison bar: conical vs simple pendulum",
        "Mass independence demonstration: two bobs of different mass, same θ and period"
      ]
    },
    mindmap: {
      centralConcept: "Conical Pendulum",
      branches: [
        { topic: "Geometry", details: ["String length: L", "Cone angle: θ (from vertical)", "Circle radius: r = L sin θ", "Vertical height: h = L cos θ"] },
        { topic: "Force Analysis", details: ["Vertical: T cos θ = mg (equilibrium)", "Horizontal: T sin θ = mω²r (centripetal)", "Combine: T = mω²L", "Result: cos θ = g/(ω²L)"] },
        { topic: "Key Results", details: ["ω = √(g/L cos θ)", "T_period = 2π√(L cos θ/g)", "T = mg/cos θ (tension > mg)", "Independent of mass m"] },
        { topic: "Comparison", details: ["Simple pendulum: T = 2π√(L/g)", "Conical pendulum: T = 2π√(L cos θ/g)", "Since cos θ < 1, conical period > simple period", "Same vertical height h: T = 2π√(h/g) for both"] },
        { topic: "Applications", details: ["Watt's governor (steam engine speed control)", "Banked road geometry (same force resolution)", "Rotating space stations (artificial gravity)", "Centrifugal separators"] },
        { topic: "NEB Focus", details: ["Derive cos θ = g/(ω²L)", "Show period is independent of mass", "Find T, ω, r, θ from given data", "Compare with simple pendulum period"] }
      ]
    }
  }
};

function processFile(filename, data) {
  const fp = path.join(__dirname, 'content/ravikishan/class-11-notes/physics/circular-motion/concepts', filename);
  let obj;
  try {
    obj = JSON.parse(fs.readFileSync(fp, 'utf8'));
  } catch (e) {
    console.error(`FAILED to parse ${filename}: ${e.message}`);
    return;
  }

  // Extend notes
  if (data.extraNotes) {
    obj.notes = [...obj.notes, ...data.extraNotes];
    console.log(`  notes: ${obj.notes.length} (added ${data.extraNotes.length})`);
  }

  // Add simulation field
  if (data.simulation) {
    obj.simulation = data.simulation;
    console.log(`  simulation: added (${data.simulation.outputs.length} outputs)`);
  }

  // Add mindmap field
  if (data.mindmap) {
    obj.mindmap = data.mindmap;
    console.log(`  mindmap: added (${data.mindmap.branches.length} branches)`);
  }

  fs.writeFileSync(fp, JSON.stringify(obj, null, 2), 'utf8');
  console.log(`DONE: ${filename}`);
}

for (const [filename, data] of Object.entries(EXTEND_DATA)) {
  processFile(filename, data);
}

console.log('\nAll 3 files updated successfully.');
