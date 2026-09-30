import { beforeAll, describe, expect, test } from "vitest";

import {
  BOILERPLATE_MIN_RECORDS,
  MIN_TEACHABLE_CHARS,
  classFromIndex,
  classLevelFromDeclared,
  detectClassLevel,
  getCorpus,
  getCorpusStats,
  isBoilerplateLine,
  isTemplateFrame,
  loadClassIndex,
  normalizeLine,
  resetCorpusCache,
} from "../src/ai/curriculum-corpus";
import {
  buildCurriculumContext,
  buildCurriculumContextFor,
  containsToken,
  retrieve,
  titleKey,
} from "../src/ai/curriculum-retrieval";
import { formatSearchContext, type WebSearchResult } from "../src/ai/search-engine";
import { DEEP_ANSWER_RULES } from "../src/ai/deep-answer";
import { MASTER_ACADEMIC_PROMPT, PROFESSOR_STYLE_RULES } from "../src/ai/prompts";
import { MAX_OUTPUT_TOKENS } from "../src/ai/service";

/**
 * DEEP SOURCE GATE — the owner requirement (2026-09-30):
 *
 *   "the source of the search is too shallow and light, so validate it … when
 *    asked a concept it should point out all key roots, ideas and concepts, or
 *    paste the knowledge with just a little grammar polish … it must present
 *    images in its reply … all details of all topics one by one, in conceptual
 *    order."
 *
 * Auditing the real repo proved WHAT made replies shallow, and each finding has
 * an assertion here so it can never come back:
 *
 *   1. CORPUS VALIDATION — half the indexed characters were template banks and
 *      generator frames ("Distinguish concepts in …", "Q1. Define …",
 *      "…: Class 11 concept.", "[insert from textbook]"). They are stripped at
 *      load, and records with too little surviving content are marked `filler`
 *      and never injected as an answer's spine.
 *   2. COVERAGE IS GRADED, NEVER FAKED — a concept the platform really teaches
 *      matches STRONG; one it merely mentions is WEAK and the tutor must answer
 *      from established knowledge instead of dressing a mention up.
 *   3. NO ACCIDENTAL MATCHES — "state the binomial theorem" must not be
 *      "covered" by "Work-Energy Theorem" (word "theorem"), "explain the
 *      photoelectric effect" not by "Inductive Effect" (word "effect"), and a
 *      stemmed token must never match mid-word ("le" inside "principle").
 *   4. COMPLETE-ANSWER CONTRACT — every attached record is covered one idea at
 *      a time in conceptual order, verified material may be carried across with
 *      light grammar polish, and real image URLs may be embedded in the reply.
 *   5. NO SELF-TRUNCATION — the shared output ceiling must be large enough for a
 *      complete topic (1600/2048 tokens is what forced shallow summaries).
 */

const CORPUS_TIMEOUT = 30_000;

beforeAll(() => {
  resetCorpusCache();
  getCorpus();
}, CORPUS_TIMEOUT);

describe("corpus validation (the shallow source, measured)", () => {
  test("template banks and generator frames are recognised, not taught", () => {
    // Cross-record template bank lines (each carried by 126–252 files).
    expect(
      isBoilerplateLine("practice distinguishing prokaryotic from eukaryotic cells.", new Map([
        ["practice distinguishing prokaryotic from eukaryotic cells.", 252],
      ])),
    ).toBe(true);
    // Generator frames: per-topic, so no cross-record count would catch them.
    for (const line of [
      "**First Law of Thermodynamics:** Class 11 concept.",
      "Distinguish concepts in Capacitance and Capacitor.",
      "Solve 5 problems on Introduction to Limits and Continuity.",
      "Derive the key formula for Le Chatelier's Principle.",
      "Introduction to Limits and Continuity appears in exams.",
      "Formula for First Law of Thermodynamics: [insert from textbook].",
      "Q2. Key formula for Introduction to Limits and Continuity.",
      "Core principle of First Law of Thermodynamics",
    ]) {
      expect(isTemplateFrame(line), `frame not caught: ${line}`).toBe(true);
    }
    // A real authored note line must survive both filters.
    const real =
      "**Capacitance definition:** Capacitance $C$ of a conductor is the ratio of electric charge $Q$ to the resulting potential $V$.";
    expect(isTemplateFrame(real)).toBe(false);
    expect(isBoilerplateLine(real)).toBe(false);
    // Very short repeats (\"Summary\", \"Unit 3\") are legitimate headings.
    expect(isBoilerplateLine("summary", new Map([["summary", 900]]))).toBe(false);
    expect(normalizeLine("  Two   Spaces ")).toBe("two spaces");
  });

  test("the loaded corpus is validated, and its filler is counted not served", () => {
    const { entries, stats } = getCorpus();
    expect(entries.length).toBeGreaterThan(400);
    expect(stats.boilerplateLines).toBeGreaterThan(50);
    expect(stats.boilerplateRemoved).toBeGreaterThan(1000);
    expect(stats.contentChars).toBeGreaterThan(500_000);
    // A real, honest corpus has some records that cannot ground anything — the
    // point is that they are counted and excluded, not silently served.
    expect(stats.fillerRecords).toBeGreaterThan(0);
    expect(stats.substantiveRecords).toBe(entries.length - stats.fillerRecords);

    for (const entry of entries) {
      // Every surviving line is knowledge: no frame, no placeholder survives.
      for (const section of entry.sections) {
        for (const line of section.lines) {
          expect(isTemplateFrame(line), `frame survived in ${entry.title}`).toBe(false);
        }
      }
      // `filler` is exactly the teachability verdict, measured on what survived.
      expect(entry.filler).toBe(entry.contentChars < MIN_TEACHABLE_CHARS);
      expect(entry.contentChars).toBeGreaterThan(0);
    }
  }, CORPUS_TIMEOUT);

  test("validated content stays real: a known unit's notes are authored prose", () => {
    const real = getCorpus().entries.find((e) => e.title === "Capacitance and Capacitor");
    expect(real).toBeDefined();
    expect(real!.filler).toBe(false);
    expect(real!.contentChars).toBeGreaterThan(1000);
    const notes = real!.sections.find((s) => s.label === "Notes");
    expect(notes).toBeDefined();
    expect(notes!.lines.join(" ")).toMatch(/farad|capacitance/i);
    // And the template banks that flooded this record are gone.
    expect(JSON.stringify(real!.sections)).not.toContain("Distinguish concepts in");
    expect(BOILERPLATE_MIN_RECORDS).toBeGreaterThanOrEqual(3);
  }, CORPUS_TIMEOUT);
});

describe("class level: the tutor knows which grade it is teaching", () => {
  test("a Roman-numeral class is a standalone token, not letters inside a word", () => {
    // Regression: the letters "xi" in "existence" made 06-existence-of-limit.json
    // Class 11 while its eleven sibling files were Class 12.
    expect(detectClassLevel("mathematics/limits-and-continuity/06-existence-of-limit.json")).toBe(
      "unknown",
    );
    expect(detectClassLevel("biology/existing-notes-on-cells")).toBe("unknown");
    expect(detectClassLevel("chemistry/oxidising-agents-exiii")).toBe("unknown");
    // A standalone roman numeral IS a class signal, wherever it sits.
    expect(detectClassLevel("physics/oxide-layer-xi")).toBe("class-11");
    // The forms that must keep working.
    expect(detectClassLevel("class-12-notes/physics/semiconductors")).toBe("class-12");
    expect(detectClassLevel("class 12 electromagnetism")).toBe("class-12");
    expect(detectClassLevel("grade 11 mechanics")).toBe("class-11");
    expect(detectClassLevel("neb class 11 chemistry")).toBe("class-11");
    expect(detectClassLevel("unit xii optics")).toBe("class-12");
  });

  test("a declared class survives a suffix, and prose still never invents one", () => {
    // The platform registry spells it "class-12-notes"; the old anchored pattern
    // rejected that, which is how every registry-scoped unit stayed unknown.
    expect(classLevelFromDeclared("class-12-notes")).toBe("class-12");
    expect(classLevelFromDeclared("class-11-notes")).toBe("class-11");
    expect(classLevelFromDeclared("Class 12")).toBe("class-12");
    expect(classLevelFromDeclared("xii")).toBe("class-12");
    expect(classLevelFromDeclared(11)).toBe("class-11");
    // Unchanged: prose and out-of-range values are not classes.
    expect(classLevelFromDeclared("12 volts")).toBe("unknown");
    expect(classLevelFromDeclared("13")).toBe("unknown");
    expect(classLevelFromDeclared("12 particles of a gas in a box")).toBe("unknown");
  });

  test("the class index reads the platform registry and prefers the unit's subject", () => {
    const index = loadClassIndex();
    expect(index.size).toBeGreaterThan(0);
    // Real registry entries, audited 2026-09-30.
    expect(classFromIndex(index, "mathematics", "limits-and-continuity")).toBe("class-12");
    expect(classFromIndex(index, "physics", "gravitation")).toBe("class-11");
    expect(classFromIndex(index, "chemistry", "something-unregistered")).toBe("unknown");
  });

  test("a Class 12 unit is no longer indexed as an unknown level", () => {
    const { entries, stats } = getCorpus();
    expect(stats.classIndexEntries).toBeGreaterThan(0);
    // Before this, byClass["class-12"] was 0 for the whole platform: no authored
    // Class 12 corpus exists and the built notes declare no class.
    expect(stats.byClass["class-12"] ?? 0).toBeGreaterThan(0);

    // The built payloads (no class in the path) take their class from the index…
    const built = entries.filter(
      (e) => e.source.includes("syllabus-notes") && e.unit === "limits-and-continuity",
    );
    expect(built.length).toBeGreaterThan(0);
    expect(built.some((e) => e.classLevel === "class-12")).toBe(true);
    // The point of the index: none of them is left as an unknown level.
    expect(built.every((e) => e.classLevel !== "unknown")).toBe(true);

    // …while a record that DOES declare its class keeps it: precedence is
    // source declaration → source path → class index. (The authored copy of
    // this unit sits under class-11-notes while the platform registry calls it
    // class-12-notes — an inconsistency the index must not silently "fix".)
    const authored = entries.filter(
      (e) => e.source.includes("class-11-notes") && e.unit === "limits-and-continuity",
    );
    if (authored.length) {
      expect(authored.every((e) => e.classLevel === "class-11")).toBe(true);
    }
  }, CORPUS_TIMEOUT);
});

describe("coverage grading (strong / weak / none — never faked)", () => {
  const COVERED: Array<[string, string]> = [
    ["physics", "what is Newton's second law of motion"],
    ["physics", "explain the laws of thermodynamics"],
    ["physics", "explain semiconductors and band theory"],
    ["physics", "explain the laws of refraction through a prism"],
    ["chemistry", "explain the mole concept"],
    ["chemistry", "what is a chemical bond and its types"],
    ["chemistry", "explain p-block elements and their trends"],
    ["biology", "explain the five kingdom classification"],
    ["biology", "describe mendelian inheritance"],
    ["biology", "explain meiosis and its stages"],
    ["mathematics", "explain integration by parts"],
    ["mathematics", "explain limits and continuity"],
    ["mathematics", "explain matrices and determinants"],
    ["mathematics", "explain the derivative of a function"],
    ["mathematics", "explain vectors and their resolution"],
  ];

  /**
   * The owner's own books attach FIRST by design (`selectHits` promotes a
   * STRONG drop-in so the character ceiling cannot cut it), which means the
   * attached list is deliberately not in pure score order. The ranking
   * invariant therefore applies to the RANKED records — everything that earned
   * its place by score. Asserting it across a promoted record would be
   * asserting that the owner's front placement does not work.
   */
  const assertRankingNeverRises = (hits: Array<{ entry: { dropIn?: boolean }; score: number }>) => {
    const ranked = hits.filter((h) => !h.entry.dropIn);
    for (let i = 1; i < ranked.length; i++) {
      expect(ranked[i].score).toBeLessThanOrEqual(ranked[i - 1].score);
    }
  };

  test.each(COVERED)("a taught %s concept is graded STRONG and reaches the prompt", (subject, question) => {
    const result = retrieve(question, 6);
    expect(result.coverage, `${subject}: ${question}`).toBe("strong");
    expect(result.hits[0].strength).toBe("strong");
    expect(result.hits[0].entry.filler).toBe(false);
    expect(result.matchedTerms.length).toBeGreaterThan(0);
    const context = buildCurriculumContext(question);
    expect(context).toContain("Coverage for this question: STRONG");
    expect(context).toContain("Cover EVERY record");
    expect(context).toContain("nothing was summarised or cut");
  }, CORPUS_TIMEOUT);

  test("a concept the platform does not teach is never dressed up as covered", () => {
    // Audited against the real corpus: none of these has an authored record, so
    // the honest answer is \"answer it completely from established knowledge\".
    // The owner's ingested books did NOT change this list, and that is the
    // point. Several of them DO teach these concepts somewhere in their body
    // (the ingested NCERT chapter 2 has a section on the photoelectric effect;
    // the maths books cover the binomial theorem). Coverage is still WEAK,
    // because a book chunk whose own heading does not name the asked concept
    // must not be presented as the platform's coverage of it — the alternative
    // was a biology record citing binomial NOMENCLATURE as coverage of the
    // binomial THEOREM. See `gradeStrength`.
    for (const question of [
      "explain the photoelectric effect",
      "describe the mechanism of SN1 and SN2 reactions",
      "explain aldol condensation",
      "explain simple harmonic motion",
      "state the binomial theorem",
      "explain conic sections parabola",
    ]) {
      const result = retrieve(question, 6);
      expect(result.coverage, question).not.toBe("strong");
      expect(result.hits.every((h) => h.entry.filler === false)).toBe(true);
      const context = buildCurriculumContext(question);
      if (context) {
        expect(context).toContain(`Coverage for this question: ${result.coverage.toUpperCase()}`);
        expect(context).toContain("NO record dedicated to this concept");
      }
    }
  }, CORPUS_TIMEOUT);

  test("every attached record matches a content term and the ranking never rises", () => {
    for (const question of [
      "what is Newton's second law of motion",
      "explain the mole concept",
      "explain photosynthesis in detail",
      "explain the structure of a eukaryotic cell",
    ]) {
      const { hits, contentTerms } = retrieve(question, 6);
      expect(contentTerms.length).toBeGreaterThan(0);
      assertRankingNeverRises(hits);
      for (const hit of hits) {
        expect(hit.entry.filler).toBe(false);
        if (!hit.related) {
          // A ranked hit must have matched the question's own content words.
          expect(hit.matched.some((m) => contentTerms.includes(m))).toBe(true);
        }
      }
    }
  }, CORPUS_TIMEOUT);

  test("multi-record grounding: a taught topic brings its whole unit's treatment", () => {
    // Breadth is the anti-shallow lever: one concept, several whole records, so
    // the answer can enumerate every idea of the topic instead of summarising a
    // single record. (Sibling fan-out adds records whose own words did not
    // match; the ranked candidates usually already carry the unit, so the
    // assertion is breadth + unit agreement rather than `related`.)
    const result = retrieve("explain the structure and function of a capacitor", 6);
    expect(result.coverage).toBe("strong");
    expect(result.hits.length).toBeGreaterThan(2);
    const titles = new Set(result.hits.map((h) => h.entry.title));
    expect(titles.size).toBe(result.hits.length);
    const units = new Set(result.hits.map((h) => `${h.entry.subject}|${h.entry.unit}`));
    expect(units.has("physics|capacitor")).toBe(true);
    // Sibling records only ever come from the matched unit (never a stray unit
    // like the algebra chapter that used to be dragged into a physics answer).
    for (const hit of result.hits.filter((h) => h.related)) {
      expect(hit.entry.unit).toBe(result.hits[0].entry.unit);
      expect(hit.entry.subject).toBe(result.hits[0].entry.subject);
    }
  }, CORPUS_TIMEOUT);

  test("a follow-up keeps the topic: the conversation rides along", () => {
    const carried = retrieve("explain more about that", 6, "explain the working principle of a capacitor");
    expect(carried.hits.length).toBeGreaterThan(0);
    expect(carried.hits.some((h) => /capacitor|capacitance/i.test(h.entry.title))).toBe(true);
    // The current message still outvotes the tail: its own concept wins.
    const switched = retrieve("explain the mole concept", 6, "explain the working principle of a capacitor");
    expect(switched.hits[0].entry.title.toLowerCase()).toMatch(/mole/);
  }, CORPUS_TIMEOUT);
});

describe("no accidental matches (the false positives that made answers light)", () => {
  test("a stemmed token only matches at a word start, never mid-word", () => {
    expect(containsToken("principle of thermodynamics", "le")).toBe(false);
    expect(containsToken("possible values", "le")).toBe(false);
    expect(containsToken("cells and cell", "cell")).toBe(true);
    expect(containsToken("ionic and ionisation", "ion")).toBe(true);
  });

  test("a common word alone never qualifies a record", () => {
    // Regression: the word \"theorem\" used to retrieve Work-Energy Theorem for a
    // question about the binomial theorem; \"effect\" retrieved Inductive Effect.
    const binomial = retrieve("state the binomial theorem", 6);
    expect(binomial.hits.some((h) => /work-energy/i.test(h.entry.title))).toBe(false);
    const photoelectric = retrieve("explain the photoelectric effect", 6);
    expect(photoelectric.hits.some((h) => /inductive effect/i.test(h.entry.title))).toBe(false);
  }, CORPUS_TIMEOUT);

  test("the stemmer treats \"laws\" and \"law\" as the same word (and keeps \"motion\" whole)", () => {
    // Regression: \"laws\" (4 letters) was never stemmed, so a question about the
    // laws of thermodynamics failed to match \"First Law of Thermodynamics\",
    // while stripping \"ion\" from \"motion\" produced \"mot\", which matched
    // \"motor\" and \"motive\" in unrelated records.
    const laws = retrieve("explain the laws of thermodynamics", 4);
    expect(laws.coverage).toBe("strong");
    // The thermodynamics record must be attached. It is not necessarily hit[0]:
    // a STRONG owner drop-in is promoted ahead of it on purpose, and the ingested
    // NCERT chapter happens to contain both content terms.
    expect(laws.hits.some((h) => /thermodynamics/i.test(h.entry.title))).toBe(true);

    const shm = retrieve("explain simple harmonic motion", 4);
    expect(shm.coverage).not.toBe("strong");
  }, CORPUS_TIMEOUT);

  test("near-duplicate copies of one topic do not spend the record budget twice", () => {
    expect(titleKey("Newton's Law of Gravitation — General Characteristics")).toBe(
      titleKey("Newton's Law of Gravitation"),
    );
    expect(titleKey("Mole and its Relation with Mass, Volume and Number")).not.toBe(
      titleKey("Calculations Based on the Mole Concept"),
    );
    const result = retrieve("explain the mole concept", 6);
    const keys = result.hits.map((h) => titleKey(h.entry.title));
    expect(new Set(keys).size).toBe(keys.length);
  }, CORPUS_TIMEOUT);
});

describe("the complete-answer contract reaches the model", () => {
  test("roots → ideas → concepts, paste-with-polish, and images are all required", () => {
    for (const rule of [
      "ROOTS → IDEAS → CONCEPTS",
      "ROOT FIRST",
      "THEN EVERY IDEA IT NEEDS, ONE PER STEP",
      "COVER THE WHOLE SURFACE, NOT A SAMPLE",
      "PASTE THE VERIFIED KNOWLEDGE, POLISH THE GRAMMAR",
      "WHEN THE PLATFORM HAS NO DEDICATED MATERIAL",
      "REAL IMAGES INSIDE THE REPLY",
      "IMAGE FENCE",
      "NEVER invent, guess",
      "DRAW THE FIGURE YOURSELF WHEN NO SOURCE HAS ONE",
      "THE svg FENCE",
    ]) {
      expect(DEEP_ANSWER_RULES, `missing rule: ${rule}`).toContain(rule);
    }
    expect(MASTER_ACADEMIC_PROMPT).toContain("ROOTS → IDEAS → CONCEPTS");
    expect(MASTER_ACADEMIC_PROMPT).toContain("PASTE THE VERIFIED KNOWLEDGE");
  });

  test("the tutor is taught to draw what no source shows", () => {
    // Owner request 2026-09-30: "it should create visuals on screen with the
    // help of codes". The platform paints a fence whose language is svg, and
    // the prompt has to teach the exact shape the renderer accepts — a figure
    // the guard refuses silently becomes a code block instead of a picture.
    for (const rule of [
      "The platform renders that fence as a real picture in the reply",
      'viewBox="0 0 640 400"',
      "No script element, no style element, no on-event attributes",
      "no url(#...) references",
      "white card",
      "Caption it on the fence line itself",
      "svg is the only drawing language the platform paints",
      "Keep the drawing honest",
    ]) {
      expect(DEEP_ANSWER_RULES, `missing drawing rule: ${rule}`).toContain(rule);
    }
    expect(MASTER_ACADEMIC_PROMPT).toContain("DRAW THE FIGURE YOURSELF WHEN NO SOURCE HAS ONE");
  });

  test("nothing caps a complete answer at three sources any more", () => {
    expect(PROFESSOR_STYLE_RULES).toContain("USE EVERY source attached");
    expect(MASTER_ACADEMIC_PROMPT).not.toContain("AT MOST 3");
    expect(DEEP_ANSWER_RULES).not.toContain("never more than three");
  });

  test("the conversation-aware builder grounds on the thread's topic", () => {
    const context = buildCurriculumContextFor([
      { role: "user", content: "explain the working principle of a capacitor" },
      { role: "assistant", content: "A capacitor stores charge…" },
      { role: "user", content: "go deeper on that" },
    ]);
    expect(context).toContain("[CURRICULUM SOURCE");
    expect(context.toLowerCase()).toMatch(/capacit/);
  }, CORPUS_TIMEOUT);
});

describe("web grounding: real images and no truncation", () => {
  const results: WebSearchResult[] = [
    {
      title: "Nephron structure",
      link: "https://example.edu/nephron",
      snippet: "The nephron is the functional unit of the kidney.",
      displayLink: "example.edu",
      rawContent: "Bowman's capsule surrounds the glomerulus; the loop of Henle creates a salt gradient.",
      images: ["https://example.edu/img/nephron.png"],
    },
    {
      title: "Kidney anatomy",
      link: "https://who.int/kidney",
      snippet: "The kidney filters about 180 litres of plasma a day.",
      displayLink: "who.int",
    },
  ];

  test("image URLs are passed through with an embed instruction", () => {
    const context = formatSearchContext(results);
    expect(context).toContain("[REAL IMAGE URLS ATTACHED");
    expect(context).toContain("https://example.edu/img/nephron.png");
    expect(context).toContain("never invent an image URL");
    expect(context).toContain("Page extract:");
    expect(context).toContain("as per NASA, as per WHO");
  });

  test("no images attached means no image section and no false promise", () => {
    const context = formatSearchContext([results[1]]);
    expect(context).not.toContain("[REAL IMAGE URLS ATTACHED");
    expect(context).toContain("Ground the reply in at least two of these sources");
  });

  test("a complete answer may use every gathered source", () => {
    const many = Array.from({ length: 6 }, (_, i) => ({
      title: `Source ${i}`,
      link: `https://example${i}.edu/x`,
      snippet: `fact ${i}`,
      displayLink: `example${i}.edu`,
    }));
    const context = formatSearchContext(many);
    expect(context).toContain("use EVERY result that adds a fact");
    expect(context).not.toContain("never more than three");
    for (const source of many) expect(context).toContain(source.link);
  });

  test("nothing above is reachable from an empty result list", () => {
    expect(formatSearchContext([])).toBe("");
  });
});

describe("the output ceiling allows a complete topic", () => {
  test("the shared max-output ceiling is a complete-topic size, not a summary size", () => {
    // 1600/2048 tokens is roughly 1100–1400 words: the ceiling was the reason a
    // \"complete knowledge of X\" prompt came back as a summary.
    expect(MAX_OUTPUT_TOKENS).toBeGreaterThanOrEqual(4096);
  });
});
