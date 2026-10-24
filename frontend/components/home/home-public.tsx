import Link from "next/link";
import { ArrowRight, BookOpen, FlaskConical, History, ShieldCheck } from "lucide-react";
import { ACCESS_NOTICE } from "@/features/auth/components/access-notice";

export { ACCESS_NOTICE } from "@/features/auth/components/access-notice";

const resources = [
  {
    title: "Syllabus-led study",
    description: "Follow Class 11 and 12 in official NEB order — units, topics, and notes in one place.",
    icon: BookOpen,
  },
  {
    title: "Exam preparation",
    description: "Past questions, drills, and formula sheets aligned to how NEB papers are set.",
    icon: History,
  },
  {
    title: "Interactive science",
    description: "Labs, diagrams, and 3D models that make abstract ideas easier to remember.",
    icon: FlaskConical,
  },
];

export function HomePublic() {
  return (
    <div data-testid="public-home" className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/" aria-label="Ravikisan's Platform home" className="flex min-w-0 items-center gap-2.5 text-sm font-semibold tracking-tight hover:text-primary">
            <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">R</span>
            <span className="whitespace-nowrap">Ravikisan&apos;s Platform</span>
          </Link>
          <nav aria-label="Account" className="flex shrink-0 items-center gap-2">
            <Link
              href="/login"
              className="inline-flex min-h-10 items-center rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Sign in
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl space-y-14 px-4 py-12 sm:px-6 sm:py-16">
        <section aria-labelledby="landing-title" className="max-w-3xl">
          <p className="text-sm font-semibold tracking-wide text-primary">NEB Class 11 &amp; 12</p>
          <h1 id="landing-title" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Your NEB syllabus, organized for daily study.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:mt-5 sm:text-lg">
            Notes, past papers, labs, and progress tools for Class 11 and 12 — built around the official curriculum, not scattered PDFs.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/signup"
              className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Request an account <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/notice"
              className="inline-flex min-h-11 items-center rounded-lg border border-border px-5 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              How access works
            </Link>
            <Link
              href="/plans"
              className="inline-flex min-h-11 items-center rounded-lg border border-border px-5 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              See all plans
            </Link>
          </div>
        </section>

        <section aria-labelledby="resources-title">
          <div className="max-w-2xl">
            <h2 id="resources-title" className="text-xl font-semibold tracking-tight">Study resources</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Everything routes through the same syllabus map — so you always know what to read next.
            </p>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {resources.map(({ title, description, icon: Icon }) => (
              <article key={title} className="rounded-xl border border-border bg-card p-5 sm:p-6">
                <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                <h3 className="mt-4 text-base font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="access-title" className="rounded-xl border border-border bg-muted/20 p-5 sm:p-6">
          <h2 id="access-title" className="flex items-center gap-2 text-base font-semibold">
            <ShieldCheck className="h-5 w-5 text-primary" aria-hidden="true" />
            Account access
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground">{ACCESS_NOTICE}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Sign in after your account has been approved. Available materials and usage limits depend on your plan.
          </p>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>© {new Date().getFullYear()} Ravikisan&apos;s Platform · NEB Class 11 &amp; 12</span>
          <Link href="/notice" className="min-h-10 inline-flex items-center hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Access notice
          </Link>
        </div>
      </footer>
    </div>
  );
}
