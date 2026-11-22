// Combustion analysis setup. Theme-aware.
export function CombustionAnalysisPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Combustion analysis apparatus organic compound burned in oxygen water absorbed by anhydrous calcium chloride carbon dioxide by potassium hydroxide">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Combustion analysis — C and H from two absorbers</text>
      <rect x="40" y="60" width="120" height="70" rx="10" className="fill-current text-rose-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(244 63 94 / 0.85)" }} />
      <text x="100" y="90" fontSize="8.6" textAnchor="middle" className="fill-current text-rose-500" fontWeight="800">compound + O₂</text>
      <text x="100" y="108" fontSize="8.6" textAnchor="middle" className="fill-current text-muted-foreground">burn (CuO hot)</text>
      <text x="195" y="100" fontSize="12" className="fill-current text-amber-500" fontWeight="800">→</text>
      <rect x="230" y="60" width="150" height="70" rx="10" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(14 165 233 / 0.85)" }} />
      <text x="305" y="90" fontSize="8.6" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">H₂O absorber</text>
      <text x="305" y="108" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">anhydrous CaCl₂ — gain = water mass</text>
      <text x="415" y="100" fontSize="12" className="fill-current text-amber-500" fontWeight="800">→</text>
      <rect x="450" y="60" width="150" height="70" rx="10" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(16 185 129 / 0.85)" }} />
      <text x="525" y="90" fontSize="8.6" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="800">CO₂ absorber</text>
      <text x="525" y="108" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">KOH solution — gain = CO₂ mass</text>
      <rect x="30" y="146" width="660" height="54" rx="10" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="46" y="168" fontSize="8.4" className="fill-current text-foreground" fontWeight="800">Conversions:</text>
      <text x="46" y="186" fontSize="8" className="fill-current text-muted-foreground">H mass = water gain × (2/18) · C mass = CO₂ gain × (12/44) · oxygen (if any) = sample mass − C − H.</text>
    </svg>
  );
}
