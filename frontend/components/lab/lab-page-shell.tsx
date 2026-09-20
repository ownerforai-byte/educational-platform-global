"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, PanelLeftClose, PanelLeftOpen, Sparkles } from "lucide-react";

type LabPageShellProps = {
  subject: string;
  unit: string;
  topic: string;
  labId: string;
  title?: string;
  children: React.ReactNode;
  sidebarContent?: React.ReactNode;
  /**
   * When set, the shell announces the hotspot to screen readers via the
   * aria-live region (Task 10 / T10 accessibility requirement).
   * Pass `{ title, summary }` from the active hotspot.
   */
  activeHotspot?: { title: string; summary?: string } | null;
};

const SUBJECT_LABELS: Record<string, string> = {
  physics: "Physics",
  chemistry: "Chemistry",
  biology: "Biology",
  mathematics: "Mathematics",
  english: "English",
  nepali: "Nepali",
  default: "Lab",
};

export function LabPageShell({
  subject,
  unit,
  topic,
  labId,
  title,
  children,
  sidebarContent,
  activeHotspot = null,
}: LabPageShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const subjectLabel = SUBJECT_LABELS[subject] ?? "Lab";

  // ARIA live region for accessibility announcements — wired to activeHotspot
  const [announcement, setAnnouncement] = useState("");
  useEffect(() => {
    if (!activeHotspot) return;
    setAnnouncement(
      `${activeHotspot.title}${activeHotspot.summary ? `: ${activeHotspot.summary}` : ""}`
    );
    const t = setTimeout(() => setAnnouncement(""), 3000);
    return () => clearTimeout(t);
  }, [activeHotspot]);

  return (
    <div className="min-h-screen bg-background" data-subject={subject}>
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </div>

      <header className="sticky top-0 z-40 flex items-center gap-3 border-b border-border/50 bg-background/95 backdrop-blur">
        <Link href="/lab" className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" aria-label="Back to all labs">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: "hsl(var(--subject-" + subject + ") / 0.1)" }}>
          <BookOpen className="h-5 w-5" style={{ color: "hsl(var(--subject-" + subject + "))" }} />
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="chip" data-variant="subject">{subjectLabel}</span>
          <span className="chip">{unit}</span>
          <span className="chip">{topic}</span>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-3">
          <Link href="/lab/3d" className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/80">
            <Sparkles className="h-3.5 w-3.5" />
            All 3D
          </Link>
          <button type="button" onClick={() => setSidebarOpen(!sidebarOpen)} className="hidden items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:flex" aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"} aria-expanded={sidebarOpen}>
            {sidebarOpen ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeftOpen className="h-4 w-4" />}
            {sidebarOpen ? "Hide" : "Show"}
          </button>
        </div>
      </header>

      {/* ISO Title Block */}
      {title && (
        <div className="border-b border-border/50 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
            <div className="card-viz-iso-title relative h-[64px] w-full overflow-hidden rounded-none sm:rounded-lg sm:px-4 sm:py-2">
              <div className="absolute inset-0 flex items-center justify-between gap-4 p-3 sm:p-4">
                <h1 className="type-heading-4 text-foreground truncate">{title}</h1>
                <span className="chip">
                  <span className="iso-drawing-no">LAB-{labId.toUpperCase()}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="mx-auto max-w-7xl flex-1 px-4 py-6 sm:px-6">
        <div className="flex min-h-0 flex-col lg:flex-row lg:gap-6">
          {/* 3D Content Area */}
          <div className="flex-1 min-w-0">
            {children}
          </div>

          {/* Sidebar - w-96 on desktop, collapsible */}
          <aside className={sidebarOpen ? "w-96 lg:flex-shrink-0" : "hidden lg:block lg:w-14 lg:px-0"}>
            {mobileDrawerOpen && (
              <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setMobileDrawerOpen(false)} />
            )}
            <div className={sidebarOpen || mobileDrawerOpen
              ? "relative z-50 mx-auto max-w-sm shrink-0 rounded-xl border bg-background/95 p-4 shadow-lg lg:static lg:translate-x-0 lg:rounded-none lg:border-l lg:bg-transparent lg:p-0 lg:shadow-none"
              : "hidden lg:block lg:w-14 lg:p-0"
            }>
              {mobileDrawerOpen ? (
                <>
                  <div className="mb-4 flex items-center justify-between border-b border-border/50 pb-3 lg:hidden">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Knowledge</h2>
                    <button type="button" onClick={() => setMobileDrawerOpen(false)} className="rounded-full p-1 text-muted-foreground hover:bg-muted">
                      <PanelLeftClose className="h-4 w-4" />
                    </button>
                  </div>
                  {sidebarContent}
                </>
              ) : sidebarOpen ? (
                sidebarContent
              ) : (
                <button
                  type="button"
                  onClick={() => setMobileDrawerOpen(true)}
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-border/50 bg-muted/30 p-6 text-muted-foreground transition-colors hover:bg-muted/50 lg:block"
                >
                  <PanelLeftOpen className="h-8 w-8" />
                  <span className="text-sm font-medium lg:hidden">Open Knowledge Panel</span>
                </button>
              )}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default LabPageShell;

