/** Taxonomic hierarchy ladder — kingdom to species with human & mango examples. Theme-aware. */
export function TaxonomicHierarchyLadder({ className }: { className?: string }) {
  const ranks = ["Kingdom", "Phylum/Division", "Class", "Order", "Family", "Genus", "Species"];
  const human = ["Animalia", "Chordata", "Mammalia", "Primates", "Hominidae", "Homo", "sapiens"];
  const mango = ["Plantae", "Angiospermae", "Dicotyledonae", "Sapindales", "Anacardiaceae", "Mangifera", "indica"];
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Taxonomic hierarchy ladder from kingdom to species with human and mango examples in each rank">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">The hierarchy — seven rungs, broadest to narrowest</text>
      {ranks.map((r, i) => {
        const y = 48 + i * 28;
        return (
          <g key={r}>
            <rect x="20" y={y} width="170" height="22" rx="6" className="fill-current text-violet-500/12" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(124 58 237 / 0.9)" }} />
            <text x="105" y={y + 15} fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{r}</text>
            <text x="260" y={y + 15} fontSize="9" className="fill-current text-sky-700 dark:text-sky-300" fontStyle="italic">{i >= 5 ? human[i] : human[i]}</text>
            <text x="460" y={y + 15} fontSize="9" className="fill-current text-emerald-700 dark:text-emerald-300" fontStyle="italic">{i >= 5 ? mango[i] : mango[i]}</text>
          </g>
        );
      })}
      <text x="20" y="252" fontSize="9" className="fill-current text-muted-foreground">Going down = fewer members, more shared features. Species is the smallest, real, breeding unit.</text>
    </svg>
  );
}
