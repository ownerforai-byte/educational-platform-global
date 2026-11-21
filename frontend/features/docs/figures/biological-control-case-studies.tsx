/** Biological control case studies — pests versus their enemies. Well-detailed. Theme-aware. */
export function BiologicalControlCaseStudies({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Biological control case studies ladybird cottony cushion scale Australia cane toad failure cautionary tale Bacillus thuringiensis cotton bollworm trichogramma egg parasitoid success and failure examples pest enemy">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Biological control — triumphs and a famous failure</text>
      {/* case cards */}
      <rect x="30" y="40" width="660" height="170" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      {[
        ["Ladybird vs scale", "Australia, 1888: imported ladybird saved the citrus industry — the classic success", 130],
        ["Bt cotton", "bacterial toxin gene in cotton kills bollworm; less spraying, resistance managed by refuges", 300],
        ["Trichogramma wasps", "egg parasitoids released over fields; the pest never hatches", 470],
        ["Cane toad, 1935", "introduced to eat cane beetles — ate everything else instead: the cautionary tale", 620],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 78} y="66" width="156" height="110" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.6" stroke="currentColor" style={{ color: i === 3 ? "rgb(244 63 94 / 0.9)" : "rgb(16 185 129 / 0.9)" }} />
          <text x={x as number} y="86" fontSize="6.2" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name as string}</text>
          <text x={x as number} y="104" fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 30)}</text>
          <text x={x as number} y="116" fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(30, 60)}</text>
          <text x={x as number} y="128" fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(60, 90)}</text>
          <text x={x as number} y="146" fontSize="5.6" textAnchor="middle" className="fill-current" fontWeight="700" style={{ color: i === 3 ? "rgb(220 38 38)" : "rgb(22 163 74)" }}>{i === 3 ? "FAILED" : "SUCCESS"}</text>
        </g>
      ))}
      <text x="360" y="198" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">the rule: use a specialised natural enemy, test host specificity, and never import a generalist predator</text>
      {/* facts */}
      <rect x="30" y="212" width="660" height="80" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="232" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Biological control is self-renewing: the enemy population tracks the pest — no respraying, no residue.</text>
      <text x="360" y="250" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">But introductions are forever: the cane toad still spreads across Australia decades later.</text>
      <text x="360" y="268" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: one success (ladybird/scale), one modern (Bt cotton), one failure (cane toad) — name all three.</text>
      <text x="360" y="284" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Specificity testing separates biocontrol from biological invasion.</text>
    </svg>
  );
}
