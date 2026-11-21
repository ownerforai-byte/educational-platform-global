/** Competition — interference, exploitation, and the cost of overlap. Well-detailed. Theme-aware. */
export function CompetitionOverlap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Competition interference exploitation resource overlap Gause competitive exclusionParamecium niche partitioning intraspecific interspecific minus minus">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Competition — the −/− interaction</text>

      {/* niche overlap diagram */}
      <rect x="30" y="44" width="330" height="220" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="195" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">RESOURCE OVERLAP</text>
      <ellipse cx="150" cy="150" rx="90" ry="60" className="fill-current text-sky-500/20" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <ellipse cx="240" cy="150" rx="90" ry="60" className="fill-current text-amber-500/20" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="110" y="154" fontSize="7.2" textAnchor="middle" className="fill-current text-sky-700">species A</text>
      <text x="282" y="154" fontSize="7.2" textAnchor="middle" className="fill-current text-amber-700">species B</text>
      <text x="195" y="154" fontSize="7" textAnchor="middle" className="fill-current text-rose-600" fontWeight="700">contested</text>
      {[
        "intraspecific: within one species",
        "interspecific: between two species",
        "the overlap zone is where both lose",
      ].map((t, i) => (
        <text key={t} x="50" y={230 + i * 14} fontSize="7.2" className="fill-current text-muted-foreground">• {t}</text>
      ))}

      {/* outcomes */}
      <rect x="390" y="44" width="300" height="220" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="540" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">TWO WAYS IT PLAYS OUT</text>
      <text x="406" y="92" fontSize="7.4" className="fill-current text-rose-600" fontWeight="700">1. Competitive exclusion</text>
      {["one species outcompetes the", "other to local extinction —", "two species, one niche, one survivor"].map((t, i) => (
        <text key={t} x="406" y={108 + i * 14} fontSize="7" className="fill-current text-muted-foreground">{i === 0 ? t : "  " + t}</text>
      ))}
      <text x="406" y="166" fontSize="7.4" className="fill-current text-emerald-600" fontWeight="700">2. Resource partitioning</text>
      {["the rivals divide the niche —", "different times, heights or foods,", "and both persist side by side"].map((t, i) => (
        <text key={t} x="406" y={182 + i * 14} fontSize="7" className="fill-current text-muted-foreground">{i === 0 ? t : "  " + t}</text>
      ))}
      <rect x="390" y="272" width="300" height="20" rx="6" className="fill-current text-violet-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="540" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: competition harms both — nature resolves it by exclusion or partitioning.</text>
    </svg>
  );
}
