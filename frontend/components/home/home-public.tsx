import Link from "next/link";
import { ArrowRight, BookOpen, FlaskConical, History, ShieldCheck } from "lucide-react";

export const ACCESS_NOTICE =
  "Login works after administrative approval and system verification only.";

/** Honest overview; the surrounding approval gate remains unchanged. */
export function HomePublic() {
  return (
    <div data-testid="public-home" className="mx-auto max-w-5xl space-y-8 py-6">
      <section className="rounded-xl border border-border bg-card p-6 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">NEB Class 11 &amp; 12</p>
        <h1 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">A focused place to study.</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Explore subject notes, practice with past papers, and understand concepts
          through interactive labs. Resources are organized around the NEB / CDC curriculum.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/login" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring">
            Sign in<ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/signup" className="inline-flex min-h-11 items-center rounded-lg border border-border px-5 text-sm font-medium hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring">Request an account</Link>
        </div>
      </section>
      <section aria-label="Study resources" className="grid gap-4 sm:grid-cols-3">
        {[
          { title: "Subject notes", text: "Find chapters and topics in syllabus order.", icon: BookOpen },
          { title: "Exam practice", text: "Review past questions and worked solutions.", icon: History },
          { title: "Interactive labs", text: "Explore concepts through models and simulations.", icon: FlaskConical },
        ].map(({ title, text, icon: Icon }) => (
          <div key={title} className="rounded-xl border border-border bg-card p-5">
            <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
            <h2 className="mt-3 text-base font-semibold">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
          </div>
        ))}
      </section>
      <section aria-labelledby="access-heading" className="rounded-xl border border-border p-5">
        <h2 id="access-heading" className="flex items-center gap-2 text-sm font-semibold"><ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />Account access</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{ACCESS_NOTICE} Resource access and usage limits depend on your plan.</p>
        <Link href="/notice" className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-primary hover:underline">Read the access notice</Link>
      </section>
    </div>
  );
}
