export function CombustionEnergyPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Combustion — the energy ledger</text>
      <rect x="60" y="50" width="260" height="60" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="190" y="75" fontSize="12" textAnchor="middle" fill="currentColor" fontWeight="600">CH₄ + 2O₂ → CO₂ + 2H₂O</text>
      <text x="190" y="98" fontSize="11" textAnchor="middle" fill="rgb(245 158 11)">ΔH = −210 kcal (890 kJ)</text>
      <rect x="340" y="50" width="260" height="60" rx="6" fill="none" stroke="rgb(16 185 129)" strokeWidth="1.5" />
      <text x="470" y="75" fontSize="11" textAnchor="middle" fill="currentColor" fontWeight="600">C₂H₆ + 3.5O₂ → 2CO₂ + 3H₂O</text>
      <text x="470" y="98" fontSize="11" textAnchor="middle" fill="rgb(245 158 11)">ΔH = −372 kcal</text>
      <rect x="60" y="130" width="540" height="50" rx="6" fill="none" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <text x="330" y="152" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">More carbons → more heat per mole — the ledger scales with the skeleton.</text>
      <text x="330" y="172" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Insufficient O₂ leaks carbon monoxide (or soot) instead of CO₂.</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">CO is the silent poison: it binds haemoglobin 200× tighter than O₂.</text>
    </svg>
  );
}
