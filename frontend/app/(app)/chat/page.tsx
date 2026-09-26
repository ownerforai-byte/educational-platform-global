import type { Metadata } from "next";
import { AIChatInterface } from "@/components/ai/ai-chat-interface";

export const metadata: Metadata = {
  title: "AI Tutor & Study Assistant — NEB Science",
  description:
    "Ravikisan's AI Tutor — ask any NEB Class 11 & 12 doubt and get a curriculum-aligned answer with formulas, derivations and study tips.",
};

/**
 * The AI Tutor's own dedicated interface.
 *
 * Home, the intro journey and the academic directory all deep-link here, so
 * this route renders ONLY the tutor — full-height chat surface, no AI Studio
 * tab bar (Quiz Studio / Smart Search live at /ai), no marketing chrome.
 * Public and free: external sources appear only when the platform vault has
 * no page for the question.
 */
export default function ChatPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-2 sm:px-4 py-4 sm:py-6">
      <AIChatInterface />
    </div>
  );
}
