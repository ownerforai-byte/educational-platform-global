/**
 * Water (hydrological) cycle — evaporation, transpiration, condensation,
 * precipitation, runoff, infiltration. Theme-aware via currentColor.
 */
export function WaterCycle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="Water cycle showing evaporation from ocean transpiration from plants condensation into clouds precipitation runoff and infiltration to groundwater">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">The water cycle — the universal solvent on the move</text>

      {/* ocean */}
      <path d="M20 220 Q170 205 320 220 T620 220 L620 260 L20 260 Z" className="fill-current text-sky-500/20" stroke="none" />
      <text x="110" y="248" fontSize="10" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="800">OCEAN</text>

      {/* sun */}
      <circle cx="600" cy="60" r="22" className="fill-current text-amber-400/40" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(251 191 36)" }} />
      <text x="600" y="98" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">sun — the pump</text>

      {/* mountain */}
      <path d="M400 220 L500 110 L600 220 Z" className="fill-current text-emerald-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="500" y="240" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">land — runoff & infiltration</text>

      {/* evaporation arrows */}
      <g className="stroke-current text-sky-500" strokeWidth="3">
        <line x1="120" y1="200" x2="120" y2="120" /><line x1="200" y1="205" x2="200" y2="130" />
        <line x1="460" y1="150" x2="460" y2="100" />
      </g>
      <polygon points="114,124 126,124 120,110" className="fill-current text-sky-500" />
      <polygon points="194,134 206,134 200,120" className="fill-current text-sky-500" />
      <text x="90" y="150" fontSize="9" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="700">evaporation</text>
      <text x="470" y="130" fontSize="9" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="700">transpiration</text>

      {/* cloud */}
      <ellipse cx="290" cy="90" rx="70" ry="22" className="fill-current text-slate-400/30" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(148 163 184 / 0.9)" }} />
      <text x="290" y="94" fontSize="8.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">condensation → cloud</text>
      <g className="stroke-current text-sky-500" strokeWidth="2.5">
        <line x1="260" y1="120" x2="260" y2="150" /><line x1="290" y1="120" x2="290" y2="155" /><line x1="320" y1="120" x2="320" y2="150" />
      </g>
      <text x="290" y="172" fontSize="9" textAnchor="middle" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="700">precipitation (rain/snow)</text>

      {/* groundwater */}
      <path d="M20 268 L620 268 L620 290 L20 290 Z" className="fill-current text-sky-700/15" stroke="none" />
      <text x="110" y="284" fontSize="8.5" className="fill-current text-muted-foreground" fontWeight="700">groundwater — infiltration recharges wells & springs</text>

      <text x="16" y="298" fontSize="0" className="fill-current text-muted-foreground">.</text>
      <text x="330" y="252" fontSize="9" className="fill-current text-muted-foreground">runoff → rivers → back to sea</text>
    </svg>
  );
}
