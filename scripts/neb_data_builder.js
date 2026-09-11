import fs from "fs";
import path from "path";
import { nebExamDataPart1 } from "./neb_data_part1.js";
import { nebExamDataPart2 } from "./neb_data_part2.js";
import { nebExamDataPart3 } from "./neb_data_part3.js";

const mergedSpecific = {
  ...nebExamDataPart1,
  ...nebExamDataPart2,
  ...nebExamDataPart3,
};

function generateGenericNebData(el) {
  const z = el.atomicNumber;
  const blk = el.block;
  const grp = el.group;
  const name = el.name;
  const sym = el.symbol;

  let gradeLevel = "Grade 11 & 12 Periodic Reference";
  if (blk === "s") gradeLevel = "Grade 11 Core (s-Block Elements)";
  else if (blk === "p") gradeLevel = "Grade 11 & 12 Core (p-Block Group " + grp + ")";
  else if (blk === "d") gradeLevel = "Grade 12 Core (d-Block Transition Series)";
  else if (blk === "f") gradeLevel = z <= 71 ? "Grade 12 Core (4f Lanthanide Series)" : "Grade 12 Core (5f Actinide Series)";

  const pastExamQuestions = [
    `[NEB General Periodic Properties] State the electronic configuration and position of ${name} (${sym}, Z=${z}) in the modern periodic table. (Ans: Period ${el.period}, Group ${grp}, ${blk}-block; configuration: ${el.electronConfig}).`,
    `[NEB Periodic Trend] How does the atomic radius and electronegativity of ${name} compare with adjacent elements in Period ${el.period} and Group ${grp}? (Ans: In Period ${el.period}, atomic radius decreases and electronegativity increases towards Group 17; in Group ${grp}, radius increases down the group as new principal quantum shells are added).`
  ];

  const futureExamTraps = [
    `TRAP: Electron Configuration: Note the valence subshell of ${sym} (${el.electronConfig}). On board exams, always verify whether half-filled or fully-filled subshell stability or inert pair effect applies to this element.`,
    `TRAP: Oxidation State: Common states: ${el.oxidationStates}. Ensure you do not confuse highest group oxidation state with stable ground state.`
  ];

  const keyOresAndCompounds = [
    `${sym} standard compounds: Typical oxides and halides reflecting oxidation state(s) ${el.oxidationStates}.`,
    `Electronic subshell: ${el.electronConfig} in Period ${el.period}.`
  ];

  const hallmarkReactions = [
    `Standard reaction with oxygen: ${sym} + O₂ --> ${sym} Oxide (${el.oxidationStates})`,
    `Periodic trend marker: Electronegativity = ${el.electronegativity ?? "N/A"}, State at STP = ${el.stateAtSTP}`
  ];

  const examQuickRule = `${sym} (Z=${z}) belongs to ${blk}-block Period ${el.period} Group ${grp} with electron configuration ${el.electronConfig}.`;

  return {
    gradeLevel,
    pastExamQuestions,
    futureExamTraps,
    keyOresAndCompounds,
    hallmarkReactions,
    examQuickRule,
  };
}

// Find existing all_elements.json
const possiblePaths = [
  path.resolve("all_elements.json"),
  path.resolve("public/all_elements.json"),
  path.resolve("../all_elements.json"),
];

let rawElements = null;
for (const p of possiblePaths) {
  if (fs.existsSync(p)) {
    rawElements = JSON.parse(fs.readFileSync(p, "utf-8"));
    console.log(`Loaded ${rawElements.length} elements from ${p}`);
    break;
  }
}

if (!rawElements) {
  console.error("Could not find all_elements.json!");
  process.exit(1);
}

const enrichedElements = rawElements.map((el) => {
  const specific = mergedSpecific[el.atomicNumber];
  const nebData = specific || generateGenericNebData(el);

  return {
    ...el,
    nebGradeLevel: nebData.gradeLevel,
    pastExamQuestions: nebData.pastExamQuestions,
    futureExamTraps: nebData.futureExamTraps,
    keyOresAndCompounds: nebData.keyOresAndCompounds,
    hallmarkReactions: nebData.hallmarkReactions,
    examQuickRule: nebData.examQuickRule,
    highYieldNote: nebData.examQuickRule
      ? `${nebData.examQuickRule} ${el.highYieldNote || ""}`.trim()
      : el.highYieldNote,
  };
});

// Write to both root and public/
const destPaths = [
  path.resolve("all_elements.json"),
  path.resolve("public/all_elements.json"),
];

for (const p of destPaths) {
  fs.writeFileSync(p, JSON.stringify(enrichedElements, null, 2), "utf-8");
  console.log(`Successfully wrote enriched data to ${p}`);
}

console.log("Enrichment complete! Total elements:", enrichedElements.length);
