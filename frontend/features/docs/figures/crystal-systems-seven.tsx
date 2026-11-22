// The seven crystal systems. Theme-aware.
export function CrystalSystemsSeven({ className }: { className?: string }) {
  const rows: [string, string, string][] = [
    ["cubic", "a=b=c, 90°", "NaCl, diamond"],
    ["tetragonal", "a=b≠c, 90°", "TiO₂"],
    ["orthorhombic", "a≠b≠c, 90°", "sulphur"],
    ["monoclinic", "β≠90°", "gypsum"],
    ["hexagonal", "γ=120°", "graphite"],
    ["rhombohedral", "a=b=c, ≠90°", "calcite"],
    ["triclinic", "all ≠90°", "K₂Cr₂O₇"],
  ];
  return (
    <svg viewBox="0 0 660 330" className={className} role="img" aria-label="Table of the seven crystal systems with lattice parameters and examples">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Seven systems cover every crystal</text>
      {rows.map(([n, p, e], i) => (
        <g key={i}>
          <rect x="40" y={42 + i * 36} width="580" height="30" rx="7" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity={i % 2 ? 0.05 : 0.1} />
          <text x="58" y={62 + i * 36} fontSize="11.5" fontWeight="800" className="fill-current text-foreground">{n}</text>
          <text x="260" y={62 + i * 36} fontSize="11" className="fill-current text-muted-foreground">{p}</text>
          <text x="600" y={62 + i * 36} fontSize="11" textAnchor="end" fontWeight="700" fill="rgb(59 130 246)">{e}</text>
        </g>
      ))}
      <text x="330" y="318" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">a, b, c and α, β, γ — six numbers sort every crystal into its system</text>
    </svg>
  );
}
