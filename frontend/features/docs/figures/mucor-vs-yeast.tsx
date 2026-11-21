/** Mucor vs Yeast comparison — filamentous vs unicellular fungus. Theme-aware. */
export function MucorVsYeast({ className }: { className?: string }) {
  const row = (y: number, f: string, a: string, b: string, k: string) => (
    <g key={k}>
      <text x="30" y={y} fontSize="8.5" className="fill-current text-muted-foreground">{f}</text>
      <text x="250" y={y} fontSize="8.5" textAnchor="middle" className="fill-current text-foreground">{a}</text>
      <text x="510" y={y} fontSize="8.5" textAnchor="middle" className="fill-current text-foreground">{b}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Mucor versus yeast comparison across body form hyphae reproduction spores habitat and human use">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Mucor vs Yeast — same kingdom, different shapes</text>
      {row(56, "FEATURE", "MUCOR", "YEAST", "h")}
      <line x1="20" y1="64" x2="640" y2="64" strokeWidth="1.5" className="stroke-current text-muted-foreground" />
      {row(86, "body form", "filamentous mycelium", "single oval cells", "r1")}
      {row(110, "hyphae", "coenocytic (no septa)", "none — unicellular", "r2")}
      {row(134, "asexual repro.", "sporangiospores", "budding", "r3")}
      {row(158, "sexual repro.", "conjugation → zygospore", "ascus with ascospores", "r4")}
      {row(182, "habitat", "moist bread, dung, soil", "sugary juices, fruit", "r5")}
      {row(206, "human use / harm", "spoilage, some fermentations", "bread, beer, wine, vitamins", "r6")}
      <text x="16" y="240" fontSize="10" className="fill-current text-muted-foreground">Both are Phycomycete-lineage fungi: Mucor builds a multicellular body, yeast stays one cell — same chemistry, different architecture.</text>
    </svg>
  );
}
