import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Atom, BookOpen, FlaskConical, Network } from "lucide-react";

export default function Class11Page() {
  const sections = [
    {
      title: "Class 11 Notes",
      description: "Comprehensive notes for Class 11 subjects.",
      href: "/class-11-notes",
      icon: BookOpen,
    },
    {
      title: "Class 11E",
      description: "Extra materials and practice for Class 11E.",
      href: "/class-11e",
      icon: FlaskConical,
    },
    {
      title: "Class 11 More",
      description: "Additional resources and supplementary content for Class 11.",
      href: "/class-11-more",
      icon: Atom,
    },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-8 py-10">
      <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-background to-background p-8 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Class 11</h1>
            <p className="mt-2 text-muted-foreground">
              NEB Class 11 subjects, chapters, and resources.
            </p>
          </div>
          <Link href="/class-11/mindmap">
            <Button variant="outline" size="lg" className="gap-2">
              <Atom className="h-4 w-4" />
              <span className="hidden sm:inline">Motion Graphics Labs</span>
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <Link key={section.href} href={section.href}>
            <Card className="h-full transition-colors hover:border-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {section.icon && <section.icon className="h-5 w-5" />}
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{section.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Access to Motion Graphics Labs */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Atom className="h-5 w-5 text-primary" />
            🎯 New: Motion Graphics Labs
          </CardTitle>
          <CardDescription>
            11 interactive 3D labs for Class 11 Physics, Chemistry & Math - All FREE!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/class-11/mindmap">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Network className="h-4 w-4" />
                View All Labs Mindmap
              </Button>
            </Link>
            <Link href="/lab?activeSubject=class11">
              <Button variant="default" className="w-full justify-start gap-2">
                <FlaskConical className="h-4 w-4" />
                Open Labs in Lab Section
              </Button>
            </Link>
          </div>
          <div className="mt-4 p-3 bg-primary/5 rounded-lg">
            <p className="text-xs text-muted-foreground text-center">
              ✅ All 11 motion graphics labs are FREE and accessible immediately!
              <br />
              💳 Use your ~20K credits to unlock premium labs
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
