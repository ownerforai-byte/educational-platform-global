import { loadData } from "@/lib/data-loader";

export type NotesTrack = "class-11-notes" | "class-12-notes";

export type ImportedNote = {
  title: string;
  path: string;
  subject: string;
  unit?: string;
  target: NotesTrack;
  source: "ravikishan" | "r-export";
};

type RavikishanManifestItem = {
  path: string;
  data: { title?: string };
};

type RExportManifestItem = {
  subject: string;
  chapter: string;
  id: string;
  title: string;
  notes: string[];
};

function baseName(p: string) {
  return p.split(/[\\/]/).pop()?.replace(/\.json$/, "") ?? p;
}

function ravSubject(item: { path: string }) {
  const parts = item.path.split(/[\\/]/);
  return parts[1] || "unknown";
}

function ravClass(item: { path: string }) {
  const parts = item.path.split(/[\\/]/);
  return parts[0] || "unknown";
}

function ravUnit(item: { path: string }) {
  const parts = item.path.split(/[\\/]/);
  return parts[2] || undefined;
}

function mapRavUnitToSyllabus(subject: string, unit: string): string | undefined {
  const key = `${subject}/${unit}`.toLowerCase();
  const map: Record<string, string> = {
    "chemistry/unit-2-stoichiometry": "stoichiometry",
    "chemistry/unit-3-atomic-structure": "atomic-structure",
    "chemistry/classification-of-elements-and-periodic-table": "classification-of-elements-and-periodic-table",
    "chemistry/chemical-bonding-and-shapes-of-molecules": "chemical-bonding-and-shapes-of-molecules",
    "chemistry/oxidation-and-reduction": "oxidation-and-reduction",
    "chemistry/states-of-matter": "states-of-matter",
    "chemistry/chemical-equilibrium": "chemical-equilibrium",
    "chemistry/chemistry-of-non-metals": "chemistry-of-non-metals",
    "chemistry/chemistry-of-metals": "chemistry-of-metals",
    "chemistry/bio-inorganic-chemistry": "bio-inorganic-chemistry",
    "chemistry/basic-concept-of-organic-chemistry": "basic-concept-of-organic-chemistry",
    "chemistry/fundamental-principles-of-organic-chemistry": "fundamental-principles-of-organic-chemistry",
    "chemistry/hydrocarbons": "hydrocarbons",
    "chemistry/aromatic-hydrocarbons": "aromatic-hydrocarbons",
    "chemistry/fundamentals-of-applied-chemistry": "fundamentals-of-applied-chemistry",
    "chemistry/modern-chemical-manufactures": "modern-chemical-manufactures",
    "physics/thermodynamics": "heat-and-temperature",
    "physics/unit-1-physical-quantities": "physical-quantities",
    "physics/unit-2-vectors": "vectors",
    "physics/unit-01-vectors": "vectors",
    "physics/unit-1-vectors": "vectors",
    "physics/unit-3-kinematics": "kinematics",
    "physics/unit-4-dynamics": "dynamics",
    "physics/unit-11-quantity-of-heat": "quantity-of-heat",
    "physics/heat": "heat-and-temperature",
    "physics/mechanics": "mechanics",
    "physics/optics": "optics",
    "mathematics/analytic-geometry": "analytic-geometry",
    "mathematics/calculus": "calculus",
    "mathematics/matrix-(algebra)": "algebra",
    "biology/botany": "floral-diversity",
    "biology/unit-8-faunal-diversity": "faunal-diversity",
    "english/short-stories": "reading-and-comprehension",
    "english/writing-and-composition": "writing-and-composition",
    "english/writing-skills": "writing-skills",
    "english/grammar-for-writing": "writing-and-composition",
    "nepali/bhashatattva": "bhasha-ra-vyakarana",
    "nepali/poems": "sahitya-adhyayan",
  };
  return map[key] || undefined;
}

function buildImportedNotes(
  rav: RavikishanManifestItem[],
  rexp: RExportManifestItem[],
): Record<string, ImportedNote[]> {
  const result: Record<string, ImportedNote[]> = {
    chemistry: [],
    physics: [],
    mathematics: [],
    biology: [],
    english: [],
    nepali: [],
  };

  for (const item of rav) {
    const cls = ravClass(item);
    const subject = ravSubject(item);
    const unitPath = ravUnit(item);
    const unit = unitPath ? mapRavUnitToSyllabus(subject, unitPath) : undefined;
    
    let target: ImportedNote["target"];
    if (cls === "class-12" || cls === "class-12-notes") {
      target = "class-12-notes";
    } else {
      target = "class-11-notes";
    }
    
    if (!result[subject]) {
      result[subject] = [];
    }
    
    result[subject].push({
      title: item.data?.title ?? baseName(item.path),
      path: item.path,
      subject,
      unit,
      target,
      source: "ravikishan",
    });
  }

  for (const item of rexp) {
    const subject = item.subject;
    if (!result[subject]) {
      result[subject] = [];
    }
    
    const unit = mapRavUnitToSyllabus(subject, item.chapter);
    const target: ImportedNote["target"] = "class-11-notes";
    
    result[subject].push({
      title: item.title,
      path: `${subject}/${item.chapter}/${item.id}`,
      subject,
      unit,
      target,
      source: "r-export",
    });
  }

  return result;
}

export const IMPORTED_NOTES_BY_SUBJECT: Record<string, ImportedNote[]> = {
  chemistry: [],
  physics: [],
  mathematics: [],
  biology: [],
  english: [],
  nepali: [],
};

let importedNotesPromise: Promise<Record<string, ImportedNote[]>> | null = null;

function getImportedNotesBySubject(): Promise<Record<string, ImportedNote[]>> {
  if (!importedNotesPromise) {
    importedNotesPromise = (async () => {
      let rav: RavikishanManifestItem[] = [];
      let rexp: ReExportManifestItem[] = [];
      try {
        [rav, rexp] = await Promise.all([
          loadData<RavikishanManifestItem[]>("ravikishan/manifest.json"),
          loadData<RExportManifestItem[]>("r-export/manifest.json"),
        ]);
      } catch {
        // NEXT_PUBLIC_SITE_URL may be missing in production; fall back to empty manifests
      }
      const built = buildImportedNotes(rav, rexp);
      for (const key of Object.keys(built)) {
        IMPORTED_NOTES_BY_SUBJECT[key] = built[key];
      }
      return IMPORTED_NOTES_BY_SUBJECT;
    })();
  }
  return importedNotesPromise;
}

export async function getImportedNotesForSubject(
  subject: string,
  target?: string,
): Promise<ImportedNote[]> {
  const notes = (await getImportedNotesBySubject())[subject] ?? [];
  if (!target) return notes;
  return notes.filter((note) => note.target === target);
}

export async function getImportedNotesForUnit(
  subject: string,
  unitId: string,
  target?: string,
): Promise<ImportedNote[]> {
  const notes = await getImportedNotesForSubject(subject, target);
  return notes.filter((note) => note.unit === unitId);
}

function normalizeForMatch(value: string): string {
  // eslint-disable-next-line no-misleading-character-class -- class intentionally covers Devanagari incl. combining marks (Mn); excluding them would change matching
  return value.toLowerCase().replace(/[^a-z0-9\u0900-\u097f]+/g, " ").trim();
}

export async function getImportedNotesForTopic(
  subject: string,
  unitId: string,
  topicTitle: string,
  target?: string,
): Promise<ImportedNote[]> {
  const unitNotes = await getImportedNotesForUnit(subject, unitId, target);
  const topicNorm = normalizeForMatch(topicTitle);
  const keywords = topicNorm.split(" ").filter((w) => w.length > 4);

  return unitNotes.filter((note) => {
    const hay = normalizeForMatch(`${note.title} ${note.path}`);
    if (topicNorm.length >= 12 && hay.includes(topicNorm.slice(0, 24))) return true;
    const hits = keywords.filter((w) => hay.includes(w)).length;
    return hits >= Math.min(2, Math.max(1, keywords.length));
  });
}
