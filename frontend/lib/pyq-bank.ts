import { loadData } from "@/lib/data-loader";

/** One PYQ file = one exam year for one subject. */
export type PyqYear = {
  year: number;
  title: string;
  examSource?: string;
  questions: Array<{
    question: string;
    marks?: string | number;
    solution?: string;
  }>;
};

/** A theory block rendered as a card (definition / concept / derivation). */
export type TheoryBlock = {
  title: string;
  notes: string[];
  detail?: string;
};

export type SubjectPyqBank = {
  theory: TheoryBlock[];
  /** Sorted newest first. */
  pyqs: PyqYear[];
};

type ManifestItem = {
  path: string;
  data: {
    title?: string;
    year?: number;
    examSource?: string;
    notes?: string[] | string;
    questions?: PyqYear["questions"];
    type?: string;
    detail?: string;
  };
};

/** r-export manifest item — chapter-level theory notes (used as fallback). */
type RExportItem = {
  subject: string;
  chapter: string;
  id: string;
  title: string;
  notes: string[];
};

function normPath(p: string) {
  return p.replace(/\\/g, "/");
}

/**
 * Loads the theory + PYQ bank for a Class 11 subject from the built
 * ravikishan manifest. Content lives under:
 *   content/ravikishan/{classSlug}/{subject}/theory/*.json
 *   content/ravikishan/{classSlug}/{subject}/{unit}/pyqs/neb-YYYY.json (or any file with a `year`)
 */
export async function getSubjectPyqBank(
  classSlug: string,
  subjectSlug: string,
  maxYears = 10,
): Promise<SubjectPyqBank> {
  const [manifest, rexpManifest] = await Promise.all([
    loadData<ManifestItem[]>("ravikishan/manifest.json"),
    loadData<RExportItem[]>("r-export/manifest.json").catch(() => [] as RExportItem[]),
  ]);
  const theory: TheoryBlock[] = [];
  const pyqs: PyqYear[] = [];

  // The manifest stores content under the short class folder ("class-11/…",
  // "class-12/…") while routes use the track slug ("class-11-notes"). Accept
  // both so theory/PYQ tabs are never empty due to a class-name mismatch.
  const classFolder = classSlug.replace(/-notes$/, "");
  const subjectPrefixes = [`${classSlug}/${subjectSlug}/`, `${classFolder}/${subjectSlug}/`];

  for (const item of manifest) {
    const path = normPath(item.path);
    const isSubject = subjectPrefixes.some((p) => path.startsWith(p));
    if (!isSubject) continue;

    if (path.includes("/theory/")) {
      const notes = Array.isArray(item.data.notes)
        ? item.data.notes
        : typeof item.data.notes === "string"
          ? [item.data.notes]
          : [];
      if (notes.length === 0 && !item.data.detail) continue;
      theory.push({
        title: item.data.title ?? "Theory",
        notes,
        detail: item.data.detail,
      });
      continue;
    }

    const hasYear = typeof item.data.year === "number";
    const year =
      typeof item.data.year === "number"
        ? item.data.year
        : Number.parseInt(path.match(/neb-(\d{4})/)?.[1] ?? path.match(/(\d{4})/)?.[1] ?? "", 10);

    if (hasYear && Number.isFinite(year)) {
      const questions = Array.isArray(item.data.questions) ? item.data.questions : [];
      if (questions.length > 0) {
        pyqs.push({
          year,
          title: item.data.title ?? `NEB ${year}`,
          examSource: item.data.examSource ?? "NEB",
          questions,
        });
      }
    }
  }

  // Fallback: subjects without ravikishan theory files (biology, english,
  // nepali) still have chapter-level theory notes in the r-export manifest.
  if (theory.length === 0) {
    for (const item of rexpManifest) {
      if (item.subject !== subjectSlug) continue;
      const notes = Array.isArray(item.notes) ? item.notes : [];
      if (notes.length === 0) continue;
      theory.push({
        title: item.title ?? "Theory",
        notes,
      });
    }
  }

  pyqs.sort((a, b) => b.year - a.year);
  return {
    theory,
    pyqs: pyqs.slice(0, Math.max(1, maxYears)),
  };
}

/** Stable ordering helper — years newest → oldest. */
export function orderPyqYears(pyqs: PyqYear[]): PyqYear[] {
  return [...pyqs].sort((a, b) => b.year - a.year);
}