// FuelAdditiveTimeline figure. Theme-aware.
export function FuelAdditiveTimeline({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="History of gasoline additives from tetraethyl lead to ethanol blending">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Octane on tap: the additive story</text>
      <line x1="60" y1="110" x2="600" y2="110" stroke="rgb(148 163 184)" strokeWidth="3" />
      {[
        ["1920s", "TEL Pb(C₂H₅)₄ — cheap octane", "rgb(239 68 68)", 100],
        ["1970s–", "lead phased out: poisoning + catalysts", "rgb(245 158 11)", 300],
        ["today", "MTBE (restricted) · ethanol blends", "rgb(16 185 129)", 500],
      ].map(([yr, d, col, x], i) => (
        <g key={i}>
          <circle cx={x as number} cy="110" r="7" fill={col as string} />
          <text x={x as number} y="88" fontSize="11" fontWeight="800" textAnchor="middle" fill={col as string}>{yr as string}</text>
          <text x={x as number} y="140" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="180" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">TEL raised octane at parts-per-thousand doses — and laced the world's cities with lead</text>
      <text x="330" y="203" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">modern octane comes from reforming, branching, and renewable ethanol blending</text>
      <text x="330" y="225" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">MTBE is itself being restricted for groundwater contamination</text>
    </svg>
  );
}
