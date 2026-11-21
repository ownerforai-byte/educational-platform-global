/** Where mushrooms grow — moisture and habitat. Well-detailed. Theme-aware. */
export function MushroomHabitatMoisture({ className }: { className?: string }) {
  const spots: [string, string][] = [
    ["decaying logs", "saprophytic on dead wood"],
    ["leaf litter", "digests fallen leaves"],
    ["damp soil / lawns", "after rain, humid air"],
    ["tree stumps", "brackets on old trunks"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Mushroom habitats damp moist shady places decaying logs leaf litter humid soil tree stumps saprophytic moisture rain forest floor decomposition">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Where mushrooms appear — damp, shaded, decaying</text>

      {/* forest floor scene */}
      <rect x="30" y="44" width="400" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="230" y="64" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">FOREST FLOOR AFTER RAIN</text>
      {/* log with brackets */}
      <rect x="70" y="120" width="150" height="34" rx="8" className="fill-current text-amber-800/30" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(146 64 14 / 0.9)" }} />
      {[[100, 120], [130, 120], [160, 120]].map(([x, y]) => (
        <g key={x}>
          <path d={`M${x} ${y} q14 -18 28 0 q-8 5 -14 5 q-6 0 -14 -5`} className="fill-current text-amber-600/40" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(180 130 40 / 0.9)" }} />
        </g>
      ))}
      <text x="145" y="172" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">bracket fungi on a log</text>
      {/* ground mushrooms */}
      {[[250, 200], [280, 206], [320, 198]].map(([x, y]) => (
        <g key={x}>
          <path d={`M${x - 12} ${y} q12 -14 24 0 q-6 4 -12 4 q-6 0 -12 -4`} className="fill-current text-stone-400/40" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(168 162 158 / 0.9)" }} />
          <rect x={x - 2} y={y} width="4" height="10" rx="2" className="fill-current text-stone-300/50" />
        </g>
      ))}
      {/* litter */}
      <path d="M50 236 q100 -10 180 0 q120 12 190 0" className="fill-none stroke-current text-emerald-700" strokeWidth="3" strokeDasharray="6 4" style={{ color: "rgb(20 83 45 / 0.8)" }} />
      <text x="230" y="254" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">leaf litter = food + moisture cover</text>

      {/* conditions card */}
      <rect x="450" y="44" width="240" height="220" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="570" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">GROWTH CHECKLIST</text>
      {[
        "moisture — damp substrate",
        "shade — avoids drying out",
        "organic matter — cellulose",
        "warm, humid air",
        "fruiting bodies after rain",
      ].map((t, i) => (
        <text key={t} x="466" y={94 + i * 24} fontSize="7.4" className="fill-current text-muted-foreground">✓ {t}</text>
      ))}
      <text x="466" y="226" fontSize="7.2" className="fill-current text-muted-foreground">Mycelium feeds hidden all year;</text>
      <text x="466" y="240" fontSize="7.2" className="fill-current text-muted-foreground">mushrooms are just its fruiting</text>
      <text x="466" y="254" fontSize="7.2" className="fill-current text-muted-foreground">stage — the 'flower' of the fungus.</text>
    </svg>
  );
}
