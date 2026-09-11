"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Atom } from "lucide-react";

export const MolecularBuilder3D: React.FC = () => {
  const [molecule, setMolecule] = useState("Water (H₂O)");

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Atom className="h-6 w-6 text-amber-500" />
            Molecular Builder 3D
        </CardTitle>
        <CardDescription>Construct and visualize molecular structures.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-64 bg-muted rounded-lg flex items-center justify-center text-muted-foreground border-2 border-dashed">
            [3D Rendering Area for {molecule}]
        </div>
        <div className="flex gap-2">
            <Button onClick={() => setMolecule("Water (H₂O)")}>Water</Button>
            <Button onClick={() => setMolecule("Methane (CH₄)")}>Methane</Button>
            <Button onClick={() => setMolecule("Carbon Dioxide (CO₂)")}>CO₂</Button>
        </div>
      </CardContent>
    </Card>
  );
};
