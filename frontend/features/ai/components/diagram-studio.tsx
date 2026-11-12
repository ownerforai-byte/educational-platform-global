"use client";

import { useRef, useState } from "react";
import { Check, Copy, Send, Shapes, Sparkles, Square, Wand2 } from "lucide-react";
import { MathMarkdown } from "@/components/content/math-markdown";
import { enhancePrompt, saveChatHistory, streamChat } from "@/lib/api/ai";
import type { AIChatMessage } from "@/types/api";
import { PLATFORM_SYSTEM_PROMPT } from "@/lib/ai/prompts";
import { recordAiSparkUse } from "@/components/ai/ai-spark-badge";
import { AiToolShell } from "@/components/ai/ai-tool-shell";

/**
 * THE DIAGRAM HUB (owner 2026-10-25: "one diagram hub (svg+ detailed or from
 * google (most detailed in english language even if those are in other
 * language, convert them in english))").
 *
 * One teaching surface whose whole job is diagrams: the student names a topic
 * and the hub produces a DETAILED labelled figure — a dedicated free-tier
 * Google AI Studio key draws it as a vector ```svg block (every part
 * hoverable), grounded in the platform's SERVER-SIDE Google/Wikimedia research
 * step (the free tier has no Google Search grounding of its own), with every
 * label in English no matter what language the sources used. The `task` marker
 * tells /api/ai to use that lane and skip essay floors; replies render through
 * the shared pipeline, so the student sees a picture — never raw code.
 *
 * Owner 2026-11-12: extra knowledge (related concepts, contrasts, mechanisms,
 * exam traps) lives in floating DETAIL DOTS inside the SVG, not in an essay.
 * Hovering or clicking a dot opens a widget with everything that dot carries.
 */

const DIAGRAM_SYSTEM = `${PLATFORM_SYSTEM_PROMPT}

CLASSROOM (DIAGRAM HUB): this interface exists to DRAW — one detailed, exam-grade diagram per request, nothing else.

1. SEARCH FIRST: use the attached research to copy the exact structure, orientation and standard textbook labels of the real diagram (Google / attached sources). If the source labels are in another language, TRANSLATE EVERY LABEL TO ENGLISH — the drawing is always 100% English.
2. DRAW ONE COMPLETE \`\`\`svg figure on a 900x640 canvas — razor-sharp lines and text, leader lines from every part to its label, standard notation, units on every axis. Wrap each labelled part in its own <g><title>Part Name | Function | Exam significance</title>…</g> so every label opens on hover.
3. Caption the fence line in English ("\`\`\`svg Labelled human heart — chambers and vessels").
4. After the figure, add AT MOST 4 short bullets: what each main part does and the one exam trap. The extra related / contrast knowledge belongs in the dots below, NOT here.
5. DETAIL DOTS (MANDATORY, 3-6): inside the same <svg>, add small floating dots beside the parts they explain. Each is <g class="edu-detail-dot"><title>DETAIL DOT | Topic | Related: a; b; c | Contrasts: A vs B — exact difference | Detail: deeper mechanism and conditions | Exam: the trap</title><circle cx="…" cy="…" r="7" fill="#2563eb"/><text x="…" y="…" fill="#ffffff" text-anchor="middle" font-size="10">i</text></g>. Keep each <title> on ONE line; use | only between fields and ; only between items; always include Related: and Contrasts:. Hovering or clicking a dot opens a floating widget with all of that information.
6. No essays — the picture is the answer. Do NOT write code on screen, do NOT emit a veer-image fence, and do NOT append links, citations or key terms.`;

const SUBJECTS = [
  "Physics",
  "Chemistry",
  "Biology",
  "Mathematics",
  "Nepali",
  "English",
] as const;

export function DiagramStudio() {
  const [topic, setTopic] = useState("");
  const [subject, setSubject] = useState<(typeof SUBJECTS)[number]>("Physics");
  const [messages, setMessages] = useState<AIChatMessage[]>([]);
  const [sending, setSending] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [enhancing, setEnhancing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sessionRef = useRef(`diagram:${Date.now().toString(36)}`);

  const handleEnhance = async () => {
    const text = topic.trim();
    if (!text || enhancing) return;
    setEnhancing(true);
    try {
      const { prompt } = await enhancePrompt(text);
      setTopic(prompt);
    } catch {
      /* keep the original brief */
    } finally {
      setEnhancing(false);
    }
  };

  const handleDraw = async () => {
    const brief = topic.trim();
    if (!brief || sending) return;

    const request: AIChatMessage = {
      role: "user",
      content: `Draw the detailed diagram for this ${subject} topic, in English:\n\n${brief}`,
    };
    const outbound = [...messages, request];
    setMessages(outbound);
    setTopic("");
    setSending(true);
    setError(null);
    const controller = new AbortController();
    abortRef.current = controller;

    // Hoisted above the try so the Stop branch in `catch` can settle the turn.
    let liveAcc = "";
    let sawToken = false;
    let lastPaint = 0;
    const paintLive = (force: boolean) => {
      const now = Date.now();
      if (!force && now - lastPaint < 40) return;
      lastPaint = now;
      setMessages((prev) => {
        const next = [...prev];
        const last = next[next.length - 1];
        if (last?.role === "assistant") {
          next[next.length - 1] = { role: "assistant", content: liveAcc };
        }
        return next;
      });
    };

    try {
      const payload: AIChatMessage[] = [
        { role: "system", content: DIAGRAM_SYSTEM },
        ...outbound,
      ];

      for await (const chunk of streamChat(payload, undefined, {
        isGuest: false,
        session: sessionRef.current,
        // Resolve server-side to the dedicated free Gemini diagram lane.
        task: "diagram",
        signal: controller.signal,
      })) {
        if (typeof chunk === "string") {
          if (!sawToken) {
            sawToken = true;
            liveAcc = chunk;
            setMessages((prev) => [...prev, { role: "assistant", content: chunk }]);
          } else {
            liveAcc += chunk;
            paintLive(false);
          }
        }
      }
      if (!liveAcc.trim()) throw new Error("No diagram received. Please try again.");
      paintLive(true);
      try {
        const saved = await saveChatHistory(sessionRef.current, [
          { role: "user", content: request.content },
          { role: "assistant", content: liveAcc },
        ]);
        if (!saved.migrated || saved.saved !== 2) setError("Your answer could not be saved to history.");
      } catch {
        setError("Your answer could not be saved to history.");
      }
      recordAiSparkUse();
    } catch (err: unknown) {
      if (controller.signal.aborted) {
        // CodeRabbit: an early Stop used to leave the unanswered brief in the
        // thread and to discard the last throttled paint. Settle the turn.
        if (sawToken) {
          paintLive(true);
        } else {
          setMessages((prev) => (prev[prev.length - 1]?.role === "user" ? prev.slice(0, -1) : prev));
          setTopic(brief);
        }
        return;
      }
      const msg =
        err instanceof Error && err.message
          ? err.message
          : "Couldn't draw that diagram. Please try again.";
      setError(msg);
    } finally {
      if (abortRef.current === controller) abortRef.current = null;
      setSending(false);
    }
  };

  const handleCopy = async () => {
    const last = [...messages].reverse().find((m) => m.role === "assistant");
    if (!last) return;
    try {
      await navigator.clipboard.writeText(last.content);
    } catch {
          }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AiToolShell
      icon={Shapes}
      title="Diagram hub"
      description="Detailed, labelled diagrams — drawn as sharp vector figures, researched from real references and always in English."
      accent="border-rose-500/25 bg-rose-500/10 text-rose-500"
      current="/ai/diagrams"
    >
    <div className="space-y-5">
      <div className="rounded-3xl border-2 border-border/80 bg-card p-5 sm:p-6">

        <div className="mt-4 flex flex-wrap gap-1.5">
          {SUBJECTS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSubject(s)}
              className={`rounded-full min-h-11 px-3 py-1 text-[11px] font-semibold transition ${
                subject === s
                  ? "bg-primary text-primary-foreground"
                  : "border border-border/70 text-muted-foreground hover:border-primary/50"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void handleDraw();
            }
          }}
          rows={2}
          placeholder="Name the diagram — e.g. 'labelled human heart with chambers and vessels' or 'ray diagram for a concave mirror'"
          className="mt-3 w-full resize-none rounded-2xl border-2 border-border/80 bg-background px-4 py-3 text-[13px] sm:text-[13px] placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
        />
        <div className="mt-2 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={handleEnhance}
            disabled={enhancing || !topic.trim()}
            className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border-2 border-border/80 px-3 text-[11px] font-semibold text-muted-foreground transition hover:border-primary/50 hover:text-foreground disabled:opacity-50"
          >
            <Wand2 className="h-3.5 w-3.5" />
            {enhancing ? "Enhancing…" : "Enhance brief"}
          </button>
          {sending ? (
            <button
              type="button"
              onClick={() => abortRef.current?.abort()}
              aria-label="Stop reply"
              className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-destructive px-5 text-[11px] font-bold text-destructive-foreground transition hover:opacity-90"
            >
              <Square className="h-3.5 w-3.5 fill-current" />
              Stop
            </button>
          ) : (
            <button
              type="button"
              onClick={() => void handleDraw()}
              disabled={!topic.trim()}
              className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-primary px-5 text-[11px] font-bold text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
            >
              <Send className="h-3.5 w-3.5" />
              Draw diagram
            </button>
          )}
        </div>
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-2xl border border-destructive/40 bg-destructive/10 px-4 py-2.5 text-[11px] font-semibold text-destructive"
        >
          {error}
        </p>
      )}

      <div ref={scrollRef} className="space-y-5">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={
                message.role === "user"
                  ? "max-w-[85%] min-w-0 rounded-2xl bg-primary px-4 py-3 text-[13px] text-primary-foreground [overflow-wrap:anywhere]"
                  : "min-w-0 w-full rounded-2xl border-2 border-border/80 bg-card px-3 py-4 shadow-sm sm:px-6 sm:py-6"
              }
            >
              {message.role === "assistant" ? (
                <div className="space-y-2">
                  <MathMarkdown content={message.content} className="chat-reading" />
                  {!sending && (
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="mt-1 inline-flex items-center gap-1 text-[10px] font-semibold text-muted-foreground transition hover:text-foreground"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3 w-3" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" /> Copy
                        </>
                      )}
                    </button>
                  )}
                </div>
              ) : (
                <p className="whitespace-pre-wrap">{message.content}</p>
              )}
            </div>
          </div>
        ))}

        {sending && (
          <p className="flex items-center gap-1.5 text-[11px] italic text-muted-foreground">
            <Sparkles className="h-3 w-3 text-primary" aria-hidden="true" />
            Researching the real diagram, then drawing it…
          </p>
        )}
      </div>
    </div>
    </AiToolShell>
  );
}
