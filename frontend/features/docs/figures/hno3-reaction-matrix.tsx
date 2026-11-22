// HNO3 reaction matrix. Theme-aware.
export function Hno3ReactionMatrix({ className }: { className?: string }) {
  const rows: [string, string, string][] = [
    ["Cu + 4HNO₃(conc)", "Cu(NO₃)₂ + 2NO₂ + 2H₂O", "brown fumes"],
    ["3Cu + 8HNO₃(dil)", "3Cu(NO₃)₂ + 2NO + 4H₂O", "colourless NO"],
    ["Zn + 10HNO₃(very dil)", "4Zn(NO₃)₂ + NH₄NO₃ + 3H₂O", "ammonium nitrate"],
    ["S/C/P + conc", "H₂SO₄ / CO₂ / H₃PO₄ + NO₂", "oxyacids"],
  ];
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Reaction matrix of nitric acid with copper zinc and non-metals at different concentrations">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">HNO₃ reaction matrix</text>
      {rows.map(([r, eq, o], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 48} width="580" height="40" rx="9" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity="0.1" />
          <text x="58" y={63 + i * 48} fontSize="11.5" fontWeight="800" className="fill-current text-foreground">{r}</text>
          <text x="58" y={81 + i * 48} fontSize="10" className="fill-current text-muted-foreground">{eq}</text>
          <text x="600" y={70 + i * 48} fontSize="10" textAnchor="end" fontWeight="700" fill="rgb(59 130 246)">{o}</text>
        </g>
      ))}
      <text x="330" y="248" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">H₂ is never evolved with HNO₃ — it is itself reduced instead</text>
    </svg>
  );
}
