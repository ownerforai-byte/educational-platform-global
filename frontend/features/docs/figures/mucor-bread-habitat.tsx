/** Mucor on bread — habitat and colony appearance. Well-detailed. Theme-aware. */
export function MucorBreadHabitat({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Mucor on bread slice habitat moist warm sugary starch food grey cottony colony black pinhead sporangia time sequence day one to five rhizoids anchoring hyphae conditions for growth">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Mucor's address: your bread box</text>

      {/* bread slice */}
      <rect x="60" y="60" width="260" height="160" rx="20" className="fill-current text-amber-300/25" stroke="currentColor" strokeWidth="3" style={{ color: "rgb(252 211 77 / 0.9)" }} />
      {/* colonies */}
      {[[130, 110], [220, 150], [170, 190], [270, 100]].map(([x, y], i) => (
        <g key={i}>
          <ellipse cx={x} cy={y} rx="26" ry="16" className="fill-current text-stone-400/30" />
          {[0, 1, 2, 3, 4].map((j) => (
            <line key={j} x1={x} y1={y} x2={x - 12 + j * 6} y2={y - 18} strokeWidth="1.5" className="stroke-current text-stone-500" />
          ))}
          {[0, 1, 2, 3, 4].map((j) => (
            <circle key={`d${j}`} cx={x - 12 + j * 6} cy={y - 20} r="2.5" className="fill-current text-stone-700" />
          ))}
        </g>
      ))}
      <text x="190" y="244" fontSize="7.6" textAnchor="middle" className="fill-current text-muted-foreground">grey cottony fuzz with black pinheads = ripe sporangia</text>

      {/* timeline */}
      <rect x="360" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="380" y="66" fontSize="8.6" className="fill-current text-foreground" fontWeight="800">TIME-LAPSE</text>
      {[
        "Day 0: spores land (always in the air)",
        "Day 1: germ tubes, white fuzz spreads",
        "Day 2: mycelium covers the slice",
        "Day 3: sporangiophores lift sporangia",
        "Day 4: sporangia blacken — spores ripe",
        "Day 5: thousands of new spores ready",
      ].map((t, i) => (
        <text key={t} x="380" y={90 + i * 22} fontSize="7.2" className="fill-current text-muted-foreground">• {t}</text>
      ))}

      <rect x="30" y="240" width="660" height="46" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="50" y="262" fontSize="8.2" className="fill-current text-foreground" fontWeight="700">What it needs: moisture, warmth (~20–30 °C), and food — starch and sugars. Dry, cold or acidic conditions stop it.</text>
      <text x="50" y="279" fontSize="7.6" className="fill-current text-muted-foreground">Rhizoids anchor the mycelium and secrete enzymes that soften the bread ahead of absorption.</text>
    </svg>
  );
}
