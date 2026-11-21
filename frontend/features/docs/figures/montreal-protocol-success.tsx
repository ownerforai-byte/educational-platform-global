/** Montreal Protocol success — the treaty that healed ozone. Well-detailed. Theme-aware. */
export function MontrealProtocolSuccess({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Montreal Protocol 1987 success ozone layer healing CFC phase out chlorine decline hole recovery timeline international cooperation">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Montreal Protocol — the fix that worked</text>

      {/* timeline */}
      <rect x="30" y="44" width="660" height="110" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <line x1="70" y1="120" x2="650" y2="120" className="stroke-current text-stone-500" strokeWidth="2.4" markerEnd="url(#arrhl)" />
      {[
        ["1974", "CFC-ozone link proposed"],
        ["1987", "Montreal Protocol signed"],
        ["1990s", "CFCs phased out worldwide"],
        ["2000s", "chlorine peaks, starts falling"],
        ["2066", "Antarctic hole fully healed"],
      ].map(([yr, txt], i) => {
        const x = 90 + i * 130;
        return (
          <g key={yr}>
            <circle cx={x} cy="120" r="5" className="fill-current text-sky-600" />
            <text x={x} y={i % 2 ? "98" : "148"} fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{yr}</text>
            <text x={x} y={i % 2 ? "86" : "162"} fontSize="6.2" textAnchor="middle" className="fill-current text-muted-foreground">{txt.slice(0, 28)}</text>
          </g>
        );
      })}

      {/* why it worked */}
      <rect x="30" y="168" width="320" height="124" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="190" y="190" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHY IT WORKED</text>
      {[
        "every producing nation signed",
        "substitutes existed and were cheap",
        "trade bans punished outsiders",
        "rich countries funded the poor's switch",
      ].map((t, i) => (
        <text key={t} x="50" y={212 + i * 18} fontSize="7.2" className="fill-current text-muted-foreground">• {t}</text>
      ))}

      {/* lesson */}
      <rect x="380" y="168" width="310" height="124" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="535" y="190" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE LESSON FOR CLIMATE</text>
      {[
        "global problems need global treaties",
        "science → agreement → phase-out",
        "ozone healed because every nation",
        "  had a substitute and a deadline",
        "climate is harder: energy itself",
        "  must change, not one chemical",
      ].map((t, i) => (
        <text key={t} x="400" y={212 + i * 13} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
    </svg>
  );
}
