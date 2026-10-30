import { getCorpus } from "./src/ai/curriculum-corpus";
import { retrieveCurriculum, retrieve } from "./src/ai/curriculum-retrieval.ts";

const q = "why is electric field zero inside a conductor";
const hits = retrieveCurriculum(q, 25);
console.log("HITS:", hits.length);
hits.slice(0, 30).forEach((h, i) => {
  console.log(
    String(i).padStart(2),
    "score=" + h.score,
    "strength=" + h.strength,
    (h.entry.source || "").slice(0, 70),
    "|",
    h.entry.title.slice(0, 60),
  );
});

const corpus = getCorpus();
const drills = corpus.entries.filter((e) => e.source?.startsWith("content/drills/"));
console.log("\nTOTAL DRILL RECORDS IN CORPUS:", drills.length);
const electro = drills.filter((e) => e.subject === "physics" && /electrostatic/i.test(e.unit + " " + e.title));
console.log("PHYSICS ELECTROSTATICS DRILL RECORDS:", electro.length);
electro.forEach((e) => console.log("  -", e.id, "|", e.source, "|", e.title, "| relevance=", e.relevance, "| chars=", e.contentChars, "| filler=", e.filler));

// Does the raw scoring even consider the drill?
const r = retrieve(q, 50);
const idx = r.hits.findIndex((h) => h.entry.source?.startsWith("content/drills/"));
console.log("\nIn top-50 ranked hits, first drill at index:", idx === -1 ? "NONE" : idx);
console.log("coverage:", r.coverage, "| matchedTerms:", r.matchedTerms);
