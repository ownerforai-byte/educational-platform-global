/** Taxes vs kinesis contrast — directed vs random movement. Well-detailed. Theme-aware. */
export function TaxesKinesisContrast({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Taxes versus kinesis contrast directed movement toward or away stimulus woodlice humidity random speed turning positive phototaxis chemotaxis examples moths light earthworm">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Taxes vs kinesis — aimed vs random movement</text>
      {/* taxis */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">TAXIS — AIMED</text>
      <circle cx="195" cy="140" r="16" className="fill-current text-amber-500/40" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="195" y="110" fontSize="6.2" textAnchor="middle" className="fill-current text-amber-600" fontWeight="700">stimulus (light)</text>
      {[[120, 160], [150, 175], [240, 160], [270, 175]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="5" className="fill-current text-sky-500/40" style={{ color: "rgb(2 132 199 / 0.9)" }} />
          <path d={`M${x} ${y} L${195 + (x - 195) * 0.35} ${y - 22} m-4 6 l4 -6 l5 4`} className="fill-none stroke-current" strokeWidth="1.4" style={{ color: "rgb(2 132 199 / 0.9)" }} />
        </g>
      ))}
      <text x="195" y="212" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">the whole body steers toward (positive) or away from (negative) the source</text>
      {/* kinesis */}
      <rect x="390" y="44" width="300" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">KINESIS — RANDOM BUT BIASED</text>
      <rect x="430" y="90" width="220" height="110" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.6" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <rect x="430" y="90" width="110" height="110" rx="0" className="fill-current text-sky-500/15" style={{ color: "rgb(2 132 199 / 0.5)" }} />
      <text x="485" y="86" fontSize="5.8" textAnchor="middle" className="fill-current text-sky-600">damp half</text>
      <text x="595" y="86" fontSize="5.8" textAnchor="middle" className="fill-current text-amber-600">dry half</text>
      {[[470, 130], [500, 150], [455, 160], [520, 120], [610, 120], [630, 160]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" className="fill-current text-emerald-500/50" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      ))}
      <text x="540" y="216" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">woodlice turn and move faster in dry air — no aim, but the statistics gather them in the damp</text>
      <rect x="30" y="240" width="660" height="52" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="258" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The distinction: taxis needs a direction sense; kinesis only adjusts speed or turning rate — yet both end up in the right place.</text>
      <text x="360" y="276" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: moth to light = positive phototaxis; earthworm from light = negative phototaxis; woodlouse in damp = kinesis.</text>
      <text x="360" y="288" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Name the stimulus type (photo-, chemo-, geo-) for full marks.</text>
    </svg>
  );
}
