/** Organic farming principles — the four IFOAM pillars. Well-detailed. Theme-aware. */
export function OrganicFarmingPrinciplesDetail({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Organic farming principles four IFOAM pillars health ecology fairness care no synthetic pesticides fertilisers GMO free compost green manure crop rotation biological nitrogen fixation integrated pest management certification transition period yield gap premium price market Nepal organic pockets cardamom coffee ginger export potential certification cost smallholder barriers">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Organic farming — the four principles, the real trade-offs</text>
      {/* principles */}
      <rect x="30" y="40" width="660" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      {[
        ["Health", "sustain health of soil, plant, animal, human, planet as one", 130],
        ["Ecology", "work with living systems — rotation, compost, biological control", 260],
        ["Fairness", "fair to farmers, workers, consumers, and future generations", 390],
        ["Care", "precaution: no GMOs, no synthetic pesticides or fertilisers", 520],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 78} y="70" width="156" height="110" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
          <text x={x as number} y="92" fontSize="6.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name as string}</text>
          <text x={x as number} y="112" fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 32)}</text>
          <text x={x as number} y="126" fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(32, 64)}</text>
          <text x={x as number} y="140" fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(64, 96)}</text>
          <text x={x as number} y="168" fontSize="5.6" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="700">{["soil = health", "rotation+compost", "fair trade", "precaution"][i]}</text>
        </g>
      ))}
      <text x="360" y="200" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">IFOAM's four principles — memorise the names; the explanations follow from them</text>
      {/* facts */}
      <rect x="30" y="212" width="660" height="80" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="232" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The honest trade-off: yields often dip during the transition (2–3 years), then recover; premiums and lower input costs close the gap for many crops.</text>
      <text x="360" y="250" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Nepal's opening: cardamom, ginger, coffee and tea fetch organic premiums abroad — but certification costs bite smallholders.</text>
      <text x="360" y="268" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: four principles + one benefit + one limitation — the balanced organic-farming answer.</text>
      <text x="360" y="284" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Organic is a system, not a product label — the principles matter more than the certificate.</text>
    </svg>
  );
}
