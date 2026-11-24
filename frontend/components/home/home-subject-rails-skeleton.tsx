/**
 * Suspense fallback for the async subject-rail shell.
 *
 * Mirrors the journey strip's busy skeleton: a few rail-shaped bars, no
 * corpus or formula/PYQ imports, so this module stays safe to render while
 * HomeSubjectRails is still awaiting its server data.
 */
export function HomeSubjectRailsSkeleton() {
  return (
    <section
      aria-label="Subject knowledge rails"
      aria-busy="true"
      className="relative border-b border-border/80 py-14 sm:py-16"
    >
      <div className="mx-auto max-w-6xl space-y-4 px-4">
        <div className="h-7 w-56 max-w-full animate-pulse rounded-full bg-muted" />
        <div className="h-10 max-w-xl animate-pulse rounded-xl bg-muted/80" />
        <div className="h-16 max-w-3xl animate-pulse rounded-xl bg-muted/60" />
      </div>
      <div className="mt-8 space-y-6 overflow-hidden">
        {["physics", "chemistry", "biology"].map((rail) => (
          <div key={rail} className="flex gap-4 px-4">
            <div className="h-40 w-[min(22rem,calc(100vw-2.5rem))] shrink-0 animate-pulse rounded-2xl bg-muted/70" />
            <div className="hidden h-40 w-[22rem] shrink-0 animate-pulse rounded-2xl bg-muted/50 sm:block" />
          </div>
        ))}
      </div>
    </section>
  );
}
