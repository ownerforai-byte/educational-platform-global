"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Compass, CompassIcon, GraduationCap } from "lucide-react";
import {
  DocPaper,
  DocToolbar,
  DocSectionHeading,
  DocHighlightCard,
  getDocFontClass,
  type DocFontSize,
} from "@/features/docs/academic-doc-layout";

export type ExamTrackStep = {
  title: string;
  body: string;
};

export type ExamTrackResource = {
  label: string;
  description: string;
  href: string;
  meta: string;
};

/**
 * Shared non-lab exam track surface. The entrance/board routes (IOE, CEE, NEB)
 * use this document layout so preparation maps, navigation, and printable
 * study tracks stay consistent across the platform.
 */
export function ExamTrackPage({
  eyebrow,
  title,
  intro,
  steps,
  resources,
  note,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  steps: ExamTrackStep[];
  resources: ExamTrackResource[];
  note: string;
}) {
  const [fontSize, setFontSize] = useState<DocFontSize>("base");
  const fontClass = getDocFontClass(fontSize);

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-8">
      {/* Top back navigation */}
      <div className="print:hidden">
        <Link
          href="/exams"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Exam Hub
        </Link>
      </div>

      <DocPaper ariaLabel={`${title} Preparation Guide`}>
        <DocToolbar
          badge={`Docs Viewer · ${eyebrow}`}
          title={title}
          subtitle={intro}
          metadata={[
            { label: eyebrow, tone: "primary" },
            { label: `${steps.length} Preparation Steps`, tone: "sky" },
            { label: `${resources.length} Live Resources`, tone: "emerald" },
          ]}
          fontSize={fontSize}
          onFontSizeChange={setFontSize}
        />

        {/* Preparation Map Section */}
        <section
          className="space-y-4"
          aria-labelledby="preparation-map"
        >
          <DocSectionHeading
            id="preparation-map"
            icon={<GraduationCap className="h-5 w-5 text-primary" />}
            tone="text-primary"
          >
            Preparation Map
          </DocSectionHeading>
          <p className="text-xs text-muted-foreground">
            Recommended step-by-step track to maximize retention and exam performance.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-2xl border border-border/70 bg-card p-5 shadow-2xs print:break-inside-avoid"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  0{index + 1}
                </span>
                <h3 className="mt-3 font-semibold text-foreground">{step.title}</h3>
                <p className={`mt-1 text-muted-foreground leading-relaxed ${fontClass}`}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Start with these routes */}
        <section
          className="space-y-4 pt-4 border-t border-border/60"
          aria-labelledby="start-routes"
        >
          <DocSectionHeading
            id="start-routes"
            icon={<Compass className="h-5 w-5 text-sky-500" />}
            tone="text-sky-600 dark:text-sky-400"
          >
            Start With These Routes
          </DocSectionHeading>
          <p className="text-xs text-muted-foreground">
            Curated entrance-prep materials, standalone apps, and chapter routes.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {resources.map((resource) => (
              <Link
                key={`${resource.href}-${resource.label}`}
                href={resource.href}
                className="group flex items-start justify-between gap-4 rounded-2xl border border-border/70 bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md print:border-black"
              >
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                    {resource.meta}
                  </span>
                  <h3 className="mt-1 font-semibold text-foreground group-hover:text-primary transition-colors">
                    {resource.label}
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {resource.description}
                  </p>
                </div>
                <ArrowUpRight
                  className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary print:hidden"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </section>

        {/* Important notice / caveat */}
        {note && (
          <DocHighlightCard
            type="trap"
            title="Important Academic Notice"
            className="mt-6"
          >
            <p className="text-xs leading-relaxed text-muted-foreground">
              {note}
            </p>
          </DocHighlightCard>
        )}
      </DocPaper>
    </div>
  );
}
