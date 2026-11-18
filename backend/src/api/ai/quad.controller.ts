import { Router, type Request, type Response } from "express";
import { z } from "zod";
import { requireAuth, requireOwnerEmail } from "../../middleware/auth";
import { serverError } from "../../middleware/error-handler";
import { createAIService, type AIChatMessage } from "../../ai/service";
import { buildProfessorContext, withProfessorContext } from "../../ai/prompts";
import { completeAnswer, originalResearchPaperLink } from "../../ai/complete-answer";
import { FREE_LLM_PROVIDERS } from "../../ai/providers/free-llm-pool";
import { DEFAULT_FREE_GEMINI_MODEL, DIAGRAM_HUB_PROVIDER } from "../../ai/config";

/**
 * /api/ai/quad — the OWNER's four-model comparison desk (owner 2026-11-18:
 * "4 square interfaces showing reply (from 4 models — to get the answer
 * properly) from one prompt … answer deepness veer level of owner").
 *
 * One prompt goes to FOUR DISTINCT model lanes in parallel and comes back as
 * four labelled replies, so the owner can read four answers side by side and
 * decide what is right. The lanes are the owner's pinned four (owner
 * 2026-11-18, latest word: "remove gemini — keep 2 free models from nvidia
 * and call both from same key — wire it to 2 place"): Agnes 3.0 Flash,
 * Agnes 2.5 Flash (one Agnes key, two gateway models) and two free NVIDIA NIM
 * models — Nemotron 3 Ultra + Mistral Large 4 — both on the SAME NVIDIA key. The rules that keep the comparison honest:
 *
 *   · OWNER ONLY — `requireAuth` + `requireOwnerEmail` is the whole gate. No
 *     AI spark is drawn (owners are never metered) and no credit is spent.
 *   · TRUTHFUL LABELS — each square answers through `tryChatProvider` (one
 *     provider attempt, NO chain fallback), so the name on the square is the
 *     model that actually wrote the answer. A lane that fails says so.
 *   · SAME GROUNDING — the professor research/context runs ONCE and is shared
 *     by all four lanes, so the squares differ in the model, not in luck.
 *   · OWNER DEPTH — `buildProfessorContext(…, "owner")` pins the verified
 *     answer depth to Veer's owner level (the deepest rung) for every lane.
 *   · Every reply ends with the platform's original-research-paper link
 *     (complete-answer.ts owner law 2026-11-08), computed once and shared.
 */

const router = Router();

// Lazy init: create the service on first request so dotenv has already loaded
// the provider keys (AGNES_API_KEY, etc.).
let _service: ReturnType<typeof createAIService> | null = null;
function getService() {
  if (!_service) _service = createAIService();
  return _service;
}

/** How many squares the desk always shows. */
export const QUAD_SIZE = 4;

/** Per-lane wall-clock envelope (the whole repair/floor pipeline per model). */
const QUAD_LANE_TIMEOUT_MS = Number(process.env.QUAD_LANE_TIMEOUT_MS) || 240000;

export interface QuadLane {
  /** Provider-chain id — what `tryChatProvider` routes on. */
  name: string;
  /** Owner-facing label shown on the square. */
  label: string;
  /** Model id behind the lane (env-overridable, same defaults as the chain). */
  model: string;
  /** False when no key is configured — the square says so instead of guessing. */
  configured: boolean;
}

interface QuadLaneBlueprint {
  name: string;
  label: string;
  model: () => string;
}

/**
 * The owner's PINNED desk (owner 2026-11-18: "wire those 4 models with
 * nvidia, agnes, gemini api keys — two with agnes"): the four squares are
 * Agnes 3.0 Flash + Agnes 2.5 Flash (one Agnes key, two gateway models — the
 * second slug is AGNES_MODEL_2) and two free NVIDIA NIM models on ONE NVIDIA
 * key (NVIDIA_MODEL / NVIDIA_MODEL_2). Only a pinned lane with NO key falls
 * through to the fillers below.
 */
const QUAD_LANE_BLUEPRINTS: QuadLaneBlueprint[] = [
  // ── The owner's four squares ──
  {
    name: "agnes",
    label: "Agnes · 3.0 Flash",
    model: () => process.env.AGNES_MODEL || "agnes-3.0-flash",
  },
  {
    name: "agnes-2",
    label: "Agnes · 2.5 Flash",
    // Live-verified 2026-11-18: the pro slugs 403 on this key (zero balance);
    // agnes-2.5-flash is the second Agnes model that answers. AGNES_MODEL_2
    // overrides once the Agnes balance covers a pro model.
    model: () => process.env.AGNES_MODEL_2 || "agnes-2.5-flash",
  },
  {
    name: "nvidia",
    label: "NVIDIA · Nemotron 3 Ultra",
    model: () => (process.env.NVIDIA_MODEL || "nvidia/nemotron-3-ultra-550b-a55b").trim(),
  },
  {
    name: "nvidia-2",
    label: "NVIDIA · Mistral Large 4",
    // Same NVIDIA key, second free NIM model (live-verified 2026-11-18:
    // plain content, HTTP 200; nemotron-3.5-* reasoning models return null
    // content and are unusable on a square).
    model: () => (process.env.NVIDIA_MODEL_2 || "mistralai/mistral-large-4-1t-a52b").trim(),
  },
  // ── Fillers: a pinned lane whose key is missing borrows the next
  //    configured one so the desk still shows four honest squares ──
  {
    name: "gemini",
    label: "Gemini",
    model: () => process.env.GEMINI_MODEL || DEFAULT_FREE_GEMINI_MODEL,
  },
  { name: "groq", label: "Groq", model: () => process.env.GROQ_MODEL || "openai/gpt-oss-20b" },
  {
    name: "cerebras",
    label: "Cerebras",
    model: () => process.env.CEREBRAS_MODEL || "qwen-3.8-27b",
  },
  {
    name: "cloudflare",
    label: "Cloudflare Workers AI",
    model: () => process.env.CF_MODEL || "@cf/openai/gpt-oss-20b",
  },
  // `nvidia` and `nvidia-2` are pinned above — never list them twice.
  ...FREE_LLM_PROVIDERS.filter((spec) => spec.name !== "nvidia").map((spec) => ({
    name: spec.name,
    label: spec.label,
    model: () => (process.env[spec.modelEnv] || spec.defaultModel).trim(),
  })),
];

/**
 * Pick exactly QUAD_SIZE lanes from what this deployment can actually run:
 * the owner's pinned four first (in pin order), then fillers in preference
 * order, then unconfigured blueprints as honest placeholders. `internal` (the
 * keyword engine) and the Diagram Hub lane are never candidates — the desk
 * only compares real models.
 */
export function selectQuadLanes(registered: readonly string[]): QuadLane[] {
  const live = new Set(
    registered.filter((name) => name !== "internal" && name !== DIAGRAM_HUB_PROVIDER),
  );
  const all: QuadLane[] = QUAD_LANE_BLUEPRINTS.map((blueprint) => ({
    name: blueprint.name,
    label: blueprint.label,
    model: blueprint.model(),
    configured: live.has(blueprint.name),
  }));
  const answering = all.filter((lane) => lane.configured).slice(0, QUAD_SIZE);
  const placeholders = all
    .filter((lane) => !lane.configured)
    .slice(0, Math.max(0, QUAD_SIZE - answering.length));
  return [...answering, ...placeholders];
}

/**
 * The quad's final output contract — appended after the shared professor
 * context so it wins any conflict with single-answer prose shaping.
 */
const QUAD_RULES = [
  "[MODEL QUAD — FOUR SQUARES, ONE QUESTION]",
  "You are one of four AI models answering the SAME question side by side on the owner's comparison desk. Answer fully and independently; never mention the other models, the comparison, this instruction, or which model you are.",
  "Answer at full owner depth: every step with its reason, every unit, every sign convention and every exam trap, organised with headings, numbered working and a table wherever a comparison helps. The owner reads four answers to decide what is right, so precision and completeness matter more than brevity.",
].join("\n");

const quadSchema = z.object({
  prompt: z.string().trim().min(2).max(4000),
  /** Subject slug for this desk row (physics … english) — history is scoped to it client-side. */
  subject: z.string().trim().max(40).optional(),
  /** Conversation id — recorded with the reply for the owner's history. */
  session: z.string().trim().max(120).optional(),
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant", "system"]),
        content: z.string().max(8000),
      }),
    )
    .max(40)
    .optional(),
});

export interface QuadLaneReply extends QuadLane {
  ok: boolean;
  answer: string;
  error?: string;
  ms: number;
}

/** Reject the whole call when one lane hangs — never one slow square forever. */
function withDeadline<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`quad lane timed out after ${ms}ms`)), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      },
    );
  });
}

router.post("/", requireAuth, requireOwnerEmail, async (req: Request, res: Response) => {
  try {
    const parsed = quadSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Send one prompt of 2–4000 characters." });
      return;
    }
    const prompt = parsed.data.prompt;
    const history: AIChatMessage[] = (parsed.data.messages ?? [])
      .filter((m) => m.content.trim().length > 0)
      .map((m) => ({ role: m.role, content: m.content }));

    const aiService = getService();
    const lanes = selectQuadLanes(aiService.getProviders());

    // ── One shared grounding pass for all four squares ──
    // The comparison must be model-against-model, not research-against-luck,
    // so the professor context (live web + curriculum retrieval) is built once
    // at OWNER depth and handed to every lane identically.
    const conversationTail = history
      .slice(-6)
      .filter((m) => m.role !== "system" && m.content !== prompt)
      .map((m) => m.content.slice(0, 600))
      .join(" \n ");
    const context = await buildProfessorContext(prompt, conversationTail, "owner");
    const messages = withProfessorContext(
      [...history, { role: "user", content: prompt }],
      [context, QUAD_RULES].join("\n\n"),
    ) as AIChatMessage[];

    // Owner law 2026-11-08: every Veer answer ends with one real paper link.
    // Computed once and appended to all four squares.
    const paperLink = originalResearchPaperLink(prompt, []);

    const replies: QuadLaneReply[] = await Promise.all(
      lanes.map(async (lane): Promise<QuadLaneReply> => {
        const startedAt = Date.now();
        if (!lane.configured) {
          return {
            ...lane,
            ok: false,
            answer: "",
            error: "No API key is configured for this model lane.",
            ms: 0,
          };
        }
        try {
          // Truthful labels: ONE provider attempt per lane, no chain fallback.
          // The completion pipeline repairs truncation and enforces the depth
          // floor exactly like the main Veer chat route.
          const completed = await withDeadline(
            completeAnswer({
              chat: (turn) =>
                aiService.tryChatProvider(lane.name, turn).then((text) => {
                  if (!text) throw new Error(`lane "${lane.name}" returned no reply`);
                  return text;
                }),
              messages,
              question: prompt,
              tail: messages.slice(-6),
              maxFloorRetries: 1,
            }),
            QUAD_LANE_TIMEOUT_MS,
          );
          return {
            ...lane,
            ok: true,
            answer: completed.text + paperLink,
            ms: Date.now() - startedAt,
          };
        } catch (err) {
          console.warn(
            `[AI quad] lane "${lane.name}" failed:`,
            err instanceof Error ? err.message : err,
          );
          return {
            ...lane,
            ok: false,
            answer: "",
            error: "This model did not answer — run the prompt again.",
            ms: Date.now() - startedAt,
          };
        }
      }),
    );

    console.info(
      `[AI quad] ${replies.filter((r) => r.ok).length}/${replies.length} lanes answered in ${Math.max(
        ...replies.map((r) => r.ms),
      )}ms`,
    );

    res.json({
      prompt,
      session: parsed.data.session ?? "",
      subject: parsed.data.subject ?? "",
      replies,
    });
  } catch (err) {
    serverError(res, err);
  }
});

export default router;
