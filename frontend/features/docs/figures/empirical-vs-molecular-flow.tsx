// Empirical to molecular formula flow. Theme-aware.
export function EmpiricalVsMolecularFlow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Empirical formula to molecular formula flowchart simplest whole number ratio times n equals molecular mass over empirical formula mass with hydrogen peroxide example">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Empirical → molecular: one multiplier decides</text>
      <rect x="30" y="46" width="200" height="70" rx="10" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="130" y="70" fontSize="9.5" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">Empirical formula</text>
      <text x="130" y="92" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">simplest whole-number ratio</text>
      <text x="130" y="108" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">HO (hydrogen peroxide)</text>
      <text x="248" y="86" fontSize="13" className="fill-current text-amber-500" fontWeight="800">× n →</text>
      <rect x="310" y="46" width="200" height="70" rx="10" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="410" y="70" fontSize="9.5" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="800">Molecular formula</text>
      <text x="410" y="92" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">actual molecule composition</text>
      <text x="410" y="108" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">H₂O₂ (n = 2)</text>
      <rect x="530" y="46" width="160" height="70" rx="10" className="fill-current text-violet-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="610" y="70" fontSize="9.5" textAnchor="middle" className="fill-current text-violet-600" fontWeight="800">n = M / E</text>
      <text x="610" y="92" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">molecular mass ÷</text>
      <text x="610" y="106" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">empirical formula mass</text>
      <rect x="30" y="130" width="660" height="40" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="148" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">Check with benzene: empirical CH (13), molecular mass 78 → n = 6 → C₆H₆. Glucose: CH₂O (30), M = 180 → n = 6.</text>
      <text x="360" y="164" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Many compounds share one empirical formula — the ratio alone cannot identify a molecule.</text>
    </svg>
  );
}
