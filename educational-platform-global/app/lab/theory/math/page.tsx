"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Class11MathTheory } from "@/components/lab/class11";

export default function MathTheoryPage() {
  return (
    <div className="container mx-auto max-w-4xl space-y-6 py-6 sm:py-10 px-4 sm:px-6">
      <div className="space-y-2">
        <Button variant="ghost" size="sm" className="gap-2" asChild>
          <Link href="/lab/theory">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Theory Labs</span>
          </Link>
        </Button>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-primary" />
            <span>Class 11 Mathematics Theory - Complete</span>
          </CardTitle>
          <CardDescription>
            Complete Class 11 Mathematics theory covering sets, functions, trigonometry, algebra, coordinate geometry, calculus, and statistics.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Class11MathTheory />
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-3 justify-center">
        <Link href="/lab/theory/chemistry" passHref>
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Previous: Chemistry Theory</span>
          </Button>
        </Link>
        <Link href="/lab/theory" passHref>
          <Button variant="outline" className="gap-2">
            <BookOpen className="h-4 w-4" />
            <span>All Theories</span>
          </Button>
        </Link>
        <Link href="/lab/theory/kinematics" passHref>
          <Button variant="outline" className="gap-2">
            <span>Next: Kinematics</span>
            <ArrowLeft className="h-4 w-4 transform rotate-180" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
