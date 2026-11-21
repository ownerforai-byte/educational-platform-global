/** Road safety statistics — the epidemiology of crashes. Well-detailed. Theme-aware. */
export function RoadSafetyStatistics({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Road safety statistics accidents causes speeding drunk driving helmet seatbelt young men risk group Nepal highway deaths WHO global burden trauma emergency care prevention measures hierarchy speed kills physics energy">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Road accidents — the epidemiology of crashes</text>
      {/* causes */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE CAUSE STACK</text>
      {[
        ["Speed", "crash energy rises with speed squared — physics, not luck"],
        ["Impairment", "alcohol and fatigue multiply every other risk"],
        ["No protection", "helmets and seatbelts halve fatality odds"],
        ["Roads & vehicles", "mountain highways, overloading, worn brakes"],
        ["Young men", "the highest-risk demographic worldwide"],
      ].map(([k, v], i) => (
        <g key={k}>
          <text x="46" y={92 + i * 26} fontSize="6.6" className="fill-current text-rose-600" fontWeight="700">{k}</text>
          <text x="110" y={92 + i * 26} fontSize="6.2" className="fill-current text-muted-foreground">{v}</text>
        </g>
      ))}
      {/* prevention */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE PREVENTION LADDER</text>
      {[
        "safe roads: median barriers,",
        "  footpaths, lighting",
        "safe vehicles: standards,",
        "  inspections",
        "safe users: helmets, belts,",
        "  sober driving, speed limits",
        "post-crash care: golden hour",
        "  trauma response decides",
        "  survival",
        "Nepal's highways carry a",
        "  disproportionate share of the",
        "  national death toll",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-rose-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: crashes are preventable, not accidental — WHO counts them among the top causes of death for ages 5–29.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Treat road deaths like a disease: measure the causes, intervene on each, monitor the trend.</text>
    </svg>
  );
}
