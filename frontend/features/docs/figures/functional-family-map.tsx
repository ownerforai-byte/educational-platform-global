// FunctionalFamilyMap figure. Theme-aware.
export function FunctionalFamilyMap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Functional groups mapped to their chemical families">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Group → family → example</text>
      <line x1="35" y1="48" x2="625" y2="48" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
      {[["GROUP", "FAMILY", "EXAMPLE"],
        ["–OH", "alcohol", "ethanol C₂H₅OH"],
        ["–CHO", "aldehyde", "ethanal CH₃CHO"],
        [">C=O", "ketone", "propanone CH₃COCH₃"],
        ["–COOH", "carboxylic acid", "acetic acid CH₃COOH"],
        ["–COOR", "ester", "ethyl acetate"],
        ["–X", "halide", "C₂H₅Cl"],
        ["–NH₂", "amine", "ethylamine C₂H₅NH₂"]].map((row, i) => (
        <g key={i}>
          {[0, 1, 2].map((c) => (
            <text key={c} x={40 + [0, 180, 400][c]} y={68 + i * 22} fontSize={i ? "10.5" : "9.5"} fontWeight={i ? (c ? "400" : "800") : "800"} className={i ? "fill-current text-foreground" : "fill-current text-muted-foreground"}>{row[c]}</text>
          ))}
          <line x1="35" y1={75 + i * 22} x2="625" y2={75 + i * 22} stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" opacity="0.4" />
        </g>
      ))}
      <text x="330" y="230" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">One group = one family = one set of reactions, whatever the skeleton</text>
    </svg>
  );
}
