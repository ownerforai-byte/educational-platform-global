/** Coelom evolution advantage — why a body cavity matters. Well-detailed. Theme-aware. */
export function CoelomEvolutionAdvantage({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Coelom evolution advantage body cavity organs move independently hydrostatic skeleton cushioning storage circulation space acoelomate flatworm pseudocoelomate roundworm">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Why a coelom changed everything</text>
      {[
        ["Space for organs", "gut, heart and kidneys get their own room to grow and move", "rgb(2 132 199)"],
        ["Hydrostatic skeleton", "fluid in the cavity gives muscles something firm to push against", "rgb(16 185 129)"],
        ["Independent plumbing", "gut wall can move while body wall moves differently — digestion improves", "rgb(139 92 246)"],
        ["Cushioning and storage", "fluid absorbs shocks and holds gametes and waste in transit", "rgb(245 158 11)"],
      ].map(([name, detail, rgb], i) => {
        const y = 44 + i * 56;
        return (
          <g key={name}>
            <rect x="30" y={y} width="660" height="48" rx="10" className="fill-current text-slate-500/10" strokeWidth="2" stroke="currentColor" style={{ color: `${rgb} / 0.9` }} />
            <text x="50" y={y + 20} fontSize="8.2" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name}</text>
            <text x="50" y={y + 37} fontSize="7" className="fill-current text-muted-foreground">{detail}</text>
          </g>
        );
      })}
      <rect x="30" y="272" width="660" height="20" rx="6" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: the coelom is not empty — it is working space, and that is why every large animal has one.</text>
    </svg>
  );
}
