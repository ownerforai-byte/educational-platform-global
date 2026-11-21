/** Frog habitat & habit — amphibious life, hibernation/aestivation. Theme-aware. */
export function FrogHabitHabitat({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Frog amphibious habitat showing pond life on land and in water with hibernation in winter and aestivation in summer">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Amphibious by design — the frog's double life</text>

      {/* pond */}
      <path d="M20 170 Q200 150 380 170 T640 170 L640 230 L20 230 Z" className="fill-current text-sky-500/15" stroke="none" />
      <text x="60" y="200" fontSize="9.5" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="800">in water: webbed feet swim, skin respires</text>

      {/* frog on land */}
      <ellipse cx="480" cy="150" rx="70" ry="26" className="fill-current text-emerald-500/20" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <circle cx="540" cy="136" r="8" className="fill-current text-amber-400/70" />
      <text x="480" y="110" fontSize="9" textAnchor="middle" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="800">on land: lungs + moist skin, jumps with hind limbs</text>

      {/* seasons */}
      <g>
        <rect x="40" y="60" width="150" height="60" rx="10" className="fill-current text-sky-500/12" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
        <text x="115" y="84" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WINTER — hibernation</text>
        <text x="115" y="102" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">buried in mud; metabolism near zero</text>
        <rect x="230" y="60" width="150" height="60" rx="10" className="fill-current text-amber-500/12" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
        <text x="305" y="84" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">SUMMER — aestivation</text>
        <text x="305" y="102" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">dormant in dry mud to escape heat/dryness</text>
        <rect x="420" y="60" width="150" height="60" rx="10" className="fill-current text-emerald-500/12" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
        <text x="495" y="84" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">MONSOON — breeding</text>
        <text x="495" y="102" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">amplexus; eggs in water, tadpoles follow</text>
      </g>

      <text x="16" y="252" fontSize="10" className="fill-current text-muted-foreground">Cold-blooded (poikilothermic): body temperature follows the environment — hence the seasonal dormancy strategies.</text>
    </svg>
  );
}
