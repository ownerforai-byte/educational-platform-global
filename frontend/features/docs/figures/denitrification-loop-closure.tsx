/** Denitrification loop closure — how nitrogen leaves. Well-detailed. Theme-aware. */
export function DenitrificationLoopClosure({ className }: { className?: string }) {
  const steps: [string, string][] = [
    ["Ammonification", "decomposers turn dead matter and waste into ammonia"],
    ["Nitrification", "Nitrosomonas → nitrite; Nitrobacter → nitrate"],
    ["Assimilation", "plant roots absorb nitrate, build proteins"],
    ["Denitrification", "Pseudomonas returns nitrate to atmospheric N₂"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Denitrification loop closure ammonification nitrification assimilation Pseudomonas nitrogen returns atmosphere soil bacteria steps">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">After fixation — how nitrogen moves and leaves</text>
      {steps.map(([s, d], i) => {
        const x = 30 + i * 170;
        return (
          <g key={s}>
            <rect x={x} y="44" width="160" height="150" rx="12" className="fill-current text-slate-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
            <text x={x + 80} y="66" fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{i + 1}. {s}</text>
            <text x={x + 12} y="90" fontSize="6.8" className="fill-current text-muted-foreground">{d.slice(0, 32)}</text>
            <text x={x + 12} y="104" fontSize="6.8" className="fill-current text-muted-foreground">{d.slice(32, 64)}</text>
            <text x={x + 80} y="136" fontSize="7.6" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="700">{["→ NH₃", "→ NO₂⁻ → NO₃⁻", "→ plant protein", "→ N₂ gas"][i]}</text>
            <text x={x + 80} y="170" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">{["decomposers at work", "aerobic soil bacteria", "roots + nodules", "waterlogged soil"][i]}</text>
            {i < 3 && <line x1={x + 160} y1="119" x2={x + 170} y2="119" className="stroke-current text-emerald-700" strokeWidth="2" style={{ color: "rgb(5 122 85 / 0.9)" }} markerEnd="url(#arrhl)" />}
          </g>
        );
      })}
      <rect x="30" y="208" width="660" height="84" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="46" y="230" fontSize="7.8" className="fill-current text-foreground" fontWeight="800">The loop closes because denitrification balances fixation</text>
      {["• fixation adds N₂ from air → soil (lightning, Rhizobium, industry)", "• denitrification returns N₂ from soil → air (Pseudomonas, anaerobic)", "• disturb one side — over-fertilise or waterlog — and the balance, and fertility, shifts"].map((t, i) => (
        <text key={t} x="46" y={250 + i * 16} fontSize="7.2" className="fill-current text-muted-foreground">{t}</text>
      ))}
    </svg>
  );
}
