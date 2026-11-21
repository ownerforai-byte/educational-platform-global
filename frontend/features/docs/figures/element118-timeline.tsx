// Element 118 timeline: temporary to permanent name. Theme-aware.
export function Element118Timeline({ className }: { className?: string }) {
  const stops: [string, string, string][] = [
    ["2002–2006", "Synthesised at Dubna/LLNL — 118 protons", "rgb(139 92 246 / 0.9)"],
    ["Temporary name", "ununoctium (Uuo) — digit roots 1·1·8", "rgb(14 165 233 / 0.9)"],
    ["2016", "IUPAC confirms → permanent name Oganesson (Og)", "rgb(16 185 129 / 0.9)"],
  ];
  return (
    <svg viewBox="0 0 720 190" className={className} role="img" aria-label="Element 118 timeline temporary name ununoctium Uuo replaced by permanent name Oganesson Og in 2016 after IUPAC confirmation">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Element 118 — from temporary name to Oganesson</text>
      <line x1="70" y1="80" x2="650" y2="80" className="stroke-current text-muted-foreground" strokeWidth="2" style={{ color: "rgb(120 120 130 / 0.8)" }} />
      {stops.map(([t, d, color], i) => (
        <g key={t}>
          <circle cx={130 + i * 250} cy="80" r="9" className="fill-current" style={{ color }} />
          <text x={130 + i * 250} y={58} fontSize="9" textAnchor="middle" className="fill-current" style={{ color }} fontWeight="800">{t}</text>
          <text x={130 + i * 250} y={108} fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">{d}</text>
        </g>
      ))}
      <rect x="30" y="136" width="660" height="40" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="154" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">Systematic names are placeholders: once discovery is verified, the temporary three-syllable name is retired.</text>
      <text x="360" y="170" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Og sits at group 18, period 7 — a "noble gas" heavier than radon, probably not so noble in behaviour.</text>
    </svg>
  );
}
