/** Gametogenesis comparison — spermatogenesis vs oogenesis in the frog. Theme-aware. */
export function FrogGametogenesis({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Comparison of spermatogenesis producing many small motile sperm and oogenesis producing few large eggs with yolk in the frog">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Making gametes — many small vs few large</text>

      {/* spermatogenesis */}
      <g>
        <text x="16" y="56" fontSize="10.5" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="800">SPERMATOGENESIS (testis)</text>
        <circle cx="90" cy="110" r="16" className="fill-current text-sky-500/25" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
        <text x="90" y="114" fontSize="7" textAnchor="middle" className="fill-current text-foreground">sperm</text>
        <path d="M106 110 q30 0 50 0" fill="none" strokeWidth="2.5" className="stroke-current text-sky-500" />
        <text x="170" y="104" fontSize="9" className="fill-current text-muted-foreground">spermatozoa: head (nucleus) +</text>
        <text x="170" y="120" fontSize="9" className="fill-current text-muted-foreground">middle piece (energy) + tail (propulsion)</text>
        <text x="170" y="144" fontSize="9" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="700">thousands per mating — cheap, mobile</text>
      </g>

      {/* oogenesis */}
      <g>
        <text x="16" y="186" fontSize="10.5" className="fill-current text-rose-700 dark:text-rose-300" fontWeight="800">OOGENESIS (ovary)</text>
        <circle cx="90" cy="220" r="18" className="fill-current text-rose-500/30" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
        <text x="90" y="224" fontSize="7" textAnchor="middle" className="fill-current text-foreground">egg</text>
        <text x="170" y="210" fontSize="9" className="fill-current text-muted-foreground">ovum: large, loaded with yolk +</text>
        <text x="170" y="226" fontSize="9" className="fill-current text-muted-foreground">pigment (animal pole dark, vegetal pale)</text>
        <text x="170" y="248" fontSize="9" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="700">hundreds per spawning — costly, immobile</text>
      </g>

      {/* contrast box */}
      <rect x="430" y="70" width="210" height="150" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(124 58 237 / 0.9)" }} />
      <text x="440" y="94" fontSize="9.5" className="fill-current text-foreground" fontWeight="800">Why the asymmetry?</text>
      <text x="440" y="116" fontSize="8.5" className="fill-current text-muted-foreground">external fertilisation in water:</text>
      <text x="440" y="132" fontSize="8.5" className="fill-current text-muted-foreground">sperm must be numerous to find eggs;</text>
      <text x="440" y="148" fontSize="8.5" className="fill-current text-muted-foreground">eggs must carry the food supply for</text>
      <text x="440" y="164" fontSize="8.5" className="fill-current text-muted-foreground">the embryo until it can feed itself</text>
      <text x="440" y="196" fontSize="8.5" className="fill-current text-violet-700 dark:text-violet-300" fontWeight="700">Both gametes are haploid (n);</text>
      <text x="440" y="212" fontSize="8.5" className="fill-current text-violet-700 dark:text-violet-300" fontWeight="700">fertilisation restores diploidy (2n).</text>
    </svg>
  );
}
