"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NotesViewer } from "@/components/content/notes-viewer";

export function SyllabusViewer({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Official Syllabus: {title}</CardTitle>
      </CardHeader>
      <CardContent>
        <NotesViewer title={title} content={content} />
      </CardContent>
    </Card>
  );
}
