/** Pasteur swan-neck flask experiment. Theme-aware. */
export function PasteurExperiment({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Pasteur swan-neck flask experiment broth sterilised neck curved so dust and microbes settle in the bend broth stays sterile for months neck broken broth spoiled proving biogenesis">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Pasteur's swan-neck flasks vs spontaneous generation</text>

      {/* intact flask */}
      <g>
        <rect x="30" y="46" width="290" height="150" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
        <text x="175" y="68" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">INTACT SWAN NECK</text>
        <path d="M120 170 q0 -50 25 -50 q25 0 25 50" className="fill-none stroke-current text-stone-500" strokeWidth="4" />
        <circle cx="145" cy="170" r="14" className="fill-current text-emerald-500/40" />
        <circle cx="190" cy="118" r="3" className="fill-current text-stone-500" />
        <circle cx="200" cy="112" r="3" className="fill-current text-stone-500" />
        <text x="46" y="186" fontSize="7.4" className="fill-current text-muted-foreground">dust and microbes settle in the bend;</text>
        <text x="46" y="200" fontSize="7.4" className="fill-current text-muted-foreground">air enters — broth stays sterile for months</text>
      </g>

      {/* broken flask */}
      <g>
        <rect x="340" y="46" width="290" height="150" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
        <text x="485" y="68" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">NECK BROKEN</text>
        <path d="M430 170 q0 -50 25 -50 q25 0 25 50" className="fill-none stroke-current text-stone-500" strokeWidth="4" strokeDasharray="6 4" />
        <circle cx="455" cy="170" r="14" className="fill-current text-rose-500/40" />
        <circle cx="470" cy="100" r="3" className="fill-current text-stone-500" />
        <circle cx="480" cy="94" r="3" className="fill-current text-stone-500" />
        <circle cx="490" cy="106" r="3" className="fill-current text-stone-500" />
        <text x="356" y="186" fontSize="7.4" className="fill-current text-muted-foreground">airborne dust and microbes fall straight in —</text>
        <text x="356" y="200" fontSize="7.4" className="fill-current text-muted-foreground">broth spoiled within days</text>
      </g>
      <text x="16" y="222" fontSize="10" className="fill-current text-muted-foreground">Conclusion: life comes from existing life (biogenesis) — spontaneous generation disproved.</text>
    </svg>
  );
}
