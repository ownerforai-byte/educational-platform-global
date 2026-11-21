/** Blackwater fever mechanism — haemoglobinuria. Well-detailed. Theme-aware. */
export function BlackwaterFeverMechanism({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Blackwater fever mechanism massive haemolysis haemoglobin in urine dark red water quinine sensitivity kidney damage falciparum emergency">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Blackwater fever — when the blood leaks its colour</text>
      {/* haemolysis to urine flow */}
      <rect x="30" y="44" width="660" height="150" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      {[
        ["Massive haemolysis", "infected RBCs burst en masse", 120],
        ["Haemoglobin freed", "overloads plasma, filtered at kidney", 360],
        ["Dark urine", "haemoglobin colours it cola-black", 590],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 95} y="70" width="190" height="90" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
          <text x={x as number} y={92} fontSize="7.2" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name as string}</text>
          <text x={x as number} y={112} fontSize="6.2" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 32)}</text>
          <text x={x as number} y={126} fontSize="6.2" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(32, 64)}</text>
          {i === 0 && <path d={`M${(x as number) + 95} 115 h${(360 as number) - (x as number) - 105} m-6 -5 l6 5 l-6 5`} className="fill-none stroke-current" strokeWidth="2" style={{ color: "rgb(244 63 94 / 0.9)" }} />}
          {i === 1 && <path d={`M${(x as number) + 95} 115 h${(590 as number) - (x as number) - 105} m-6 -5 l6 5 l-6 5`} className="fill-none stroke-current" strokeWidth="2" style={{ color: "rgb(244 63 94 / 0.9)" }} />}
        </g>
      ))}
      <text x="360" y="186" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">the name comes from the look of the water — patients describe passing blackish urine</text>
      {/* facts */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Why it is an emergency: the lost haemoglobin and cell debris can clog kidney tubules — kidney failure follows if fluids are not restored fast.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Classically linked to falciparum infection, sometimes with quinine treatment — a rare but feared complication.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: blackwater fever = massive haemolysis + haemoglobin in urine + kidney risk. Three linked marks.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Compare: ordinary anaemia is chronic loss; blackwater is acute, visible and sudden.</text>
    </svg>
  );
}
