import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Search, BookOpen, Mail } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ articleSlug: string }>;
}): Promise<Metadata> {
  const { articleSlug } = await params;
  const title = articleSlug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  return { title, description: `Help article: ${title}.` };
}

const HELP_ARTICLES: Record<string, { title: string; sections: { heading: string; body: string }[] }> = {
  "account-approval": {
    title: "Account Approval",
    sections: [
      {
        heading: "How approval works",
        body: "After signing, the account is approved by the system verification and administrative approval.",
      },
      {
        heading: "Checking your status",
        body: "After signing, the account is approved by the system verification and administrative approval.",
      },
      {
        heading: "What to do while you wait",
        body: "Guest access is available immediately — you can use the home chat box. After signing, the account is approved by the system verification and administrative approval.",
      },
    ],
  },
  "ai-sparks": {
    title: "AI Sparks & Daily Limits",
    sections: [
      {
        heading: "What are AI sparks?",
        body: "AI sparks are the daily message budget for Veer AI chat. Each tier gets a different daily allowance: Members get 13 messages per day, Plus gets more, and Pro gets the highest allowance.",
      },
      {
        heading: "When do sparks reset?",
        body: "The spark pool resets every 24 hours at midnight Nepal Standard Time. Unused sparks do not carry over.",
      },
      {
        heading: "Running out of sparks",
        body: "If you use all your daily sparks, you can wait for the reset or use the credits wallet for additional messages. Credits are separate from sparks and do not expire daily.",
      },
    ],
  },
  "content-unlocks": {
    title: "Content Unlocks & Tiers",
    sections: [
      {
        heading: "How content access works",
        body: "Guest content is free. Each plan opens a different set of sections, including AI Studio, 3D labs, mock exams, and analytics. After signing, the account is approved by the system verification and administrative approval.",
      },
      {
        heading: "Account approval",
        body: "After signing, the account is approved by the system verification and administrative approval.",
      },
      {
        heading: "Upgrading your tier",
        body: "Visit the Plans page to compare what each plan includes.",
      },
    ],
  },
  "troubleshooting": {
    title: "Troubleshooting",
    sections: [
      {
        heading: "Page not loading",
        body: "If a page is blank or stuck on a spinner, try refreshing. The backend may be spinning up from a cold start (Render) — wait 10–15 seconds and retry.",
      },
      {
        heading: "401 Unauthorized",
        body: "If you see 'Unauthorized' on a page you should have access to, your session may have expired. Sign out and sign back in. If the problem persists, leave a message to this email; sahrocky81@gmail.com.",
      },
      {
        heading: "Content looks wrong",
        body: "If a note has an error, a broken link, or an outdated fact, report it via the Feedback page or the Contact page. Include the exact URL and the sentence that needs correction.",
      },
    ],
  },
};

export default async function HelpArticlePage({
  params,
}: {
  params: Promise<{ articleSlug: string }>;
}) {
  const { articleSlug } = await params;
  const article = HELP_ARTICLES[articleSlug];

  return (
    <div className="mx-auto max-w-3xl space-y-8 py-10 px-4">
      {article ? (
        <>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{article.title}</h1>
            <p className="mt-2 text-muted-foreground">Help Center article</p>
          </div>
          <div className="space-y-6">
            {article.sections.map((s, i) => (
              <section key={i}>
                <h2 className="text-lg font-semibold text-foreground">{s.heading}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </section>
            ))}
          </div>
        </>
      ) : (
        <>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Article not found</h1>
            <p className="mt-2 text-muted-foreground">
              We couldn&apos;t find a help article with that title. Try searching
              the Help Center instead.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/help"
              className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm transition-colors hover:bg-muted/50"
            >
              <Search className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">Search Help Center</p>
                <p className="text-sm text-muted-foreground">Browse all articles</p>
              </div>
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm transition-colors hover:bg-muted/50"
            >
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">Leave a message to this email; sahrocky81@gmail.com</p>
                <p className="text-sm text-muted-foreground">Get a direct answer</p>
              </div>
            </Link>
          </div>
        </>
      )}

      <Link
        href="/help"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Help Center
      </Link>
    </div>
  );
}
