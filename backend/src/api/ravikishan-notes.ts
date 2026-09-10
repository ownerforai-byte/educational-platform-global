import { Router, Request, Response } from "express";
import { readFile } from "fs/promises";
import path from "path";
import { supabaseAdmin } from "../db/supabase";

const router = Router();

async function loadJsonFile<T>(relPath: string): Promise<T> {
  const candidates = [
    path.join(process.cwd(), "content", relPath),
    path.join(process.cwd(), "..", "content", relPath),
    path.join(process.cwd(), "public", "data", relPath),
    path.join(process.cwd(), "..", "public", "data", relPath),
  ];

  for (const candidate of candidates) {
    try {
      const content = await readFile(candidate, "utf-8");
      return JSON.parse(content) as T;
    } catch {
      // try next candidate
    }
  }

  throw new Error(`Could not find JSON file: ${relPath}`);
}

async function requireUser(req: Request, res: Response) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return null;
  }

  const token = authHeader.slice(7);
  const { data, error } = await supabaseAdmin.auth.getUser(token);

  if (error || !data.user) {
    res.status(401).json({ error: "Unauthorized" });
    return null;
  }

  return data.user;
}

async function requireTeacher(req: Request, res: Response) {
  const user = await requireUser(req, res);
  if (!user) return null;

  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || !["TEACHER", "ADMIN", "OWNER"].includes(profile.role)) {
    res.status(403).json({ error: "Forbidden" });
    return null;
  }

  return { user, profile };
}

let cachedIndex: Record<string, any> | null = null;

async function getIndex(): Promise<Record<string, any>> {
  if (!cachedIndex) {
    cachedIndex = await loadJsonFile<Record<string, any>>("ravikishan/_index.json");
  }
  return cachedIndex;
}

router.get("/", async (req: Request, res: Response) => {
  try {
    const rel = req.query.path as string | undefined;
    const subjectFilter = (req.query.subject as string | undefined)?.toLowerCase();
    const query = (req.query.q as string | undefined)?.toLowerCase().trim();

    const index = await getIndex();

    // 1. Direct path lookup
    if (rel) {
      const safe = rel.replace(/\\/g, "/").replace(/^\/+/, "").replace(/^(\.\.\/)+/, "");
      const data = index[safe];
      if (!data) {
        return res.status(404).json({ error: `Note '${safe}' not found` });
      }
      return res.json({ path: safe, data });
    }

    const allKeys = Object.keys(index);

    // 2. Search query across paths and titles
    if (query) {
      const matched = allKeys
        .filter((k) => k.toLowerCase().includes(query))
        .slice(0, 50)
        .map((k) => {
          const item = index[k];
          const parts = k.split("/");
          return {
            path: k,
            subject: parts[1] || "general",
            chapter: parts[2] || "",
            type: parts[3] || "concept",
            title: item?.title || item?.name || parts[parts.length - 1].replace(/\.json$/, "").replace(/^\d+-/, "").replace(/-/g, " "),
          };
        });
      return res.json({ query, results: matched, total: matched.length });
    }

    // 3. Filter by subject
    if (subjectFilter) {
      const subjectKeys = allKeys.filter((k) => {
        const parts = k.split("/");
        return parts[1]?.toLowerCase() === subjectFilter;
      });

      const items = subjectKeys.map((k) => {
        const item = index[k];
        const parts = k.split("/");
        return {
          path: k,
          subject: parts[1],
          chapter: parts[2] || "",
          type: parts[3] || "concept",
          title: item?.title || item?.name || parts[parts.length - 1].replace(/\.json$/, "").replace(/^\d+-/, "").replace(/-/g, " "),
        };
      });

      return res.json({ subject: subjectFilter, items, total: items.length });
    }

    // 4. Default: Catalogue and summary breakdown
    const subjectBreakdown: Record<string, { totalNotes: number; chapters: Set<string> }> = {};
    for (const k of allKeys) {
      const parts = k.split("/");
      const subj = parts[1] || "other";
      const chapter = parts[2] || "general";
      if (!subjectBreakdown[subj]) {
        subjectBreakdown[subj] = { totalNotes: 0, chapters: new Set() };
      }
      subjectBreakdown[subj].totalNotes++;
      subjectBreakdown[subj].chapters.add(chapter);
    }

    const catalogue = Object.entries(subjectBreakdown).map(([subj, data]) => ({
      subject: subj,
      notesCount: data.totalNotes,
      chapterCount: data.chapters.size,
      chapters: Array.from(data.chapters),
    }));

    return res.json({
      title: "NEB Smart EduVault Note Repository",
      totalNotes: allKeys.length,
      subjects: catalogue,
      samplePaths: allKeys.slice(0, 5),
    });
  } catch (err: any) {
    console.error("Failed to load ravikishan data:", err);
    return res.status(500).json({ error: "Failed to load data" });
  }
});

export default router;
