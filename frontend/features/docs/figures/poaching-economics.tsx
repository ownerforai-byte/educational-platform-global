/** Poaching economics — the supply chain of wildlife crime. Well-detailed. Theme-aware. */
export function PoachingEconomics({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Poaching economics supply chain local hunter middleman trafficking international market rhino horn tiger bone price multiplier demand countries poverty incentive reward punishment deterrence anti poaching patrol">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Poaching — follow the money up the chain</text>
      {/* chain */}
      <rect x="30" y="44" width="660" height="150" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      {[
        ["Local hunter", "poverty wages, high risk — the cheapest link", 130],
        ["Middleman", "collects, bribes, moves the goods", 300],
        ["Trafficker", "smuggles across borders; the price multiplies", 470],
        ["End market", "pays the peak price for horn, bone, ivory", 620],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 68} y="70" width="136" height="96" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
          <text x={x as number} y="90" fontSize="6.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name as string}</text>
          <text x={x as number} y="110" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 30)}</text>
          <text x={x as number} y="124" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(30, 60)}</text>
          {i < 3 && <path d={`M${(x as number) + 70} 118 h${((x as number) + 128) - (x as number) - 70 - 2} m-6 -5 l6 5 l-6 5`} className="fill-none stroke-current" strokeWidth="1.8" style={{ color: "rgb(244 63 94 / 0.9)" }} />}
        </g>
      ))}
      <text x="360" y="186" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">the price multiplier from village to end market can reach hundreds-fold — the profit is not at the trigger end</text>
      {/* countermeasures */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">What works: well-paid patrols, community informants, demand reduction in consumer countries, and honest courts.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Nepal's zero-poaching years (no rhino/tiger/trophy poaching in consecutive stretches) show enforcement + community can win.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: poaching is an economic chain — cutting any link (poverty, corruption, demand) weakens the whole chain.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Punishment alone fails when the reward side is untouched — demand reduction is the other half.</text>
    </svg>
  );
}
