// Metallic character ladder across period 3. Theme-aware.
export function MetallicCharacterLadder({ className }: { className?: string }) {
  const els: [string, string, string][] = [
    ["Na", "metal", "rgb(14 165 233 / 0.9)"],
    ["Mg", "metal", "rgb(14 165 233 / 0.9)"],
    ["Al", "metal (weaker)", "rgb(16 185 129 / 0.9)"],
    ["Si", "metalloid", "rgb(245 158 11 / 0.9)"],
    ["P", "non-metal", "rgb(139 92 246 / 0.9)"],
    ["S", "non-metal", "rgb(139 92 246 / 0.9)"],
    ["Cl", "non-metal", "rgb(244 63 94 / 0.9)"],
  ];
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Metallic character across period three sodium magnesium aluminium silicon phosphorus sulphur chlorine from metal through metalloid to non-metal">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Metallic character across period 3 — one clean sweep</text>
      {els.map(([sym, kind, color], i) => (
        <g key={sym}>
          <rect x={40 + i * 94} y="50" width="76" height="70" rx="8" className="fill-current" style={{ color }} opacity="0.14" />
          <rect x={40 + i * 94} y="50" width="76" height="70" rx="8" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color }} />
          <text x={78 + i * 94} y="80" fontSize="11" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{sym}</text>
          <text x={78 + i * 94} y="100" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">{kind}</text>
        </g>
      ))}
      <line x1="40" y1="146" x2="698" y2="146" className="stroke-current text-rose-500" strokeWidth="2.4" style={{ color: "rgb(244 63 94 / 0.9)" }} markerEnd="url(#mcarr)" />
      <text x="369" y="140" fontSize="8" textAnchor="middle" className="fill-current text-rose-500" fontWeight="800">metallic character falls →</text>
      <rect x="30" y="162" width="660" height="38" rx="8" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="180" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">Cause: Z_eff climbs, so atoms prefer to gain rather than lose electrons — oxides swing from basic (Na₂O) to acidic (Cl₂O₇) in step.</text>
      <text x="360" y="194" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Down any group the ladder reverses: shells add, Z_eff per shell falls, metallic character rises.</text>
      <defs>
        <marker id="mcarr" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" className="fill-current" /></marker>
      </defs>
    </svg>
  );
}
