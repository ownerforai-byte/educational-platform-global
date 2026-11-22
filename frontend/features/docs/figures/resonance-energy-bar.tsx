// ResonanceEnergyBar figure. Theme-aware.
export function ResonanceEnergyBar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Resonance energy of benzene about 150 kJ per mole">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Resonance energy — the stability dividend</text>
      <rect x="60" y="70" width="240" height="46" rx="8" fill="rgb(148 163 184)" opacity="0.2" stroke="rgb(148 163 184)" />
      <text x="180" y="98" fontSize="10.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">imagined cyclohexatriene</text>
      <rect x="60" y="130" width="420" height="46" rx="8" fill="rgb(16 185 129)" opacity="0.2" stroke="rgb(16 185 129)" />
      <text x="270" y="158" fontSize="10.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">real benzene (delocalised π cloud)</text>
      <path d="M 300 116 L 480 126" stroke="rgb(245 158 11)" strokeWidth="2.5" markerEnd="url(#reb-a)" />
      <text x="395" y="112" fontSize="10.5" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">≈ 150 kJ/mol gained</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">this is why benzene substitutes instead of adding — addition would destroy the delocalisation</text>
      <defs>
        <marker id="reb-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(245 158 11)" /></marker>
      </defs>
    </svg>
  );
}
