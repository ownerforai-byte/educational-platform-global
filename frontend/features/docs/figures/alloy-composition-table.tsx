// AlloyCompositionTable figure. Theme-aware.
export function AlloyCompositionTable({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Composition and use table for brass bronze stainless steel and solder">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Alloys — composition is the answer</text>
      <line x1="40" y1="52" x2="620" y2="52" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
      {[["ALLOY", "COMPOSITION", "WHY / USE"],
        ["Brass", "Cu + Zn (60–90 % Cu)", "gold-like, machinable — instruments, fittings"],
        ["Bronze", "Cu + Sn (~88 : 12)", "hard, corrosion-proof — statues, bells"],
        ["Stainless steel", "Fe + Cr (≥10.5 %) + Ni, C", "passive Cr₂O₃ film — cutlery, plant"],
        ["Solder", "Pb + Sn", "low melting — joins wires"]].map((row, i) => (
        <g key={i}>
          <text x="45" y={74 + i * 34} fontSize={i ? "11" : "10.5"} fontWeight={i ? "700" : "800"} className="fill-current text-foreground">{row[0]}</text>
          <text x="180" y={74 + i * 34} fontSize={i ? "11" : "10.5"} fontWeight={i ? "400" : "800"} className={i ? "fill-current text-foreground" : "fill-current text-muted-foreground"}>{row[1]}</text>
          <text x="380" y={74 + i * 34} fontSize={i ? "10.5" : "10.5"} className={i ? "fill-current text-muted-foreground" : "fill-current text-muted-foreground"}>{row[2]}</text>
          <line x1="40" y1={82 + i * 34} x2="620" y2={82 + i * 34} stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" opacity="0.4" />
        </g>
      ))}
    </svg>
  );
}
