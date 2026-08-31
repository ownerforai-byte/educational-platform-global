import Link from "next/link";

export default function Class11Page() {
  const sections = [
    {
      title: "Class 11 Notes",
      description: "Comprehensive notes for Class 11 subjects.",
      href: "/class-11-notes",
      emoji: "📝",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-8 py-8 md:py-14 px-4">
      <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-primary/8 via-background to-background p-8 md:p-10 shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">🎒 Class 11</h1>
        <p className="mt-2 text-muted-foreground">
          NEB Class 11 subjects, chapters, and resources.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <Link key={section.href} href={section.href}>
            <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg card-shimmer h-full">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xl">
                  {section.emoji}
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">{section.title}</h2>
                  <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{section.description}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
