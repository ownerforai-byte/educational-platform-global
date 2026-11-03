import { Router, Request, Response } from "express";
import fs from "fs";
import path from "path";
import { z } from "zod";
import { requireAuth, isOwnerEmail, type AuthedRequest } from "../middleware/auth";
import { canUnlockModule } from "../utils/sectionAccess";
import { grantAllows } from "../utils/contentGrant";

/**
 * Spark-gated content bodies.
 *
 *   POST /api/content/reveal  -> 200 JSON body | 403 (empty) | 404 | 400 | 401
 *   POST /api/content/verify  -> 200 (empty)   | 403 (empty) | 400 | 401
 *
 * Gate: the caller must hold a valid, unexpired `X-Unlock-Grant` minted for
 * THIS user and THIS moduleKey by POST /api/user/credits/unlock, AND the
 * viewer's tier must still open the section behind moduleKey. These routes
 * never read or write the credits balance, so a 403 can never spend a spark.
 * A refusal carries no body: no JSON, no locked preview.
 *
 * The kind -> path table is frontend/lib/content/gated-kinds.json (the same
 * file lib/content/paths.ts imports); nothing here hardcodes tree paths.
 */

const router = Router();

interface KindSpec {
  base: string;
  segments: string[];
}
interface GatedTable {
  kinds: Record<string, KindSpec>;
  publicNames: string[];
}

const TABLE_REL = path.join("frontend", "lib", "content", "gated-kinds.json");
let tableCache: GatedTable | null = null;

function loadTable(): GatedTable {
  if (tableCache) return tableCache;
  const candidates = [
    path.join(process.cwd(), TABLE_REL),
    path.join(process.cwd(), "..", TABLE_REL),
    path.join(__dirname, "..", "..", "..", TABLE_REL),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) {
      tableCache = JSON.parse(fs.readFileSync(c, "utf8")) as GatedTable;
      return tableCache;
    }
  }
  throw new Error("gated-kinds.json not found");
}

/** Data roots holding the gated bodies, most preferred first. */
function dataRoots(): string[] {
  const roots: string[] = [];
  if (process.env.CONTENT_GATED_DIR) roots.push(path.resolve(process.env.CONTENT_GATED_DIR));
  for (const base of [process.cwd(), path.join(process.cwd(), "..")]) {
    roots.push(path.join(base, "frontend", "public", "data"));
    roots.push(path.join(base, "public", "data"));
  }
  return roots;
}

const SAFE_SEGMENT = /^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/;
const safeSegment = z.string().regex(SAFE_SEGMENT).refine((s) => !s.includes(".."));

const bodySchema = z.object({
  kind: z.string().regex(/^[a-z0-9-]{1,40}$/),
  class: safeSegment.optional(),
  subject: safeSegment.optional(),
  unit: safeSegment.optional(),
  topic: safeSegment.optional(),
  filename: safeSegment.optional(),
  moduleKey: z.string().min(1).max(200),
});

type Parsed = z.infer<typeof bodySchema>;

/** Resolve the request to a relative data path, or an error status. */
function relPathFor(body: Parsed): { rel: string } | { status: 400 | 404 } {
  const spec = Object.prototype.hasOwnProperty.call(loadTable().kinds, body.kind)
    ? loadTable().kinds[body.kind]
    : undefined;
  if (!spec) return { status: 400 };
  const parts = [...spec.base.split("/")];
  for (const name of spec.segments) {
    const value = (body as Record<string, string | undefined>)[name];
    if (!value) return { status: 400 };
    parts.push(value);
  }
  const last = parts[parts.length - 1];
  if (spec.segments.length > 0 && (!last.endsWith(".json") || loadTable().publicNames.includes(last))) {
    return { status: 400 };
  }
  return { rel: parts.join("/") };
}

function deny(res: Response): void {
  res.setHeader("Cache-Control", "private, no-store");
  res.status(403).end();
}

async function authorize(req: Request, moduleKey: string): Promise<boolean> {
  const user = (req as AuthedRequest).user;
  const grant = req.get("x-unlock-grant");
  if (!grantAllows(grant, user.id, moduleKey)) return false;
  return canUnlockModule(user, isOwnerEmail(user.email), moduleKey);
}

router.post("/reveal", requireAuth, async (req: Request, res: Response) => {
  res.setHeader("Cache-Control", "private, no-store");
  const parsed = bodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid content reference" });
    return;
  }
  const target = relPathFor(parsed.data);
  if ("status" in target) {
    res.status(target.status).json({ error: "Invalid content reference" });
    return;
  }
  if (!(await authorize(req, parsed.data.moduleKey))) {
    deny(res);
    return;
  }
  for (const root of dataRoots()) {
    const file = path.join(root, ...target.rel.split("/"));
    // Defence in depth: segments are already validated, but never leave the root.
    if (!file.startsWith(root + path.sep)) continue;
    try {
      const raw = await fs.promises.readFile(file);
      res.status(200).type("application/json").send(raw);
      return;
    } catch {
      // try next root
    }
  }
  res.status(404).json({ error: "Not found" });
});

router.post("/verify", requireAuth, async (req: Request, res: Response) => {
  res.setHeader("Cache-Control", "private, no-store");
  const moduleKey = z.string().min(1).max(200).safeParse(req.body?.moduleKey);
  if (!moduleKey.success) {
    res.status(400).json({ error: "moduleKey required" });
    return;
  }
  if (!(await authorize(req, moduleKey.data))) {
    deny(res);
    return;
  }
  res.status(200).end();
});

export default router;
