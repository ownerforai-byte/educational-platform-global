/** Composting process stages — turning waste into soil. Well-detailed. Theme-aware. */
export function CompostingProcessStages({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Composting process stages aerobic decomposition microbes mesophilic thermophilic cooling maturation browns greens carbon nitrogen ratio turning aeration weeks to months vermicompost worms finished compost uses garden soil amendment temperature curve">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Composting — the four-phase breakdown</text>
      {/* phases */}
      <rect x="30" y="44" width="660" height="160" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      {[
        ["1. Mesophilic", "moderate microbes start on sugars (days)", 130],
        ["2. Thermophilic", "pile heats to 55–65°C — weed seeds die", 300],
        ["3. Cooling", "heat falls as easy food runs out", 470],
        ["4. Maturation", "weeks more; fungi finish the job", 620],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 68} y="70" width="136" height="96" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
          <text x={x as number} y="92" fontSize="6.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name as string}</text>
          <text x={x as number} y="112" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 30)}</text>
          <text x={x as number} y="126" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(30, 60)}</text>
          {i < 3 && <path d={`M${(x as number) + 70} 118 h${((x as number) + 128) - (x as number) - 70 - 2} m-6 -5 l6 5 l-6 5`} className="fill-none stroke-current" strokeWidth="1.8" style={{ color: "rgb(16 185 129 / 0.9)" }} />}
        </g>
      ))}
      <text x="360" y="186" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">the heat phase is the safety feature: pathogens and weed seeds don't survive 60°C</text>
      {/* facts */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The recipe: greens (nitrogen — peels, grass) + browns (carbon — dry leaves, paper) ≈ 1:2, moist like a wrung sponge, turned for air.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Vermicomposting hands the job to worms — faster, cooler, and ideal for household scale.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: four phases in order; greens:browns ratio; the thermophilic phase sterilises — three facts, one answer.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Composting is the highest-value use of the organic half of Nepal's waste stream.</text>
    </svg>
  );
}
