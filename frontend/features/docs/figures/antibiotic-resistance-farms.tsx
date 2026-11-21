/** Antibiotic resistance farms — another selection story. Well-detailed. Theme-aware. */
export function AntibioticResistanceFarms({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Antibiotic resistance farms livestock growth promotion selection resistant bacteria manure water soil transfer humans gene plasmid horizontal transfer WHO warning prudent use ban growth promoters">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Antibiotics on farms — resistance as a side effect</text>
      {/* transfer chain */}
      <rect x="30" y="44" width="660" height="150" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      {[
        ["1. Use", "routine low doses in feed (growth, prophylaxis)", 130],
        ["2. Select", "resistant bacteria survive and multiply in gut", 300],
        ["3. Spread", "manure, water, workers carry genes onward", 470],
        ["4. Transfer", "plasmids hand resistance to human pathogens", 620],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 68} y="70" width="136" height="96" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
          <text x={x as number} y="92" fontSize="6.8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name as string}</text>
          <text x={x as number} y="112" fontSize="5.8" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 30)}</text>
          <text x={x as number} y="126" fontSize="5.8" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(30, 60)}</text>
          {i < 3 && <path d={`M${(x as number) + 70} 118 h${((x as number) + 128) - (x as number) - 70 - 2} m-6 -5 l6 5 l-6 5`} className="fill-none stroke-current" strokeWidth="1.8" style={{ color: "rgb(244 63 94 / 0.9)" }} />}
        </g>
      ))}
      <text x="360" y="186" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">the farm is an evolution lab: constant low-dose selection is precisely how resistance is best bred</text>
      {/* facts */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Most of the world's antibiotics are fed to animals, not patients — and resistance genes ignore the fence.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">WHO ranks antimicrobial resistance among the top global health threats; some infections now have no reliable drug.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: resistance spreads by plasmid transfer, not just inheritance — horizontal gene flow between species.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Bans on growth-promotion use in the EU cut resistant bacteria in meat within years.</text>
    </svg>
  );
}
