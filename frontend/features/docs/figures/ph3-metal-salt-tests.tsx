// PH3 metal salt tests. Theme-aware.
export function Ph3MetalSaltTests({ className }: { className?: string }) {
  const rows: [string, string, string][] = [
    ["CuSO₄", "black Cu₃P ppt", "3CuSO₄ + 2PH₃ → Cu₃P↓ + 3H₂SO₄"],
    ["HgCl₂", "black Hg₃P₂", "3HgCl₂ + 2PH₃ → Hg₃P₂↓ + 6HCl"],
    ["AgNO₃", "black Ag₃P + Ag mirror", "reduces Ag⁺ to shiny Ag"],
  ];
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Phosphine tests with copper mercury and silver salts giving black phosphides and silver mirror">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Black precipitates and a mirror</text>
      {rows.map(([m, obs, eq], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 56} width="580" height="46" rx="9" className="fill-current" style={{ color: "rgb(51 65 85)" }} opacity="0.14" />
          <text x="58" y={64 + i * 56} fontSize="12" fontWeight="800" className="fill-current text-foreground">{m}</text>
          <text x="58" y={84 + i * 56} fontSize="11" fontWeight="700" style={{ fill: "rgb(51 65 85)" }}>{obs}</text>
          <text x="600" y={76 + i * 56} fontSize="9.5" textAnchor="end" className="fill-current text-muted-foreground">{eq}</text>
        </g>
      ))}
      <text x="330" y="226" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">The black ppt is the phosphide salt, not the metal sulphide — quote the formula</text>
    </svg>
  );
}
