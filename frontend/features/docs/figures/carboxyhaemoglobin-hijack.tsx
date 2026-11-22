// Carboxyhaemoglobin hijack. Theme-aware.
export function CarboxyhaemoglobinHijack({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Carbon monoxide binding haemoglobin iron 200 times more strongly than oxygen forming carboxyhaemoglobin">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">The hijacking ligand</text>
      <rect x="70" y="60" width="220" height="90" rx="12" className="fill-current" style={{ color: "rgb(239 68 68)" }} opacity="0.16" />
      <text x="180" y="92" fontSize="12.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">Hb–Fe²⁺ site</text>
      <text x="180" y="116" fontSize="11" textAnchor="middle" fill="rgb(239 68 68)">CO affinity ≈ 200–250× O₂</text>
      <text x="180" y="138" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">0.1% CO in air ties up half the Hb</text>
      <rect x="370" y="60" width="220" height="90" rx="12" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.15" />
      <text x="480" y="92" fontSize="12.5" fontWeight="800" textAnchor="middle" fill="rgb(16 185 129)">treatment: pure O₂</text>
      <text x="480" y="116" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">high O₂ pressure displaces CO</text>
      <text x="480" y="138" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">(hyperbaric O₂ in severe cases)</text>
      <text x="330" y="190" fontSize="11.5" textAnchor="middle" className="fill-current text-foreground">Hb + CO → carboxyhaemoglobin (cherry-red, useless for O₂)</text>
      <text x="330" y="218" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Odourless, colourless, silent — the detector is the only warning</text>
    </svg>
  );
}
