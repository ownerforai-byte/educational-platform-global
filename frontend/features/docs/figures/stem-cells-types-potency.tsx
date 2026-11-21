/** Stem cells types potency — the body's blank slates. Well-detailed. Theme-aware. */
export function StemCellsTypesPotency({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Stem cells types potency totipotent pluripotent multipotent zygote embryonic adult bone marrow cord blood induced pluripotent iPS Yamanaka four factors ethics embryo destruction debate regenerative medicine applications blood leukaemia cornea skin grafts differentiation hierarchy">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Stem cells — potency, from zygote to marrow</text>
      {/* potency ladder */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE POTENCY LADDER</text>
      {[
        ["Totipotent", "zygote → every cell + placenta", 120],
        ["Pluripotent", "embryonic cells → all body tissues", 165],
        ["Multipotent", "adult stem cells → limited lineages", 210],
      ].map(([k, v, y], i) => (
        <g key={k}>
          <text x="60" y={(y as number) - 4} fontSize="6.8" className="fill-current text-violet-600" fontWeight="800">{k}</text>
          <text x="60" y={(y as number) + 10} fontSize="6.2" className="fill-current text-muted-foreground">{v}</text>
        </g>
      ))}
      <text x="195" y="216" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">potency narrows with specialisation — the ladder only descends</text>
      {/* sources */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">SOURCES AND USES</text>
      {[
        "bone marrow transplant: the",
        "  oldest stem-cell therapy —",
        "  treats leukaemias",
        "cord blood: collected at birth,",
        "  stored for matched transplants",
        "iPS cells (2006): adult cells",
        "  reprogrammed back to",
        "  pluripotency — Yamanaka's",
        "  Nobel-winning trick sidesteps",
        "  the embryo debate",
        "future: grown tissue for",
        "  burns, corneas, organs",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-violet-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: totipotent then pluripotent then multipotent — order, one example each, and iPS as the ethics dodge.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Bone marrow transplants prove stem-cell medicine is decades old, not science fiction.</text>
    </svg>
  );
}
