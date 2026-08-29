import { Router, Request, Response } from "express";
import { readFile } from "fs/promises";
import path from "path";
import { supabaseAdmin } from "../db/supabase";

const router = Router();

async function loadJsonFile<T>(relPath: string): Promise<T> {
  const filePath = path.join(process.cwd(), "..", "public", "data", relPath);
  const content = await readFile(filePath, "utf-8");
  return JSON.parse(content) as T;
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

router.get("/", async (req: Request, res: Response) => {
  const rel = req.query.path as string | undefined;

  if (!rel) {
    res.status(400).json({ error: "Missing path" });
    return;
  }

  const safe = rel.replace(/\\/g, "/").replace(/^\/+/, "").replace(/^(\.\.\/)+/, "");

  try {
    const index = await loadJsonFile<Record<string, unknown>>("ravikishan/_index.json");
    const data = index[safe];

    if (!data) {
      res.status(404).json({ error: "Not found" });
      return;
    }

    res.json(data);
  } catch (err) {
    console.error("Failed to load ravikishan data:", err);
    res.status(500).json({ error: "Failed to load data" });
  }
});

export default router;
