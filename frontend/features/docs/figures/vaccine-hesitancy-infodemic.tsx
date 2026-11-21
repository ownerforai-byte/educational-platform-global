/** Vaccine hesitancy infodemic — the trust problem. Well-detailed. Theme-aware. */
export function VaccineHesitancyInfodemic({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Vaccine hesitancy infodemic trust problem misinformation social media wakefield autism retracted study MMR measles resurgence outbreaks complacency convenience confidence 3Cs model WHO top ten threats hot shot scientists communication empathy not ridicule community leaders religious gatekeepers Nepal measles rubella campaigns COVID 19 vaccine rollout experience side effects transparency adverse event reporting pharmacovigilance">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Vaccine hesitancy — the trust problem, not the science one</text>
      {/* the 3Cs */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE 3Cs OF HESITANCY</text>
      {[
        ["Complacency", "diseases faded from memory, so the risk feels abstract", 120],
        ["Convenience", "distance, timing, cost — friction beats intention", 165],
        ["Confidence", "doubt in the product, provider, or system — the deep one", 210],
      ].map(([k, v, y], i) => (
        <g key={k}>
          <text x="60" y={(y as number) - 4} fontSize="6.8" className="fill-current text-amber-600" fontWeight="800">{k}</text>
          <text x="60" y={(y as number) + 10} fontSize="6.2" className="fill-current text-muted-foreground">{v}</text>
        </g>
      ))}
      <text x="195" y="216" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">the Wakefield autism paper was fraudulent and retracted — the doubt it seeded outlived the paper</text>
      {/* what works */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHAT WORKS</text>
      {[
        "empathy beats ridicule — answer",
        "  the specific fear, not the",
        "  strawman",
        "trusted messengers: local health",
        "  workers, faith and community",
        "  leaders — messenger beats",
        "  message",
        "transparency about side effects",
        "  builds more trust than",
        "  pretending none exist",
        "measles's return in under-",
        "  vaccinated pockets is the",
        "  warning shot",
        "exam hook: name the 3Cs + one",
        "  countermeasure each — the",
        "  structured hesitancy answer",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-amber-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: the 3Cs (complacency, convenience, confidence) + the retracted autism myth — the two anchors of any hesitancy answer.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Vaccines work only at the population level — hesitancy is a maths problem as much as a medical one.</text>
    </svg>
  );
}
