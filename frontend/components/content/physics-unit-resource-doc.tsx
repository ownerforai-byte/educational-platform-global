"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
  FileText,
  Download,
  Search,
  BookOpen,
  Sparkles,
  Table as TableIcon,
  HelpCircle,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  Atom,
  Clock,
  Layers,
  GraduationCap
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  getPhysicsUnitResource,
  getPhysicsUnitResourceByNumber,
  type PhysicsUnitResourceMeta,
  type PhysicsUnitResourceFullData
} from "@/lib/physics-xi-resources";

interface PhysicsUnitResourceDocProps {
  unitId?: string;
  unitNo?: number;
  className?: string;
}

export function PhysicsUnitResourceDoc({
  unitId,
  unitNo,
  className = ""
}: PhysicsUnitResourceDocProps) {
  const meta: PhysicsUnitResourceMeta | undefined = useMemo(() => {
    if (typeof unitNo === "number") {
      return getPhysicsUnitResourceByNumber(unitNo);
    }
    if (unitId) {
      return getPhysicsUnitResource(unitId);
    }
    return undefined;
  }, [unitId, unitNo]);

  const [fullData, setFullData] = useState<PhysicsUnitResourceFullData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<"questions" | "tables" | "theory" | "formulas" | "raw">("questions");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!meta) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError(null);

    fetch(meta.jsonFile)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then((data: PhysicsUnitResourceFullData) => {
        if (isMounted) {
          setFullData(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Failed to load document content");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [meta]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (!meta) {
    return null;
  }

  const filteredQuestions = useMemo(() => {
    if (!fullData?.questions) return [];
    if (!searchQuery.trim()) return fullData.questions;
    const q = searchQuery.toLowerCase();
    return fullData.questions.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.shortcut?.toLowerCase().includes(q) ||
        item.example?.toLowerCase().includes(q)
    );
  }, [fullData, searchQuery]);

  const filteredTheory = useMemo(() => {
    if (!fullData?.theoryItems) return [];
    if (!searchQuery.trim()) return fullData.theoryItems;
    const q = searchQuery.toLowerCase();
    return fullData.theoryItems.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.shortcut?.toLowerCase().includes(q) ||
        item.example?.toLowerCase().includes(q)
    );
  }, [fullData, searchQuery]);

  return (
    <div
      className={`space-y-6 transition-all duration-300 ${
        isExpanded ? "fixed inset-4 z-50 overflow-y-auto bg-background/95 backdrop-blur-md p-6 rounded-3xl border border-primary/30 shadow-2xl" : ""
      } ${className}`}
    >
      {/* ── Official Unit Title Block ── */}
      <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-blue-900/10 via-indigo-900/10 to-violet-900/10 p-6 md:p-8 shadow-sm">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-44 w-44 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3">
            {/* Top Bar / Course Tag */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/15 text-primary border border-primary/20">
                <Atom className="h-3.5 w-3.5" />
                {meta.titleBlock.course || "Physics XI | NEB (Grade 11) | Phy. 101"}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Layers className="h-3 w-3" />
                Unit {meta.unitNo}: {meta.contentArea}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Official NEB Resource Doc
              </span>
            </div>

            {/* Authoritative Title Heading */}
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
              {meta.titleBlock.heading || `UNIT ${meta.unitNo}: ${meta.unitName.toUpperCase()} — Content Area: ${meta.contentArea}`}
            </h2>

            {/* Subtitle / Doc Scope */}
            <p className="text-sm md:text-base text-muted-foreground font-medium flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-400 shrink-0" />
              <span>{meta.titleBlock.subtitle || "All-possible NEB questions • short precise answers • exam shortcuts • worked examples"}</span>
            </p>

            {/* Stats Pills */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-card border border-border/60">
                <HelpCircle className="h-3.5 w-3.5 text-blue-400" />
                <span className="font-semibold text-foreground">{meta.stats.questionCount}</span> Questions
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-card border border-border/60">
                <TableIcon className="h-3.5 w-3.5 text-emerald-400" />
                <span className="font-semibold text-foreground">{meta.stats.tableCount}</span> Compare Tables
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-card border border-border/60">
                <GraduationCap className="h-3.5 w-3.5 text-violet-400" />
                <span className="font-semibold text-foreground">{meta.stats.theoryCount}</span> Theory &amp; Viva Banks
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-card border border-border/60">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                <span className="font-semibold text-foreground">{meta.stats.formulaCount}</span> Formula Sets
              </div>
            </div>
          </div>

          {/* Action Buttons: Download & Fullscreen */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md gap-2"
            >
              <a href={meta.docxUrl} download={meta.docxFileName}>
                <Download className="h-4 w-4" />
                <span>Download .docx</span>
              </a>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="gap-2 text-xs"
            >
              {isExpanded ? (
                <>
                  <Minimize2 className="h-3.5 w-3.5" /> Close Full Screen
                </>
              ) : (
                <>
                  <Maximize2 className="h-3.5 w-3.5" /> Full Document View
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* ── Document Previewer / Interactive Reader ── */}
      <Card className="border-border/70 shadow-sm overflow-hidden rounded-3xl">
        <CardHeader className="border-b border-border/60 bg-muted/20 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* View Tabs */}
            <div className="flex flex-wrap gap-1 p-1 rounded-2xl bg-muted/60 border border-border/50">
              <button
                type="button"
                onClick={() => setActiveTab("questions")}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === "questions"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Questions &amp; Shortcuts ({meta.stats.questionCount})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("tables")}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === "tables"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Compare Tables ({meta.stats.tableCount})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("theory")}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === "theory"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Professor Theory &amp; Viva ({meta.stats.theoryCount})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("formulas")}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === "formulas"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Formula Memos
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("raw")}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === "raw"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Full Doc Prose
              </button>
            </div>

            {/* Quick Filter Search */}
            {(activeTab === "questions" || activeTab === "theory") && (
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  placeholder="Filter questions or answers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 text-xs h-9 rounded-xl"
                />
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {loading && (
            <div className="py-12 text-center text-sm text-muted-foreground space-y-2">
              <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <p>Opening document preview for {meta.unitName}...</p>
            </div>
          )}

          {error && (
            <div className="rounded-2xl border border-destructive/20 bg-destructive/10 p-6 text-center text-sm text-destructive">
              <p className="font-semibold">Unable to load document preview</p>
              <p className="text-xs text-muted-foreground mt-1">{error}</p>
              <div className="mt-4">
                <Button asChild size="sm" variant="outline">
                  <a href={meta.docxUrl} download={meta.docxFileName}>
                    <Download className="h-3.5 w-3.5 mr-1.5" />
                    Download {meta.docxFileName} directly
                  </a>
                </Button>
              </div>
            </div>
          )}

          {!loading && !error && fullData && (
            <div className="space-y-6">
              {/* TAB 1: QUESTIONS & SHORTCUTS */}
              {activeTab === "questions" && (
                <div className="space-y-4">
                  {filteredQuestions.length === 0 ? (
                    <div className="py-8 text-center text-sm text-muted-foreground">
                      No questions match your filter &ldquo;{searchQuery}&rdquo;.
                    </div>
                  ) : (
                    filteredQuestions.map((q, idx) => {
                      const qId = `q-${idx}`;
                      return (
                        <div
                          key={idx}
                          className="group relative rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition-all hover:border-primary/40 space-y-3"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <h4 className="font-bold text-sm md:text-base text-foreground leading-snug">
                              {q.question}
                            </h4>
                            <button
                              type="button"
                              onClick={() => handleCopy(`${q.question}\n\n${q.answer}`, qId)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground shrink-0"
                              title="Copy Q&A"
                            >
                              {copiedIndex === qId ? (
                                <Check className="h-3.5 w-3.5 text-emerald-500" />
                              ) : (
                                <Copy className="h-3.5 w-3.5" />
                              )}
                            </button>
                          </div>

                          {/* Answer */}
                          <div className="text-xs md:text-sm text-muted-foreground leading-relaxed pl-3 border-l-2 border-primary/40">
                            <span className="font-semibold text-foreground">Answer: </span>
                            {q.answer}
                          </div>

                          {/* Shortcut callout */}
                          {q.shortcut && (
                            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-semibold">
                              <Sparkles className="h-3.5 w-3.5 shrink-0" />
                              <span>Shortcut: {q.shortcut}</span>
                            </div>
                          )}

                          {/* Example */}
                          {q.example && (
                            <div className="text-xs text-muted-foreground bg-muted/40 p-2.5 rounded-xl">
                              <span className="font-semibold text-foreground">Example: </span>
                              {q.example}
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              )}

              {/* TAB 2: COMPARE / CONTRAST TABLES */}
              {activeTab === "tables" && (
                <div className="space-y-6">
                  {fullData.tables.length === 0 ? (
                    <div className="py-8 text-center text-sm text-muted-foreground">
                      No compare/contrast tables in this unit.
                    </div>
                  ) : (
                    fullData.tables.map((table, tIdx) => (
                      <div key={tIdx} className="rounded-2xl border border-border/70 overflow-hidden shadow-sm">
                        <div className="bg-muted/40 px-4 py-2.5 border-b border-border/60 flex items-center justify-between text-xs font-bold text-foreground">
                          <span className="flex items-center gap-1.5">
                            <TableIcon className="h-4 w-4 text-primary" />
                            Compare / Contrast Table #{tIdx + 1}
                          </span>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs md:text-sm">
                            <thead className="bg-muted/60 border-b border-border/60 text-muted-foreground uppercase tracking-wider text-[11px]">
                              <tr>
                                {table.headers.map((h, hIdx) => (
                                  <th key={hIdx} className="px-4 py-3 font-bold text-foreground">
                                    {h}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-border/40">
                              {table.rows.map((row, rIdx) => (
                                <tr key={rIdx} className="hover:bg-muted/30 transition-colors">
                                  {row.map((cell, cIdx) => (
                                    <td key={cIdx} className="px-4 py-3 text-muted-foreground font-medium">
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* TAB 3: PROFESSOR'S THEORY & VIVA BANK */}
              {activeTab === "theory" && (
                <div className="space-y-4">
                  {filteredTheory.length === 0 ? (
                    <div className="py-8 text-center text-sm text-muted-foreground">
                      No theory or viva questions match your search.
                    </div>
                  ) : (
                    filteredTheory.map((item, idx) => {
                      const tId = `t-${idx}`;
                      return (
                        <div
                          key={idx}
                          className="group rounded-2xl border border-border/60 bg-card p-5 shadow-sm space-y-3"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              {item.category && (
                                <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-1.5">
                                  {item.category}
                                </span>
                              )}
                              <h4 className="font-bold text-sm md:text-base text-foreground leading-snug">
                                {item.question}
                              </h4>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleCopy(`${item.question}\n\n${item.answer}`, tId)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground shrink-0"
                              title="Copy Q&A"
                            >
                              {copiedIndex === tId ? (
                                <Check className="h-3.5 w-3.5 text-emerald-500" />
                              ) : (
                                <Copy className="h-3.5 w-3.5" />
                              )}
                            </button>
                          </div>

                          <div className="text-xs md:text-sm text-muted-foreground leading-relaxed pl-3 border-l-2 border-violet-500/40">
                            <span className="font-semibold text-foreground">Answer: </span>
                            {item.answer}
                          </div>

                          {item.shortcut && (
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold">
                              <Sparkles className="h-3 w-3 shrink-0" />
                              <span>Key Insight: {item.shortcut}</span>
                            </div>
                          )}

                          {item.example && (
                            <div className="text-xs text-muted-foreground bg-muted/40 p-2.5 rounded-xl">
                              <span className="font-semibold text-foreground">Example: </span>
                              {item.example}
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              )}

              {/* TAB 4: QUICK-FORMULA MEMOS */}
              {activeTab === "formulas" && (
                <div className="space-y-4">
                  <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 text-xs text-amber-500 font-semibold flex items-center gap-2">
                    <Sparkles className="h-4 w-4 shrink-0" />
                    <span>Quick-formula summary and memorization memos for Unit {meta.unitNo}: {meta.unitName}</span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {fullData.formulas.map((form, fIdx) => (
                      <div
                        key={fIdx}
                        className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm flex items-start gap-3"
                      >
                        <span className="h-6 w-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                          {fIdx + 1}
                        </span>
                        <div className="text-xs md:text-sm font-medium text-foreground leading-relaxed">
                          {form}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: FULL DOC PROSE */}
              {activeTab === "raw" && (
                <div className="space-y-3 font-mono text-xs md:text-sm bg-muted/20 p-6 rounded-2xl border border-border/60 max-h-[600px] overflow-y-auto leading-relaxed">
                  {fullData.rawParagraphs.map((para, pIdx) => (
                    <p key={pIdx} className="text-foreground/90 whitespace-pre-wrap">
                      {para}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
