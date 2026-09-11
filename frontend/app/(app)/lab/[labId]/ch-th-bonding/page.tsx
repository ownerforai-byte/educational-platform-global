"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { TheoryPanel } from "@/components/lab/theory-panel";

export default function LabPage() {
  const params = useParams();
  const labId = params?.labId as string;

  return (
    <div className="container mx-auto py-6 px-4 space-y-6">
      <Link href="/lab">
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Labs
        </Button>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>
              {labId.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            }
          >
            <TheoryPanel subject="chemistry" topic="bonding" />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
