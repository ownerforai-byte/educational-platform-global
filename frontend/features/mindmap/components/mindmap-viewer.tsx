"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MindmapInterface } from "./mindmap-interface";
import { FileText, Map as MapIcon, BookOpen } from "lucide-react";
import type { MindmapItem } from "../types";

const STATUS_ICON = {
  syllabus: <BookOpen className="h-3 w-3" />,
  imported: <FileText className="h-3 w-3" />,
  override: <MapIcon className="h-3 w-3" />,
};

const STATUS_LABEL = {
  syllabus: "Syllabus-generated",
  imported: "Imported from content",
  override: "Custom override",
};

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
    <Card className="h-full overflow-hidden">
      <CardHeader className="space-y-1 pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base flex items-center gap-2">
            {STATUS_ICON[source]}
            {href ? (
              <Link href={href} className="hover:text-primary hover:underline">
                {title}
              </Link>
            ) : (
              title
            )}
          </CardTitle>
          <span className={cn(
            "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium border",
            source === "imported"
              ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
              : source === "override"
                ? "bg-amber-500/10 text-amber-600 border-amber-500/20"
                : "bg-blue-500/10 text-blue-600 border-blue-500/20",
          )}>
            {STATUS_LABEL[source]}
          </span>
        </div>
        <p className="text-xs font-normal text-muted-foreground">
          {mediaUrl ? "Uploaded image map" : "Interactive mind map — scroll to zoom, drag to pan, click nodes to collapse/expand"}
        </p>
      </CardHeader>
      <CardContent className="pt-0">
        {mediaUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={mediaUrl}
            alt={`Mind map for ${title}`}
            className="mx-auto max-h-[420px] rounded-md border border-border"
          />
        ) : root ? (
          <MindmapInterface title={title} root={root} source={source} />
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center gap-2">
            <MapIcon className="h-8 w-8 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">
              Mind map will appear here when this syllabus unit is registered.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}
