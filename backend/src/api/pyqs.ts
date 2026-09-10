import { Router, Request, Response } from "express";
import { readFile } from "fs/promises";
import path from "path";
import { supabaseAdmin } from "../db/supabase";

const router = Router();

let cachedPyqIndex: any[] | null = null;
let rawIndex: Record<string, any> | null = null;

async function loadPyqs() {
  if (cachedPyqIndex && rawIndex) return { list: cachedPyqIndex, raw: rawIndex };

  const candidates = [
    path.join(process.cwd(), "content", "ravikishan", "_index.json"),
    path.join(process.cwd(), "..", "content", "ravikishan", "_index.json"),
    path.join(process.cwd(), "public", "data", "ravikishan", "_index.json"),
  ];

  for (const p of candidates) {
    try {
      const content = await readFile(p, "utf-8");
      rawIndex = JSON.parse(content);
      break;
    } catch {
      // try next
    }
  }

  if (!rawIndex) {
    return { list: [], raw: {} };
  }

  const list: any[] = [];
  for (const [key, val] of Object.entries(rawIndex)) {
    if (key.includes("/pyqs/")) {
      const parts = key.split("/");
      const subject = parts[1] || "general";
      const yearMatch = key.match(/20\d\d/);
      const year = val?.year || (yearMatch ? parseInt(yearMatch[0], 10) : 2023);
      const questionCount = Array.isArray(val?.questions)
        ? val.questions.length
        : Array.isArray(val?.sections)
        ? val.sections.reduce((acc: number, s: any) => acc + (s.questions?.length || 0), 0)
        : 1;

      list.push({
        id: key,
        path: key,
        title: val?.title || val?.name || parts[parts.length - 1].replace(/\.json$/, "").replace(/^\d+-/, "").replace(/-/g, " "),
        subject,
        year,
        examSource: val?.examSource || "NEB Board Examination",
        questionCount,
        hasSolutions: true,
      });
    }
  }

  // Sort by year descending, then subject
  list.sort((a, b) => b.year - a.year || a.subject.localeCompare(b.subject));
  cachedPyqIndex = list;
  return { list, raw: rawIndex };
}

// GET /api/pyqs - List all NEB Past Year Papers
router.get("/", async (req: Request, res: Response) => {
  try {
    const subjectFilter = (req.query.subject as string | undefined)?.toLowerCase();
    const yearFilter = req.query.year ? parseInt(req.query.year as string, 10) : undefined;
    const pathQuery = req.query.path as string | undefined;

    const { list, raw } = await loadPyqs();

    // If specific path requested
    if (pathQuery) {
      const paper = raw[pathQuery];
      if (!paper) {
        return res.status(404).json({ error: "PYQ paper not found" });
      }
      return res.json({ id: pathQuery, ...paper });
    }

    // Also check DB resources in parallel
    const { data: dbResources } = await supabaseAdmin
      .from("resources")
      .select("id, title, type, topic_id, metadata, created_at")
      .eq("is_published", true)
      .limit(10);

    let filtered = list;
    if (subjectFilter) {
      filtered = filtered.filter((p) => p.subject.toLowerCase() === subjectFilter);
    }
    if (yearFilter) {
      filtered = filtered.filter((p) => p.year === yearFilter);
    }

    return res.json({
      total: filtered.length,
      papers: filtered,
      dbResources: dbResources ?? [],
    });
  } catch (err: any) {
    console.error("Failed to load PYQs:", err);
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
});

// GET /api/pyqs/:id - Get specific PYQ paper with questions and solutions
router.get("/:id(*)", async (req: Request, res: Response) => {
  try {
    const paperId = req.params.id;
    const { raw, list } = await loadPyqs();

    let found = raw[paperId];
    if (!found) {
      // Search by partial match or slug
      const item = list.find((p) => p.id === paperId || p.id.endsWith(paperId) || p.id.includes(paperId));
      if (item) {
        found = raw[item.id];
      }
    }

    if (!found) {
      return res.status(404).json({ error: `PYQ paper '${paperId}' not found` });
    }

    return res.json({ id: paperId, ...found });
  } catch (err: any) {
    console.error("Failed to fetch PYQ paper:", err);
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
});

export default router;
