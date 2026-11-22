// Hypo use map. Theme-aware.
export function HypoUseMap({ className }: { className?: string }) {
  const uses: [string, string, string][] = [
    ["photography fixer", "dissolves unexposed AgBr/AgCl", "rgb(59 130 246)"],
    ["iodometry titrant", "standard I₂ estimation", "rgb(124 58 237)"],
    ["antichlor", "removes excess Cl₂ in textiles", "rgb(16 185 129)"],
    ["cyanide antidote / gold leach", "converts CN⁻ to thiocyanate; complexes Au", "rgb(245 158 11)"],
  ];
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Four uses of sodium thiosulphate in photography titration textiles and medicine">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">One salt, four careers</text>
      {uses.map(([u, s, c], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 48} width="580" height="40" rx="9" className="fill-current" style={{ color: c }} opacity="0.14" />
          <text x="58" y={63 + i * 48} fontSize="12.5" fontWeight="800" style={{ fill: c }}>{u}</text>
          <text x="58" y={81 + i * 48} fontSize="10.5" className="fill-current text-muted-foreground">{s}</text>
        </g>
      ))}
      <text x="330" y="248" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Fixer, titrant, antichlor, antidote — all from one S–S bond</text>
    </svg>
  );
}
