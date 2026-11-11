/**
 * SOURCE CLASSIFICATION — one file, one sink.
 *
 * Owner decision (2026-09-30): ingest ALL the Class 11 Science material in the
 * download folder, but not all of it into the same place. The sinks exist
 * because they fail differently:
 *
 *   tutor      the prose corpus. Notes, textbooks, worked explanations — this
 *              is what an answer is built FROM, injected verbatim and polished.
 *   quiz       MCQ papers. Injecting a question bank into the answer corpus
 *              burns retrieval slots and makes Veer quote a question stem
 *              instead of teaching the concept behind it.
 *   reference  past papers and solved PYQs. Real exam framing, but it answers
 *              "what NEB asked", never "what the syllabus says" — so it is
 *              retrieved as supporting material rather than as knowledge.
 *   skip       duplicates, junk, slides and syllabus documents. None of them
 *              teach anything: a syllabus DESCRIBES the course, a slide deck
 *              is bullet fragments without the sentences that connect them,
 *              and an admit card is not study material at all.
 *
 * Classification reads the FILE NAME only. It is a hint that decides the output
 * folder and the sink, never a fact the tutor is taught — the corpus still
 * indexes each record on its own title and body, so a file misfiled under
 * `physics` still answers when a biology question matches it.
 */

/**
 * Where a source's extracted text is allowed to land.
 *
 * `skip` is a real sink: the file is read, reported and then written nowhere,
 * which is how the ingest refuses duplicates and junk out loud instead of
 * silently teaching them.
 */
export type SourceSink = "tutor" | "quiz" | "reference" | "skip";

export interface SourceClass {
  /** Subject folder hint, inferred from the file name. */
  subject: string;
  /** Class level hint: "11" | "12" | "?" when the name does not say. */
  classLevel: string;
  /** The sink this file's text belongs in. */
  sink: SourceSink;
  /**
   * Why the sink was chosen, shown in the ingest report so a misfile is
   * visible before anything is written.
   */
  reason: string;
}

/** File names that are not study material at all. */
const JUNK_RE =
  /admit card|readme\.md|study_vault_export|offline interactive study notes website|^[0-9a-f]{8}-[0-9a-f]{4}-/i;

/** Ordered: the first match wins, so the most specific name comes first. */
const SUBJECTS: Array<[RegExp, string]> = [
  [/\bphysics\b/i, "physics"],
  [/\bchemistry\b|\bchem\b/i, "chemistry"],
  [/\bbiology\b|\bbio\b/i, "biology"],
  [/\bmathematics\b|\bmaths?\b|\bmatrix\b|\bmatrices\b/i, "mathematics"],
  [/\benglish\b/i, "english"],
  [/\bnepali\b/i, "nepali"],
  [/\bcomputer\b|\bict\b/i, "computer-science"],
  [/\beconomics\b/i, "economics"],
];

/**
 * Topic words that only ever appear under one NEB subject, used when the file
 * name carries no subject at all ("Ideal_and_Real_Gases_Notes.pdf").
 *
 * Mathematics is listed first because "Limits & Continuity" and "Vectors" are
 * calculus topics here — under physics they would be files like "Vectors Class
 * 11 Physics Notes", whose own name already matched the subject list above.
 */
const TOPIC_SUBJECTS: Array<[RegExp, string]> = [
  [
    /\blimits?\b|continuity|\bcalculus\b|\bderivative\b|\bintegral\b|\btrigonometr|\bprobability\b|\bpermutation\b|\bcombination\b|\bdeterminant\b/i,
    "mathematics",
  ],
  [/\bgrammar\b|\bpreposition\b|\btense\b|\bcomposition\b/i, "english"],
  [
    /\bvectors?\b|\bheat\b|\btemperature\b|\bmotion\b|\boptics?\b|\bwave\b|\bsound\b|\bgravit|mechanic|\belectric|\bmagnet|\bcircuit|semiconduct|thermodynamic|\bkinetic|\bprojectile|\bdynamics|\bunits? and measurement/i,
    "physics",
  ],
  [
    /\bgases?\b|\bliquid|stoichiom|\batomic\b|\bmole\b|\bperiodic\b|bonding|\borganic\b|\bacid\b|\balkali|\bsalt\b|electrochem|\bequilibrium|hydrocarbon|\bvalency\b/i,
    "chemistry",
  ],
  [
    /\bcell\b|protoplasm|cytoplasm|\bvacuole|plastid|living world|taxonom|\bplant\b|\banimal\b|\bhuman\b|anatom|physiolog|\btissue\b|\borgan\b|ecolog|evolution|genetic|photosynth|respirat|circulat|excret|nervous|reproduct|mitochond|ribosom|chloroplast|nucleus\b|\bplasmodium\b|\bbotany\b|\bzoology\b|\bgenome\b/i,
    "biology",
  ],
];

/** "3. Reduced-Biology_grade_11" → "3 reduced biology grade 11". */
function normaliseName(fileName: string): string {
  return fileName
    .toLowerCase()
    .replace(/\.[a-z0-9]{2,4}$/, "")
    .replace(/[_\-.()[\]]+/g, " ");
}

function subjectOf(normalised: string): string {
  for (const [re, subject] of SUBJECTS) if (re.test(normalised)) return subject;
  for (const [re, subject] of TOPIC_SUBJECTS) if (re.test(normalised)) return subject;
  return UNKNOWN_SUBJECT;
}

function classOf(normalised: string): string {
  if (/class 11|grade 11|\bxi\b|grade xi|\(11\)/.test(normalised)) return "11";
  if (/class 12|grade 12|\bxii\b|grade xii|\(12\)/.test(normalised)) return "12";
  return "?";
}

/**
 * The sink a file belongs in, read from its name.
 *
 * Order matters: `mcq` is tested before the past-paper rule because "Chemistry
 * MCQs (Class 11)" is a question bank for the QUIZ, while "NEB Solution of
 * CHEMISTRY Old is Gold" is a solved PYQ for REFERENCE — the two must not land
 * in the same folder just because both are questions.
 */
export function classifySourceFile(fileName: string): SourceClass {
  const normalised = normaliseName(fileName);
  const subject = subjectOf(normalised);
  const classLevel = classOf(normalised);

  if (JUNK_RE.test(fileName)) {
    return { subject, classLevel, sink: "skip", reason: "not study material" };
  }
  if (/mcq/.test(normalised)) {
    return { subject, classLevel, sink: "quiz", reason: "MCQ paper — belongs to the quiz bank" };
  }
  if (
    /old is gold|question bank|\bpyq\b|solution of|question paper|model question|merospark|past paper|exam paper|model test/.test(
      normalised,
    )
  ) {
    return { subject, classLevel, sink: "reference", reason: "past paper / question bank — reference tier" };
  }
  if (/mindmap|architecture|slides|flash card|presentation/.test(normalised)) {
    return { subject, classLevel, sink: "skip", reason: "slide deck / diagram — no sentences to teach" };
  }
  if (/syllabus|curriculum/.test(normalised)) {
    return { subject, classLevel, sink: "skip", reason: "syllabus — describes the course, does not teach it" };
  }
  return { subject, classLevel, sink: "tutor", reason: "prose — teaches the concept" };
}

/**
 * A file with no subject in its name still lands in the tutor sink, under the
 * `general` folder — the corpus tolerates that (a record whose path says
 * nothing still indexes on its own title) and the alternative, dropping the
 * file, would throw away material like "Ideal_and_Real_Gases_Notes.pdf".
 */
export const UNKNOWN_SUBJECT = "general";

/**
 * Folder name for a sink, under whichever root the caller owns.
 *
 * `books` is the one the corpus reads, because it is the one the ingest writes
 * INSIDE `backend/kb/`. The other two are staged under `backend/sources/` —
 * spilling them into `kb/` would put question papers into the answer corpus,
 * which is the entire reason the sinks exist.
 */
export function sinkFolder(sink: SourceSink): string {
  if (sink === "tutor") return "books";
  if (sink === "quiz") return "quiz";
  if (sink === "reference") return "reference";
  return "skip";
}
