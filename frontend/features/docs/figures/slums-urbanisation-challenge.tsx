/** Slums urbanisation challenge — the informal city. Well-detailed. Theme-aware. */
export function SlumsUrbanisationChallenge({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Slums urbanisation challenge informal settlements squatter settlements Kathmandu Bagmati river banks definition lack tenure water sanitation overcrowding Dharavi Mumbai Kibera favelas push pull rural migration urban growth rate services informal economy recycling entrepreneurship upgrading vs eviction debate in situ slum improvement security tenure basic services participatory">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Slums — the informal city inside the city</text>
      {/* what defines */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHAT MAKES A SLUM (UN criteria)</text>
      {[
        "no secure tenure — eviction",
        "  risk shapes every decision",
        "no durable housing",
        "insufficient water and",
        "  sanitation",
        "overcrowding — several people",
        "  per room",
        "Kathmandu's riverbank settlements",
        "  (Bagmati, Bishnumati) fit the",
        "  pattern; globally a billion",
        "  people live in informal",
        "  settlements",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* the debate */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">UPGRADE vs EVICT</text>
      {[
        "slums are also economies: waste",
        "  pickers, workshops, remittance",
        "  economies — Dharavi's turnover",
        "  rivals small nations",
        "upgrading in place (tenure +",
        "  water + sewer + paths) beats",
        "  mass eviction — evicted people",
        "  rebuild slums elsewhere",
        "the push-pull: rural poverty and",
        "  conflict push; urban jobs and",
        "  services pull — the flow won't",
        "  stop, so plan for it",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-amber-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: four UN slum criteria + upgrade-not-evict with one reason — the balanced urban answer.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">A slum is a housing failure and a survival strategy at once — policy fails when it sees only the first.</text>
    </svg>
  );
}
