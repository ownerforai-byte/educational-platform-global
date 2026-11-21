/** Frog female reproductive system — ovaries, oviducts with funnels, uterus, cloaca. Theme-aware. */
export function FrogFemaleReproductiveSystem({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Frog female reproductive system with lobed ovaries oviducts with ciliated funnels ovisac uterus opening into cloaca and fat bodies">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Female system — a separate road for the eggs</text>

      {/* ovaries */}
      <g>
        <g className="fill-current text-amber-500/40">
          <circle cx="120" cy="90" r="7" /><circle cx="134" cy="104" r="7" /><circle cx="120" cy="118" r="7" /><circle cx="106" cy="104" r="7" />
        </g>
        <text x="60" y="112" fontSize="8.5" textAnchor="end" className="fill-current text-amber-700 dark:text-amber-300" fontWeight="700">ovary (lobed)</text>
        <g className="fill-current text-amber-500/40">
          <circle cx="120" cy="170" r="7" /><circle cx="134" cy="184" r="7" /><circle cx="120" cy="198" r="7" /><circle cx="106" cy="184" r="7" />
        </g>
      </g>

      {/* oviducts */}
      <path d="M210 70 q60 10 90 40 q20 24 20 60 q0 30 -20 40" fill="none" strokeWidth="5" className="stroke-current text-rose-400" />
      <path d="M210 150 q60 10 90 40 q20 24 20 60" fill="none" strokeWidth="5" className="stroke-current text-rose-400" />
      <circle cx="210" cy="70" r="8" className="fill-current text-rose-500/40" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <circle cx="210" cy="150" r="8" className="fill-current text-rose-500/40" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="230" y="62" fontSize="8.5" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="700">ciliated oviducal funnel (ostium)</text>
      <text x="240" y="130" fontSize="8.5" className="fill-current text-muted-foreground">long coiled oviduct — adds jelly coat along the way</text>

      {/* cloaca */}
      <rect x="480" y="130" width="60" height="80" rx="12" className="fill-current text-violet-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(124 58 237 / 0.9)" }} />
      <text x="510" y="170" fontSize="8.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">cloaca</text>
      <text x="560" y="160" fontSize="8" className="fill-current text-muted-foreground">eggs + urine + faeces</text>
      <text x="560" y="176" fontSize="8" className="fill-current text-muted-foreground">leave by one opening</text>

      <text x="16" y="240" fontSize="10" className="fill-current text-muted-foreground">Eggs released into the coelom → swept by cilia into the oviducal funnel → jelly-coated in the oviduct → stored in the ovisac until amplexus lays them.</text>
    </svg>
  );
}
