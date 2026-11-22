// DeficiencyDiseaseTable figure. Theme-aware.
export function DeficiencyDiseaseTable({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Table of deficiency diseases with element function and prevention">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The deficiency disease table</text>
      <line x1="40" y1="50" x2="620" y2="50" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
      {[["ELEMENT", "NEEDED FOR", "DEFICIENCY DISEASE"],
        ["Fe", "haemoglobin", "anaemia"],
        ["I (~150 µg/day)", "thyroxine", "goitre"],
        ["Co (B₁₂)", "red blood cells", "pernicious anaemia"],
        ["Mg (plants)", "chlorophyll", "chlorosis"],
        ["F", "tooth enamel", "dental caries"],
        ["Cr", "glucose tolerance factor", "impaired glucose use"]].map((row, i) => (
        <g key={i}>
          {[0, 1, 2].map((c) => (
            <text key={c} x={45 + [0, 180, 380][c]} y={72 + i * 26} fontSize={i ? "10.5" : "10"} fontWeight={i ? (c ? "400" : "700") : "800"} className={i ? "fill-current text-foreground" : "fill-current text-muted-foreground"}>{row[c]}</text>
          ))}
          <line x1="40" y1={80 + i * 26} x2="620" y2={80 + i * 26} stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" opacity="0.4" />
        </g>
      ))}
      <text x="330" y="226" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">Each pair (element → disease) is worth a mark — learn them as couples</text>
    </svg>
  );
}
