/** Mycelium network — the hidden body of a fungus. Well-detailed. Theme-aware. */
export function MyceliumNetwork({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Mycelium network hidden fungal body branching hyphae through soil decomposing leaf litter nutrient transport translocation largest organism honey fungus fairy ring growth tips enzyme secretion absorption">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Mycelium — the real body of the fungus</text>

      {/* soil */}
      <rect x="30" y="120" width="660" height="130" rx="12" className="fill-current text-amber-800/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(146 64 14 / 0.9)" }} />
      <text x="46" y="140" fontSize="7" className="fill-current text-muted-foreground">SOIL</text>

      {/* mushroom above */}
      <rect x="300" y="76" width="8" height="40" rx="3" className="fill-current text-stone-400" />
      <path d="M240 80 q68 -44 136 0 q-30 10 -68 10 q-38 0 -68 -10" className="fill-current text-rose-500/30" stroke="currentColor" strokeWidth="2.5" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="308" y="60" fontSize="7.4" className="fill-current text-muted-foreground">mushroom = only the fruiting body</text>

      {/* hyphae */}
      <path d="M304 116 q-40 30 -90 24 q-60 -6 -100 30 M304 116 q60 30 120 20 q70 -10 110 34 M304 116 q-10 50 -50 74 q-30 20 -60 44 M304 116 q30 46 80 60 q50 14 90 50 M304 116 q10 60 -20 100" className="fill-none stroke-current text-emerald-500" strokeWidth="2.5" />
      {/* tips */}
      {[[114, 170], [534, 170], [194, 234], [474, 226], [284, 216]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" className="fill-current text-emerald-600" />
      ))}
      <text x="560" y="150" fontSize="7.2" className="fill-current text-emerald-600" fontWeight="700">growing tips secrete</text>
      <text x="560" y="164" fontSize="7.2" className="fill-current text-emerald-600" fontWeight="700">digestive enzymes</text>

      {/* litter */}
      {[[130, 210], [420, 250], [600, 220]].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="18" ry="7" className="fill-current text-amber-700/40" />
      ))}
      <text x="130" y="240" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">leaf litter digested externally</text>

      {/* facts */}
      <rect x="30" y="256" width="660" height="36" rx="10" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="50" y="272" fontSize="7.8" className="fill-current text-foreground" fontWeight="700">Facts: one teaspoon of soil can hold kilometres of hyphae; the largest known organism is a honey-fungus mycelium spanning ~9 km².</text>
      <text x="50" y="287" fontSize="7.4" className="fill-current text-muted-foreground">Mycelium transports nutrients across the network — food made at one tip can feed growth at another.</text>
    </svg>
  );
}
