/** Frog parental care absence — quantity over quality. Well-detailed. Theme-aware. */
export function FrogParentalCareAbsence({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Frog parental care absence quantity over quality thousands eggs no guarding high mortality strategy r selected contrast birds mammals survival odds jelly protection">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">No parents, thousands of eggs — the strategy</text>
      {/* strategy math */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE NUMBERS</text>
      {[
        ["Eggs laid", "thousands per spawn", 130],
        ["Reach tadpole", "a fraction", 300],
        ["Reach adult", "a few — enough to", "replace the parents", 470],
      ].map(([a, b, c, x], i) => (
        <g key={a as string}>
          <rect x={(x as number) - 68} y="80" width="136" height="100" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
          <text x={x as number} y={102} fontSize="6.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{a as string}</text>
          <text x={x as number} y={120} fontSize="5.8" textAnchor="middle" className="fill-current text-muted-foreground">{b as string}</text>
          {c && <text x={x as number} y={134} fontSize="5.8" textAnchor="middle" className="fill-current text-muted-foreground">{c as string}</text>}
          {i < 2 && <path d={`M${(x as number) + 70} 130 h${((x as number) + 128) - (x as number) - 70 - 2} m-6 -5 l6 5 l-6 5`} className="fill-none stroke-current" strokeWidth="1.6" style={{ color: "rgb(2 132 199 / 0.9)" }} />}
        </g>
      ))}
      <text x="195" y="212" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">brute-force reproduction: most die, but enough survive</text>
      {/* contrast */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE OTHER STRATEGY</text>
      {[
        "birds and mammals: few young,",
        "  heavy parental investment",
        "frogs: many young, zero care —",
        "  the jelly and the pond do the work",
        "both work because each fits the",
        "  animal's body and habitat",
        "some tropical frogs do guard eggs",
        "  — exceptions prove the rule",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: frogs show no parental care — survival depends on egg numbers, jelly protection and luck.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Amplexus is the frog's only parenting act — timing the fertilisation, then leaving.</text>
    </svg>
  );
}
