// Lattice energy concept with the NaCl cubic lattice. Theme-aware.
export function LatticeEnergyPanel({ className }: { className?: string }) {
  const dots: [number, number, string][] = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      dots.push([c, r, (r + c) % 2 === 0 ? "rgb(245 158 11)" : "rgb(16 185 129)"]);
    }
  }
  return (
    <svg viewBox="0 0 640 300" className={className} role="img" aria-label="Sodium chloride cubic lattice with alternating sodium and chloride ions and lattice energy definition">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Lattice energy: the glue of the ionic crystal</text>
      {dots.map(([c, r, color], i) => (
        <circle key={i} cx={80 + c * 44} cy={70 + r * 44} r="15" className="fill-current" style={{ color }} opacity="0.3" />
      ))}
      {dots.map(([c, r, color], i) => (
        <circle key={"o" + i} cx={80 + c * 44} cy={70 + r * 44} r="15" fill="none" stroke="currentColor" strokeWidth="1.2" style={{ color }} />
      ))}
      <text x="80" y="75" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Na&#8314;</text>
      <text x="124" y="75" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Cl&#8315;</text>
      <text x="330" y="90" fontSize="12" className="fill-current text-foreground" fontWeight="700">Definition</text>
      <text x="330" y="116" fontSize="11" className="fill-current text-muted-foreground">Energy released when one mole</text>
      <text x="330" y="136" fontSize="11" className="fill-current text-muted-foreground">of gaseous ions packs into the</text>
      <text x="330" y="156" fontSize="11" className="fill-current text-muted-foreground">solid lattice.</text>
      <text x="330" y="190" fontSize="11" className="fill-current text-foreground">Na&#8314;(g) + Cl&#8315;(g) &#8594; NaCl(s)</text>
      <text x="330" y="214" fontSize="11" className="fill-current text-muted-foreground">NaCl: about -787 kJ per mole</text>
      <text x="330" y="240" fontSize="11" className="fill-current text-muted-foreground">Higher charge, smaller ions:</text>
      <text x="330" y="258" fontSize="11" className="fill-current text-muted-foreground">bigger lattice energy (MgO).</text>
    </svg>
  );
}
