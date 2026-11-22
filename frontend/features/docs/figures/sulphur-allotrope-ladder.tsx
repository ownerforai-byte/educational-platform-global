// Sulphur allotrope ladder. Theme-aware.
export function SulphurAllotropeLadder({ className }: { className?: string }) {
  const rows: [string, string, string][] = [
    ["rhombic (α)", "octahedral yellow crystals", "stable &lt; 96 °C"],
    ["monoclinic (β)", "prismatic needle crystals", "stable 96–119 °C"],
    ["plastic (γ)", "supercooled rubbery chains", "quench molten S in water"],
  ];
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Three allotropes of sulphur with temperature stability ranges and the 96 degree transition point">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Three sulphurs, one 96 °C border</text>
      {rows.map(([n, d, t], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 48} width="580" height="40" rx="9" className="fill-current" style={{ color: "rgb(245 158 11)" }} opacity="0.13" />
          <text x="58" y={63 + i * 48} fontSize="12" fontWeight="800" className="fill-current text-foreground">{n}</text>
          <text x="230" y={63 + i * 48} fontSize="10.5" className="fill-current text-muted-foreground">{d}</text>
          <text x="600" y={70 + i * 48} fontSize="10.5" textAnchor="end" fontWeight="700" fill="rgb(245 158 11)">{t}</text>
        </g>
      ))}
      <text x="330" y="222" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">At 96 °C rhombic ⇌ monoclinic equilibrium — quote the transition temperature in exams</text>
    </svg>
  );
}
