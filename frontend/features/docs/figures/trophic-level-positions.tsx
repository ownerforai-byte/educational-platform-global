/** Trophic level positions — who stands where. Well-detailed. Theme-aware. */
export function TrophicLevelPositions({ className }: { className?: string }) {
  const levels: [string, string, string][] = [
    ["T1 Producers", "green plants, algae — fix sunlight", "grass, phytoplankton"],
    ["T2 Herbivores", "primary consumers eating T1", "deer, zooplankton"],
    ["T3 Carnivores", "secondary consumers eating T2", "frog, small fish"],
    ["T4 Top carnivore", "tertiary consumers eating T3", "tiger, kingfisher"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Trophic level positions T1 producers T2 herbivores T3 carnivores T4 top carnivore omnivores decomposers separate channel examples">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Trophic levels — address by feeding step</text>
      {levels.map(([name, detail, ex], i) => {
        const y = 48 + i * 54;
        return (
          <g key={name}>
            <rect x="40" y={y} width="400" height="42" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: `rgb(16 185 129 / ${0.9 - i * 0.12})` }} />
            <text x="56" y={y + 18} fontSize="8.2" className="fill-current text-foreground" fontWeight="800">{name}</text>
            <text x="56" y={y + 33} fontSize="7" className="fill-current text-muted-foreground">{detail}</text>
            <text x="456" y={y + 27} fontSize="7.2" className="fill-current text-sky-600">{ex}</text>
            {i < 3 && <line x1="240" y1={y + 42} x2="240" y2={y + 54} className="stroke-current text-emerald-700" strokeWidth="2" style={{ color: "rgb(5 122 85 / 0.9)" }} markerEnd="url(#arrhl)" />}
          </g>
        );
      })}
      <rect x="30" y="268" width="660" height="24" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="280" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Omnivores straddle two levels; decomposers sit on a separate channel that recycles every level back to the start.</text>
      <text x="360" y="290" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: a species' trophic level can change with what it eats — humans included.</text>
    </svg>
  );
}
