/** Urban air pollution sources Kathmandu — the brick kiln story. Well-detailed. Theme-aware. */
export function UrbanAirPollutionSourcesKathmandu({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Urban air pollution sources Kathmandu valley vehicles exhaust old diesel brick kilns old technology dust road construction open burning waste incineration bowl topography temperature inversion winter dry season source apportionment inventory contributions percentage PM10 study emissions control odd even Euro standards">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Kathmandu's air — the sources, ranked</text>
      {/* sources */}
      <rect x="30" y="44" width="660" height="160" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      {[
        ["Vehicles", "old diesel, two-wheelers, congestion", 130],
        ["Brick kilns", "traditional kilns in winter season", 300],
        ["Road + dust", "unpaved roads, construction", 470],
        ["Open burning", "waste and crop residue fires", 620],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 68} y="70" width="136" height="96" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
          <text x={x as number} y="92" fontSize="6.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name as string}</text>
          <text x={x as number} y="112" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 30)}</text>
          <text x={x as number} y="126" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(30, 60)}</text>
          {i < 3 && <path d={`M${(x as number) + 70} 118 h${((x as number) + 128) - (x as number) - 70 - 2} m-6 -5 l6 5 l-6 5`} className="fill-none stroke-current" strokeWidth="1.8" style={{ color: "rgb(217 119 6 / 0.9)" }} />}
        </g>
      ))}
      <text x="360" y="186" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">the bowl-shaped valley traps it all: winter temperature inversions hold pollution until spring winds return</text>
      {/* facts */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Why winter is worst: cold air pools under warm — the inversion acts as a lid; valley geography makes Kathmandu a natural smog bowl.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">What worked: cleaner fuel standards, newer kiln technology, vehicle age limits — each moved the AQI needle.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: four source categories + the inversion mechanism — sources AND geography for a complete answer.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">A valley's air quality is a systems problem: geography, fuel, transport and construction policy in one equation.</text>
    </svg>
  );
}
