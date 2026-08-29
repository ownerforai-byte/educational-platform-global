"use client";

import { Suspense } from "react";
import { MathLab } from "@/components/lab/math-lab";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Beaker, Atom, Calculator, Loader2 } from "lucide-react";

function LabContent() {
  return (
    <div className="container mx-auto py-8 px-4 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Interactive Labs</h1>
        <p className="text-muted-foreground">
          Explore concepts through interactive 3D visualizations and simulations
        </p>
      </div>

      <Tabs defaultValue="math" className="w-full" aria-label="Lab categories">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4" role="tablist">
          <TabsTrigger value="math" className="flex items-center gap-2 touch-manipulation" role="tab" aria-selected={true}>
            <Calculator className="h-4 w-4" />
            <span>Mathematics</span>
          </TabsTrigger>
          <TabsTrigger value="biology" className="flex items-center gap-2 touch-manipulation" role="tab" aria-selected={false}>
            <BookOpen className="h-4 w-4" />
            <span>Biology</span>
          </TabsTrigger>
          <TabsTrigger value="chemistry" className="flex items-center gap-2 touch-manipulation" role="tab" aria-selected={false}>
            <Beaker className="h-4 w-4" />
            <span>Chemistry</span>
          </TabsTrigger>
          <TabsTrigger value="physics" className="flex items-center gap-2 touch-manipulation" role="tab" aria-selected={false}>
            <Atom className="h-4 w-4" />
            <span>Physics</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="math" className="mt-6" role="tabpanel">
          <Suspense fallback={
            <div className="flex items-center justify-center h-[400px]">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Loading Mathematics Lab...</span>
            </div>
          }>
            <MathLab />
          </Suspense>
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
              <p className="text-muted-foreground">
                Biology 3D visualizations coming soon. Explore cell structures, DNA, ecology, and human anatomy in interactive 3D.
              </p>
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
              <p className="text-muted-foreground">
                Chemistry molecular visualizations coming soon. Explore 3D molecular structures, reaction mechanisms, and periodic table interactions.
              </p>
            </CardContent>
          </Card>
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
              <p className="text-muted-foreground">
                Physics simulations coming soon. Explore mechanics, electromagnetism, optics, and modern physics with interactive 3D visualizations.
              </p>
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
