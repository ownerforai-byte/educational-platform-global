/** Fruit types — true fruit from ovary, drupe, berry, legume. Theme-aware. */
export function FruitTypes({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Fruit types formed from ovary after fertilisation with drupe mango berry tomato and legume pea pod with pericarp layers">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Fruits — the ovary's afterlife</text>

      {/* formation */}
      <rect x="30" y="50" width="600" height="50" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="46" y="72" fontSize="9" className="fill-current text-foreground" fontWeight="700">After fertilisation: ovary → FRUIT · ovule → SEED · petals/sepals/stamens usually wither away</text>
      <text x="46" y="90" fontSize="8.5" className="fill-current text-muted-foreground">fruit wall (pericarp) can be 3 layers: epicarp, mesocarp, endocarp</text>

      {/* drupe */}
      <g>
        <circle cx="140" cy="160" r="36" className="fill-current text-rose-500/30" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
        <circle cx="140" cy="160" r="12" className="fill-current text-stone-700/70" />
        <text x="140" y="216" fontSize="8.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">DRUPE (mango)</text>
        <text x="140" y="230" fontSize="7.5" textAnchor="middle" className="fill-current text-muted-foreground">stony endocarp around one seed</text>
      </g>

      {/* berry */}
      <g>
        <circle cx="340" cy="160" r="36" className="fill-current text-amber-500/40" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
        {[[330, 152], [352, 158], [338, 172]].map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx="6" ry="4" className="fill-current text-amber-700/70" />
        ))}
        <text x="340" y="216" fontSize="8.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">BERRY (tomato)</text>
        <text x="340" y="230" fontSize="7.5" textAnchor="middle" className="fill-current text-muted-foreground">fleshy throughout, many seeds</text>
      </g>

      {/* legume */}
      <g>
        <path d="M500 130 q70 10 90 40 q-60 16 -110 -6 q-10 -22 20 -34 Z" className="fill-current text-emerald-500/40" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
        {[[540, 152], [560, 160], [578, 168]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="5" className="fill-current text-stone-600/80" />
        ))}
        <text x="545" y="216" fontSize="8.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">LEGUME (pea)</text>
        <text x="545" y="230" fontSize="7.5" textAnchor="middle" className="fill-current text-muted-foreground">dry pod splitting along one seam</text>
      </g>
    </svg>
  );
}
