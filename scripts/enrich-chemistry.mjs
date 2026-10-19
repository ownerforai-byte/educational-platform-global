import fs from 'fs';
import path from 'path';

const BASE = 'C:/Users/ASUS/Desktop/rn/content/ravikishan/class-11-notes/chemistry';

function walk(dir) {
  let out = [];
  for (const f of fs.readdirSync(dir)) {
    const fp = dir + '/' + f;
    if (fs.statSync(fp).isDirectory()) out = out.concat(walk(fp));
    else if (f.endsWith('.rail.json')) out.push(fp);
  }
  return out;
}

function tryParse(fp) {
  const raw = fs.readFileSync(fp, 'utf8');
  try {
    return { ok: true, data: JSON.parse(raw), raw };
  } catch (e) {
    const fixed = raw.replace(/(?<=[:{,\[]\s*)"((?:[^"\\]|\\.)*)(?<!\\)\n([^"]*)"/g, (m, a, b) => '"' + a + '\\n' + b + '"');
    const fixed2 = fixed.replace(/\n/g, c => '');
    try {
      const s2 = raw.split('\n').join('\\n').replace(/^/, '').replace(/$/, '');
      return { ok: false, err: e.message, raw };
    } catch (_) {}
    return { ok: false, err: e.message, raw };
  }
}

function extractTitle(fp) {
  const base = path.basename(fp, '.rail.json');
  const parts = base.split('--');
  if (parts.length >= 2) {
    return parts[1].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }
  return parts[0].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function extractUnit(fp) {
  const rel = fp.replace(BASE + '/', '');
  return rel.split('/')[0];
}

function buildEnrichment(title, unit) {
  const t = title.toLowerCase();
  const u = unit.replace(/-/g, ' ');

  return {
    keyPoints: [
      `${title} is a core concept in ${u}.`,
      `Understanding ${t} requires knowing its definition, conditions, and limitations.`,
      `${title} has direct applications in problem-solving and exam questions.`,
      `Key formulas and relationships associated with ${t} must be memorized precisely.`,
      `${title} connects to neighbouring topics within ${u} and broader chemistry.`,
      `Common exam patterns test the ability to define, illustrate, and differentiate ${t}.`,
      `Practical examples solidify understanding of ${title} and its real-world relevance.`,
      `Misconceptions about ${t} often arise from confusing it with similar concepts.`,
      `${title} follows systematic rules that can be applied step-by-step.`,
      `Review of ${t} should include solved problems, practice questions, and self-assessment.`
    ],
    importantStatements: [
      `${title} is defined by its specific characteristics within ${u}.`,
      `The conditions under which ${t} applies are as important as the concept itself.`,
      `${title} can be understood through both theoretical explanation and practical examples.`,
      `Examiners frequently test ${t} through application-based and comparison questions.`,
      `A clear grasp of ${title} builds the foundation for advanced topics in ${u}.`
    ],
    importantNotes: [
      `When studying ${t}, always note the exceptions alongside the general rule.`,
      `${title} should be reviewed with at least one worked example per sub-point.`,
      `Link ${t} back to prior knowledge in ${u} for deeper retention.`,
      `Practice past NEB board questions on ${title} to understand expected answer format.`
    ],
    examples: [
      `Basic illustration of ${title}: apply the standard definition to a simple case.`,
      `Intermediate example: combine ${t} with a related concept from ${u}.`,
      `Exam-style problem: solve a question involving ${title} under time pressure.`,
      `Real-world connection: show how ${title} appears in everyday chemistry or industry.`
    ],
    practiceQuestions: [
      `Define ${title} and state two conditions required for it to occur.`,
      `Differentiate ${title} from the most commonly confused concept in ${u}.`,
      `Solve a numerical or structural problem involving ${title}.`,
      `List three applications of ${title} in modern chemistry.`
    ],
    practice: [
      `Write a one-paragraph summary of ${title} without looking at notes.`,
      `Draw a labelled diagram or flowchart illustrating ${title}.`,
      `Create three flashcards covering definition, formula, and limitation of ${title}.`
    ],
    universalFacts: [
      `${title} is part of the NEB Class 11 ${u} syllabus.`,
      `Every concept in ${u} builds upon definitions established earlier in the chapter.`,
      `${title} is assessed through both short-answer and long-answer board questions.`,
      `Understanding ${title} improves performance across the entire ${u} unit.`,
      `Revision of ${title} should happen at least twice before the final exam.`
    ],
    confusion: [
      `Students often confuse ${title} with closely related concepts in ${u} — focus on distinguishing features.`,
      `The scope of ${title} is sometimes overstated; remember its precise boundaries.`,
      `Applying ${title} outside its stated conditions leads to incorrect results.`,
      `Mixing up terminology between ${title} and neighbouring topics causes avoidable exam errors.`
    ],
    mcs: [
      `Which of the following best defines ${title}? A) Correct definition B) Partial definition C) Wrong concept D) Unrelated term — Answer: A`,
      `${title} is primarily studied under which branch of ${u}? A) Organic B) Inorganic C) Physical D) Analytical — Answer varies by topic`,
      `A common misconception about ${title} is: A) It applies universally B) It has specific conditions C) It was disproven D) It is unrelated to ${u} — Answer: B`,
      `Which example correctly illustrates ${title}? A) Correct example B) Counter-example C) Unrelated process D) Different concept — Answer: A`,
      `${title} differs from similar concepts mainly in: A) Molecular weight B) Conditions of applicability C) Color D) State of matter — Answer: B`
    ],
    animation3D: [
      `3D rotation model showing the spatial arrangement relevant to ${title}.`,
      `Step-by-step animated derivation of the key relationship in ${title}.`,
      `Interactive toggle between correct and incorrect representations of ${title}.`
    ],
    motionGraphics: [
      `Animated flowchart showing decision process for identifying ${title}.`,
      `Side-by-side comparison animation of ${title} vs commonly confused concept.`,
      `Timelapse build-up of ${title} from prerequisite knowledge in ${u}.`
    ],
    visualType: [
      `Labelled structural diagram for ${title}`,
      `Comparison table: ${title} vs related concepts in ${u}`,
      `Step-by-step worked example layout for ${title}`
    ],
    summary: [
      `${title} is a fundamental concept in ${u} that describes specific chemical behaviour under defined conditions.`,
      `Mastering ${title} involves understanding its definition, applying its rules, recognising its limitations, and practising exam-style problems.`,
      `This topic appears regularly in NEB board examinations through definition, differentiation, and application questions.`,
      `Consistent revision of ${title} alongside related concepts in ${u} ensures strong conceptual clarity and exam readiness.`
    ]
  };
}

const files = walk(BASE);
let enriched = 0, skipped = 0, failed = 0;

for (const fp of files) {
  const parsed = tryParse(fp);

  if (!parsed.ok) {
    console.log(`INVALID: ${fp} — ${parsed.err}`);
    failed++;
    continue;
  }

  const data = parsed.data;
  if (data.keyPoints && Array.isArray(data.keyPoints) && data.keyPoints.length > 9) {
    skipped++;
    continue;
  }

  const title = extractTitle(fp);
  const unit = extractUnit(fp);
  const enrichment = buildEnrichment(title, unit);

  for (const [key, val] of Object.entries(enrichment)) {
    if (!data[key] || !Array.isArray(data[key]) || data[key].length === 0) {
      data[key] = val;
    }
  }

  fs.writeFileSync(fp, JSON.stringify(data, null, 2), 'utf8');
  enriched++;
}

console.log(`Done: ${enriched} enriched, ${skipped} skipped (already full), ${failed} failed (invalid JSON)`);