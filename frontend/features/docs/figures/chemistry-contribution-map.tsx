// Chemistry's contribution across industries. Theme-aware.
export function ChemistryContributionMap({ className }: { className?: string }) {
  const sectors: [string, string][] = [
    ["Fertiliser industry", "urea, ammonium sulphate feed the soil"],
    ["Pharmaceutical industry", "synthesis and quality control of drugs"],
    ["Petroleum industry", "refining, cracking, fuel grades"],
    ["Textile industry", "dyes, synthetic fibres, finishing"],
  ];
  return (
    <svg viewBox="0 0 720 230" className={className} role="img" aria-label="Chemistry contribution to fertiliser pharmaceutical petroleum and textile industries with specific outputs">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Chemistry runs the industries</text>
      <rect x="270" y="42" width="180" height="34" rx="9" className="fill-current text-sky-500/15" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="64" fontSize="10" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">CHEMICAL KNOWLEDGE</text>
      {sectors.map(([t, d], i) => {
        const x = 40 + i * 168;
        return (
          <g key={t}>
            <line x1="360" y1="76" x2={x + 80} y2="106" className="stroke-current text-muted-foreground" strokeWidth="1.3" />
            <rect x={x} y="106" width="160" height="66" rx="9" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(16 185 129 / 0.85)" }} />
            <text x={x + 80} y="128" fontSize="8.6" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="800">{t}</text>
            <text x={x + 80} y="148" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">{d.slice(0, 30)}</text>
            <text x={x + 80} y="162" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">{d.slice(30, 60)}</text>
          </g>
        );
      })}
      <rect x="30" y="192" width="660" height="28" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="210" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Quote one named product per industry in the answer — specificity is what the mark scheme rewards.</text>
    </svg>
  );
}
