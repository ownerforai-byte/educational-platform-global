// update_circular_motion_mindmap.js
// Updates the circular-motion unit-level mindmap with real physics content.
const fs = require('fs');
const path = require('path');

const fp = path.join(__dirname, 'content/ravikishan/class-11-notes/physics/circular-motion/mindmap/mindmap.json');
const obj = JSON.parse(fs.readFileSync(fp, 'utf8'));

obj.title = "Circular Motion Mindmap";
obj.topicTitle = "circular motion — interactive concept map";
obj.notes = [
  "Circular motion: motion of a body along a circular path. Key quantities: angular displacement (θ), angular velocity (ω), angular acceleration (α), centripetal acceleration (a_c = v²/r = rω²).",
  "Angular displacement: θ = s/r (radians); 2π rad = 360° = 1 revolution; vector along axis (right-hand rule).",
  "Angular velocity: ω = dθ/dt; uniform circular motion has constant ω; unit: rad/s; rpm conversion: × 2π/60.",
  "Angular acceleration: α = dω/dt; constant α gives kinematic equations mirroring linear motion.",
  "Centripetal acceleration: a_c = v²/r = rω² — always directed toward the center; changes direction of velocity, not speed.",
  "Centripetal force: F_c = mv²/r — not a new force; provided by tension, gravity, friction, or normal force.",
  "Conical pendulum: bob moves in horizontal circle; string traces cone; period T = 2π√(L cos θ/g), independent of mass.",
  "Vertical circle: speed varies with height; minimum top speed (string) = √(gr); minimum bottom speed = √(5gr).",
  "Banking of roads: tan θ = v²/(rg) for ideal angle; reduces friction requirement; railway superelevation h = w tan θ.",
  "NEB exam focus: converting rpm to rad/s; centripetal force identification; conical pendulum derivation; vertical circle min speeds; banking angle calculations."
];

obj.mindmap = {
  centralConcept: "Circular Motion",
  branches: [
    {
      topic: "Angular Quantities",
      subtopics: [
        { name: "Angular Displacement (θ)", points: ["θ = s/r (radians)", "2π rad = 360° = 1 rev", "Vector along rotation axis (RHR)", "θ > 2π possible (not like plain angle)"] },
        { name: "Angular Velocity (ω)", points: ["ω = dθ/dt (instantaneous)", "ω = 2π/T = 2πf (uniform motion)", "Unit: rad/s; rpm × 2π/60", "Vector along axis (right-hand rule)"] },
        { name: "Angular Acceleration (α)", points: ["α = dω/dt = d²θ/dt²", "Unit: rad/s²", "Constant α → kinematic equations", "Same form as linear: v→ω, a→α, x→θ"] }
      ]
    },
    {
      topic: "Linear-Angular Links",
      subtopics: [
        { name: "Position", points: ["s = rθ (arc length)"] },
        { name: "Speed/Velocity", points: ["v = rω (tangential speed)"] },
        { name: "Acceleration", points: ["a_t = rα (tangential)", "a_c = v²/r = rω² (centripetal)", "a_total = √(a_t² + a_c²)"] }
      ]
    },
    {
      topic: "Centripetal Force",
      subtopics: [
        { name: "Formula", points: ["F_c = mv²/r = mrω²", "a_c = v²/r = rω²"] },
        { name: "Real Force Sources", points: ["String → Tension", "Planet orbit → Gravity", "Car on road → Friction", "Banked road → Normal force component"] },
        { name: "Key Ideas", points: ["NOT a new force — it is a ROLE", "Always points toward center", "Changes direction of v, not speed", "Centrifugal force is a pseudo-force"] }
      ]
    },
    {
      topic: "Conical Pendulum",
      subtopics: [
        { name: "Geometry", points: ["String length L, angle θ", "Radius r = L sin θ", "Height h = L cos θ"] },
        { name: "Force Equations", points: ["T cos θ = mg (vertical)", "T sin θ = mω²r (horizontal)", "Result: cos θ = g/(ω²L)"] },
        { name: "Key Results", points: ["ω = √(g/L cos θ)", "T_period = 2π√(L cos θ/g)", "Independent of mass m", "Tension T = mg/cos θ > mg"] }
      ]
    },
    {
      topic: "Vertical Circle",
      subtopics: [
        { name: "String Case", points: ["v_top(min) = √(gr)", "v_bottom(min) = √(5gr)", "T_bottom = mg + mv²/r", "T_top = mv²/r − mg"] },
        { name: "Rod Case", points: ["v_top(min) = 0 (rod can push)", "v_bottom(min) = √(2gr)", "Lower minimum than string"] },
        { name: "Energy", points: ["½mv_b² = ½mv_t² + mg(2r)", "Speed varies with height", "Total mechanical energy conserved"] }
      ]
    },
    {
      topic: "Banking of Roads",
      subtopics: [
        { name: "Ideal Banking (no friction)", points: ["tan θ = v²/(rg)", "Independent of vehicle mass", "Design speed: v = √(rg tan θ)"] },
        { name: "With Friction", points: ["v_max = √[rg(tan θ + μ)/(1 − μ tan θ)]", "Friction up slope if v < design speed", "Friction down slope if v > design speed"] },
        { name: "Railway", points: ["Superelevation: h = w tan θ", "w = track gauge (1.5 m standard)", "Prevents rail wear and derailment"] }
      ]
    },
    {
      topic: "NEB Exam Focus",
      subtopics: [
        { name: "Conversions", points: ["rpm → rad/s: × 2π/60", "rad → revolutions: ÷ 2π", "degrees → rad: × π/180"] },
        { name: "Derivations", points: ["Conical pendulum: cos θ = g/(ω²L)", "Vertical circle: v_bottom = √(5gr)", "Banking: tan θ = v²/(rg)"] },
        { name: "Numerical Problems", points: ["Centripetal force calculations", "Maximum speed (string breaking, car skidding)", "Conical pendulum period/tension", "Banking angle and superelevation"] }
      ]
    }
  ]
};

fs.writeFileSync(fp, JSON.stringify(obj, null, 2), 'utf8');
console.log('DONE: circular-motion/mindmap/mindmap.json');
console.log('  notes:', obj.notes.length, 'branches:', obj.mindmap.branches.length);
