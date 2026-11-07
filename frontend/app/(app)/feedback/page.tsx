import type { Metadata } from "next";
import Link from "next/link";
import { MessageSquare, ArrowLeft, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Feedback",
  description: "Send feedback, report issues or suggest topics.",
};

const CATEGORIES = [
  {
    icon: "📋",
    title: "Content correction",
    description:
      "Report a wrong answer, typo, outdated fact, or a broken note link. Include the page URL and the exact sentence.",
    href: "/contact",
  },
  {
    icon: "💡",
    title: "Suggest a topic",
    description:
      "Request a new note, PYQ, lab, or visual. Tell us the subject and unit it belongs to.",
    href: "/contact",
  },
  {
    icon: "🐛",
    title: "Report a bug",
    description:
      "Something broken or not loading? Include your device, browser, and the steps to reproduce.",
    href: "/contact",
  },
  {
    icon: "⭐",
    title: "Feature request",
    description:
      "Suggest a new feature or improvement. Describe what you want and why it would help.",
    href: "/contact",
  },
];

export default function FeedbackPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 py-10 px-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <MessageSquare className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Feedback</h1>
          <p className="mt-1 text-muted-foreground">
            Report wrong content, suggest new topics or rate your experience —
            your feedback shapes the platform.
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {CATEGORIES.map((c) => (
          <Link
            key={c.title}
            href={c.href}
            className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-colors hover:bg-muted/50"
          >
            <div className="text-2xl">{c.icon}</div>
            <h2 className="mt-2 font-semibold text-foreground">{c.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>
            <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              Submit via contact page
              <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-muted/40 p-5">
        <p className="text-sm text-muted-foreground">
          All feedback is routed through the owner&apos;s contact channel. There
          is no automated form that pretends to send — your report goes to a real
          person who reads it. Include as much detail as you can.
        </p>
      </div>

      <Link
        href="/home"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>
    </div>
  );
}
