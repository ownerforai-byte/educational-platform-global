import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { MindMapViewer } from "./mindmap-viewer";
import { MapIcon, BookOpen } from "lucide-react";
import type { MindmapItem } from "../types";

export function MindmapGalleryView({
  title,
  items,
  topicItems = [],
}: {
  title: string;
  items: MindmapItem[];
  topicItems?: MindmapItem[];
}) {
  if (items.length === 0 && topicItems.length === 0) {
    return (
      <Card>
        <CardContent className="py-16 text-center space-y-3">
          <MapIcon className="h-10 w-10 mx-auto text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">
            No mind maps available for {title} yet.
          </p>
          <p className="text-xs text-muted-foreground/70">
            Mind maps are auto-generated from the syllabus. Add content under <code className="bg-muted px-1 rounded">content/ravikishan/</code> and run <code className="bg-muted px-1 rounded">npm run content:build</code>.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-10">
      {/* Hero description */}
      <div className="rounded-xl border border-border/60 bg-gradient-to-r from-primary/5 via-background to-primary/5 p-5">
        <div className="flex items-start gap-3">
          <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-base font-semibold">Mind Maps — {title}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Visual concept maps for every syllabus unit. Each map shows how topics connect — click any node to collapse or expand its branches. Use search to jump to a concept, zoom to explore details, and export to save as SVG.
            </p>
          </div>
        </div>
      </div>

      {/* Unit maps */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-semibold tracking-tight">Unit mind maps</h2>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{items.length} units</span>
        </div>
        <div className="grid gap-5">
          {items.map((item) => (
            <MindMapViewer
              key={item.id}
              title={item.title}
              mediaUrl={item.mediaUrl}
              root={item.root}
              source={item.source}
              href={item.href}
            />
          ))}
        </div>
      </section>

      {/* Topic maps */}
      {topicItems.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-semibold tracking-tight">Topic mind maps</h2>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{topicItems.length} topics</span>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {topicItems.map((item) => (
              <Card key={item.id} className="group hover:border-primary/30 transition-colors">
                <CardContent className="py-4">
                  <Link
                    href={item.href ?? "#"}
                    className="flex items-center gap-3"
                  >
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <BookOpen className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {item.source === "imported" ? "Imported map" : "Syllabus map"}
                      </p>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
