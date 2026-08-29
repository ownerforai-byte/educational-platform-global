import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { MindMapViewer } from "./mindmap-viewer";
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
        <CardContent className="py-10 text-center text-muted-foreground">
          No syllabus units found for mind maps yet.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <p className="text-sm text-muted-foreground">
        Mind maps are a system feature: every syllabus unit and topic gets a map
        automatically. Imported maps override the generated structure when available.
        Subject: {title}.
      </p>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Unit mind maps</h2>
        <div className="grid gap-4 lg:grid-cols-1">
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

      {topicItems.length > 0 ? (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Topic mind maps</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {topicItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="py-4">
                  <Link
                    href={item.href ?? "#"}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    {item.title}
                  </Link>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.source === "imported" ? "Imported" : "Syllabus-generated"} · open topic for full interface
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
