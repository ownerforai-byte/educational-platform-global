/**
 * ═══════════════════════════════════════════════════════════════════════════
 * CONTENT ORGANIZATION SYSTEM — MANDATORY RULES FOR ALL AGENTS
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * This system enforces that ALL content (notes, lessons, concepts, sets,
 * examples, formula sheets, mindmaps, PYQs) is placed under the correct
 * syllabus unit AND topic — never free-floating.
 *
 * ─────────────────────────────────────────────────────────────────────
 * RULE 1: SYLLABUS IS THE SINGLE SOURCE OF TRUTH
 * ─────────────────────────────────────────────────────────────────────
 *
 * The syllabus structure is:
 *
 *   Class (class-11-notes / class-12-notes / class-11e / etc.)
 *     └── Subject (physics / chemistry / mathematics / biology / english / nepali)
 *           └── Unit (e.g. "Kinematics", "Vectors", "Stoichiometry")
 *                 └── Topics (array of strings, official NEB topic titles)
 *
 * Every piece of content MUST live under one specific unit → topic.
 *
 * ─────────────────────────────────────────────────────────────────────
 * RULE 2: BEFORE CREATING ANY NOTE — IDENTIFY ITS PLACEMENT
 * ─────────────────────────────────────────────────────────────────────
 *
 * When an agent receives content to add, it MUST:
 *
 *   1. Identify the SUBJECT (physics, chemistry, math, biology, english, nepali)
 *   2. Find the correct CLASS TRACK (class-11-notes for standard notes,
 *      class-11e for extended, class-11-more for supplementary)
 *   3. Look up the SYLLABUS for that class+subject to find all units and topics
 *   4. MATCH the content against syllabus topics by:
 *        a. Keyword overlap (topic title words appear in content)
 *        b. Semantic relevance (content describes the same concepts)
 *        c. Curriculum position (content fits after previously-added topics)
 *   5. Assign a RELEVANCE SCORE (0–100%) — how well does this content
 *        match each candidate topic?
 *   6. Place the content UNDER the topic with the highest score (>30%)
 *
 * If NO topic scores above 30%, the content does NOT belong in this
 * class track. Flag it for manual review.
 *
 * ─────────────────────────────────────────────────────────────────────
 * RULE 3: DIRECTORY STRUCTURE
 * ─────────────────────────────────────────────────────────────────────
 *
 * Content MUST be stored at:
 *
 *   content/ravikishan/{classSlug}/{subjectSlug}/{unitSlug}/
 *     ├── concepts/        ← explanatory notes, definitions, derivations
 *     ├── formula/         ← formula sheets
 *     ├── notes/           ← general notes (fallback when topic is broad)
 *     ├── pyqs/            ← previous year questions
 *     ├── sets/            ← problem sets
 *     ├── examples/        ← worked examples
 *     ├── mindmap/         ← concept map JSON files
 *     └── README.md        ← brief description of the unit
 *
 * The {unitSlug} MUST match the syllabus unit.id exactly.
 *
 * ─────────────────────────────────────────────────────────────────────
 * RULE 4: TOPIC-LEVEL ORGANIZATION
 * ─────────────────────────────────────────────────────────────────────
 *
 * Under each unit directory, content is further organized by topic:
 *
 *   content/ravikishan/{classSlug}/{subjectSlug}/{unitSlug}/concepts/
 *     ├── 01-topic-slug.json    ← notes for topic 1
 *     ├── 02-topic-slug.json    ← notes for topic 2
 *     └── ...
 *
 * The file name MUST follow the pattern:
 *   {pad(2)}.{topic-slug}.json
 *
 * Where topic-slug is generated from the topic title using:
 *   - lowercase
 *   - replace spaces with hyphens
 *   - remove special characters
 *   - truncate to 60 chars
 *
 * Example: "Law of Conservation of Mass" → "01-law-of-conservation-of-mass.json"
 *
 * ─────────────────────────────────────────────────────────────────────
 * RULE 5: JSON NOTE FORMAT
 * ─────────────────────────────────────────────────────────────────────
 *
 * Each note JSON file must have this structure:
 *
 *   {
 *     "title": "Human-readable title",
 *     "unitSlug": "unit-id-from-syllabus",
 *     "topicSlug": "topic-slug-from-title",
 *     "topicTitle": "Exact syllabus topic title",
 *     "relevance": 85,          ← percentage (0-100)
 *     "notes": [
 *       "**Bold concept** explanation text",
 *       "Another point with **formatting**"
 *     ],
 *     "type": "concept" | "formula" | "problem" | "pyq"
 *   }
 *
 * ─────────────────────────────────────────────────────────────────────
 * RULE 6: WHAT TO DO WHEN PDFs OR RAW TEXT ARE PROVIDED
 * ─────────────────────────────────────────────────────────────────────
 *
 * When the user provides a PDF, raw text, or unstructured content:
 *
 *   1. Do NOT add it directly to any directory
 *   2. FIRST parse and identify its subject and class level
 *   3. THEN match it against the syllabus using the matching system
 *   4. THEN create properly structured JSON files under the right unit
 *   5. NEVER create content outside the syllabus structure
 *
 * ─────────────────────────────────────────────────────────────────────
 * RULE 7: NEVER CREATE FREE-FLOATING CONTENT
 * ─────────────────────────────────────────────────────────────────────
 *
 * The following are FORBIDDEN:
 *   ❌ Creating a file outside content/ravikishan/{class}/{subject}/{unit}/
 *   ❌ Creating a unit directory that doesn't exist in the syllabus
 *   ❌ Placing a note in "general" or "misc" folders
 *   ❌ Using arbitrary file names instead of the topic-slug pattern
 *
 * The following are REQUIRED:
 *   ✅ Every note has unitSlug, topicSlug, and relevance
 *   ✅ Every unit directory has a mindmap/ file
 *   ✅ Every topic has at least a concept note OR is flagged NOT_ADDED
 *
 * ─────────────────────────────────────────────────────────────────────
 * RULE 8: MINDMAPS ARE AUTOMATIC — BUT CAN BE OVERRIDDEN
 * ─────────────────────────────────────────────────────────────────────
 *
 * Mindmaps are auto-generated from the syllabus (queries.ts).
 * To add a custom mindmap:
 *   1. Create content/ravikishan/{class}/{subject}/{unit}/mindmap/{slug}.json
 *   2. Include "notes" as an indented outline (top-level = root, each indent = child)
 *   3. The update-mindmaps script will pick it up automatically
 *
 * ─────────────────────────────────────────────────────────────────────
 * VIOLATION = CONTENT REJECTION
 * ─────────────────────────────────────────────────────────────────────
 *
 * Any content added without following these rules WILL BE REJECTED
 * and must be re-organized before merging.
 *
 * Every agent MUST obey these rules. No exceptions.
 * ═══════════════════════════════════════════════════════════════════════════
 */

import type {
  SyllabusUnit,
  SubjectSyllabus,
  ClassSyllabus,
} from "@/lib/syllabus";

/**
 * Match a piece of content against all syllabus topics and return scored results.
 * Higher relevance % = better match.
 */
export function matchContentToSyllabus(
  content: string,
  classSlug: string,
  subjectSlug: string,
  maxResults = 3,
): MatchResult[] {
  const cls = getClassSyllabus(classSlug);
  if (!cls) return [];
  const subject = cls.subjects.find((s) => s.slug === subjectSlug);
  if (!subject) return [];

  const contentLower = content.toLowerCase();
  const results: MatchResult[] = [];

  for (const unit of subject.units) {
    for (const topic of unit.topics) {
      const score = calculateRelevance(contentLower, topic);
      if (score > 15) {
        results.push({
          unitId: unit.id,
          unitTitle: unit.title,
          topicTitle: topic,
          topicSlug: slugifyTopic(topic),
          relevance: score,
          unitOrder: subject.units.indexOf(unit),
          topicOrder: unit.topics.indexOf(topic),
        });
      }
    }
  }

  return results
    .sort((a, b) => b.relevance - a.relevance || a.unitOrder - b.unitOrder)
    .slice(0, maxResults);
}

export interface MatchResult {
  unitId: string;
  unitTitle: string;
  topicTitle: string;
  topicSlug: string;
  relevance: number;
  unitOrder: number;
  topicOrder: number;
}

function calculateRelevance(content: string, topic: string): number {
  const topicWords = topic
    .toLowerCase()
    .split(/[\s\-:,;./\\()]+/)
    .filter((w) => w.length > 2);

  if (topicWords.length === 0) return 0;

  let score = 0;
  let matched = 0;

  for (const word of topicWords) {
    if (content.includes(word)) {
      matched++;
      // Bonus for exact phrase match
      if (content.includes(topic.toLowerCase().slice(0, 20))) {
        score += 3;
      }
    }
    // Partial match (word is substring of content)
    const wordRegex = new RegExp(word, "i");
    if (wordRegex.test(content)) {
      matched++;
    }
  }

  // Base score from keyword overlap
  const overlapScore = (matched / topicWords.length) * 50;
  score += overlapScore;

  // Bonus for topic appearing as substring in content
  if (content.includes(topic.toLowerCase().slice(0, 10))) {
    score += 20;
  }

  // Bonus for mathematical/chemical symbols matching topic domain
  const domainKeywords: Record<string, string[]> = {
    physics: ["force", "velocity", "acceleration", "energy", "momentum", "field", "wave", "light", "heat", "electric", "magnetic", "gravity", "motion", "pressure"],
    chemistry: ["mole", "atom", "molecule", "bond", "reaction", "acid", "base", "salt", "element", "compound", "solution", "oxidation", "reduction", "equilibrium"],
    mathematics: ["function", "equation", "derivative", "integral", "matrix", "vector", "theorem", "proof", "algebra", "geometry", "calculus", "trigonometry"],
    biology: ["cell", "organism", "dna", "protein", "enzyme", "ecosystem", "evolution", "photosynthesis", "respiration", "gene", "chromosome"],
  };

  const subjectSlug = content.includes("physics") ? "physics"
    : content.includes("chemistry") ? "chemistry"
    : content.includes("math") ? "mathematics"
    : content.includes("biology") ? "biology" : null;

  if (subjectSlug && domainKeywords[subjectSlug]) {
    const domainTerms = domainKeywords[subjectSlug];
    const domainMatches = domainTerms.filter((t) => content.includes(t));
    score += domainMatches.length * 2;
  }

  return Math.min(100, Math.round(score));
}

function slugifyTopic(topic: string): string {
  return topic
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

export function getClassSyllabus(classSlug: string): ClassSyllabus | undefined {
  // Re-exported from syllabus.ts at runtime; here for type safety
  throw new Error("Use getSyllabusByClass from syllabus.ts instead");
}

export function getTopicPath(
  classSlug: string,
  subjectSlug: string,
  unitId: string,
  topicSlug: string,
): string {
  return `content/ravikishan/${classSlug}/${subjectSlug}/${unitId}/concepts/${topicSlug}.json`;
}

export function getUnitPath(
  classSlug: string,
  subjectSlug: string,
  unitId: string,
): string {
  return `content/ravikishan/${classSlug}/${subjectSlug}/${unitId}`;
}
