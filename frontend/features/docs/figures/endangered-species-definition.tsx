/** Endangered species definition and legal schedules. Theme-aware. */
export function EndangeredSpeciesDefinition({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 190" className={className} role="img" aria-label="Endangered species definition very high risk of extinction in the wild IUCN EN loosely used for all threatened species CR EN VU and Nepal's national protection schedules under the National Parks and Wildlife Conservation Act">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">"Endangered species" — two meanings, one exam trap</text>

      <g>
        <rect x="40" y="46" width="280" height="100" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
        <text x="180" y="72" fontSize="8.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">STRICT (IUCN EN)</text>
        <text x="180" y="94" fontSize="7.6" textAnchor="middle" className="fill-current text-muted-foreground">facing a very high risk of</text>
        <text x="180" y="110" fontSize="7.6" textAnchor="middle" className="fill-current text-muted-foreground">extinction in the wild</text>
      </g>
      <g>
        <rect x="340" y="46" width="280" height="100" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
        <text x="480" y="72" fontSize="8.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">LOOSE (everyday use)</text>
        <text x="480" y="94" fontSize="7.6" textAnchor="middle" className="fill-current text-muted-foreground">any threatened species —</text>
        <text x="480" y="110" fontSize="7.6" textAnchor="middle" className="fill-current text-muted-foreground">CR, EN or VU collectively</text>
      </g>
      <text x="16" y="172" fontSize="9.5" className="fill-current text-muted-foreground">Nepal adds its own layer: nationally protected schedules under the National Parks and Wildlife Conservation Act.</text>
    </svg>
  );
}
