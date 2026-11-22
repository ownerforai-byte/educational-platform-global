// Resonance energy of benzene from hydrogenation shortfall. Theme-aware.
export function ResonanceEnergyPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 680 300" className={className} role="img" aria-label="Resonance energy of benzene shown as the difference between expected and actual hydrogenation enthalpy about 150 kilojoules per mole">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Resonance energy: the hydrogenation shortfall</text>
      <line x1="80" y1="250" x2="620" y2="250" stroke="currentColor" strokeWidth="1.5" />
      <rect x="120" y="110" width="120" height="140" className="fill-current" style={{ color: "rgb(244 63 94)" }} opacity="0.25" />
      <text x="180" y="100" fontSize="11" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">predicted -360</text>
      <text x="180" y="270" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">3 isolated C=C</text>
      <rect x="300" y="150" width="120" height="100" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.25" />
      <text x="360" y="140" fontSize="11" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">observed -208</text>
      <text x="360" y="270" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">real benzene</text>
      <rect x="480" y="110" width="120" height="140" className="fill-current" style={{ color: "rgb(245 158 11)" }} opacity="0.18" />
      <text x="540" y="100" fontSize="11" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">gap = 152</text>
      <text x="540" y="270" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">resonance energy</text>
      <text x="340" y="292" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Benzene releases 152 kJ/mol less than three separate double bonds would - that energy is stored stability</text>
    </svg>
  );
}
