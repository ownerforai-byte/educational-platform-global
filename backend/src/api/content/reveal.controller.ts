import { Router, Request, Response } from "express";
import { readFile } from "fs/promises";
import path from "path";
import fs from "fs";
import { z } from "zod";
import { requireAuth, isOwnerEmail, type AuthedRequest } from "../../middleware/auth";
import {
  CONTENT_KIND_SECTIONS,
  canonicalContentIdentity,
  contentTargetSchema,
  tierForUser,
  TIER_RANK,
  type Tier,
  type TierUser,
} from "../../utils/sectionAccess";
import { supabaseAdmin } from "../../db/supabase";

const router = Router();

// ── repo-root resolver ─────────────────────────────────────────────────────

/**
 * Walk up from __dirname until we find a directory that contains a `content/`
 * sub-directory. Works whether the backend process starts from `backend/` or
 * the repo root. Returns the absolute path to that `content/` directory.
 */
function findContentRoot(): string {
  let dir = __dirname;
  for (let i = 0; i < 10; i++) {
    const candidate = path.join(dir, "content");
    try {
      if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) {
        return candidate;
      }
    } catch {
      // keep walking
    }
    const parent = path.dirname(dir);
    if (parent === dir) break; // reached filesystem root
    dir = parent;
  }
  // Fallback: typical two layouts
  const fromCwd = path.join(process.cwd(), "content");
  if (fs.existsSync(fromCwd)) return fromCwd;
  return path.join(process.cwd(), "..", "content");
}

// ── request schema ─────────────────────────────────────────────────────────

const revealBodySchema = z.object({
  ...contentTargetSchema.shape,
  // Accepted only for request-shape compatibility with older clients. It is
  // never authoritative: the window key is derived from the coordinates above.
  moduleKey: z.string().min(1).max(200).optional(),
});

type RevealBody = z.infer<typeof revealBodySchema>;

// ── tier ladder ────────────────────────────────────────────────────────────

/**
 * Minimum tier to access paid note / PYQ / formula bodies.
 * Mirrors the lowest spark-gated section on the platform (currently "plus").
 */
const CONTENT_MIN_TIER: Tier = "plus";

// ── spark window check ─────────────────────────────────────────────────────

/**
 * Returns true only for the exact server-derived content identity. Owner and
 * pro tiers bypass the window check, but never the canonical path validation.
 */
async function hasActiveSparkWindow(
  userId: string,
  userTier: Tier,
  identityKey: string,
): Promise<boolean> {
  if (userTier === "owner" || userTier === "pro") return true;

  const nowEpoch = Math.floor(Date.now() / 1000);

  try {
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("credits_unlock")
      .eq("id", userId)
      .maybeSingle();

    if (!profile?.credits_unlock || typeof profile.credits_unlock !== "object") return false;

    // credits_unlock is a JSONB column: { [identityKey]: expiresAtEpoch }
    const windows = profile.credits_unlock as Record<string, unknown>;
    const expiresAt = windows[identityKey];
    return typeof expiresAt === "number" && Number.isFinite(expiresAt) && expiresAt > nowEpoch;
  } catch {
    return false;
  }
}

// ── route ──────────────────────────────────────────────────────────────────

/**
 * POST /api/content/reveal
 *
 * Auth chain:
 *   1. requireAuth        → 401 when no valid session
 *   2. Zod validate body  → 400 on bad shape / unknown kind
 *   3. filename pattern   → 400 on path-traversal attempt
 *   4. tier check         → 403 when tier < plus  (checked BEFORE spark)
 *   5. spark window check → 403 when no active window (owner/pro bypass)
 *   6. fs.readFile        → 200 + JSON body
 *
 * Spark spending stays exclusively in POST /api/user/credits/unlock.
 * This endpoint only *verifies* that a window is open; it never touches
 * the credits balance.
 */
router.post("/reveal", requireAuth, async (req: Request, res: Response) => {
  const user = (req as AuthedRequest).user;

  // 1. validate body
  const parsed = revealBodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body", details: parsed.error.flatten() });
    return;
  }

  const { kind, classSlug, subjectSlug, unitSlug, filename } = parsed.data as RevealBody;

  // 2. belt-and-suspenders filename safety (on top of the regex)
  if (
    filename.includes("..") ||
    filename.includes("/") ||
    filename.includes("\\") ||
    filename.includes("\0")
  ) {
    res.status(400).json({ error: "Invalid filename" });
    return;
  }

  // 3. reject unknown kinds and derive the canonical identity before any
  // privilege bypass. No client moduleKey participates in this decision.
  if (!Object.prototype.hasOwnProperty.call(CONTENT_KIND_SECTIONS, kind)) {
    res.status(400).json({ error: "Unknown content kind" });
    return;
  }
  const identity = canonicalContentIdentity({ kind, classSlug, subjectSlug, unitSlug, filename });
  if (!identity) {
    res.status(400).json({ error: "Invalid content identity" });
    return;
  }

  // 4. tier gate — checked BEFORE spark
  const isOwner = isOwnerEmail(user.email);
  const tierUser: TierUser = {
    email: user.email,
    role: user.role,
    plan: user.plan,
    premiumStatus: user.premiumStatus,
  };
  const userTier = tierForUser(tierUser, isOwner);

  if (TIER_RANK[userTier] < TIER_RANK[CONTENT_MIN_TIER]) {
    res.status(403).json({
      error: "This content requires a Plus or higher membership.",
      tier: userTier,
      required: CONTENT_MIN_TIER,
    });
    return;
  }

  // 5. spark window check for the exact canonical content identity
  const windowOpen = await hasActiveSparkWindow(user.id, userTier, identity.key);
  if (!windowOpen) {
    res.status(403).json({
      error: "No active spark window. Unlock this content first.",
      code: "NO_SPARK_WINDOW",
    });
    return;
  }

  // 6. build the corpus path from the same canonical identity used for the
  // window check, then retain the resolved-root containment defense.
  try {
    const { section, classDir } = identity;

    // Only alphanumeric, hyphens, underscores, dots in each slug
    const SAFE_SLUG = /^[\w.-]+$/;
    if (
      !SAFE_SLUG.test(classDir) ||
      !SAFE_SLUG.test(subjectSlug) ||
      !SAFE_SLUG.test(unitSlug)
    ) {
      res.status(400).json({ error: "Invalid slug in path" });
      return;
    }

    const contentRoot = findContentRoot();
    const filePath = path.join(
      contentRoot,
      ...identity.relativePath.split("/"),
    );

    // Ensure the resolved path stays inside the content root (no escape)
    const resolvedPath = path.resolve(filePath);
    const resolvedRoot = path.resolve(contentRoot);
    if (
      !resolvedPath.startsWith(resolvedRoot + path.sep) &&
      resolvedPath !== resolvedRoot
    ) {
      res.status(400).json({ error: "Path traversal detected" });
      return;
    }

    const raw = await readFile(resolvedPath, "utf-8");
    const data = JSON.parse(raw) as unknown;
    res.json(data);
  } catch (err: unknown) {
    const nodeErr = err as NodeJS.ErrnoException;
    if (nodeErr.code === "ENOENT") {
      res.status(404).json({ error: "Content file not found" });
      return;
    }
    console.error("[content-reveal] readFile error:", nodeErr.message ?? nodeErr);
    res.status(500).json({ error: "Failed to read content" });
  }
});

export default router;
