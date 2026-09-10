import { Router, Request, Response } from "express";
import { readFile, readdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const router = Router();

function getExamsDir(): string {
  const candidates = [
    path.join(process.cwd(), "content", "exams"),
    path.join(process.cwd(), "..", "content", "exams"),
    path.join(process.cwd(), "public", "data", "exams"),
    path.join(process.cwd(), "..", "public", "data", "exams"),
  ];
  for (const c of candidates) {
    if (existsSync(c)) return c;
  }
  return candidates[0];
}

const SAFE_SLUG = /^[a-z0-9-]+$/;

async function loadExamFile(slug: string): Promise<any> {
  if (!SAFE_SLUG.test(slug)) {
    throw new Error("Invalid slug");
  }
  const examsDir = getExamsDir();
  const filePath = path.join(examsDir, `${slug}.json`);
  const content = await readFile(filePath, "utf-8");
  return JSON.parse(content);
}

router.get("/", async (_req: Request, res: Response) => {
  try {
    const examsDir = getExamsDir();
    let entries: string[];
    try {
      const dirEntries = await readdir(examsDir);
      entries = dirEntries.filter((f) => f.endsWith(".json") && f !== "manifest.json");
    } catch (e) {
      console.warn("Could not read exams directory:", e);
      return res.status(200).json([]);
    }

    const exams = await Promise.all(
      entries.map(async (f) => {
        const slug = f.replace(/\.json$/, "");
        const data = await loadExamFile(slug);
        return {
          slug: data.slug,
          title: data.title,
          durationMin: data.durationMin,
          questionCount: data.questions?.length ?? 0,
        };
      })
    );

    res.json(exams);
  } catch (err: any) {
    console.error("Failed to list exams:", err);
    res.status(500).json({ error: "Failed to load exams" });
  }
});

router.get("/:slug", async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    if (!SAFE_SLUG.test(slug)) {
      res.status(400).json({ error: "Invalid slug" });
      return;
    }
    const data = await loadExamFile(slug);
    res.json(data);
  } catch (err: any) {
    console.error("Failed to load exam:", err);
    res.status(404).json({ error: "Not found" });
  }
});

export default router;
