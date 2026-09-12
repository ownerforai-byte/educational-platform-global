import { Metadata } from "next";
import { AIChatInterface } from "@/components/ai/ai-chat-interface";

export const metadata: Metadata = {
  title: "AI Tutor & Study Assistant — NEB Science",
  description:
    "Ask curriculum-grounded study questions across Physics, Chemistry, Biology, and Mathematics with step-by-step derivations, LaTeX math, and CEE insights.",
};

export default function ChatPage() {
  return (
    <div className="mx-auto max-w-5xl py-4 sm:py-6 px-2 sm:px-4">
      <AIChatInterface />
    </div>
  );
}
