/** Earthworm reflex arc segment — local decision. Well-detailed. Theme-aware. */
export function EarthwormReflexSegment({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Earthworm reflex arc segment local decision receptor sensory neuron ganglion motor neuron muscle response speed bypass brain touch withdrawal">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">One segment's reflex — thinking without a brain</text>
      {/* arc diagram */}
      <rect x="30" y="44" width="660" height="150" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      {[
        ["Receptor", "touch on skin detects threat", 130],
        ["Sensory fibre", "message runs to the ganglion", 300],
        ["Ganglion", "ventral cord relay — the local switch", 470],
        ["Motor fibre + muscle", "segment contracts instantly", 620],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 68} y="70" width="136" height="96" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
          <text x={x as number} y={92} fontSize="6.8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name as string}</text>
          <text x={x as number} y={112} fontSize="5.8" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 30)}</text>
          <text x={x as number} y={126} fontSize="5.8" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(30, 60)}</text>
          {i < 3 && <path d={`M${(x as number) + 70} 118 h${((x as number) + 128) - (x as number) - 70 - 2} m-6 -5 l6 5 l-6 5`} className="fill-none stroke-current" strokeWidth="1.8" style={{ color: "rgb(2 132 199 / 0.9)" }} />}
        </g>
      ))}
      <text x="360" y="186" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">the brain is informed afterwards — reflexes never wait for permission</text>
      {/* why fast */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Why bypass the brain: a robin's beak gives a worm half a second. Local reflexes act in milliseconds; consultation costs lives.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Each segment carries its own relay — 100+ autonomous decision units crawling as one animal.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: receptor → sensory fibre → ganglion → motor fibre → response. Five steps, and 'ganglion' is the checkpoint.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">The same reflex-arc logic runs your own knee-jerk — biology reuses good designs.</text>
    </svg>
  );
}
