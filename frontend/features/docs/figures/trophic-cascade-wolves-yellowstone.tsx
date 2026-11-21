/** Trophic cascade wolves Yellowstone — the predator's ripple. Well-detailed. Theme-aware. */
export function TrophicCascadeWolvesYellowstone({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Trophic cascade wolves Yellowstone 1995 reintroduction elk behaviour change overgrazing recovery willows aspen riverbanks beavers return songbirds erosion rivers change ecology top down control keystone predator indirect effects food web example exam case study apex predator mesopredator release">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The wolves' ripple — a trophic cascade, step by step</text>
      {/* cascade chain */}
      <rect x="30" y="44" width="660" height="160" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      {[
        ["1995: wolves return", "reintroduced after 70-year absence", 130],
        ["Elk behaviour changes", "they avoid open valleys, browse less", 300],
        ["Vegetation recovers", "willows and aspen regrow on riverbanks", 470],
        ["Everything follows", "beavers, songbirds, fish, stable riverbanks", 620],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 68} y="70" width="136" height="96" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
          <text x={x as number} y="92" fontSize="6.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name as string}</text>
          <text x={x as number} y="112" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 30)}</text>
          <text x={x as number} y="126" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(30, 60)}</text>
          {i < 3 && <path d={`M${(x as number) + 70} 118 h${((x as number) + 128) - (x as number) - 70 - 2} m-6 -5 l6 5 l-6 5`} className="fill-none stroke-current" strokeWidth="1.8" style={{ color: "rgb(16 185 129 / 0.9)" }} />}
        </g>
      ))}
      <text x="360" y="186" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">the surprise: the biggest effect was on rivers — vegetation stabilised banks, and the meanders changed shape</text>
      {/* facts */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The lesson: a predator's power is partly indirect — fear restructures prey behaviour, and behaviour reshapes the landscape.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Remove an apex predator instead and mesopredators explode — the 'mesopredator release' that wrecks songbird nests.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: define trophic cascade, walk the Yellowstone chain in four steps, name one unexpected outcome (rivers).</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Ecology's counterintuitive star: the animal that changed a river's course without touching water.</text>
    </svg>
  );
}
