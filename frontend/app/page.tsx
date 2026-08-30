"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MathModern3D } from "@/components/lab/math-modern-3d";
import { ChemistryLab } from "@/components/lab/chemistry-lab";
import { PhysicsLab } from "@/components/lab/physics-lab";
import { BiologyLab } from "@/components/lab/biology-lab";

export default function Home() {
  const [activeLab, setActiveLab] = useState<string>("math");

  return (
    <div className="min-h-screen bg-background w-full">
      <header className="border-b border-border w-full">
        <div className="container mx-auto px-4 py-4 w-full">
          <h1 className="text-2xl font-bold text-foreground">Science Lab</h1>
          <p className="text-sm text-muted-foreground">Interactive 3D visualizations for Class 11</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 w-full">
        <div className="flex flex-wrap gap-2 mb-6 w-full">
          <Button
            variant={activeLab === "math" ? "default" : "outline"}
            onClick={() => setActiveLab("math")}
            className="flex-1 min-w-[100px]"
          >
            Math
          </Button>
          <Button
            variant={activeLab === "chemistry" ? "default" : "outline"}
            onClick={() => setActiveLab("chemistry")}
            className="flex-1 min-w-[100px]"
          >
            Chemistry
          </Button>
          <Button
            variant={activeLab === "physics" ? "default" : "outline"}
            onClick={() => setActiveLab("physics")}
            className="flex-1 min-w-[100px]"
          >
            Physics
          </Button>
          <Button
            variant={activeLab === "biology" ? "default" : "outline"}
            onClick={() => setActiveLab("biology")}
            className="flex-1 min-w-[100px]"
          >
            Biology
          </Button>
        </div>

        <div className="w-full">
          {activeLab === "math" && <MathModern3D />}
          {activeLab === "chemistry" && <ChemistryLab />}
          {activeLab === "physics" && <PhysicsLab />}
          {activeLab === "biology" && <BiologyLab />}
        </div>
      </main>
    </div>
  );
}
