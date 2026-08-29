import { Router, Request, Response } from "express";
import { supabaseAdmin } from "../db/supabase";

const router = Router();

// Lab registry data (mirrors frontend lab-registry for biology)
const BIOLOGY_LABS = [
  { id: "bio-biomolecules-3d", title: "Biomolecules 3D", unit: "Unit 1: Biomolecules & Cell Biology", type: "3d", status: "active", topics: ["carbohydrates", "proteins", "lipids", "nucleic acids", "enzymes", "water", "minerals"] },
  { id: "bio-cell-3d", title: "Cell Ultrastructure 3D", unit: "Unit 1: Biomolecules & Cell Biology", type: "3d", status: "active", topics: ["cell membrane", "nucleus", "mitochondria", "chloroplast", "ER", "golgi", "ribosomes", "lysosomes", "cell wall", "cilia", "flagella"] },
  { id: "bio-cell-division-3d", title: "Cell Division 3D", unit: "Unit 1: Biomolecules & Cell Biology", type: "3d", status: "active", topics: ["amitosis", "mitosis", "meiosis"] },
  { id: "bio-floral-3d", title: "Floral Diversity 3D", unit: "Unit 2: Floral Diversity", type: "3d", status: "active", topics: ["five kingdom", "fungi", "algae", "bryophytes", "pteridophytes", "gymnosperms", "angiosperms"] },
  { id: "bio-micro-3d", title: "Microbiology 3D", unit: "Unit 3: Introductory Microbiology", type: "3d", status: "active", topics: ["bacteria", "cyanobacteria", "virus", "bacteriophage"] },
  { id: "bio-ecology-3d", title: "Ecology 3D", unit: "Unit 4: Ecology", type: "3d", status: "active", topics: ["ecosystem", "food web", "carbon cycle", "nitrogen cycle", "adaptation", "pollution"] },
  { id: "bio-evolution-3d", title: "Evolution 3D", unit: "Unit 7: Evolutionary Biology", type: "3d", status: "active", topics: ["origin of life", "evidence", "theories", "human evolution"] },
  { id: "bio-faunal-3d", title: "Faunal Diversity 3D", unit: "Unit 8: Faunal Diversity", type: "3d", status: "active", topics: ["protista", "protozoa", "animal phyla", "earthworm", "frog"] },
  { id: "bio-biota-3d", title: "Biota & Environment 3D", unit: "Unit 9: Biota & Environment", type: "3d", status: "active", topics: ["aquatic adaptation", "terrestrial adaptation", "volant adaptation", "behavior", "pollution"] },
  { id: "bio-conservation-3d", title: "Conservation Biology 3D", unit: "Unit 10: Conservation Biology", type: "3d", status: "active", topics: ["biodiversity", "national parks", "IUCN categories", "hotspots"] },
  { id: "bio-3d-cell", title: "Cell Structure 3D (Classic)", unit: "Unit 1", type: "3d", status: "active", topics: ["organelles"] },
  { id: "bio-3d-dna", title: "DNA & Genetics 3D", unit: "Unit 1", type: "3d", status: "active", topics: ["DNA structure", "replication", "transcription", "translation"] },
  { id: "bio-3d-advanced", title: "Biology 3D Advanced", unit: "All Units", type: "3d", status: "active", topics: ["all topics"] },
  { id: "bio-3d-ecology", title: "Ecology & Ecosystem 3D", unit: "Unit 4", type: "3d", status: "active", topics: ["ecosystems", "cycles"] },
  { id: "bio-3d-human", title: "Human Body Systems 3D", unit: "Unit 9", type: "3d", status: "active", topics: ["organ systems"] },
  { id: "bio-3d-evolution", title: "Evolution & Classification 3D", unit: "Unit 7", type: "3d", status: "active", topics: ["phylogeny", "taxonomy"] },
  { id: "bio-calc-punnett", title: "Punnett Square Solver", unit: "Unit 1", type: "calculator", status: "active", topics: ["genetics"] },
  { id: "bio-calc-population", title: "Population Growth Calc", unit: "Unit 4", type: "calculator", status: "active", topics: ["population dynamics"] },
  { id: "bio-calc-photosynthesis", title: "Photosynthesis Rate Calc", unit: "Unit 4", type: "calculator", status: "active", topics: ["photosynthesis"] },
];

const BIOLOGY_UNITS = [
  { id: "unit1", title: "Biomolecules & Cell Biology", labCount: 3, hours: 15 },
  { id: "unit2", title: "Floral Diversity", labCount: 1, hours: 30 },
  { id: "unit3", title: "Introductory Microbiology", labCount: 1, hours: 5 },
  { id: "unit4", title: "Ecology", labCount: 1, hours: 11 },
  { id: "unit5", title: "Vegetation", labCount: 1, hours: 3 },
  { id: "unit6", title: "Introduction to Biology", labCount: 1, hours: 2 },
  { id: "unit7", title: "Evolutionary Biology", labCount: 1, hours: 15 },
  { id: "unit8", title: "Faunal Diversity", labCount: 1, hours: 34 },
  { id: "unit9", title: "Biota & Environment", labCount: 1, hours: 10 },
  { id: "unit10", title: "Conservation Biology", labCount: 1, hours: 3 },
];

// GET /api/biology/labs
router.get("/labs", (_req: Request, res: Response) => {
  res.json({
    labs: BIOLOGY_LABS,
    total: BIOLOGY_LABS.length,
    units: BIOLOGY_UNITS,
    summary: {
      totalLabs: BIOLOGY_LABS.length,
      activeLabs: BIOLOGY_LABS.filter((l) => l.status === "active").length,
      threeDLabs: BIOLOGY_LABS.filter((l) => l.type === "3d").length,
      calculatorLabs: BIOLOGY_LABS.filter((l) => l.type === "calculator").length,
      totalUnits: BIOLOGY_UNITS.length,
    },
  });
});

// GET /api/biology/labs/:id
router.get("/labs/:id", (req: Request, res: Response) => {
  const lab = BIOLOGY_LABS.find((l) => l.id === req.params.id);
  if (!lab) {
    return res.status(404).json({ error: "Lab not found", code: "LAB_NOT_FOUND" });
  }

  // Find which unit this lab belongs to
  const unit = BIOLOGY_UNITS.find((u) => {
    const unitLabs = BIOLOGY_LABS.filter((l) => l.unit.includes(u.title));
    return unitLabs.some((l) => l.id === lab.id);
  });

  res.json({
    ...lab,
    unitTitle: unit?.title ?? lab.unit,
    syllabusTopics: [], // Will be populated from syllabus.ts on frontend
    relatedLabs: BIOLOGY_LABS.filter((l) => l.unit === lab.unit && l.id !== lab.id).map((l) => l.id),
  });
});

// POST /api/biology/labs/:id/progress
router.post("/labs/:id/progress", async (req: Request, res: Response) => {
  const { userId, labId, progress } = req.body;

  if (!userId || !labId) {
    return res.status(400).json({ error: "userId and labId are required", code: "INVALID_REQUEST" });
  }

  try {
    // Check if progress already exists
    const { data: existing } = await supabaseAdmin
      .from("lab_progress")
      .select("id")
      .eq("user_id", userId)
      .eq("lab_id", labId)
      .single();

    const progressData = {
      user_id: userId,
      lab_id: labId,
      tabs_viewed: progress?.tabsViewed ?? [],
      time_spent: progress?.timeSpent ?? 0,
      completed: progress?.completed ?? false,
      updated_at: new Date().toISOString(),
    };

    if (existing) {
      const { error } = await supabaseAdmin
        .from("lab_progress")
        .update(progressData)
        .eq("id", existing.id);

      if (error) throw error;
    } else {
      const { error } = await supabaseAdmin
        .from("lab_progress")
        .insert(progressData);

      if (error) throw error;
    }

    // Award credits for completion
    const creditsEarned = progress?.completed ? 50 : 0;

    res.json({
      success: true,
      labId,
      creditsEarned,
      message: progress?.completed ? "Lab completed! +50 credits" : "Progress saved",
    });
  } catch (err: any) {
    console.error("Progress save error:", err);
    res.status(500).json({ error: err.message || "Failed to save progress", code: "SAVE_ERROR" });
  }
});

// GET /api/biology/syllabus
router.get("/syllabus", (_req: Request, res: Response) => {
  res.json({
    class: "Class 11",
    subject: "Biology",
    code: "Bio. 201",
    totalUnits: BIOLOGY_UNITS.length,
    totalHours: BIOLOGY_UNITS.reduce((sum, u) => sum + u.hours, 0),
    units: BIOLOGY_UNITS.map((u) => ({
      ...u,
      labs: BIOLOGY_LABS.filter((l) => l.unit.includes(u.title)).map((l) => ({
        id: l.id,
        title: l.title,
        type: l.type,
        status: l.status,
      })),
    })),
  });
});

export default router;
