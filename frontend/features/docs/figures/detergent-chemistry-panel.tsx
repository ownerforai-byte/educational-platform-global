// Detergents and cleaning chemistry. Theme-aware.
export function DetergentChemistryPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Detergent molecule hydrophilic head and hydrophobic tail forming micelles lifting grease into water emulsion">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">How a detergent molecule works</text>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <circle cx={110 + i * 90} cy="90" r="12" className="fill-current text-sky-500/25" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(14 165 233 / 0.9)" }} />
          <line x1={110 + i * 90} y1="102" x2={110 + i * 90} y2="128" className="stroke-current text-rose-500" strokeWidth="2.4" style={{ color: "rgb(244 63 94 / 0.9)" }} />
        </g>
      ))}
      <text x="200" y="66" fontSize="8.6" className="fill-current text-sky-600" fontWeight="800">hydrophilic head — loves water</text>
      <text x="200" y="146" fontSize="8.6" className="fill-current text-rose-500" fontWeight="800">hydrophobic tail — buries into grease</text>
      <circle cx="540" cy="100" r="46" className="fill-current text-amber-500/20" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const a = (i / 8) * Math.PI * 2;
        return <circle key={i} cx={540 + 46 * Math.cos(a)} cy={100 + 46 * Math.sin(a)} r="5" className="fill-current text-sky-500" style={{ color: "rgb(14 165 233 / 0.85)" }} />;
      })}
      <text x="540" y="104" fontSize="7.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">grease</text>
      <text x="540" y="166" fontSize="8.4" textAnchor="middle" className="fill-current text-muted-foreground">micelle: tails in, heads out — grease lifts into water</text>
      <rect x="30" y="180" width="660" height="20" rx="8" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="194" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Same head–tail design cleans dishes, clothes and wounds; hard water spoils soap but not most detergents.</text>
    </svg>
  );
}
