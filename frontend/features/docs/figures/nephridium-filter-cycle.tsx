/** Nephridium filter cycle — how a nephron works. Well-detailed. Theme-aware. */
export function NephridiumFilterCycle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Nephridium filter cycle nephrostome funnel coelomic fluid neck body loop cilia urea ammonia selective reabsorption bladder pore excretion steps">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Inside one nephridium — the filtering cycle</text>
      {/* pathway */}
      <rect x="30" y="44" width="660" height="150" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      {[
        ["Nephrostome", "ciliated funnel scoops coelomic fluid", 130],
        ["Neck", "narrow tube through the septum", 300],
        ["Body loop", "ciliated lobe reabsorbs what is useful", 470],
        ["Terminal duct", "bladder opens through the pore", 620],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 68} y="70" width="136" height="96" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
          <text x={x as number} y={92} fontSize="7" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name as string}</text>
          <text x={x as number} y={112} fontSize="6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 30)}</text>
          <text x={x as number} y={126} fontSize="6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(30, 60)}</text>
          {i < 3 && <path d={`M${(x as number) + 70} 118 h${((x as number) + 128) - (x as number) - 70 - 2} m-6 -5 l6 5 l-6 5`} className="fill-none stroke-current" strokeWidth="1.8" style={{ color: "rgb(2 132 199 / 0.9)" }} />}
        </g>
      ))}
      <text x="360" y="186" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">cilia drive the flow — no pressure system, just a conveyor of beating hairs</text>
      {/* facts */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The clever part: the body loop reabsorbs useful salts and water, so only nitrogenous waste (urea, ammonia) and excess water continue out.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">That is the same logic as a human nephron — filter everything, take back what matters, excrete the rest.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: nephrostome → neck → body loop → terminal duct → pore — five stations, five marks.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">A single earthworm carries 200+ nephridia — one pair per segment after segment 4.</text>
    </svg>
  );
}
