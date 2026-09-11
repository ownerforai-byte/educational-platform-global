import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Bot } from "lucide-react";
import { StudyChat } from "@/components/chat/study-chat";

export const metadata: Metadata = {
  title: "AI Lab Tutor — NEB Study Vault",
  description: "Get instant AI help with physics, chemistry, biology, and math.",
};

export default function AITutorPage() {
  return (
    <div className="flex h-[calc(100vh-9rem)] flex-col">
      <div className="mb-4 flex items-center gap-3">
        <Link
          href="/lab/physics"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Back to Physics Lab</span>
        </Link>
        <div className="h-5 w-px bg-border" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary/10">
            <Bot className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h1 className="text-sm font-semibold leading-none">AI Lab Tutor</h1>
            <p className="text-[10px] text-muted-foreground mt-0.5">Instant help with physics, chem, bio &amp; math.</p>
          </div>
        </div>
      </div>
      <StudyChat />
    </div>
  );
}
