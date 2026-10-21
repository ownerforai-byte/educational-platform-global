import Link from "next/link";
import { ArrowRight, BookOpen, FlaskConical, GraduationCap, History, ListTree, MessageSquare, Sigma } from "lucide-react";

const classes = [
  { label: "Class 11", href: "/class-11-notes", description: "Build your foundations with subject notes and syllabus-organized chapters." },
  { label: "Class 12", href: "/class-12-notes", description: "Continue your studies with subject resources and board-exam preparation." },
];

const tools = [
  { title: "Past papers", href: "/pyqs", icon: History, description: "Review previous exam questions and worked solutions." },
  { title: "Formula sheets", href: "/formulas", icon: Sigma, description: "Find key equations for physics, chemistry and mathematics." },
  { title: "Interactive labs", href: "/lab", icon: FlaskConical, description: "Explore scientific concepts through models and simulations." },
  { title: "Ask Veer", href: "/chat", icon: MessageSquare, description: "Get help with a concept or work through a study question." },
];

const linkFocus = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/** A quiet entry point to existing study resources, not an autoplay content feed. */
export function HomeIntroduction() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-10 pb-8" data-testid="study-home">
      <section className="border-b border-border pb-8 pt-2 sm:pt-4" aria-labelledby="home-title">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">NEB Class 11 &amp; 12</p>
        <h1 id="home-title" className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Your study workspace</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Choose a class, review a topic, or prepare for an exam. The study
          library brings notes, practice questions and learning tools together.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/subjects" className={`inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 ${linkFocus}`}>
            <BookOpen className="h-4 w-4" aria-hidden="true" />Browse subjects
          </Link>
          <Link href="/syllabus" className={`inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-card px-5 text-sm font-medium transition-colors hover:bg-muted ${linkFocus}`}>
            View syllabus<ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section aria-labelledby="class-heading">
        <h2 id="class-heading" className="text-xl font-semibold tracking-tight">Choose your class</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {classes.map((item) => (
            <Link key={item.href} href={item.href} className={`group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50 ${linkFocus}`}>
              <GraduationCap className="h-6 w-6 text-primary" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-semibold">{item.label}</h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">Open {item.label}<ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="tools-heading">
        <h2 id="tools-heading" className="text-xl font-semibold tracking-tight">Study tools</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {tools.map(({ title, href, icon: Icon, description }) => (
            <Link key={href} href={href} className={`rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50 ${linkFocus}`}>
              <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
              <h3 className="mt-4 text-sm font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section aria-label="More resources" className="flex flex-col gap-4 rounded-xl border border-border bg-muted/20 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold">Looking for another resource?</h2>
          <p className="mt-1 text-sm text-muted-foreground">Browse the full directory for proofs, mindmaps, reference materials and more.</p>
        </div>
        <Link href="/site-index" className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg px-3 text-sm font-medium text-primary hover:bg-muted ${linkFocus}`}>
          <ListTree className="h-4 w-4" aria-hidden="true" />All resources
        </Link>
      </section>
    </div>
  );
}
