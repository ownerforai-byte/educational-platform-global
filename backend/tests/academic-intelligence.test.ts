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

  test("every academic figure is drawn (two fence langs) and every labelled part is hoverable (owner 2026-10-03)", () => {
    // Owner 2026-10-03: "agnes image is just drawing rough image ---- train it for
    // all kind of academic images like lifecycle, labelling, all parts name with
    // their interface with supporting details which opens after hovering".
    //
    // Solution in the contract: the tutor draws the figure itself as ONE complete
    // fenced drawing, NEVER describes it or hands the student prose instead of a
    // picture. When the figure carries labelled parts, EACH part is wrapped in its
    // own <g><title>NAME — detail</title> so the platform explains the part on
    // hover or click. The platform RENDERS the figure inline (no "does not have a
    // viewer yet"); it never leaves the figure as a broken link or a 404.
    //
    // The svg-fence section was expanded from a bare svg only into TWO supported
    // drawing languages (svg, the platform's figure/rofem.svg figure fence), with
    // ONE shared hover/explainer rule for both, so an academic figure is drawn —
    // not a rough picture — on every surface (note pages, topic pages, the figure
    // viewer, and the Image Hub).

    expect(PROMPT).toContain("DRAW THE FIGURE YOURSELF WHEN NO SOURCE HAS ONE (OWNER RULE) — TWO FENCE LANGUAGES, BOTH PAINTED");
    expect(PROMPT).toContain("THE svg FENCE — best for ANY figure that must carry many labelled parts");
    expect(PROMPT).toContain("THE rofem.svg FIGURE FENCE");
    expect(PROMPT).toContain("SAME HOVER/EXPLAINER CONFIG FOR BOTH FENCE KINDS");
    expect(PROMPT).toContain("<title>ONE-LINE name + what it does + how it links to / fits in the parts around it</title>");

    // The shared archetype guide (12 figure shapes: lifecycle, labelled structure,
    // apparatus, process, graph, circuit, ray, free-body, geometry, hierarchy,
    // comparison, timeline) is wired into the figure section on every request.
    expect(PROMPT).toContain("${FIGURE_ARCHETYPE_GUIDE}");
    expect(PROMPT).toContain("LIFE CYCLE");
    expect(PROMPT).toContain("LABELLED STRUCTURE");
    expect(PROMPT).toContain("every part an examiner can name");

    // Allowed/forbidden SVG rules the model's drawings must respect — the same
    // set the renderer enforces (backend/src/ai/academic-figures.ts).
    expect(PROMPT).toContain("ALLOWED elements ONLY: svg, g, title, text, tspan, rect, circle, ellipse, line, polyline, polygon, path");
    expect(PROMPT).toContain("no url(#...) references");
    expect(PROMPT).toContain("on-event attribute (onload/onclick/etc.)");
    expect(PROMPT).toContain("no external files");

    // The figure is announced on its fence line and the tab/keyboard path is
    // mentioned, so authors know the part is keyboard focusable.
    expect(PROMPT).toContain("caption it on the fence line");
    expect(PROMPT).toContain("hazard a reader can tab to");

    // Wire the backend test double onto the figure module exactly as the real
    // prompt does, so this assertion fails if the import breaks.
    expect(PROMPT, "wires FIGURE_WRITER_SYSTEM").toContain("${FIGURE_WRITER_SYSTEM}");
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

  test("academic rules define the specialist contract without imposing headings", () => {
    expect(ACADEMIC).toContain("draft-and-verify");
    expect(ACADEMIC).toContain("senior science & language academic specialist");
    expect(ACADEMIC).toContain("unless asked otherwise");
  });

  test("carries no stray template artefacts and stays a sane size", () => {
    // `${…}` in the contract text is intentional wiring, not a stray template
    // token (it resolves to the loaded module strings at runtime).
    expect(MASTER_ACADEMIC_PROMPT.length).toBeGreaterThan(15_000);
    expect(MASTER_ACADEMIC_PROMPT.length).toBeLessThan(60_000);
    expect(MASTER_ACADEMIC_PROMPT).toContain("${FIGURE_ARCHETYPE_GUIDE}");
    expect(MASTER_ACADEMIC_PROMPT).toContain("${FIGURE_WRITER_SYSTEM}");
    expect(MASTER_ACADEMIC_PROMPT).not.toContain('`${"');
    expect(MASTER_ACADEMIC_PROMPT).not.toContain("${\"");
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

describe("academic specialist contract coverage", () => {
  test("names all six subjects and the NEB Class 11/12 Science frame", () => {
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
    expect(ACADEMIC).toContain("neb (national examinations board, nepal)");
    expect(ACADEMIC).toContain("class 11 and class 12 science");
    expect(ACADEMIC).toContain("व्याकरणिक");
    expect(ACADEMIC).toContain("नेपाली बृहत् शब्दकोश");
  });

  test("pins the draft-and-verify reasoning instruction and dictionary sources", () => {
    expect(ACADEMIC).toContain("draft-and-verify");
    expect(ACADEMIC).toContain("cdc (curriculum development centre)");
    expect(ACADEMIC).toContain("oxford/cambridge");
    expect(ACADEMIC).toContain("do not summarize steps");
    expect(ACADEMIC).toContain("complete proofs and complete reaction mechanisms");
  });

  test("keeps each subject's domain rules", () => {
    // Physics & Chemistry
    expect(ACADEMIC).toContain("boundary conditions and initial assumptions");
    expect(ACADEMIC).toContain("si units");
    expect(ACADEMIC).toContain("iupac naming");
    expect(ACADEMIC).toContain("oxidation states");
    expect(ACADEMIC).toContain("electron flow mechanisms");
    // Biology
    expect(ACADEMIC).toContain("binomial nomenclature");
    expect(ACADEMIC).toContain("double-stranded right-handed b-dna helix");
    expect(ACADEMIC).toContain("oxidative phosphorylation");
    // Mathematics
    expect(ACADEMIC).toContain("given,");
    expect(ACADEMIC).toContain("to prove,");
    expect(ACADEMIC).toContain("initial conditions,");
    expect(ACADEMIC).toContain("proof");
    // English & Nepali
    expect(ACADEMIC).toContain("etymology");
    expect(ACADEMIC).toContain("part-of-speech");
  });

  test("ships the five-section structural response template with exam focus", () => {
    expect(ACADEMIC).toContain("formal textbook definition / lexical meaning");
    expect(ACADEMIC).toContain("core theoretical principles & assumptions");
    expect(ACADEMIC).toContain("complete mathematical derivation / chemical mechanism / biological process");
    expect(ACADEMIC).toContain("technical vocabulary & etymology breakdown");
    expect(ACADEMIC).toContain("standard neb examination application");
    expect(ACADEMIC).toContain("4-mark");
    expect(ACADEMIC).toContain("8-mark");
  });

  test("tells answers as a dated, ascending story from history to the future", () => {
    expect(ACADEMIC).toContain("history → present → future");
    expect(ACADEMIC).toContain("ascending");
    expect(ACADEMIC).toContain("extra keywords");
    expect(ACADEMIC).toContain("ground every reply in the source");
    expect(ACADEMIC).toContain("story-like flow");
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
