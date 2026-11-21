/** Bioremediation — microbes that eat pollution. Well-detailed. Theme-aware. */
export function BioremediationOil({ className }: { className?: string }) {
  const stages: [string, string][] = [
    ["Spill", "oil coats water, blocks oxygen and light"],
    ["Seed", "hydrocarbon-eating bacteria added or bloom naturally"],
    ["Boost", "fertiliser (N, P) feeds the degraders"],
    ["Clear", "oil digested to CO₂ and water; ecosystem recovers"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Bioremediation oil spill bacteria hydrocarbon digestion fertiliser boost Exxon cleanup microbes degrade pollutants CO2 water ecosystem recovery">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Bioremediation — pollution eaten by microbes</text>
      {stages.map(([s, d], i) => {
        const x = 30 + i * 170;
        return (
          <g key={s}>
            <rect x={x} y="44" width="160" height="180" rx="12" className="fill-current text-slate-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
            <text x={x + 80} y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{i + 1}. {s}</text>
            {/* water surface */}
            <rect x={x + 14} y="100" width="132" height="70" rx="8" className="fill-current text-sky-400/15" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(14 165 233 / 0.9)" }} />
            {i === 0 && <rect x={x + 20} y="100" width="120" height="10" rx="5" className="fill-current text-stone-800/60" />}
            {i === 1 && [0, 1, 2, 3].map((j) => (
              <circle key={j} cx={x + 34 + j * 30} cy={118} r="4" className="fill-current text-emerald-600" />
            ))}
            {i === 2 && [0, 1, 2, 3, 4, 5].map((j) => (
              <circle key={j} cx={x + 30 + j * 22} cy={116 + (j % 2) * 12} r="5" className="fill-current text-emerald-600" />
            ))}
            {i === 3 && <rect x={x + 20} y="100" width="120" height="10" rx="5" className="fill-current text-sky-400/20" />}
            <text x={x + 12} y={196} fontSize="6.8" className="fill-current text-muted-foreground">{d.slice(0, 34)}</text>
            <text x={x + 12} y={210} fontSize="6.8" className="fill-current text-muted-foreground">{d.slice(34, 68)}</text>
          </g>
        );
      })}
      <rect x="30" y="238" width="660" height="54" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="46" y="258" fontSize="7.6" className="fill-current text-foreground" fontWeight="800">Why it beats digging and dumping</text>
      {["• works in place — no excavation", "• end products are harmless (CO₂, water, biomass)", "• oil spills, sewage, heavy-metal sites all treated"].map((t, i) => (
        <text key={t} x={46 + i * 220} y={278} fontSize="7" className="fill-current text-muted-foreground">{t}</text>
      ))}
    </svg>
  );
}
