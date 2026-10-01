/**
 * IMAGE-GEN — "draw a figure live, then keep the chat going".
 *
 * Owner request (2026-09-30): when an answer needs a picture, the model should
 * WRITE the answer, GENERATE the figure where it belongs, and CONTINUE — in
 * that order, visibly.
 *
 * Protocol (model → platform):
 *   The model places exactly one fenced block at the very end of its answer,
 *   after all text (before the "Explore further" links when present):
 *
 *       ```veer-image
 *       one short English line describing exactly what to draw (max 120 chars)
 *       ```
 *
 *   The fence language is `veer-image` on purpose: it must not collide with
 *   the existing model-drawn-SVG fences (`svg` / `diagram` / `figure`, see
 *   frontend/lib/content/visuals.ts) — those carry SVG markup, this carries a
 *   plain drawing instruction.
 *
 * Engines (ordered, per owner choice 2026-09-30 "wire agnes 2.1 for sure"):
 *   1. Agnes `agnes-image-2.1-flash` (auto-fallback `agnes-image-2.0-flash`)
 *      — same gateway + AGNES_API_KEY as chat; verified live 2026-09-30.
 *   2. Browser-side puter.js (`frontend/lib/puter-image.ts`) — fires only
 *      when the server-side image(s) failed, so a single answer costs at most
 *      one extra engine. The student may be asked to sign into a free Puter
 *      account (User-Pays model: the app pays nothing).
 *
 * Kill-switch: AI_IMAGE_GEN=off disables the server engine + the prompt
 * instruction + the fence scanner (answers simply never carry fences).
 */

// ── config ────────────────────────────────────────────────────────────────────

/** Verify the gateway with AI_IMAGE_GEN=on|off (default: on when a key exists). */
export function imageGenEnabled(): boolean {
  if (process.env.AI_IMAGE_GEN?.trim().toLowerCase() === "off") return false;
  return !!process.env.AGNES_API_KEY;
}

/** Ordered image-model chain. Override with AI_IMAGE_MODELS (comma list). */
const IMAGE_MODELS: string[] =
  process.env.AI_IMAGE_MODELS?.split(",")
    .map((s) => s.trim())
    .filter(Boolean) ?? ["agnes-image-2.1-flash", "agnes-image-2.0-flash"];

/** Verified sizes: the 2026-09-30 probe succeeded at 512x512. */
const IMAGE_SIZE = process.env.AI_IMAGE_SIZE || "512x512";

const IMAGE_GEN_TIMEOUT_MS = Number(process.env.AI_IMAGE_GEN_TIMEOUT_MS) || 120_000;

/** A figure instruction is a drawing brief, not an essay. */
const MAX_PROMPT_CHARS = 500;

/** The fence language the model writes. */
export const FIGURE_FENCE = "veer-image";

export interface FigureSpec {
  /** The model's one-line drawing instruction. */
  prompt: string;
  /** Short human label shown as the caption (first line, trimmed). */
  caption: string;
}

export interface GeneratedFigure extends FigureSpec {
  url?: string;
  reason?: string;
}

// ── Agnes generator ───────────────────────────────────────────────────────────

/**
 * Generate one figure with the ordered Agnes image chain.
 * Best-effort: every failure path resolves to { reason }, never throws —
 * a dead image engine must not cost the student their answer.
 */
export async function generateVeerImage(
  prompt: string,
): Promise<{ url?: string; reason?: string; model?: string }> {
  const clean = (prompt ?? "").trim().slice(0, MAX_PROMPT_CHARS);
  if (!imageGenEnabled() || !clean) {
    return { reason: "image generation is disabled or no instruction was given" };
  }

  const key = process.env.AGNES_API_KEY;
  const baseUrl = (process.env.AGNES_API_URL || "https://apihub.agnes-ai.com").replace(/\/v1\/?$/, "");

  for (const model of IMAGE_MODELS) {
    try {
      const res = await fetch(`${baseUrl}/v1/images/generations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({ model, prompt: clean, n: 1, size: IMAGE_SIZE }),
        signal: AbortSignal.timeout(IMAGE_GEN_TIMEOUT_MS),
      });
      if (!res.ok) {
        const text = await res.text();
        console.warn(
          `[image-gen] ${model} → ${res.status}: ${text.slice(0, 200)}`,
        );
        continue;
      }
      const data: any = await res.json();
      const url = data?.data?.[0]?.url;
      if (typeof url === "string" && url.trim()) {
        console.info(`[image-gen] ${model} drew "${clean.slice(0, 60)}…" in ${url.slice(0, 60)}`);
        return { url, model };
      }
      console.warn(`[image-gen] ${model} returned no url`);
    } catch (err) {
      console.warn(
        `[image-gen] ${model} failed:`,
        err instanceof Error ? err.message : err,
      );
    }
  }
  return { reason: "all image models failed" };
}

// ── fence streaming filter ───────────────────────────────────────────────────

/**
 * TOKEN-LEVEL fence filter for the live stream.
 *
 * The model's fence arrives as ordinary text deltas, so it is SUPPRESSED from
 * the content the student sees: the opening fence line is swallowed, the
 * instruction line(s) are collected, and the closing fence triggers a
 * figureStart event exactly once.
 *
 * Streaming rule (owner 2026-10-01: "reply like Claude/ChatGPT — it must keep
 * typing, not arrive at once"): every delta that CANNOT be the start of a
 * figure fence is forwarded IMMEDIATELY. The previous line-buffered version
 * held all text until a "\n" arrived, which turned a paragraph of prose into
 * one lump and made the reply look like it landed in bursts. Now only two
 * things are ever held back: the body of an open fence, and a trailing partial
 * line that could still grow into the opener (e.g. "``", "```", "```vee"…).
 * Plain text is byte-for-byte identical to the input.
 */
export class FigureStreamFilter {
  private buf = "";
  private inFigure = false;
  private figLines: string[] = [];
  /** Every figure the filter has seen (resolved later by the caller). */
  figures: FigureSpec[] = [];

  /** The opener, e.g. "```veer-image" (the language may change with config). */
  private static readonly OPEN_RE = new RegExp(
    "^```" + FIGURE_FENCE + "(\\s|$)",
    "i",
  );

  /**
   * Could the pending tail (a newline-free partial line) still turn into a
   * fence opener? True for a prefix of the marker ("`", "```", "```veer")
   * and for the marker itself once its brief arrives on the same line.
   */
  private couldOpenFigure(): boolean {
    const tail = this.buf.trim();
    // Whitespace-only: may be up to 3 spaces of markdown fence indentation.
    if (!tail) return true;
    const marker = "```" + FIGURE_FENCE;
    if (marker.toLowerCase().startsWith(tail.toLowerCase())) return true;
    return FigureStreamFilter.OPEN_RE.test(tail);
  }

  /** Feed one delta; returns content chunks to forward + figure events. */
  push(
    delta: string,
  ): { chunks: string[]; figureStarts: FigureSpec[] } {
    this.buf += delta;
    const chunks: string[] = [];
    const figureStarts: FigureSpec[] = [];

    for (;;) {
      const idx = this.buf.indexOf("\n");
      if (idx === -1) {
        // No complete line yet: inside a fence the body stays hidden, and a
        // tail that could still become an opener is held. Everything else is
        // ordinary prose → forward it right now (this is the typing effect).
        if (this.inFigure || this.couldOpenFigure()) break;
        chunks.push(this.buf);
        this.buf = "";
        break;
      }
      const line = this.buf.slice(0, idx);
      this.buf = this.buf.slice(idx + 1);
      const trimmed = line.trim();

      if (this.inFigure) {
        if (/^```$/.test(trimmed)) {
          this.inFigure = false;
          const prompt = this.figLines.join(" ").trim();
          if (prompt) {
            const spec: FigureSpec = {
              prompt: prompt.slice(0, MAX_PROMPT_CHARS),
              caption: (this.figLines[0] ?? "").trim().slice(0, 48),
            };
            this.figures.push(spec);
            figureStarts.push(spec);
          }
          this.figLines = [];
        } else {
          this.figLines.push(line.trim());
        }
        continue; // figure lines never reach the student as text
      }

      if (FigureStreamFilter.OPEN_RE.test(trimmed)) {
        this.inFigure = true;
        this.figLines = [];
        continue; // swallow the opening fence line
      }

      chunks.push(line + "\n");
    }

    return { chunks, figureStarts };
  }

  /**
   * End of stream. Two cases: a dangling incomplete line (re-emit it), and a
   * figure fence that was never closed (close it with whatever was collected —
   * a too-short brief just fails generation, which the caller reports).
   *
   * The most common "never closed" shape is the model ending its answer EXACTLY
   * at the closing fence: the final "```" line has no trailing newline, so it
   * is still sitting in the buffer. Strip that token before folding the buffer
   * into the brief, or the drawing instruction would read "…diagram ```".
   */
  flush(): { tail: string; figureStarts: FigureSpec[] } {
    const figureStarts: FigureSpec[] = [];
    let tail = "";
    if (this.inFigure) {
      const leftover = this.buf.replace(/\s*```+\s*$/, "").trim();
      this.buf = "";
      const prompt = [...this.figLines, leftover].filter(Boolean).join(" ").trim();
      this.inFigure = false;
      if (prompt) {
        const spec: FigureSpec = {
          prompt: prompt.slice(0, MAX_PROMPT_CHARS),
          caption: (this.figLines[0] ?? prompt).trim().slice(0, 48),
        };
        // Recorded ONCE: dangling figures reach the caller through
        // figureStarts only — push() already carries the closed ones, so
        // callers never see a duplicate.
        figureStarts.push(spec);
      }
    } else {
      tail = this.buf;
      this.buf = "";
    }
    return { tail, figureStarts };
  }
}

// ── non-stream resolution ─────────────────────────────────────────────────────

/**
 * Post-process a finished answer: replace every ```veer-image fence with a
 * markdown image (or an inline note when drawing failed). Used by the
 * non-stream and guest routes.
 */
export async function resolveFiguresInText(
  text: string,
  generate?: (prompt: string) => Promise<{ url?: string; reason?: string }>,
): Promise<{ text: string; figures: GeneratedFigure[] }> {
  const generator = generate ?? generateVeerImage;
  const filter = new FigureStreamFilter();
  // Push the whole text at once, then flush — collects every figure spec.
  filter.push(text);
  const flushed = filter.flush();
  const specs = [...filter.figures, ...flushed.figureStarts];

  const figures: GeneratedFigure[] = [];
  let out = text;
  for (const spec of specs) {
    const result = await generator(spec.prompt);
    const figure: GeneratedFigure = { ...spec, url: result.url, reason: result.reason };
    figures.push(figure);
    const markdown = result.url
      ? `![${spec.caption || "figure"}](${result.url})`
      : `*(Figure not drawn${spec.caption ? `: ${spec.caption}` : ""} — ${result.reason ?? "unknown"})*`;
    // Replace the first fence occurrence that produced THIS spec, in order.
    out = out.replace(regexForFence(spec.prompt), markdown);
  }
  // A fence whose lines never reached us (pathological split) is stripped
  // anyway so raw fence markup can never reach the student.
  out = out.replace(new RegExp("```" + FIGURE_FENCE + "[\\s\\S]*?```", "gi"), "");
  return { text: out, figures };
}

function regexForFence(prompt: string): RegExp {
  const esc = prompt.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // The fence body is the instruction; tolerate whitespace variations.
  return new RegExp(
    "```" + FIGURE_FENCE + "\\s*" + esc + "[\\s\\S]*?\\n?\\s*```",
    "i",
  );
}

// ── prompt instruction (appended to the professor context when enabled) ─────

export const FIGURE_TOOL_INSTRUCTION = [
  `[FIGURE TOOL — LIVE FIGURE DRAWING]`,
  `You can draw ONE figure into the answer when a NEW drawn picture teaches more than words (a ray or apparatus diagram, a labelled structure, a schematic) and the attached REAL DIAGRAM FILES do not already show that exact concept.`,
  `To draw it, place exactly this fenced block at the VERY END of your answer — after all your text, immediately before the "Explore further" links when you include them:`,
  `\`\`\`${FIGURE_FENCE}`,
  `one short English line (max 120 characters) describing exactly what to draw: objects, labels, arrows, scale hints.`,
  `\`\`\``,
  `Figure rules: at most ONE figure per answer; write the instruction as a plain drawing brief, not a sentence of your answer; prefer the attached real diagram files when they cover the concept (embed those with normal markdown instead of drawing); never invent image URLs yourself — the platform draws the figure, shows it live, and the conversation continues.`,
].join("\n");

/** Append the figure-tool instruction to the professor context when enabled. */
export function withFigureToolInstruction(context: string): string {
  if (!imageGenEnabled()) return context;
  return context ? `${context}\n\n${FIGURE_TOOL_INSTRUCTION}` : FIGURE_TOOL_INSTRUCTION;
}
