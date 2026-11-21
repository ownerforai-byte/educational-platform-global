/** Ozone hole discovery — a global detective story. Well-detailed. Theme-aware. */
export function OzoneHoleDiscovery({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Ozone hole discovery CFCs chlorofluorocarbons refrigerants Molina Rowland 1974 prediction Antarctic spring British Antarctic Survey Farman 1985 Montreal Protocol 1987 UVB skin cancer success story">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The ozone hole — predicted, then found, then fixed</text>
      {/* timeline */}
      <rect x="30" y="44" width="660" height="160" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <line x1="70" y1="120" x2="650" y2="120" className="stroke-current" strokeWidth="3" style={{ color: "rgb(2 132 199 / 0.5)" }} />
      {[
        ["1930s", "CFCs invented — 'perfectly safe' refrigerants", 130],
        ["1974", "Molina & Rowland predict chlorine destroys ozone", 280],
        ["1985", "Farman's team finds the Antarctic ozone hole", 430],
        ["1987", "Montreal Protocol: CFCs phased out worldwide", 580],
      ].map(([yr, ev, x], i) => (
        <g key={yr as string}>
          <circle cx={x as number} cy="120" r="7" className="fill-current" style={{ color: i < 2 ? "rgb(217 119 6 / 0.8)" : "rgb(16 185 129 / 0.8)" }} />
          <text x={x as number} y={i % 2 === 0 ? 100 : 150} fontSize="7" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{yr as string}</text>
          <text x={x as number} y={i % 2 === 0 ? 112 : 162} fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(ev as string).slice(0, 26)}</text>
          <text x={x as number} y={i % 2 === 0 ? 122 : 172} fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(ev as string).slice(26, 52)}</text>
        </g>
      ))}
      <text x="360" y="196" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">prediction (1974) came before detection (1985) — theory beat observation by a decade</text>
      {/* facts */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The chemistry: one chlorine atom catalytically destroys ~100,000 ozone molecules — a tiny leak, a huge effect.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Why Antarctica: polar stratospheric clouds free chlorine in spring; the hole is seasonal, deepest in October.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: CFC → chlorine radical → ozone loss; Montreal Protocol (1987) is the most successful environmental treaty ever.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Molina and Rowland won the Nobel Prize — and the hole is now slowly healing.</text>
    </svg>
  );
}
