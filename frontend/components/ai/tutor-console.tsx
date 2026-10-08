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
  User,
  Sparkles,
  Trash2,
  Coins,
  Atom,
  FlaskConical,
  Dna,
  Sigma,
  ListChecks,
  Brain,
  Wand2,
  AlertCircle,
  Plus,
  History,
  MessageSquare,
  Languages,
  BookOpen,
} from "lucide-react";
import {
  streamChat,
  guestChat,
  getChatHistory,
  getChatSessions,
  saveChatHistory,
  clearChatHistory,
  enhancePrompt,
  type ChatSession,
} from "@/lib/api/ai";
import { ChatMessageActions } from "@/components/ai/chat-message-actions";
import {
  ChatAttachButton,
  ChatAttachPreview,
  MAX_ATTACHMENTS,
} from "@/components/ai/chat-attachments";
import {
  GO_DEEPER_INSTRUCTION,
  KEEP_IT_SHORT_INSTRUCTION,
  PHOTO_ONLY_PROMPT,
  SUMMARIZE_INSTRUCTION,
  writeQuizSeed,
} from "@/lib/ai/chat-actions";
import { PLATFORM_SYSTEM_PROMPT } from "@/lib/ai/prompts";
import {
  GUEST_DAILY_LIMIT as MAX_GUEST_MESSAGES,
  readGuestCount,
  writeGuestCount,
} from "@/lib/ai/guest-quota";
import type { AIChatMessage } from "@/types/api";
import { useSession } from "@/features/auth/hooks/use-session";
import { useCoinGateEnabled } from "@/features/credits/use-coin-gate";
import { CoinGateDot } from "@/features/credits/coin-gate-dot";
import { isOwnerEmail } from "@/lib/owner";
import { CaptainAvatar, CaptainMark } from "@/components/ai/captain-logo";
import { InteractiveMarkdown } from "@/components/content/interactive-markdown";
import { drawFigureWithPuter } from "@/lib/puter-image";
import { stripLinksForCopy } from "@/lib/ai/clean-copy";
import { cn } from "@/lib/utils";

// ── Subject modes ───────────────────────────────────────────────────────────

type TutorMode = "General" | "Physics" | "Chemistry" | "Biology" | "Mathematics" | "नेपाली" | "Grammar";

interface ModeDef {
  id: TutorMode;
  icon: React.ComponentType<{ className?: string }>;
  /** Seed for the quiz handoff (undefined = let the quiz ask). */
  subjectSlug?: string;
  /**
   * Dedicated server console rules for this mode: "nepali" = शुद्ध नेपाली
   * (every reply in Nepali, NEB नेपाली only), "grammar" = English grammar
   * master-teacher (origin-first + citations). The id rides with the request
   * and the server appends the console block LAST in the system prompt.
   */
  console?: "nepali" | "grammar";
}

const MODES: ModeDef[] = [
  { id: "General", icon: Sparkles },
  { id: "Physics", icon: Atom, subjectSlug: "physics" },
  { id: "Chemistry", icon: FlaskConical, subjectSlug: "chemistry" },
  { id: "Biology", icon: Dna, subjectSlug: "biology" },
  { id: "Mathematics", icon: Sigma, subjectSlug: "mathematics" },
  { id: "नेपाली", icon: Languages, subjectSlug: "nepali", console: "nepali" },
  { id: "Grammar", icon: BookOpen, subjectSlug: "english", console: "grammar" },
];

/** Server console id for a mode (undefined = no console block). */
function consoleForMode(mode: TutorMode): string | undefined {
  return MODES.find((m) => m.id === mode)?.console;
}

const MODE_STORAGE_KEY = "neb_tutor_mode";
/** Signed-out thread — history on this device (owner rule 2026-09-27). */
const GUEST_THREAD_KEY = "neb_tutor_thread";
/** Which conversation this console is currently showing (signed-in). */
const SESSION_STORAGE_KEY = "neb_tutor_active_session";

/** Fresh conversation id — its own saved history, like the widget's. */
function newConversationId(): string {
  return `t-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

function readStoredSession(): string {
  if (typeof window === "undefined") return "default";
  try {
    return localStorage.getItem(SESSION_STORAGE_KEY) || "default";
  } catch {
    return "default";
  }
}

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
  "नेपाली": [
    {
      category: "नेपाली व्याकरण",
      icon: Languages,
      color: "text-amber-600 bg-amber-500/10 border-amber-500/30",
      text: "विभक्ति र प्रयोग फरक के हो? उदाहरणसहित पूरै व्याख्या गर्नुहोस्।",
    },
    {
      category: "नेपाली व्याकरण",
      icon: Languages,
      color: "text-amber-600 bg-amber-500/10 border-amber-500/30",
      text: "कर्ता, कर्म र भावकारकका धातुरूप छुट्याउनुहोस् र प्रयोग देखाउनुहोस्।",
    },
    {
      category: "नेपाली व्याकरण",
      icon: Languages,
      color: "text-amber-600 bg-amber-500/10 border-amber-500/30",
      text: "र्‍यापि र जमर्‍यापि के हो? फरक र उदाहरणसहित बुझाउनुहोस्।",
    },
    {
      category: "नेपाली रचना",
      icon: Languages,
      color: "text-amber-600 bg-amber-500/10 border-amber-500/30",
      text: "औपचारिक अपठित गद्यांश विश्लेषण गर्ने चरणहरू के हुन्?",
    },
    {
      category: "नेपाली रचना",
      icon: Languages,
      color: "text-amber-600 bg-amber-500/10 border-amber-500/30",
      text: "निबन्ध लेख्ने क्रम (चरण) कसरी बुझ्ने र लेख्ने? प्रारूपसहित।",
    },
  ],
  Grammar: [
    {
      category: "Grammar",
      icon: BookOpen,
      color: "text-indigo-500 bg-indigo-500/10 border-indigo-500/30",
      text: "Explain clauses with their types — with citations from a grammar book.",
    },
    {
      category: "Grammar",
      icon: BookOpen,
      color: "text-indigo-500 bg-indigo-500/10 border-indigo-500/30",
      text: "Teach the English tenses from origin — why each tense exists and how it formed.",
    },
    {
      category: "Grammar",
      icon: BookOpen,
      color: "text-indigo-500 bg-indigo-500/10 border-indigo-500/30",
      text: "Explain subject–verb agreement with wrong examples and why they are wrong.",
    },
    {
      category: "Writing",
      icon: BookOpen,
      color: "text-indigo-500 bg-indigo-500/10 border-indigo-500/30",
      text: "Generate 10 essay ideas for NEB practice and outline the best one.",
    },
    {
      category: "Language dev",
      icon: BookOpen,
      color: "text-indigo-500 bg-indigo-500/10 border-indigo-500/30",
      text: "How do I build my English vocabulary from roots, prefixes and suffixes?",
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

/** Rotating words shown beside the bouncing dots while a reply generates. */
const THINKING_LINES = [
  "Thinking…",
  "Extracting…",
  "Contemplating…",
  "Musing…",
  "Pondering…",
  "Reflecting…",
  "Gathering the ideas in conceptual order…",
  "Building the answer from past to present…",
];

function systemMessageFor(mode: TutorMode): AIChatMessage {
  const focus =
    mode === "General"
      ? ""
      : mode === "नेपाली"
        ? "\n\nCONSOLE (नेपाली): this is the pure-Nepali console — NEB Class 11/12 नेपाली only, and EVERY reply is written in नेपाली whatever language the question is asked in (the server console rules below are absolute)."
        : mode === "Grammar"
          ? "\n\nCONSOLE (GRAMMAR): this console teaches the English language itself — grammar, language development, writing skill and idea generation — origin-first and with citations from attached sources; no other subject."
          : `\n\nSUBJECT FOCUS (${mode.toUpperCase()}): frame every reply through ${mode} first — ${mode} syllabus terms, notation, classic NEB ${mode} questions and the usual exam traps in this topic. Touch other subjects only when the question truly demands it.`;
  return { role: "system", content: `${PLATFORM_SYSTEM_PROMPT}${focus}` };
}

// ── Console ─────────────────────────────────────────────────────────────────

/**
 * Deep-link entry (/chat/nepali, /chat/grammar): preselects the console mode
 * on mount — it wins over the stored mode and becomes the new stored one,
 * exactly as if the chip had been tapped.
 */
export function TutorConsole({
  initialConsole,
}: {
  initialConsole?: "nepali" | "grammar";
} = {}) {
  const { user } = useSession();
  const router = useRouter();
  const isLoggedIn = !!user;
  // Owner coin gate (live): OFF → chat is free, so an empty pool must not lock.
  const coinGateEnabled = useCoinGateEnabled();
  const freeMode = coinGateEnabled === false;

  const [messages, setMessages] = useState<AIChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  // True from the first streamed token until the answer completes — retires
  // the "thinking" dots while the bubble is visibly writing itself.
  const [streaming, setStreaming] = useState(false);
  // Live server phase (research / continuation) shown until the first token.
  const [streamPhase, setStreamPhase] = useState<string | null>(null);
  const [thinkIdx, setThinkIdx] = useState(0);
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
  // ── Chat history: separate conversations + a working "New chat" ──
  // (signed-in users get the server's per-session histories; guests keep the
  // single device thread above, and New chat simply starts a fresh one).
  const [sessionName, setSessionName] = useState<string>("default");
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [historyOpen, setHistoryOpen] = useState(false);
  /** Photos queued for the next message (camera / gallery). */
  const [pendingImages, setPendingImages] = useState<string[]>([]);

  const streamRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const historyLoadedRef = useRef(false);
  const sessionRef = useRef(sessionName);
  sessionRef.current = sessionName;

  const guestCredits = Math.max(0, MAX_GUEST_MESSAGES - guestCount);
  const isGuestLimited = !isLoggedIn && guestCount >= MAX_GUEST_MESSAGES;
  // BILL-EVERYONE: students/customers always pay; owners pay only when the
  // profile toggle is ON. PRO stays unlimited.
  const isOwner = isOwnerEmail(user?.email);
  const privilegedUser =
    !!user?.premiumStatus || (isOwner && freeMode);
  const creditsExhausted =
    isLoggedIn &&
    !privilegedUser &&
    (poolEmpty ||
      dailyCredits === 0 ||
      (typeof user?.credits === "number" && user.credits <= 0));
  const composerLocked = isGuestLimited || creditsExhausted;

  // Rotate the thinking words while a reply is generating.
  useEffect(() => {
    if (!sending) return;
    const id = setInterval(
      () => setThinkIdx((i) => (i + 1) % THINKING_LINES.length),
      2600,
    );
    return () => clearInterval(id);
  }, [sending]);

  // Restore mode + quota/history after mount (localStorage/sessionStorage
  // never exist on the server — first client paint must match it).
  useEffect(() => {
    const deepLinkMode = initialConsole
      ? MODES.find((m) => m.console === initialConsole)?.id
      : undefined;
    if (deepLinkMode) {
      setMode(deepLinkMode);
      try {
        localStorage.setItem(MODE_STORAGE_KEY, deepLinkMode);
      } catch {
        /* storage blocked — mode still applies for this visit */
      }
    } else {
      try {
        const saved = localStorage.getItem(MODE_STORAGE_KEY) as TutorMode | null;
        if (saved && MODES.some((m) => m.id === saved)) setMode(saved);
      } catch {
        /* storage blocked — stay on General */
      }
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
    const active = readStoredSession();
    setSessionName(active);
    void loadSession(active);
    void refreshSessions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, user]);

  /** Load one conversation's messages into the console. */
  const loadSession = useCallback(async (name: string) => {
    try {
      const { messages: restored } = await getChatHistory(name, 200);
      setMessages(restored.map((m) => ({ role: m.role, content: m.content })));
      setRestoredCount(restored.length || null);
    } catch {
      /* history unavailable — start fresh */
    }
  }, []);

  /** Refresh the conversation list shown in the history panel. */
  const refreshSessions = useCallback(async () => {
    try {
      const { sessions: list } = await getChatSessions();
      setSessions(list);
    } catch {
      /* sidebar simply stays empty */
    }
  }, []);

  /** Start a brand-new conversation (its own saved history). */
  const startNewChat = () => {
    const id = newConversationId();
    setSessionName(id);
    sessionRef.current = id;
    try {
      localStorage.setItem(SESSION_STORAGE_KEY, id);
    } catch {
      /* storage blocked — the session still works for this visit */
    }
    setMessages([]);
    setPendingImages([]);
    setError(null);
    setRestoredCount(null);
    setHistoryOpen(false);
    setStartersNonce((n) => n + 1);
    inputRef.current?.focus();
  };

  /** Switch to an earlier conversation. */
  const openSession = (name: string) => {
    if (name === sessionName) {
      setHistoryOpen(false);
      return;
    }
    setSessionName(name);
    sessionRef.current = name;
    try {
      localStorage.setItem(SESSION_STORAGE_KEY, name);
    } catch {
      /* storage blocked */
    }
    setHistoryOpen(false);
    setError(null);
    void loadSession(name);
  };

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
    async (
      history: AIChatMessage[],
      text: string,
      effectiveMode: TutorMode,
      images: string[] = [],
    ) => {
      // A photo with no typed question still gets an answer: the model is told
      // to read the image, say what it shows, then teach it.
      const content = text.trim() || (images.length ? PHOTO_ONLY_PROMPT : "");
      if (!content || sending) return;

      if (isGuestLimited) {
        setError(
          `You've used your free message for today. Sign in to keep asking Veer — members get ${DAILY_CREDIT_POOL} daily credits and saved chat histories.`,
        );
        return;
      }
      if (creditsExhausted) {
        setError(
          `You've used all ${DAILY_CREDIT_POOL} credits of today's daily pool. It resets at ${DAILY_CREDIT_POOL} credits at 12:00 AM.`,
        );
        return;
      }

      const userMsg: AIChatMessage = images.length
        ? { role: "user", content, images }
        : { role: "user", content };
      const outbound = [...history, userMsg];
      setMessages(outbound);
      setInput("");
      setPendingImages([]);
      setSending(true);
      setError(null);

      try {
        const payload = [systemMessageFor(effectiveMode), ...outbound];
        // LIVE streaming (owner 2026-09-30): deltas reach the student as the
        // provider generates them for both signed-in and guest users.
        let liveAcc = "";
        let liveCredits: number | null = null;
        let liveRemaining: number | null = null;
        let sawToken = false;
        setStreamPhase(null);
        const figs = new Map<
          number,
          { prompt: string; caption?: string; status: "pending" | "done" | "failed"; url?: string }
        >();
        const figureBlocks = (): string =>
          [...figs.values()]
            .map((f) =>
              f.status === "done" && f.url
                ? `\n\n![${f.caption || "Veer-drawn figure"}](${f.url})\n\n\n\n\n\n`
                : f.status === "pending"
                  ? "\n\n*🎨 Veer is drawing a figure…*"
                  : "",
            )
            .join("");
        let lastPaint = 0;
        const paintLive = (force: boolean) => {
          const now = Date.now();
          if (!force && now - lastPaint < 40) return;
          lastPaint = now;
          const snapshot = liveAcc + figureBlocks();
          setMessages((prev) => {
            const next = [...prev];
            const last = next[next.length - 1];
            if (last?.role === "assistant") next[next.length - 1] = { role: "assistant", content: snapshot };
            return next;
          });
        };
        try {
          for await (const chunk of streamChat(payload, undefined, { isGuest: !isLoggedIn, console: consoleForMode(effectiveMode) })) {
            if (typeof chunk === "string") {
              if (!sawToken) {
                sawToken = true;
                liveAcc = chunk;
                setStreamPhase(null);
                setStreaming(true);
                setMessages((prev) => [...prev, { role: "assistant", content: chunk + figureBlocks() }]);
              } else {
                liveAcc += chunk;
                paintLive(false);
              }
            } else if ("phase" in chunk) {
              // The server opens the stream before its web research: show what
              // Veer is doing instead of an unexplained wait.
              setStreamPhase(chunk.label ?? null);
            } else if ("continuing" in chunk) {
              setStreamPhase(chunk.label ?? "Continuing the answer…");
            } else if ("imageStart" in chunk) {
              figs.set(chunk.imageStart, { prompt: chunk.prompt, caption: chunk.caption, status: "pending" });
              paintLive(true);
            } else if ("imageSuccess" in chunk) {
              const f = figs.get(chunk.imageSuccess);
              if (f) { f.status = "done"; f.url = chunk.url; }
              paintLive(true);
            } else if ("imageFailed" in chunk) {
              const f = figs.get(chunk.imageFailed);
              if (f) f.status = "failed";
            } else if (typeof chunk.credits === "number") {
              liveCredits = chunk.credits;
            } else if (typeof chunk.remaining === "number") {
              liveRemaining = chunk.remaining;
            }
          }
        } catch (streamErr) {
          // Keep partial text if it reached the bubble; only an empty stream
          // re-throws so the failure banner shows.
          if (!liveAcc.trim()) throw streamErr;
        }
        // Agent picks the engine: anything the server could not draw gets a
        // browser-side puter.js attempt (User-Pays, free for the platform).
        for (const f of figs.values()) {
          if (f.status === "failed") {
            const url = await drawFigureWithPuter(f.prompt);
            if (url) { f.status = "done"; f.url = url; }
          }
        }
        const finalContent = liveAcc + figureBlocks();
        paintLive(true);
        setStreaming(false);

        if (!finalContent.trim()) {
          throw new Error("No reply received from the AI. Please try again.");
        }

        if (isLoggedIn) {
          if (liveCredits !== null) {
            setDailyCredits(liveCredits);
            if (liveCredits <= 0) setPoolEmpty(true);
          }
          saveChatHistory(sessionRef.current, [
            { role: "user", content },
            { role: "assistant", content: finalContent },
          ])
            .then(() => refreshSessions())
            .catch(() => {});
        } else {
          const used = liveRemaining !== null
            ? Math.min(MAX_GUEST_MESSAGES, Math.max(0, MAX_GUEST_MESSAGES - liveRemaining))
            : Math.min(MAX_GUEST_MESSAGES, guestCount + 1);
          writeGuestCount(used);
          setGuestCount(used);
        }
      } catch (err: unknown) {
        console.error("Tutor console error:", err);
        const msg =
          err instanceof Error && err.message
            ? err.message
            : "Failed to reach Veer. Please try again.";
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
        setStreaming(false);
        setStreamPhase(null);
      }
    },
    [sending, isGuestLimited, creditsExhausted, isLoggedIn, guestCount, refreshSessions],
  );

  const handleSend = (customText?: string) => {
    void sendWith(messages, customText ?? input, mode, pendingImages);
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
    const asked = messages[idx];
    void sendWith(messages.slice(0, idx), asked.content, mode, asked.images ?? []);
  };

  const followUp = (instruction: string) => {
    void sendWith(messages, instruction, mode);
  };

  /** Chat → quiz handoff: seed /ai-quiz with subject + last question. */
  const startPracticeQuiz = () => {
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    writeQuizSeed({
      subjectSlug: MODES.find((m) => m.id === mode)?.subjectSlug,
      topic: lastUser ? lastUser.content.slice(0, 120).trim() : "",
    });
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

  /** Empty the CURRENT conversation (keeps it in the history list). */
  const clearChat = () => {
    setMessages([]);
    setError(null);
    setRestoredCount(null);
    setStartersNonce((n) => n + 1);
    if (isLoggedIn) {
      clearChatHistory(sessionRef.current)
        .then(() => refreshSessions())
        .catch(() => {});
    }
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
    <div className="flex h-[calc(100vh-8rem)] lg:h-[calc(100vh-7rem)] min-h-[520px] flex-col overflow-hidden bg-card border-t border-border/50">
      {/* ── Header: identity + the green light (kept exactly) + actions ── */}
      <div className="shrink-0 border-b border-border/60 bg-gradient-to-r from-emerald-500/5 via-transparent to-primary/5">
        <div className="flex items-center justify-between gap-3 px-5 sm:px-8 pt-4 pb-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-violet-500 flex items-center justify-center text-white shadow-md shadow-primary/30 shrink-0">
              <CaptainAvatar className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-extrabold bg-gradient-to-r from-primary via-violet-500 to-primary bg-clip-text text-transparent animate-gradient-text truncate">
                  Veer
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
            {/* New chat — always available, opens a fresh conversation */}
            <button
              onClick={startNewChat}
              disabled={sending}
              className="inline-flex items-center gap-1 rounded-lg border border-border/70 bg-background px-2 py-1.5 text-[11px] font-semibold text-muted-foreground hover:text-foreground hover:border-emerald-500/40 transition-colors disabled:opacity-50"
              title="New chat — start a fresh conversation"
              aria-label="New chat"
            >
              <Plus className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">New chat</span>
            </button>
            {/* Chat history — every saved conversation, one click away */}
            {isLoggedIn && (
              <button
                onClick={() => setHistoryOpen((v) => !v)}
                aria-expanded={historyOpen}
                className="inline-flex items-center gap-1 rounded-lg border border-border/70 bg-background px-2 py-1.5 text-[11px] font-semibold text-muted-foreground hover:text-foreground hover:border-emerald-500/40 transition-colors"
                title="Your chat histories"
                aria-label="Chat history"
              >
                <History className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{sessions.length}</span>
              </button>
            )}
            {!isLoggedIn && (
              <span
                className="hidden sm:flex items-center gap-1.5 text-[11px] px-2 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-600 font-semibold"
                title="1 free message per day · sign in for daily credits"
              >
                <Coins className="h-3 w-3" />
                {guestCredits > 0 ? "1 free trial message" : "Free trial used"}
              </span>
            )}
            {isLoggedIn && privilegedUser &&
              (isOwner ? (
                // Owner + gate OFF → only the small windy dot shows the state
                // (long gate messages removed — owner request 2026-10-04).
                <CoinGateDot className="hidden sm:inline-flex" />
              ) : (
                <span
                  className="hidden sm:flex items-center gap-1.5 text-[11px] px-2 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-semibold"
                  title="PRO — unlimited, no coins needed"
                >
                  <Coins className="h-3 w-3" />
                  Free mode — no coins needed
                </span>
              ))}
            {isLoggedIn && !privilegedUser && (
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

        {/* History panel — switch between saved conversations */}
        {isLoggedIn && historyOpen && (
          <div className="mx-5 sm:mx-8 mb-3 max-h-64 overflow-y-auto rounded-xl border border-border/70 bg-background p-2 space-y-1">
            <p className="px-1.5 pt-0.5 pb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Your chat histories
            </p>
            {sessions.length === 0 ? (
              <p className="px-1.5 text-[11px] text-muted-foreground">
                No saved conversations yet — your first chat will appear here.
              </p>
            ) : (
              sessions.map((s) => (
                <button
                  key={s.session}
                  onClick={() => openSession(s.session)}
                  className={cn(
                    "w-full text-left rounded-lg px-2 py-1.5 transition-colors flex items-start gap-2",
                    s.session === sessionName
                      ? "bg-emerald-500/10 border border-emerald-500/30"
                      : "hover:bg-muted/60 border border-transparent",
                  )}
                >
                  <MessageSquare className="h-3.5 w-3.5 mt-0.5 shrink-0 text-muted-foreground" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-medium truncate">
                      {s.preview || "Conversation"}
                    </span>
                    <span className="block text-[10px] text-muted-foreground">
                      {s.messages} msgs · {new Date(s.lastMessageAt).toLocaleDateString()}
                    </span>
                  </span>
                </button>
              ))
            )}
          </div>
        )}

        {/* Subject-mode picker — this console's own feature */}
        <div className="flex gap-1.5 overflow-x-auto px-5 sm:px-8 pb-3">
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
        <div className="mx-5 sm:mx-8 mt-3 flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive shrink-0">
          <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* ── Stream ───────────────────────────────────────────────────── */}
      <div ref={streamRef} className="flex-1 overflow-y-auto px-5 sm:px-8 py-6 space-y-6">
        {!hasConversation && !sending ? (
          <div className="min-h-full flex flex-col justify-center max-w-3xl mx-auto space-y-7 py-8">
            <div className="text-center space-y-2">
              <div className="relative h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-primary shadow-lg shadow-emerald-500/25 text-white mx-auto flex items-center justify-center">
                <CaptainMark className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-extrabold bg-gradient-to-r from-foreground via-emerald-600 to-primary bg-clip-text text-transparent animate-gradient-text">
                {mode === "General"
                  ? "What are we learning today?"
                  : `${mode} mode — pick a starter or ask anything`}
              </h3>
              <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
                Derivations, mechanisms, wild &quot;why&quot; questions, misconceptions,
                past NEB questions — broken down step by step.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {starters.map((prompt, i) => {
                const Icon = prompt.icon;
                return (
                  <button
                    key={i}
                    onClick={() => handleSend(prompt.text)}
                    className="p-4 rounded-2xl border border-border/70 bg-muted/15 hover:bg-muted/40 hover:border-emerald-500/50 hover:-translate-y-0.5 hover:shadow-md hover:shadow-emerald-500/10 active:scale-[0.98] text-left transition-all duration-200 group flex flex-col justify-between space-y-2"
                  >
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md border w-fit flex items-center gap-1 ${prompt.color}`}
                    >
                      <Icon className="h-2.5 w-2.5" />
                      <span>{prompt.category}</span>
                    </span>
                    <p className="text-sm text-foreground/90 font-medium group-hover:text-emerald-600 transition-colors leading-relaxed">
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
                        <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium">
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
                    <CaptainAvatar className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="rounded-2xl rounded-tl-md border border-border/60 bg-muted/25 px-5 py-4">
                      <InteractiveMarkdown content={msg.content} />
                    </div>

                    {/* Shared per-answer actions — identical to the widget's */}
                    <ChatMessageActions
                      copied={copiedIndex === index}
                      onCopy={() => handleCopy(msg.content, index)}
                      isLatest={isLastAssistant}
                      disabled={sending}
                      onRegenerate={regenerate}
                      onDeeper={() => followUp(GO_DEEPER_INSTRUCTION)}
                      onShorter={() => followUp(KEEP_IT_SHORT_INSTRUCTION)}
                      onPractice={startPracticeQuiz}
                    />
                  </div>
                </div>
              );
            })}

            {/* Live server phase (research / continuation) is shown even while
                the bubble is already writing. */}
            {sending && (!streaming || streamPhase !== null) && (
              <div className="flex gap-3 animate-pop-in">
                <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-emerald-500/20 to-primary/20 border border-emerald-500/30 text-emerald-600 flex items-center justify-center shrink-0 mt-1">
                  <CaptainAvatar className="h-3.5 w-3.5" />
                </div>
                <div className="rounded-2xl rounded-tl-md border border-border/60 bg-muted/25 px-4 py-3 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.2s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-500 animate-bounce [animation-delay:-0.1s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-bounce" />
                  <span className="text-xs text-muted-foreground ml-1">
                    {streamPhase ?? THINKING_LINES[thinkIdx]}
                  </span>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Thread tools ─────────────────────────────────────────────── */}
      {hasConversation && !sending && (
        <div className="shrink-0 px-5 sm:px-8 pt-3 flex flex-wrap items-center gap-2 border-t border-border/40">
          <button
            onClick={() => followUp(SUMMARIZE_INSTRUCTION)}
            className="inline-flex items-center gap-1 rounded-lg border border-border/60 bg-background px-2 py-1 text-[10px] font-semibold text-muted-foreground hover:text-foreground hover:border-emerald-500/40 transition-colors"
            title="Turn this thread into revision notes"
          >
            <ListChecks className="h-3 w-3" /> Summarize thread
          </button>
          <button
            onClick={startPracticeQuiz}
            className="inline-flex items-center gap-1 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-2 py-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-colors"
            title="Open Veer quiz seeded with this conversation"
          >
            <Brain className="h-3 w-3" /> Practice quiz
          </button>
        </div>
      )}

      {/* ── Composer ─────────────────────────────────────────────────── */}
      <div className="shrink-0 border-t border-border/60 bg-muted/20 px-5 sm:px-8 py-4">
        {composerLocked && (
          <p className="mb-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-[11px] font-semibold text-amber-600">
            {isGuestLimited
              ? `Your free message for today is used — sign in to continue. Your daily credits and saved histories are waiting.`
              : `Today's ${DAILY_CREDIT_POOL}-credit pool is empty — it resets at 12:00 AM.`}
          </p>
        )}
        <ChatAttachPreview
          images={pendingImages}
          onRemove={(i) => setPendingImages((prev) => prev.filter((_, idx) => idx !== i))}
          className="mb-2"
        />
        <div className="flex items-end gap-2">
          <ChatAttachButton
            onPick={(dataUrl) => setPendingImages((prev) => [...prev, dataUrl].slice(0, MAX_ATTACHMENTS))}
            onError={setError}
            disabled={sending || composerLocked}
            attached={pendingImages.length}
            className="self-end"
          />
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={3}
            placeholder={
              mode === "General"
                ? "Ask any Class 11 & 12 doubt… (Enter to send)"
                : mode === "नेपाली"
                  ? "नेपालीमा सोध्नुहोस् — जवाफ शुद्ध नेपालीमै आउँछ… (Enter = पठाउनुहोस्)"
                  : mode === "Grammar"
                    ? "Ask about English grammar, writing, vocabulary, ideas… (Enter to send)"
                    : `Ask a ${mode} question… (Enter to send)`
            }
            disabled={composerLocked || sending}
            className="flex-1 resize-none rounded-2xl border border-input bg-background px-4 py-3 text-sm leading-relaxed placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 disabled:opacity-60"
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
            disabled={(!input.trim() && pendingImages.length === 0) || sending || composerLocked}
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
            : guestCredits > 0
              ? "1 free message left today · try Veer, then sign in for daily credits"
              : "Free trial used · sign in for daily credits & saved history"}
        </p>
      </div>
    </div>
  );
}
