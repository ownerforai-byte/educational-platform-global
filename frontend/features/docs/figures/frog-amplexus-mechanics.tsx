/** Frog amplexus mechanics — the embrace timing. Well-detailed. Theme-aware. */
export function FrogAmplexusMechanics({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Frog amplexus mechanics embrace timing male grasps female axillary nuptial pads grip external fertilisation synchrony eggs sperm released together water monsoon night">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Amplexus — the embrace as fertilisation machinery</text>
      {/* amplexus pose */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE POSE</text>
      <ellipse cx="185" cy="150" rx="80" ry="42" className="fill-current text-emerald-500/25" stroke="currentColor" strokeWidth="2.2" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      <text x="185" y="154" fontSize="6.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">female</text>
      <ellipse cx="130" cy="128" rx="46" ry="26" className="fill-current text-sky-500/30" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="130" y="132" fontSize="6" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">male on back</text>
      <circle cx="100" cy="112" r="6" className="fill-none stroke-current" strokeWidth="2" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="212" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">male grips behind the female's forelimbs (axillary) with nuptial pads</text>
      {/* timing */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHY THE EMBRACE?</text>
      {[
        "external fertilisation needs both",
        "  gametes released at once",
        "the embrace synchronises egg and",
        "  sperm release over hours",
        "no penis, no internal transfer —",
        "  timing is everything",
        "the pair may stay clasped for a",
        "  whole night in the pond",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-rose-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: amplexus = male clasps female (axillary grip, nuptial pads) to synchronise external fertilisation.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Fertilisation is external and in water — the embrace substitutes for the anatomy frogs never evolved.</text>
    </svg>
  );
}
