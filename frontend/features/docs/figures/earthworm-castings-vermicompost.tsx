/** Earthworm castings vermicompost chemistry — the soil factory. Well-detailed. Theme-aware. */
export function EarthwormCastingsVermicompost({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Earthworm castings vermicompost chemistry nitrogen phosphorus potassium enriched soil aeration drainage Darwin tonnage farmers friend organic farming">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Castings — the worm's soil factory output</text>
      {/* input-output */}
      <rect x="30" y="44" width="660" height="140" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      {[
        ["Input", "leaf litter, decaying roots, soil", 130, "rgb(217 119 6)"],
        ["Worm gut", "grind, neutralise, inoculate with microbes", 360, "rgb(2 132 199)"],
        ["Castings", "N, P, K enriched, well-aerated crumbs", 590, "rgb(16 185 129)"],
      ].map(([name, detail, x, rgb], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 95} y="70" width="190" height="90" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: `${rgb as string} / 0.9` }} />
          <text x={x as number} y={92} fontSize="7.2" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name as string}</text>
          <text x={x as number} y={112} fontSize="6.2" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 32)}</text>
          <text x={x as number} y={126} fontSize="6.2" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(32, 64)}</text>
          {i < 2 && <path d={`M${(x as number) + 95} 115 h${(360 as number) - (x as number) - 105} m-6 -5 l6 5 l-6 5`} className="fill-none stroke-current" strokeWidth="2" style={{ color: "rgb(16 185 129 / 0.9)" }} />}
        </g>
      ))}
      <text x="360" y="176" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">burrows add aeration and drainage — the worm engineers soil structure, not just chemistry</text>
      {/* facts */}
      <rect x="30" y="200" width="660" height="92" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="220" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Vermicompost: worm-processed organic matter — richer in available nitrogen, phosphorus and potassium than the raw litter that went in.</text>
      <text x="360" y="238" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Darwin estimated that worms renew the top few centimetres of English pasture soil within decades.</text>
      <text x="360" y="256" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: 'farmers' friend' = castings + burrows; the 'darker side' = hosting parasite larvae.</text>
      <text x="360" y="274" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Give both sides and the balance — examiners reward the honest ledger.</text>
      <text x="360" y="288" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Vermicomposting units are now a small-scale industry in Nepal.</text>
    </svg>
  );
}
