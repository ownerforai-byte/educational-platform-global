/**
 * Carbon cycle — atmosphere ↔ photosynthesis, respiration, decomposition,
 * combustion, ocean dissolution. Theme-aware via currentColor.
 */
export function CarbonCycle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="Carbon cycle diagram with atmospheric CO2 pool exchanging carbon through photosynthesis respiration decomposition combustion and ocean dissolution">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">The carbon cycle — where the carbon goes</text>

      {/* atmosphere */}
      <ellipse cx="330" cy="70" rx="180" ry="34" className="fill-current text-sky-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="330" y="66" fontSize="11" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ATMOSPHERE — CO₂ (~0.04%)</text>
      <text x="330" y="82" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">the exchange hub of the cycle</text>

      {/* producers */}
      <rect x="60" y="150" width="150" height="54" rx="10" className="fill-current text-green-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="135" y="172" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">PRODUCERS</text>
      <text x="135" y="188" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">photosynthesis fixes CO₂</text>

      {/* consumers */}
      <rect x="250" y="150" width="150" height="54" rx="10" className="fill-current text-amber-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="325" y="172" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">CONSUMERS</text>
      <text x="325" y="188" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">eat carbon, respire CO₂ back</text>

      {/* decomposers + fossil */}
      <rect x="440" y="150" width="90" height="54" rx="10" className="fill-current text-violet-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(124 58 237 / 0.9)" }} />
      <text x="485" y="172" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">DEAD MATTER</text>
      <text x="485" y="188" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">→ decomposers</text>
      <rect x="545" y="150" width="100" height="54" rx="10" className="fill-current text-slate-600/20" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(87 83 78 / 0.9)" }} />
      <text x="595" y="172" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">FOSSIL FUELS</text>
      <text x="595" y="188" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">buried carbon bank</text>

      {/* ocean */}
      <rect x="60" y="240" width="585" height="34" rx="8" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="352" y="262" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">OCEAN — the largest active carbon pool (dissolved CO₂ + carbonates)</text>

      {/* arrows */}
      <g className="stroke-current text-foreground" strokeWidth="2.5">
        <line x1="120" y1="146" x2="240" y2="102" /><line x1="300" y1="146" x2="300" y2="106" /><line x1="470" y1="146" x2="420" y2="104" />
        <line x1="590" y1="146" x2="540" y2="102" />
        <line x1="150" y1="236" x2="120" y2="208" /><line x1="400" y1="236" x2="350" y2="208" />
      </g>
      <text x="90" y="128" fontSize="8" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="700">CO₂ ↓ in</text>
      <text x="310" y="130" fontSize="8" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="700">CO₂ ↑ respiration</text>
      <text x="470" y="128" fontSize="8" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="700">combustion CO₂ ↑</text>

      <text x="16" y="292" fontSize="10" className="fill-current text-muted-foreground">The imbalance: we return fossil carbon faster than photosynthesis can fix it — CO₂ rises (~420 ppm) and warms the planet.</text>
    </svg>
  );
}
