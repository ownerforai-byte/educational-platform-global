// Avogadro number scale panel. Theme-aware.
export function AvogadroNumberPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Avogadro number six point zero two two times ten to twenty three particles per mole with scale comparisons grains of sand and seconds">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">6.022 × 10²³ — the number that makes chemistry countable</text>
      <rect x="30" y="42" width="660" height="52" rx="10" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="66" fontSize="12" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">1 mole = 6.022 × 10²³ particles</text>
      <text x="360" y="86" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">atoms, molecules, ions or electrons — the unit must be named in the answer</text>
      {[
        ["12 g of C-12", "exactly this many atoms — the definition"],
        ["22.4 L of any gas at STP", "this many molecules — Avogadro's law"],
        ["1 F of charge", "this many electrons — electrochemistry"],
      ].map(([t, d], i) => (
        <g key={t}>
          <rect x="30" y={106 + i * 30} width="660" height="24" rx="7" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.3" style={{ color: "rgb(16 185 129 / 0.85)" }} />
          <text x="46" y={123 + i * 30} fontSize="8.6" className="fill-current text-emerald-600" fontWeight="800">{t}</text>
          <text x="674" y={123 + i * 30} fontSize="8.2" textAnchor="end" className="fill-current text-muted-foreground">{d}</text>
        </g>
      ))}
      <rect x="30" y="176" width="660" height="24" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="192" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Scale sense: that many seconds would outlast the age of the universe by a factor of a million — counting atoms one by one is impossible; moles do it in bulk.</text>
    </svg>
  );
}
