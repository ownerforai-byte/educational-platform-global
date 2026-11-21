/** Environmental ethics worldviews — anthropocentric to ecocentric. Well-detailed. Theme-aware. */
export function EnvironmentalEthicsWorldviews({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Environmental ethics worldviews anthropocentric biocentric ecocentric spectrum instrumental intrinsic value nature deep ecology Aldo Leopold land ethic stewardship dominion sustainable ethics spectrum comparison philosophy conservation roots Gandhian trusteeship">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Environmental ethics — the value-of-nature spectrum</text>
      {/* spectrum */}
      <rect x="30" y="44" width="660" height="160" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <line x1="70" y1="140" x2="650" y2="140" className="stroke-current" strokeWidth="3" style={{ color: "rgb(16 185 129 / 0.5)" }} />
      {[
        ["Anthropocentric", "nature matters for human use — instrumental value", "resource management", 160],
        ["Biocentric", "every living being has value in itself", "animal welfare, species rights", 360],
        ["Ecocentric", "the whole system — soils, water, cycles — has value", "Leopold's land ethic, deep ecology", 560],
      ].map(([name, detail, ex, x], i) => (
        <g key={name as string}>
          <circle cx={x as number} cy="140" r="8" className="fill-current" style={{ color: "rgb(16 185 129 / 0.8)" }} />
          <text x={x as number} y={i === 1 ? 100 : 110} fontSize="7" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name as string}</text>
          <text x={x as number} y={i === 1 ? 114 : 124} fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 32)}</text>
          <text x={x as number} y={i === 1 ? 126 : 136} fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(32, 64)}</text>
          <text x={x as number} y={i === 1 ? 170 : 180} fontSize="5.6" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="700">{ex as string}</text>
        </g>
      ))}
      <text x="360" y="196" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">most conservation policy sits between the poles — 'wise use' with elements of intrinsic value</text>
      {/* facts */}
      <rect x="30" y="212" width="660" height="80" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="232" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Leopold's land ethic (1949) enlarged the moral circle to soils, waters, plants and animals — 'a thing is right when it tends to preserve the integrity of the biotic community'.</text>
      <text x="360" y="250" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: define the three worldviews and place one conservation action on the spectrum — e.g., ecotourism (anthropocentric) vs wilderness protection (ecocentric).</text>
      <text x="360" y="268" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Gandhian trusteeship — 'Earth provides enough for every man's need, not every man's greed' — frames nature as held in trust.</text>
      <text x="360" y="284" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Ethics decides what counts as a cost — that is why it belongs in an environmental science exam.</text>
    </svg>
  );
}
