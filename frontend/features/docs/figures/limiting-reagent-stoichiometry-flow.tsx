// Stoichiometry flow with limiting branch. Theme-aware.
export function LimitingReagentStoichiometryFlow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 200" className={className} role="img" aria-label="Stoichiometry flowchart with limiting reactant branch convert both reactants to moles identify limiting compute product from limiting only">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Where the limiting branch sits in every calculation</text>
      <rect x="30" y="46" width="150" height="52" rx="9" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(14 165 233 / 0.85)" }} />
      <text x="105" y="68" fontSize="8.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">both reactants</text>
      <text x="105" y="84" fontSize="8.6" textAnchor="middle" className="fill-current text-muted-foreground">→ moles</text>
      <rect x="210" y="46" width="150" height="52" rx="9" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.85)" }} />
      <text x="285" y="68" fontSize="8.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">÷ coefficients</text>
      <text x="285" y="84" fontSize="8.6" textAnchor="middle" className="fill-current text-muted-foreground">→ compare</text>
      <rect x="390" y="46" width="140" height="52" rx="9" className="fill-current text-rose-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(244 63 94 / 0.85)" }} />
      <text x="460" y="68" fontSize="8.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">limiting chosen</text>
      <text x="460" y="84" fontSize="8.6" textAnchor="middle" className="fill-current text-muted-foreground">(smaller quotient)</text>
      <rect x="560" y="46" width="130" height="52" rx="9" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(16 185 129 / 0.85)" }} />
      <text x="625" y="68" fontSize="8.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">product + leftover</text>
      <text x="625" y="84" fontSize="8.6" textAnchor="middle" className="fill-current text-muted-foreground">from limiting only</text>
      {[195, 375, 545].map((x) => (
        <text key={x} x={x} y="76" fontSize="13" className="fill-current text-amber-500" fontWeight="800">→</text>
      ))}
      <rect x="30" y="116" width="660" height="70" rx="10" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="46" y="140" fontSize="8.6" className="fill-current text-foreground" fontWeight="800">Single-reactant problems skip the middle two boxes — with only one reactant given, the recipe ratio does the limiting work.</text>
      <text x="46" y="160" fontSize="8" className="fill-current text-muted-foreground">The same flow extends to percent-yield questions: theoretical yield comes out of the last box, actual yield arrives from the lab.</text>
    </svg>
  );
}
