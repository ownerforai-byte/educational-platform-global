// Kinetic vs thermodynamic control of N2 reactivity. Theme-aware.
export function KineticVsThermoPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 230" className={className} role="img" aria-label="Thermodynamics favours nitrogen compound formation but the kinetic barrier of the triple bond blocks it at room temperature">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Willing but blocked: thermo vs kinetics</text>
      <rect x="40" y="56" width="280" height="90" rx="10" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.14" />
      <text x="180" y="84" fontSize="12.5" fontWeight="800" textAnchor="middle" fill="rgb(16 185 129)">thermodynamics says yes</text>
      <text x="180" y="108" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">N₂ + 3H₂ → 2NH₃ is exothermic</text>
      <text x="180" y="128" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">and favoured at low T</text>
      <rect x="340" y="56" width="280" height="90" rx="10" className="fill-current" style={{ color: "rgb(239 68 68)" }} opacity="0.14" />
      <text x="480" y="84" fontSize="12.5" fontWeight="800" textAnchor="middle" fill="rgb(239 68 68)">kinetics says not yet</text>
      <text x="480" y="108" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">the 941 kJ/mol barrier blocks</text>
      <text x="480" y="128" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">bond-breaking at room temperature</text>
      <text x="330" y="196" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Inertness is a kinetic verdict, not a thermodynamic one - hence catalysts and heat</text>
    </svg>
  );
}
