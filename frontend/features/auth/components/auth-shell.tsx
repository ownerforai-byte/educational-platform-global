import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronLeft } from "lucide-react";

/**
 * AuthShell — the reference auth screen (owner 2026-11-09): one centered
 * column like the mobile mock — circular back chip, the brand wordmark
 * ("Rainer", deliberately NO ".com"), the screen title and subtitle, then the
 * form. The brand mark keeps the crimson identity of the reference screens.
 */
export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pb-10">
        {/* Back — circular chip like the reference */}
        <Link
          href="/home"
          aria-label="Back to home"
          className="mt-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#FCE8EC] text-[#D2223D] transition-colors hover:bg-[#F8D7DE]"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>

        {/* Brand — "Rainer", never "Rainer.com" */}
        <Link href="/" className="mt-7 flex items-center justify-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D2223D] text-lg font-extrabold text-white shadow-md shadow-[#D2223D]/25">
            R
          </span>
          <span className="text-[26px] font-extrabold tracking-tight text-[#D2223D]">
            Rainer
          </span>
        </Link>

        {/* Title block */}
        <div className="mt-8 text-center">
          <h1 className="text-[28px] font-extrabold leading-tight tracking-tight sm:text-3xl">
            {title}
          </h1>
          <p className="mx-auto mt-2.5 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
            {subtitle}
          </p>
        </div>

        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}
