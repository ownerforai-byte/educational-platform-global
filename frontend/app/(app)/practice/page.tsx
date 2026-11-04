import type { Metadata } from "next";
import Link from "next/link";
import { Layers, Timer, History, Brain, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "Practice Hub",
  description: "Choose how to practice: quiz bank, spaced repetition, mock exams, PYQs, or AI quiz.",
};

const MODES = [
  { href: "/quiz", icon: Target, title: "Practice Quiz Bank", description: "Topic-by-topic PYQ-style questions with worked answers." },
  { href: "/srs", icon: Layers, title: "Spaced Repetition", description: "Flashcards on an SM-2 schedule — review just before you forget." },
  { href: "/mock-exams", icon: Timer, title: "Mock Exams", description: "Timed full papers with an OMR sheet, auto-scoring and answer key." },
  { href: "/pyqs", icon: History, title: "Past Year Questions", description: "The real NEB paper archive — every subject, every year." },
  { href: "/ai-quiz", icon: Brain, title: "Adaptive AI Quiz", description: "AI-generated questions that adapt to your weak areas." },
];

export default function PracticePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 py-10 px-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Practice Hub</h1>
        <p className="mt-2 text-muted-foreground">Choose your practice mode and start strengthening weak spots.</p>
      </div>
      <div className="grid gap-3">
        {MODES.map((m) => (
          <Link key={m.href} href={m.href} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-colors hover:bg-muted/50">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <m.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-foreground">{m.title}</p>
              <p className="mt-0.5 text-sm text-muted-foreground">{m.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
