/** Resistance evolution spray — selection in fast forward. Well-detailed. Theme-aware. */
export function ResistanceEvolutionSpray({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Resistance evolution under spray selection pressure rare mutant survivors reproduce generation insect generations faster evolution dose escalation treadmill genetic variation natural selection agriculture">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Resistance — evolution in fast forward</text>
      {/* generations */}
      <rect x="30" y="44" width="660" height="160" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      {[
        ["Spray 1", "99% die; the rare tolerant few survive", 130],
        ["Generation 2", "survivors breed — tolerance spreads", 300],
        ["Spray 2", "same dose now kills far fewer", 470],
        ["Resistance", "the field needs a new chemical", 620],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 68} y="70" width="136" height="96" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
          <text x={x as number} y="92" fontSize="6.8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name as string}</text>
          <text x={x as number} y="112" fontSize="5.8" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 30)}</text>
          <text x={x as number} y="126" fontSize="5.8" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(30, 60)}</text>
          {i < 3 && <path d={`M${(x as number) + 70} 118 h${((x as number) + 128) - (x as number) - 70 - 2} m-6 -5 l6 5 l-6 5`} className="fill-none stroke-current" strokeWidth="1.8" style={{ color: "rgb(217 119 6 / 0.9)" }} />}
        </g>
      ))}
      <text x="360" y="186" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">insects breed in weeks, not years — hundreds of generations of selection fit inside a decade</text>
      {/* facts */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The pesticide treadmill: stronger dose → stronger selection → stronger resistance → new chemical → repeat.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Over 500 insect species now resist at least one pesticide; weeds resist glyphosate across millions of hectares.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: resistance = selection of pre-existing variants, not 'weakening' chemicals — a Darwinian, not chemical, problem.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Slowing it needs rotation, refuges and reduced spraying — IPM's core logic.</text>
    </svg>
  );
}
