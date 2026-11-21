/** Fungal nutrition modes — saprophytic, parasitic, symbiotic with absorptive mechanism. Theme-aware. */
export function FungalNutritionModes({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Fungal nutrition modes saprophytic on dead matter parasitic with haustoria and symbiotic mycorrhiza lichen all absorptive heterotrophs">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Absorbers, not swallowers — three lifestyles</text>

      {[
        { x: 16, c: "rgb(22 163 74 / 0.9)", t: "SAPROPHYTIC", items: ["feeds on dead organic matter", "secretes enzymes outward,", "absorbs the digested soup", "recycles the ecosystem", "Mucor on bread"] },
        { x: 232, c: "rgb(239 68 68 / 0.9)", t: "PARASITIC", items: ["feeds on a living host", "haustoria pierce host cells", "diseases: rusts, smuts,", "ringworm, athlete's foot", "Puccinia on wheat"] },
        { x: 448, c: "rgb(14 165 233 / 0.9)", t: "SYMBIOTIC", items: ["mutual benefit with partner", "mycorrhiza: fungus ↔ roots", "lichen: fungus ↔ alga", "fungus gives water/minerals,", "partner gives sugars"] },
      ].map((g) => (
        <g key={g.t}>
          <rect x={g.x} y="56" width="196" height="150" rx="12" style={{ color: g.c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
          <text x={g.x + 98} y="80" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{g.t}</text>
          {g.items.map((s, i) => (
            <text key={i} x={g.x + 12} y={102 + i * 20} fontSize="7.8" className="fill-current text-muted-foreground">• {s}</text>
          ))}
        </g>
      ))}
      <text x="16" y="228" fontSize="10" className="fill-current text-muted-foreground">All three share one mechanism: digestion happens OUTSIDE the body, then absorption — fungi digest first, eat second.</text>
    </svg>
  );
}
