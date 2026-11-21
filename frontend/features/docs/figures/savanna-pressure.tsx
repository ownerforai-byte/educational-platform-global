/** Savanna pressure — forest shrinkage drove bipedalism. Well-detailed. Theme-aware. */
export function SavannaPressure({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Savanna pressure forest shrinkage Miocene cooling open woodland grassland bipedalism driving force hominin origin Africa rift valley">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The savanna pressure — climate as the engine</text>
      {/* forest then */}
      <rect x="30" y="44" width="330" height="150" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">BEFORE — closed forest</text>
      {[[80, 120], [140, 105], [200, 125], [260, 110], [310, 122]].map(([x, y], i) => (
        <g key={i}>
          <line x1={x} y1={y + 40} x2={x} y2={y + 10} className="stroke-current" strokeWidth="3" style={{ color: "rgb(5 122 85 / 0.9)" }} />
          <circle cx={x} cy={y} r="14" className="fill-current" style={{ color: "rgb(5 122 85 / 0.4)" }} />
        </g>
      ))}
      <text x="195" y="184" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">ape life: climb, swing, four hands, fruit everywhere</text>
      {/* savanna now */}
      <rect x="390" y="44" width="300" height="150" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">AFTER — open savanna</text>
      {[[440, 150], [500, 145], [560, 152], [620, 148]].map(([x, y], i) => (
        <g key={i}>
          <line x1={x} y1={y} x2={x} y2={y - 34} className="stroke-current" strokeWidth="2.4" style={{ color: "rgb(180 130 40 / 0.9)" }} />
          <path d={`M${x} ${y - 34} q-8 -6 -14 -2 M${x} ${y - 34} q8 -6 14 -2`} className="fill-none stroke-current" strokeWidth="2" style={{ color: "rgb(180 130 40 / 0.9)" }} />
        </g>
      ))}
      <path d="M390 150 h300" className="stroke-current" strokeWidth="1.4" style={{ color: "rgb(180 130 40 / 0.9)" }} strokeDasharray="3 3" />
      <text x="540" y="184" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">grass and scattered trees: see far, walk far, carry food</text>
      <rect x="30" y="210" width="660" height="80" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Miocene cooling shrank the African forest (~7 mya) — populations at the edge faced a choice: stay with the forest, or learn the ground.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">The ones who learned the ground became hominins; the forest line became chimpanzees and gorillas.</text>
      <text x="360" y="272" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: the environment did not 'make' bipedalism — it screened the variants that already had it.</text>
    </svg>
  );
}
