/** Tissue culture steps — cloning plants in glass. Well-detailed. Theme-aware. */
export function TissueCultureSteps({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Tissue culture steps micropropagation explant sterilisation nutrient agar medium hormones auxin cytokinin callus shoot root regeneration hardening acclimatisation banana orchid potato disease free clones totipotency">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Tissue culture — cloning a plant in glass</text>
      {/* steps */}
      <rect x="30" y="44" width="660" height="160" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      {[
        ["1. Explant", "cut a tiny piece of meristem tissue", 130],
        ["2. Sterilise", "surface-sterilise; work in sterile conditions", 300],
        ["3. Callus", "agar + auxin/cytokinin → undifferentiated mass", 470],
        ["4. Regenerate", "hormone ratios tuned → shoots then roots", 620],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 68} y="70" width="136" height="96" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
          <text x={x as number} y="92" fontSize="6.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name as string}</text>
          <text x={x as number} y="112" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 30)}</text>
          <text x={x as number} y="126" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(30, 60)}</text>
          {i < 3 && <path d={`M${(x as number) + 70} 118 h${((x as number) + 128) - (x as number) - 70 - 2} m-6 -5 l6 5 l-6 5`} className="fill-none stroke-current" strokeWidth="1.8" style={{ color: "rgb(139 92 246 / 0.9)" }} />}
        </g>
      ))}
      <text x="360" y="186" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">totipotency: any living plant cell can rebuild the whole plant — that's the licence the technique exploits</text>
      {/* facts */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Why it matters: thousands of identical, disease-free plants from one meristem — banana, potato, orchid, sugarcane at scale.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Meristem tissue escapes viruses — that's the trick behind 'virus-free seed stock'.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: explant → callus → organ regeneration → hardening; the hormone balance (auxin:cytokinin ratio) steers the outcome.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Hardening in a greenhouse is the make-or-break step — lab babies must learn weather.</text>
    </svg>
  );
}
