/**
 * Energy flow through an ecosystem — Sun → producers → consumers → decomposers,
 * with heat loss at each transfer (10% rule). Theme-aware via currentColor.
 */
export function EnergyFlowEcosystem({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 360" className={className} role="img" aria-label="Energy flow from the sun through producers, consumers and decomposers">
      {/* sun */}
      <circle cx="90" cy="70" r="30" className="fill-current text-amber-400/40" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.8)" }} />
      <text x="52" y="126" fontSize="13" className="fill-current text-amber-600 dark:text-amber-400" fontWeight="700">Solar energy</text>

      {/* energy arrow to producers */}
      <line x1="126" y1="76" x2="216" y2="112" strokeWidth="3" className="stroke-current text-amber-500" />
      <polygon points="202,98 224,116 198,118" className="fill-current text-amber-500" />

      {/* trophic level boxes */}
      <g>
        <rect x="220" y="90" width="150" height="56" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.6)" }} />
        <text x="246" y="114" fontSize="14" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="800">Producers</text>
        <text x="246" y="134" fontSize="11" className="fill-current text-muted-foreground">100% energy</text>
      </g>
      <g>
        <rect x="420" y="90" width="150" height="56" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.6)" }} />
        <text x="444" y="114" fontSize="14" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="800">Herbivores</text>
        <text x="444" y="134" fontSize="11" className="fill-current text-muted-foreground">≈10% passes on</text>
      </g>
      <g>
        <rect x="420" y="196" width="150" height="56" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.6)" }} />
        <text x="446" y="220" fontSize="14" className="fill-current text-violet-700 dark:text-violet-300" fontWeight="800">Carnivores</text>
        <text x="446" y="240" fontSize="11" className="fill-current text-muted-foreground">≈1% of original</text>
      </g>

      {/* flow arrows */}
      <line x1="370" y1="118" x2="414" y2="118" strokeWidth="3" className="stroke-current text-foreground" />
      <polygon points="404,109 422,118 404,127" className="fill-current text-foreground" />
      <line x1="495" y1="146" x2="495" y2="190" strokeWidth="3" className="stroke-current text-foreground" />
      <polygon points="486,180 495,198 504,180" className="fill-current text-foreground" />
      <text x="506" y="174" fontSize="12" className="fill-current text-muted-foreground">eaten</text>

      {/* heat loss arrows */}
      <line x1="295" y1="146" x2="295" y2="196" strokeWidth="2" strokeDasharray="5 4" className="stroke-current text-rose-500" />
      <polygon points="287,186 295,204 303,186" className="fill-current text-rose-500" />
      <text x="228" y="222" fontSize="12" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="700">respiration → heat</text>
      <text x="228" y="240" fontSize="11" className="fill-current text-muted-foreground">(unidirectional — not recycled)</text>

      {/* decomposers */}
      <g>
        <rect x="120" y="270" width="230" height="56" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.55)" }} />
        <text x="146" y="294" fontSize="14" className="fill-current text-amber-700 dark:text-amber-300" fontWeight="800">Decomposers</text>
        <text x="146" y="314" fontSize="11" className="fill-current text-muted-foreground">break down dead matter → nutrients</text>
      </g>
      {/* arrows from levels to decomposers */}
      <line x1="295" y1="250" x2="262" y2="264" strokeWidth="2" strokeDasharray="4 4" className="stroke-current text-muted-foreground" />
      <line x1="430" y1="252" x2="350" y2="286" strokeWidth="2" strokeDasharray="4 4" className="stroke-current text-muted-foreground" />

      {/* nutrient cycle note */}
      <text x="390" y="296" fontSize="12" className="fill-current text-muted-foreground">nutrients recycle (cyclic),</text>
      <text x="390" y="314" fontSize="12" className="fill-current text-muted-foreground">energy does not (one-way)</text>
    </svg>
  );
}
