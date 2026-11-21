/** Wildlife trade routes — the illegal supply chain. Well-detailed. Theme-aware. */
export function WildlifeTradeRoutes({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Wildlife trade routes illegal supply chain poacher middleman market consumer tiger bones rhino horn pangolin scales red panda wildlife parts CITES enforcement INTERPOL value billions fourth largest illegal trade Nepal transit country seizure demand reduction consumer countries">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Illegal wildlife trade — anatomy of a supply chain</text>
      {/* chain */}
      <rect x="30" y="44" width="660" height="160" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      {[
        ["Poacher", "local hunter, small cash", 130],
        ["Middleman", "collection, transport, bribes", 300],
        ["Trader", "regional networks, concealment", 470],
        ["Consumer", "urban demand: medicine, ornaments, pets", 620],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 68} y="70" width="136" height="96" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
          <text x={x as number} y="92" fontSize="6.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name as string}</text>
          <text x={x as number} y="112" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 30)}</text>
          <text x={x as number} y="126" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(30, 60)}</text>
          {i < 3 && <path d={`M${(x as number) + 70} 118 h${((x as number) + 128) - (x as number) - 70 - 2} m-6 -5 l6 5 l-6 5`} className="fill-none stroke-current" strokeWidth="1.8" style={{ color: "rgb(244 63 94 / 0.9)" }} />}
        </g>
      ))}
      <text x="360" y="186" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">value multiplies at each step — a poacher's few rupees become thousands at the retail end</text>
      {/* facts */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Estimated at billions of dollars annually — among the largest illegal trades after drugs, arms and human trafficking.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Nepal is both a source (tigers, rhinos, pangolins, red pandas) and a transit route — seizures happen at borders and airports.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: enforcement alone fails — demand reduction in consumer countries is the other half of the answer.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">CITES regulates legal trade; the illegal trade thrives on the same demand it created.</text>
    </svg>
  );
}
