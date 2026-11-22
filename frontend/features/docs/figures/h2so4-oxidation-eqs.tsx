// H2SO4 oxidation equations. Theme-aware.
export function H2so4OxidationEqs({ className }: { className?: string }) {
  const rows: [string, string, string][] = [
    ["Cu (hot conc)", "Cu + 2H₂SO₄ → CuSO₄ + SO₂ + 2H₂O", "S +6 → +4"],
    ["C", "C + 2H₂SO₄ → CO₂ + 2SO₂ + 2H₂O", "S +6 → +4"],
    ["S", "S + 2H₂SO₄ → 3SO₂ + 2H₂O", "S +6 → +4"],
    ["Hg", "Hg + 2H₂SO₄ → HgSO₄ + SO₂ + 2H₂O", "S +6 → +4"],
  ];
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Hot concentrated sulphuric acid oxidising copper carbon sulphur and mercury with sulphur dioxide evolution">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Hot conc. H₂SO₄ always ends at SO₂</text>
      {rows.map(([m, eq, s], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 48} width="580" height="40" rx="9" className="fill-current" style={{ color: "rgb(239 68 68)" }} opacity="0.1" />
          <text x="58" y={63 + i * 48} fontSize="12" fontWeight="800" className="fill-current text-foreground">{m}</text>
          <text x="58" y={81 + i * 48} fontSize="10.5" className="fill-current text-muted-foreground">{eq}</text>
          <text x="600" y={70 + i * 48} fontSize="9.5" textAnchor="end" fill="rgb(239 68 68)">{s}</text>
        </g>
      ))}
      <text x="330" y="248" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">H₂ and SO₂ never come from the same acid concentration — know which acid you lit</text>
    </svg>
  );
}
