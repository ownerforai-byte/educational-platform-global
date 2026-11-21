/** Water purification steps household — from source to glass. Well-detailed. Theme-aware. */
export function WaterPurificationStepsHousehold({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Water purification steps household sedimentation filtration cloth filter boiling rolling boil one minute chlorination drops SODIS solar disinfection UV ceramic candle filter combination methods turbidity first Nepal springs contamination sources faecal coliform testing priority order effectiveness cost">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Household water treatment — four steps, in order</text>
      {/* steps */}
      <rect x="30" y="44" width="660" height="160" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      {[
        ["1. Sediment", "let it stand or strain through cloth — removes visible silt", 130],
        ["2. Filter", "ceramic candle or biosand — removes parasites, some bacteria", 300],
        ["3. Disinfect", "boil 1 min, chlorine drops, or SODIS (sun in PET bottle, 6 h)", 470],
        ["4. Store safely", "covered, narrow-mouth container, clean ladle", 620],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 68} y="70" width="136" height="96" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
          <text x={x as number} y="92" fontSize="6.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name as string}</text>
          <text x={x as number} y="112" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 30)}</text>
          <text x={x as number} y="126" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(30, 60)}</text>
          {i < 3 && <path d={`M${(x as number) + 70} 118 h${((x as number) + 128) - (x as number) - 70 - 2} m-6 -5 l6 5 l-6 5`} className="fill-none stroke-current" strokeWidth="1.8" style={{ color: "rgb(2 132 199 / 0.9)" }} />}
        </g>
      ))}
      <text x="360" y="186" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">order matters: disinfecting turbid water wastes the chlorine — clear it first</text>
      {/* facts */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Boiling is the most reliable but costs fuel; chlorine is cheapest per litre; SODIS needs only sun and a clear bottle — pick by context.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Recontamination is the hidden failure: dirty storage vessels undo perfect treatment — the last step matters as much as the first.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: the four steps in order, one method per step, and why turbidity must go before chlorination.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Most diarrhoea in Nepal traces to water that was treated — then stored badly.</text>
    </svg>
  );
}
