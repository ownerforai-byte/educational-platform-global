import React from "react";
import { SYLLABUS } from "@/lib/syllabus";
import { getTheoremIndex } from "@/lib/theorems";
import { getDerivationIndex } from "@/lib/derivations";
import { HomeCommandCenter } from "@/components/home/home-command-center";
import { CurriculumTracksHub } from "@/components/home/curriculum-tracks-hub";
import { VirtualLabsCatalog } from "@/components/home/virtual-labs-catalog";
import { AcademicRigorHub } from "@/components/home/academic-rigor-hub";
import { AssessmentExamHub } from "@/components/home/assessment-exam-hub";
import { KnowledgeLoksewaHub } from "@/components/home/knowledge-loksewa-hub";
import { AIAssistantWorkspace } from "@/components/home/ai-assistant-workspace";

export const metadata = {
  title: "Global Educational Platform — 3D Labs, Notes & Exam Mastery",
  description: "NEB Class 11 & 12 complete curriculum: interactive 3D science labs, computational solvers, step-by-step theorem proofs, derivations, AI quizzes, and curated notes.",
};

async function getTheoremsSummary() {
  try {
    const entries = await getTheoremIndex();
    const byClass = new Map<string, Map<string, number>>();
    for (const e of entries) {
      const subjectMap = byClass.get(e.classSlug) ?? new Map();
      subjectMap.set(e.subjectSlug, (subjectMap.get(e.subjectSlug) ?? 0) + 1);
      byClass.set(e.classSlug, subjectMap);
    }
    return { entries, byClass };
  } catch {
    return { entries: [], byClass: new Map<string, Map<string, number>>() };
  }
}

async function getDerivationsSummary() {
  try {
    const entries = await getDerivationIndex();
    const byClass = new Map<string, Map<string, number>>();
    for (const e of entries) {
      const subjectMap = byClass.get(e.classSlug) ?? new Map();
      subjectMap.set(e.subjectSlug, (subjectMap.get(e.subjectSlug) ?? 0) + 1);
      byClass.set(e.classSlug, subjectMap);
    }
    return { entries, byClass };
  } catch {
    return { entries: [], byClass: new Map<string, Map<string, number>>() };
  }
}

export default async function HomePage() {
  const class11 = SYLLABUS.find((c) => c.slug === "class-11-notes") ?? SYLLABUS[0];
  const class12 = SYLLABUS.find((c) => c.slug === "class-12-notes") ?? SYLLABUS[1];

  const [{ entries: theoremEntries, byClass: theoremByClass }, { entries: derivationEntries, byClass: derivationByClass }] =
    await Promise.all([getTheoremsSummary(), getDerivationsSummary()]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20">
      {/* 1. Executive Command Center (Hero, Smart Jump, Live Platform Counters) */}
      <HomeCommandCenter
        totalTheorems={theoremEntries.length}
        totalDerivations={derivationEntries.length}
      />

      {/* 2. Academic Curriculum & Study Notes (Class 11 & Class 12 All 6 Subjects) */}
      <CurriculumTracksHub
        class11={class11}
        class12={class12}
      />

      {/* 3. Virtual 3D Science Laboratories & Computational Solvers (Physics, Chem, Bio, Math) */}
      <VirtualLabsCatalog />

      {/* 4. Academic Rigor: Mathematical Theorems, Derivations Vault & Practical Manuals */}
      <AcademicRigorHub
        theoremEntriesCount={theoremEntries.length}
        theoremByClass={theoremByClass}
        derivationEntriesCount={derivationEntries.length}
        derivationByClass={derivationByClass}
      />

      {/* 5. Self-Assessment, AI Quizzes & NEB Board Exam Countdown */}
      <AssessmentExamHub />

      {/* 6. High-Yield Knowledge, Diagrams & Loksewa Aayog Preparation */}
      <KnowledgeLoksewaHub />

      {/* 7. AI Study Assistant & Personal Workspace */}
      <AIAssistantWorkspace />
    </div>
  );
}
