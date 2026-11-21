/** Ecosystem services categories — nature's four kinds of free work. Well-detailed. Theme-aware. */
export function EcosystemServicesCategories({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Ecosystem services categories provisioning regulating cultural supporting food water timber climate regulation pollination water purification recreation spiritual soil formation nutrient cycling MEA classification examples table ecosystem economy">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Ecosystem services — nature's four kinds of free work</text>
      {/* categories */}
      <rect x="30" y="40" width="660" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      {[
        ["Provisioning", "products we harvest: food, water, timber, fibre, medicine", 130],
        ["Regulating", "processes that stabilise: climate, floods, pollination, purification", 300],
        ["Cultural", "non-material benefits: recreation, spiritual, aesthetic, education", 470],
        ["Supporting", "underlying functions: soil formation, nutrient cycling, habitat", 620],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 78} y="70" width="156" height="110" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
          <text x={x as number} y="92" fontSize="6.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name as string}</text>
          <text x={x as number} y="112" fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 32)}</text>
          <text x={x as number} y="126" fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(32, 64)}</text>
          <text x={x as number} y="140" fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(64, 96)}</text>
          <text x={x as number} y="166" fontSize="5.6" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="700">{["rice, timber", "bees, wetlands", "trekking, temples", "soil, nitrogen"][i]}</text>
        </g>
      ))}
      <text x="360" y="200" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">supporting services underpin the other three — the foundation under the visible benefits</text>
      {/* facts */}
      <rect x="30" y="212" width="660" height="80" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="232" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The valuation problem: regulating services have no price tag, so they vanish from cost-benefit sheets — wetlands get drained 'profitably'.</text>
      <text x="360" y="250" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: four categories (provisioning, regulating, cultural, supporting) with one example each — the MEA classification.</text>
      <text x="360" y="268" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Pollination alone is worth hundreds of billions globally — an unpaid workforce of insects.</text>
      <text x="360" y="284" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Name the category before the example — examiners mark the classification first.</text>
    </svg>
  );
}
