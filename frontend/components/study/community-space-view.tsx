import Link from "next/link";
import { BookOpen, HelpCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ComingSoon } from "@/components/content/coming-soon";
import type { CommunitySpace } from "@/lib/community";

/** /community/[id]: one subject space with study links and the awaited discussion board. */
export function CommunitySpaceView({ space }: { space: CommunitySpace }) {
  return (
    <div className="container max-w-4xl py-8 space-y-6">
      <nav className="text-sm text-muted-foreground">
        <Link href="/community" className="hover:text-foreground">
          Community
        </Link>{" "}
        / <span className="font-medium text-foreground">{space.title}</span>
      </nav>
      <div className="grid gap-3 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <BookOpen className="h-4 w-4" /> Study this subject
            </CardTitle>
            <CardDescription>Notes, units and past questions for {space.subjectName}.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href={space.subjectHref} className="text-sm font-semibold text-primary hover:underline">
              Open {space.subjectName} →
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <HelpCircle className="h-4 w-4" /> Stuck on something?
            </CardTitle>
            <CardDescription>Ask the Veer tutor a {space.subjectName} question.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href={`/ask?space=${encodeURIComponent(space.id)}`}
              className="text-sm font-semibold text-primary hover:underline"
            >
              Go to the Ask board →
            </Link>
          </CardContent>
        </Card>
      </div>
      <ComingSoon
        title={`${space.subjectName} discussions`}
        kind="Notes"
        message="Peer discussion threads need a community backend, which is not built yet. Until then, use the Ask board for tutor answers."
        backHref="/community"
        backLabel="All spaces"
      />
    </div>
  );
}
