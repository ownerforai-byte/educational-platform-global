/**
 * Past papers for Practice — the authored NEB year files, with solutions.
 *
 * Source: `content/practice/questions/class-11/<subject>/neb-YYYY.json`, one
 * file per exam year. Every question in those files already carries a written,
 * worked solution, which is exactly what a practice surface needs: read the
 * question, attempt it, then reveal the solution and compare.
 *
 * Why a filesystem reader instead of the manifest:
 *   - `content/manifest.json` lists these files but carries only their titles
 *     (no `questions` array), so selecting from it yields empty cards.
 *   - `content/_index.json` is no longer published, so the browser cannot see
 *     them either. The files themselves are traced into the server bundle by
 *     `outputFileTracingIncludes` in next.config.mjs, so a server component can
 *     read them and ship only the rendered result.
 *
 * Server-only: this module imports `node:fs`. Never import it from a client
 * component — `/practice/[subject]` reads it in the RSC layer and passes the
 * already-shaped years to the client `PyqYearCard`.
 */

import type { PyqYear } from "@/lib/pyq-bank";

/** Class directory inside `content/` for a track slug ("class-11-notes" → "class-11"). */
function classDirOf(classSlug: string): string {
  return classSlug.replace(/-notes$/, "");
}

/**
 * Candidate project roots. The dev/build process runs from `frontend/`, while
 * the corpus lives at the repository root (`content/…`), so both the local and
 * the traced-server layout must be tried.
 */
function contentRoots(): string[] {
  const cwd = process.cwd();
  return [cwd, `${cwd}/..`];
}

type YearFile = {
  title?: string;
  year?: number;
  examSource?: string;
  questions?: Array<{ question?: string; marks?: string | number; solution?: string }>;
};

const yearCache = new Map<string, Promise<PyqYear[]>>();

async function readYearFile(absPath: string): Promise<YearFile | null> {
  const { readFile } = await import("node:fs/promises");
  try {
    return JSON.parse(await readFile(absPath, "utf-8")) as YearFile;
  } catch {
    return null;
  }
}

/**
 * Every solved NEB paper for one class + subject, newest year first.
 *
 * Files are named `neb-YYYY.json`; the year is taken from the file's own
 * `year` field when present and from the filename otherwise, so a misnamed
 * file still lands in the right bucket. Year files with no usable question are
 * dropped rather than rendered as an empty card.
 */
export function getSubjectPastPapers(
  classSlug: string,
  subjectSlug: string,
): Promise<PyqYear[]> {
  const key = `${classSlug}:${subjectSlug}`;
  const cached = yearCache.get(key);
  if (cached) return cached;

  const load = (async (): Promise<PyqYear[]> => {
    const { readdir } = await import("node:fs/promises");
    const dirSuffix = `content/practice/questions/${classDirOf(classSlug)}/${subjectSlug}`;

    for (const root of contentRoots()) {
      const dir = `${root}/${dirSuffix}`;
      let entries: string[];
      try {
        entries = await readdir(dir);
      } catch {
        continue;
      }

      const years: PyqYear[] = [];
      for (const name of entries) {
        if (!/^neb-\d{4}\.json$/.test(name)) continue;
        const file = await readYearFile(`${dir}/${name}`);
        if (!file) continue;

        const questions = (file.questions ?? []).flatMap((q) => {
          const text = typeof q.question === "string" ? q.question.trim() : "";
          if (!text) return [];
          return [
            {
              question: text,
              marks: q.marks,
              solution:
                typeof q.solution === "string" && q.solution.trim() ? q.solution : undefined,
            },
          ];
        });
        if (questions.length === 0) continue;

        const fromName = Number.parseInt(name.match(/(\d{4})/)?.[1] ?? "", 10);
        const year = typeof file.year === "number" ? file.year : fromName;
        if (!Number.isFinite(year)) continue;

        years.push({
          year,
          title: file.title ?? `NEB ${year}`,
          examSource: file.examSource ?? "NEB",
          units: [],
          questions,
        });
      }

      return years.sort((a, b) => b.year - a.year);
    }

    return [];
  })();

  yearCache.set(key, load);
  return load;
}

/** One line per class + subject: how much solved practice the file tree holds. */
export async function getPastPaperCounts(
  classSlug: string,
  subjectSlugs: readonly string[],
): Promise<Record<string, { years: number; questions: number }>> {
  const counts: Record<string, { years: number; questions: number }> = {};
  await Promise.all(
    subjectSlugs.map(async (subjectSlug) => {
      const papers = await getSubjectPastPapers(classSlug, subjectSlug);
      counts[subjectSlug] = {
        years: papers.length,
        questions: papers.reduce((sum, paper) => sum + paper.questions.length, 0),
      };
    }),
  );
  return counts;
}
