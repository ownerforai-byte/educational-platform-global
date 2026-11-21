/** Population momentum — why growth continues after fertility falls. Well-detailed. Theme-aware. */
export function PopulationMomentum({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Population momentum growth continues after fertility falls age structure pyramid broad base young people reaching reproductive age built in growth even replacement fertility inertia demographic explanation example China India Nigeria projection policy education women empowerment lag effect generations demographic dividend window">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Population momentum — the growth already built in</text>
      {/* concept */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE MECHANISM</text>
      {[
        "even if fertility instantly drops",
        "  to replacement (2.1), the",
        "  population keeps growing —",
        "  because so many people are",
        "  already young and about to",
        "  have children",
        "a broad-based pyramid stores",
        "  growth like a flywheel stores",
        "  spin",
        "momentum explains why growth",
        "  lags policy by a generation —",
        "  the future parents already",
        "  exist",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* implications */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE IMPLICATIONS</text>
      {[
        "Nepal: fertility is near",
        "  replacement, yet growth",
        "  continues — momentum, not",
        "  high fertility",
        "the dividend: a large working-",
        "  age cohort relative to",
        "  dependents can power growth —",
        "  if jobs exist",
        "the ageing tail: decades later",
        "  the same cohort retires —",
        "  Japan and soon China show",
        "  the other side",
        "exam hook: define momentum,",
        "  explain with the pyramid's",
        "  base, give one policy use",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: momentum = built-in growth from age structure, not birth rate — the pyramid's base is the explanation.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Demography is destiny with a lag — today's classrooms are tomorrow's maternity wards.</text>
    </svg>
  );
}
