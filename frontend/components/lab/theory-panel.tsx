"use client";

import { useState } from "react";
import { BookOpen, Lightbulb, CheckCircle, AlertCircle, XCircle, ChevronDown, Pencil } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Katex } from "@/components/content/katex";
import { THEORY_CONTENT } from "@/lib/theory-content";

interface TheoryPanelProps {
  // Old interface (used by existing labs)
  title?: string;
  vocabulary?: string;
  look?: string | React.ReactNode;
  predict?: string;
  principle?: string | React.ReactNode;
  why?: string;
  // New interface (for theory lab pages)
  subject?: string;
  topic?: string;
}

function NewTheoryPanel({ subject, topic }: { subject?: string; topic?: string }) {
  const [activeSection, setActiveSection] = useState(0);
  const [showMistakes, setShowMistakes] = useState(false);
  const [showPractice, setShowPractice] = useState(false);

  if (!subject || !topic) return null;

  const data = THEORY_CONTENT[subject]?.[topic];

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <BookOpen className="h-12 w-12 text-muted-foreground/50 mb-4" />
        <h2 className="text-lg font-semibold">Theory Content Coming Soon</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Detailed theory for {subject} — {topic} is being prepared.
        </p>
      </div>
    );
  }

  const currentSection = data.sections[activeSection];

  return (
    <div className="space-y-5">
      {/* Title banner */}
      <div className="bg-gradient-to-r from-primary/10 to-transparent p-4 rounded-lg border-l-4 border-primary">
        <h2 className="text-xl font-bold">{data.title}</h2>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{data.overview}</p>
      </div>

      {/* Section tabs */}
      <div className="flex flex-wrap gap-1.5">
        {data.sections.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveSection(idx)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeSection === idx
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            }`}
          >
            {idx + 1}. {data.sections[idx].heading.replace(/^\d+\.\s*/, "")}
          </button>
        ))}
      </div>

      {/* Current section card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <BookOpen className="h-5 w-5 text-primary" />
            {currentSection.heading}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground leading-relaxed text-sm">{currentSection.content}</p>
          {currentSection.formula && (
            <div className="rounded-xl border border-border bg-muted/40 overflow-hidden">
              <div className="px-4 py-2.5 border-b border-border bg-muted/60">
                <p className="flex items-center gap-2 text-primary font-semibold text-sm">
                  <span>📐 Key Formula</span>
                </p>
              </div>
              <div className="p-4 flex items-center justify-center overflow-x-auto">
                <Katex math={currentSection.formula} displayMode={true} />
              </div>
            </div>
          )}
          {currentSection.example && (
            <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="flex items-center gap-2 mb-2 text-blue-700 dark:text-blue-400 font-semibold text-sm">
                <Lightbulb className="h-4 w-4" />
                <span>Worked Example</span>
              </p>
              <pre className="whitespace-pre-wrap text-sm font-mono text-foreground/90">{currentSection.example}</pre>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Key Points */}
      <Card className="bg-green-50/50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg text-green-700 dark:text-green-400">
            <CheckCircle className="h-5 w-5" />
            Key Points to Remember
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {data.keyPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                <span className="text-sm">{point}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Common Mistakes */}
      <Card className="bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
        <CardHeader
          className="cursor-pointer pb-3"
          onClick={() => setShowMistakes(!showMistakes)}
        >
          <CardTitle className="flex items-center gap-2 text-lg text-amber-700 dark:text-amber-400">
            <AlertCircle className="h-5 w-5" />
            Common Mistakes to Avoid
            <ChevronDown
              className={`h-4 w-4 ml-auto transition-transform ${showMistakes ? "rotate-180" : ""}`}
            />
          </CardTitle>
        </CardHeader>
        {showMistakes && (
          <CardContent>
            <ul className="space-y-2">
              {data.commonMistakes.map((mistake, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                  <span className="text-sm">{mistake}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        )}
      </Card>

      {/* Practice Questions */}
      <Card className="bg-violet-50/50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800">
        <CardHeader
          className="cursor-pointer pb-3"
          onClick={() => setShowPractice(!showPractice)}
        >
          <CardTitle className="flex items-center gap-2 text-lg text-violet-700 dark:text-violet-400">
            <Pencil className="h-5 w-5" />
            Practice Questions ({data.practiceQuestions.length})
            <ChevronDown
              className={`h-4 w-4 ml-auto transition-transform ${showPractice ? "rotate-180" : ""}`}
            />
          </CardTitle>
        </CardHeader>
        {showPractice && (
          <CardContent>
            <ol className="space-y-3">
              {data.practiceQuestions.map((q, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300">
                    {idx + 1}
                  </span>
                  <span className="text-sm">{q}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        )}
      </Card>
    </div>
  );
}

// Old TheoryPanel rendering (for existing labs)
function OldTheoryPanel({ title, vocabulary, look, predict, principle, why }: {
  title?: string;
  vocabulary?: string;
  look?: string | React.ReactNode;
  predict?: string;
  principle?: string | React.ReactNode;
  why?: string;
}) {
  if (!title && !vocabulary) return null;
  
  return (
    <div className="mt-4 space-y-3">
      {title && <h3 className="font-semibold text-sm text-primary">{title}</h3>}
      {vocabulary && (
        <div className="bg-muted p-3 rounded-lg">
          <p className="text-xs font-semibold text-muted-foreground mb-1">Vocabulary</p>
          <p className="text-sm">{vocabulary}</p>
        </div>
      )}
      {look && (
        <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
          <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-1">Look</p>
          <div className="text-sm">{look}</div>
        </div>
      )}
      {predict && (
        <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-lg">
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1">Predict</p>
          <p className="text-sm">{predict}</p>
        </div>
      )}
      {principle && (
        <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
          <p className="text-xs font-semibold text-green-700 dark:text-green-400 mb-1">Principle</p>
          <div className="text-sm">{principle}</div>
        </div>
      )}
      {why && (
        <div className="bg-purple-50 dark:bg-purple-950/20 p-3 rounded-lg">
          <p className="text-xs font-semibold text-purple-700 dark:text-purple-400 mb-1">Why</p>
          <p className="text-sm">{why}</p>
        </div>
      )}
    </div>
  );
}

export function TheoryPanel(props: TheoryPanelProps) {
  if (props.subject && props.topic) {
    return <NewTheoryPanel subject={props.subject} topic={props.topic} />;
  }
  return <OldTheoryPanel {...props} />;
}
