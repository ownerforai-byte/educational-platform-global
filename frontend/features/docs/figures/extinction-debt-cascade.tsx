/** Extinction debt cascade — delayed collapse after habitat loss. Well-detailed. Theme-aware. */
export function ExtinctionDebtCascade({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Extinction debt cascade delayed extinction habitat loss fragmentation time lag species survive temporarily doomed relaxation large long lived species disappear later seed bank ecological trap future loss already committed">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Extinction debt — damage billed later</text>
      {/* concept */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-stone-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE TIME LAG</text>
      {[
        "habitat is destroyed today, but",
        "  long-lived species persist for",
        "  years or decades",
        "the 'debt': extinctions already",
        "  committed, not yet paid",
        "old trees, large mammals and",
        "  slow breeders are the last to",
        "  vanish — the ghost species",
        "small isolated fragments relax",
        "  toward fewer species over time",
        "implication: today's counts",
        "  overstate tomorrow's survival",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* implications */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHAT IT MEANS FOR CONSERVATION</text>
      {[
        "a protected fragment's species",
        "  list is a snapshot, not a",
        "  guarantee",
        "monitoring must watch population",
        "  trends, not just presence",
        "restoring connectivity now pays",
        "  off decades later — the debt",
        "  can be partly repaid",
        "young forest looks empty because",
        "  it is: recolonisation is slow",
        "the lesson: act before the",
        "  decline becomes visible",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-amber-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: extinction debt = committed future loss from past habitat destruction — the lag is the concept.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Absence of visible decline is not absence of decline — slow species hide the trend.</text>
    </svg>
  );
}
