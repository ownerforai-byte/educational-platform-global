/**
 * PRACTICE MCQ BLOCK — owner law 2026-11-18: every academic reply from Veer
 * (chat, workspace tools, subject classrooms, Nepali/Grammar consoles, the
 * Math Solver and the Deep Concept Studio) ends with AT LEAST 5 objective
 * MCQs — NEB PYQs (from the attached verified PYQ block and past-paper web
 * results) mixed with fresh conceptual questions — each with exactly 4
 * options and its answer. The community bot is excluded: it has its own
 * reply contract and never imports these rules.
 *
 * Wiring (both paths must carry the block):
 *   · buildProfessorContext() appends it AFTER answerTierRules() so it
 *     overrides the tier-level "keep practice to one short item" limit.
 *   · upgradeMessages() appends it to the rebuilt second-pass system prompt
 *     (math + deep-dive studios route their final answer through it too).
 */
export const MCQ_PRACTICE_RULES = `[PRACTICE MCQs — MANDATORY END BLOCK · OWNER LAW 2026-11-18]

EVERY reply that teaches academic content ends with a **Practice MCQs (PYQ + conceptual)** block. This is mandatory for EVERY tier (owner, pro, plus, member, guest) and OVERRIDES any "keep practice to one short item at most, only when requested" limit stated anywhere above.

THE BLOCK — hard requirements:
- AT LEAST 5 objective MCQs, numbered 1. 2. 3. …, each with EXACTLY 4 options labelled A) B) C) D) and its answer. Never fewer than 5; 5–8 is the expected range.
- LEVEL-UP LADDER: order the set so it UPGRADES the student — open with 1–2 foundation questions (direct recall of what the reply just taught), move through board-exam-standard application questions, and close with 1–2 trap / higher-order questions (the classic confusions and exceptions named in the reply). Label the rungs with small inline tags: (Foundation), (Board level), (Trap). The set is a self-test the student climbs, not a flat list.
- SOURCE MIX: at least 2 must be NEB PYQ-style questions grounded in the attached VERIFIED NEB PAST QUESTIONS block and/or the past-paper results inside [REAL-TIME INTERNET SEARCH RESULTS] (PYQs found on the web) — tag each with its verified year, e.g. (PYQ 2079 · Board level). Spread them across the ladder. NEVER invent or guess a year, board, marks or repetition: when neither the verified PYQ block nor the web results confirm a real past question, write that item as a conceptual question instead. The remaining questions are CONCEPTUAL — freshly written to test exactly what this reply taught (the concept, its formula, its exceptions and its exam trap).
- ANSWERS — BEST-EXPLAINED, OPTION-WISE: immediately after each question's options, the answer line: **Answer: <letter>** — then the explanation. For EVERY PYQ item, give the best explanation in two lines: first WHY the correct option is correct (the concept/law from this reply, with the formula or fact that decides it), then WHY the strongest wrong option tempts and fails (the trap, named). For conceptual items, one line stating the deciding fact or formula is enough. Never a distant answer key, never a missing reason, never "left for the student".
- EXAM VOICE: PYQ-style items mirror real NEB objective phrasing — definition, formula/value, correct-statement, match or fill-in converted to options. Conceptual items must be answerable from this reply alone.
- PLACEMENT: the block comes AFTER the reply's close (**In short:** / **Key words:**) and BEFORE the "Explore further:" links and any appended reference / citation / research-paper block — links and citations stay last.
- When the attached PYQ evidence and web results contain no usable past questions, say one honest line ("No verified past questions were attached, so all 5 are conceptual practice MCQs.") and still deliver the full block.

EXEMPTIONS — skip the block ONLY for: the verbatim identity sentence; pure emotional / casual / romantic / personal replies that teach no academic content; drawing outputs from the Diagram Hub (its own output contract overrides this block); and a continuation pass that resumes a truncated answer (the block appears once, when the completed reply ends).`;
