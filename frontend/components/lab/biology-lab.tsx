"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Dna, Microscope, Leaf, Activity } from "lucide-react";

export function BiologyLab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Dna className="h-5 w-5 text-primary" />
            DNA & Genetics Explorer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Interactive DNA structure visualization and genetic inheritance patterns coming soon.
            Explore the double helix, base pairing, and Mendelian genetics.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Microscope className="h-5 w-5 text-primary" />
            Cell Structure
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Interactive 3D cell model with organelle exploration coming soon.
            Learn about prokaryotic and eukaryotic cells, mitosis, and meiosis.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-primary" />
            Plant Biology
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Plant anatomy, photosynthesis, and floral diversity visualizations coming soon.
            Explore plant cells, tissues, and the complete life cycle.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Human Physiology
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Interactive human body systems visualization coming soon.
            Explore circulatory, respiratory, digestive, and nervous systems.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
