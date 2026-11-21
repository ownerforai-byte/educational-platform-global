/** Sustainable development goals — the 17-point blueprint. Well-detailed. Theme-aware. */
export function SustainableDevelopmentGoals({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Sustainable development goals SDG 17 goals 2030 agenda United Nations poverty hunger health education gender water energy climate life below water on land peace partnership three pillars economic social environmental Nepal localisation VNR progress">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The SDGs — 17 goals, one deadline, three pillars</text>
      {/* 17 grid */}
      <rect x="30" y="40" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="60" fontSize="7.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ALL 17, GROUPED</text>
      {[
        ["People", "1–5: poverty, hunger, health, education, gender", 110],
        ["Planet", "6, 7, 12, 13, 14, 15: water, energy, climate, life", 190],
        ["Prosperity", "8–11: work, innovation, inequality, cities", 270],
        ["Peace & Partnership", "16–17: institutions and global cooperation", 350],
      ].map(([k, v, y], i) => (
        <g key={k as string}>
          <text x="46" y={(y as number) - 4} fontSize="6.8" className="fill-current text-sky-600" fontWeight="800">{k as string}</text>
          <text x="46" y={(y as number) + 10} fontSize="5.8" className="fill-current text-muted-foreground">{v as string}</text>
        </g>
      ))}
      <text x="195" y="212" fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">adopted 2015, deadline 2030 — successor to the Millennium Development Goals</text>
      {/* pillars */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE THREE PILLARS</text>
      {[
        "economic: growth that lasts",
        "  without exhausting its base",
        "social: equity, health,",
        "  education, inclusion",
        "environmental: planetary",
        "  boundaries respected",
        "the test of sustainability:",
        "  meeting today's needs without",
        "  stealing from tomorrow's",
        "Nepal localises via provincial",
        "  plans and periodic national",
        "  reviews (VNRs)",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: 17 goals, 2030 deadline, three pillars (economic, social, environmental) — the definition of sustainable development.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">The goals are integrated by design — climate action (13) is also a health, water and poverty goal.</text>
    </svg>
  );
}
