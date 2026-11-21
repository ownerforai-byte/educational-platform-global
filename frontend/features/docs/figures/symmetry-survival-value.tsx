/** Symmetry survival value — what each symmetry buys. Well-detailed. Theme-aware. */
export function SymmetrySurvivalValue({ className }: { className?: string }) {
  const types: [string, string, string][] = [
    ["Asymmetric", "no plane of symmetry at all", "sponges — shape fits the current, not a formula"],
    ["Radial", "any cut through the centre matches", "cnidarians — meet the world from every side equally"],
    ["Bilateral", "one plane, left mirrors right", "most animals — head-first movement with a front to sense with"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Symmetry survival value asymmetric radial bilateral sponge cnidarian flatworm cephalisation senses front movement ecology lifestyle">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">What each symmetry buys its owner</text>
      {types.map(([name, detail, value], i) => {
        const x = 30 + i * 228;
        return (
          <g key={name}>
            <rect x={x} y="44" width="210" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
            <text x={x + 105} y="68" fontSize="8.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name}</text>
            {i === 0 && <path d={`M${x + 85} 130 l40 -22 l-14 44 l-30 -10 l16 -30`} className="fill-current text-slate-500/30" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(120 113 108 / 0.9)" }} />}
            {i === 1 && <><circle cx={x + 105} cy="126" r="26" className="fill-current text-sky-500/25" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(2 132 199 / 0.9)" }} /><line x1={x + 105} y1="96" x2={x + 105} y2="156" className="stroke-current" strokeWidth="1" strokeDasharray="3 2" style={{ color: "rgb(2 132 199 / 0.9)" }} /><line x1={x + 79} y1="126" x2={x + 131} y2="126" className="stroke-current" strokeWidth="1" strokeDasharray="3 2" style={{ color: "rgb(2 132 199 / 0.9)" }} /></>}
            {i === 2 && <><ellipse cx={x + 105} cy="126" rx="34" ry="20" className="fill-current text-sky-500/25" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(2 132 199 / 0.9)" }} /><line x1={x + 105} y1="98" x2={x + 105} y2="154" className="stroke-current" strokeWidth="1.2" strokeDasharray="3 2" style={{ color: "rgb(2 132 199 / 0.9)" }} /><circle cx={x + 132} cy="120" r="2.6" className="fill-current text-foreground" /></>}
            <text x={x + 14} y="182" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">{detail}</text>
            <text x={x + 14} y="206" fontSize="6.4" textAnchor="middle" className="fill-current text-sky-600">{value.slice(0, 40)}</text>
          </g>
        );
      })}
      <rect x="30" y="240" width="660" height="52" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="258" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Bilateral symmetry brought cephalisation: sense organs concentrated at the front, where the animal meets the world first.</text>
      <text x="360" y="276" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: match symmetry to lifestyle — sessile or drifting (radial), active directional movement (bilateral).</text>
      <text x="360" y="288" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Sponges break the rule on purpose — their shape is dictated by water flow, not by symmetry.</text>
    </svg>
  );
}
