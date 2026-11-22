// LiMgDiagonal figure. Theme-aware.
export function LiMgDiagonal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Diagonal similarity of lithium and magnesium in thermal behaviour">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The Li–Mg diagonal similarity</text>
      <rect x="70" y="60" width="120" height="46" rx="8" fill="rgb(139 92 246)" opacity="0.15" stroke="rgb(139 92 246)" />
      <text x="130" y="88" fontSize="12" fontWeight="800" fill="rgb(139 92 246)" textAnchor="middle">Li</text>
      <rect x="200" y="115" width="120" height="46" rx="8" fill="rgb(59 130 246)" opacity="0.15" stroke="rgb(59 130 246)" />
      <text x="260" y="143" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">Mg</text>
      <path d="M 150 105 C 190 125, 200 130, 205 135" stroke="rgb(245 158 11)" strokeWidth="2.5" markerEnd="url(#lmd-a)" />
      <text x="240" y="80" fontSize="11.5" fontWeight="800" fill="rgb(245 158 11)">similar charge density → similar chemistry</text>
      {[
        ["Li₂CO₃ decomposes; Na₂CO₃, K₂CO₃ never", "MgCO₃ decomposes at ~350 °C"],
        ["LiNO₃ → Li₂O + NO₂ + O₂", "Mg(NO₃)₂ → MgO + NO₂ + O₂"],
        ["LiOH → Li₂O on heating", "Mg(OH)₂ → MgO on heating"],
      ].map(([l, m], i) => (
        <g key={i}>
          <text x="70" y={195 - i * 0 + 0 + (i === 0 ? 0 : 0)} fontSize="0.1"> </text>
        </g>
      ))}
      <text x="70" y="185" fontSize="10" className="fill-current text-foreground">Li₂CO₃ → Li₂O + CO₂ · Na₂CO₃ stable to 851 °C</text>
      <text x="70" y="205" fontSize="10" className="fill-current text-muted-foreground">LiNO₃ → Li₂O + NO₂ + O₂ · NaNO₃ → NaNO₂ + ½O₂</text>
      <text x="70" y="225" fontSize="10" className="fill-current text-muted-foreground">Li behaves like Mg, not like Na — the diagonal rule in action</text>
      <defs>
        <marker id="lmd-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(245 158 11)" /></marker>
      </defs>
    </svg>
  );
}
