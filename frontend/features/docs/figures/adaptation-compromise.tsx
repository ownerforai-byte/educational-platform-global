/** Adaptation isn't perfection — every design is a compromise. Well-detailed. Theme-aware. */
export function AdaptationCompromise({ className }: { className?: string }) {
  const cases: [string, string, string][] = [
    ["Cactus spines", "perfect anti-desiccation", "but no leaves → slow growth"],
    ["Tiger stripes", "ideal stalking camouflage", "but heat absorption in sun"],
    ["Frog skin", "breathes through skin", "but dries out — ties frog to water"],
    ["Peacock tail", "wins the female", "but screams 'eat me' to predators"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Adaptation compromise trade off not perfect every feature costs something evolution constraints tiger stripes cactus frog peacock">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Adaptation is a compromise, not perfection</text>
      {cases.map(([name, gain, cost], i) => {
        const y = 44 + i * 52;
        return (
          <g key={name}>
            <rect x="30" y={y} width="660" height="44" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
            <text x="46" y={y + 20} fontSize="8" className="fill-current text-foreground" fontWeight="800">{name}</text>
            <text x="46" y={y + 34} fontSize="7" className="fill-current text-emerald-600">✓ {gain}</text>
            <text x="360" y={y + 27} fontSize="7" className="fill-current text-rose-500">✗ {cost}</text>
          </g>
        );
      })}
      <rect x="30" y="258" width="660" height="34" rx="8" className="fill-current text-violet-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="360" y="272" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Every feature is paid for from the same budget — energy, water, safety. Evolution optimises the whole animal, never one trait alone.</text>
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: for any adaptation, state the benefit AND the cost it imposes.</text>
    </svg>
  );
}
