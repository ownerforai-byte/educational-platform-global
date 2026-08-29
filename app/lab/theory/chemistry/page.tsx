"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Class11ChemistryTheory } from "@/components/lab/class11";

export default function ChemistryTheoryPage() {
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
            <span>Class 11 Chemistry Theory - Complete</span>
          </CardTitle>
          <CardDescription>
            Comprehensive Class 11 Chemistry theory covering atomic structure, periodic table, chemical bonding, thermodynamics, and equilibrium.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Class11ChemistryTheory />
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-3 justify-center">
        <Link href="/lab/theory/laws-motion" passHref>
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Previous: Laws of Motion</span>
          </Button>
        </Link>
        <Link href="/lab/theory" passHref>
          <Button variant="outline" className="gap-2">
            <BookOpen className="h-4 w-4" />
            <span>All Theories</span>
          </Button>
        </Link>
        <Link href="/lab/theory/math" passHref>
          <Button variant="outline" className="gap-2">
            <span>Next: Mathematics Theory</span>
            <ArrowLeft className="h-4 w-4 transform rotate-180" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
