// Nonvolatile displacer H2SO4. Theme-aware.
export function NonvolatileDisplacer({ className }: { className?: string }) {
  const rows: [string, string, string][] = [
    ["HCl", "NaCl + H₂SO₄ → NaHSO₄ + HCl↑", "rgb(14 165 233)"],
    ["HF", "CaF₂ + H₂SO₄ → CaSO₄ + 2HF↑", "rgb(16 185 129)"],
    ["HNO₃", "KNO₃ + H₂SO₄ → KHSO₄ + HNO₃↑", "rgb(245 158 11)"],
  ];
  return (
    <svg viewBox="0 0 660 230" className={className} role="img" aria-label="Concentrated sulphuric acid as high boiling nonvolatile acid displacing more volatile acids from their salts">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">The acid that makes other acids</text>
      {rows.map(([a, eq, c], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 48} width="580" height="40" rx="9" className="fill-current" style={{ color: c }} opacity="0.13" />
          <text x="58" y={63 + i * 48} fontSize="12" fontWeight="800" style={{ fill: c }}>→ {a}↑</text>
          <text x="180" y={70 + i * 48} fontSize="10.5" className="fill-current text-muted-foreground">{eq}</text>
        </g>
      ))}
      <text x="330" y="210" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">bp 338 °C: H₂SO₄ stays in the flask while the lighter acids escape as vapour</text>
    </svg>
  );
}
