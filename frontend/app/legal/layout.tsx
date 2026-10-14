import type { Metadata } from "next";
import Link from "next/link";
import "./legal.css";

export const metadata: Metadata = {
  title: "Legal — Ravikisan's Platform",
  description: "Privacy Policy, Terms of Service, Cookie Policy, and Purchase & Refund Policy for Ravikisan's Platform.",
};

const NAV = [
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms of Service", href: "/legal/terms" },
  { label: "Cookie Policy", href: "/legal/cookies" },
  { label: "Purchases & Refunds", href: "/legal/purchases" },
];

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto w-full max-w-3xl px-5 py-10 md:py-14"
    >
      <nav className="mb-6 flex flex-wrap gap-2" aria-label="Legal documents">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <article className="legal-prose rounded-2xl border border-border/50 bg-background/70 p-6 backdrop-blur-sm md:p-10">
        {children}
      </article>

      <p className="mt-6 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-primary">
          ← Back to home
        </Link>
        <span className="mx-2">·</span>
        Support: ravikisan1814@gmail.com
      </p>
    </main>
  );
}
