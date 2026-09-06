// rewrite-vertical-circle.js
// Replaces the template-placeholder content in 04-vertical-circle.json with real physics notes.
const fs = require('fs');
const path = require('path');

const fp = path.join(__dirname, 'content/ravikishan/class-11-notes/physics/circular-motion/concepts/04-vertical-circle.json');
const base = {
  title: "Motion in a Vertical Circle",
  unitSlug: "circular-motion",
  topicSlug: "vertical-circle",
  topicTitle: "Motion in a Vertical Circle",
  relevance: 100,
};

const obj = JSON.parse(fs.readFileSync(fp, 'utf8'));
Object.assign(obj, base);

obj.notes = [
  "**Motion in a vertical circle:** a body of mass m attached to a string moves in a vertical plane under gravity. Unlike horizontal circular motion, the speed varies with height — fastest at the bottom, slowest at the top.",
  "**Why speed varies:** gravity does work on the body as it moves vertically. Kinetic energy is converted to gravitational PE on the way up, and back to KE on the way down. Total mechanical energy is conserved (ignoring air resistance).",
  "**Critical distinction — string vs rigid rod:** a string can only pull (tension ≥ 0), so the body must have enough speed at the top to keep the string taut. A rigid rod can push or pull, so the body can reach the top with zero speed.",
  "**Minimum speed at the top (string):** at the top, both tension T and weight mg point downward: T + mg = mv²/r. The minimum speed occurs when T → 0: mg = mv_min²/r → v_top(min) = √(gr). Below this, the string goes slack.",
  "**Minimum speed at the bottom (string):** using energy conservation from bottom to top: ½mv_bottom² = ½mv_top² + mg(2r). With v_top = √(gr): ½v_bottom² = ½(gr) + 2gr → v_bottom² = 5gr → v_bottom(min) = √(5gr). This is the critical NEB result.",
  "**Minimum speed at the bottom (rod):** since the rod can push, the body can reach the top with v_top = 0. Energy conservation: ½v_bottom² = 0 + 2gr → v_bottom(min) = √(2gr). This is lower than the string case.",
  "**Tension at the bottom:** T_bottom − mg = mv_bottom²/r → T_bottom = mg + mv_bottom²/r. For the minimum case (string): T_bottom = mg + 5mg = 6mg. The tension at the bottom is 6 times the weight.",
  "**Tension at the top:** T_top + mg = mv_top²/r → T_top = mv_top²/r − mg. For the minimum case (string): T_top = 0.",
  "**Worked example:** a 0.5 kg bob on a 1.5 m string. v_top(min) = √(9.8 × 1.5) = 3.83 m/s. v_bottom(min) = √(5 × 9.8 × 1.5) = 8.57 m/s. T_bottom = 6 × 0.5 × 9.8 = 29.4 N.",
  "**NEB exam focus:** deriving v_top(min) = √(gr) and v_bottom(min) = √(5gr); comparing string vs rod; finding tension at top and bottom; energy conservation between positions."
];

obj.confusion = [
  "❌ 'The speed is constant in vertical circular motion.' ✅ The speed VARIES — gravity speeds up the body on the way down and slows it on the way up. Only energy is conserved.",
  "❌ 'The minimum speed at the top is zero.' ✅ For a STRING, the minimum speed at the top is √(gr). For a ROD, it is indeed zero.",
  "❌ 'The tension is the same at all points.' ✅ The tension varies — maximum at the bottom (T = mg + mv²/r) and minimum at the top (T = mv²/r − mg).",
  "❌ 'The minimum speed at the bottom is √(2gr).' ✅ That is for a ROD. For a STRING, it is √(5gr) — the body must have enough energy to reach the top with speed √(gr).",
  "❌ 'If the string goes slack, the body stops.' ✅ If the string goes slack, the body becomes a projectile — it follows a parabolic path under gravity.",
  "❌ 'The centripetal force is constant.' ✅ The centripetal force (mv²/r) varies because v varies. At the bottom, it is maximum; at the top, it is minimum."
];

obj.practice = [
  "Derive v_top(min) = √(gr) and v_bottom(min) = √(5gr) for a string using energy conservation.",
  "Solve 5 problems finding the minimum speed at the top and bottom for both string and rod cases.",
  "Solve 5 problems finding the tension at the top and bottom of the circle.",
  "Solve 3 problems comparing the string and rod cases (different minimum speeds).",
  "Solve 2 problems where the string goes slack and the body becomes a projectile."
];

obj.universalFacts = [
  "The minimum speed at the top of a vertical circle (string) is √(gr) — independent of mass.",
  "The minimum speed at the bottom (string) is √(5gr) — the factor 5 is a key NEB result.",
  "A rigid rod allows the body to complete the circle with v_top = 0 — minimum bottom speed is √(2gr).",
  "The tension at the bottom (minimum case) is 6mg — six times the weight.",
  "Energy conservation is the key tool — the speed varies with height, but total mechanical energy is constant."
];

obj.animation3D = "circular-motion";
obj.motionGraphics = "circular-motion";

obj.examples = [
  "String case: A 0.3 kg bob on a 2 m string. v_top(min) = √(9.8 × 2) = 4.43 m/s. v_bottom(min) = √(5 × 9.8 × 2) = 9.90 m/s. T_bottom = 6 × 0.3 × 9.8 = 17.6 N.",
  "Rod case: Same bob and length. v_top(min) = 0. v_bottom(min) = √(2 × 9.8 × 2) = 6.26 m/s. The rod can push, so the bob can reach the top with zero speed.",
  "Tension at top: A 0.4 kg bob on a 1.5 m string moving at 5 m/s at the top. T = mv²/r − mg = 0.4 × 25/1.5 − 3.92 = 6.67 − 3.92 = 2.75 N.",
  "Energy conservation: A bob has speed 8 m/s at the bottom. Speed at the top: ½v_top² = ½ × 64 − 9.8 × 3 = 32 − 29.4 = 2.6 → v_top = 2.28 m/s.",
  "String goes slack: A bob on a 2 m string has speed 4 m/s at the bottom. At the top: ½v_top² = ½ × 16 − 9.8 × 4 = 8 − 39.2 < 0 → impossible. The bob never reaches the top."
];

obj.practiceQuestions = [
  "A 0.4 kg bob on a 1.2 m string rotates in a vertical circle. Find the minimum speeds at the top and bottom, and the tension at the bottom.",
  "A 0.5 kg ball is whirled in a vertical circle of radius 0.8 m. If the tension at the bottom is 3 times the weight, find the speed at the bottom.",
  "A rigid rod of length 1.5 m has a 0.3 kg bob at its end. What is the minimum speed at the bottom to complete the vertical circle?",
  "A stone tied to a 2 m string is whirled vertically. If the tension at the top is equal to the weight of the stone, find its speed at the top.",
  "A 1 kg mass is rotated in a vertical circle of radius 1 m. Find the difference in tension between the bottom and top positions when the speed at the bottom is 10 m/s."
];

obj.formulas = [
  "Minimum speed at top (string): v_top = √(gr)",
  "Minimum speed at bottom (string): v_bottom = √(5gr)",
  "Minimum speed at bottom (rod): v_bottom = √(2gr)",
  "Tension at bottom: T_bottom = mg + mv²/r",
  "Tension at top: T_top = mv²/r − mg",
  "Energy conservation: ½mv_b² = ½mv_t² + mg(2r)"
];

obj.keyPoints = [
  "The minimum speed at the top (string) is √(gr), independent of mass.",
  "The minimum speed at the bottom (string) is √(5gr) — the most tested result.",
  "For a rigid rod, v_bottom(min) = √(2gr) — the rod can push, not just pull.",
  "Tension at the bottom is always maximum; at the top it is minimum.",
  "At the minimum case (string), T_bottom = 6mg — six times the weight."
];

obj.summary = "Motion in a vertical circle involves varying speed due to gravity. For a string, the minimum speed at the top is √(gr) and at the bottom is √(5gr). A rigid rod allows v_top = 0, giving v_bottom(min) = √(2gr). Tension is maximum at the bottom (T = mg + mv²/r) and minimum at the top. Energy conservation links speeds at different heights.";

obj.specialNotes = [
  "The factor √(5gr) for minimum bottom speed (string) is the single most tested result in NEB exams.",
  "Always distinguish between string (T ≥ 0) and rod (T can be negative / pushing).",
  "If the string goes slack, the body becomes a projectile — follow parabolic path.",
  "T_bottom = 6mg only when v_bottom = √(5gr) — this is the minimum case.",
  "NEB frequently asks: 'Find the minimum speed at the bottom to complete the vertical circle'."
];

obj.importantStatements = [
  "The minimum speed at the top of a vertical circle (string) is √(gr), independent of mass.",
  "The minimum speed at the bottom (string) is √(5gr) — derived from energy conservation.",
  "For a rigid rod, the body can complete the circle with v_top = 0, giving v_bottom(min) = √(2gr).",
  "Tension is maximum at the bottom and minimum at the top in vertical circular motion.",
  "At the critical case (string), the tension at the bottom equals 6 times the weight."
];

obj.importantNotes = [
  "The minimum speed at the bottom (string) is √(5gr), not √(2gr) — that is for a rod.",
  "Always apply energy conservation between the top and bottom: ½mv_b² = ½mv_t² + mg(2r).",
  "The tension at the bottom is always T = mg + mv²/r — add the weight to the centripetal force.",
  "At the top, tension and weight both point down: T + mg = mv²/r.",
  "If v_top < √(gr) for a string, the string goes slack and circular motion is lost."
];

obj.examShortTricks = [
  "Top minimum: v_top = √(gr) — just take √(g × r).",
  "Bottom minimum (string): v_bottom = √(5gr) — remember the factor 5.",
  "Bottom minimum (rod): v_bottom = �√(2gr) — smaller because rod can push.",
  "Tension ratio: at minimum, T_bottom = 6mg — six times the weight.",
  "Energy shortcut: the height difference between top and bottom is always 2r."
];

obj.examNotes = [
  "√(5gr) is tested almost every year — memorize this result.",
  "String vs rod distinction is a classic conceptual question.",
  "Tension at top and bottom problems are standard numerical questions.",
  "Energy conservation between two points is the primary solution method.",
  "NEB may ask: 'Why does the string go slack?' — explain with v < √(gr)."
];

obj.mcs = [
  {
    question: "The minimum speed at the top of a vertical circle (string of length L) is:",
    options: ["√(gL)", "√(2gL)", "√(5gL)", "√(gL/2)"],
    answer: "A"
  },
  {
    question: "The minimum speed at the bottom to complete a vertical circle (string) is:",
    options: ["√(2gr)", "√(3gr)", "√(4gr)", "√(5gr)"],
    answer: "D"
  },
  {
    question: "A rigid rod of length L has a bob at its end. The minimum speed at the bottom to complete the circle is:",
    options: ["√(2gL)", "√(3gL)", "√(4gL)", "√(5gL)"],
    answer: "A"
  },
  {
    question: "At the minimum speed case (string), the tension at the bottom is:",
    options: ["3mg", "4mg", "5mg", "6mg"],
    answer: "D"
  },
  {
    question: "If the string goes slack at the top of a vertical circle, the bob will:",
    options: ["Fall straight down", "Move tangentially", "Follow a parabolic path", "Continue in a circle"],
    answer: "C"
  }
];

obj.importantConcepts = [
  "Minimum speed at top (string): v = √(gr) — the string goes slack below this.",
  "Minimum speed at bottom (string): v = √(5gr) — derived from energy conservation.",
  "Rigid rod case: v_bottom(min) = √(2gr) — rod can push, so v_top can be zero.",
  "Tension at bottom: T = mg + mv²/r — weight and centripetal force add.",
  "Energy conservation: ½mv_b² = ½mv_t² + mg(2r) — links speeds at top and bottom."
];

obj.importantTasks = [
  "Derive v_top(min) = √(gr) from the force equation at the top.",
  "Derive v_bottom(min) = √(5gr) using energy conservation.",
  "Solve 5 problems finding tension at the top and bottom.",
  "Compare string and rod cases — show different minimum speeds.",
  "Solve 2 problems where the string goes slack before reaching the top."
];

fs.writeFileSync(fp, JSON.stringify(obj, null, 2), 'utf8');
console.log('DONE 04-vertical-circle.json');
console.log('  notes:', obj.notes.length, 'formulas:', obj.formulas.length, 'mcs:', obj.mcs.length);
