/** Zoo and captive breeding — the animal side of ex-situ. Well-detailed. Theme-aware. */
export function ZooCaptiveBreeding({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Zoo captive breeding ex-situ conservation Central Zoo Jawalakhel gharial vulture breeding record keeping studbook reintroduction programs">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Zoos — ex-situ for animals, with a breeding mission</text>

      {/* zoo enclosures */}
      <rect x="30" y="44" width="400" height="220" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="230" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">CENTRAL ZOO, JAWALAKHEL</text>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={70 + i * 120} y="92" width="100" height="60" rx="8" className="fill-current text-sky-500/15" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(14 165 233 / 0.9)" }} />
          <circle cx={95 + i * 120} cy="120" r="7" className="fill-current text-amber-600/50" />
          <circle cx={120 + i * 120} cy="130" r="5" className="fill-current text-amber-600/40" />
          <text x={120 + i * 120} y="146" fontSize="6" textAnchor="middle" className="fill-current text-muted-foreground">{["gharial", "vulture", "leopard"][i]}</text>
        </g>
      ))}
      <text x="230" y="180" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">enclosures designed to keep natural behaviour alive</text>
      {[
        "captive breeding: gharial eggs",
        "  hatched, young released to rivers",
        "vulture breeding against diclofenac",
        "record-keeping prevents inbreeding",
      ].map((t, i) => (
        <text key={t} x="50" y={204 + i * 16} fontSize="7.2" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}

      {/* limits */}
      <rect x="450" y="44" width="240" height="220" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="570" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE CATCH</text>
      {[
        "small spaces, small populations",
        "instincts fade over generations",
        "reintroduction is hard and costly",
        "zoos buy time — habitat saves",
        "  species in the end",
      ].map((t, i) => (
        <text key={t} x="466" y={94 + i * 17} fontSize="7.2" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <text x="466" y="196" fontSize="7" className="fill-current text-rose-500" fontWeight="700">A zoo is an ark, not a destination —</text>
      <text x="466" y="210" fontSize="7" className="fill-current text-rose-500" fontWeight="700">the goal is always back to the wild.</text>
      <text x="466" y="236" fontSize="7" className="fill-current text-muted-foreground">Exam hook: one success story</text>
      <text x="466" y="250" fontSize="7" className="fill-current text-muted-foreground">(gharial) and one limitation.</text>
    </svg>
  );
}
