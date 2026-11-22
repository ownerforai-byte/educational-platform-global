// Five laws of stoichiometry map. Theme-aware.
export function FiveLawsMap({ className }: { className?: string }) {
  const laws: [string, string][] = [
    ["Conservation of mass", "Lavoisier — mass unchanged in a reaction"],
    ["Definite proportions", "Proust — fixed ratio in a compound"],
    ["Multiple proportions", "Dalton — whole-number ratios between series"],
    ["Reciprocal proportions", "Richter — exchange ratios link through a third element"],
    ["Gay-Lussac's gaseous volumes", "gases combine in simple volume ratios"],
  ];
  return (
    <svg viewBox="0 0 720 240" className={className} role="img" aria-label="Five laws of stoichiometry map conservation of mass definite proportions multiple proportions reciprocal proportions gay lussac law with discoverers">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">The five laws of stoichiometry — one map</text>
      {laws.map(([t, d], i) => (
        <g key={t}>
          <rect x={30 + (i % 2) * 340} y={44 + Math.floor(i / 2) * 58} width="320" height="50" rx="10" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(14 165 233 / 0.85)" }} />
          <text x={46 + (i % 2) * 340} y={66 + Math.floor(i / 2) * 58} fontSize="9.5" className="fill-current text-sky-600" fontWeight="800">{t}</text>
          <text x={46 + (i % 2) * 340} y={84 + Math.floor(i / 2) * 58} fontSize="7.8" className="fill-current text-muted-foreground">{d}</text>
        </g>
      ))}
      <rect x="30" y="202" width="660" height="30" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="220" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Order of discovery: conservation (1789) → definite (1799) → multiple (1803) → reciprocal (1792, formalised later) → Gay-Lussac (1808).</text>
    </svg>
  );
}
