// Percentage data to molecular formula full flow. Theme-aware.
export function PercentToFormulaFlow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 200" className={className} role="img" aria-label="Percentage data to molecular formula flowchart percent composition empirical formula molar mass multiplier molecular formula">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Full pipeline: percentages → molecular formula</text>
      <rect x="30" y="46" width="140" height="52" rx="9" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(14 165 233 / 0.85)" }} />
      <text x="100" y="68" fontSize="8.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">% composition</text>
      <text x="100" y="84" fontSize="8.6" textAnchor="middle" className="fill-current text-muted-foreground">(or combustion data)</text>
      <rect x="200" y="46" width="140" height="52" rx="9" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(16 185 129 / 0.85)" }} />
      <text x="270" y="68" fontSize="8.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">empirical formula</text>
      <text x="270" y="84" fontSize="8.6" textAnchor="middle" className="fill-current text-muted-foreground">5-step machine</text>
      <rect x="370" y="46" width="140" height="52" rx="9" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.85)" }} />
      <text x="440" y="68" fontSize="8.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">molar mass M</text>
      <text x="440" y="84" fontSize="8.6" textAnchor="middle" className="fill-current text-muted-foreground">(density or VD)</text>
      <rect x="540" y="46" width="150" height="52" rx="9" className="fill-current text-violet-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(139 92 246 / 0.85)" }} />
      <text x="615" y="68" fontSize="8.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">molecular formula</text>
      <text x="615" y="84" fontSize="8.6" textAnchor="middle" className="fill-current text-muted-foreground">empirical × n</text>
      {[178, 348, 518].map((x) => (
        <text key={x} x={x} y="76" fontSize="13" className="fill-current text-amber-500" fontWeight="800">→</text>
      ))}
      <rect x="30" y="116" width="660" height="70" rx="10" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="46" y="140" fontSize="8.6" className="fill-current text-foreground" fontWeight="800">Where M comes from:</text>
      <text x="46" y="160" fontSize="8" className="fill-current text-muted-foreground">vapour density (M = 2×VD) · gas density at STP (M = d × 22.4) · direct statement in the question.</text>
      <text x="46" y="178" fontSize="7.8" className="fill-current text-muted-foreground">This pipeline is the single most examined numerical chain in Class 11 stoichiometry.</text>
    </svg>
  );
}
