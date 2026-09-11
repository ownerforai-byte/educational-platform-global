// extend_05_banking_applications.js
// Adds simulation, mindmap, and extra notes to 05-banking-applications.json
const fs = require('fs');
const path = require('path');

const fp = path.join(__dirname, 'content/ravikishan/class-11-notes/physics/circular-motion/concepts/05-banking-applications.json');
const obj = JSON.parse(fs.readFileSync(fp, 'utf8'));

obj.notes = obj.notes.concat([
  "**Force resolution on a banked road — detailed derivation:** draw the FBD with N perpendicular to the road and mg vertically down. Resolve N into: vertical component N cos θ (balances weight) and horizontal component N sin θ (provides centripetal force). From N cos θ = mg: N = mg/cos θ. From N sin θ = mv²/r: (mg/cos θ) sin θ = mv²/r → mg tan θ = mv²/r → tan θ = v²/(rg). This derivation is the standard NEB proof.",
  "**Friction on a banked road — general case:** when friction is present, there are two limiting cases. Case 1 (going too fast): friction acts DOWN the slope, adding to the centripetal force. Case 2 (going too slow): friction acts UP the slope, preventing inward sliding. The general equation combining both: N sin θ ± f cos θ = mv²/r (horizontal) and N cos θ ∓ f sin θ = mg (vertical), where f = μN.",
  "**Worked example — finding banking angle:** a curve of radius 150 m is designed for 90 km/h (25 m/s). Required banking angle: tan θ = v²/(rg) = 625/(150 × 9.8) = 0.425 → θ = 23.0°. At this angle, a car can negotiate the curve without any friction.",
  "**Worked example — height of outer rail:** a railway track of gauge 1.5 m is banked at 5°. The height by which the outer rail is raised: h = w tan θ = 1.5 × tan 5° = 1.5 × 0.0875 = 0.131 m ≈ 13.1 cm. This is a typical NEB numerical problem.",
  "**Why banking reduces tire wear:** on a flat road, friction must provide all centripetal force, causing lateral tire stress. On a banked road at the design speed, the normal force provides the centripetal component — no lateral friction needed. This dramatically reduces tire wear and fuel consumption."
]);

obj.simulation = {
  title: "Banked Road Simulator",
  description: "Visualize a car on a banked curved road. See how the normal force resolves into vertical and horizontal components. Adjust speed, radius, banking angle, and friction coefficient. Observe when the car slips outward (too fast) or inward (too slow). Compare flat vs. banked road requirements.",
  parameters: [
    { name: "v", label: "Speed (m/s)", default: 20, min: 1, max: 50 },
    { name: "r", label: "Curve radius (m)", default: 100, min: 10, max: 500 },
    { name: "θ", label: "Banking angle (degrees)", default: 15, min: 0, max: 60 },
    { name: "μ", label: "Coefficient of friction", default: 0.3, min: 0, max: 1.0 },
    { name: "m", label: "Vehicle mass (kg)", default: 1000, min: 100, max: 5000 }
  ],
  outputs: [
    "Design speed (no friction): v = √(rg tan θ)",
    "Maximum speed with friction: v_max = √[rg(tan θ + μ)/(1 − μ tan θ)]",
    "Minimum speed with friction: v_min = √[rg(tan θ − μ)/(1 + μ tan θ)]",
    "Normal force: N = mg/cos θ (at design speed)",
    "Friction requirement: f = m(v²/r − g tan θ) / cos θ",
    "Flat road comparison: μ_required = v²/(rg)"
  ],
  visualElements: [
    "3D cross-section of banked road with car",
    "Force diagram: N (perpendicular to road), mg (down), f (along road surface)",
    "Component arrows: N sin θ (horizontal, inward), N cos θ (vertical, up)",
    "Speed indicator showing current vs. design speed",
    "Slip warning: red highlight if v > v_max or v < v_min",
    "Bar chart: friction required on flat vs. banked road"
  ]
};

obj.mindmap = {
  centralConcept: "Banking of Roads",
  branches: [
    {
      topic: "Why Banking?",
      subtopics: [
        { name: "Problem on Flat Road", points: ["All centripetal force from friction", "F_c = μmg limits max speed", "High friction → tire wear", "Risk of skidding on wet roads"] },
        { name: "Solution — Banking", points: ["Tilt road at angle θ", "Normal force has horizontal component", "Reduces friction dependence", "Increases safe speed limit"] }
      ]
    },
    {
      topic: "Ideal Banking (No Friction)",
      subtopics: [
        { name: "Force Resolution", points: ["N cos θ = mg (vertical balance)", "N sin θ = mv²/r (centripetal)", "Divide: tan θ = v²/(rg)"] },
        { name: "Design Speed", points: ["v = √(rg tan θ)", "Independent of vehicle mass", "Only depends on r and θ", "The 'sweet spot' speed"] },
        { name: "Key Insight", points: ["At design speed: f = 0", "Normal force alone provides F_c", "No tire wear from lateral friction", "Most efficient turning"] }
      ]
    },
    {
      topic: "With Friction",
      subtopics: [
        { name: "Going Too Fast (v > v_design)", points: ["Friction acts DOWN the slope", "Prevents outward skidding", "v_max = √[rg(tan θ + μ)/(1 − μ tan θ)]", "Denominator: 1 − μ tan θ must be > 0"] },
        { name: "Going Too Slow (v < v_design)", points: ["Friction acts UP the slope", "Prevents inward sliding", "v_min = √[rg(tan θ − μ)/(1 + μ tan θ)]", "Only matters if tan θ > μ"] },
        { name: "General Formulae", points: ["N sin θ + f cos θ = mv²/r", "N cos θ − f sin θ = mg", "f ≤ μN", "Combine to get v_max and v_min"] }
      ]
    },
    {
      topic: "Railway Banking",
      subtopics: [
        { name: "Superelevation", points: ["h = w tan θ", "w = track gauge (1.5 m standard)", "h = height difference between rails", "Prevents rail wear and derailment"] },
        { name: "Design", points: ["Outer rail raised above inner rail", "Same physics as road banking", "Calculations identical", "Critical for high-speed trains"] }
      ]
    },
    {
      topic: "NEB Exam Focus",
      subtopics: [
        { name: "Derivations", points: ["Derive tan θ = v²/(rg) from force resolution", "Derive v_max with friction formula", "Show mass independence", "Derive superelevation h = w tan θ"] },
        { name: "Numerical Problems", points: ["Find θ for given v and r", "Find v_max with friction", "Find h for railway curves", "Compare flat vs. banked road"] },
        { name: "Conceptual Questions", points: ["Why bank roads?", "Why is banking independent of mass?", "What happens if v ≠ design speed?", "Advantages of banking over flat roads"] }
      ]
    }
  ]
};

fs.writeFileSync(fp, JSON.stringify(obj, null, 2), 'utf8');
console.log('DONE: 05-banking-applications.json');
console.log('  notes:', obj.notes.length, '(added 5)');
console.log('  simulation:', !!obj.simulation, 'outputs:', obj.simulation?.outputs?.length);
console.log('  mindmap:', !!obj.mindmap, 'branches:', obj.mindmap?.branches?.length);
