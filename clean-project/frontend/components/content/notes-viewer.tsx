"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { MathMarkdown } from "@/components/content/math-markdown";
import { UnderDevelopment } from "@/components/content/under-development";

export function NotesViewer({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  if (!content.trim()) {
    return <UnderDevelopment />;
  }

  const headings: string[] = [];
  const headingRegex = /^#{1,3}\s+(.+)$/gm;
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    headings.push(match[1]);
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.print()}
          aria-label="Print notes"
        >
          <FileDown className="mr-2 h-4 w-4" />
          Print
        </Button>
      </CardHeader>
      <CardContent>
        {headings.length > 0 && (
          <nav aria-label="Table of contents" className="mb-6">
            <h2 className="text-sm font-semibold uppercase text-muted-foreground mb-2">
              Contents
            </h2>
            <ul className="space-y-1">
              {headings.map((heading, idx) => (
                <li key={idx} className="text-sm">
                  <span className="text-primary hover:underline">{heading}</span>
                </li>
              ))}
            </ul>
          </nav>
        )}
        <div className="prose dark:prose-invert max-w-none">
          <MathMarkdown content={content} />
        </div>
      </CardContent>
    </Card>
  );
}
