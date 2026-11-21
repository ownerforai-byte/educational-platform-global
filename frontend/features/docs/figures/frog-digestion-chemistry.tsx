/** Frog digestion chemistry — enzymes and sites table. Theme-aware. */
export function FrogDigestionChemistry({ className }: { className?: string }) {
  const row = (y: number, site: string, enzyme: string, substrate: string, k: string) => (
    <g key={k}>
      <text x="30" y={y} fontSize="9.5" className="fill-current text-foreground" fontWeight="700">{site}</text>
      <text x="240" y={y} fontSize="9.5" textAnchor="middle" className="fill-current text-sky-700 dark:text-sky-300">{enzyme}</text>
      <text x="470" y={y} fontSize="9.5" textAnchor="middle" className="fill-current text-emerald-700 dark:text-emerald-300">{substrate}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Frog digestion chemistry table with sites enzymes and substrates from buccal cavity saliva through stomach pepsin to intestinal enzymes and bile">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Digestion chemistry — who digests what, where</text>

      <rect x="20" y="44" width="80" height="24" rx="6" className="fill-current text-foreground/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(120 113 108)" }} />
      <text x="60" y="60" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">SITE</text>
      <text x="240" y="60" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ENZYME / SECRETION</text>
      <text x="470" y="60" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ACTS ON</text>

      {row(100, "buccal cavity", "mucus (no enzyme in frog)", "lubricates prey", "r1")}
      {row(130, "stomach", "HCl + pepsin (protease)", "protein → peptides", "r2")}
      {row(160, "bile (from liver)", "no enzyme — emulsifies fat", "fats → droplets", "r3")}
      {row(190, "pancreatic juice", "amylase · lipase · trypsin", "starch · fat · peptides", "r4")}
      {row(220, "intestinal juice", "maltase, lipase, peptidase", "final breakdown to glucose etc.", "r5")}

      <text x="16" y="248" fontSize="10" className="fill-current text-muted-foreground">Absorption: mostly in the ileum; simple products pass into blood vessels → transported to cells; assimilation follows.</text>
    </svg>
  );
}
