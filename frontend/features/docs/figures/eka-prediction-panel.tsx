// Eka-silicon prediction panel. Theme-aware.
export function EkaPredictionPanel({ className }: { className?: string }) {
  const rows: [string, string, string][] = [
    ["Atomic mass", "predicted 72", "found 72.6 (Ge)"],
    ["Density", "predicted 5.5 g/cm³", "found 5.36 g/cm³"],
    ["Formula of oxide", "EO₂", "GeO₂ ✓"],
    ["Formula of chloride", "ECl₄", "GeCl₄ ✓"],
  ];
  return (
    <svg viewBox="0 0 720 230" className={className} role="img" aria-label="Mendeleev eka silicon prediction table compared with discovered germanium properties mass density oxide and chloride formulas matching closely">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Mendeleev's boldest call: eka-silicon → germanium</text>
      {rows.map(([prop, pred, found], i) => (
        <g key={prop}>
          <rect x="30" y={40 + i * 40} width="660" height="34" rx="8" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.3" style={{ color: "rgb(16 185 129 / 0.85)" }} />
          <text x="46" y={62 + i * 40} fontSize="9" className="fill-current text-foreground" fontWeight="800">{prop}</text>
          <text x="300" y={62 + i * 40} fontSize="9" className="fill-current text-emerald-600" fontWeight="700">{pred}</text>
          <text x="674" y={62 + i * 40} fontSize="9" textAnchor="end" className="fill-current text-foreground" fontWeight="700">{found}</text>
        </g>
      ))}
      <rect x="30" y="204" width="660" height="20" rx="8" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="218" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">He also left eka-aluminium (became gallium) and eka-boron (became scandium). Prediction power made the periodic law science, not bookkeeping.</text>
    </svg>
  );
}
