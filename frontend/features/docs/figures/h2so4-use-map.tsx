// H2SO4 use map. Theme-aware.
export function H2so4UseMap({ className }: { className?: string }) {
  const uses: [string, string, string][] = [
    ["fertilisers", "(NH₄)₂SO₄, superphosphate", "rgb(16 185 129)"],
    ["batteries", "lead-acid electrolyte", "rgb(59 130 246)"],
    ["pickling / dyes / drugs", "metal descaling, sulphonation", "rgb(245 158 11)"],
    ["lab reagent", "drying gas, nonvolatile acid source", "rgb(124 58 237)"],
  ];
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Four major uses of sulphuric acid">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">King of chemicals: production as GDP proxy</text>
      {uses.map(([u, s, c], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 48} width="580" height="40" rx="9" className="fill-current" style={{ color: c }} opacity="0.14" />
          <text x="58" y={63 + i * 48} fontSize="12.5" fontWeight="800" style={{ fill: c }}>{u}</text>
          <text x="58" y={81 + i * 48} fontSize="10.5" className="fill-current text-muted-foreground">{s}</text>
        </g>
      ))}
      <text x="330" y="248" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">A country's H₂SO₄ output has long been read as an index of industrial health</text>
    </svg>
  );
}
