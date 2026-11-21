/** Frog buccal pump mechanism — swallowing air. Well-detailed. Theme-aware. */
export function FrogBuccalPumpMechanism({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Frog buccal pump mechanism swallowing air nostrils floor mouth drops air drawn positive pressure lungs refill no ribs diaphragm amphibian breathing">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The buccal pump — breathing without ribs</text>
      {/* mechanism steps */}
      <rect x="30" y="44" width="660" height="160" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      {[
        ["1. Lower floor", "mouth floor drops, pressure falls", 130],
        ["2. Air in", "nostrils open, air fills the mouth", 300],
        ["3. Seal + raise", "nostrils shut, floor rises", 470],
        ["4. Push", "air forced into the lungs", 620],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 68} y="70" width="136" height="96" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
          <text x={x as number} y={92} fontSize="7" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name as string}</text>
          <text x={x as number} y={112} fontSize="6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 30)}</text>
          <text x={x as number} y={126} fontSize="6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(30, 60)}</text>
          {i < 3 && <path d={`M${(x as number) + 70} 118 h${((x as number) + 128) - (x as number) - 70 - 2} m-6 -5 l6 5 l-6 5`} className="fill-none stroke-current" strokeWidth="1.8" style={{ color: "rgb(2 132 199 / 0.9)" }} />}
        </g>
      ))}
      <text x="360" y="186" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">the mouth is the pump; the nostrils are its valves — positive pressure fills the lungs, the reverse of mammalian suction</text>
      {/* why */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Why no ribs: frog ribs are tiny and do not move — the buccal pump is the only way to move air in bulk.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Mammals inverted the design: the rib cage expands, sucking air in. Frogs push; we pull.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: buccal pump = positive-pressure filling via mouth floor + nostril valves. No diaphragm exists.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">The same mouth-floor motion also drives the buccopharyngeal respiration cycle.</text>
    </svg>
  );
}
