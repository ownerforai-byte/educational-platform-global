import Link from "next/link";
import { BookOpen, FlaskConical, History, ShieldCheck } from "lucide-react";
import { ACCESS_NOTICE } from "@/features/auth/components/access-notice";
import { VisitorHomeChat } from "@/components/home/visitor-home-chat";

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
    description: "Labs and simulations are not free. They open on the Plus plan.",
    icon: FlaskConical,
  },
];

/**
 * THE GUEST HOME (owner direction 2026-10-25: the flow is "welcome → guest
 * home → login page → study home", and the guest home is designed "with only
 * one or two buttons with sign in, hide others").
 *
 * It is the visitor's home body: the shell's public chrome (header + footer,
 * no search bar, no quick links) wraps it, the sign-in button is the only
 * action on the page (the shell's account button is the second one), and the
 * rest is informational copy. Account request and plan CTAs stay hidden here;
 * sign-up remains on the login page and plans stay on /plans.
 */
export function HomePublic() {
  return (
    <div data-testid="public-home" className="mx-auto w-full max-w-7xl">
      <header className="mb-5 flex flex-col gap-3 border-b border-border/60 pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">NEB Class 11 &amp; 12</p>
          <h1 id="landing-title" className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Your NEB syllabus, organized for daily study.
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            A short look at how Class 11 and 12 study is organized. Labs, simulations, and Veer open after you sign in, on the plan that includes them.
          </p>
        </div>
        <Link
          href="/login"
          className="inline-flex min-h-10 w-fit shrink-0 items-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Sign in
        </Link>
      </header>

      <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <section aria-labelledby="guest-study-title" className="min-w-0">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <h2 id="guest-study-title" className="text-base font-semibold">Guest study space</h2>
              <p className="mt-1 text-xs text-muted-foreground">Ask a question or preview the study flow.</p>
            </div>
            <span className="shrink-0 rounded-full border border-border/70 px-2.5 py-1 text-[11px] text-muted-foreground">Guest view</span>
          </div>
          <VisitorHomeChat />
        </section>

        <aside className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
          <section aria-labelledby="resources-title" className="rounded-xl border border-border bg-card p-4">
            <h2 id="resources-title" className="text-base font-semibold tracking-tight">Study resources</h2>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Follow one syllabus map from unit to topic.
            </p>
            <div className="mt-2 flex flex-col divide-y divide-border/70">
              {resources.map(({ title, description, icon: Icon }) => (
                <article key={title} className="flex gap-3 py-3 first:pt-2 last:pb-1">
                  <Icon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold">{title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="access-title" className="rounded-xl border border-border bg-muted/20 p-4">
            <h2 id="access-title" className="flex items-center gap-2 text-sm font-semibold">
              <ShieldCheck className="size-4 text-primary" aria-hidden="true" />
              Account access
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-foreground">{ACCESS_NOTICE}</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Sign in after your account has been approved. Available materials and usage limits depend on your plan.{" "}
              <Link
                href="/plans"
                className="font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                How access works
              </Link>
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
