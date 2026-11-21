/** Pesticide label safety — reading the fine print. Well-detailed. Theme-aware. */
export function PesticideLabelSafety({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Pesticide label safety reading dose timing protective clothing waiting period pre harvest interval storage disposal toxicity class colour code red yellow blue green farmer safety Nepal">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Reading the label — six lines that prevent poisonings</text>
      {/* label mock */}
      <rect x="30" y="44" width="330" height="200" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ON EVERY LABEL</text>
      {[
        ["Dose", "ml or g per litre — more is not better"],
        ["Timing", "which pest stage; which crop stage"],
        ["Waiting period", "days between last spray and harvest"],
        ["Protection", "gloves, mask, long sleeves while mixing"],
        ["Storage", "locked, dry, away from food and feed"],
        ["Disposal", "triple-rinse containers; never reuse"],
      ].map(([k, v], i) => (
        <g key={k}>
          <text x="46" y={92 + i * 24} fontSize="6.8" className="fill-current text-amber-600" fontWeight="700">{k}</text>
          <text x="130" y={92 + i * 24} fontSize="6.4" className="fill-current text-muted-foreground">{v}</text>
        </g>
      ))}
      {/* colour codes */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE COLOUR CODE (WHO class)</text>
      {[
        ["Red", "extremely toxic — banned or restricted", "rgb(220 38 38)"],
        ["Yellow", "highly toxic — trained handlers only", "rgb(202 138 4)"],
        ["Blue", "moderately toxic — care required", "rgb(2 132 199)"],
        ["Green", "slightly toxic — general use", "rgb(22 163 74)"],
      ].map(([c, v, rgb], i) => (
        <g key={c as string}>
          <rect x="406" y={88 + i * 34} width="40" height="18" rx="4" className="fill-current" style={{ color: `${rgb as string} / 0.5` }} stroke="currentColor" strokeWidth="1.4" />
          <text x="456" y={96 + i * 34} fontSize="6.8" className="fill-current text-foreground" fontWeight="700">{c as string}</text>
          <text x="456" y={108 + i * 34} fontSize="5.8" className="fill-current text-muted-foreground">{v as string}</text>
        </g>
      ))}
      <text x="540" y="238" fontSize="6.2" textAnchor="middle" className="fill-current text-muted-foreground">most Nepali farm poisonings trace to skipped</text>
      <text x="540" y="252" fontSize="6.2" textAnchor="middle" className="fill-current text-muted-foreground">waiting periods and missing protection</text>
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-amber-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: the pre-harvest waiting period protects consumers; the colour code warns handlers — two label systems, two audiences.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">A pesticide is safe only as used — the label is the safety manual.</text>
    </svg>
  );
}
