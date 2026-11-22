// KilnTemperaturePanel figure. Theme-aware.
export function KilnTemperaturePanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Comparison of kiln temperatures for magnesite and limestone calcination">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Two ores, two kilns</text>
      <rect x="40" y="60" width="280" height="120" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="180" y="86" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">MAGNESITE MgCO₃</text>
      <text x="180" y="112" fontSize="13" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">~350 °C</text>
      <text x="180" y="136" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">Mg²⁺ bends the carbonate until it snaps</text>
      <text x="180" y="158" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">→ magnesia for refractories</text>
      <rect x="340" y="60" width="280" height="120" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="480" y="86" fontSize="12" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">LIMESTONE CaCO₃</text>
      <text x="480" y="112" fontSize="13" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">~900 °C</text>
      <text x="480" y="136" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">Ca²⁺ only leans on it — a proper kiln</text>
      <text x="480" y="158" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">→ quick lime; ~0.44 t CO₂ per t of lime</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">The Fajans ladder, written in kiln fuel bills</text>
    </svg>
  );
}
