// Acid to water rule. Theme-aware.
export function AcidToWaterRule({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 230" className={className} role="img" aria-label="Always add acid to water slowly with stirring never water to acid because dilution is highly exothermic">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Dilution is a heat bomb — pour the acid, not the water</text>
      <rect x="60" y="56" width="240" height="110" rx="10" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.14" />
      <text x="180" y="86" fontSize="12.5" fontWeight="800" textAnchor="middle" fill="rgb(16 185 129)">acid → water ✓</text>
      <text x="180" y="112" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">heavy acid sinks and mixes</text>
      <text x="180" y="134" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">heat spreads through the bulk</text>
      <text x="180" y="156" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">stir, add slowly</text>
      <rect x="360" y="56" width="240" height="110" rx="10" className="fill-current" style={{ color: "rgb(239 68 68)" }} opacity="0.14" />
      <text x="480" y="86" fontSize="12.5" fontWeight="800" textAnchor="middle" fill="rgb(239 68 68)">water → acid ✗</text>
      <text x="480" y="112" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">light water floats on acid</text>
      <text x="480" y="134" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">heat boils the surface layer</text>
      <text x="480" y="156" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">acid spatters out</text>
      <text x="330" y="206" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">H₂SO₄ + nH₂O releases ~880 kJ/mol — enough to erupt</text>
    </svg>
  );
}
