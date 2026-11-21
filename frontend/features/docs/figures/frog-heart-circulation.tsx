/**
 * Frog heart and circulation — the three-chambered heart (two atria, one
 * ventricle) with sinus venosus, truncus arteriosus and the double-but-
 * incomplete circulation. Theme-aware via currentColor.
 */
export function FrogHeartCirculation({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 360" className={className} role="img" aria-label="Frog heart diagram showing sinus venosus, right and left atria, single ventricle, truncus arteriosus with carotid, systemic and pulmocutaneous arches, and the mixed double circulation">
      {/* sinus venosus */}
      <rect x="90" y="150" width="70" height="40" rx="10" className="fill-current text-sky-500/20" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.85)" }} />
      <text x="20" y="140" fontSize="11" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="700">Sinus venosus</text>
      <text x="30" y="156" fontSize="9" className="fill-current text-muted-foreground">receives deoxygenated</text>
      <text x="30" y="169" fontSize="9" className="fill-current text-muted-foreground">blood from body veins</text>
      <line x1="160" y1="170" x2="216" y2="186" strokeWidth="3" className="stroke-current text-sky-500" />
      <polygon points="206,178 224,188 206,196" className="fill-current text-sky-500" />

      {/* right atrium */}
      <ellipse cx="266" cy="176" rx="46" ry="36" className="fill-current text-sky-500/15" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.85)" }} />
      <text x="238" y="180" fontSize="11" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="800">RA</text>

      {/* left atrium */}
      <ellipse cx="266" cy="96" rx="46" ry="36" className="fill-current text-rose-500/15" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.85)" }} />
      <text x="238" y="100" fontSize="11" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="800">LA</text>
      <text x="316" y="100" fontSize="10" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="700">left atrium — oxygenated</text>
      <text x="316" y="114" fontSize="9" className="fill-current text-muted-foreground">blood from lungs (pulmonary veins)</text>

      {/* ventricle */}
      <path d="M240 210 q26 60 52 0 q-26 20 -52 0" fill="currentColor" style={{ color: "rgb(239 68 68 / 0.25)" }} />
      <ellipse cx="266" cy="238" rx="52" ry="46" className="fill-current text-rose-500/20" strokeWidth="3.5" stroke="currentColor" style={{ color: "rgb(239 68 68 / 0.9)" }} />
      <text x="242" y="242" fontSize="12" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="800">Ventricle</text>
      <text x="322" y="252" fontSize="10" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="700">single ventricle —</text>
      <text x="322" y="266" fontSize="9" className="fill-current text-muted-foreground">oxygenated and deoxygenated blood mix partially</text>

      {/* truncus arteriosus */}
      <rect x="254" y="282" width="24" height="34" rx="8" className="fill-current text-amber-500/25" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="150" y="308" fontSize="11" className="fill-current text-amber-600 dark:text-amber-400" fontWeight="700">Truncus arteriosus (conus arteriosus)</text>

      {/* three arches left and right */}
      <g className="stroke-current" strokeWidth="3.5" fill="none">
        {/* carotid */}
        <path d="M254 300 q-40 -18 -52 -56" style={{ color: "rgb(239 68 68 / 0.8)" }} />
        <path d="M278 300 q40 -18 52 -56" style={{ color: "rgb(239 68 68 / 0.8)" }} />
        {/* systemic */}
        <path d="M252 306 q-60 0 -84 34" style={{ color: "rgb(168 85 247 / 0.8)" }} />
        <path d="M280 306 q60 0 84 34" style={{ color: "rgb(168 85 247 / 0.8)" }} />
        {/* pulmocutaneous */}
        <path d="M254 312 q-44 22 -46 44" style={{ color: "rgb(14 165 233 / 0.8)" }} />
        <path d="M278 312 q44 22 46 44" style={{ color: "rgb(14 165 233 / 0.8)" }} />
      </g>
      <text x="30" y="238" fontSize="10" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="700">carotid arch → head</text>
      <text x="428" y="348" fontSize="10" className="fill-current text-violet-600 dark:text-violet-400" fontWeight="700">systemic arches → body organs</text>
      <text x="150" y="348" fontSize="10" className="fill-current text-sky-600 dark:text-sky-400" fontWeight="700">pulmocutaneous → lungs + skin</text>

      {/* note */}
      <text x="440" y="40" fontSize="12" className="fill-current text-foreground" fontWeight="800">Incomplete double circulation</text>
      <text x="440" y="58" fontSize="9.5" className="fill-current text-muted-foreground">Two atria keep inflows separate, but the single</text>
      <text x="440" y="72" fontSize="9.5" className="fill-current text-muted-foreground">ventricle mixes the blood — less efficient than</text>
      <text x="440" y="86" fontSize="9.5" className="fill-current text-muted-foreground">the four-chambered mammalian heart.</text>
      <text x="440" y="108" fontSize="9.5" className="fill-current text-muted-foreground">Heartbeat: sinus venosus is the pacemaker</text>
      <text x="440" y="122" fontSize="9.5" className="fill-current text-muted-foreground">(≈ 40–50 beats/min at rest); the frog heart is</text>
      <text x="440" y="136" fontSize="9.5" className="fill-current text-muted-foreground">myogenic and can beat outside the body.</text>
    </svg>
  );
}
