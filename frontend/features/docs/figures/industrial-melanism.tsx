/** Industrial melanism — peppered moth selection. Theme-aware. */
export function IndustrialMelanism({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 220" className={className} role="img" aria-label="Industrial melanism peppered moth pale on lichen trees before pollution dark mutant camouflaged on soot darkened trunks after birds eat pale form dark moths rise above 90 percent pollution control reverses trend">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Industrial melanism — selection demonstrated in real time</text>

      {/* before */}
      <rect x="40" y="50" width="280" height="110" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="180" y="72" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">BEFORE (lichen-covered trunks)</text>
      <circle cx="150" cy="100" r="7" className="fill-current text-stone-200" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="170" y="104" fontSize="7.2" className="fill-current text-muted-foreground">pale moth — camouflaged ✓</text>
      <circle cx="150" cy="130" r="7" className="fill-current text-stone-800" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(38 38 38 / 0.9)" }} />
      <text x="170" y="134" fontSize="7.2" className="fill-current text-muted-foreground">dark mutant — eaten ✗</text>

      {/* after */}
      <rect x="340" y="50" width="280" height="110" rx="12" className="fill-current text-stone-700/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="480" y="72" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">AFTER (soot-darkened trunks)</text>
      <circle cx="450" cy="100" r="7" className="fill-current text-stone-200" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="470" y="104" fontSize="7.2" className="fill-current text-muted-foreground">pale moth — eaten ✗</text>
      <circle cx="450" cy="130" r="7" className="fill-current text-stone-800" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(38 38 38 / 0.9)" }} />
      <text x="470" y="134" fontSize="7.2" className="fill-current text-muted-foreground">dark form — camouflaged ✓ (&gt;90%)</text>

      <text x="16" y="188" fontSize="8.6" className="fill-current text-muted-foreground">Predators (birds) ate the mismatched form. Pollution control reversed the trend — Kettlewell's confirmation.</text>
    </svg>
  );
}
