/** Cytokinesis contrast — cell plate (plants) vs cleavage furrow (animals). Well-detailed. Theme-aware. */
export function CytokinesisContrast({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Cytokinesis contrast plant cell plate forms from centre outward from Golgi vesicles with cell wall material versus animal cleavage furrow contracts actin ring pinching membrane inward microfilaments two daughter cells">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Cytokinesis — plants build a wall, animals pinch off</text>

      {/* plant */}
      <rect x="30" y="44" width="320" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="190" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">PLANT CELL — CELL PLATE</text>
      <rect x="60" y="90" width="120" height="110" rx="8" className="fill-none stroke-current text-emerald-600" strokeWidth="2.5" />
      <rect x="200" y="90" width="120" height="110" rx="8" className="fill-none stroke-current text-emerald-600" strokeWidth="2.5" />
      <line x1="180" y1="145" x2="200" y2="145" strokeWidth="5" className="stroke-current text-emerald-700" />
      {[150, 155, 160, 165, 170].map((y) => (
        <circle key={y} cx="190" cy={y} r="3" className="fill-current text-amber-500" />
      ))}
      <text x="190" y="228" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Golgi vesicles carry wall material to the equator;</text>
      <text x="190" y="242" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">cell plate grows outward → middle lamella + new walls</text>

      {/* animal */}
      <rect x="370" y="44" width="320" height="180" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="530" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ANIMAL CELL — CLEAVAGE FURROW</text>
      <path d="M400 90 q40 55 130 55 q90 0 130 -55" className="fill-none stroke-current text-rose-500" strokeWidth="3" />
      <path d="M400 200 q40 -55 130 -55 q90 0 130 55" className="fill-none stroke-current text-rose-500" strokeWidth="3" />
      <path d="M470 90 q60 40 120 0" className="fill-none stroke-current text-rose-600" strokeWidth="2.5" strokeDasharray="6 4" />
      <text x="530" y="228" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">actin–myosin ring contracts like a purse string;</text>
      <text x="530" y="242" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">membrane drawn inward until the two cells pinch apart</text>

      <rect x="30" y="240" width="660" height="46" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="50" y="262" fontSize="8.4" className="fill-current text-foreground" fontWeight="700">Why the difference? Plants cannot pinch — the rigid wall blocks constriction, so they build a new wall from inside.</text>
      <text x="50" y="279" fontSize="7.8" className="fill-current text-muted-foreground">Cytokinesis follows karyokinesis; if it fails, multinucleate cells form (e.g. some fungi, muscle fibres).</text>
    </svg>
  );
}
