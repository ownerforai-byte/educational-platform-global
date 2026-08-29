"use client";

import { Suspense } from "react";
import { useSubjectNav } from "@/features/syllabus/hooks";
import { MathLab } from "@/components/lab/math-lab";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Beaker, Atom, Calculator, Loader2, AlertCircle, ChevronRight } from "lucide-react";
import { useState } from "react";

const CLASS_OPTIONS = [
  { value: "class-11-notes", label: "Class 11" },
  { value: "class-12-notes", label: "Class 12" },
];

const SUBJECT_OPTIONS: Record<string, { value: string; label: string; icon: typeof Calculator }[]> = {
  "class-11-notes": [
    { value: "mathematics", label: "Mathematics", icon: Calculator },
    { value: "physics", label: "Physics", icon: Atom },
    { value: "chemistry", label: "Chemistry", icon: Beaker },
    { value: "biology", label: "Biology", icon: BookOpen },
  ],
  "class-12-notes": [
    { value: "mathematics", label: "Mathematics", icon: Calculator },
    { value: "physics", label: "Physics", icon: Atom },
    { value: "chemistry", label: "Chemistry", icon: Beaker },
    { value: "biology", label: "Biology", icon: BookOpen },
  ],
};

function SyllabusViewer({ classSlug, subjectSlug }: { classSlug: string; subjectSlug: string }) {
  const { data: subjectNav, isLoading, error, refetch } = useSubjectNav(classSlug, subjectSlug);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <span className="ml-2 text-muted-foreground">Loading syllabus...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px] space-y-4">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <div className="text-center">
          <p className="text-lg font-semibold text-destructive">Failed to load syllabus</p>
          <p className="text-sm text-muted-foreground">{error.message}</p>
        </div>
        <Button onClick={() => refetch()} variant="outline">
          Retry
        </Button>
      </div>
    );
  }

  if (!subjectNav?.subject) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px] space-y-4">
        <AlertCircle className="h-12 w-12 text-muted-foreground" />
        <p className="text-muted-foreground">No syllabus data available for this subject</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{subjectNav.subject.name}</h2>
        <p className="text-muted-foreground">{subjectNav.subject.description}</p>
      </div>

      <div className="space-y-4">
        {subjectNav.units.map((unit) => (
          <UnitCard key={unit.id} unit={unit} classSlug={classSlug} subjectSlug={subjectSlug} />
        ))}
      </div>
    </div>
  );
}

function UnitCard({
  unit,
  classSlug,
  subjectSlug,
}: {
  unit: { id: string; title: string; topics: string[]; topicEntries: { slug: string; title: string; index: number }[]; hours?: number };
  classSlug: string;
  subjectSlug: string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="w-full">
      <CardHeader className="cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <ChevronRight className={`h-4 w-4 transition-transform ${expanded ? "rotate-90" : ""}`} />
            {unit.title}
          </span>
          {unit.hours && (
            <span className="text-sm text-muted-foreground">{unit.hours} hours</span>
          )}
        </CardTitle>
      </CardHeader>
      {expanded && (
        <CardContent>
          <ul className="space-y-2" role="list">
            {unit.topics.map((topic, index) => (
              <li key={index} className="flex items-start gap-2 py-2 border-b last:border-b-0">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center">
                  {index + 1}
                </span>
                <span className="text-sm text-foreground">{topic}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      )}
    </Card>
  );
}

function LabContent() {
  const [classSlug, setClassSlug] = useState("class-11-notes");
  const [subjectSlug, setSubjectSlug] = useState("mathematics");

  const subjects = SUBJECT_OPTIONS[classSlug] || [];

  return (
    <div className="container mx-auto py-8 px-4 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Interactive Labs</h1>
        <p className="text-muted-foreground">
          Explore concepts through interactive 3D visualizations and syllabus-aligned content
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1 space-y-2">
          <label htmlFor="class-select" className="text-sm font-medium">
            Class
          </label>
          <Select value={classSlug} onValueChange={setClassSlug}>
            <SelectTrigger id="class-select" className="w-full sm:w-48 touch-manipulation">
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              {CLASS_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 space-y-2">
          <label htmlFor="subject-select" className="text-sm font-medium">
            Subject
          </label>
          <Select value={subjectSlug} onValueChange={setSubjectSlug}>
            <SelectTrigger id="subject-select" className="w-full sm:w-48 touch-manipulation">
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="math" className="w-full" aria-label="Lab categories">
        <TabsList className="flex-wrap w-full" role="tablist">
          <TabsTrigger value="math" className="flex-1 min-w-[120px] touch-manipulation" role="tab" aria-selected={true}>
            <Calculator className="h-4 w-4 mr-2" />
            Mathematics
          </TabsTrigger>
          <TabsTrigger value="physics" className="flex-1 min-w-[120px] touch-manipulation" role="tab" aria-selected={false}>
            <Atom className="h-4 w-4 mr-2" />
            Physics
          </TabsTrigger>
          <TabsTrigger value="chemistry" className="flex-1 min-w-[120px] touch-manipulation" role="tab" aria-selected={false}>
            <Beaker className="h-4 w-4 mr-2" />
            Chemistry
          </TabsTrigger>
          <TabsTrigger value="biology" className="flex-1 min-w-[120px] touch-manipulation" role="tab" aria-selected={false}>
            <BookOpen className="h-4 w-4 mr-2" />
            Biology
          </TabsTrigger>
        </TabsList>

        <TabsContent value="math" className="mt-6 space-y-6" role="tabpanel">
          <Suspense fallback={
            <div className="flex items-center justify-center h-[400px]">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Loading Mathematics Lab...</span>
            </div>
          }>
            <MathLab />
          </Suspense>
          <SyllabusViewer classSlug={classSlug} subjectSlug="mathematics" />
        </TabsContent>

        <TabsContent value="physics" className="mt-6" role="tabpanel">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Atom className="h-5 w-5" />
                Physics Lab
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Physics simulations coming soon. Explore mechanics, electromagnetism, optics, and modern physics with interactive 3D visualizations.
              </p>
              <SyllabusViewer classSlug={classSlug} subjectSlug="physics" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chemistry" className="mt-6" role="tabpanel">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Beaker className="h-5 w-5" />
                Chemistry Lab
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Chemistry molecular visualizations coming soon. Explore 3D molecular structures, reaction mechanisms, and periodic table interactions.
              </p>
              <SyllabusViewer classSlug={classSlug} subjectSlug="chemistry" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="biology" className="mt-6" role="tabpanel">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Biology Lab
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Biology 3D visualizations coming soon. Explore cell structures, DNA, ecology, and human anatomy in interactive 3D.
              </p>
              <SyllabusViewer classSlug={classSlug} subjectSlug="biology" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function LabPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <span className="ml-2 text-muted-foreground">Loading...</span>
      </div>
    }>
      <LabContent />
    </Suspense>
  );
}
