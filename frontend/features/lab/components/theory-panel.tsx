"use client";

import { useState } from "react";
import {
  BookOpen,
  Lightbulb,
  CheckCircle,
  AlertCircle,
  XCircle,
  Pencil,
  ChevronDown,
  FileText,
  Sigma,
} from "lucide-react";
import { MathMarkdown } from "@/components/content/math-markdown";
import { THEORY_CONTENT, type TopicData } from "@/lib/theory-content";
import {
  DocPaper,
  DocToolbar,
  DocHighlightCard,
  DocSectionHeading,
  type DocFontSize,
  getDocFontClass,
} from "@/features/docs/academic-doc-layout";

interface TheoryPanelProps {
  title?: string;
  vocabulary?: string;
  look?: string | React.ReactNode;
  predict?: string;
  principle?: string | React.ReactNode;
  why?: string;
  subject?: string;
  topic?: string;
}

function NewTheoryPanel({ subject, topic }: { subject?: string; topic?: string }) {
  const [activeTab, setActiveTab] = useState<"enriched" | "original">("enriched");
  const [fontSize, setFontSize] = useState<DocFontSize>("base");
  const [showMistakes, setShowMistakes] = useState(true);
  const [showPractice, setShowPractice] = useState(true);

  if (!subject || !topic) return null;

  const data = THEORY_CONTENT[subject]?.[topic];

  if (!data) {
    return (
      <DocPaper ariaLabel="Theory coming soon">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <BookOpen className="h-12 w-12 text-muted-foreground/50 mb-4" />
          <h2 className="text-lg font-semibold">Theory Document Coming Soon</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Detailed theory for {subject} — {topic} is being prepared in the standard academic format.
          </p>
        </div>
      </DocPaper>
    );
  }

  const contentData: TopicData =
    data.enrichedContent && activeTab === "enriched" ? data.enrichedContent : data;

  const fontClass = getDocFontClass(fontSize);

  return (
    <DocPaper ariaLabel={`${data.title} lab theory document`}>
      {/* ── Document Reader Toolbar ── */}
      <DocToolbar
        badge="Lab Docs Viewer · Verified Theory Document"
        title={data.title}
        subtitle={data.overview}
        metadata={[
          { label: subject, tone: "primary" },
          { label: "Laboratory Theory", tone: "sky" },
          { label: "LaTeX / KaTeX Typeset", tone: "emerald" },
          ...(data.enrichedContent
            ? [{ label: activeTab === "enriched" ? "Enriched Track" : "Original Track", tone: "amber" as const }]
            : []),
        ]}
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
      />

      {/* Enriched / Original Tab Switcher if present */}
      {data.enrichedContent && (
        <div className="flex gap-2 print:hidden">
          <button
            type="button"
            onClick={() => setActiveTab("enriched")}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === "enriched"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            Enriched Theory
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("original")}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === "original"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            Core Theory
          </button>
        </div>
      )}

      {/* ── Theory Sections (Continuous Flow) ── */}
      <div className="space-y-8">
        {contentData.sections.map((section, idx) => (
          <section key={idx} className="space-y-4 print:break-inside-avoid">
            <DocSectionHeading id={`sec-${idx}`} icon={<BookOpen className="h-4 w-4 text-primary" />}>
              {section.heading}
            </DocSectionHeading>

            {/* Main content prose with KaTeX math */}
            <div className={fontClass}>
              <MathMarkdown content={section.content} className={fontClass} />
            </div>

            {/* Formula Block */}
            {section.formula && (
              <DocHighlightCard type="formula" title="Mathematical Principle">
                <div className="overflow-x-auto text-center py-2">
                  <MathMarkdown content={`$$${section.formula}$$`} className="text-base sm:text-lg" />
                </div>
              </DocHighlightCard>
            )}

            {/* Worked Example */}
            {section.example && (
              <DocHighlightCard type="example" title="Worked Application">
                <div className={fontClass}>
                  <MathMarkdown content={section.example} className={fontClass} />
                </div>
              </DocHighlightCard>
            )}
          </section>
        ))}
      </div>

      {/* ── Key Points to Remember ── */}
      {contentData.keyPoints && contentData.keyPoints.length > 0 && (
        <section className="space-y-3 print:break-inside-avoid">
          <DocSectionHeading id="sec-keypoints" icon={<CheckCircle className="h-4 w-4 text-emerald-500" />}>
            Key Principles &amp; Takeaways
          </DocSectionHeading>
          <div className="space-y-2">
            {contentData.keyPoints.map((point, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-xl border border-border/70 bg-emerald-500/5 p-3.5 shadow-2xs print:border-gray-300 print:bg-white"
              >
                <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0 print:text-black" />
                <div className={fontClass}>
                  <MathMarkdown content={point} className={`inline ${fontClass}`} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Common Mistakes to Avoid ── */}
      {contentData.commonMistakes && contentData.commonMistakes.length > 0 && (
        <section className="space-y-3 print:break-inside-avoid">
          <DocSectionHeading id="sec-mistakes" icon={<AlertCircle className="h-4 w-4 text-amber-500" />}>
            Common Misconceptions &amp; Pitfalls
          </DocSectionHeading>
          <div className="space-y-2">
            {contentData.commonMistakes.map((mistake, idx) => (
              <DocHighlightCard key={idx} type="trap" title={`Pitfall ${idx + 1}`}>
                <div className={fontClass}>
                  <MathMarkdown content={mistake} className={`inline ${fontClass}`} />
                </div>
              </DocHighlightCard>
            ))}
          </div>
        </section>
      )}

      {/* ── Practice & Test Exercises ── */}
      {contentData.practiceQuestions && contentData.practiceQuestions.length > 0 && (
        <section className="space-y-3 print:break-inside-avoid">
          <DocSectionHeading id="sec-practice" icon={<Pencil className="h-4 w-4 text-violet-500" />}>
            Practice Questions ({contentData.practiceQuestions.length})
          </DocSectionHeading>
          <ol className="space-y-2.5">
            {contentData.practiceQuestions.map((q, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 rounded-xl border border-border/70 bg-card p-4 shadow-2xs print:border-gray-300 print:bg-white"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-500/10 text-xs font-bold text-violet-600 dark:text-violet-400 print:bg-gray-200 print:text-black">
                  Q{idx + 1}
                </span>
                <div className={`flex-1 ${fontClass}`}>
                  <MathMarkdown content={q} className={fontClass} />
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Document Footer */}
      <footer className="border-t border-border/60 pt-4 text-center text-xs text-muted-foreground print:border-black print:text-black">
        <p>Laboratory &amp; Simulation Theory Document · Formatted with KaTeX &amp; Markdown Engine</p>
      </footer>
    </DocPaper>
  );
}

function OldTheoryPanel({
  title,
  vocabulary,
  look,
  predict,
  principle,
  why,
}: {
  title?: string;
  vocabulary?: string;
  look?: string | React.ReactNode;
  predict?: string;
  principle?: string | React.ReactNode;
  why?: string;
}) {
  if (!title && !vocabulary) return null;

  return (
    <DocPaper ariaLabel="Theory document">
      {title && (
        <DocToolbar
          badge="Lab Docs Viewer · Theory Note"
          title={title}
          metadata={[{ label: "Core Concept", tone: "primary" }]}
          showActions={false}
        />
      )}

      <div className="space-y-4">
        {vocabulary && (
          <DocHighlightCard type="definition" title="Vocabulary & Terminology">
            <p className="text-sm leading-relaxed">{vocabulary}</p>
          </DocHighlightCard>
        )}
        {look && (
          <DocHighlightCard type="example" title="Visual Observation">
            <div className="text-sm leading-relaxed">{look}</div>
          </DocHighlightCard>
        )}
        {predict && (
          <DocHighlightCard type="trick" title="Hypothesis & Prediction">
            <p className="text-sm leading-relaxed">{predict}</p>
          </DocHighlightCard>
        )}
        {principle && (
          <DocHighlightCard type="summary" title="Governing Principle">
            <div className="text-sm leading-relaxed">{principle}</div>
          </DocHighlightCard>
        )}
        {why && (
          <DocHighlightCard type="formula" title="Underlying Mechanism">
            <p className="text-sm leading-relaxed">{why}</p>
          </DocHighlightCard>
        )}
      </div>
    </DocPaper>
  );
}

export function TheoryPanel(props: TheoryPanelProps) {
  if (props.subject && props.topic) {
    return <NewTheoryPanel subject={props.subject} topic={props.topic} />;
  }
  return <OldTheoryPanel {...props} />;
}
