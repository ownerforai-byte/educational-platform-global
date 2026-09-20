import { Router, Request, Response } from "express";
import { readFile } from "fs/promises";
import fs from "fs";
import { resolveDataPath } from "../utils/paths";

const router = Router();

interface LessonMeta {
  slug: string;
  title: string;
  subject: "mathematics" | "physics" | "chemistry" | "biology";
  subjectTitle: string;
  classSlug: "class-11-notes";
  classTitle: string;
  unitSlug: string;
  icon: string;
  description: string;
}

const LESSON_CATALOG: LessonMeta[] = [
  {
    slug: "algebra",
    title: "Algebra",
    subject: "mathematics",
    subjectTitle: "Mathematics",
    classSlug: "class-11-notes",
    classTitle: "Class 11 (Grade XI)",
    unitSlug: "algebra",
    icon: "🔢",
    description:
      "Logic and sets, real numbers, functions, sequence and series, matrices and determinants, quadratic equations, and complex numbers.",
  },
  {
    slug: "atomic-structure",
    title: "Atomic Structure",
    subject: "chemistry",
    subjectTitle: "Chemistry",
    classSlug: "class-11-notes",
    classTitle: "Class 11 (Grade XI)",
    unitSlug: "atomic-structure",
    icon: "⚛️",
    description:
      "Rutherford and Bohr models, hydrogen spectrum, de Broglie waves, Heisenberg uncertainty, quantum numbers, orbitals, and electronic configuration.",
  },
  {
    slug: "biomolecules-and-cell-biology",
    title: "Biomolecules and Cell Biology",
    subject: "biology",
    subjectTitle: "Biology",
    classSlug: "class-11-notes",
    classTitle: "Class 11 (Grade XI)",
    unitSlug: "biomolecules-and-cell-biology",
    icon: "🧬",
    description:
      "Carbohydrates, proteins, lipids, nucleic acids, enzymes, prokaryotic vs eukaryotic cells, eukaryotic organelles, and cell division (mitosis and meiosis).",
  },
  {
    slug: "calculus",
    title: "Calculus",
    subject: "mathematics",
    subjectTitle: "Mathematics",
    classSlug: "class-11-notes",
    classTitle: "Class 11 (Grade XI)",
    unitSlug: "calculus",
    icon: "📐",
    description:
      "Limits and continuity, derivatives definition and rules, parametric/implicit differentiation, monotonicity, integration by substitution and parts, definite integrals, and areas under curves.",
  },
  {
    slug: "classification-of-elements-and-periodic-table",
    title: "Classification of Elements and Periodic Table",
    subject: "chemistry",
    subjectTitle: "Chemistry",
    classSlug: "class-11-notes",
    classTitle: "Class 11 (Grade XI)",
    unitSlug: "classification-of-elements-and-periodic-table",
    icon: "🧪",
    description:
      "Modern periodic law and table, groups/periods/blocks, IUPAC classification, nuclear charge, and periodic trends of radii, ionization energy, electron affinity, and electronegativity.",
  },
  {
    slug: "floral-diversity",
    title: "Floral Diversity",
    subject: "biology",
    subjectTitle: "Biology",
    classSlug: "class-11-notes",
    classTitle: "Class 11 (Grade XI)",
    unitSlug: "floral-diversity",
    icon: "🌸",
    description:
      "Five-kingdom classification, Monera Protista Fungi Plantae Animalia, algae, bryophytes, pteridophytes, gymnosperms, angiosperms, and angiosperm families of economic importance.",
  },
  {
    slug: "gravitation",
    title: "Gravitation",
    subject: "physics",
    subjectTitle: "Physics",
    classSlug: "class-11-notes",
    classTitle: "Class 11 (Grade XI)",
    unitSlug: "gravitation",
    icon: "🌍",
    description:
      "Newton's law of gravitation, gravitational field and potential, variation of g with altitude and depth, satellite motion, escape velocity, and geostationary satellites.",
  },
  {
    slug: "optics",
    title: "Optics",
    subject: "physics",
    subjectTitle: "Physics",
    classSlug: "class-11-notes",
    classTitle: "Class 11 (Grade XI)",
    unitSlug: "reflection-at-curved-mirror",
    icon: "🔭",
    description:
      "Reflection at curved mirrors, refraction at plane surfaces, prisms, lenses, dispersion and aberrations, and spectra (pure spectrum, chromatic and spherical aberration).",
  },
  {
    slug: "quantity-of-heat",
    title: "Quantity of Heat",
    subject: "physics",
    subjectTitle: "Physics",
    classSlug: "class-11-notes",
    classTitle: "Class 11 (Grade XI)",
    unitSlug: "quantity-of-heat",
    icon: "🔥",
    description:
      "Newton's law of cooling, specific heat capacity, latent heat of fusion and vaporization, triple point, and calorimetry.",
  },
  {
    slug: "stoichiometry",
    title: "Stoichiometry",
    subject: "chemistry",
    subjectTitle: "Chemistry",
    classSlug: "class-11-notes",
    classTitle: "Class 11 (Grade XI)",
    unitSlug: "stoichiometry",
    icon: "⚗️",
    description:
      "Dalton's atomic theory, laws of stoichiometry, Avogadro's law, mole concept, limiting reactant, yield calculations, and empirical vs molecular formula.",
  },
  {
    slug: "trigonometry",
    title: "Trigonometry",
    subject: "mathematics",
    subjectTitle: "Mathematics",
    classSlug: "class-11-notes",
    classTitle: "Class 11 (Grade XI)",
    unitSlug: "trigonometry",
    icon: "📏",
    description:
      "Inverse circular functions, principal values, graphs, and trigonometric equations with general solutions.",
  },
  {
    slug: "vectors",
    title: "Vectors",
    subject: "physics",
    subjectTitle: "Physics",
    classSlug: "class-11-notes",
    classTitle: "Class 11 (Grade XI)",
    unitSlug: "vectors",
    icon: "➡️",
    description:
      "Triangle, parallelogram and polygon laws; resolution of vectors; scalar (dot) and vector (cross) products, with worked examples.",
  },
];

const ALLOWED_SLUGS = new Set(LESSON_CATALOG.map((l) => l.slug));

router.get("/", async (_req: Request, res: Response) => {
  try {
    const enriched = await Promise.all(
      LESSON_CATALOG.map(async (meta) => {
        let wordCount = 0;
        try {
          const filePath = resolveDataPath(`lessons/${meta.slug}.md`);
          if (fs.existsSync(filePath)) {
            const raw = await readFile(filePath, "utf-8");
            wordCount = raw.trim().split(/\s+/).length;
          }
        } catch {
          // leave as 0
        }
        return { ...meta, wordCount };
      })
    );
    res.json({ lessons: enriched });
  } catch (err) {
    console.error("Failed to list lessons:", err);
    res.status(500).json({ error: "Failed to list lessons" });
  }
});

router.get("/:slug", async (req: Request, res: Response) => {
  const rawSlug = req.params.slug;
  // Strict whitelist to prevent path traversal and other abuses.
  if (!rawSlug || typeof rawSlug !== "string") {
    res.status(400).json({ error: "Missing lesson slug" });
    return;
  }
  const slug = rawSlug.trim();
  if (!ALLOWED_SLUGS.has(slug)) {
    res.status(404).json({ error: "Unknown lesson slug" });
    return;
  }

  try {
    const lessonPath = resolveDataPath(`lessons/${slug}.md`);
    if (!fs.existsSync(lessonPath)) {
      res.status(404).json({ error: "Lesson file not found on disk", slug });
      return;
    }
    const markdown = await readFile(lessonPath, "utf-8");
    const meta = LESSON_CATALOG.find((l) => l.slug === slug)!;
    const wordCount = markdown.trim().split(/\s+/).length;
    res.json({ ...meta, markdown, wordCount });
  } catch (err) {
    console.error(`Failed to load lesson ${slug}:`, err);
    res.status(500).json({ error: "Failed to load lesson" });
  }
});

export default router;
