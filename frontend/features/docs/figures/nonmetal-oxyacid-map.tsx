// Non-metals oxidised to oxyacids by HNO3. Theme-aware.
export function NonmetalOxyacidMap({ className }: { className?: string }) {
  const maps: [string, string, string][] = [
    ["S (0)", "H₂SO₄ (S +6)", "S + 6HNO₃ → H₂SO₄ + 6NO₂ + 2H₂O"],
    ["C (0)", "CO₂ (C +4)", "C + 4HNO₃ → CO₂ + 4NO₂ + 2H₂O"],
    ["P (0)", "H₃PO₄ (P +5)", "P₄ + 20HNO₃ → 4H₃PO₄ + 20NO₂ + 4H₂O"],
  ];
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Non-metals sulphur carbon and phosphorus oxidised by concentrated nitric acid to their highest oxyacids">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">No cation? Then the oxyacid gets made</text>
      {maps.map(([n, p, eq], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 56} width="580" height="46" rx="9" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity="0.12" />
          <text x="58" y={64 + i * 56} fontSize="12.5" fontWeight="800" className="fill-current text-foreground">{n} → {p}</text>
          <text x="58" y={84 + i * 56} fontSize="11" fill="rgb(59 130 246)">{eq}</text>
        </g>
      ))}
      <text x="330" y="228" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Non-metals have no cations to salt with — the nitrate just takes their electrons</text>
    </svg>
  );
}
