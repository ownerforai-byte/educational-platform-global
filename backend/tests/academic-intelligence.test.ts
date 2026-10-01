import { beforeAll, describe, expect, test, vi } from "vitest";
import { getCorpus, resetCorpusCache } from "../src/ai/curriculum-corpus";
import {
  ACADEMIC_INTELLIGENCE_RULES,
  ACADEMIC_SEARCH_ADDENDUM,
  ACADEMIC_TAXONOMY_RULES,
  MASTER_ACADEMIC_RULES,
} from "../src/ai/academic-intelligence";
import {
  MASTER_ACADEMIC_PROMPT,
  PROFESSOR_STYLE_RULES,
  buildProfessorContext,
  withProfessorContext,
} from "../src/ai/prompts";
import { DEEP_ANSWER_RULES } from "../src/ai/deep-answer";
import { CLASS_SCOPE_RULES } from "../src/ai/class-scope";
import { SOURCE_REGISTRY_RULES } from "../src/ai/source-registry";

/**
 * Contract suite for the Master Academic Intelligence System.
 *
 * The academic layer is prompt text, so nothing about it can be type-checked —
 * these assertions are the compile step. They pin:
 *
 *  1. the house identity rules still win (name, Veer line, links-last),
 *  2. the academic engine's coverage (six subjects, depth, per-subject method),
 *  3. the classification/life-cycle/mind-map/flow vocabulary,
 *  4. the composition order used by /api/ai and /api/ai/guest — including the
 *     three grounding layers added 2026-09-30 (deep-answer contract, strict
 *     Class 11/12 scope, source hierarchy).
 */

/**
 * buildProfessorContext now reads the curriculum corpus from disk on its first
 * call, so it is genuinely I/O-bound rather than a pure string join. Give it
 * room instead of letting a cold read look like a broken contract.
 */
const CONTEXT_TIMEOUT = 30_000;

/**
 * Warm the corpus ONCE, before any assertion. With the owner's books ingested
 * the tree is ~1.7k records / 7 MB, and paying that read inside a test body is
 * what turned two of these into timeouts. Same rule (and same reason) as
 * curriculum-retrieval.test.ts: the I/O belongs in a beforeAll.
 */
beforeAll(() => {
  resetCorpusCache();
  getCorpus();
}, CONTEXT_TIMEOUT);

/** Lower-cased, whitespace-collapsed haystack for casing- and wrap-proof checks. */
const PROMPT = MASTER_ACADEMIC_PROMPT.toLowerCase().replace(/\s+/g, " ");
const ACADEMIC = ACADEMIC_INTELLIGENCE_RULES.toLowerCase().replace(/\s+/g, " ");
const TAXONOMY = ACADEMIC_TAXONOMY_RULES.toLowerCase().replace(/\s+/g, " ");

describe("master academic prompt composition", () => {
  test("stacks professor style rules, then the academic engine, then the grounding layers", () => {
    expect(MASTER_ACADEMIC_RULES).toBe(
      `${ACADEMIC_INTELLIGENCE_RULES}\n\n${ACADEMIC_TAXONOMY_RULES}`,
    );
    expect(MASTER_ACADEMIC_PROMPT.startsWith(PROFESSOR_STYLE_RULES)).toBe(true);
    expect(MASTER_ACADEMIC_PROMPT).toContain(ACADEMIC_INTELLIGENCE_RULES);
    expect(MASTER_ACADEMIC_PROMPT).toContain(ACADEMIC_TAXONOMY_RULES);

    // Owner addition 2026-09-30: the academic engine no longer CLOSES the
    // prompt — three grounding layers follow it (deep-answer contract, strict
    // Class 11/12 scope, source hierarchy). They must appear AFTER the engine,
    // in that order.
    const order = [
      PROFESSOR_STYLE_RULES,
      ACADEMIC_INTELLIGENCE_RULES,
      ACADEMIC_TAXONOMY_RULES,
      DEEP_ANSWER_RULES,
      CLASS_SCOPE_RULES,
      SOURCE_REGISTRY_RULES,
    ];
    let cursor = -1;
    for (const layer of order) {
      const at = MASTER_ACADEMIC_PROMPT.indexOf(layer);
      expect(at, `layer missing or out of order: ${layer.slice(0, 40)}…`).toBeGreaterThan(cursor);
      cursor = at;
    }
    expect(MASTER_ACADEMIC_PROMPT.endsWith(SOURCE_REGISTRY_RULES)).toBe(true);
  });

  test("keeps the tutor's identity and house style intact", () => {
    expect(PROMPT).toContain("you are veer");
    expect(PROMPT).toContain("👋, i'm veer — feel free to clear your doubts.");
    expect(PROMPT).toContain("explore further:");
    expect(PROMPT).toContain("in short:");
    expect(PROMPT).toContain("never call yourself any other name or title");
    // No self-reference to the word AI (owner rule 2026-09-28).
    expect(PROMPT).not.toContain("your name is \"ravikisan's ai tutor\"");
  });

  test("pins the one-surface-at-a-time law (owner 2026-10-01)", () => {
    // A reply must finish EVERY aspect of a concept before touching the next:
    // no interleaving, no trimming one topic to reach another, no ending with
    // a surface half-covered. This is an ABSOLUTE rule, so pin its load-bearing
    // clauses — drop the test if the rule is ever deliberately redesigned.
    expect(PROMPT).toContain("one surface at a time");
    expect(PROMPT).toContain("only then close the surface");
    expect(PROMPT).toContain("never interleave the aspects of two surfaces");
    expect(PROMPT).toContain("no jump to another topic unless the present one is fully presented");
  });

  test("tells every answer like a story, complete start to finish, from every attached source", () => {
    expect(PROMPT).toContain("the story shape");
    expect(PROMPT).toContain("complete knowledge, start to finish");
    // Owner change 2026-09-30: the old "AT LEAST 2 and AT MOST 3 sources" ceiling
    // is what capped complete answers — the tutor now uses every attached source,
    // with the floor of two still in place.
    expect(PROMPT).toContain("at least 2 sources and use every source attached to the message");
    expect(PROMPT).toContain("never one source alone, and never an artificial ceiling");
    expect(PROMPT).not.toContain("at most 3 sources");
    expect(PROMPT).toContain("from its first idea to its present state in conceptual order");
  });

  test("academic rules defer to the reply shape (no printed headings)", () => {
    expect(ACADEMIC).toContain("checklist of content, not a set of printed headings");
    expect(ACADEMIC).toContain("never announce");
  });

  test("carries no template artefacts and stays a sane size", () => {
    expect(MASTER_ACADEMIC_PROMPT).not.toContain("${");
    expect(MASTER_ACADEMIC_PROMPT).not.toContain("`");
    expect(MASTER_ACADEMIC_PROMPT.length).toBeGreaterThan(15_000);
    expect(MASTER_ACADEMIC_PROMPT.length).toBeLessThan(60_000);
  });

  test("buildProfessorContext returns the full contract when search is off", async () => {
    vi.stubEnv("TAVILY_API_KEY", "");
    const context = await buildProfessorContext("derive the lens maker formula");
    expect(context.startsWith(PROFESSOR_STYLE_RULES)).toBe(true);
    expect(context).toContain(ACADEMIC_TAXONOMY_RULES);
    // Grounding layers ride along on every request, not just the static prompt.
    expect(context).toContain("[DEEP ANSWER CONTRACT");
    expect(context).toContain("[CLASS SCOPE");
    expect(context).toContain("[SOURCE HIERARCHY");
    vi.unstubAllEnvs();
  }, CONTEXT_TIMEOUT);

  test("withProfessorContext merges into an existing system message or prepends one", () => {
    const merged = withProfessorContext(
      [
        { role: "system", content: "CLIENT" },
        { role: "user", content: "hi" },
      ],
      "CONTEXT",
    );
    expect(merged[0]).toEqual({ role: "system", content: "CLIENT\n\nCONTEXT" });
    expect(merged).toHaveLength(2);

    const prepended = withProfessorContext([{ role: "user", content: "hi" }], "CONTEXT");
    expect(prepended[0]).toEqual({ role: "system", content: "CONTEXT" });
    expect(prepended).toHaveLength(2);
  });
});

describe("academic engine coverage", () => {
  test("names all six subjects and the default curriculum frame", () => {
    for (const subject of [
      "physics",
      "chemistry",
      "biology",
      "mathematics",
      "english",
      "nepali",
    ]) {
      expect(ACADEMIC).toContain(subject);
    }
    expect(ACADEMIC).toContain("व्याकरण");
    expect(ACADEMIC).toContain("neb grade 11 and grade 12");
    expect(ACADEMIC).toContain("curriculum awareness");
    expect(ACADEMIC).toContain("cee / ioe");
    expect(ACADEMIC).toContain("never claim a topic belongs to a particular curriculum");
  });

  test("carries the knowledge model and all five depth levels", () => {
    expect(ACADEMIC).toContain("universal knowledge model");
    expect(ACADEMIC).toContain("foundation → definition → terminology → classification");
    expect(ACADEMIC).toContain("summary / revision");
    for (const level of ["level 1", "level 2", "level 3", "level 4", "level 5"]) {
      expect(ACADEMIC).toContain(level);
    }
    expect(ACADEMIC).toContain("academic depth engine");
  });

  test("keeps each subject's solving protocol", () => {
    expect(ACADEMIC).toContain("given → required → principle → formula");
    expect(ACADEMIC).toContain("dimensional consistency");
    expect(ACADEMIC).toContain("balance every equation");
    expect(ACADEMIC).toContain("reactants → conditions → mechanism → intermediate → products");
    expect(ACADEMIC).toContain("never confuse correlation with causation");
    expect(ACADEMIC).toContain("structure → function → location → inputs → steps → outputs");
    expect(ACADEMIC).toContain("theorem/concept → strategy → step-by-step derivation");
    expect(ACADEMIC).toContain("latex/katex");
    expect(ACADEMIC).toContain("never invent quotations or textual details");
    expect(ACADEMIC).toContain("पाठ परिचय");
  });

  test("ships complete-knowledge mode, exam mode and the difficulty ladder", () => {
    expect(ACADEMIC).toContain("complete knowledge mode");
    expect(ACADEMIC).toContain("topic overview");
    expect(ACADEMIC).toContain("final revision sheet");
    expect(ACADEMIC).toContain("exam mode");
    expect(ACADEMIC).toContain("1-mark");
    expect(ACADEMIC).toContain("2-mark");
    expect(ACADEMIC).toContain("3–4 mark");
    expect(ACADEMIC).toContain("long answer");
    expect(ACADEMIC).toContain("certain to appear");
    expect(ACADEMIC).toContain("l1 recall · l2 understanding · l3 application · l4 analysis");
    expect(ACADEMIC).toContain("l6 advanced problem-solving");
  });

  test("detects misconceptions, researches and refuses to fabricate", () => {
    expect(ACADEMIC).toContain("misconception detector");
    expect(ACADEMIC).toContain("counterexample");
    expect(ACADEMIC).toContain("never embarrass the learner");
    expect(ACADEMIC).toContain("tavily");
    expect(ACADEMIC).toContain("[real-time internet search results]");
    expect(ACADEMIC).toContain("cross-check");
    expect(ACADEMIC).toContain("primary source");
    expect(ACADEMIC).toContain("hypothesis · speculation");
    expect(ACADEMIC).toContain("never fabricate references");
    expect(ACADEMIC).toContain("knowledge boundary");
  });

  test("keeps the structure, comparison and problem-solving engines", () => {
    expect(ACADEMIC).toContain("answer structure");
    expect(ACADEMIC).toContain("comparison engine");
    expect(ACADEMIC).toContain("problem-solving engine");
    expect(ACADEMIC).toContain("step 6 interpret");
    expect(ACADEMIC).toContain("output quality control");
    expect(ACADEMIC).toContain("personalised teaching");
    expect(ACADEMIC).toContain("understand → classify → identify prerequisites → map the knowledge structure");
  });

  test("the search addendum keeps the academic floor", () => {
    const addendum = ACADEMIC_SEARCH_ADDENDUM.toLowerCase();
    expect(addendum).toContain("kingdom");
    expect(addendum).toContain("life cycle");
    expect(addendum).toContain("mind map");
    expect(addendum).toContain("flow");
    expect(addendum).toContain("never invent a source");
  });
});


describe("adaptive teaching contract (2026-09-28)", () => {
  test("every reply teaches new words and adapts to the learner", () => {
    expect(PROMPT).toContain("teach a new word in every reply");
    expect(PROMPT).toContain("never repeat a word already taught earlier in this conversation");
    expect(PROMPT).toContain("understand the student, then teach in their way");
  });

  test("detects emotion and switches to romantic mode on romantic topics", () => {
    expect(PROMPT).toContain("emotion awareness and mode switching");
    expect(PROMPT).toContain("switch to romantic mode");
    expect(PROMPT).toContain("age-appropriate");
    expect(PROMPT).toContain("meet the feeling first");
  });

  test("aims for many ideas in conceptual order, past to present", () => {
    expect(PROMPT).toContain("large number of genuinely distinct ideas");
    expect(PROMPT).toContain("conceptual order");
    expect(PROMPT).toContain("past → present");
    expect(PROMPT).toContain("exempt from the ordinary word target");
  });
});

describe("classification, life-cycle, mind-map and flow engine", () => {
  test("carries the full taxonomic ladder and nomenclature rules", () => {
    for (const rank of [
      "domain",
      "kingdom",
      "phylum",
      "division",
      "class",
      "order",
      "family",
      "genus",
      "species",
    ]) {
      expect(TAXONOMY).toContain(rank);
    }
    expect(TAXONOMY).toContain("taxon");
    expect(TAXONOMY).toContain("linnaeus");
    expect(TAXONOMY).toContain("homo sapiens");
    expect(TAXONOMY).toContain("mangifera indica");
    expect(TAXONOMY).toContain("icbn, iczn, icnb");
    expect(TAXONOMY).toContain("type specimen");
  });

  test("teaches the kingdoms with their criteria and the domain system", () => {
    for (const kingdom of ["monera", "protista", "fungi", "plantae", "animalia"]) {
      expect(TAXONOMY).toContain(kingdom);
    }
    expect(TAXONOMY).toContain("whittaker, 1969");
    expect(TAXONOMY).toContain("woese, 1977");
    expect(TAXONOMY).toContain("archaea");
    expect(TAXONOMY).toContain("eukarya");
    expect(TAXONOMY).toContain("16s rrna");
    expect(TAXONOMY).toContain("lichens");
  });

  test("lists the phyla and divisions with named examples", () => {
    for (const phylum of [
      "porifera",
      "coelenterata",
      "ctenophora",
      "platyhelminthes",
      "aschelminthes",
      "annelida",
      "arthropoda",
      "mollusca",
      "echinodermata",
      "hemichordata",
      "chordata",
      "urochordata",
      "cephalochordata",
      "vertebrata",
    ]) {
      expect(TAXONOMY).toContain(phylum);
    }
    expect(TAXONOMY).toContain("rhizopoda");
    expect(TAXONOMY).toContain("ciliophora");
    expect(TAXONOMY).toContain("apicomplexa");
    expect(TAXONOMY).toContain("phycomycetes");
    expect(TAXONOMY).toContain("deuteromycetes");
    expect(TAXONOMY).toContain("bryophytes");
    expect(TAXONOMY).toContain("pteridophytes");
    expect(TAXONOMY).toContain("gymnosperms");
    expect(TAXONOMY).toContain("angiosperms");
    expect(TAXONOMY).toContain("diagnostic feature");
  });

  test("keeps the three life-cycle patterns with ploidy and examples", () => {
    expect(TAXONOMY).toContain("life-cycle engine");
    expect(TAXONOMY).toContain("haplontic (zygotic meiosis)");
    expect(TAXONOMY).toContain("diplontic (gametic meiosis)");
    expect(TAXONOMY).toContain("haplo-diplontic (sporic meiosis");
    expect(TAXONOMY).toContain("alternation of generations");
    expect(TAXONOMY).toContain("gametophyte");
    expect(TAXONOMY).toContain("sporophyte");
    expect(TAXONOMY).toContain("ploidy");
    expect(TAXONOMY).toContain("prothallus");
    expect(TAXONOMY).toContain("metamorphosis");
    expect(TAXONOMY).toContain("metagenesis");
    expect(TAXONOMY).toContain("plasmodium");
    expect(TAXONOMY).toContain("taenia solium");
    expect(TAXONOMY).toContain("ascaris");
    expect(TAXONOMY).toContain("definitive host");
  });

  test("defines the mind-map and flow output formats", () => {
    expect(TAXONOMY).toContain("mind-map engine");
    expect(TAXONOMY).toContain("one root concept");
    expect(TAXONOMY).toContain("3–6 primary branches");
    expect(TAXONOMY).toContain("exam traps");
    expect(TAXONOMY).toContain("/mindmap");
    expect(TAXONOMY).toContain("/lab");
    expect(TAXONOMY).toContain("flow engine");
    expect(TAXONOMY).toContain("start → step → step");
    expect(TAXONOMY).toContain("decision points");
    expect(TAXONOMY).toContain("wrapped arrow back to the start");
    expect(TAXONOMY).toContain("choosing the right visual");
  });
});
