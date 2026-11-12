import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * INDEPENDENCE DISCLAIMER — Google Play "Misleading Claims" rejection.
 *
 * The app hands students NEB syllabus, notes and past questions, so Play needs
 * the non-affiliation stated in the app itself and not only in the listing or
 * the privacy policy. This one component keeps the wording byte-identical
 * everywhere it appears (home, sign-in, sign-up) and always links to the
 * official-sources page, so a reviewer can reach the government domains in one
 * tap from the same place the claim appears.
 *
 * Tone rule for anything added near it: say "built for the NEB Class 11 & 12
 * syllabus", never "official NEB app".
 */
export const INDEPENDENCE_DISCLAIMER =
  "Verner is an independent educational platform and is NOT affiliated with, endorsed by, authorized by, or connected to the National Examination Board (NEB), the Curriculum Development Centre (CDC), or any government entity of Nepal.";

export function IndependenceDisclaimer({
  variant = "full",
  className,
}: {
  /** `full` = banner with heading; `compact` = one-line note under a form. */
  variant?: "full" | "compact";
  className?: string;
}) {
  if (variant === "compact") {
    return (
      <p
        className={cn(
          "rounded-xl border border-amber-500/30 bg-amber-500/[0.07] px-3.5 py-2.5 text-[11px] leading-relaxed text-amber-700 dark:text-amber-400",
          className,
        )}
      >
        <span className="font-bold">Disclaimer: </span>
        {INDEPENDENCE_DISCLAIMER}{" "}
        <Link href="/official-sources" className="font-bold underline underline-offset-2">
          Official sources
        </Link>
      </p>
    );
  }

  return (
    <section
      aria-label="Government affiliation disclaimer"
      className={cn(
        "flex items-start gap-3 rounded-2xl border border-amber-500/40 bg-amber-500/[0.08] px-4 py-3.5 text-left",
        className,
      )}
    >
      <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden="true" />
      <p className="text-[12px] leading-relaxed text-amber-800 dark:text-amber-300">
        <span className="font-extrabold uppercase tracking-wide">Disclaimer: </span>
        {INDEPENDENCE_DISCLAIMER}{" "}
        <Link
          href="/official-sources"
          className="font-bold underline underline-offset-2 hover:text-amber-900 dark:hover:text-amber-200"
        >
          See the official government sources
        </Link>
        .
      </p>
    </section>
  );
}
