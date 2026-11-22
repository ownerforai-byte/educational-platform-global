// Chemistry in agriculture. Theme-aware.
export function AgricultureChemistryPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Chemistry in agriculture fertilisers pesticides weedicides and soil testing with NPK concept">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Chemistry in the field</text>
      {[
        ["Fertilisers", "urea, DAP, MOP supply N, P, K — the NPK idea", 30, 44],
        ["Crop protection", "pesticides, fungicides, weedicides — dose decides", 370, 44],
        ["Soil testing", "pH and NPK analysis before every planting season", 30, 116],
        ["Post-harvest", "ripening chemicals, storage fumigants, preservatives", 370, 116],
      ].map(([t, d, x, y]) => (
        <g key={String(t)}>
          <rect x={Number(x)} y={Number(y)} width="320" height="62" rx="10" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(16 185 129 / 0.85)" }} />
          <text x={Number(x) + 16} y={Number(y) + 22} fontSize="9.5" className="fill-current text-emerald-600" fontWeight="800">{String(t)}</text>
          <text x={Number(x) + 16} y={Number(y) + 42} fontSize="7.8" className="fill-current text-muted-foreground">{String(d).slice(0, 46)}</text>
          <text x={Number(x) + 16} y={Number(y) + 54} fontSize="7.8" className="fill-current text-muted-foreground">{String(d).slice(46, 92)}</text>
        </g>
      ))}
      <rect x="30" y="188" width="660" height="16" rx="0" />
      <text x="360" y="202" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Nepal hook: the green-revolution yield gains and today's soil-acidity problems both trace to fertiliser chemistry.</text>
    </svg>
  );
}
