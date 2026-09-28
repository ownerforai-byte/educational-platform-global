"use client";

import { CheckCircle } from "lucide-react";
import { ProgressPanel } from "@/components/progress/progress-panel";

export default function ProgressPage() {
  return (
    <div className="container max-w-4xl py-8 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <CheckCircle className="h-6 w-6 text-primary" />
          My Progress
        </h1>
        <p className="text-sm text-muted-foreground">
          Track your learning journey across all subjects.
        </p>
      </div>

      <ProgressPanel />
    </div>
  );
}
