/** Frog development speed factors — what sets the clock. Well-detailed. Theme-aware. */
export function FrogDevelopmentSpeedFactors({ className }: { className?: string }) {
  const factors: [string, string, string][] = [
    ["Temperature", "warmer water = faster development", "cold ponds stretch weeks into months"],
    ["Food supply", "rich algae = faster tadpole growth", "starvation stalls metamorphosis"],
    ["Water level", "drying ponds accelerate change", "a survival response, not a luxury"],
    ["Crowding", "high density slows growth", "competition for food bites early"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Frog development speed factors what sets the clock temperature food water level crowding pond drying accelerates metamorphosis survival response plasticity">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">What sets the developmental clock</text>
      {/* table */}
      <rect x="30" y="40" width="150" height="26" rx="6" className="fill-current text-slate-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="105" y="58" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">FACTOR</text>
      <rect x="180" y="40" width="250" height="26" rx="6" className="fill-current text-slate-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="305" y="58" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">EFFECT</text>
      <rect x="430" y="40" width="260" height="26" rx="6" className="fill-current text-slate-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="560" y="58" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHY IT MATTERS</text>
      {factors.map(([name, effect, why], i) => {
        const y = 74 + i * 38;
        return (
          <g key={name}>
            <text x="46" y={y + 14} fontSize="7.2" className="fill-current text-sky-600" fontWeight="800">{name}</text>
            <text x="194" y={y + 8} fontSize="6.6" className="fill-current text-muted-foreground">{effect.slice(0, 40)}</text>
            <text x="194" y={y + 22} fontSize="6.6" className="fill-current text-muted-foreground">{effect.slice(40, 80)}</text>
            <text x="444" y={y + 8} fontSize="6.6" className="fill-current text-muted-foreground">{why.slice(0, 42)}</text>
            <text x="444" y={y + 22} fontSize="6.6" className="fill-current text-muted-foreground">{why.slice(42, 84)}</text>
          </g>
        );
      })}
      <rect x="30" y="232" width="660" height="60" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="252" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The dramatic case: a drying pond can compress metamorphosis — tadpoles sense shrinking water and rush to leave it.</text>
      <text x="360" y="270" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Development speed is flexible (plastic), but the sequence never changes — same stages, different pace.</text>
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: temperature and food set the pace; drying water can trigger early metamorphosis.</text>
    </svg>
  );
}
