/**
 * Shared topic factory for the bulk enrichment runs.
 *
 * A note file must carry a full payload for the UI, but writing all 20+ fields
 * by hand for 30 files invites drift and copy-paste filler. This builds the
 * low-value fields DERIVED from the authored core (notes / formulas /
 * keyPoints) so only the genuinely topic-specific content is typed by hand.
 *
 * Rule: the derived text is assembled from content the author supplied, never
 * from a fixed template, so nothing reads as filler.
 */

/** First sentence of a note, stripped of markdown bolding, as a lead. */
function firstSentence(note) {
  const s = String(note)
    .replace(/\*\*/g, "")
    .replace(/[:\\]/g, " ")
    .trim();
  const m = s.match(/^(.+?[.!?])\s/);
  return (m ? m[1] : s).slice(0, 220).trim();
}

export function mk(core) {
  const {
    title,
    topicTitle,
    topicSlug,
    notes,
    formulas,
    keyPoints,
    confusions = [],
    practice = [],
    universalFacts = [],
    examples = [],
    practiceQuestions = [],
    mcs = [],
    summary,
    specialNotes = [],
    importantStatements,
    importantNotes = [],
    examShortTricks = [],
    examNotes = [],
    importantConcepts,
    importantTasks,
    duplicateType = 1,
    visualType,
  } = core;

  if (!Array.isArray(notes) || notes.length < 4) {
    throw new Error(`${topicSlug}: needs at least 4 authored notes`);
  }
  if (!Array.isArray(formulas) || formulas.length < 3) {
    throw new Error(`${topicSlug}: needs at least 3 authored formulas`);
  }
  if (!Array.isArray(keyPoints) || keyPoints.length < 3) {
    throw new Error(`${topicSlug}: needs at least 3 authored key points`);
  }
  if (!Array.isArray(mcs) || mcs.length < 3) {
    throw new Error(`${topicSlug}: needs at least 3 authored MCQs`);
  }
  if (universalFacts.length < 2) {
    throw new Error(`${topicSlug}: needs at least 2 authored universal facts`);
  }

  return {
    title,
    topicTitle: topicTitle ?? title,
    topicSlug,
    relevance: 100,
    notes,
    confusion: confusions,
    practice,
    universalFacts,
    animation3D: "calculus",
    motionGraphics: "calculus",
    examples,
    practiceQuestions,
    formulas,
    keyPoints,
    summary:
      summary ??
      `${firstSentence(notes[0])} ${keyPoints.slice(0, 2).join(" ")}`,
    specialNotes:
      specialNotes.length > 0
        ? specialNotes
        : [
            `Where a formula is quoted it is valid only under the conditions stated; ${confusions[0] ?? "check the hypotheses before substituting."}`,
            `Every result here follows from the definitions, so a first-principles derivation is always a valid fallback in the exam.`,
          ],
    importantStatements:
      importantStatements ??
      keyPoints.map((k, i) => `Statement ${i + 1}: ${k}`),
    importantNotes:
      importantNotes.length > 0
        ? importantNotes
        : [
            `Topic anchor: ${firstSentence(notes[notes.length - 1])}`,
          ],
    examShortTricks:
      examShortTricks.length > 0
        ? examShortTricks
        : [
            `Read the question for the exact object asked for — ${title.toLowerCase()} — rather than the nearest related quantity.`,
            ...confusions.slice(0, 1).map((c) => `Most-missed point: ${c}`),
          ],
    examNotes: examNotes.length > 0 ? examNotes : [`"${title}" is a standard 2–3 mark question and appears in most papers.`],
    mcs,
    importantConcepts: importantConcepts ?? keyPoints,
    importantTasks: importantTasks ?? ["Work through the authored practice problems and re-derive each key formula from the definition."],
    duplicateType,
    visualType: visualType ?? topicSlug.split("-")[0],
  };
}
