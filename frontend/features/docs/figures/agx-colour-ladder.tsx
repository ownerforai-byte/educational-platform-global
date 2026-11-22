// AgX colour ladder. Theme-aware.
export function AgxColourLadder({ className }: { className?: string }) {
  const rows: [string, string, string, string][] = [
    ["Cl⁻", "AgCl white", "soluble in dilute NH₃", "rgb(148 163 184)"],
    ["Br⁻", "AgBr cream", "soluble only in conc. NH₃", "rgb(180 83 9)"],
    ["I⁻", "AgI yellow", "insoluble in NH₃", "rgb(245 158 11)"],
  ];
  return (
    <svg viewBox="0 0 660 220" className={className} role="img" aria-label="Silver halide colour ladder white cream yellow with ammonia solubility">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">The AgX colour ladder</text>
      {rows.map(([x, ppt, sol, c], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 50} width="580" height="40" rx="9" className="fill-current" style={{ color: c }} opacity="0.16" />
          <text x="70" y={71 + i * 50} fontSize="12.5" fontWeight="800" className="fill-current text-foreground">{x}</text>
          <text x="180" y={71 + i * 50} fontSize="12.5" fontWeight="800" style={{ fill: c }}>{ppt}</text>
          <text x="600" y={71 + i * 50} fontSize="11" textAnchor="end" className="fill-current text-muted-foreground">{sol}</text>
        </g>
      ))}
      <text x="330" y="206" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Colour identifies; ammonia solubility confirms — Ag⁺ + X⁻ → AgX↓</text>
    </svg>
  );
}
