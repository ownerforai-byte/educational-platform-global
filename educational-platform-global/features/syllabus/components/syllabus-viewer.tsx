"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Eye, 
  Terminal, 
  GraduationCap, 
  Target, 
  Lightbulb,
  ChevronRight,
  RotateCw,
  Calculator,
  CheckCircle2,
  Zap,
  Flame,
  Atom,
  FlaskConical,
  Calculator as CalcIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SyllabusViewerProps {
  title: string;
  content: string;
  subject?: "physics" | "chemistry" | "mathematics" | "biology" | "english" | "nepali";
  examBoard?: "NEB" | "CDC" | "CBSE" | "ICSE" | "A-Level";
  classLevel?: string;
  hours?: number;
  topics?: string[];
  formulas?: Record<string, string>;
  diagrams?: string[];
}

function getSubjectColor(subject?: string) {
  const colors: Record<string, string> = {
    physics: "blue",
    chemistry: "green",
    mathematics: "purple",
    biology: "emerald",
    english: "orange",
    nepali: "pink",
  };
  return colors[subject || ""] || "primary";
}

function getSubjectIcon(subject?: string) {
  const icons: Record<string, React.ReactNode> = {
    physics: <Atom className="h-5 w-5" />,
    chemistry: <FlaskConical className="h-5 w-5" />,
    mathematics: <CalcIcon className="h-5 w-5" />,
    biology: <BookOpen className="h-5 w-5" />,
    english: <Terminal className="h-5 w-5" />,
    nepali: <BookOpen className="h-5 w-5" />,
  };
  return icons[subject || ""] || <BookOpen className="h-5 w-5" />;
}

export function SyllabusViewer({
  title,
  content,
  subject,
  examBoard = "NEB",
  classLevel,
  hours,
  topics = [],
  formulas = {},
  diagrams = [],
}: SyllabusViewerProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const subjectColor = getSubjectColor(subject);
  const subjectIcon = getSubjectIcon(subject);

  // Parse content into sections
  const contentSections = content.split("\n\n").filter(Boolean);

  // Generate NEB/CDC peculiar content
  const generateExamFocus = () => {
    return {
      commonPitfalls: [
        "Forgetting sign conventions in calculations",
        "Confusing scalar and vector quantities",
        "Incorrect unit conversions",
        "Misinterpreting graph slopes and areas",
        "Applying formulas without checking conditions",
      ],
      examWeightage: {
        numerical: "40-50% of total marks",
        theory: "20-30% of total marks",
        diagram: "10-15% of total marks",
        derivation: "15-20% of total marks",
      },
      tips: [
        "Practice at least 10 numerical problems daily",
        "Draw labeled diagrams for every concept",
        "Memorize all formulas with their units",
        "Revise using flashcards 2 days before exam",
        "Attempt previous year questions first",
      ],
    };
  };

  const examFocus = generateExamFocus();

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-start gap-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-${subjectColor}-500/10 text-${subjectColor}-600`}>
          {subjectIcon}
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
            <Badge variant="outline" className="text-xs">{examBoard}</Badge>
            {classLevel && <Badge variant="secondary" className="text-xs">{classLevel}</Badge>}
            {hours && (
              <Badge variant="outline" className="text-xs">
                {hours} Hours
              </Badge>
            )}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Comprehensive NEB/CDC aligned theory with deep explanations
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm">
          <Target className="h-4 w-4" />
          <span>{topics.length} Topics</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 text-green-700 dark:text-green-400 text-sm">
          <Zap className="h-4 w-4" />
          <span>NEB/CDC Aligned</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-700 dark:text-purple-400 text-sm">
          <GraduationCap className="h-4 w-4" />
          <span>Exam Focused</span>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex-wrap h-auto bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b rounded-none px-1 -mx-1 w-full justify-start shadow-sm">
          <TabsTrigger value="overview" className="gap-2 py-2 px-3">
            <Eye className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="theory" className="gap-2 py-2 px-3">
            <BookOpen className="h-4 w-4" />
            <span>Deep Theory</span>
          </TabsTrigger>
          <TabsTrigger value="formulas" className="gap-2 py-2 px-3">
            <Calculator className="h-4 w-4" />
            <span>Formulas</span>
          </TabsTrigger>
          <TabsTrigger value="exams" className="gap-2 py-2 px-3">
            <Target className="h-4 w-4" />
            <span>Exam Focus</span>
          </TabsTrigger>
          <TabsTrigger value="diagrams" className="gap-2 py-2 px-3">
            <BookOpen className="h-4 w-4" />
            <span>Diagrams</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Eye className="h-5 w-5 text-primary" />
                Unit Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {contentSections.slice(0, 3).map((section, idx) => (
                <div key={idx} className="rounded-lg bg-muted/50 p-4">
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{section}</p>
                </div>
              ))}
              
              {contentSections.length > 3 && (
                <button
                  onClick={() => setExpandedSection(expandedSection === "more" ? null : "more")}
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <ChevronRight className={`h-4 w-4 transition-transform ${expandedSection === "more" ? "rotate-90" : ""}`} />
                  <span>Show {contentSections.length - 3} more sections</span>
                </button>
              )}
              
              {expandedSection === "more" && contentSections.slice(3).map((section, idx) => (
                <motion.div
                  key={idx + 3}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="rounded-lg bg-muted/50 p-4 mt-2"
                >
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{section}</p>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Topics List */}
          {topics.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Topics Covered</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 sm:grid-cols-2">
                  {topics.map((topic, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-muted/30">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span className="text-sm">{topic}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Deep Theory Tab */}
        <TabsContent value="theory" className="mt-6 space-y-6">
          <div className="space-y-4">
            {contentSections.map((section, idx) => (
              <Card key={idx} className="border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                      {idx + 1}
                    </span>
                    Section {idx + 1}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{section}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Deep Dive Section */}
          <Card className="border-l-4 border-l-red-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Lightbulb className="h-5 w-5 text-red-500" />
                🔍 Deep Dive: Key Concepts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-red-50 dark:bg-red-950/30 p-4">
                <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">Why This Matters for NEB Exams</h4>
                <p className="text-sm text-red-800 dark:text-red-200">
                  This topic carries <strong>8-15 marks</strong> in Class {classLevel || "11"} board exams. Students consistently struggle with conceptual understanding and application in numerical problems.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 p-4">
                  <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Common Exam Pitfalls</h4>
                  <ul className="text-sm text-amber-800 dark:text-amber-200 space-y-1">
                    {examFocus.commonPitfalls.map((pitfall, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>{pitfall}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-4">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">NEB Mark Distribution</h4>
                  <div className="space-y-2 text-sm">
                    {Object.entries(examFocus.examWeightage).map(([type, weight]) => (
                      <div key={type} className="flex justify-between items-center">
                        <span className="capitalize text-blue-800 dark:text-blue-200">{type}</span>
                        <Badge variant="outline" className="text-xs">{weight}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-green-50 dark:bg-green-950/30 p-4">
                <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Exam Tips & Tricks</h4>
                <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                  {examFocus.tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-green-600" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Formulas Tab */}
        <TabsContent value="formulas" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calculator className="h-5 w-5 text-primary" />
                Essential Formulas
              </CardTitle>
            </CardHeader>
            <CardContent>
              {Object.keys(formulas).length > 0 ? (
                <div className="grid gap-3">
                  {Object.entries(formulas).map(([name, formula], idx) => (
                    <div key={idx} className="rounded-lg bg-primary/5 dark:bg-primary/10 p-4 border border-primary/20">
                      <p className="text-sm font-medium text-primary mb-1">{name}</p>
                      <p className="font-mono text-lg">{formula}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg bg-muted/50 p-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    No formulas defined yet. Formulas will be displayed here when added.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Formula Sheet */}
          <Card className="mt-4 border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="text-lg">Formula Sheet (Quick Reference)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                {Object.entries(formulas).slice(0, 6).map(([name, formula], idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                    <span className="text-xs font-mono bg-primary/10 text-primary px-2 py-1 rounded">{idx + 1}</span>
                    <span className="text-sm font-medium flex-1">{name}</span>
                    <code className="text-sm font-mono text-primary">{formula}</code>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Exam Focus Tab */}
        <TabsContent value="exams" className="mt-6 space-y-4">
          <Card className="border-l-4 border-l-red-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="h-5 w-5 text-red-500" />
                NEB/CDC Exam Focus
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-red-50 dark:bg-red-950/30 p-4">
                <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">High Priority Topics</h4>
                <ul className="text-sm text-red-800 dark:text-red-200 space-y-1">
                  <li>• Conceptual understanding with derivations</li>
                  <li>• Numerical problem solving (5-10 marks)</li>
                  <li>• Graph interpretation and construction</li>
                  <li>• Application-based questions</li>
                  <li>• Previous year question patterns</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg bg-green-50 dark:bg-green-950/30 p-4">
                  <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Long Answer (5-10 marks)</h4>
                  <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                    <li>• Derive formulas from first principles</li>
                    <li>• Solve numerical problems step-by-step</li>
                    <li>• Draw and label complete diagrams</li>
                    <li>• Explain applications with examples</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-4">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Short Answer (2-5 marks)</h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li>• Define key terms with examples</li>
                    <li>• State laws and principles</li>
                    <li>• Differentiate between concepts</li>
                    <li>• Give real-life applications</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 p-4">
                <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Common Mistakes to Avoid</h4>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  {examFocus.commonPitfalls.map((pitfall, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 mt-0.5 shrink-0 text-amber-600" />
                      <span className="text-amber-800 dark:text-amber-200">{pitfall}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Study Plan */}
          <Card className="border-l-4 border-l-purple-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <RotateCw className="h-5 w-5 text-purple-500" />
                Study Plan (7 Days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { day: 1, task: "Read theory and understand concepts" },
                  { day: 2, task: "Memorize all formulas and derivations" },
                  { day: 3, task: "Practice numerical problems (basic level)" },
                  { day: 4, task: "Draw labeled diagrams from memory" },
                  { day: 5, task: "Practice numerical problems (advanced level)" },
                  { day: 6, task: "Solve previous year questions" },
                  { day: 7, task: "Revision and doubt clearing" },
                ].map((item) => (
                  <div key={item.day} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      {item.day}
                    </div>
                    <span className="text-sm">{item.task}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Diagrams Tab */}
        <TabsContent value="diagrams" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BookOpen className="h-5 w-5 text-primary" />
                Important Diagrams
              </CardTitle>
            </CardHeader>
            <CardContent>
              {diagrams.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {diagrams.map((diagram, idx) => (
                    <div key={idx} className="rounded-lg border-2 border-dashed border-primary/30 p-6 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Eye className="h-8 w-8 text-primary/50" />
                        <p className="text-sm font-medium">{diagram}</p>
                        <p className="text-xs text-muted-foreground">Diagram illustration</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg bg-muted/50 p-6 text-center">
                  <BookOpen className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No diagrams defined yet. Add diagrams to the syllabus data to see them here.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default SyllabusViewer;
