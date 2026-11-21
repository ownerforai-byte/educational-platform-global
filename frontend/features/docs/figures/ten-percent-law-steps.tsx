/** Ten percent law — energy shrinking per step. Well-detailed. Theme-aware. */
export function TenPercentLawSteps({ className }: { className?: string }) {
  const levels: [string, string, string][] = [
    ["Producers", "1000 kJ", "100%"],
    ["Herbivores", "100 kJ", "10%"],
    ["Carnivores", "10 kJ", "1%"],
    ["Top carnivore", "1 kJ", "0.1%"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Ten percent law energy transfer Lindeman 90 percent lost heat respiration pyramid of energy shrinking steps top carnivore scarce">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The 10% law — where the energy goes</text>
      {levels.map(([name, kj, pct], i) => {
        const w = 480 - i * 110;
        return (
          <g key={name}>
            <rect x="40" y={52 + i * 52} width={w} height="40" rx="8" className="fill-current text-amber-500/15" stroke="currentColor" strokeWidth="1.8" style={{ color: `rgb(245 158 11 / ${0.9 - i * 0.15})` }} />
            <text x="56" y={70 + i * 52} fontSize="8" className="fill-current text-foreground" fontWeight="800">{name}</text>
            <text x="56" y={84 + i * 52} fontSize="7" className="fill-current text-muted-foreground">{kj} fixed in this level</text>
            <text x={60 + w} y={76 + i * 52} fontSize="8" className="fill-current text-amber-600" fontWeight="800">{pct}</text>
            {i < 3 && (
              <g>
                <text x={560} y={80 + i * 52} fontSize="7" className="fill-current text-rose-500">−90%: respiration, heat, waste</text>
                <line x1="540" y1={92 + i * 52} x2="540" y2={104 + i * 52} className="stroke-current text-rose-500" strokeWidth="2" style={{ color: "rgb(244 63 94 / 0.9)" }} markerEnd="url(#arrhl)" />
              </g>
            )}
          </g>
        );
      })}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-amber-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Each transfer keeps only ~10% in new tissue; the other 90% leaves as heat through respiration, egestion and excretion.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: chains rarely exceed 4–5 steps — after that the energy is too thin to feed another level.</text>
    </svg>
  );
}
