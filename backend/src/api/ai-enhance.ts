import { Router, Request, Response } from "express";
import { requireAuth } from "../middleware/auth";
import { createAIService } from "../ai/service";
import { getSearchService } from "../ai/search-engine";

/**
 * POST /api/ai/enhance — rewrite a rough student prompt into a sharper,
 * more specific study question before it is sent to the AI tutor.
 *
 * 402 when the provider chain has no LLM available (rate-limited / quota),
 * so the UI can fall back to the original prompt.
 */
const router = Router();

const ENHANCER_SYSTEM = `You are a prompt enhancer for a NEB science study platform.
Rewrite the user's rough question into ONE clear, specific study question that will get a great answer from an AI tutor.

Rules:
- Keep the user's language (English or Nepali) and their intent.
- Add helpful specifics: subject, class level (NEB 11/12), and what kind of answer they want (definition, derivation, numerical, examples, comparison).
- Never answer the question. Output ONLY the rewritten question, nothing else.
- Max 60 words. No quotes, no prefixes like "Enhanced:".
- Do NOT show any thinking, analysis, or reasoning steps. Reply with the final question only.`;

/**
 * Post-process an enhancer reply: strip reasoning-model CoT leakage
 * ("Here's a thinking process: 1. ...", "Final decision: ...", <think>…</think>)
 * and any preamble like "Enhanced:". Reasoning models usually state their final
 * question inside quotes, so prefer the last quoted question-like string.
 */
function cleanEnhancedPrompt(text: string): string {
  let out = text.trim();
  // Explicit <think> blocks from reasoning models.
  out = out.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
  const leakMarkers = [
    /here'?s (a|the) thinking process/i,
    /let'?s (analyze|think|break this down)/i,
    /^(1|2|3)\.\s+(analyze|identify|check)/i,
    /^\*\*(analyze|analysis|step 1)/i,
    /final (decision|answer|question|output)\s*:?/i,
    /the (user|student) (is )?(probably )?(asking|wants)/i,
  ];
  const leaked = leakMarkers.some((re) => re.test(out));
  if (leaked) {
    // Prefer the last quoted string that looks like a question (the final answer).
    const quoted = [...out.matchAll(/["“]([^"”]{12,300})["”]/g)].map((m) => m[1].trim());
    const best = [...quoted].reverse().find((q) => q.includes("?") || q.split(/\s+/).length >= 6);
    if (best) {
      out = best;
    } else {
      const lines = out
        .split(/\n+/)
        .map((l) => l.trim())
        .filter(Boolean);
      if (lines.length > 1) out = lines[lines.length - 1];
    }
  }
  out = out.replace(/^(enhanced( prompt)?|rewritten question)\s*:\s*/i, "");
  // Drop dangling fragments left by token truncation (", but that might be").
  out = out.replace(/[,;]\s*(but|and|though|although|which)\b[^.?!]*$/i, "");
  out = out.replace(/\b(but|and|though)\s+(that|this|it)\s+(might|could|would|may)\b[^.?!]*$/i, "");
  // Keep it to one question line.
  const sentences = out.split(/(?<=[.?！？])\s+/).filter(Boolean);
  if (sentences.length > 2) out = sentences.slice(0, 2).join(" ");
  return out.replace(/^["“”']+|["“”']+$/g, "").trim();
}

let _service: ReturnType<typeof createAIService> | null = null;
function getService() {
  if (!_service) _service = createAIService();
  return _service;
}

router.post("/", requireAuth, async (req: Request, res: Response) => {
  const raw =
    typeof req.body?.prompt === "string" ? req.body.prompt.trim().slice(0, 2000) : "";
  if (!raw) {
    res.status(400).json({ error: "prompt is required" });
    return;
  }

  const service = getService();

  // Web context helps the enhancer add current, specific framing (best-effort).
  let context = "";
  try {
    const svc = getSearchService();
    if (svc.isEnabled()) {
      context = await Promise.race([
        svc.searchAsContext(raw, 3),
        new Promise<string>((resolve) => setTimeout(() => resolve(""), 4000)),
      ]);
    }
  } catch {
    // ignore
  }

  try {
    const enhanced = await service.chat("", [
      { role: "system", content: ENHANCER_SYSTEM + (context ? `\n\n${context}` : "") },
      { role: "user", content: raw },
    ]);
    const text = cleanEnhancedPrompt(enhanced);
    // Guard: the keyword-based internal engine would echo links/quick-takes
    // instead of rewriting — treat those as "no LLM available".
    const looksInternal =
      text.includes("ravikisan.vercel.app") ||
      text.startsWith("Quick take:") ||
      text.includes("isn't in the vault");
    if (!text || looksInternal) {
      res.status(402).json({ error: "Enhancer unavailable, keeping your original prompt" });
      return;
    }
    res.json({ prompt: text });
  } catch {
    res.status(402).json({ error: "Enhancer unavailable, keeping your original prompt" });
  }
});

export default router;
