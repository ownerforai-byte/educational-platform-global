"use client";

/**
 * useVoiceInput — dictation for the AI composer (Web Speech API).
 *
 * Owner request (2026-10-21): "make it voice supported, means it takes
 * instructions in voice also". The student taps the mic and asks Veer out
 * loud; the words land in the composer live, exactly as typing would.
 *
 * Why the browser API and not a server transcriber:
 *   · it is free, offline-capable and already present in Chrome, Edge, Safari
 *     and modern Firefox — no key, no bill, no audio ever leaving the device
 *     for a third party we don't control;
 *   · it streams interim results, so the draft fills in word by word instead
 *     of appearing all at once after a wait.
 *
 * Two browser behaviours this hook has to absorb:
 *   1. Chrome ends a recognition pass after a pause even with
 *      `continuous = true`. A pass that produced nothing is simply re-armed
 *      (the student is still thinking); a pass that produced speech either
 *      re-arms or hands the transcript to `onComplete`, which is how the
 *      hands-free voice mode auto-sends a finished question.
 *   2. `start()` throws if a pass is already running, so the hook tracks its
 *      own state and refuses a double start rather than crashing the composer.
 *
 * Unsupported browsers report `supported: false` and the mic button renders
 * nothing — a dead control is worse than no control.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// ── Browser API shape (SpeechRecognition is not in lib.dom yet) ─────────────

interface SpeechAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechResult {
  readonly length: number;
  isFinal: boolean;
  [index: number]: SpeechAlternative;
}

interface SpeechResultList {
  readonly length: number;
  [index: number]: SpeechResult;
}

interface SpeechResultEvent extends Event {
  resultIndex: number;
  results: SpeechResultList;
}

interface SpeechErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognitionLike extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: (() => void) | null;
  onresult: ((event: SpeechResultEvent) => void) | null;
  onerror: ((event: SpeechErrorEvent) => void) | null;
  onend: (() => void) | null;
}

type SpeechRecognitionCtor = new () => SpeechRecognitionLike;

function recognitionCtor(): SpeechRecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionCtor;
    webkitSpeechRecognition?: SpeechRecognitionCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

/** True when this browser can take a spoken instruction at all. */
export function speechInputSupported(): boolean {
  return recognitionCtor() !== null;
}

/**
 * A BCP-47 tag for a spoken language. Recognition quality depends on the tag
 * matching what the student actually says, so the console maps its own mode
 * onto one rather than letting the browser guess from the page locale.
 */
export const VOICE_LANGS = {
  english: "en-IN",
  nepali: "ne-NP",
  hindi: "hi-IN",
} as const;

/** Human reason for a recognition failure — never the raw error code. */
function explainError(code: string): string {
  switch (code) {
    case "not-allowed":
    case "service-not-allowed":
      return "Microphone access is blocked — allow it in your browser's site settings, then tap the mic again.";
    case "audio-capture":
      return "No microphone was found. Plug one in (or allow the built-in one) and tap the mic again.";
    case "no-speech":
      return "I didn't catch any speech. Tap the mic and try once more.";
    case "network":
      return "Speech recognition needs a connection and it dropped. Your typed question still works.";
    case "aborted":
      return "";
    default:
      return "Voice input stopped unexpectedly — please try again, or type the question.";
  }
}

export interface UseVoiceInputOptions {
  /** BCP-47 tag, e.g. "en-IN" or "ne-NP". */
  lang?: string;
  /**
   * Called when a listening pass ends having captured speech. Supply it to run
   * hands-free (the console auto-sends the finished question); omit it and the
   * hook simply re-arms so the student can keep talking.
   */
  onComplete?: (transcript: string) => void;
  /** Surface a failure to the student in their own language of UI. */
  onError?: (message: string) => void;
}

export interface VoiceInput {
  /** False on SSR, on hydration, and on browsers without the API. */
  supported: boolean;
  /** True while the microphone pass is live. */
  listening: boolean;
  /** Words committed by finished recognition results. */
  transcript: string;
  /** The partial phrase still being spoken (not yet committed). */
  interim: string;
  start: () => void;
  stop: () => void;
  toggle: () => void;
  /** Forget the captured text — the composer calls this once it has folded it in. */
  clear: () => void;
}

export function useVoiceInput(options: UseVoiceInputOptions = {}): VoiceInput {
  const { lang = VOICE_LANGS.english, onComplete, onError } = options;

  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interim, setInterim] = useState("");

  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  /**
   * The student's intent, as distinct from the browser's pass state. Chrome
   * ends passes on its own; this flag says whether we meant to be listening,
   * which is what decides whether an `onend` re-arms or stands down.
   */
  const wantListeningRef = useRef(false);
  const transcriptRef = useRef("");
  const restartingRef = useRef(false);
  /** Callbacks live in refs so a new options object never re-arms the mic. */
  const completeRef = useRef(onComplete);
  const errorRef = useRef(onError);
  completeRef.current = onComplete;
  errorRef.current = onError;

  // Detection is post-mount only: the server has no `window`, so the first
  // client paint must match it (false) or /chat hydrates with a mismatch.
  useEffect(() => {
    setSupported(speechInputSupported());
  }, []);

  const teardown = useCallback(() => {
    const rec = recognitionRef.current;
    recognitionRef.current = null;
    if (!rec) return;
    rec.onresult = null;
    rec.onerror = null;
    rec.onend = null;
    rec.onstart = null;
    try {
      rec.abort();
    } catch {
      // already closed — nothing to abort
    }
  }, []);

  const stop = useCallback(() => {
    wantListeningRef.current = false;
    setListening(false);
    setInterim("");
    const rec = recognitionRef.current;
    if (rec) {
      try {
        rec.stop();
      } catch {
        // a pass that already ended cannot be stopped twice
      }
    }
  }, []);

  const clear = useCallback(() => {
    transcriptRef.current = "";
    setTranscript("");
    setInterim("");
  }, []);

  useEffect(() => {
    if (!supported) return;

    const Ctor = recognitionCtor();
    if (!Ctor) return;

    const rec = new Ctor();
    recognitionRef.current = rec;
    rec.lang = lang;
    rec.continuous = true;
    rec.interimResults = true;
    rec.maxAlternatives = 1;

    rec.onstart = () => setListening(true);

    rec.onresult = (event: SpeechResultEvent) => {
      let partial = "";
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const result = event.results[i];
        const text = result?.[0]?.transcript ?? "";
        if (!text) continue;
        if (result.isFinal) {
          transcriptRef.current = `${transcriptRef.current} ${text}`.trim();
        } else {
          partial += text;
        }
      }
      setTranscript(transcriptRef.current);
      setInterim(partial.trim());
    };

    rec.onerror = (event: SpeechErrorEvent) => {
      const message = explainError(event.error);
      // "no-speech" and "aborted" are ordinary ends of a quiet pass, not
      // failures worth alarming the student about.
      if (message && event.error !== "no-speech") errorRef.current?.(message);
      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        wantListeningRef.current = false;
      }
    };

    rec.onend = () => {
      setInterim("");
      const spoken = transcriptRef.current.trim();

      // Stood down on purpose: stay down.
      if (!wantListeningRef.current) {
        setListening(false);
        return;
      }

      // A finished question in hands-free mode: hand it over instead of
      // re-arming, or the console would send it and immediately reopen the mic
      // over Veer's own answer.
      if (spoken && completeRef.current) {
        wantListeningRef.current = false;
        setListening(false);
        const handover = spoken;
        transcriptRef.current = "";
        setTranscript("");
        completeRef.current(handover);
        return;
      }

      // Otherwise re-arm: Chrome closed the pass after a pause, and the
      // student may well still be talking.
      if (restartingRef.current) return;
      restartingRef.current = true;
      setTimeout(() => {
        restartingRef.current = false;
        if (!wantListeningRef.current) {
          setListening(false);
          return;
        }
        try {
          rec.lang = lang;
          rec.start();
        } catch {
          // A pass that never really closed throws here; its own onend will
          // fire again and this branch retries.
        }
      }, 220);
    };

    return () => {
      wantListeningRef.current = false;
      restartingRef.current = false;
      teardown();
    };
    // The recognition instance is bound to one language: switching the
    // console mode (e.g. to नेपाली) must rebuild it with the new tag.
  }, [supported, lang, teardown]);

  const start = useCallback(() => {
    if (!supported || wantListeningRef.current) return;
    const rec = recognitionRef.current;
    if (!rec) return;
    wantListeningRef.current = true;
    try {
      rec.lang = lang;
      rec.start();
    } catch {
      // Already running: the browser is ahead of our flag, so just adopt it.
      setListening(true);
    }
  }, [supported, lang]);

  const toggle = useCallback(() => {
    if (listening) stop();
    else start();
  }, [listening, start, stop]);

  return useMemo(
    () => ({ supported, listening, transcript, interim, start, stop, toggle, clear }),
    [supported, listening, transcript, interim, start, stop, toggle, clear],
  );
}
