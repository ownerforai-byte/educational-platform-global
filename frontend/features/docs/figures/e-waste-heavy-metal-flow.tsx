/** E-waste heavy metal flow — the gadget afterlife. Well-detailed. Theme-aware. */
export function EWasteHeavyMetalFlow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="E-waste heavy metal flow discarded phones computers lead mercury cadmium informal recycling burning cables gold recovery health effects Guiyu Basel Convention export flow developing countries urban mining">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">E-waste — where gadgets go to leak</text>
      {/* flow */}
      <rect x="30" y="44" width="660" height="150" rx="12" className="fill-current text-stone-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      {[
        ["1. Discard", "fast turnover: phones replaced in ~2–3 years", 130],
        ["2. Export", "much 'donated' e-waste ships to poorer countries", 300],
        ["3. Informal recycling", "cables burned for copper; boards acid-leached for gold", 470],
        ["4. Exposure", "lead, mercury, cadmium reach air, soil, water, workers", 620],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 68} y="70" width="136" height="96" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
          <text x={x as number} y="90" fontSize="6.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name as string}</text>
          <text x={x as number} y="110" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 30)}</text>
          <text x={x as number} y="124" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(30, 60)}</text>
          {i < 3 && <path d={`M${(x as number) + 70} 118 h${((x as number) + 128) - (x as number) - 70 - 2} m-6 -5 l6 5 l-6 5`} className="fill-none stroke-current" strokeWidth="1.8" style={{ color: "rgb(120 113 108 / 0.9)" }} />}
        </g>
      ))}
      <text x="360" y="186" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">a phone contains gold, silver, copper — and lead, mercury, cadmium: treasure and poison in one shell</text>
      {/* facts */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-amber-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The Basel Convention restricts hazardous-waste export — but enforcement lags the shipping containers.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Child workers at informal sites show lead levels far above safe limits — the human cost is direct.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: e-waste = fastest-growing waste stream; heavy metals + informal burning = the hazard.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">'Urban mining' done properly recovers metals safely — the solution is formalisation, not prohibition.</text>
    </svg>
  );
}
