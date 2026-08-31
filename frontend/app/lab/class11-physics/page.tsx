"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { Class11Physics3DPlus } from "@/components/lab/class11/class11-physics-3d-plus";

const LAB_ID = "class11-physics";

export default function LabPage() {

  return (
    <div className="container mx-auto py-6 px-4 space-y-6">
      {/* Back button */}
      <Link href="/lab">
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Labs
        </Button>
      </Link>

      {/* Lab Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>{LAB_ID.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={
            <div className="flex items-center justify-center h-[400px]">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          }>
            <Class11Physics3DPlus />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
