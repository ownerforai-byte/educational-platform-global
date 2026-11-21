/** Anthropoid ancestor and the split from apes. Theme-aware. */
export function AnthropoidAncestorSplit({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 220" className={className} role="img" aria-label="Anthropoid ancestor and the split common ape human ancestor Dryopithecus like forest ape 15 to 20 mya split 6 to 7 mya forest shrinkage Miocene cooling one branch stayed forest adapted chimpanzee gorilla other exploited open woodland savanna hominins">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">The anthropoid ancestor and the split</text>

      <text x="330" y="56" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Common ape–human ancestor (forest ape, ~15–20 mya)</text>
      <line x1="330" y1="62" x2="180" y2="120" strokeWidth="2.5" className="stroke-current text-emerald-600" />
      <line x1="330" y1="62" x2="480" y2="120" strokeWidth="2.5" className="stroke-current text-amber-600" />

      <rect x="60" y="120" width="240" height="66" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="180" y="142" fontSize="7.8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">STAYED IN FOREST</text>
      <text x="180" y="160" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">→ chimpanzee / gorilla line</text>
      <text x="180" y="176" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">forest-adapted, knuckle-walking</text>

      <rect x="360" y="120" width="240" height="66" rx="10" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="480" y="142" fontSize="7.8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">TOOK TO OPEN GROUND</text>
      <text x="480" y="160" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">→ hominins (our line)</text>
      <text x="480" y="176" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">open woodland and savanna</text>

      <text x="16" y="206" fontSize="8.4" className="fill-current text-muted-foreground">The split (~6–7 mya): forest shrinkage in Africa (Miocene cooling) divided the line.</text>
    </svg>
  );
}
