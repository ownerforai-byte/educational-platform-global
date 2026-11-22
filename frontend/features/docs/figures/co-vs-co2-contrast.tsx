// CO vs CO2 contrast. Theme-aware.
export function CoVsCo2Contrast({ className }: { className?: string }) {
  const rows: [string, string, string][] = [
    ["toxicity", "highly toxic (Hb hijack)", "non-toxic (asphyxiant)"],
    ["water", "almost insoluble", "soluble → H₂CO₃"],
    ["redox", "strong reducer", "fully oxidised"],
    ["with haemoglobin", "binds 200× O₂", "none"],
    ["oxide type", "neutral", "acidic"],
  ];
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="Five row comparison of carbon monoxide and carbon dioxide">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">One oxygen apart, worlds apart</text>
      <text x="290" y="50" fontSize="13" fontWeight="800" textAnchor="middle" fill="rgb(239 68 68)">CO</text>
      <text x="500" y="50" fontSize="13" fontWeight="800" textAnchor="middle" fill="rgb(59 130 246)">CO₂</text>
      {rows.map(([p, a, b], i) => (
        <g key={i}>
          <text x="60" y={80 + i * 40} fontSize="11.5" fontWeight="700" className="fill-current text-foreground">{p}</text>
          <text x="290" y={80 + i * 40} fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">{a}</text>
          <text x="500" y={80 + i * 40} fontSize="11" textAnchor="middle" fontWeight="700" fill="rgb(59 130 246)">{b}</text>
          <line x1="50" y1={88 + i * 40} x2="620" y2={88 + i * 40} stroke="currentColor" strokeWidth="0.6" className="text-muted-foreground" opacity="0.3" />
        </g>
      ))}
      <text x="330" y="290" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">CO still has electrons to give; CO₂ has none left to take</text>
    </svg>
  );
}
