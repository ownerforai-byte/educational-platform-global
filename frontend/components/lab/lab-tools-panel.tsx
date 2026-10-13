"use client";

import { BookOpen, Calculator, MessagesSquare, PenLine, TrendingUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DiscussionThread } from "./DiscussionThread";
import { FormulaCheatSheet } from "./FormulaCheatSheet";
import { PracticeProblems } from "./PracticeProblems";
import { ProgressTracker } from "./ProgressTracker";
import { SharedAnnotationBoard } from "./SharedAnnotationBoard";
import { LabSectionCard } from "./lab-section-card";

export interface LabToolsPanelProps {
  labId: string;
}

export function LabToolsPanel({ labId }: LabToolsPanelProps) {
  return (
    <Tabs defaultValue="formulas">
      <TabsList>
        <TabsTrigger value="formulas">
          <BookOpen className="mr-1.5 h-3.5 w-3.5" />
          Formulas
        </TabsTrigger>
        <TabsTrigger value="practice">
          <Calculator className="mr-1.5 h-3.5 w-3.5" />
          Practice
        </TabsTrigger>
        <TabsTrigger value="progress">
          <TrendingUp className="mr-1.5 h-3.5 w-3.5" />
          Progress
        </TabsTrigger>
        <TabsTrigger value="discussion">
          <MessagesSquare className="mr-1.5 h-3.5 w-3.5" />
          Discussion
        </TabsTrigger>
        <TabsTrigger value="annotations">
          <PenLine className="mr-1.5 h-3.5 w-3.5" />
          Annotations
        </TabsTrigger>
      </TabsList>

      <TabsContent value="formulas">
        <LabSectionCard
          title="Formula cheat sheet"
          description="Searchable reference of the core formulas used in this lab."
        >
          <FormulaCheatSheet />
        </LabSectionCard>
      </TabsContent>

      <TabsContent value="practice">
        <LabSectionCard
          title="Practice problems"
          description="Check your understanding with worked solutions."
        >
          <PracticeProblems />
        </LabSectionCard>
      </TabsContent>

      <TabsContent value="progress">
        <LabSectionCard
          title="Progress tracker"
          description="Topic-by-topic progress for this lab."
        >
          <ProgressTracker />
        </LabSectionCard>
      </TabsContent>

      <TabsContent value="discussion">
        <LabSectionCard
          title="Discussion threads"
          description="Ask questions and help classmates. Threads are saved in this browser for this lab."
        >
          <DiscussionThread labId={labId} />
        </LabSectionCard>
      </TabsContent>

      <TabsContent value="annotations">
        <LabSectionCard
          title="Shared annotation board"
          description="Notes attached to model annotations. Notes are saved in this browser for this lab."
        >
          <SharedAnnotationBoard labId={labId} />
        </LabSectionCard>
      </TabsContent>
    </Tabs>
  );
}
