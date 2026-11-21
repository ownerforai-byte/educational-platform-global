/** Solid waste segregation bins — the colour-coded habit. Well-detailed. Theme-aware. */
export function SolidWasteSegregationBins({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Solid waste segregation bins colour code organic green recyclable blue hazardous red yellow biomedical waste categories home sorting compost wet dry waste rules Nepal municipality collection stream mixing problem contamination">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Segregation — three bins, one habit</text>
      {/* bins */}
      <rect x="30" y="44" width="660" height="170" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      {[
        ["GREEN", "organic: food scraps, peels, garden waste → compost or biogas", "rgb(22 163 74)", 130],
        ["BLUE", "recyclables: paper, plastic, glass, metal → reprocessing", "rgb(2 132 199)", 360],
        ["RED", "hazardous: batteries, medicines, e-waste, biomedical → special handling", "rgb(220 38 38)", 590],
      ].map(([name, detail, rgb, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 80} y="80" width="160" height="100" rx="10" className="fill-current" strokeWidth="2" stroke="currentColor" style={{ color: `${rgb as string} / 0.35` }} />
          <text x={x as number} y="104" fontSize="7" textAnchor="middle" className="fill-current" style={{ color: rgb as string }} fontWeight="800">{name as string}</text>
          <text x={x as number} y="124" fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 34)}</text>
          <text x={x as number} y="138" fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(34, 68)}</text>
          <text x={x as number} y="152" fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(68, 102)}</text>
          <text x={x as number} y="172" fontSize="5.6" textAnchor="middle" className="fill-current" fontWeight="700" style={{ color: rgb as string }}>{["→ compost", "→ recycled", "→ safe disposal"][i]}</text>
        </g>
      ))}
      <text x="360" y="200" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">mixed waste is contaminated waste: one banana peel can doom a bag of clean recyclables</text>
      {/* facts */}
      <rect x="30" y="212" width="660" height="80" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="232" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Over half of Nepali municipal waste is organic — segregation at source turns the biggest problem into compost and biogas feedstock.</text>
      <text x="360" y="250" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">The economics: sorted waste is a resource stream; mixed waste is a disposal cost. Same material, opposite ledgers.</text>
      <text x="360" y="268" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: three bins (organic, recyclable, hazardous) with one example each — the household-level answer.</text>
      <text x="360" y="284" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Segregation is the cheapest step in the waste hierarchy — and the one only citizens can do.</text>
    </svg>
  );
}
