import type { Metadata } from "next";
import Link from "next/link";
import { Bell, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Announcements",
  description: "Platform announcements and updates.",
};

const ANNOUNCEMENTS = [
  {
    date: "Nov 2026",
    tag: "Feature",
    title: "AI answer citations now live",
    body: "Veer AI chat answers for academic questions now cite the source note or past-year question they were grounded in.",
  },
  {
    date: "Nov 2026",
    tag: "Content",
    title: "Class 12 Physics Unit 5 notes expanded",
    body: "AC circuits topic now includes the full derivation set and three new PYQs with worked solutions.",
  },
  {
    date: "Oct 2026",
    tag: "Feature",
    title: "Spaced repetition sync",
    body: "SRS deck progress now syncs across devices for signed-in Plus and Pro members.",
  },
  {
    date: "Oct 2026",
    tag: "Content",
    title: "Chemistry model question bank updated",
    body: "Concept drills for Class 11 Chemistry Units 1–3 now available in the quiz bank.",
  },
];

const TAG_STYLES: Record<string, string> = {
  Feature: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Content: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
};

export default function AnnouncementsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 py-10 px-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Bell className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Announcements</h1>
          <p className="mt-1 text-muted-foreground">
            Platform updates, content additions and exam-date notices.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {ANNOUNCEMENTS.map((a, i) => (
          <article
            key={i}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm"
          >
            <div className="flex items-center gap-3 text-sm">
              <span className="font-medium text-muted-foreground">{a.date}</span>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${TAG_STYLES[a.tag] ?? "bg-muted text-muted-foreground"}`}>
                {a.tag}
              </span>
            </div>
            <h2 className="mt-2 text-lg font-semibold text-foreground">{a.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{a.body}</p>
          </article>
        ))}
      </div>

      <Link
        href="/notice"
        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
      >
        View standing notices
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
