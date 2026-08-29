import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Class12Page() {
  const sections = [
    {
      title: "Class 12 Notes",
      description: "Comprehensive notes for Class 12 subjects.",
      href: "/class-12-notes",
    },
    {
      title: "Class 12E",
      description: "Extra materials and practice for Class 12E.",
      href: "/class-12e",
    },
    {
      title: "Class 12 More",
      description: "Additional resources and supplementary content for Class 12.",
      href: "/class-12-more",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-8 py-10">
      <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-background to-background p-8 shadow-lg">
        <h1 className="text-4xl font-bold tracking-tight">Class 12</h1>
        <p className="mt-2 text-muted-foreground">
          NEB Class 12 subjects, chapters, and resources.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <Link key={section.href} href={section.href}>
            <Card className="h-full transition-colors hover:border-primary">
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{section.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
