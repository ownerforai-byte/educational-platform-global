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
  const manifest = await loadData<ManifestItem[]>("ravikishan/manifest.json");
  const theory: TheoryBlock[] = [];
  const pyqs: PyqYear[] = [];

  for (const item of manifest) {
    const path = normPath(item.path);
    const isSubject =
      path.startsWith(`${classSlug}/${subjectSlug}/`);
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