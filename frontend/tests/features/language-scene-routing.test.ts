import { describe, it, expect } from "vitest";

/**
 * Subject-scoped scene routing (2026-11-11).
 *
 * English and Nepali topics must never borrow a SCIENCE scene. The science
 * keyword table matches on English keywords, so "Sequences & Series" could
 * otherwise claim an English writing topic and "Organic Principles" a Nepali
 * literature lesson. These tests pin the subject scoping and the coverage
 * of every language topic.
 */
import { resolveChapterAnimation } from "@/components/lab/chapter-animation";
import {
  LANGUAGE_SCENE_ROUTES,
  LANGUAGE_SUBJECT_SLUGS,
  pickLanguageScene,
} from "@/components/lab/language-scenes";
import { SYLLABUS, slugifySyllabusTopic } from "@/lib/core/syllabus";

function languageTopics() {
  const rows: Array<{ subject: string; unit: string; title: string; slug: string }> = [];
  for (const cls of SYLLABUS)
    for (const s of cls.subjects) {
      if (!LANGUAGE_SUBJECT_SLUGS.includes(s.slug as never)) continue;
      for (const u of s.units)
        for (const t of u.topics) {
          rows.push({ subject: s.slug, unit: u.id, title: t, slug: slugifySyllabusTopic(t) });
        }
    }
  return rows;
}

describe("language scene routing", () => {
  it("routes English and Nepali through their own table only", () => {
    expect([...LANGUAGE_SUBJECT_SLUGS]).toEqual(["english", "nepali"]);
    // The subject must actually change WHICH table is consulted: the same
    // title must not resolve to the same scene for a language subject as it
    // does for a science subject.
    const titles = [
      "Sequences & Series",
      "Organic Principles",
      "Atomic Structure",
      "Limits & Continuity",
      "Metals",
      "Ecology",
      "Evolutionary Biology",
      "Health & Diseases",
      "Communication",
      "Essay writing",
      "Letter writing",
    ];
    for (const title of titles) {
      const science = resolveChapterAnimation("some-slug", title, "physics");
      const language = resolveChapterAnimation("some-slug", title, "english");
      if (!science || !language) continue;
      expect(language.scene, `"${title}" shares one scene across subjects`).not.toBe(
        science.scene,
      );
    }
  });

  it("gives every English and Nepali topic a scene", () => {
    const topics = languageTopics();
    expect(topics.length).toBeGreaterThan(150);
    const missing = topics.filter(
      (t) =>
        !resolveChapterAnimation(`${t.unit} ${t.subject} ${t.slug}`, t.title, t.subject),
    );
    expect(missing.map((m) => `${m.subject}/${m.title}`)).toEqual([]);
  });

  it("never resolves a language topic to a science scene", () => {
    const scienceSceneTitles = new Set([
      "Kinematics / Projectile",
      "Vectors",
      "Atomic Structure",
      "Chemical Bonding",
      "Sequences & Series",
      "Limits & Continuity",
      "Differentiation",
      "Integration",
      "Cell Biology",
      "Ecology",
    ]);
    for (const t of languageTopics()) {
      const resolved = resolveChapterAnimation(
        `${t.unit} ${t.subject} ${t.slug}`,
        t.title,
        t.subject,
      );
      if (!resolved) continue;
      expect(scienceSceneTitles.has(resolved.title)).toBe(false);
    }
  });

  it("covers the Nepali grammar, writing and literature families", () => {
    const cases: Array<[string, string]> = [
      ["पदप्रकरण — लिङ्ग, पुरुष, वचन, कारक र विभक्ति", "Nepali Grammar & Vocabulary"],
      ["निबन्ध लेखन — आत्मपरक र वस्तुपरक", "Nepali Writing & Composition"],
      ["पाठ १ — वीर पुर्खा (कविता)", "Nepali Literature & Culture"],
    ];
    for (const [title, expected] of cases) {
      expect(pickLanguageScene(title, title)?.title).toBe(expected);
    }
  });

  it("covers the English literature, grammar and writing families", () => {
    const cases: Array<[string, string]> = [
      ["Short Story 1 — Neighbours (Tim Winton)", "English Literature"],
      ["Poem 1 — A Day (Emily Dickinson)", "English Literature"],
      ["Tenses and their uses", "English Grammar & Usage"],
      ["Email writing", "English Writing Skills"],
      ["Presentation skills", "Oral Communication"],
    ];
    for (const [title, expected] of cases) {
      expect(pickLanguageScene(title, title)?.title).toBe(expected);
    }
  });

  it("gives every syllabus topic in every subject a 3D scene", () => {
    // The whole point of the coverage pass: no topic — science OR language —
    // may fall through to the "under progress" state.
    const missing: string[] = [];
    for (const cls of SYLLABUS)
      for (const s of cls.subjects)
        for (const u of s.units)
          for (const t of u.topics) {
            const slug = slugifySyllabusTopic(t);
            const resolved = resolveChapterAnimation(
              `${u.id} ${s.slug} ${slug}`,
              t,
              s.slug,
            );
            if (!resolved) missing.push(`${s.slug}/${t}`);
          }
    expect(missing).toEqual([]);
  });

  it("has a description for every language route", () => {
    for (const route of LANGUAGE_SCENE_ROUTES) {
      expect(route.description.length).toBeGreaterThan(8);
      expect(route.title.length).toBeGreaterThan(0);
      expect(route.keys.length).toBeGreaterThan(0);
    }
  });
});
