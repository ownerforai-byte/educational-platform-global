/**
 * Bacterial nutrition modes — autotrophic (photo-/chemo-) vs
 * heterotrophic (saprophytic/parasitic/symbiotic) map. Theme-aware.
 */
export function BacterialNutritionModes({ className }: { className?: string }) {
  const box = (x: number, y: number, w: number, h: number, c: string, label: string, sub: string[], k: string) => (
    <g key={k}>
      <rect x={x} y={y} width={w} height={h} rx="10" style={{ color: c }} className="fill-current opacity-15" strokeWidth="2.5" stroke="currentColor" />
      <text x={x + w / 2} y={y + 20} fontSize="10.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{label}</text>
      {sub.map((s, i) => (
        <text key={i} x={x + w / 2} y={y + 38 + i * 15} fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">{s}</text>
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="Bacterial nutrition classification: autotrophic photoautotrophs and chemoautotrophs versus heterotrophic saprophytic parasitic and symbiotic bacteria with examples">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">How bacteria feed — the nutrition map</text>
      <text x="330" y="56" fontSize="12" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">BACTERIAL NUTRITION</text>
      <line x1="330" y1="64" x2="170" y2="92" strokeWidth="2.5" className="stroke-current text-muted-foreground" />
      <line x1="330" y1="64" x2="490" y2="92" strokeWidth="2.5" className="stroke-current text-muted-foreground" />

      {box(40, 92, 260, 60, "rgb(22 163 74 / 0.9)", "AUTOTROPHIC — makes own food", ["from CO₂ + inorganic energy"], "a")}
      {box(360, 92, 260, 60, "rgb(249 115 22 / 0.9)", "HETEROTROPHIC — depends on others", ["cannot fix CO₂; uses organic carbon"], "b")}

      {box(20, 180, 140, 90, "rgb(22 163 74 / 0.9)", "Photoautotroph", ["light energy", "cyanobacteria,", "purple sulphur bacteria"], "c")}
      {box(180, 180, 140, 90, "rgb(22 163 74 / 0.9)", "Chemoautotroph", ["oxidise inorganic", "substrates — nitrifying,", "iron & sulphur bacteria"], "d")}
      {box(340, 180, 90, 90, "rgb(249 115 22 / 0.9)", "Saprophytic", ["decomposers", "of dead matter"], "e")}
      {box(440, 180, 90, 90, "rgb(249 115 22 / 0.9)", "Parasitic", ["pathogens:", "cholera, TB"], "f")}
      {box(540, 180, 100, 90, "rgb(249 115 22 / 0.9)", "Symbiotic", ["Rhizobium in", "nodules; E. coli", "makes vitamin K"], "g")}

      <text x="16" y="292" fontSize="10" className="fill-current text-muted-foreground">Same cell, opposite roles: saprophytes recycle nutrients in soil and sewage plants; the same metabolic power spoils food and, in parasites, causes disease.</text>
    </svg>
  );
}
