"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Send,
  User,
  Brain,
  Globe,
  Lightbulb,
  Rocket,
  Scale,
  Sparkles,
  Trash2,
  Coins,
  AlertCircle,
  Atom,
  FlaskConical,
  Binary,
  Loader2,
  Plus,
  MessageSquare,
  History,
  PanelLeftClose,
  PanelLeft,
  UserRound,
} from "lucide-react";
import {
  chat,
  streamChat,
  guestChat,
  getChatHistory,
  saveChatHistory,
  clearChatHistory,
  getChatSessions,
  enhancePrompt,
  type ChatHistoryMessage,
  type ChatSession,
} from "@/lib/api/ai";
import { PLATFORM_SYSTEM_PROMPT } from "@/lib/ai/prompts";
import { drawFigureWithPuter } from "@/lib/puter-image";
import { stripLinksForCopy } from "@/lib/ai/clean-copy";
import {
  GUEST_DAILY_LIMIT as MAX_GUEST_MESSAGES,
  readGuestCount,
  writeGuestCount,
} from "@/lib/ai/guest-quota";
import type { AIChatMessage } from "@/types/api";
import { useSession } from "@/features/auth/hooks/use-session";
import { MathMarkdown } from "@/components/content/math-markdown";
import { cn } from "@/lib/utils";
import { CaptainAvatar, CaptainMark } from "@/components/ai/captain-logo";
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
  writeQuizSeed,
} from "@/lib/ai/chat-actions";

// ── Rotating suggestion deck (owner request 2026-09-28): the starter
// questions must never feel fixed — a wide pool of DEEP, idea-walk prompts
// (each invites many ideas in conceptual order, past → present) is shuffled
// on mount and whenever a fresh conversation starts.
type Suggestion = {
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  text: string;
};

const CAT_COLORS: Record<string, string> = {
  Physics: "text-sky-500 bg-sky-500/10 border-sky-500/30",
  Chemistry: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30",
  Biology: "text-pink-500 bg-pink-500/10 border-pink-500/30",
  Mathematics: "text-purple-500 bg-purple-500/10 border-purple-500/30",
  "World & History": "text-amber-600 bg-amber-500/10 border-amber-500/30",
  "Earth & Space": "text-indigo-500 bg-indigo-500/10 border-indigo-500/30",
};

function sug(
  category: string,
  icon: React.ComponentType<{ className?: string }>,
  text: string
): Suggestion {
  return {
    category,
    icon,
    color: CAT_COLORS[category] ?? "text-primary bg-primary/10 border-primary/30",
    text,
  };
}

const SUGGESTION_POOL: Suggestion[] = [
  sug("Physics", Atom, "Take me from the earliest idea of motion to Einstein — every big idea about space and time, in order."),
  sug("Physics", Atom, "What is energy, really? Walk me through every major idea behind it, oldest to newest."),
  sug("Physics", Lightbulb, "Explain light — from rays to photons to fields — the full chain of ideas in conceptual order."),
  sug("Physics", Rocket, "From falling apples to GPS: gather every idea that built Newton's gravity, step by step."),
  sug("Chemistry", FlaskConical, "From atoms to bonds to orbitals: build the whole idea of the chemical bond, step by step."),
  sug("Chemistry", FlaskConical, "Walk me through every idea behind the mole, from mass ratios to Avogadro's number."),
  sug("Chemistry", FlaskConical, "Gather every idea that explained why reactions happen — from affinities to energy landscapes."),
  sug("Biology", Brain, "From vital force to DNA to CRISPR: the chain of ideas that made heredity understandable."),
  sug("Biology", FlaskConical, "Trace the idea of the cell — from cork scratches to endosymbiosis — every step in order."),
  sug("Biology", Brain, "How did we figure out life runs on information? Build that idea from enzymes to the genetic code."),
  sug("Mathematics", Binary, "Build calculus from Zeno's paradox to the limit: every idea that made it rigorous."),
  sug("Mathematics", Binary, "From rope-stretching to graphs: how the idea of a function grew across centuries."),
  sug("Mathematics", Scale, "Why do proofs exist? Trace the idea of mathematical certainty from Euclid to Gödel."),
  sug("World & History", Globe, "What does 'knowing' mean? Build the idea of knowledge from ancient Greece to modern science."),
  sug("World & History", Scale, "Trace the idea of justice from Hammurabi to human rights — many views in conceptual order."),
  sug("World & History", Lightbulb, "How did we learn to trust numbers? From tally marks to statistics to big data."),
  sug("Earth & Space", Globe, "From a flat earth to an expanding universe: every big idea about our cosmos, in order."),
  sug("Earth & Space", Rocket, "Plate tectonics: gather every idea that proved the ground moves, oldest to newest."),
];

/** A random set of six from the pool (fresh deck for a fresh conversation). */
function shuffledSuggestions(): Suggestion[] {
  const bag = [...SUGGESTION_POOL];
  for (let i = bag.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [bag[i], bag[j]] = [bag[j], bag[i]];
  }
  return bag.slice(0, 6);
}

// Daily credit pools (owner policy 2026-09-26): guests get 5 free
// messages/day, logged users get 8 credits/day — both reset at 12:00 AM.
// Guest counts come from the shared day-keyed mirror (lib/ai/guest-quota);
// the server enforces the real numbers either way.
const DAILY_CREDIT_POOL = 4;
const ACTIVE_SESSION_KEY = "neb_ai_active_session";

// Rotating "work in progress" lines while the professor composes a reply —
// only rendered while `sending`, which is false during SSR, so the first
// client render matches the server exactly (no hydration risk).
const THINKING_LINES = [
  "Thinking it through…",
  "Extracting the ideas…",
  "Contemplating the concept…",
  "Musing it over…",
  "Pondering the question…",
  "Reflecting on what matters…",
  "Reasoning from first principles…",
  "Pulling in the NEB syllabus…",
  "Gathering the ideas in conceptual order…",
  "Building the answer from past to present…",
  "Connecting the dots…",
];

function newSessionId(): string {
  return `c-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

function readActiveSession(): string {
  if (typeof window === "undefined") return "default";
  return localStorage.getItem(ACTIVE_SESSION_KEY) || "default";
}

function writeActiveSession(session: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACTIVE_SESSION_KEY, session);
}

// ── Guest chat history (signed-out): full multi-thread history saved on
// this device, mirroring the signed-in sessions sidebar. One keyed store
// shared by the widget panel and /chat; the tutor console's single thread
// (`neb_tutor_thread`) is migrated in once on first load.
const GUEST_HISTORY_KEY = "neb_guest_chat_history_v1";
const LEGACY_GUEST_THREAD_KEY = "neb_tutor_thread";
const GUEST_THREAD_CAP = 12;
const GUEST_MESSAGE_CAP = 200;

interface GuestThread {
  session: string;
  messages: ChatHistoryMessage[];
  lastMessageAt: string;
}

interface GuestHistoryStore {
  active: string;
  threads: GuestThread[];
}

function readGuestHistory(): GuestHistoryStore {
  if (typeof window === "undefined") return { active: "default", threads: [] };
  try {
    const raw = localStorage.getItem(GUEST_HISTORY_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as GuestHistoryStore;
      if (parsed && Array.isArray(parsed.threads)) {
        return { active: parsed.active || "default", threads: parsed.threads };
      }
    }
  } catch {
    /* corrupted store — fall through to a fresh one */
  }
  // One-time migration of the tutor console's single guest thread.
  try {
    const legacy = localStorage.getItem(LEGACY_GUEST_THREAD_KEY);
    if (legacy) {
      const parsed: unknown = JSON.parse(legacy);
      if (Array.isArray(parsed)) {
        const messages = parsed.filter(
          (m): m is ChatHistoryMessage =>
            !!m &&
            typeof m === "object" &&
            ((m as ChatHistoryMessage).role === "user" ||
              (m as ChatHistoryMessage).role === "assistant") &&
            typeof (m as ChatHistoryMessage).content === "string",
        );
        if (messages.length) {
          const store: GuestHistoryStore = {
            active: "default",
            threads: [
              {
                session: "default",
                messages: messages.map((m) => ({ role: m.role, content: m.content })),
                lastMessageAt: new Date().toISOString(),
              },
            ],
          };
          localStorage.setItem(GUEST_HISTORY_KEY, JSON.stringify(store));
          return store;
        }
      }
    }
  } catch {
    /* storage blocked — start fresh */
  }
  return { active: "default", threads: [] };
}

function writeGuestHistory(store: GuestHistoryStore): void {
  if (typeof window === "undefined") return;
  try {
    const threads = store.threads
      .slice(0, GUEST_THREAD_CAP)
      .map((t) => ({ ...t, messages: t.messages.slice(-GUEST_MESSAGE_CAP) }));
    const trimmed: GuestHistoryStore = { active: store.active, threads };
    localStorage.setItem(GUEST_HISTORY_KEY, JSON.stringify(trimmed));
    // Keep the tutor console's single-thread key pointing at the active
    // thread so /tutor and this panel read the same guest conversation.
    const active = threads.find((t) => t.session === trimmed.active);
    if (active && active.messages.length) {
      localStorage.setItem(LEGACY_GUEST_THREAD_KEY, JSON.stringify(active.messages));
    } else {
      localStorage.removeItem(LEGACY_GUEST_THREAD_KEY);
    }
  } catch {
    /* storage blocked — history just won't survive a reload */
  }
}

function guestThreadToSessions(threads: GuestThread[]): ChatSession[] {
  return threads.map((t) => ({
    session: t.session,
    messages: t.messages.length,
    lastMessageAt: t.lastMessageAt,
    preview:
      t.messages.find((m) => m.role === "user")?.content.slice(0, 80) ??
      "Conversation",
  }));
}

export function AIChatInterface({ embedded = false }: { embedded?: boolean } = {}) {
  const { user } = useSession();
  const router = useRouter();
  const isLoggedIn = !!user;
  /** Photos queued for the next message (camera / gallery). */
  const [pendingImages, setPendingImages] = useState<string[]>([]);

  const [messages, setMessages] = useState<AIChatMessage[]>([
    { role: "system", content: PLATFORM_SYSTEM_PROMPT },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [streamingText, setStreamingText] = useState<string | null>(null);
  // Live server phase ("Researching the topic…", "Continuing…"): the stream
  // opens before the web research, so the wait is visible and explained
  // instead of looking like a frozen or one-shot reply.
  const [streamPhase, setStreamPhase] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  // Guest usage lives in localStorage — it must NEVER be read during render,
  // or the server HTML (always 0) won't match the hydrated client (the
  // 2026-09-26 hydration error on /chat: "7" vs "6"). Seed after mount.
  const [guestCount, setGuestCount] = useState(0);
  const [dailyCredits, setDailyCredits] = useState<number | null>(null);
  // True only after the SERVER declared the pool empty (402 or a billing
  // response of 0) — never guessed client-side, so owner/admin/premium
  // balances (manually managed, never 402) can't be locked out by mistake.
  const [poolEmpty, setPoolEmpty] = useState(false);
  const [enhancing, setEnhancing] = useState(false);
  const [historyState, setHistoryState] = useState<"idle" | "loading" | "ready">("idle");
  const historyLoadedRef = useRef(false);

  // Individual chat histories (per-session conversations, signed-in only).
  const [session, setSession] = useState<string>("default");
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(!embedded);
  const [suggestions, setSuggestions] = useState<Suggestion[]>(() =>
    SUGGESTION_POOL.slice(0, 6)
  );
  const [restoredCount, setRestoredCount] = useState<number | null>(null);

  const [thinkIdx, setThinkIdx] = useState(0);

  const streamRef = useRef<HTMLDivElement>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const sessionRef = useRef(session);
  sessionRef.current = session;
  const guestThreadsRef = useRef<GuestThread[]>([]);
  const asideRef = useRef<HTMLElement>(null);

  // Fresh deep-question set per mount (deterministic first paint → no
  // hydration mismatch; the shuffle lands right after hydration).
  useEffect(() => {
    setSuggestions(shuffledSuggestions());
  }, []);

  // Embedded widget: clicking outside the histories drawer closes it
  // (hovering the left edge re-opens it — see the hotspot near <aside>).
  useEffect(() => {
    if (!embedded || !sidebarOpen) return;
    const onPointerDown = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target || typeof target.closest !== "function") return;
      if (asideRef.current?.contains(target)) return;
      if (target.closest("[data-chat-sidebar-toggle]")) return;
      setSidebarOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [embedded, sidebarOpen]);

  const guestCredits = Math.max(0, MAX_GUEST_MESSAGES - guestCount);
  const isGuestLimited = !isLoggedIn && guestCount >= MAX_GUEST_MESSAGES;
  // Mirror of the backend's hasFullAccess(): these roles are never billed.
  const privilegedUser =
    user?.role === "OWNER" || user?.role === "ADMIN" || !!user?.premiumStatus;
  const creditsExhausted =
    isLoggedIn &&
    !privilegedUser &&
    (poolEmpty ||
      dailyCredits === 0 ||
      (typeof user?.credits === "number" && user.credits <= 0));
  const composerLocked = isGuestLimited || creditsExhausted;

  const refreshSessions = useCallback(async () => {
    if (!isLoggedIn) {
      // Signed-out: the sidebar lists the conversations saved on this device.
      setSessions(guestThreadToSessions(guestThreadsRef.current));
      return;
    }
    try {
      const { sessions: list } = await getChatSessions();
      setSessions(list);
    } catch {
      // history unavailable — sidebar just stays empty
    }
  }, [isLoggedIn]);

  const loadSessionHistory = useCallback(
    async (sessionName: string) => {
      setHistoryState("loading");
      if (!isLoggedIn) {
        // Signed-out: restore the chosen conversation from this device.
        const thread = guestThreadsRef.current.find((t) => t.session === sessionName);
        if (thread && thread.messages.length) {
          setMessages([
            { role: "system", content: PLATFORM_SYSTEM_PROMPT },
            ...thread.messages.map((m) => ({ role: m.role, content: m.content }) as AIChatMessage),
          ]);
          setRestoredCount(thread.messages.length);
        } else {
          setMessages([{ role: "system", content: PLATFORM_SYSTEM_PROMPT }]);
          setRestoredCount(null);
        }
        setHistoryState("ready");
        return;
      }
      try {
        const { messages: restored } = await getChatHistory(sessionName, 200);
        const system: AIChatMessage = { role: "system", content: PLATFORM_SYSTEM_PROMPT };
        if (restored.length) {
          setMessages([
            system,
            ...restored.map((m: ChatHistoryMessage) => ({ role: m.role, content: m.content })),
          ]);
          setRestoredCount(restored.length);
        } else {
          setMessages([system]);
          setRestoredCount(null);
        }
      } catch {
        setMessages([{ role: "system", content: PLATFORM_SYSTEM_PROMPT }]);
      } finally {
        setHistoryState("ready");
      }
    },
    [isLoggedIn]
  );

  useEffect(() => {
    if (!isLoggedIn) {
      // Post-mount only: localStorage is unavailable on the server, so the
      // first client render must match the server's count of 0 exactly.
      setGuestCount(readGuestCount());
      // Signed-out history: restore the conversations saved on this device.
      const store = readGuestHistory();
      guestThreadsRef.current = store.threads;
      setSessions(guestThreadToSessions(store.threads));
      setSession(store.active);
      const guestActive = store.threads.find((t) => t.session === store.active);
      if (guestActive && guestActive.messages.length) {
        setMessages([
          { role: "system", content: PLATFORM_SYSTEM_PROMPT },
          ...guestActive.messages.map((m) => ({ role: m.role, content: m.content }) as AIChatMessage),
        ]);
        setRestoredCount(guestActive.messages.length);
      }
      setHistoryState("ready");
      return;
    }
    if (historyLoadedRef.current) return;
    historyLoadedRef.current = true;
    const active = readActiveSession();
    setSession(active);
    loadSessionHistory(active);
    refreshSessions();
    // Signed-in header shows the live daily pool (4 credits/day, resets
    // at 12:00 AM) — /api/auth/me already applied the lazy midnight reset.
    if (user && typeof user.credits === "number") setDailyCredits(user.credits);
  }, [isLoggedIn, loadSessionHistory, refreshSessions, user]);

  useEffect(() => {
    // Nothing to follow yet (empty state) — scrolling to the sentinel would
    // bury the greeting under the composer. Also pin the stream to the top
    // so a restored/reloaded page can't start mid-greeting.
    const hasConversation = messages.some((m) => m.role !== "system");
    if (!hasConversation && !sending) {
      if (streamRef.current) streamRef.current.scrollTop = 0;
      return;
    }
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  // Cycle the thinking lines while a reply is composing (client-only — the
  // indicator never renders during SSR).
  useEffect(() => {
    if (!sending) {
      setThinkIdx(0);
      return;
    }
    const id = setInterval(() => setThinkIdx((i) => (i + 1) % THINKING_LINES.length), 2600);
    return () => clearInterval(id);
  }, [sending]);

  // Focus the composer when the widget panel opens (embedded mount).
  useEffect(() => {
    if (embedded) inputRef.current?.focus();
  }, [embedded]);

  /** Signed-out history: save a completed exchange into the device thread. */
  const touchGuestThread = (sessionName: string, pair: ChatHistoryMessage[]) => {
    if (isLoggedIn) return;
    const now = new Date().toISOString();
    const threads = guestThreadsRef.current;
    const idx = threads.findIndex((t) => t.session === sessionName);
    if (idx >= 0) {
      const updated: GuestThread = {
        ...threads[idx],
        messages: [...threads[idx].messages, ...pair],
        lastMessageAt: now,
      };
      guestThreadsRef.current = [updated, ...threads.filter((_, i) => i !== idx)];
    } else {
      guestThreadsRef.current = [
        { session: sessionName, messages: [...pair], lastMessageAt: now },
        ...threads,
      ];
    }
    setSessions(guestThreadToSessions(guestThreadsRef.current));
    writeGuestHistory({ active: sessionName, threads: guestThreadsRef.current });
  };

  /**
   * Core send with an EXPLICIT history, so the quick actions (regenerate,
   * deeper, shorter) can re-send from any point without stale-state races.
   * Photos ride on the user message; a photo-only message gets a prompt that
   * tells the model to read the image and teach what it shows.
   */
  const sendWith = async (
    history: AIChatMessage[],
    rawText: string,
    images: string[] = [],
  ) => {
    const textToSend = rawText.trim() || (images.length ? PHOTO_ONLY_PROMPT : "");
    if (!textToSend || sending) return;
    if (historyState === "loading") return;

    if (isGuestLimited) {
      setError(`You've used all ${MAX_GUEST_MESSAGES} free guest messages for today. Your pool resets to ${MAX_GUEST_MESSAGES} at 12:00 AM — or sign in for ${DAILY_CREDIT_POOL} daily credits & saved histories.`);
      return;
    }
    if (creditsExhausted) {
      setError(`You've used all ${DAILY_CREDIT_POOL} credits of today's daily pool. It resets at 12:00 AM — or go PRO for no daily cap.`);
      return;
    }

    const userMsg: AIChatMessage = images.length
      ? { role: "user", content: textToSend, images }
      : { role: "user", content: textToSend };
    const outbound = [...history, userMsg];
    setMessages(outbound);
    setInput("");
    setPendingImages([]);
    setSending(true);
    setError(null);

    const targetSession = sessionRef.current;

    try {
      // LIVE streaming (owner 2026-09-30): assistant bubble streams deltas live
      // for both signed-in and guest users, with real-time continuous generation,
      // figures, and markdown rendering.
      let liveAcc = "";
      let liveCredits: number | null = null;
      let liveRemaining: number | null = null;
      let sawToken = false;
      let lastPaint = 0;
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
        for await (const chunk of streamChat(outbound, undefined, { isGuest: !isLoggedIn })) {
          if (typeof chunk === "string") {
            if (!sawToken) {
              sawToken = true;
              liveAcc = chunk;
              setStreamPhase(null);
              setStreamingText("");
              setMessages((prev) => [...prev, { role: "assistant", content: chunk + figureBlocks() }]);
            } else {
              liveAcc += chunk;
              paintLive(false);
            }
          } else if ("phase" in chunk) {
            // Research/writing progress before the first token exists.
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
        if (!liveAcc.trim()) throw streamErr;
      }
      for (const f of figs.values()) {
        if (f.status === "failed") {
          const url = await drawFigureWithPuter(f.prompt);
          if (url) { f.status = "done"; f.url = url; }
        }
      }
      paintLive(true);
      setStreamingText(null);

      if (!liveAcc.trim()) {
        throw new Error("No reply received from the AI. Please try again.");
      }

      const finalReply = liveAcc + figureBlocks();

      if (isLoggedIn) {
        if (liveCredits !== null) {
          setDailyCredits(liveCredits);
          if (liveCredits <= 0) setPoolEmpty(true);
        }
        saveChatHistory(targetSession, [
          { role: "user", content: textToSend },
          { role: "assistant", content: finalReply },
        ]).catch(() => {});
        setSessions((prev) => {
          if (prev.some((s) => s.session === targetSession)) {
            return prev.map((s) =>
              s.session === targetSession
                ? {
                    ...s,
                    messages: s.messages + 2,
                    lastMessageAt: new Date().toISOString(),
                    preview: s.preview || textToSend.slice(0, 80),
                  }
                : s
            );
          }
          return [
            {
              session: targetSession,
              messages: 2,
              lastMessageAt: new Date().toISOString(),
              preview: textToSend.slice(0, 80),
            },
            ...prev,
          ];
        });
      } else {
        const nextUsed = liveRemaining !== null
          ? Math.min(MAX_GUEST_MESSAGES, Math.max(0, MAX_GUEST_MESSAGES - liveRemaining))
          : Math.min(MAX_GUEST_MESSAGES, guestCount + 1);
        writeGuestCount(nextUsed);
        setGuestCount(nextUsed);
        touchGuestThread(sessionRef.current, [
          { role: "user", content: textToSend },
          { role: "assistant", content: finalReply },
        ]);
      }
    } catch (err: any) {
      console.error("AI chat error:", err);
      setStreamingText(null);
      setStreamPhase(null);
      // A dead stream that already painted partial text: keep the partial
      // bubble, append a marker so the student sees it stopped.
      setMessages((prev) => {
        const next = [...prev];
        const last = next[next.length - 1];
        if (last?.role === "assistant" && !next[next.length - 1].content.trim()) {
          next.pop();
        }
        return next;
      });
      const msg =
        err.message || "Failed to reach Veer. Please try again.";
      setError(msg);
      if (err?.status === 402) {
        // Daily pool empty (guest or signed-in). The server's message
        // explains the limit — show that instead of a fake "connection
        // difficulty" bubble, and lock the composer until the pool refills.
        if (isLoggedIn) {
          setDailyCredits(0);
          setPoolEmpty(true);
        } else {
          writeGuestCount(MAX_GUEST_MESSAGES);
          setGuestCount(MAX_GUEST_MESSAGES);
        }
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "I apologize, but I encountered a connection difficulty. Please verify your connection or try rephrasing your question.",
          },
        ]);
      }
    } finally {
      setSending(false);
    }
  };

  const handleSend = (customText?: string) => {
    void sendWith(messages, customText ?? input, pendingImages);
  };

  /** Drop the stale answer and ask the previous question again. */
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
    void sendWith(messages.slice(0, idx), asked.content, asked.images ?? []);
  };

  /** Follow-up instruction on top of the current thread (deeper / shorter). */
  const followUp = (instruction: string) => {
    void sendWith(messages, instruction, []);
  };

  /** Chat → quiz handoff: seed /ai-quiz with the last question. */
  const startPracticeQuiz = () => {
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    writeQuizSeed({ topic: lastUser ? lastUser.content.slice(0, 120).trim() : "" });
    router.push("/ai-quiz");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopy = async (content: string, index: number) => {
    // Links stay clickable on screen — but their URLs never reach the
    // clipboard (owner rule 2026-09-27: labels yes, URLs hidden).
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

  /** Start a fresh conversation (its own chat history). */
  const startNewChat = () => {
    const id = newSessionId();
    setSession(id);
    if (isLoggedIn) writeActiveSession(id);
    setMessages([{ role: "system", content: PLATFORM_SYSTEM_PROMPT }]);
    setError(null);
    setRestoredCount(null);
    setSuggestions(shuffledSuggestions());
    if (window.innerWidth < 1024) setSidebarOpen(false);
    inputRef.current?.focus();
  };

  /** Switch to an existing conversation and restore its history. */
  const openChat = (sessionName: string) => {
    if (sessionName === session) return;
    setSession(sessionName);
    if (isLoggedIn) writeActiveSession(sessionName);
    else writeGuestHistory({ active: sessionName, threads: guestThreadsRef.current });
    setError(null);
    loadSessionHistory(sessionName);
    if (window.innerWidth < 1024) setSidebarOpen(false);
  };

  /** Delete one conversation's history (falls back to a fresh chat). */
  const deleteChat = async (e: React.MouseEvent, sessionName: string) => {
    e.stopPropagation();
    if (!window.confirm("Delete this conversation permanently?")) return;
    if (isLoggedIn) {
      await clearChatHistory(sessionName).catch(() => {});
    } else {
      guestThreadsRef.current = guestThreadsRef.current.filter((t) => t.session !== sessionName);
      writeGuestHistory({ active: sessionRef.current, threads: guestThreadsRef.current });
    }
    setSessions((prev) => prev.filter((s) => s.session !== sessionName));
    if (sessionName === session) {
      const next = sessions.find((s) => s.session !== sessionName);
      if (next) {
        openChat(next.session);
      } else {
        const id = newSessionId();
        setSession(id);
        if (isLoggedIn) writeActiveSession(id);
        setMessages([{ role: "system", content: PLATFORM_SYSTEM_PROMPT }]);
        setRestoredCount(null);
      }
    }
    refreshSessions();
  };

  /** Clear the ACTIVE conversation (keeps the session, empties its messages). */
  const clearChat = () => {
    setMessages([{ role: "system", content: PLATFORM_SYSTEM_PROMPT }]);
    setError(null);
    setRestoredCount(null);
    if (isLoggedIn) {
      clearChatHistory(sessionRef.current).catch(() => {});
    } else {
      // Signed-out: drop this device's thread for the conversation.
      guestThreadsRef.current = guestThreadsRef.current.filter(
        (t) => t.session !== sessionRef.current,
      );
      writeGuestHistory({ active: sessionRef.current, threads: guestThreadsRef.current });
    }
    setSessions((prev) => prev.filter((s) => s.session !== sessionRef.current));
    setSuggestions(shuffledSuggestions());
  };

  /** Rewrite the drafted prompt into a sharper study question before sending. */
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

  const displayMessages = messages.filter((m) => m.role !== "system");
  // The in-progress bubble is the last assistant message while a stream runs.
  const isStreaming =
    sending && streamingText !== null &&
    displayMessages[displayMessages.length - 1]?.role === "assistant";
  const lastAssistantIndex = (() => {
    for (let i = displayMessages.length - 1; i >= 0; i--) {
      if (displayMessages[i].role === "assistant") return i;
    }
    return -1;
  })();

  return (
    <div
      className={
        embedded
          ? "relative flex h-full w-full overflow-hidden bg-card"
          : "flex h-[calc(100vh-10rem)] max-h-[850px] min-h-[500px] rounded-3xl border border-border/80 bg-card shadow-lg overflow-hidden"
      }
    >
      {/* ── Conversations sidebar (individual chat histories) ─────── */}
      {/* Embedded: hovering the left edge slides the histories open. */}
      {embedded && !sidebarOpen && (
        <div
          aria-hidden="true"
          onMouseEnter={() => setSidebarOpen(true)}
          className="absolute inset-y-0 left-0 w-3 z-30 cursor-pointer"
        />
      )}
      {(
        <aside
          ref={asideRef}
          className={cn(
            "shrink-0 border-r border-border/60 bg-muted/20 flex flex-col transition-all duration-200",
            sidebarOpen
              ? embedded
                ? "w-60"
                : "w-64"
              : "w-0 overflow-hidden border-r-0",
            embedded && sidebarOpen && "absolute inset-y-0 left-0 z-20 shadow-2xl"
          )}
          aria-hidden={!sidebarOpen}
        >
          <div className="p-3 border-b border-border/50">
            <button
              onClick={startNewChat}
              className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold py-2.5 hover:opacity-90 transition-opacity"
            >
              <Plus className="h-3.5 w-3.5" />
              New conversation
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            <p className="px-2 pt-1 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <History className="h-3 w-3" />
              Your chat histories
            </p>
            {sessions.length === 0 ? (
              <p className="px-2 text-[11px] text-muted-foreground leading-relaxed">
                No saved conversations yet. Your first chat will appear here.
              </p>
            ) : (
              sessions.map((s) => (
                <button
                  key={s.session}
                  onClick={() => openChat(s.session)}
                  className={cn(
                    "group w-full text-left rounded-xl px-2.5 py-2 transition-colors flex items-start gap-2",
                    s.session === session
                      ? "bg-primary/10 border border-primary/30"
                      : "hover:bg-muted/60 border border-transparent"
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
                  <span
                    role="button"
                    tabIndex={0}
                    aria-label="Delete conversation"
                    onClick={(e) => deleteChat(e, s.session)}
                    onKeyDown={(e) => e.key === "Enter" && deleteChat(e as any, s.session)}
                    className="opacity-0 group-hover:opacity-100 shrink-0 p-1 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                  >
                    <Trash2 className="h-3 w-3" />
                  </span>
                </button>
              ))
            )}
          </div>
          <div className="p-3 border-t border-border/50">
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <Coins className="h-3.5 w-3.5 text-amber-500" />
              <span className="font-semibold">
                {isLoggedIn
                  ? `${Math.min(dailyCredits ?? user?.credits ?? DAILY_CREDIT_POOL, DAILY_CREDIT_POOL)}/${DAILY_CREDIT_POOL} credits today`
                  : `${guestCredits} of ${MAX_GUEST_MESSAGES} free messages left today`}
              </span>
            </div>
          </div>
        </aside>
      )}

      {/* ── Main column ───────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-border/60 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            {(
              <button
                data-chat-sidebar-toggle=""
                onClick={() => setSidebarOpen((v) => !v)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                title={sidebarOpen ? "Hide conversations" : "Show conversations"}
                aria-label="Toggle conversations sidebar"
              >
                {sidebarOpen ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
              </button>
            )}
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-violet-500 flex items-center justify-center text-white shadow-md shadow-primary/30 shrink-0">
              <CaptainAvatar className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-extrabold bg-gradient-to-r from-primary via-violet-500 to-primary bg-clip-text text-transparent animate-gradient-text truncate">
                  Veer
                </h2>
                {/* live dot — the professor is on duty */}
                <span className="relative flex h-2 w-2 shrink-0" title="Online">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground truncate">
                Grounded in the NEB Class 11 &amp; 12 syllabus · ask me anything
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {!isLoggedIn && (
              <span className="hidden sm:flex items-center gap-1.5 text-[11px] px-2 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-600 font-semibold">
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
                {Math.min(dailyCredits ?? user?.credits ?? DAILY_CREDIT_POOL, DAILY_CREDIT_POOL)}/{DAILY_CREDIT_POOL} credits today
              </span>
            )}
            {/* New chat — opens a fresh conversation (same as the sidebar button) */}
            <button
              onClick={startNewChat}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              title="New chat — start a fresh conversation"
              aria-label="New chat"
            >
              <Plus className="h-4 w-4" />
            </button>
            {displayMessages.length > 0 && (
              <button
                onClick={clearChat}
                className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                title="Clear this conversation"
                aria-label="Clear chat"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Message stream */}
        <div ref={streamRef} className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 space-y-5">
          {historyState === "loading" ? (
            <div className="h-full flex flex-col items-center justify-center gap-3 text-muted-foreground">
              <div className="h-7 w-7 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <p className="text-xs">Loading conversation…</p>
            </div>
          ) : displayMessages.length === 0 ? (
            /* Empty state */
            <div className="min-h-full flex flex-col justify-center max-w-2xl mx-auto space-y-6 py-6">
              <div className="text-center space-y-2">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-violet-500 shadow-lg shadow-primary/25 text-white mx-auto flex items-center justify-center">
                  <CaptainMark className="h-9 w-9 text-white animate-pulse" />
                </div>
                <h3 className="text-xl font-extrabold bg-gradient-to-r from-foreground via-primary to-violet-500 bg-clip-text text-transparent animate-gradient-text">
                  What are we learning today?
                </h3>
                <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
                  Fire away — derivations, mechanisms, wild &quot;why&quot; questions, misconceptions, or past
                  NEB questions. Physics, Chemistry, Biology, Math: broken down step by step.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {suggestions.map((prompt, i) => {
                  const Icon = prompt.icon;
                  return (
                    <button
                      key={i}
                      onClick={() => handleSend(prompt.text)}
                      className="p-3 rounded-2xl border border-border/70 bg-muted/15 hover:bg-muted/40 hover:border-primary/50 hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/10 active:scale-[0.98] text-left transition-all duration-200 group flex flex-col justify-between space-y-1.5"
                    >
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border w-fit flex items-center gap-1 ${prompt.color}`}>
                        <Icon className="h-2.5 w-2.5" />
                        <span>{prompt.category}</span>
                      </span>
                      <p className="text-xs text-foreground/90 font-medium group-hover:text-primary transition-colors leading-relaxed">
                        {prompt.text}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Active thread — assistant answers are full-width, user asks are right-aligned */
            displayMessages.map((msg, index) => {
              const isUser = msg.role === "user";
              if (isUser) {
                return (
                  <div key={index} className="flex justify-end animate-pop-in">
                    <div className="flex items-end gap-2.5 max-w-[85%]">
                      <div className="rounded-2xl rounded-br-md bg-gradient-to-br from-primary to-violet-500 text-primary-foreground px-4 py-2.5 shadow-sm">
                        <p className="text-xs leading-relaxed whitespace-pre-wrap font-medium">{msg.content}</p>
                      </div>
                      <div className="h-7 w-7 rounded-lg bg-muted border border-border flex items-center justify-center shrink-0 text-muted-foreground">
                        <User className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <div key={index} className="group flex gap-3 animate-pop-in">
                  <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary/20 to-violet-500/20 border border-primary/25 text-primary flex items-center justify-center shrink-0 mt-1">
                    <CaptainAvatar className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0 flex-1 rounded-2xl rounded-tl-md border border-border/60 bg-muted/20 px-4 py-3">
                    <div className="text-xs leading-relaxed">
                      <MathMarkdown content={msg.content} />
                      {isStreaming && index === lastAssistantIndex && (
                        <span className="ml-0.5 inline-block h-3 w-1.5 animate-pulse rounded-sm bg-primary align-text-bottom" aria-hidden />
                      )}
                    </div>
                    {/* Same per-answer actions as the tutor console, same position */}
                    <ChatMessageActions
                      copied={copiedIndex === index}
                      onCopy={() => handleCopy(msg.content, index)}
                      isLatest={index === lastAssistantIndex}
                      disabled={sending}
                      onRegenerate={regenerate}
                      onDeeper={() => followUp(GO_DEEPER_INSTRUCTION)}
                      onShorter={() => followUp(KEEP_IT_SHORT_INSTRUCTION)}
                      onPractice={startPracticeQuiz}
                    />
                  </div>
                </div>
              );
            })
          )}

          {/* Thinking indicator — hidden once the stream starts writing, but
              brought back for a live server phase (a continuation mid-answer
              is real news while text keeps arriving). */}
          {sending && (!isStreaming || streamPhase !== null) && (
            <div className="flex gap-3 animate-fade-in">
              <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary/20 to-violet-500/20 border border-primary/25 text-primary flex items-center justify-center shrink-0 mt-1">
                <CaptainAvatar className="h-3.5 w-3.5" />
              </div>
              <div className="rounded-2xl rounded-tl-md border border-border/60 bg-muted/20 px-4 py-3 flex items-center gap-2.5 text-xs text-muted-foreground">
                <span className="flex gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:0ms]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-500 animate-bounce [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-bounce [animation-delay:300ms]" />
                </span>
                <span key={streamPhase ?? thinkIdx} className="animate-fade-in">
                  {streamPhase ?? THINKING_LINES[thinkIdx]}
                </span>
              </div>
            </div>
          )}

          {error && (
            <div className="p-3.5 rounded-2xl bg-destructive/10 border border-destructive/30 text-destructive text-xs flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <div className="flex-1">
                <span>{error}</span>
                {!isLoggedIn && (
                  <Link href="/login" className="ml-2 font-bold underline hover:opacity-80">
                    Log in here &rarr;
                  </Link>
                )}
              </div>
            </div>
          )}

          {restoredCount !== null && restoredCount > 0 && (
            <div className="flex justify-center">
              <span className="rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-[10px] font-medium text-muted-foreground">
                Restored {restoredCount} earlier message{restoredCount === 1 ? "" : "s"} from this conversation
              </span>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>         {/* Composer */}
        <div className="px-4 sm:px-6 py-4 border-t border-border/60 bg-muted/10 shrink-0">
          <ChatAttachPreview
            images={pendingImages}
            onRemove={(i) => setPendingImages((prev) => prev.filter((_, idx) => idx !== i))}
            className="max-w-4xl mx-auto mb-2"
          />
          <div className="relative flex items-end gap-2 max-w-4xl mx-auto">
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={sending || composerLocked}
              placeholder={
                isGuestLimited
                  ? "Guest limit reached — please log in to ask more questions."
                  : creditsExhausted
                    ? "Daily credits used up — your pool resets to 4 at 12:00 AM, or go PRO with no daily cap."
                    : "Ask me anything… ⚡ Enter to send · Shift+Enter for a new line"
              }
              className="flex-1 max-h-32 min-h-[44px] py-2.5 px-4 rounded-2xl border border-border/80 bg-card text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none font-medium"
            />

            <ChatAttachButton
              onPick={(dataUrl) => setPendingImages((prev) => [...prev, dataUrl].slice(0, MAX_ATTACHMENTS))}
              onError={setError}
              disabled={sending || composerLocked}
              attached={pendingImages.length}
            />
            <button
              onClick={handleEnhance}
              disabled={!input.trim() || sending || enhancing || composerLocked}
              className="h-11 w-11 rounded-2xl border border-violet-500/40 bg-violet-500/10 text-violet-600 font-semibold flex items-center justify-center hover:bg-violet-500/20 hover:scale-105 active:scale-95 disabled:hover:scale-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0"
              title="Enhance my prompt — rewrite it into a sharper study question"
              aria-label="Enhance prompt"
            >
              {enhancing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            </button>
            <button
              onClick={() => handleSend()}
              disabled={(!input.trim() && pendingImages.length === 0) || sending || composerLocked}
              className="h-11 px-4 rounded-2xl bg-gradient-to-r from-primary to-violet-500 text-primary-foreground font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-primary/30 hover:shadow-lg hover:shadow-primary/40 hover:scale-[1.03] active:scale-95 disabled:hover:scale-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0"
              aria-label="Send message"
            >
              <span>Send</span>
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="mt-2 text-center text-[10px] text-muted-foreground/60 flex items-center justify-center gap-3 flex-wrap">
            {isLoggedIn ? (
              <span className="flex items-center gap-1">
                <UserRound className="h-3 w-3" />
                Each conversation is saved as its own chat history.
              </span>
            ) : (
              <span>
                Free guest mode ({Math.max(0, MAX_GUEST_MESSAGES - guestCount)} messages left) ·{" "}
                <Link href="/login" className="text-primary hover:underline font-semibold">
                  Sign in to save your histories &amp; keep asking
                </Link>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
