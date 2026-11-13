"use client";

/**
 * AcademicDocLayout — standardized platform-wide document reader system.
 *
 * Provides the shared paper layout, interactive reader controls (Print/PDF,
 * font sizing, link copying), highlighted academic cards, and section styling
 * for all knowledge-based, theory, and syllabus content across the platform.
 */

import React, { useState } from "react";
import {
  Check,
  Copy,
  FileText,
  Printer,
  ZoomIn,
  ZoomOut,
  Sparkles,
  Lightbulb,
  ShieldAlert,
  Calculator,
  Sigma,
  BookOpen,
} from "lucide-react";

export type DocFontSize = "sm" | "base" | "lg";

export function getDocFontClass(size: DocFontSize): string {
  switch (size) {
    case "sm":
      return "text-xs leading-6";
    case "lg":
      return "text-base leading-8";
    case "base":
    default:
      return "text-sm leading-7";
  }
}

/** Standard paper-sheet container for all academic documents. */
export function DocPaper({
  children,
  className = "",
  ariaLabel = "Academic document",
}: {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <article
      className={`doc-view doc-viewer-paper mx-auto max-w-4xl space-y-8 rounded-2xl border border-border/80 bg-card p-6 shadow-xs sm:p-10 print:border-none print:bg-white print:p-0 print:shadow-none ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </article>
  );
}

export interface DocMetadataBadge {
  label: string;
  tone?: "primary" | "muted" | "sky" | "amber" | "emerald";
}

/** Document reader toolbar with Print, PDF, font sizing, and metadata badges. */
export function DocToolbar({
  badge = "Docs Viewer · Verified Academic Document",
  title,
  subtitle,
  metadata = [],
  fontSize = "base",
  onFontSizeChange,
  showActions = true,
}: {
  badge?: string;
  title: string;
  subtitle?: string;
  metadata?: DocMetadataBadge[];
  fontSize?: DocFontSize;
  onFontSizeChange?: (size: DocFontSize) => void;
  showActions?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <header className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-5 sm:p-6 print:border-black print:bg-white">
      {/* Top Action Bar */}
      {showActions && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3 print:hidden">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/20 text-primary">
              <FileText className="h-3.5 w-3.5" />
            </span>
            <span className="text-[11px] font-bold tracking-wider uppercase text-primary">
              {badge}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Font Sizer */}
            {onFontSizeChange && (
              <div className="flex items-center rounded-lg border border-border/70 bg-background/80 p-0.5 text-xs">
                <button
                  type="button"
                  onClick={() => onFontSizeChange("sm")}
                  title="Small text"
                  className={`rounded px-2 py-1 font-semibold transition-colors ${
                    fontSize === "sm"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <ZoomOut className="h-3 w-3" />
                </button>
                <button
                  type="button"
                  onClick={() => onFontSizeChange("base")}
                  title="Standard text"
                  className={`rounded px-2 py-1 font-semibold transition-colors ${
                    fontSize === "base"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  A
                </button>
                <button
                  type="button"
                  onClick={() => onFontSizeChange("lg")}
                  title="Large text"
                  className={`rounded px-2 py-1 font-semibold transition-colors ${
                    fontSize === "lg"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <ZoomIn className="h-3 w-3" />
                </button>
              </div>
            )}

            {/* Copy Link */}
            <button
              type="button"
              onClick={handleCopy}
              title="Copy document link"
              className="inline-flex h-8 items-center gap-1 rounded-lg border border-border/70 bg-background/80 px-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? "Copied" : "Link"}</span>
            </button>

            {/* Print / Save PDF */}
            <button
              type="button"
              onClick={handlePrint}
              title="Print document or Save as PDF"
              className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-primary px-3 text-xs font-bold text-primary-foreground hover:bg-primary/90"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print / PDF</span>
            </button>
          </div>
        </div>
      )}

      {/* Metadata Badges */}
      {metadata.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] font-semibold">
          {metadata.map((m, i) => {
            const toneCls =
              m.tone === "emerald"
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : m.tone === "amber"
                  ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                  : m.tone === "sky"
                    ? "bg-sky-500/10 text-sky-600 dark:text-sky-400"
                    : m.tone === "muted"
                      ? "bg-muted text-muted-foreground"
                      : "bg-primary/10 text-primary";
            return (
              <span
                key={i}
                className={`rounded-full px-2.5 py-0.5 print:border print:border-black print:text-black ${toneCls}`}
              >
                {m.label}
              </span>
            );
          })}
        </div>
      )}

      {/* Document Title & Subtitle */}
      <h1 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl text-foreground print:text-black">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground print:text-gray-700 leading-relaxed">
          {subtitle}
        </p>
      )}
    </header>
  );
}

/** Standard section heading with anchor link. */
export function DocSectionHeading({
  id,
  icon,
  children,
  tone,
}: {
  id: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  tone?: string;
}) {
  return (
    <h3
      className={`flex items-center gap-2 border-b border-border/60 pb-2 text-lg font-bold print:border-black ${
        tone ?? ""
      }`}
    >
      <a href={`#${id}`} className="flex items-center gap-2 text-inherit no-underline">
        {icon} {children}
      </a>
    </h3>
  );
}

export type DocHighlightType =
  | "summary"
  | "definition"
  | "formula"
  | "trap"
  | "trick"
  | "example"
  | "practice";

/** Highlighted callout card with standardized tone palettes. */
export function DocHighlightCard({
  type = "definition",
  title,
  children,
  className = "",
}: {
  type?: DocHighlightType;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  let borderCls = "border-l-4 border-primary/80 bg-primary/5";
  let titleCls = "text-primary";
  let Icon = BookOpen;

  switch (type) {
    case "summary":
      borderCls = "border-l-4 border-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/5";
      titleCls = "text-emerald-700 dark:text-emerald-300";
      Icon = Sparkles;
      break;
    case "formula":
      borderCls = "border border-sky-500/30 bg-sky-500/5";
      titleCls = "text-sky-600 dark:text-sky-400";
      Icon = Sigma;
      break;
    case "trap":
      borderCls = "border-l-4 border-rose-500 border border-rose-500/30 bg-rose-500/10 dark:bg-rose-500/5";
      titleCls = "text-rose-600 dark:text-rose-400";
      Icon = ShieldAlert;
      break;
    case "trick":
      borderCls = "border-l-4 border-amber-500 bg-amber-500/10 dark:bg-amber-500/5";
      titleCls = "text-amber-700 dark:text-amber-300";
      Icon = Calculator;
      break;
    case "example":
      borderCls = "border-l-4 border-blue-500 bg-blue-500/10 dark:bg-blue-500/5";
      titleCls = "text-blue-700 dark:text-blue-300";
      Icon = Lightbulb;
      break;
    case "practice":
      borderCls = "border border-border/70 bg-card";
      titleCls = "text-emerald-600 dark:text-emerald-400";
      Icon = FileText;
      break;
    case "definition":
    default:
      borderCls = "border-l-4 border-primary/80 bg-primary/5";
      titleCls = "text-primary";
      Icon = BookOpen;
      break;
  }

  return (
    <div
      className={`rounded-xl p-4 sm:p-5 shadow-2xs print:border-black print:bg-white print:break-inside-avoid ${borderCls} ${className}`}
    >
      {title && (
        <div className={`mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${titleCls} print:text-black`}>
          <Icon className="h-4 w-4 shrink-0" />
          <span>{title}</span>
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}

