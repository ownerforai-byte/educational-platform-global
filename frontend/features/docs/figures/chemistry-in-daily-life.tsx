// Organic chemistry presence in daily life. Theme-aware.
export function ChemistryInDailyLife({ className }: { className?: string }) {
  const items: [string, string][] = [
    ["Fuels", "LPG, petrol, diesel — hydrocarbons"],
    ["Clothes", "cotton (cellulose), polyester (polymer)"],
    ["Food", "carbohydrates, proteins, fats — all organic"],
    ["Medicines", "aspirin, paracetamol — carbon skeletons"],
  ];
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Organic chemistry in daily life fuels clothes food and medicines all built on carbon compounds">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Why organic chemistry owns daily life — carbon everywhere</text>
      {items.map(([t, d], i) => (
        <g key={t}>
          <rect x={30 + (i % 2) * 340} y={44 + Math.floor(i / 2) * 62} width="320" height="52" rx="10" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(16 185 129 / 0.85)" }} />
          <text x={46 + (i % 2) * 340} y={66 + Math.floor(i / 2) * 62} fontSize="9.5" className="fill-current text-emerald-600" fontWeight="800">{t}</text>
          <text x={46 + (i % 2) * 340} y={84 + Math.floor(i / 2) * 62} fontSize="8" className="fill-current text-muted-foreground">{d}</text>
        </g>
      ))}
      <rect x="30" y="172" width="660" height="26" rx="8" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="189" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Common thread: every example is built on catenated carbon chains — the property that makes organic chemistry a branch of its own.</text>
    </svg>
  );
}
