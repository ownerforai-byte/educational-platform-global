// Standard solution preparation steps. Theme-aware.
export function SolutionPrepSteps({ className }: { className?: string }) {
  const steps = [
    ["Weigh", "mass the solute on a balance"],
    ["Dissolve", "in a beaker, first in a little water"],
    ["Transfer", "rinse the beaker into the flask — rinsings count"],
    ["Make up", "add water to the mark, bottom of meniscus"],
    ["Mix", "stopper and invert 10–15 times"],
  ];
  return (
    <svg viewBox="0 0 720 220" className={className} role="img" aria-label="Standard solution preparation five steps weigh dissolve transfer make up to mark and mix volumetric flask technique">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Preparing a standard solution — the practical exam's core skill</text>
      {steps.map(([t, d], i) => (
        <g key={t}>
          <circle cx="58" cy={52 + i * 34} r="13" className="fill-current text-sky-500/15" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(14 165 233 / 0.9)" }} />
          <text x="58" y={57 + i * 34} fontSize="10" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">{i + 1}</text>
          <text x="86" y={50 + i * 34} fontSize="9.2" className="fill-current text-foreground" fontWeight="800">{t}</text>
          <text x="86" y={64 + i * 34} fontSize="7.8" className="fill-current text-muted-foreground">{d}</text>
        </g>
      ))}
      <rect x="430" y="44" width="260" height="160" rx="10" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="560" y="70" fontSize="9.5" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="800">Worked target</text>
      <text x="560" y="94" fontSize="8.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">0.1 M Na₂CO₃, 250 mL</text>
      <text x="560" y="116" fontSize="8.6" textAnchor="middle" className="fill-current text-muted-foreground">n = 0.1 × 0.25 = 0.025 mol</text>
      <text x="560" y="136" fontSize="8.6" textAnchor="middle" className="fill-current text-muted-foreground">m = 0.025 × 106 = 2.65 g</text>
      <text x="560" y="156" fontSize="8.6" textAnchor="middle" className="fill-current text-muted-foreground">weigh 2.65 g, make up to 250 mL</text>
      <text x="560" y="184" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">anhydrous Na₂CO₃ is a primary standard</text>
    </svg>
  );
}
