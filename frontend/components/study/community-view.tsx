import Link from "next/link";
import { ArrowRight, HelpCircle, Users } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { listCommunitySpaces } from "@/lib/community";

/** /community: one study space per class and subject, each linking to its detail page. */
export function CommunityView() {
  const spaces = listCommunitySpaces();
  return (
    <div className="container max-w-5xl py-8 space-y-6">
      <div className="space-y-1">
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <Users className="h-6 w-6" /> Community
        </h1>
        <p className="text-sm text-muted-foreground">
          Pick your subject space. Have a doubt? Ask the Veer tutor on the{" "}
          <Link href="/ask" className="font-medium text-primary hover:underline">
            <HelpCircle className="inline h-3.5 w-3.5" /> Ask board
          </Link>
          .
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {spaces.map((s) => (
          <Link key={s.id} href={`/community/${s.id}`} className="group">
            <Card className="h-full transition-colors group-hover:border-primary/50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-base">
                  {s.subjectName}
                  <ArrowRight className="h-4 w-4 opacity-50 group-hover:opacity-100" />
                </CardTitle>
                <CardDescription>{s.className}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
