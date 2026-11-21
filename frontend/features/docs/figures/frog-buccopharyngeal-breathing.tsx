/** Frog buccopharyngeal breathing idle cycle — mouth breathing. Well-detailed. Theme-aware. */
export function FrogBuccopharyngealBreathing({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Frog buccopharyngeal breathing idle cycle mouth breathing floor oscillates nostrils open glottis closed mouth lining oxygen exchange rhythmic throat pulsing rest">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Buccopharyngeal breathing — the idle throat cycle</text>
      {/* cycle */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE CYCLE, ON REPEAT</text>
      {[
        ["Floor down", "mouth cavity expands, air drawn in via nostrils", 120],
        ["Exchange", "oxygen diffuses across the mouth lining", 270],
        ["Floor up", "air expelled back out through the nostrils", 420],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 60} y="88" width="120" height="90" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
          <text x={x as number} y={108} fontSize="6.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name as string}</text>
          <text x={x as number} y={126} fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 26)}</text>
          <text x={x as number} y={140} fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(26, 52)}</text>
          {i < 2 && <path d={`M${(x as number) + 62} 132 h${((x as number) + 118) - (x as number) - 62 - 2} m-6 -5 l6 5 l-6 5`} className="fill-none stroke-current" strokeWidth="1.6" style={{ color: "rgb(2 132 199 / 0.9)" }} />}
        </g>
      ))}
      <path d="M270 200 q-30 16 -90 8 m10 -8 l-10 8 l12 4" className="fill-none stroke-current" strokeWidth="1.6" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="220" fontSize="6.4" textAnchor="middle" className="fill-current text-sky-600">the loop repeats several times a minute at rest</text>
      {/* key point */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE GLottis RULE</text>
      {[
        "during this cycle the glottis",
        "  (lung entrance) stays closed",
        "air never reaches the lungs —",
        "  exchange happens in the mouth",
        "the throat visibly pulses —",
        "  watch any resting frog",
        "only in lung breathing does the",
        "  glottis open and air push deep",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: buccopharyngeal = mouth-lining exchange with glottis shut; pulmonary = glottis open, air into lungs.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">The pulsing throat of a sitting frog is this cycle made visible.</text>
    </svg>
  );
}
