import re

p = 'frontend/tests/features/figure-anchors-gate.test.ts'
s = open(p, encoding='utf-8').read()

s = s.replace(
    'import { noteMatchesTopic, pickCanonicalNoteEntry } from "@/lib/note-topic-match";',
    'import { noteMatchesTopic, pickCanonicalNoteEntry } from "@/lib/note-topic-match";\n'
    'import { SYLLABUS, slugifySyllabusTopic } from "@/lib/core/syllabus";',
)

start = s.index('function renderedNoteVariants')
end = s.index('function filenameFromPath')
new_resolver = '''/** topic slug -> the (classDir, unitId) pairs the real syllabus puts it under. */
const SYLLABUS_COORDS = (() => {
  const map = new Map<string, Set<string>>();
  for (const cls of SYLLABUS) {
    const classDir = cls.slug.replace(/-notes$/, "");
    for (const subj of cls.subjects) {
      for (const unit of subj.units) {
        for (const topic of unit.topics) {
          const slug = slugifySyllabusTopic(topic);
          if (!map.has(slug)) map.set(slug, new Set());
          map.get(slug)!.add(`${classDir}/${unit.slug}`);
        }
      }
    }
  }
  return map;
})();

/**
 * Resolve the notes a page actually renders, for EVERY class variant that
 * exists. The loader's corpus branch runs .find over the corpus filtered by
 * (classDir, unitId, noteMatchesTopic) - the FIRST matching entry per class
 * page wins. This reproduces that per real syllabus coordinate, then falls
 * back to the flat subject manifest (the loader's fallback).
 */
function renderedNoteVariants(topicSlug: string): Array<{ label: string; notes: string[] }> {
  const variants: Array<{ label: string; notes: string[] }> = [];
  const coords = new Set<string>(SYLLABUS_COORDS.get(topicSlug) ?? []);
  for (const [slug, set] of SYLLABUS_COORDS) {
    if (slug !== topicSlug && noteMatchesTopic(slug, "", topicSlug)) {
      for (const c of set) coords.add(c);
    }
  }
  try {
    const seen = new Set<string>();
    for (const item of corpus()) {
      if (!item.path.startsWith("notes/concepts/") || !Array.isArray(item.data?.notes)) continue;
      const parts = item.path.split("/");
      const coord = `${parts[2]}/${parts[4] ?? "?"}`;
      if (!coords.has(coord) || seen.has(coord)) continue;
      if (!noteMatchesTopic(item.data.topicSlug, filenameFromPath(item.path), topicSlug)) {
        continue;
      }
      seen.add(coord);
      variants.push({ label: `corpus:${coord}`, notes: item.data.notes });
    }
  } catch {
    // corpus unavailable - flat manifest fallback below still applies
  }
  if (variants.length > 0) return variants;

  for (const subject of SUBJECTS) {
    let manifest: ManifestEntry[];
    try {
      manifest = JSON.parse(readFileSync(join(ROOT, subject, "_manifest.json"), "utf-8"));
    } catch {
      continue;
    }
    const winner = pickCanonicalNoteEntry(manifest, topicSlug);
    if (!winner) continue;
    try {
      const data = JSON.parse(
        readFileSync(join(ROOT, subject, winner.unitSlug, winner.filename), "utf-8"),
      );
      return [{ label: `manifest:${subject}`, notes: data.notes as string[] }];
    } catch {
      return [];
    }
  }
  return [];
}

'''
s = s[:start] + new_resolver + s[end:]
open(p, 'w', encoding='utf-8', newline='\n').write(s)
print('rewritten')
