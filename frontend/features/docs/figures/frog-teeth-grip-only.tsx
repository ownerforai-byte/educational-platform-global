/** Frog teeth grip only — maxillary vomerine truth. Well-detailed. Theme-aware. */
export function FrogTeethGripOnly({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Frog teeth grip only maxillary vomerine no chewing swallow whole upper jaw only teeth mucus saliva swallowing eyeballs retract">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Frog teeth — grip, never chew</text>
      {/* mouth roof */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">INSIDE THE UPPER JAW</text>
      <path d="M70 120 q125 -40 250 0" className="fill-none stroke-current" strokeWidth="3" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      {/* maxillary teeth row */}
      {Array.from({ length: 14 }).map((_, i) => (
        <path key={i} d={`M${80 + i * 18} 124 l2 7 l2 -7`} className="fill-none stroke-current" strokeWidth="1.2" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      ))}
      <text x="195" y="146" fontSize="6.4" textAnchor="middle" className="fill-current text-sky-600" fontWeight="700">maxillary teeth — a row along the jaw edge</text>
      {/* vomerine teeth */}
      {[[170, 158], [220, 158]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="6" className="fill-none stroke-current" strokeWidth="1.2" style={{ color: "rgb(244 63 94 / 0.9)" }} />
          <path d={`M${x - 3} ${y} l3 5 l3 -5`} className="fill-none stroke-current" strokeWidth="1" style={{ color: "rgb(244 63 94 / 0.9)" }} />
        </g>
      ))}
      <text x="195" y="178" fontSize="6.4" textAnchor="middle" className="fill-current text-rose-600" fontWeight="700">vomerine teeth — two patches on the roof (vomer bone)</text>
      <text x="195" y="210" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">lower jaw has NO teeth — prey is held, not chewed</text>
      {/* facts */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THEN HOW DOES IT EAT?</text>
      {[
        "sticky forked tongue snatches prey",
        "teeth only stop it escaping",
        "eyes sink into the roof of the",
        "  mouth and shove the meal down",
        "swallowed whole — digestion does",
        "  all the cutting chemically",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: maxillary (jaw edge) vs vomerine (roof patches) — and the twist: teeth exist only in the upper jaw.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">The eye-retraction swallow is the frog's most examinable feeding detail.</text>
    </svg>
  );
}
