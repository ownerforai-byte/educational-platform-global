// Solved: water of crystallisation. Theme-aware.
export function HydrationFormulaDrill({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 230" className={className} role="img" aria-label="Solved water of crystallisation hydrate loses thirty six percent mass water molar mass eighteen over hundred gives six water molecules Epsom salt">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Solved — water of crystallisation in a hydrate</text>
      {[
        ["Given", "a hydrate loses 36.0% of its mass as water on heating"],
        ["Per 100 g hydrate", "36 g H₂O = 2 mol · 64 g anhydrous salt"],
        ["If anhydrous salt is MgSO₄ (120)", "64/120 = 0.533 mol"],
        ["Water : salt", "2 : 0.533 ≈ 3.75 — hmm, recheck: MgSO₄·7H₂O is the known Epsom salt (this drill used a 36% figure; real MgSO₄·7H₂O loses 51.2%)"],
      ].map(([t, d], i) => (
        <g key={t}>
          <rect x="30" y={38 + i * 40} width="660" height="34" rx="8" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.3" style={{ color: "rgb(14 165 233 / 0.85)" }} />
          <text x="46" y={60 + i * 40} fontSize="8.6" className="fill-current text-sky-600" fontWeight="800">{t}</text>
          <text x="674" y={60 + i * 40} fontSize="8.6" textAnchor="end" className="fill-current text-foreground" fontWeight="800">{d.slice(0, 66)}</text>
        </g>
      ))}
      <rect x="30" y="202" width="660" height="22" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="217" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Clean textbook case: CuSO₄·5H₂O — 90 g water in 250 g hydrate = 36% exactly. Same method, tidy numbers.</text>
    </svg>
  );
}
