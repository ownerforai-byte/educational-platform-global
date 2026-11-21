/** Genetic engineering steps recombinant — from gene to product. Well-detailed. Theme-aware. */
export function GeneticEngineeringStepsDetail({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Genetic engineering steps recombinant DNA technology detail restriction enzymes cutting sticky ends ligase joining vector plasmid transformation host E coli replication selection marker antibiotic resistance screening PCR amplification insulin example human gene bacteria fermentation harvest purification process flow diagram steps order exam answer molecular scissors glue">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Recombinant DNA — the five-step recipe</text>
      {/* steps */}
      <rect x="30" y="44" width="660" height="160" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      {[
        ["1. Cut", "restriction enzymes slice the donor DNA and plasmid — sticky ends", 130],
        ["2. Join", "DNA ligase glues the human gene into the plasmid", 250],
        ["3. Transform", "the recombinant plasmid enters host bacteria", 370],
        ["4. Select", "antibiotic-marker screening finds the transformed cells", 490],
        ["5. Produce", "fermentation multiplies the bacteria; the gene's product is harvested", 610],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 62} y="70" width="124" height="100" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.6" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
          <text x={x as number} y="92" fontSize="6.2" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name as string}</text>
          <text x={x as number} y="112" fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 28)}</text>
          <text x={x as number} y="126" fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(28, 56)}</text>
          <text x={x as number} y="140" fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(56, 84)}</text>
          {i < 4 && <path d={`M${(x as number) + 64} 118 h${((x as number) + 120) - (x as number) - 64 - 2} m-6 -5 l6 5 l-6 5`} className="fill-none stroke-current" strokeWidth="1.6" style={{ color: "rgb(139 92 246 / 0.9)" }} />}
        </g>
      ))}
      <text x="360" y="186" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">restriction enzyme = molecular scissors; ligase = molecular glue — the two metaphors carry the whole process</text>
      {/* facts */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The landmark product: human insulin (Humulin, 1982) — bacteria programmed with the human gene replaced extracted pancreas insulin for millions of diabetics.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Sticky ends matter: matching overhangs from the same enzyme make ligation possible — that's why the same restriction enzyme cuts both DNAs.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: five steps in order + name the two enzymes with their roles — the standard recombinant-DNA answer.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Every GM crop, every engineered medicine walks this same five-step path — learn it once, answer everywhere.</text>
    </svg>
  );
}
