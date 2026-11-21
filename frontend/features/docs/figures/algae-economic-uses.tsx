/** Algae economic importance — agar, algin, food, iodine, pollution. Theme-aware. */
export function AlgaeEconomicUses({ className }: { className?: string }) {
  const col = (x: number, c: string, t: string, items: string[], k: string) => (
    <g key={k}>
      <rect x={x} y="56" width="150" height="160" rx="12" style={{ color: c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
      <text x={x + 75} y="80" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{t}</text>
      {items.map((s, i) => (
        <text key={i} x={x + 75} y={102 + i * 22} fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">{s}</text>
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Algae economic uses food nori agar algin fertiliser iodine and water purification with source species">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Algae in the human economy</text>
      {col(16, "rgb(22 163 74 / 0.9)", "FOOD", ["nori (Porphyra)", "kelp vegetables", "high protein & minerals", "Chlorella supplements"], "a")}
      {col(178, "rgb(124 58 237 / 0.9)", "PHYCOCOLLOIDS", ["agar from Gelidium — culture medium", "algin from brown algae — ice cream", "carrageenan — thickener"], "b")}
      {col(340, "rgb(245 158 11 / 0.9)", "AGRICULTURE", ["seaweed fertiliser (kelp)", "iodine & potassium rich", "livestock feed supplement"], "c")}
      {col(502, "rgb(14 165 233 / 0.9)", "ENVIRONMENT", ["photosynthesis → O₂ supply", "water purification", "biofuel research", "diatomite as filter & polish"], "d")}
      <text x="16" y="232" fontSize="10" className="fill-current text-muted-foreground">Half the world's photosynthetic oxygen comes from algae — the agar in every school petri dish is seaweed too.</text>
    </svg>
  );
}
