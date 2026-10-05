import { Router, Request, Response } from "express";
import { PUBLIC_SITE_URL } from "../config/env";
import { requireAuth, requireOwnerEmail } from "../middleware/auth";
import { createAIService } from "../ai/service";

/**
 * POST /api/ai/image-facts { q } — the facts half of the Image Hub's details
 * interface (owner request 2026-10-04: "best detailed, info fact and create
 * the details interface").
 *
 * When a student opens a Google image, Veer writes a short facts card about
 * the SUBJECT the picture shows. The policy follows the platform's fact rule
 * exactly as the chat prompt does: only official-allowlist knowledge (CDC /
 * NEB textbooks / dictionaries) — the image itself is never cited as a source
 * of truth, only as the thing the facts are about.
 *
 * Best-effort by contract: 402 when the provider chain has no LLM (same
 * contract as /api/ai/enhance), so the details panel degrades to its
 * metadata-only state instead of failing the modal.
 *
 * OWNER EMAILS ONLY (owner request 2026-10-05) — like the rest of the hub.
 */
const router = Router();

const FACTS_SYSTEM = `You write exam-fact cards for a NEB (Nepali board) science study platform.

The student opened a picture of: SUBJECT (given below). Write 5 short, exam-useful facts about that SUBJECT.

Rules:
- Official syllabus truth ONLY (CDC / NEB textbooks / dictionaries) — never guess from the picture, never mention the image, the website, or where it came from.
- One fact per line. Max 22 words each. No numbering, no bullets, no headings, no preamble, no "Sure" or "Here are".
- Concrete: definitions, values, formulas, causes, exam hooks — not filler like "it is important".
- English unless the subject is Nepali or Hindi by name.
- Output ONLY the fact lines.`;

/** Split a model reply into clean fact lines (bullets/numbering stripped). */
export function parseFactLines(text: string): string[] {
  const lines = text
    .split(/\r?\n/)
    .map((line) =>
      line
        .replace(/^\s*(?:[-*•]+|\d{1,2}[.)])\s*/, "")
        .replace(/\*\*/g, "")
        .trim(),
    )
    .filter((line) => line.length > 0);

  // Drop a bare label line like "Facts:" / "Key facts".
  while (lines.length > 0 && /^(facts?|key facts|here are .*)[:\s]*$/i.test(lines[0])) {
    lines.shift();
  }

  if (lines.length >= 2) return lines.slice(0, 6);

  // A single long line is usually a model that answered as prose instead of
  // line-broken facts — split it into sentences. A genuinely short single
  // fact stays as-is (the stripped, cleaned line — never the raw reply).
  const candidate = lines[0] ?? text.replace(/\*\*/g, "").trim();
  if (!candidate) return [];
  const sentences = candidate
    .split(/(?<=[.!?。])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  if (sentences.length >= 2) return sentences.slice(0, 6);
  return lines.slice(0, 6);
}

let _service: ReturnType<typeof createAIService> | null = null;
function getService() {
  if (!_service) _service = createAIService();
  return _service;
}

router.post("/", requireAuth, requireOwnerEmail, async (req: Request, res: Response) => {
  const subject =
    typeof req.body?.q === "string" ? req.body.q.trim().slice(0, 300) : "";
  if (!subject) {
    res.status(400).json({ error: "q required" });
    return;
  }

  try {
    const service = getService();
    const reply = await service.chat("", [
      { role: "system", content: FACTS_SYSTEM },
      { role: "user", content: subject },
    ]);
    // Same guard as /api/ai/enhance: the keyless internal engine answers with
    // vault links / quick-takes instead of writing the card — that is "no LLM",
    // not a facts card.
    const looksInternal =
      (reply ?? "").includes(PUBLIC_SITE_URL) ||
      (reply ?? "").startsWith("Quick take:") ||
      (reply ?? "").includes("isn't in the vault");
    const facts = looksInternal ? [] : parseFactLines(reply ?? "");
    if (facts.length === 0) {
      res.status(402).json({ error: "Facts unavailable" });
      return;
    }
    res.json({ facts });
  } catch {
    res.status(402).json({ error: "Facts unavailable" });
  }
});

export default router;
