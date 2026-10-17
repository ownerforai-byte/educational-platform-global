import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SUBJECT_NAMES = {
  biology: "Biology",
  chemistry: "Chemistry",
  english: "English",
  mathematics: "Mathematics",
  nepali: "Nepali",
  physics: "Physics",
};

const STOP_WORDS = new Set([
  "a", "about", "after", "all", "and", "are", "as", "at", "be", "by",
  "can", "chapter", "class", "explain", "for", "from", "give", "how",
  "in", "is", "it", "of", "on", "or", "please", "show", "the", "to",
  "topic", "unit", "what", "when", "where", "which", "who", "why", "with",
]);

function words(text) {
  return String(text)
    .toLocaleLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
    .split(/\s+/u)
    .filter((word) => word && !STOP_WORDS.has(word));
}

function displayTitle(slug) {
  return String(slug ?? "")
    .split(/[-_]+/u)
    .filter(Boolean)
    .map((part) => part.charAt(0).toLocaleUpperCase() + part.slice(1))
    .join(" ");
}

function collectText(value, into = [], depth = 0) {
  if (depth > 8 || into.length >= 120) return into;
  if (typeof value === "string") {
    into.push(value);
  } else if (Array.isArray(value)) {
    for (const item of value) collectText(item, into, depth + 1);
  } else if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      if (["animation3D", "motionGraphics", "visualType", "generatedAt"].includes(key)) continue;
      collectText(item, into, depth + 1);
    }
  }
  return into;
}

function sourceFileText(data) {
  const parts = [];
  for (const field of ["notes", "enrichedContent", "originalContent", "summary", "keyPoints", "formulas", "examples", "importantConcepts", "importantStatements", "importantNotes", "specialNotes", "universalFacts", "practiceQuestions", "exercises", "examNotes", "examShortTricks", "bounds", "mcqs", "confusion", "nepali", "grammar"]) {
    if (field in data) collectText(data[field], parts);
  }
  return parts.join("\n").slice(0, 35_000);
}

function termsFor(entry) {
  const description = `${entry.title} ${entry.subjectSlug} ${entry.subject} ${entry.unit} ${entry.topicSlug.replaceAll("-", " ")}`;
  return [...new Set(words(description))];
}

function buildUrl(entry) {
  const classSlug = entry.classSlug;
  const subjectSlug = entry.subjectSlug;
  const unitSlug = entry.unitSlug;
  const topicSlug = entry.topicSlug;
  if (!classSlug || !subjectSlug || !unitSlug || !topicSlug) return "";
  return `/${classSlug}/${subjectSlug}/chapters/${unitSlug}/topics/${topicSlug}`;
}

/** Resolve repository roots without relying on the shell's current directory. */
export function resolveRepoRoot(startDir = path.dirname(fileURLToPath(import.meta.url))) {
  let current = path.resolve(startDir);
  for (;;) {
    if (
      fs.existsSync(path.join(current, "frontend", "public", "data", "content-ledger.json")) &&
      fs.existsSync(path.join(current, "frontend", "public", "data", "ravikishan", "manifest.json"))
    ) return current;
    const parent = path.dirname(current);
    if (parent === current) throw new Error("Could not find the repository curriculum data files.");
    current = parent;
  }
}

export function createCurriculumCatalog({ repoRoot = resolveRepoRoot() } = {}) {
  const dataRoot = path.join(repoRoot, "frontend", "public", "data");
  const ledgerPath = path.join(dataRoot, "content-ledger.json");
  const supplementaryManifestPath = path.join(dataRoot, "ravikishan", "manifest.json");
  const ledger = JSON.parse(fs.readFileSync(ledgerPath, "utf8"));
  const supplementary = JSON.parse(fs.readFileSync(supplementaryManifestPath, "utf8"));
  const supplementaryStatuses = new Map(
    Object.values(ledger.supplementary?.groups ?? {}).flatMap((group) =>
      (group.entries ?? []).map((entry) => [entry.path, entry.status]),
    ),
  );
  const entries = [];
  const authoredContentByTopic = new Map();
  const seen = new Map();

  const add = (entry) => {
    if (!entry.title || !entry.topicSlug || !entry.subjectSlug || !entry.unitSlug) return;
    if (!/^(biology|chemistry|english|mathematics|nepali|physics)$/u.test(entry.subjectSlug)) return;
    if (entry.status && entry.status !== "authored") return;
    const key = `${entry.classSlug}/${entry.subjectSlug}/${entry.unitSlug}/${entry.topicSlug}`;
    const priorIndex = seen.get(key);
    if (priorIndex !== undefined) {
      if (entries[priorIndex].text.length < (entry.text ?? "").length) {
        entries[priorIndex] = { ...entries[priorIndex], ...entry };
      }
      return;
    }
    seen.set(key, entries.length);
    entries.push({
      ...entry,
      subject: SUBJECT_NAMES[entry.subjectSlug] ?? displayTitle(entry.subjectSlug),
      source: entry.source ?? "curriculum catalog",
      url: buildUrl(entry),
      searchText: `${entry.title} ${entry.subjectSlug} ${entry.subject} ${entry.unit} ${entry.topicSlug.replaceAll("-", " ")} ${entry.text}`,
      terms: termsFor(entry),
    });
  };

  for (const [subjectSlug, subject] of Object.entries(ledger.subjects ?? {})) {
    for (const [unitSlug, unit] of Object.entries(subject.units ?? {})) {
      for (const item of unit.entries ?? []) {
        const classSlug = "class-11-notes";
        const file = path.join(dataRoot, "syllabus-notes", subjectSlug, unitSlug, item.filename);
        let data = {};
        try {
          data = JSON.parse(fs.readFileSync(file, "utf8"));
        } catch {
          continue;
        }
        if (item.status !== "authored") continue;
        add({
          classSlug,
          className: "Class 11",
          subjectSlug,
          unitSlug,
          topicSlug: item.topicSlug || data.topicSlug,
          status: item.status,
          title: data.topicTitle || data.title || displayTitle(item.topicSlug),
          unit: displayTitle(unitSlug),
          text: sourceFileText(data),
          source: "Class 11 notes",
        });
      }
    }
  }

  for (const item of supplementary) {
    const data = item?.data;
    if (!data || typeof item.path !== "string") continue;
    const segments = item.path.split("/");
    const classSlug = segments[0];
    if (!/^class-(11|12)(-notes)?$/u.test(classSlug)) continue;
    const className = classSlug.startsWith("class-12") ? "Class 12" : "Class 11";
    const subjectSlug = segments[1];
    const unitSlug = data.unitSlug || segments[2];
    const status = supplementaryStatuses.get(item.path);
    if (status !== "authored") continue;
    const text = sourceFileText(data);
    if (data.source !== "generated") {
      authoredContentByTopic.set(`${classSlug}/${subjectSlug}/${unitSlug}/${data.topicSlug}`, text);
    }
    add({
      classSlug,
      className,
      subjectSlug,
      unitSlug,
      topicSlug: data.topicSlug,
      status,
      title: data.topicTitle || data.title || displayTitle(data.topicSlug),
      unit: displayTitle(unitSlug),
      text,
      source: data.source === "generated" ? "Generated curriculum content" : "Ravikisan study materials",
    });
  }

  for (const entry of entries) {
    const key = `${entry.classSlug}/${entry.subjectSlug}/${entry.unitSlug}/${entry.topicSlug}`;
    const authoredContent = authoredContentByTopic.get(key);
    if (authoredContent && entry.text.length < authoredContent.length) {
      entry.text = authoredContent;
      entry.searchText = `${entry.title} ${entry.subjectSlug} ${entry.subject} ${entry.unit} ${entry.topicSlug.replaceAll("-", " ")} ${authoredContent}`;
    }
  }

  return Object.freeze({
    size: entries.length,
    entries: Object.freeze(entries),
    search(query, options = {}) {
      const { subject, classLevel, limit = 6, minScore = 1 } = options;
      const tokens = words(query);
      if (tokens.length === 0) return [];
      const normalizedSubject = subject ? String(subject).toLocaleLowerCase().trim() : "";
      const normalizedClass = classLevel ? String(classLevel).match(/11|12/u)?.[0] ?? "" : "";
      return entries
        .filter((entry) => {
          if (normalizedSubject && !`${entry.subjectSlug} ${entry.subject}`.toLocaleLowerCase().includes(normalizedSubject)) return false;
          if (normalizedClass && !entry.className.toLocaleLowerCase().replace(/\s+/gu, "").endsWith(normalizedClass)) return false;
          return true;
        })
        .map((entry) => {
          const titleWords = new Set(words(`${entry.title} ${entry.unit} ${entry.subject}`));
          const titleTokens = words(`${entry.title} ${entry.unit} ${entry.subject}`);
          const termWords = new Set(entry.terms);
          const searchWords = new Set(words(entry.searchText));
          let score = 0;
          let titleMatches = 0;
          let contentMatches = 0;
          for (const token of tokens) {
            if (titleWords.has(token)) {
              score += 5;
              titleMatches++;
            } else if (titleTokens.some((word) => word.startsWith(token))) {
              score += 3;
              titleMatches++;
            } else if (termWords.has(token)) score += 2;
            else if (searchWords.has(token)) {
              score += 1;
              contentMatches++;
            }
          }
          const matchedTerms = tokens.filter((token) => searchWords.has(token));
          return { entry, score, titleMatches, contentMatches, matchedTerms };
        })
        .filter((result) => result.score >= minScore && (result.titleMatches > 0 || (result.contentMatches > 0 && tokens.length > 0)))
        .sort((a, b) => b.titleMatches - a.titleMatches || b.score - a.score || a.entry.title.localeCompare(b.entry.title))
        .slice(0, Math.min(Math.max(Number(limit) || 6, 1), 12))
        .map(({ entry, score, matchedTerms }) => ({
          title: entry.title,
          className: entry.className,
          subject: entry.subject,
          unit: entry.unit,
          topicSlug: entry.topicSlug,
          url: entry.url,
          source: entry.source,
          relevance: score,
          excerpt: makeExcerpt(entry.text, matchedTerms),
        }));
    },
    getTopic({ subject, unit, topicSlug }) {
      const match = entries.find((entry) =>
        (!subject || `${entry.subject} ${entry.subjectSlug}`.toLocaleLowerCase().includes(String(subject).toLocaleLowerCase())) &&
        (!unit || `${entry.unit} ${entry.unitSlug}`.toLocaleLowerCase().includes(String(unit).toLocaleLowerCase())) &&
        entry.topicSlug.toLocaleLowerCase() === String(topicSlug ?? "").toLocaleLowerCase(),
      );
      if (!match) return null;
      return {
        title: match.title,
        className: match.className,
        subject: match.subject,
        unit: match.unit,
        topicSlug: match.topicSlug,
        url: match.url,
        source: match.source,
        content: match.text.slice(0, 14_000),
      };
    },
    listSubjects() {
      const subjects = new Map();
      for (const entry of entries) {
        const key = `${entry.className}:${entry.subjectSlug}`;
        const current = subjects.get(key) ?? { className: entry.className, subject: entry.subject, subjectSlug: entry.subjectSlug, units: new Set(), topics: 0 };
        current.units.add(entry.unitSlug);
        current.topics++;
        subjects.set(key, current);
      }
      return [...subjects.values()]
        .map(({ units, ...item }) => ({ ...item, units: units.size }))
        .sort((a, b) => a.className.localeCompare(b.className) || a.subject.localeCompare(b.subject));
    },
  });
}

function makeExcerpt(text, matchedTerms, maxLength = 360) {
  if (!text) return "";
  const normalized = text.replace(/\s+/gu, " ").trim();
  const lower = normalized.toLocaleLowerCase();
  let index = -1;
  for (const term of matchedTerms) {
    index = lower.indexOf(term.toLocaleLowerCase());
    if (index >= 0) break;
  }
  if (index < 0 || normalized.length <= maxLength) return normalized.slice(0, maxLength);
  const start = Math.max(0, index - Math.floor(maxLength / 4));
  const end = Math.min(normalized.length, start + maxLength);
  return `${start ? "…" : ""}${normalized.slice(start, end)}${end < normalized.length ? "…" : ""}`;
}
