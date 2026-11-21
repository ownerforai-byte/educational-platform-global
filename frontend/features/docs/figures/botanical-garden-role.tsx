/** Botanical garden role — living museum of plants. Well-detailed. Theme-aware. */
export function BotanicalGardenRole({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Botanical garden role ex-situ living plant collection Godawari Nepal education research propagation labelled species conservation">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Botanical gardens — the living plant museum</text>

      {/* garden plan */}
      <rect x="30" y="44" width="400" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="230" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">GODAWARI (Kathmandu valley)</text>
      {/* beds */}
      {[0, 1, 2].map((r) => [0, 1, 2].map((c) => (
        <rect key={`${r}${c}`} x={70 + c * 110} y={92 + r * 46} width="90" height="34" rx="8" className="fill-current text-emerald-600/20" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      )))}
      {[0, 1, 2].map((r) => [0, 1, 2].map((c) => (
        <circle key={`t${r}${c}`} cx={80 + c * 110 + (r * 13) % 60} cy={100 + r * 46} r="5" className="fill-current text-emerald-600/50" />
      )))}
      <text x="230" y="248" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">labelled beds: every plant named, mapped and recorded</text>

      {/* roles */}
      <rect x="450" y="44" width="240" height="220" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="570" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">FOUR JOBS</text>
      {[
        "conservation: rare species",
        "  grown outside their habitat",
        "education: students see the",
        "  whole flora in one walk",
        "research: propagation methods",
        "  tested before reintroduction",
        "recreation + tourism revenue",
      ].map((t, i) => (
        <text key={t} x="466" y={94 + i * 17} fontSize="7.2" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <text x="466" y="228" fontSize="7" className="fill-current text-sky-600" fontWeight="700">A garden is ex-situ: the species lives,</text>
      <text x="466" y="242" fontSize="7" className="fill-current text-sky-600" fontWeight="700">but its ecosystem does not travel with it.</text>
      <text x="466" y="262" fontSize="7" className="fill-current text-muted-foreground">Exam hook: give one Nepali garden</text>
      <text x="466" y="276" fontSize="7" className="fill-current text-muted-foreground">and two of its four jobs.</text>
    </svg>
  );
}
