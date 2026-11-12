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
    description: "Labs and videos are not free. They open on the Plus plan.",
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
    <div data-testid="public-home" className="bg-background text-foreground">
      <div className="mx-auto w-full max-w-6xl space-y-14 px-4 py-12 sm:px-6 sm:py-16">
        <section aria-labelledby="landing-title" className="max-w-3xl">
          <p className="text-sm font-semibold tracking-wide text-primary">NEB Class 11 &amp; 12</p>
          <h1 id="landing-title" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Your NEB syllabus, organized for daily study.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:mt-5 sm:text-lg">
            A short look at how Class 11 and 12 study is organized. Labs, videos, and Veer open after you sign in, on the plan that includes them.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/login"
              className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Sign in
            </Link>
          </div>
          <div className="mt-8">
            <VisitorHomeChat />
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
              <article key={title} className="rounded-xl border-2 border-border/80 bg-card p-5 sm:p-6">
                <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                <h3 className="mt-4 text-base font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="access-title" className="rounded-xl border-2 border-border/80 bg-muted/20 p-5 sm:p-6">
          <h2 id="access-title" className="flex items-center gap-2 text-base font-semibold">
            <ShieldCheck className="h-5 w-5 text-primary" aria-hidden="true" />
            Account access
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground">{ACCESS_NOTICE}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Sign in as a Member, then wait for approval — available materials and usage limits depend on the plan granted after that.{" "}
            <Link
              href="/plans"
              className="font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              How access works
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
