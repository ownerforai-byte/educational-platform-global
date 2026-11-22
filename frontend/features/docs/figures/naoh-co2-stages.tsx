// NaohCo2Stages figure. Theme-aware.
export function NaohCo2Stages({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Two stage absorption of carbon dioxide by sodium hydroxide">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">CO₂ into NaOH — two stages</text>
      <rect x="40" y="60" width="280" height="110" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="180" y="86" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">STAGE 1 · limited CO₂</text>
      <text x="180" y="112" fontSize="11" textAnchor="middle" className="fill-current text-foreground">2NaOH + CO₂ → Na₂CO₃ + H₂O</text>
      <text x="180" y="136" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">the carbonate forms</text>
      <text x="180" y="156" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">(crust on an open pellet)</text>
      <rect x="340" y="60" width="280" height="110" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="480" y="86" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">STAGE 2 · excess CO₂</text>
      <text x="480" y="112" fontSize="11" textAnchor="middle" className="fill-current text-foreground">Na₂CO₃ + CO₂ + H₂O → 2NaHCO₃</text>
      <text x="480" y="136" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">the soluble bicarbonate forms</text>
      <text x="480" y="156" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">(standard NaOH loses strength)</text>
      <text x="330" y="205" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Same chemistry as scrubbing flue gas — OH⁻ is the stronger base and wins CO₂</text>
    </svg>
  );
}
