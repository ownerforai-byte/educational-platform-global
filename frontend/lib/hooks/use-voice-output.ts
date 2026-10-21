"use client";

/**
 * useVoiceOutput — read-aloud speech synthesis for Veer's replies.
 *
 * Pairs with `useVoiceInput` so the voice experience is complete: the student
 * can speak an instruction with the mic and listen to Veer's reply read out
 * loud (either on demand from the message action bar or automatically after a
 * hands-free voice turn).
 *
 * Raw markdown makes terrible speech — fences of SVG/HTML code, LaTeX commands
 * and URLs would be spelled out character by character — so `speechTextFromMarkdown`
 * strips code/visual fences, callout markers, URLs and LaTeX syntax into clean
 * spoken sentences before handing the text to `window.speechSynthesis`.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { stripLinksForCopy } from "@/lib/ai/clean-copy";

export function speechOutputSupported(): boolean {
  if (typeof window === "undefined") return false;
  return (
    "speechSynthesis" in window &&
    typeof window.SpeechSynthesisUtterance === "function"
  );
}

/**
 * Turn a markdown + LaTeX + fenced-artefact reply into natural spoken text.
 * Code and visual fences (`svg`, `run`, `html`, `steps`) happen in the
 * background on screen and are never read out character-by-character.
 */
export function speechTextFromMarkdown(markdown: string): string {
  if (!markdown) return "";

  const withoutFences = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/```[\s\S]*$/g, " ");

  const withoutLinks = stripLinksForCopy(withoutFences);

  return withoutLinks
    .replace(/^:{3,}\s*\w*\b.*$/gm, " ")
    .replace(/\\frac\s*\{([^{}]+)\}\s*\{([^{}]+)\}/g, "$1 over $2")
    .replace(/\\sqrt\s*\{([^{}]+)\}/g, "square root of $1")
    .replace(/\$\$([\s\S]*?)\$\$/g, " $1 ")
    .replace(/\$([^$\n]+)\$/g, " $1 ")
    .replace(/\\\(([\s\S]*?)\\\)/g, " $1 ")
    .replace(/\\\[([\s\S]*?)\\\]/g, " $1 ")
    .replace(/\\(?:text|mathrm|mathbf|mathit|ce|pu)\s*\{([^{}]*)\}/g, "$1")
    .replace(/\\(?:times|cdot)\b/g, " times ")
    .replace(/\\(?:rightarrow|to|implies)\b/g, " gives ")
    .replace(/\\[a-zA-Z]+/g, " ")
    .replace(/[{}]/g, "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/_([^_]+)_/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^\s*>\s?/gm, "")
    .replace(/\|/g, ", ")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/\s+/g, " ")
    .trim();
}

export interface UseVoiceOutputOptions {
  /** BCP-47 language tag (e.g. "en-IN" or "ne-NP"). */
  lang?: string;
  /** Speech rate (1.0 = natural pace). */
  rate?: number;
}

export interface VoiceOutput {
  supported: boolean;
  /** Index or ID of the message currently being spoken, or null when silent. */
  speakingId: string | number | null;
  speak: (text: string, id?: string | number) => void;
  stop: () => void;
  toggle: (text: string, id?: string | number) => void;
}

export function useVoiceOutput(options: UseVoiceOutputOptions = {}): VoiceOutput {
  const { lang = "en-IN", rate = 1.0 } = options;
  const [supported, setSupported] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | number | null>(null);
  const activeIdRef = useRef<string | number | null>(null);

  useEffect(() => {
    setSupported(speechOutputSupported());
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        try {
          window.speechSynthesis.cancel();
        } catch {
          /* ignore */
        }
      }
    };
  }, []);

  const stop = useCallback(() => {
    activeIdRef.current = null;
    setSpeakingId(null);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        /* ignore */
      }
    }
  }, []);

  const speak = useCallback(
    (rawText: string, id: string | number = "active") => {
      if (!speechOutputSupported()) return;
      const clean = speechTextFromMarkdown(rawText);
      if (!clean) return;

      try {
        window.speechSynthesis.cancel();
        const utterance = new window.SpeechSynthesisUtterance(clean);
        utterance.lang = lang;
        utterance.rate = rate;

        const voices = window.speechSynthesis.getVoices?.() ?? [];
        const prefix = lang.split("-")[0]?.toLowerCase() ?? "en";
        const preferred =
          voices.find((v) => v.lang.toLowerCase() === lang.toLowerCase()) ??
          voices.find((v) => v.lang.toLowerCase().startsWith(prefix));
        if (preferred) utterance.voice = preferred;

        activeIdRef.current = id;
        setSpeakingId(id);

        const clearIfActive = () => {
          if (activeIdRef.current === id) {
            activeIdRef.current = null;
            setSpeakingId(null);
          }
        };
        utterance.onend = clearIfActive;
        utterance.onerror = clearIfActive;

        window.speechSynthesis.speak(utterance);
      } catch {
        activeIdRef.current = null;
        setSpeakingId(null);
      }
    },
    [lang, rate],
  );

  const toggle = useCallback(
    (rawText: string, id: string | number = "active") => {
      if (activeIdRef.current === id && speakingId === id) {
        stop();
      } else {
        speak(rawText, id);
      }
    },
    [speak, speakingId, stop],
  );

  return useMemo(
    () => ({ supported, speakingId, speak, stop, toggle }),
    [supported, speakingId, speak, stop, toggle],
  );
}
