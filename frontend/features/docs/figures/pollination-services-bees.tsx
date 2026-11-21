/** Pollination services bees — the unpaid workforce. Well-detailed. Theme-aware. */
export function PollinationServicesBees({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Pollination services bees honeybees wild native pollinators crops dependent value share food supply almonds apples coffee cotton colony collapse disorder neonicotinoids habitat loss beekeeping economics one third crops biodiversity agriculture dependence Nepal mustard beekeeping farmers">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Pollination — the unpaid workforce in your food</text>
      {/* dependence */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE DEPENDENCE</text>
      {[
        "about one third of crop yield",
        "  by volume depends on animal",
        "  pollinators",
        "nearly 75% of crop *species*",
        "  benefit at least partly",
        "coffee, apples, almonds,",
        "  mustards, cucurbits, cotton —",
        "  the pollinator-dependent list",
        "wind does the cereals (wheat,",
        "  rice) — which is why staple",
        "  calories mask the crisis",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* threats + value */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THREATS AND VALUE</text>
      {[
        "habitat loss strips wild bees'",
        "  nesting and forage",
        "neonicotinoid pesticides impair",
        "  bee navigation and memory",
        "colony collapse disorder hit",
        "  managed honeybees in the West",
        "economic value: pollination is",
        "  worth hundreds of billions",
        "  of dollars a year globally",
        "in Nepal: beekeeping boosts",
        "  mustard and fruit yields —",
        "  pollination as a paid service",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-amber-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: ~1/3 of crop volume, ~75% of crop species depend on pollinators — the two numbers to quote.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">A bee is a farm input worth more than its honey — rent hives, raise yields.</text>
    </svg>
  );
}
