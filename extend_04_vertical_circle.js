// extend_04_vertical_circle.js
// Adds simulation, mindmap, and extra notes to 04-vertical-circle.json
const fs = require('fs');
const path = require('path');

const fp = path.join(__dirname, 'content/ravikishan/class-11-notes/physics/circular-motion/concepts/04-vertical-circle.json');
const obj = JSON.parse(fs.readFileSync(fp, 'utf8'));

obj.notes = obj.notes.concat([
  "**Energy diagram for vertical circle:** plot KE, PE, and total E vs. height. KE is maximum at the bottom (½mv_b²), minimum at the top (½mv_t²). PE is minimum (0) at the bottom and maximum (mg·2r) at the top. Total energy E = ½mv_b² = ½mv_t² + 2mgr — a horizontal line on the diagram.",
  "**Tension variation around the circle:** at any angle θ from the bottom, T = mv²/r + mg cos θ. At the bottom (θ = 0°): T = mg + mv²/r (maximum). At the top (θ = 180°): T = mv²/r − mg (minimum). The tension difference between bottom and top is always 6mg when the minimum-speed condition holds.",
  "**Worked example — tension at arbitrary point:** a 0.2 kg bob on a 0.8 m string has speed 6 m/s at the bottom. At the top: ½v_t² = ½ × 36 − 9.8 × 1.6 = 18 − 15.68 = 2.32 → v_t = 2.15 m/s. T_top = 0.2 × 4.62/0.8 − 1.96 = 1.16 − 1.96 = −0.80 N. Since T < 0, the string goes slack before reaching the top. The bob cannot complete the circle.",
  "**Rod vs. string — key differences:** a rod can support compression, so the bob can reach the top with v = 0. The rod pushes upward with force mg at the top. Minimum bottom speed for a rod: √(2gr). For a string: √(5gr). The factor 5 versus 2 is the critical distinction tested in NEB.",
  "**Complete-the-circle condition:** for a string, the condition is v_bottom ≥ √(5gr). For a rod, it is v_bottom ≥ √(2gr). If v_bottom is between √(2gr) and √(5gr), the bob completes the circle with a rod but not with a string."
]);

obj.simulation = {
  title: "Vertical Circle Simulator",
  description: "Simulate a bob on a string or rod rotating in a vertical plane. Watch how speed, tension, and energy change at every point. Toggle between string and rod modes to see the critical difference. Visualize the energy bar chart in real time.",
  parameters: [
    { name: "m", label: "Mass (kg)", default: 0.5, min: 0.1, max: 5 },
    { name: "r", label: "String/rod length (m)", default: 1.0, min: 0.2, max: 5 },
    { name: "v_bottom", label: "Initial speed at bottom (m/s)", default: 8, min: 0, max: 20 },
    { name: "mode", label: "Constraint type", default: "string", options: ["string", "rod"] }
  ],
  outputs: [
    "v_top = √(v_bottom² − 4gr) — speed at the top",
    "T_top = mv_top²/r − mg — tension at the top",
    "T_bottom = mv_bottom²/r + mg — tension at the bottom",
    "KE_bottom = ½mv_bottom², PE_bottom = 0",
    "KE_top = ½mv_top², PE_top = mg·2r",
    "Condition check: v_bottom ≥ √(5gr) for string, ≥ √(2gr) for rod"
  ],
  visualElements: [
    "Animated bob rotating in vertical circle",
    "Tension vector arrow changing length at each position",
    "Speed indicator with numerical value",
    "Energy bar chart: KE, PE, Total (real-time updating)",
    "Threshold indicator: shows minimum required v_bottom for completion",
    "String slack indicator: turns red when T < 0 (string mode only)"
  ]
};

obj.mindmap = {
  centralConcept: "Motion in a Vertical Circle",
  branches: [
    {
      topic: "Key Principles",
      subtopics: [
        { name: "Energy Conservation", points: ["½mv_b² = ½mv_t² + mg(2r)", "Speed varies with height", "Total mechanical energy constant", "Only conservative force: gravity"] },
        { name: "Force Analysis", points: ["At top: T + mg = mv²/r", "At bottom: T − mg = mv²/r", "Tension varies with position", "Net radial force = centripetal force"] },
        { name: "String vs. Rod", points: ["String: T ≥ 0 only (pulls)", "Rod: T can be negative (pushes)", "Different minimum speeds", "Rod allows v_top = 0"] }
      ]
    },
    {
      topic: "Critical Speeds",
      subtopics: [
        { name: "String — Top", points: ["v_top(min) = √(gr)", "T → 0 at minimum", "Below this: string goes slack", "Independent of mass"] },
        { name: "String — Bottom", points: ["v_bottom(min) = √(5gr)", "Derived from energy conservation", "Most tested NEB result", "Factor 5 is key"] },
        { name: "Rod — Bottom", points: ["v_bottom(min) = √(2gr)", "Since v_top can be 0", "Lower than string case", "Rod provides support at top"] }
      ]
    },
    {
      topic: "Tension Formulae",
      subtopics: [
        { name: "At the bottom", points: ["T = mg + mv²/r", "Maximum tension in the motion", "At min speed: T = 6mg", "Weight and centripetal force add"] },
        { name: "At the top", points: ["T = mv²/r − mg", "Minimum tension in the motion", "At min speed: T = 0", "Weight opposes centripetal force"] },
        { name: "At angle θ", points: ["T = mv²/r + mg cos θ", "θ measured from bottom", "General formula for any position", "Reduces to top/bottom cases"] }
      ]
    },
    {
      topic: "Common Mistakes",
      subtopics: [
        { name: "Confusing string/rod", points: ["String: v_top(min) = √(gr)", "Rod: v_top(min) = 0", "Different minimum bottom speeds", "Always check the constraint type"] },
        { name: "Wrong tension direction", points: ["At top: both T and mg point down", "At bottom: T up, mg down", "Sign convention matters", "Draw FBD at each point"] },
        { name: "Energy errors", points: ["Height difference = 2r, not r", "PE_top − PE_bottom = mg(2r)", "Don't forget the factor 2", "Check units carefully"] }
      ]
    },
    {
      topic: "NEB Exam Focus",
      subtopics: [
        { name: "Derivations", points: ["Derive v_top(min) = √(gr)", "Derive v_bottom(min) = √(5gr)", "Show T_bottom = 6mg at min speed", "Energy conservation steps"] },
        { name: "Numerical Problems", points: ["Find tension at top and bottom", "Find minimum speeds", "Compare string vs. rod", "Check if bob completes circle"] },
        { name: "Conceptual Questions", points: ["Why does string go slack?", "Difference between string and rod", "Where is tension maximum/minimum?", "Energy transformation in the motion"] }
      ]
    }
  ]
};

fs.writeFileSync(fp, JSON.stringify(obj, null, 2), 'utf8');
console.log('DONE: 04-vertical-circle.json');
console.log('  notes:', obj.notes.length, '(added 5)');
console.log('  simulation:', !!obj.simulation, 'outputs:', obj.simulation?.outputs?.length);
console.log('  mindmap:', !!obj.mindmap, 'branches:', obj.mindmap?.branches?.length);
