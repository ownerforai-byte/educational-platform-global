/**
 * The shared “we are checking this account right now” mark.
 * The words blink and the dots step so the wait reads as an active check.
 */
export function VerifyingStatus({
  label,
  compact = false,
}: {
  label: string;
  compact?: boolean;
}) {
  const words = label.replace(/[.\u2026]+$/, "").trim();
  return (
    <div
      role="status"
      aria-live="polite"
      className={
        compact
          ? "flex flex-col items-center gap-2 py-6"
          : "flex flex-col items-center gap-3"
      }
    >
      <span className="relative flex h-10 w-10 items-center justify-center" aria-hidden="true">
        <span className="verify-ring absolute inset-1 rounded-full border border-primary/40" />
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </span>
      <p className="text-sm font-medium tracking-tight text-foreground">
        <span className="verify-blink">{words}</span>
        <span className="verify-dots" aria-hidden="true">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      </p>
    </div>
  );
}
