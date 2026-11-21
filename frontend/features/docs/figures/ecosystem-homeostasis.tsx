/** Ecosystem homeostasis — how a pond resists change. Well-detailed. Theme-aware. */
export function EcosystemHomeostasis({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Ecosystem homeostasis self regulation feedback balance population oscillation resistance change pond example stability equilibrium">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Homeostasis — the ecosystem's self-correction</text>

      {/* feedback loop */}
      <rect x="30" y="44" width="400" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="230" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE NEGATIVE FEEDBACK LOOP</text>
      <rect x="70" y="90" width="140" height="38" rx="8" className="fill-current text-emerald-600/25" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      <text x="140" y="114" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground">deer population rises</text>
      <rect x="250" y="90" width="140" height="38" rx="8" className="fill-current text-sky-600/25" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="320" y="114" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground">grass gets overgrazed</text>
      <rect x="250" y="170" width="140" height="38" rx="8" className="fill-current text-rose-500/20" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="320" y="194" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground">deer starve, fewer fawns</text>
      <rect x="70" y="170" width="140" height="38" rx="8" className="fill-current text-emerald-600/25" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      <text x="140" y="194" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground">grass recovers</text>
      {[[210, 109, 246, 109], [320, 132, 320, 166], [246, 189, 214, 189], [140, 166, 140, 132]].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-current text-stone-500" strokeWidth="2" markerEnd="url(#arrhl)" />
      ))}
      <text x="230" y="240" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">the loop pulls the population back toward balance — no ruler needed</text>

      {/* limits */}
      <rect x="450" y="44" width="240" height="220" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="570" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">BUT IT HAS LIMITS</text>
      {[
        "handles normal ups and downs",
        "fails against massive shocks:",
        "  oil spill, clear-felling, dam",
        "recovery needs time and all",
        "  species still present",
        "resilience falls as diversity falls",
      ].map((t, i) => (
        <text key={t} x="466" y={94 + i * 17} fontSize="7.2" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <text x="466" y="204" fontSize="7" className="fill-current text-emerald-600">More species = more feedback loops</text>
      <text x="466" y="218" fontSize="7" className="fill-current text-emerald-600">= steadier system.</text>
      <text x="466" y="244" fontSize="7" className="fill-current text-muted-foreground">Exam hook: define homeostasis,</text>
      <text x="466" y="258" fontSize="7" className="fill-current text-muted-foreground">then give one worked loop.</text>
    </svg>
  );
}
