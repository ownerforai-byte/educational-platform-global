// rewrite-banking-applications.js
// Replaces the template-placeholder content in 05-banking-applications.json with real physics notes.
const fs = require('fs');
const path = require('path');

const fp = path.join(__dirname, 'content/ravikishan/class-11-notes/physics/circular-motion/concepts/05-banking-applications.json');
const base = {
  title: "Applications of Banking",
  unitSlug: "circular-motion",
  topicSlug: "banking-applications",
  topicTitle: "Applications of Banking",
  relevance: 100,
};

const obj = JSON.parse(fs.readFileSync(fp, 'utf8'));
Object.assign(obj, base);

obj.notes = [
  "**Banking of roads:** the practice of raising the outer edge of a curved road above the inner edge so that the normal reaction from the road surface provides part or all of the centripetal force needed to turn. This reduces reliance on friction and prevents skidding.",
  "**Why banking is needed:** on a flat road, the entire centripetal force must come from friction: F_c = μmg. At high speeds or on slippery roads, friction may be insufficient and the vehicle skids outward. Banking tilts the road so the normal force has a horizontal component pointing toward the center.",
  "**Forces on a banked road:** the road is tilted at angle θ. The normal reaction N acts perpendicular to the road surface. Resolving N: vertical component N cos θ balances weight (N cos θ = mg); horizontal component N sin θ provides centripetal force (N sin θ = mv²/r).",
  "**Key equation — ideal banking angle (no friction needed):** dividing the two equations: tan θ = v²/(rg). For a given radius r and design speed v, the road should be banked at angle θ = arctan(v²/(rg)). At this angle, no friction is required.",
  "**Friction on a banked road:** if the vehicle moves faster than the design speed, friction acts DOWN the slope (preventing outward skid). If slower, friction acts UP the slope (preventing inward sliding). The general formula: tan(θ + φ) = v²/(rg), where φ = arctan(μ).",
  "**Maximum speed on a banked road with friction:** v_max = √[rg(tan θ + μ)/(1 − μ tan θ)]. When μ = 0 (no friction), this reduces to v = √(rg tan θ). When θ = 0 (flat road), it reduces to v = √(μrg).",
  "**Worked example — car on banked curve:** a road of radius 100 m is banked at θ = 15°. Design speed (no friction): v = √(100 × 9.8 × tan 15°) = √(100 × 9.8 × 0.268) = √262.6 = 16.2 m/s (≈ 58 km/h).",
  "**Worked example — with friction:** same road with μ = 0.3. v_max = √[100 × 9.8 × (0.268 + 0.3)/(1 − 0.3 × 0.268)] = √[980 × 0.568 / 0.92] = √605 = 24.6 m/s (≈ 89 km/h).",
  "**Railway banking (superelevation):** railways use the same principle. The outer rail is raised by height h above the inner rail. For track gauge w and banking angle θ: tan θ ≈ h/w. This prevents wear on rails and ensures passenger comfort.",
  "**NEB exam focus:** deriving tan θ = v²/(rg); finding the design speed for a given banking angle; maximum speed with friction; railway superelevation problems."
];

obj.confusion = [
  "❌ 'Banking eliminates friction entirely.' ✅ Banking REDUCES friction requirement. At the design speed (tan θ = v²/(rg)), friction is zero. At other speeds, friction is still needed.",
  "❌ 'A steeper bank angle is always better.' ✅ Too steep a bank angle causes problems at low speeds — the vehicle may slide inward. The ideal angle depends on the design speed.",
  "❌ 'The normal force equals mg on a banked road.' ✅ The normal force is N = mg/cos θ, which is GREATER than mg because the road is tilted.",
  "❌ 'Banking angle depends on the mass of the vehicle.' ✅ The ideal banking angle tan θ = v²/(rg) is independent of mass — it depends only on speed and radius.",
  "❌ 'On a banked road, friction always acts up the slope.' ✅ Friction direction depends on speed: if v > design speed, friction acts DOWN the slope; if v < design speed, friction acts UP.",
  "❌ 'A higher banking angle means a lower maximum speed.' ✅ A HIGHER banking angle INCREASES the maximum speed — more of the normal force contributes to centripetal force."
];

obj.practice = [
  "Derive tan θ = v²/(rg) for a frictionless banked road from force resolution.",
  "Solve 5 problems finding the design speed for given radius and banking angle.",
  "Solve 5 problems finding maximum speed with friction using v_max = √[rg(tan θ + μ)/(1 − μ tan θ)].",
  "Solve 3 railway superelevation problems: find h given w and θ.",
  "Solve 2 problems comparing flat vs banked roads for the same radius and speed."
];

obj.universalFacts = [
  "The ideal banking angle is independent of the vehicle's mass — it depends only on speed and radius.",
  "At the design speed on a banked road, no friction is needed to maintain the turn.",
  "Banking increases the maximum safe speed compared to a flat road.",
  "Railway superelevation uses the same principle: h = w tan θ, where w is the track gauge.",
  "If a road is over-banked for the speed, vehicles tend to slide inward — friction must act up the slope."
];

obj.animation3D = "circular-motion";
obj.motionGraphics = "circular-motion";

obj.examples = [
  "Design speed: A curve of radius 200 m is to be banked for a design speed of 72 km/h (20 m/s). Required angle: tan θ = 400/(200 × 9.8) = 0.204 → θ = 11.5°.",
  "With friction: A 50 m radius curve is banked at 20°. With μ = 0.4, max speed: v_max = √[50 × 9.8 × (0.364 + 0.4)/(1 − 0.4 × 0.364)] = √[490 × 0.764 / 0.854] = √438 = 20.9 m/s.",
  "Railway: Track gauge w = 1.5 m, banking angle θ = 3°. Superelevation h = w tan θ = 1.5 × 0.0524 = 0.0786 m ≈ 7.9 cm.",
  "Flat vs banked: A car rounds a 50 m radius curve at 15 m/s. Flat road needs μ ≥ v²/(rg) = 225/490 = 0.46. Banked at 20° needs μ ≥ (v²/(rg) − tan 20°)/(1 + v²/(rg)tan 20°) = (0.46 − 0.364)/1.046 = 0.092 — much less friction needed.",
  "Over-banked: A road is banked at 30° for 100 km/h. A truck travels at 60 km/h — it will tend to slide inward; friction must act up the slope."
];

obj.practiceQuestions = [
  "A curved road of radius 100 m is banked at 15°. Find the design speed (speed at which no friction is needed).",
  "A road of radius 80 m is banked at 20°. If the coefficient of friction is 0.3, find the maximum safe speed.",
  "A railway track of gauge 1.5 m is to be banked for a train moving at 54 km/h on a curve of radius 500 m. Find the superelevation (height difference between outer and inner rails).",
  "A car of mass 1000 kg rounds a banked curve of radius 50 m at 20 m/s. If the banking angle is 25°, find the friction force acting on the car.",
  "Show that the ideal banking angle is independent of the mass of the vehicle."
];

obj.formulas = [
  "Ideal banking angle (no friction): tan θ = v²/(rg)",
  "Maximum speed with friction: v_max = √[rg(tan θ + μ)/(1 − μ tan θ)]",
  "Minimum speed with friction: v_min = √[rg(tan θ − μ)/(1 + μ tan θ)]",
  "Railway superelevation: h = w tan θ, where w = track gauge",
  "Normal force on banked road: N = mg/cos θ"
];

obj.keyPoints = [
  "The ideal banking angle tan θ = v²/(rg) is independent of vehicle mass.",
  "At design speed, no friction is needed — the horizontal component of normal force provides all centripetal force.",
  "Banking with friction increases the maximum safe speed beyond the design speed.",
  "Railway superelevation h = w tan θ applies the same physics to train tracks.",
  "Over-banking (θ too large for the speed) causes inward sliding; under-banking causes outward skidding."
];

obj.summary = "Banking of roads tilts the road surface so the normal force provides part or all of the centripetal force. The ideal angle (no friction needed) is tan θ = v²/(rg), independent of mass. With friction, the maximum speed is v_max = √[rg(tan θ + μ)/(1 − μ tan θ)]. Railway tracks use superelevation h = w tan θ. Banking prevents skidding and reduces tire wear.";

obj.specialNotes = [
  "The design speed is the speed at which no friction is required — the most important concept.",
  "Always check: if v²/(rg) > tan θ, the vehicle needs additional friction downward (going too fast).",
  "The formula v_max = √[rg(tan θ + μ)/(1 − μ tan θ)] requires μ tan θ < 1 for physical validity.",
  "Railway superelevation problems: h = w tan θ where w is the standard gauge (1.5 m in Nepal).",
  "NEB frequently asks: 'Why are roads banked?' — answer: to reduce friction dependence and prevent skidding."
];

obj.importantStatements = [
  "The ideal banking angle is given by tan θ = v²/(rg), independent of the vehicle's mass.",
  "On a banked road with friction, the maximum safe speed is v_max = √[rg(tan θ + μ)/(1 − μ tan θ)].",
  "At the design speed, the horizontal component of the normal force alone provides the centripetal force.",
  "Railway superelevation h = w tan θ uses the same centripetal force principle.",
  "Banking reduces the reliance on friction, preventing skidding at higher speeds."
];

obj.importantNotes = [
  "The banking angle formula tan θ = v²/(rg) is derived by resolving the normal force into vertical and horizontal components.",
  "When the road is banked, the normal force N = mg/cos θ is greater than the weight mg.",
  "If μ tan θ ≥ 1, the denominator in v_max becomes zero or negative — the formula is invalid (extreme banking).",
  "Railway wheels have flanges that prevent derailment — banking complements this by reducing lateral force.",
  "NEB often combines banking with friction problems — practice both the no-friction and with-friction cases."
];

obj.examShortTricks = [
  "Design speed shortcut: v = √(rg tan θ) — square root of rg times tangent of angle.",
  "Friction-free shortcut: if the problem says 'no friction needed', use tan θ = v²/(rg).",
  "Railway shortcut: h = w tan θ — multiply gauge by tangent of banking angle.",
  "Mass independence: the banking angle does NOT depend on mass — eliminate any option with mass.",
  "Direction check: if v²/(rg) > tan θ, friction acts down the slope (vehicle going too fast)."
];

obj.examNotes = [
  "Deriving tan θ = v²/(rg) is the most common NEB question — know the force resolution steps.",
  "Maximum speed with friction problems are standard numerical questions.",
  "Railway superelevation: know h = w tan θ and that w ≈ 1.5 m for standard gauge.",
  "Conceptual questions: 'Why is a road banked?' — answer with centripetal force and friction reduction.",
  "NEB may ask to compare flat vs banked roads — show the friction requirement is reduced."
];

obj.mcs = [
  {
    question: "The ideal banking angle for a curve of radius r at speed v is given by:",
    options: ["tan θ = v/(rg)", "tan θ = v²/(rg)", "tan θ = rg/v²", "tan θ = v²r/g"],
    answer: "B"
  },
  {
    question: "On a banked road at the design speed, the friction required is:",
    options: ["Maximum", "Zero", "Equal to mg", "Depends on mass"],
    answer: "B"
  },
  {
    question: "A road is banked at 30° for a curve of radius 100 m. The design speed is approximately: (g = 10 m/s²)",
    options: ["10 m/s", "14 m/s", "20 m/s", "28 m/s"],
    answer: "B"
  },
  {
    question: "The railway superelevation h is related to gauge w and banking angle θ by:",
    options: ["h = w sin θ", "h = w cos θ", "h = w tan θ", "h = w cot θ"],
    answer: "C"
  },
  {
    question: "If a car travels faster than the design speed on a banked road, friction acts:",
    options: ["Up the slope", "Down the slope", "Vertically upward", "Perpendicular to the road"],
    answer: "B"
  }
];

obj.importantConcepts = [
  "Ideal banking angle tan θ = v²/(rg) — derived from N sin θ = mv²/r and N cos θ = mg.",
  "At design speed, friction is zero — the normal force alone provides centripetal force.",
  "Maximum speed with friction: v_max = √[rg(tan θ + μ)/(1 − μ tan θ)].",
  "Railway superelevation h = w tan θ applies the same centripetal force principle.",
  "Banking is independent of vehicle mass — the same angle works for cars and trucks."
];

obj.importantTasks = [
  "Derive tan θ = v²/(rg) by resolving the normal force.",
  "Solve 5 problems finding design speed from banking angle and radius.",
  "Solve 5 problems finding maximum speed with friction.",
  "Solve 3 railway superelevation problems (find h or θ).",
  "Compare flat vs banked road friction requirements for the same curve and speed."
];

fs.writeFileSync(fp, JSON.stringify(obj, null, 2), 'utf8');
console.log('DONE 05-banking-applications.json');
console.log('  notes:', obj.notes.length, 'formulas:', obj.formulas.length, 'mcs:', obj.mcs.length);
