/** Taxonomic hierarchy & taxon categories — obligatory ranks. Theme-aware. */
export function TaxonRanksLadder({ className }: { className?: string }) {
  const ranks = [
    { t: "Kingdom", s: "broadest — all animals / all plants" },
    { t: "Phylum / Division", s: "body-plan level (Chordata)" },
    { t: "Class", s: "shared major traits (Mammalia)" },
    { t: "Order", s: "related families (Primates)" },
    { t: "Family", s: "close genera (Hominidae)" },
    { t: "Genus", s: "closely related species (Homo)" },
    { t: "Species", s: "the real, breeding unit (sapiens)" },
  ];
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Taxonomic categories obligatory ranks from kingdom to species narrowing downward with example at each level">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Seven obligatory taxonomic categories</text>
      {ranks.map((r, i) => {
        const w = 420 - i * 46;
        const x = 40 + i * 23;
        const y = 46 + i * 28;
        return (
          <g key={r.t}>
            <rect x={x} y={y} width={w} height="22" rx="6" style={{ color: "rgb(124 58 237 / 0.9)" }} className="fill-current opacity-12" strokeWidth="2" stroke="currentColor" />
            <text x={x + 12} y={y + 15} fontSize="9" className="fill-current text-foreground" fontWeight="700">{r.t}</text>
            <text x={x + 150} y={y + 15} fontSize="7.8" className="fill-current text-muted-foreground">{r.s}</text>
          </g>
        );
      })}
      <text x="16" y="250" fontSize="10" className="fill-current text-muted-foreground">Each rank = a TAXON (a group). As you descend, membership shrinks and shared characters sharpen.</text>
    </svg>
  );
}
