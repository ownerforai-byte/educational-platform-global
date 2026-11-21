/** Earthworm humic acid calciferous — neutralising the diet. Well-detailed. Theme-aware. */
export function EarthwormHumicAcidCalciferous({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Earthworm humic acid calciferous glands neutralise acidic leaf litter calcium carbonate oesophagus pH protection intestine chemistry diet soil litter decomposition">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Neutralising dinner — the calciferous glands</text>
      {/* pH flow */}
      <rect x="30" y="44" width="660" height="140" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      {[
        ["Leaf litter in", "humic acid makes it acidic", 130, "rgb(244 63 94)"],
        ["Calciferous glands", "secrete calcium carbonate", 360, "rgb(2 132 199)"],
        ["Neutral gut", "enzymes can now work", 590, "rgb(16 185 129)"],
      ].map(([name, detail, x, rgb], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 95} y="70" width="190" height="90" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: `${rgb as string} / 0.9` }} />
          <text x={x as number} y={92} fontSize="7.2" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name as string}</text>
          <text x={x as number} y={112} fontSize="6.2" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 32)}</text>
          <text x={x as number} y={126} fontSize="6.2" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(32, 64)}</text>
          {i < 2 && <path d={`M${(x as number) + 95} 115 h${(360 as number) - (x as number) - 105} m-6 -5 l6 5 l-6 5`} className="fill-none stroke-current" strokeWidth="2" style={{ color: "rgb(217 119 6 / 0.9)" }} />}
        </g>
      ))}
      <text x="360" y="176" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">glands are paired pouches in the oesophageal wall, segments ~10–13</text>
      {/* facts */}
      <rect x="30" y="200" width="660" height="92" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="220" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The chemistry: CaCO₃ + acid → neutral salts + CO₂ + H₂O — the same reaction that settles acidity in any chemistry lab.</text>
      <text x="360" y="238" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Without this step, the worm's own digestive enzymes would be deactivated by its acidic diet.</text>
      <text x="360" y="256" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: calciferous glands neutralise humic acid from decaying litter — say the diet problem, not just the gland name.</text>
      <text x="360" y="274" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">The excreted calcium also enriches the soil the worm improves.</text>
      <text x="360" y="288" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Location question: oesophagus, not stomach — a classic trick option.</text>
    </svg>
  );
}
