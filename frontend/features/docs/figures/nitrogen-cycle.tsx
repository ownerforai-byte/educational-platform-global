/**
 * Nitrogen cycle — atmospheric N₂ through fixation, nitrification,
 * assimilation, ammonification and denitrification. Theme-aware via currentColor.
 */
export function NitrogenCycle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 400" className={className} role="img" aria-label="Nitrogen cycle diagram showing atmospheric nitrogen fixed by lightning, rhizobium and industry into ammonia, oxidised by nitrification to nitrites and nitrates, assimilated by plants, passed to animals, returned by ammonification and returned to the atmosphere by denitrification">
      {/* atmosphere */}
      <ellipse cx="330" cy="52" rx="240" ry="34" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.8)" }} />
      <text x="252" y="48" fontSize="14" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="800">Atmosphere — N₂ (78%)</text>
      <text x="286" y="66" fontSize="10" className="fill-current text-muted-foreground">the great reservoir plants cannot use directly</text>

      {/* fixation arrows */}
      <g>
        <line x1="150" y1="86" x2="120" y2="140" strokeWidth="3" className="stroke-current text-amber-500" />
        <polygon points="112,130 122,148 132,132" className="fill-current text-amber-500" />
        <text x="20" y="112" fontSize="10" className="fill-current text-amber-600 dark:text-amber-400" fontWeight="700">lightning (N₂→NO₃⁻)</text>
        <line x1="330" y1="88" x2="330" y2="150" strokeWidth="3" className="stroke-current text-emerald-600" />
        <polygon points="322,140 330,158 338,140" className="fill-current text-emerald-600" />
        <text x="344" y="118" fontSize="10" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="700">biological fixation</text>
        <text x="344" y="132" fontSize="9" className="fill-current text-muted-foreground">Rhizobium in root nodules ·</text>
        <text x="344" y="146" fontSize="9" className="fill-current text-muted-foreground">Azotobacter (free-living) · cyanobacteria</text>
        <line x1="520" y1="86" x2="548" y2="140" strokeWidth="3" className="stroke-current text-orange-500" />
        <polygon points="538,132 550,148 558,130" className="fill-current text-orange-500" />
        <text x="486" y="112" fontSize="10" className="fill-current text-orange-600 dark:text-orange-400" fontWeight="700">industrial (Haber)</text>
      </g>

      {/* soil ammonia */}
      <rect x="230" y="160" width="200" height="44" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.8)" }} />
      <text x="258" y="180" fontSize="12" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="800">NH₃ / NH₄⁺ (ammonia)</text>
      <text x="258" y="196" fontSize="9" className="fill-current text-muted-foreground">from fixation + ammonification</text>

      {/* nitrification chain */}
      <g>
        <line x1="430" y1="182" x2="480" y2="182" strokeWidth="3" className="stroke-current text-teal-600" />
        <polygon points="470,174 488,182 470,190" className="fill-current text-teal-600" />
        <text x="436" y="168" fontSize="9" className="fill-current text-muted-foreground">Nitrosomonas</text>
        <rect x="492" y="160" width="130" height="44" rx="10" className="fill-current text-teal-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(20 184 166 / 0.8)" }} />
        <text x="510" y="186" fontSize="12" className="fill-current text-teal-700 dark:text-teal-300" fontWeight="800">NO₂⁻ (nitrite)</text>
        <line x1="557" y1="204" x2="557" y2="244" strokeWidth="3" className="stroke-current text-teal-600" />
        <polygon points="549,234 557,252 565,234" className="fill-current text-teal-600" />
        <text x="566" y="228" fontSize="9" className="fill-current text-muted-foreground">Nitrobacter</text>
        <rect x="492" y="252" width="130" height="44" rx="10" className="fill-current text-teal-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(20 184 166 / 0.9)" }} />
        <text x="510" y="278" fontSize="12" className="fill-current text-teal-700 dark:text-teal-300" fontWeight="800">NO₃⁻ (nitrate)</text>
        <text x="510" y="292" fontSize="9" className="fill-current text-muted-foreground">the form plants absorb</text>
      </g>

      {/* assimilation to plants */}
      <g>
        <line x1="490" y1="274" x2="440" y2="274" strokeWidth="3" className="stroke-current text-emerald-600" />
        <polygon points="450,266 432,274 450,282" className="fill-current text-emerald-600" />
        <text x="300" y="240" fontSize="12" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="800">Plants (assimilation)</text>
        <text x="300" y="256" fontSize="9" className="fill-current text-muted-foreground">NO₃⁻ → amino acids → proteins</text>
        <g className="stroke-current text-emerald-600" strokeWidth="2.5" style={{ color: "rgb(5 150 105 / 0.8)" }}>
          <line x1="330" y1="266" x2="330" y2="310" />
          <path d="M330 280 q-16 -8 -22 -22" fill="none" /><path d="M330 280 q16 -8 22 -22" fill="none" />
          <path d="M330 296 q-14 -6 -20 -18" fill="none" /><path d="M330 296 q14 -6 20 -18" fill="none" />
        </g>
        <line x1="330" y1="312" x2="330" y2="336" strokeWidth="3" className="stroke-current text-foreground" />
        <polygon points="322,326 330,344 338,326" className="fill-current text-foreground" />
        <text x="344" y="330" fontSize="11" className="fill-current text-foreground" fontWeight="700">Animals (eat plants)</text>
      </g>

      {/* ammonification + denitrification */}
      <g>
        <path d="M250 336 q-60 10 -80 -30" fill="none" strokeWidth="3" className="stroke-current text-amber-600" />
        <polygon points="162,296 168,316 178,300" className="fill-current text-amber-600" />
        <text x="40" y="336" fontSize="10" className="fill-current text-amber-600 dark:text-amber-400" fontWeight="700">ammonification —</text>
        <text x="40" y="350" fontSize="9" className="fill-current text-muted-foreground">decomposers return NH₃ from</text>
        <text x="40" y="362" fontSize="9" className="fill-current text-muted-foreground">dead matter and excreta</text>
        <path d="M180 190 q-40 -30 -30 -80" fill="none" strokeWidth="3" strokeDasharray="6 4" className="stroke-current text-rose-500" />
        <polygon points="142,116 148,134 158,118" className="fill-current text-rose-500" />
        <text x="20" y="150" fontSize="10" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="700">denitrification —</text>
        <text x="20" y="164" fontSize="9" className="fill-current text-muted-foreground">Pseudomonas returns N₂</text>
        <text x="20" y="176" fontSize="9" className="fill-current text-muted-foreground">to the atmosphere</text>
      </g>
    </svg>
  );
}
