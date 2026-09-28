"use client";

/**
 * TutorConsole — the AI chat's OWN interface (route: /chat).
 *
 * Deliberately separate from the AI Studio tab shell (/ai keeps the older
 * AIChatInterface). Its own feature set:
 *
 *   1. Subject-mode picker (General / Physics / Chemistry / Biology /
 *      Mathematics) — injects a focus instruction into the system prompt
 *      and re-themes the suggested starters,
 *   2. Per-answer quick actions — Copy, Regenerate, Go deeper, Keep it
 *      short — plus a thread Summarize and a Practice-quiz handoff,
 *   3. Chat → quiz: seeds /ai-quiz with the current subject + last question
 *      (sessionStorage `neb_quiz_seed`, consumed by QuizStudio).
 *
 * The green "profident online" ping dot in the header is the tutor's
 * identity mark — kept byte-identical to the original on purpose
 * ("no removal in that light").
 */

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Send,
  Bot,
  User,
  Sparkles,
  Trash2,
  Copy,
  Check,
  Coins,
  Atom,
  FlaskConical,
  Dna,
  Sigma,
  RefreshCw,
  Layers,
  AlignLeft,
  ListChecks,
  Brain,
  Wand2,
  AlertCircle,
} from "lucide-react";
import {
  chat,
  guestChat,
  getChatHistory,
  saveChatHistory,
  clearChatHistory,
  enhancePrompt,
} from "@/lib/api/ai";
import { PLATFORM_SYSTEM_PROMPT } from "@/lib/ai/prompts";
import {
  GUEST_DAILY_LIMIT as MAX_GUEST_MESSAGES,
  readGuestCount,
  writeGuestCount,
} from "@/lib/ai/guest-quota";
import type { AIChatMessage } from "@/types/api";
import { useSession } from "@/features/auth/hooks/use-session";
import { MathMarkdown } from "@/components/content/math-markdown";
import { stripLinksForCopy } from "@/lib/ai/clean-copy";
import { cn } from "@/lib/utils";

// ── Subject modes ───────────────────────────────────────────────────────────

type TutorMode = "General" | "Physics" | "Chemistry" | "Biology" | "Mathematics";

interface ModeDef {
  id: TutorMode;
  icon: React.ComponentType<{ className?: string }>;
  /** Seed for the quiz handoff (undefined = let the quiz ask). */
  subjectSlug?: string;
}

const MODES: ModeDef[] = [
  { id: "General", icon: Sparkles },
  { id: "Physics", icon: Atom, subjectSlug: "physics" },
  { id: "Chemistry", icon: FlaskConical, subjectSlug: "chemistry" },
  { id: "Biology", icon: Dna, subjectSlug: "biology" },
  { id: "Mathematics", icon: Sigma, subjectSlug: "mathematics" },
];

const MODE_STORAGE_KEY = "neb_tutor_mode";
/** Signed-out thread — history on this device (owner rule 2026-09-27). */
const GUEST_THREAD_KEY = "neb_tutor_thread";

interface Starter {
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  text: string;
}

const GENERAL_STARTERS: Starter[] = [
  {
    category: "Physics",
    icon: Atom,
    color: "text-sky-500 bg-sky-500/10 border-sky-500/30",
    text: "Derive the Lens Maker's formula step by step with sign conventions.",
  },
  {
    category: "Chemistry",
    icon: FlaskConical,
    color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30",
    text: "Explain the Inert Pair Effect in heavier p-block elements with examples.",
  },
  {
    category: "Biology",
    icon: Dna,
    color: "text-pink-500 bg-pink-500/10 border-pink-500/30",
    text: "Describe the steps of DNA replication and role of DNA Polymerase III.",
  },
  {
    category: "Mathematics",
    icon: Sigma,
    color: "text-purple-500 bg-purple-500/10 border-purple-500/30",
    text: "Prove that lim(x->0) [sin(x)/x] = 1 using Sandwich (Squeeze) Theorem.",
  },
  {
    category: "Physics",
    icon: Atom,
    color: "text-sky-500 bg-sky-500/10 border-sky-500/30",
    text: "Explain Carnot engine cycle and maximum theoretical efficiency.",
  },
  {
    category: "Chemistry",
    icon: FlaskConical,
    color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30",
    text: "Compare SN1 and SN2 reaction mechanisms, kinetics, and stereochemistry.",
  },
  {
    category: "Physics",
    icon: Atom,
    color: "text-sky-500 bg-sky-500/10 border-sky-500/30",
    text: "Explain why the sky is blue using Rayleigh scattering — NEB style.",
  },
  {
    category: "Biology",
    icon: Dna,
    color: "text-pink-500 bg-pink-500/10 border-pink-500/30",
    text: "Compare aerobic and anaerobic respiration with their ATP yields.",
  },
  {
    category: "Mathematics",
    icon: Sigma,
    color: "text-purple-500 bg-purple-500/10 border-purple-500/30",
    text: "Complete the square for x² + 6x + 5 and state the vertex form.",
  },
  {
    category: "Chemistry",
    icon: FlaskConical,
    color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30",
    text: "Balance the redox reaction KMnO₄ + Fe²⁺ in acidic medium, step by step.",
  },
];

const MODE_STARTERS: Record<TutorMode, Starter[]> = {
  General: GENERAL_STARTERS,
  Physics: [
    {
      category: "Physics",
      icon: Atom,
      color: "text-sky-500 bg-sky-500/10 border-sky-500/30",
      text: "Derive the Lens Maker's formula step by step with sign conventions.",
    },
    {
      category: "Physics",
      icon: Atom,
      color: "text-sky-500 bg-sky-500/10 border-sky-500/30",
      text: "Explain Carnot engine cycle and maximum theoretical efficiency.",
    },
    {
      category: "Physics",
      icon: Atom,
      color: "text-sky-500 bg-sky-500/10 border-sky-500/30",
      text: "A ball is thrown at 30° — find time of flight, range and max height (g = 10).",
    },
    {
      category: "Physics",
      icon: Atom,
      color: "text-sky-500 bg-sky-500/10 border-sky-500/30",
      text: "Why is the total mechanical energy conserved in simple harmonic motion?",
    },
    {
      category: "Physics",
      icon: Atom,
      color: "text-sky-500 bg-sky-500/10 border-sky-500/30",
      text: "State and verify the work–energy theorem for a block pushed on a rough floor.",
    },
    {
      category: "Physics",
      icon: Atom,
      color: "text-sky-500 bg-sky-500/10 border-sky-500/30",
      text: "Derive the time period of a simple pendulum and list its assumptions.",
    },
  ],
  Chemistry: [
    {
      category: "Chemistry",
      icon: FlaskConical,
      color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30",
      text: "Explain the Inert Pair Effect in heavier p-block elements with examples.",
    },
    {
      category: "Chemistry",
      icon: FlaskConical,
      color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30",
      text: "Compare SN1 and SN2 reaction mechanisms, kinetics, and stereochemistry.",
    },
    {
      category: "Chemistry",
      icon: FlaskConical,
      color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30",
      text: "Use Hess's law to find the enthalpy of formation of methane from combustion data.",
    },
    {
      category: "Chemistry",
      icon: FlaskConical,
      color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30",
      text: "Explain sp² hybridisation in ethene with bond angles and orbital overlap.",
    },
    {
      category: "Chemistry",
      icon: FlaskConical,
      color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30",
      text: "Explain the buffer action of CH₃COONa + CH₃COOH with Henderson's equation.",
    },
    {
      category: "Chemistry",
      icon: FlaskConical,
      color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30",
      text: "Why does MO theory predict O₂ is paramagnetic? Work it out from bond order.",
    },
  ],
  Biology: [
    {
      category: "Biology",
      icon: Dna,
      color: "text-pink-500 bg-pink-500/10 border-pink-500/30",
      text: "Describe the steps of DNA replication and role of DNA Polymerase III.",
    },
    {
      category: "Biology",
      icon: Dna,
      color: "text-pink-500 bg-pink-500/10 border-pink-500/30",
      text: "Explain Mendelian dihybrid inheritance with the 9:3:3:1 ratio.",
    },
    {
      category: "Biology",
      icon: Dna,
      color: "text-pink-500 bg-pink-500/10 border-pink-500/30",
      text: "Walk through the light reaction of photosynthesis — photosystems I and II.",
    },
    {
      category: "Biology",
      icon: Dna,
      color: "text-pink-500 bg-pink-500/10 border-pink-500/30",
      text: "How does energy flow through a 10% efficient ecosystem food chain?",
    },
    {
      category: "Biology",
      icon: Dna,
      color: "text-pink-500 bg-pink-500/10 border-pink-500/30",
      text: "Explain the lac operon as a negative inducible system.",
    },
    {
      category: "Biology",
      icon: Dna,
      color: "text-pink-500 bg-pink-500/10 border-pink-500/30",
      text: "Trace blood flow through the human heart, naming every valve.",
    },
  ],
  Mathematics: [
    {
      category: "Mathematics",
      icon: Sigma,
      color: "text-purple-500 bg-purple-500/10 border-purple-500/30",
      text: "Prove that lim(x->0) [sin(x)/x] = 1 using Sandwich (Squeeze) Theorem.",
    },
    {
      category: "Mathematics",
      icon: Sigma,
      color: "text-purple-500 bg-purple-500/10 border-purple-500/30",
      text: "Show every determinant property with a worked 3×3 example.",
    },
    {
      category: "Mathematics",
      icon: Sigma,
      color: "text-purple-500 bg-purple-500/10 border-purple-500/30",
      text: "Explain integration by parts with the ILATE rule and two examples.",
    },
    {
      category: "Mathematics",
      icon: Sigma,
      color: "text-purple-500 bg-purple-500/10 border-purple-500/30",
      text: "When do two vectors have zero cross product? Prove it geometrically.",
    },
    {
      category: "Mathematics",
      icon: Sigma,
      color: "text-purple-500 bg-purple-500/10 border-purple-500/30",
      text: "Find the area bounded by y = x² and y = x using integration.",
    },
    {
      category: "Mathematics",
      icon: Sigma,
      color: "text-purple-500 bg-purple-500/10 border-purple-500/30",
      text: "Explain Bayes' theorem with a NEB-style probability example.",
    },
  ],
};

/**
 * Read the on-device guest thread back as well-formed messages. Anything
 * malformed (old shapes, hand-edited storage, partial writes) is dropped
 * rather than crashing the console.
 */
function parseStoredThread(raw: string | null): AIChatMessage[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const out: AIChatMessage[] = [];
    for (const item of parsed) {
      if (!item || typeof item !== "object") continue;
      const role = (item as { role?: unknown }).role;
      const content = (item as { content?: unknown }).content;
      if (
        (role === "user" || role === "assistant") &&
        typeof content === "string"
      ) {
        out.push({ role, content });
      }
    }
    return out;
  } catch {
    return [];
  }
}

/** Fisher–Yates shuffle — returns a new array, never mutates the pool. */
function shuffled<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * A fresh starter set for the active mode.
 *
 * General mixes the whole pool; a FOCUSED subject mode stays strictly on its
 * own subject (2026-09-27 fix — a Physics console was offering Biology
 * starters, which undercut the mode picker).
 */
function buildStarters(mode: TutorMode): Starter[] {
  if (mode !== "General") return shuffled(MODE_STARTERS[mode]);
  return shuffled(GENERAL_STARTERS).slice(0, 6);
}

// Daily pools: guests 5/day (shared with guest chat), signed-in 8/day.
const DAILY_CREDIT_POOL = 4;

function systemMessageFor(mode: TutorMode): AIChatMessage {
  const focus =
    mode === "General"
      ? ""
      : `\n\nSUBJECT FOCUS (${mode.toUpperCase()}): frame every reply through ${mode} first — ${mode} syllabus terms, notation, classic NEB ${mode} questions and the usual exam traps in this topic. Touch other subjects only when the question truly demands it.`;
  return { role: "system", content: `${PLATFORM_SYSTEM_PROMPT}${focus}` };
}

// ── Console ─────────────────────────────────────────────────────────────────

export function TutorConsole() {
  const { user } = useSession();
  const router = useRouter();
  const isLoggedIn = !!user;

  const [messages, setMessages] = useState<AIChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [guestCount, setGuestCount] = useState(0);
  const [dailyCredits, setDailyCredits] = useState<number | null>(null);
  const [poolEmpty, setPoolEmpty] = useState(false);
  const [enhancing, setEnhancing] = useState(false);
  const [restoredCount, setRestoredCount] = useState<number | null>(null);
  // True once the guest thread restore has run — gates persistence so the
  // first paint (messages = []) can never wipe what is about to be loaded.
  const [guestHydrated, setGuestHydrated] = useState(false);
  // SSR renders "General"; the persisted mode lands in an effect.
  const [mode, setMode] = useState<TutorMode>("General");
  // Rotating starters — deterministic first paint, shuffled in an effect.
  const [starters, setStarters] = useState<Starter[]>(() =>
    GENERAL_STARTERS.slice(0, 6),
  );
  const [startersNonce, setStartersNonce] = useState(0);

  const streamRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const historyLoadedRef = useRef(false);

  const guestCredits = Math.max(0, MAX_GUEST_MESSAGES - guestCount);
  const isGuestLimited = !isLoggedIn && guestCount >= MAX_GUEST_MESSAGES;
  const privilegedUser =
    user?.role === "OWNER" || user?.role === "ADMIN" || !!user?.premiumStatus;
  const creditsExhausted =
    isLoggedIn &&
    !privilegedUser &&
    (poolEmpty ||
      dailyCredits === 0 ||
      (typeof user?.credits === "number" && user.credits <= 0));
  const composerLocked = isGuestLimited || creditsExhausted;

  // Restore mode + quota/history after mount (localStorage/sessionStorage
  // never exist on the server — first client paint must match it).
  useEffect(() => {
    try {
      const saved = localStorage.getItem(MODE_STORAGE_KEY) as TutorMode | null;
      if (saved && MODES.some((m) => m.id === saved)) setMode(saved);
    } catch {
      /* storage blocked — stay on General */
    }

    if (!isLoggedIn) {
      setGuestCount(readGuestCount());
      // Guests get history too: restore the thread saved on this device so a
      // reload, route change or browser restart doesn't drop the conversation.
      try {
        const restored = parseStoredThread(
          localStorage.getItem(GUEST_THREAD_KEY),
        );
        if (restored.length) {
          setMessages(restored);
          setRestoredCount(restored.length);
        }
      } catch {
        /* storage blocked — start fresh */
      }
      setGuestHydrated(true);
      return;
    }
    if (historyLoadedRef.current) return;
    historyLoadedRef.current = true;
    if (user && typeof user.credits === "number") setDailyCredits(user.credits);
    (async () => {
      try {
        const { messages: restored } = await getChatHistory("default", 200);
        if (restored.length) {
          setMessages(
            restored.map((m) => ({ role: m.role, content: m.content })),
          );
          setRestoredCount(restored.length);
        }
      } catch {
        /* history unavailable — start fresh */
      }
    })();
  }, [isLoggedIn, user]);

  // Signed-out history: mirror the thread to this device after the restore
  // above has hydrated it. Signed-in users keep their server-side history.
  useEffect(() => {
    if (isLoggedIn || !guestHydrated) return;
    try {
      if (messages.length === 0) localStorage.removeItem(GUEST_THREAD_KEY);
      else localStorage.setItem(GUEST_THREAD_KEY, JSON.stringify(messages));
    } catch {
      /* storage blocked — the thread just won't survive a reload */
    }
  }, [isLoggedIn, guestHydrated, messages]);

  // Fresh starter set whenever the mode changes or the thread is cleared
  // (runs post-mount, so the server HTML and first client paint match).
  useEffect(() => {
    setStarters(buildStarters(mode));
  }, [mode, startersNonce]);

  // Follow the stream while a reply is composing (and when restored).
  useEffect(() => {
    if (messages.length === 0 && !sending) {
      if (streamRef.current) streamRef.current.scrollTop = 0;
      return;
    }
    streamRef.current?.scrollTo({
      top: streamRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, sending]);

  const chooseMode = (next: TutorMode) => {
    setMode(next);
    try {
      localStorage.setItem(MODE_STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    inputRef.current?.focus();
  };

  const handleCopy = async (content: string, index: number) => {
    // Links must WORK on screen but their URLs never reach the clipboard.
    const plain = stripLinksForCopy(content);
    try {
      await navigator.clipboard.writeText(plain);
    } catch {
      try {
        const ta = document.createElement("textarea");
        ta.value = plain;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      } catch {
        console.warn("Clipboard copy unavailable");
      }
    }
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  /**
   * Core send: takes an EXPLICIT history so quick actions (regenerate,
   * deeper, shorter) can re-send from any point without stale-state races.
   */
  const sendWith = useCallback(
    async (history: AIChatMessage[], text: string, effectiveMode: TutorMode) => {
      const content = text.trim();
      if (!content || sending) return;

      if (isGuestLimited) {
        setError(
          `You've used all ${MAX_GUEST_MESSAGES} free guest messages for today. Your pool resets at 12:00 AM — or sign in for ${DAILY_CREDIT_POOL} daily credits & saved history.`,
        );
        return;
      }
      if (creditsExhausted) {
        setError(
          `You've used all ${DAILY_CREDIT_POOL} credits of today's daily pool. It resets at ${DAILY_CREDIT_POOL} credits at 12:00 AM.`,
        );
        return;
      }

      const userMsg: AIChatMessage = { role: "user", content };
      const outbound = [...history, userMsg];
      setMessages(outbound);
      setInput("");
      setSending(true);
      setError(null);

      try {
        const payload = [systemMessageFor(effectiveMode), ...outbound];
        if (isLoggedIn) {
          const res = await chat(payload);
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: res.response },
          ]);
          if (typeof res.credits === "number") {
            setDailyCredits(res.credits);
            if (res.credits <= 0) setPoolEmpty(true);
          }
          saveChatHistory("default", [
            { role: "user", content },
            { role: "assistant", content: res.response },
          ]).catch(() => {});
        } else {
          const res = await guestChat(payload);
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: res.response },
          ]);
          const used =
            MAX_GUEST_MESSAGES -
            (res.remaining ?? MAX_GUEST_MESSAGES - guestCount - 1);
          const next = Math.min(
            MAX_GUEST_MESSAGES,
            Math.max(guestCount + 1, used),
          );
          writeGuestCount(next);
          setGuestCount(next);
        }
      } catch (err: unknown) {
        console.error("Tutor console error:", err);
        const msg =
          err instanceof Error && err.message
            ? err.message
            : "Failed to reach the AI Tutor. Please try again.";
        setError(msg);
        if (
          err &&
          typeof err === "object" &&
          "status" in err &&
          (err as { status?: number }).status === 402
        ) {
          if (isLoggedIn) {
            setDailyCredits(0);
            setPoolEmpty(true);
          } else {
            writeGuestCount(MAX_GUEST_MESSAGES);
            setGuestCount(MAX_GUEST_MESSAGES);
          }
        } else {
          // Keep the thread honest: mark the failure in-place, no fake answer.
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content:
                "I hit a connection difficulty — please try again, or rephrase the question.",
            },
          ]);
        }
      } finally {
        setSending(false);
      }
    },
    [sending, isGuestLimited, creditsExhausted, isLoggedIn, guestCount],
  );

  const handleSend = (customText?: string) => {
    void sendWith(messages, customText ?? input, mode);
  };

  /** Drop the stale answer and ask the same question again. */
  const regenerate = () => {
    if (sending) return;
    let idx = -1;
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === "user") {
        idx = i;
        break;
      }
    }
    if (idx === -1) return;
    void sendWith(messages.slice(0, idx), messages[idx].content, mode);
  };

  const followUp = (instruction: string) => {
    void sendWith(messages, instruction, mode);
  };

  /** Chat → quiz handoff: seed /ai-quiz with subject + last question. */
  const startPracticeQuiz = () => {
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    const subjectSlug = MODES.find((m) => m.id === mode)?.subjectSlug;
    try {
      sessionStorage.setItem(
        "neb_quiz_seed",
        JSON.stringify({
          subjectSlug,
          topic: lastUser ? lastUser.content.slice(0, 120).trim() : "",
        }),
      );
    } catch {
      /* storage blocked — the quiz still opens with its defaults */
    }
    router.push("/ai-quiz");
  };

  const handleEnhance = async () => {
    const text = input.trim();
    if (!text || sending || enhancing) return;
    setEnhancing(true);
    setError(null);
    try {
      const { prompt } = await enhancePrompt(text);
      if (prompt) setInput(prompt);
    } catch {
      setError("Could not enhance right now — your original prompt is kept.");
    } finally {
      setEnhancing(false);
      inputRef.current?.focus();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
    setRestoredCount(null);
    setStartersNonce((n) => n + 1);
    if (isLoggedIn) clearChatHistory("default").catch(() => {});
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const hasConversation = messages.length > 0;
  const lastAssistantIndex = (() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === "assistant") return i;
    }
    return -1;
  })();

  return (
    <div className="flex h-[calc(100vh-10rem)] max-h-[850px] min-h-[500px] flex-col rounded-3xl border border-border/80 bg-card shadow-lg overflow-hidden">
      {/* ── Header: identity + the green light (kept exactly) + actions ── */}
      <div className="shrink-0 border-b border-border/60 bg-gradient-to-r from-emerald-500/5 via-transparent to-primary/5">
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 pt-3.5 pb-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-violet-500 flex items-center justify-center text-white shadow-md shadow-primary/30 shrink-0">
              <Bot className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-extrabold bg-gradient-to-r from-primary via-violet-500 to-primary bg-clip-text text-transparent animate-gradient-text truncate">
                  Ravikisan&apos;s AI Tutor
                </h2>
                {/* live dot — the professor is on duty (do not remove) */}
                <span className="relative flex h-2 w-2 shrink-0" title="Online">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground truncate">
                {mode === "General"
                  ? "Grounded in the NEB Class 11 & 12 syllabus · ask me anything"
                  : `${mode} mode · syllabus-grounded answers, one concept at a time`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {!isLoggedIn && (
              <span
                className="hidden sm:flex items-center gap-1.5 text-[11px] px-2 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-600 font-semibold"
                title="Guest pool shared with the AI quiz · resets at 12:00 AM"
              >
                <Coins className="h-3 w-3" />
                {guestCredits}/{MAX_GUEST_MESSAGES} free today
              </span>
            )}
            {isLoggedIn && (
              <span
                className="hidden sm:flex items-center gap-1.5 text-[11px] px-2 py-1 rounded-lg bg-muted border border-border/60 font-semibold"
                title={`1 credit per message · daily pool resets to ${DAILY_CREDIT_POOL} at 12:00 AM`}
              >
                <Coins className="h-3 w-3 text-amber-500" />
                {Math.min(
                  dailyCredits ?? user?.credits ?? DAILY_CREDIT_POOL,
                  DAILY_CREDIT_POOL,
                )}
                /{DAILY_CREDIT_POOL} credits today
              </span>
            )}
            {hasConversation && (
              <button
                onClick={clearChat}
                disabled={sending}
                className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50"
                title="Clear this conversation"
                aria-label="Clear chat"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Subject-mode picker — this console's own feature */}
        <div className="flex gap-1.5 overflow-x-auto px-4 sm:px-6 pb-2.5">
          {MODES.map((m) => {
            const Icon = m.icon;
            const active = mode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => chooseMode(m.id)}
                aria-pressed={active}
                className={cn(
                  "flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-[11px] font-bold transition-all",
                  active
                    ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 shadow-sm shadow-emerald-500/10"
                    : "border-border/70 bg-background text-muted-foreground hover:text-foreground hover:border-muted-foreground/40",
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {m.id}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Error banner ─────────────────────────────────────────────── */}
      {error && (
        <div className="mx-4 sm:mx-6 mt-3 flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive shrink-0">
          <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* ── Stream ───────────────────────────────────────────────────── */}
      <div ref={streamRef} className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 space-y-5">
        {!hasConversation && !sending ? (
          <div className="min-h-full flex flex-col justify-center max-w-2xl mx-auto space-y-6 py-6">
            <div className="text-center space-y-2">
              <div className="relative h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-primary shadow-lg shadow-emerald-500/25 text-white mx-auto flex items-center justify-center">
                <Sparkles className="h-7 w-7 animate-pulse" />
              </div>
              <h3 className="text-xl font-extrabold bg-gradient-to-r from-foreground via-emerald-600 to-primary bg-clip-text text-transparent animate-gradient-text">
                {mode === "General"
                  ? "What are we learning today?"
                  : `${mode} mode — pick a starter or ask anything`}
              </h3>
              <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
                Derivations, mechanisms, wild &quot;why&quot; questions, misconceptions,
                past NEB questions — broken down step by step.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {starters.map((prompt, i) => {
                const Icon = prompt.icon;
                return (
                  <button
                    key={i}
                    onClick={() => handleSend(prompt.text)}
                    className="p-3 rounded-2xl border border-border/70 bg-muted/15 hover:bg-muted/40 hover:border-emerald-500/50 hover:-translate-y-0.5 hover:shadow-md hover:shadow-emerald-500/10 active:scale-[0.98] text-left transition-all duration-200 group flex flex-col justify-between space-y-1.5"
                  >
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md border w-fit flex items-center gap-1 ${prompt.color}`}
                    >
                      <Icon className="h-2.5 w-2.5" />
                      <span>{prompt.category}</span>
                    </span>
                    <p className="text-xs text-foreground/90 font-medium group-hover:text-emerald-600 transition-colors leading-relaxed">
                      {prompt.text}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <>
            {restoredCount !== null && restoredCount > 0 && (
              <div className="flex justify-center">
                <span className="rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-[10px] font-medium text-muted-foreground">
                  Restored {restoredCount} earlier message
                  {restoredCount === 1 ? "" : "s"} from your history
                </span>
              </div>
            )}

            {messages.map((msg, index) => {
              const isUser = msg.role === "user";
              if (isUser) {
                return (
                  <div key={index} className="flex justify-end animate-pop-in">
                    <div className="flex items-end gap-2.5 max-w-[85%]">
                      <div className="rounded-2xl rounded-br-md bg-gradient-to-br from-primary to-violet-500 text-primary-foreground px-4 py-2.5 shadow-sm">
                        <p className="text-xs leading-relaxed whitespace-pre-wrap font-medium">
                          {msg.content}
                        </p>
                      </div>
                      <div className="h-7 w-7 rounded-lg bg-muted border border-border flex items-center justify-center shrink-0 text-muted-foreground">
                        <User className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </div>
                );
              }

              const isLastAssistant = index === lastAssistantIndex;
              return (
                <div key={index} className="group flex gap-3 animate-pop-in">
                  <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-emerald-500/20 to-primary/20 border border-emerald-500/30 text-emerald-600 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="rounded-2xl rounded-tl-md border border-border/60 bg-muted/25 px-4 py-3">
                      <MathMarkdown content={msg.content} />
                    </div>

                    {/* Per-answer quick actions — this console's own feature */}
                    <div className="mt-1.5 flex flex-wrap items-center gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleCopy(msg.content, index)}
                        className="inline-flex items-center gap-1 rounded-lg border border-border/60 bg-background px-2 py-1 text-[10px] font-semibold text-muted-foreground hover:text-foreground hover:border-emerald-500/40 transition-colors"
                        title="Copy this answer"
                      >
                        {copiedIndex === index ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-500" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" /> Copy
                          </>
                        )}
                      </button>
                      {isLastAssistant && (
                        <button
                          onClick={regenerate}
                          disabled={sending}
                          className="inline-flex items-center gap-1 rounded-lg border border-border/60 bg-background px-2 py-1 text-[10px] font-semibold text-muted-foreground hover:text-foreground hover:border-emerald-500/40 transition-colors disabled:opacity-50"
                          title="Ask the same question again for a fresh take"
                        >
                          <RefreshCw className="h-3 w-3" /> Regenerate
                        </button>
                      )}
                      <button
                        onClick={() =>
                          followUp(
                            "Go deeper on your last answer: add the underlying intuition, the full step-by-step working, and one exam-style example.",
                          )
                        }
                        disabled={sending}
                        className="inline-flex items-center gap-1 rounded-lg border border-border/60 bg-background px-2 py-1 text-[10px] font-semibold text-muted-foreground hover:text-foreground hover:border-emerald-500/40 transition-colors disabled:opacity-50"
                        title="Expand with intuition, working and an example"
                      >
                        <Layers className="h-3 w-3" /> Go deeper
                      </button>
                      <button
                        onClick={() =>
                          followUp(
                            "Give the same answer again, but half as long — exam-terse, only the essentials.",
                          )
                        }
                        disabled={sending}
                        className="inline-flex items-center gap-1 rounded-lg border border-border/60 bg-background px-2 py-1 text-[10px] font-semibold text-muted-foreground hover:text-foreground hover:border-emerald-500/40 transition-colors disabled:opacity-50"
                        title="Condense to exam-terse essentials"
                      >
                        <AlignLeft className="h-3 w-3" /> Keep it short
                      </button>
                      {isLastAssistant && (
                        <button
                          onClick={startPracticeQuiz}
                          disabled={sending}
                          className="inline-flex items-center gap-1 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-2 py-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-colors disabled:opacity-50"
                          title="Turn this topic into an instant practice quiz"
                        >
                          <Brain className="h-3 w-3" /> Practice quiz
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {sending && (
              <div className="flex gap-3 animate-pop-in">
                <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-emerald-500/20 to-primary/20 border border-emerald-500/30 text-emerald-600 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="h-3.5 w-3.5" />
                </div>
                <div className="rounded-2xl rounded-tl-md border border-border/60 bg-muted/25 px-4 py-3 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.2s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-500 animate-bounce [animation-delay:-0.1s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-bounce" />
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Thread tools ─────────────────────────────────────────────── */}
      {hasConversation && !sending && (
        <div className="shrink-0 px-4 sm:px-6 pt-2 flex flex-wrap items-center gap-1.5 border-t border-border/40">
          <button
            onClick={() =>
              followUp(
                "Summarize our conversation so far as concise revision notes: short headings, tight bullets, key formulas and terms in bold — ready to screenshot before an exam.",
              )
            }
            className="inline-flex items-center gap-1 rounded-lg border border-border/60 bg-background px-2 py-1 text-[10px] font-semibold text-muted-foreground hover:text-foreground hover:border-emerald-500/40 transition-colors"
            title="Turn this thread into revision notes"
          >
            <ListChecks className="h-3 w-3" /> Summarize thread
          </button>
          <button
            onClick={startPracticeQuiz}
            className="inline-flex items-center gap-1 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-2 py-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-colors"
            title="Open the AI quiz seeded with this conversation"
          >
            <Brain className="h-3 w-3" /> Practice quiz
          </button>
        </div>
      )}

      {/* ── Composer ─────────────────────────────────────────────────── */}
      <div className="shrink-0 border-t border-border/60 bg-muted/20 px-4 sm:px-6 py-3">
        {composerLocked && (
          <p className="mb-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-[11px] font-semibold text-amber-600">
            {isGuestLimited
              ? `All ${MAX_GUEST_MESSAGES} free guest messages used today — the pool resets at 12:00 AM, or sign in for ${DAILY_CREDIT_POOL} daily credits.`
              : `Today's ${DAILY_CREDIT_POOL}-credit pool is empty — it resets at 12:00 AM.`}
          </p>
        )}
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={2}
            placeholder={
              mode === "General"
                ? "Ask any Class 11 & 12 doubt… (Enter to send)"
                : `Ask a ${mode} question… (Enter to send)`
            }
            disabled={composerLocked || sending}
            className="flex-1 resize-none rounded-2xl border border-input bg-background px-3.5 py-2.5 text-xs leading-relaxed placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 disabled:opacity-60"
          />
          <button
            onClick={handleEnhance}
            disabled={!input.trim() || sending || enhancing}
            title="Rewrite into a sharper study question"
            aria-label="Enhance question"
            className="h-9 w-9 shrink-0 rounded-xl border border-border/70 bg-background text-muted-foreground hover:text-emerald-500 hover:border-emerald-500/40 transition-colors flex items-center justify-center disabled:opacity-40"
          >
            {enhancing ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
            ) : (
              <Wand2 className="h-4 w-4" />
            )}
          </button>
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || sending || composerLocked}
            title="Send (Enter)"
            aria-label="Send message"
            className="h-9 w-9 shrink-0 rounded-xl bg-gradient-to-br from-emerald-500 to-primary text-white shadow-md shadow-emerald-500/20 hover:opacity-90 transition-opacity flex items-center justify-center disabled:opacity-40"
          >
            {sending ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/70 border-t-transparent" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </button>
        </div>
        <p className="mt-1.5 text-[10px] text-muted-foreground">
          {isLoggedIn
            ? "1 credit per message · history saved to your account"
            : `${guestCredits} of ${MAX_GUEST_MESSAGES} free messages left today · shared with the AI quiz`}
        </p>
      </div>
    </div>
  );
}
