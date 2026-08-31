import type { Metadata } from "next";
import { StudyChat } from "@/components/chat/study-chat";

export const metadata: Metadata = {
  title: "AI Study Assistant — NEB Study Vault",
  description:
    "Ask anything about your NEB Class 11 & 12 science lessons. The AI assistant explains concepts and points you to the right notes, labs, and past questions.",
};

export default function ChatPage() {
  return (
    <div className="flex h-[calc(100vh-9rem)] flex-col">
      <StudyChat />
    </div>
  );
}
