/** Earthworm hermaphrodite trade-off — both kits, no selfing. Well-detailed. Theme-aware. */
export function EarthwormHermaphroditeTradeoff({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Earthworm hermaphrodite trade off both sexes one body no self fertilisation cross fertilisation spermatheca storage advantages encounters rare slow animal">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Hermaphrodite — both kits, but no selfing</text>
      {/* paradox */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE PARADOX</text>
      {[
        "one worm carries testes AND ovaries",
        "so why not fertilise itself?",
        "the sperm sits in the partner's",
        "  spermathecae, never its own —",
        "  the plumbing makes selfing",
        "  physically impossible",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* advantages */}
      <rect x="390" y="44" width="300" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHY BE BOTH?</text>
      {[
        "any encounter produces offspring",
        "  from both sides — double the",
        "  yield of a single-sex meeting",
        "slow, solitary burrowers meet",
        "  rarely — efficiency matters",
        "cross-fertilisation still keeps",
        "  genetic variety flowing",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="240" width="660" height="52" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="258" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Hermaphroditism solves scarcity, not convenience: it doubles the payoff of every rare meeting without sacrificing genetic mixing.</text>
      <text x="360" y="276" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: 'hermaphrodite but cross-fertilising' — write both halves; either alone loses the mark.</text>
      <text x="360" y="288" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Spermathecae (4 pairs, segments 6–9) store the partner's sperm for later use.</text>
    </svg>
  );
}
