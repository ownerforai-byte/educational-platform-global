/** Yeast fermentation — glycolysis to ethanol and CO2 with bread and brewing uses. Theme-aware. */
export function YeastFermentation({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Yeast fermentation pathway glucose through pyruvate to ethanol and carbon dioxide with bread rising and brewing applications">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Fermentation — yeast's oxygen-free energy trick</text>

      {[
        { x: 90, t: "GLUCOSE (C₆H₁₂O₆)", c: "rgb(22 163 74 / 0.9)" },
        { x: 330, t: "PYRUVATE", c: "rgb(14 165 233 / 0.9)" },
        { x: 560, t: "ETHANOL + CO₂", c: "rgb(245 158 11 / 0.9)" },
      ].map((n, i) => (
        <g key={n.t}>
          <rect x={n.x - 62} y="70" width="124" height="46" rx="10" style={{ color: n.c }} className="fill-current opacity-12" strokeWidth="2.5" stroke="currentColor" />
          <text x={n.x} y="98" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          {i < 2 && <line x1={n.x + 64} y1="93" x2={n.x + 148} y2="93" strokeWidth="2.5" className="stroke-current text-foreground" />}
        </g>
      ))}
      <text x="210" y="84" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">glycolysis (2 ATP)</text>
      <text x="445" y="84" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">zymase enzymes, no O₂</text>

      {/* applications */}
      {[
        { x: 110, t: "BREAD", s: "CO₂ bubbles raise the dough; ethanol evaporates in baking", c: "rgb(251 146 60 / 0.9)" },
        { x: 330, t: "BREWING", s: "ethanol is the drink; CO₂ gives the fizz", c: "rgb(124 58 237 / 0.9)" },
        { x: 550, t: "INDUSTRY", s: "glycerol, vitamins, single-cell protein", c: "rgb(22 163 74 / 0.9)" },
      ].map((n) => (
        <g key={n.t}>
          <rect x={n.x - 70} y="150" width="140" height="60" rx="10" style={{ color: n.c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
          <text x={n.x} y="172" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          <text x={n.x} y={n.t === "BREAD" ? 188 : 188} fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">{n.s.split(';')[0]}</text>
          {n.s.includes(';') && <text x={n.x} y={200} fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">{n.s.split(';')[1]}</text>}
        </g>
      ))}
      <text x="16" y="230" fontSize="10" className="fill-current text-muted-foreground">Anaerobic = inefficient (2 ATP per glucose) but fast — and the waste products are exactly what humans want.</text>
    </svg>
  );
}
