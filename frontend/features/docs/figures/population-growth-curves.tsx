/**
 * Population growth curves — exponential J-curve vs logistic S-curve
 * with carrying capacity. Theme-aware via currentColor.
 */
export function PopulationGrowthCurves({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="Exponential J-shaped and logistic S-shaped population growth curves with carrying capacity K marked">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Population growth — J-curve vs S-curve</text>

      <line x1="70" y1="250" x2="620" y2="250" strokeWidth="2.5" className="stroke-current text-foreground" />
      <line x1="70" y1="250" x2="70" y2="50" strokeWidth="2.5" className="stroke-current text-foreground" />
      <text x="30" y="46" fontSize="9.5" className="fill-current text-muted-foreground">population (N)</text>
      <text x="560" y="272" fontSize="9.5" className="fill-current text-muted-foreground">time →</text>

      {/* carrying capacity */}
      <line x1="70" y1="110" x2="620" y2="110" strokeWidth="1.5" strokeDasharray="6 4" className="stroke-current text-rose-500" />
      <text x="590" y="102" fontSize="9.5" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="800">K — carrying capacity</text>

      {/* J curve */}
      <path d="M70 240 Q200 232 300 200 Q420 160 560 60" fill="none" strokeWidth="4" className="stroke-current text-amber-500" />
      <text x="470" y="56" fontSize="10.5" className="fill-current text-amber-600 dark:text-amber-400" fontWeight="800">J — exponential</text>
      <text x="470" y="70" fontSize="8.5" className="fill-current text-muted-foreground">unlimited resources; crashes after</text>

      {/* S curve */}
      <path d="M70 240 Q160 236 240 210 Q330 180 400 140 Q460 118 520 112 Q560 110 600 110" fill="none" strokeWidth="4" className="stroke-current text-emerald-500" />
      <text x="360" y="240" fontSize="10.5" className="fill-current text-emerald-600 dark:text-emerald-400" fontWeight="800">S — logistic</text>
      <text x="360" y="254" fontSize="8.5" className="fill-current text-muted-foreground">lags, then accelerates, then slows as K nears</text>

      <text x="16" y="292" fontSize="10" className="fill-current text-muted-foreground">Logistic growth: dN/dt = rN(1 − N/K). Real populations follow the S-curve — resources, predators and space brake the J-curve before it crashes.</text>
    </svg>
  );
}
