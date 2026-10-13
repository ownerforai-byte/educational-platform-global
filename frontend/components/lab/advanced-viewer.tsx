"use client";

import { useState } from "react";
import { Glasses, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnnotatedModelViewer } from "./AnnotatedModelViewer";
import { ARViewer } from "./ARViewer";
import { LabSectionCard } from "./lab-section-card";

type ViewerMode = "annotate" | "ar";

export function AdvancedViewer() {
  const [mode, setMode] = useState<ViewerMode>("annotate");
  const [arActive, setArActive] = useState(false);

  return (
    <LabSectionCard
      title="Advanced viewer"
      description="Explore the model in annotation mode, or place it in your room with WebXR AR."
      contentClassName="space-y-3"
    >
      <Tabs value={mode} onValueChange={(v) => setMode(v as ViewerMode)}>
        <TabsList>
          <TabsTrigger value="annotate">
            <PenLine className="mr-1.5 h-3.5 w-3.5" />
            Annotate
          </TabsTrigger>
          <TabsTrigger value="ar">
            <Glasses className="mr-1.5 h-3.5 w-3.5" />
            AR
          </TabsTrigger>
        </TabsList>

        <TabsContent value="annotate">
          <div className="h-[520px] overflow-hidden rounded-xl border border-border">
            <AnnotatedModelViewer className="h-full" />
          </div>
        </TabsContent>

        <TabsContent value="ar">
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-muted/30 px-6 py-12 text-center">
            <Glasses className="h-10 w-10 text-primary" />
            <p className="max-w-md text-sm text-muted-foreground">
              AR mode places interactive shapes in your room through WebXR. It needs a
              device with AR support (Chrome on Android with ARCore, or a WebXR-capable
              browser).
            </p>
            <Button onClick={() => setArActive(true)}>Launch AR mode</Button>
          </div>
        </TabsContent>
      </Tabs>

      <ARViewer enabled={arActive} onClose={() => setArActive(false)} />
    </LabSectionCard>
  );
}
