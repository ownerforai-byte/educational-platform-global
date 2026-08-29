"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MindmapInterface } from "./mindmap-interface";
import type { MindmapItem } from "../types";

export function MindMapViewer({
  title,
  mediaUrl,
  root,
  source = "syllabus",
  href,
}: {
  title: string;
  mediaUrl: string | null;
  root?: MindmapItem["root"];
  source?: MindmapItem["source"];
  href?: string;
}) {
  return (
    <Card className="h-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-base">
          {href ? (
            <Link href={href} className="hover:text-primary hover:underline">
              {title}
            </Link>
          ) : (
            title
          )}
        </CardTitle>
        <p className="text-xs font-normal text-muted-foreground">
          {source === "imported" ? "Imported map" : "Syllabus system map"}
        </p>
      </CardHeader>
      <CardContent>
        {mediaUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- arbitrary user-uploaded map URLs; next/image adds no value here
          <img
            src={mediaUrl}
            alt={`Mind map for ${title}`}
            className="mx-auto max-h-[420px] rounded-md border border-border"
          />
        ) : root ? (
          <MindmapInterface title={title} root={root} source={source} />
        ) : (
          <p className="text-sm text-muted-foreground">
            Mind map will appear here when this syllabus topic is registered.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
