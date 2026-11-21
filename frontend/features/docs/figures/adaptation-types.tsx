/**
 * Adaptation types — morphological, physiological, behavioural with
 * examples. Theme-aware via currentColor.
 */
export function AdaptationTypes({ className }: { className?: string }) {
  const panel = (x: number, c: string, title: string, items: string[], k: string) => (
    <g key={k}>
      <rect x={x} y="56" width="196" height="180" rx="12" style={{ color: c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
      <text x={x + 98} y="84" fontSize="11" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{title}</text>
      {items.map((s, i) => (
        <text key={i} x={x + 14} y={110 + i * 34} fontSize="8.5" className="fill-current text-muted-foreground">• {s}</text>
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 660 270" className={className} role="img" aria-label="Three types of adaptation morphological physiological and behavioural with examples in each panel">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Adaptation — three kinds of answer to the environment</text>
      {panel(16, "rgb(22 163 74 / 0.9)", "MORPHOLOGICAL", ["body shape & structure", "cactus spines = leaves", "xerophyte thick cuticle", "duck webbed feet", "desert fox huge ears"], "m")}
      {panel(232, "rgb(14 165 233 / 0.9)", "PHYSIOLOGICAL", ["internal chemistry", "camels store fat, tolerate", "dehydration & high temp", "halophytes excrete salt", "haemoglobin O₂ affinity"], "p")}
      {panel(448, "rgb(245 158 11 / 0.9)", "BEHAVIOURAL", ["what the animal does", "desert rodents: nocturnal", "aestivation in summer sleep", "hibernation in winter", "basking / burrowing"], "b")}
      <text x="16" y="262" fontSize="10" className="fill-current text-muted-foreground">Adaptations evolve by natural selection over generations — they are inherited, not chosen. Exam: classify a given example into the right type.</text>
    </svg>
  );
}
