/** Genetic engineering insulin — the humulin story. Well-detailed. Theme-aware. */
export function GeneticEngineeringInsulin({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Genetic engineering insulin humulin human insulin bacteria plasmid restriction enzyme ligase recombinant DNA E coli fermentation purification diabetes treatment animal pancreas replacement humulin 1982 first GMO medicine steps diagram">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Recombinant insulin — the first GMO medicine</text>
      {/* steps */}
      <rect x="30" y="44" width="660" height="150" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      {[
        ["1. Cut", "restriction enzymes cut the human insulin gene out", 130],
        ["2. Paste", "ligase inserts it into a plasmid vector", 300],
        ["3. Transform", "the plasmid enters E. coli cells", 470],
        ["4. Brew", "fermenters grow bacteria that secrete human insulin", 620],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 68} y="70" width="136" height="96" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
          <text x={x as number} y="92" fontSize="6.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name as string}</text>
          <text x={x as number} y="112" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 30)}</text>
          <text x={x as number} y="126" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(30, 60)}</text>
          {i < 3 && <path d={`M${(x as number) + 70} 118 h${((x as number) + 128) - (x as number) - 70 - 2} m-6 -5 l6 5 l-6 5`} className="fill-none stroke-current" strokeWidth="1.8" style={{ color: "rgb(2 132 199 / 0.9)" }} />}
        </g>
      ))}
      <text x="360" y="186" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">approved 1982 as 'humulin' — bacteria programmed to make a human protein, at industrial scale</text>
      {/* why it mattered */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Before: insulin came from pig and cow pancreases — supply limited, allergic reactions common. After: unlimited, identical-to-human insulin.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">The same cut-paste-transform-brew recipe now makes growth hormone, clotting factors, and hepatitis B vaccine.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: restriction enzyme cuts, ligase pastes, plasmid carries, E. coli brews — four tools, one medicine.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Recombinant insulin proved the concept — every GMO medicine since follows its playbook.</text>
    </svg>
  );
}
