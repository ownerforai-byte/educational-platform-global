// MoltenSaltElectrolysis figure. Theme-aware.
export function MoltenSaltElectrolysis({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Molten salt electrolysis cell producing sodium at cathode and chlorine at anode">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Electrometallurgy — electrons replace coke</text>
      <rect x="180" y="60" width="300" height="130" rx="10" fill="rgb(245 158 11)" opacity="0.12" stroke="rgb(245 158 11)" strokeWidth="2" />
      <text x="330" y="86" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">molten NaCl, 600 °C — no water allowed</text>
      <rect x="210" y="100" width="14" height="70" fill="rgb(59 130 246)" />
      <text x="217" y="188" fontSize="10.5" fill="rgb(59 130 246)" textAnchor="middle">cathode</text>
      <text x="255" y="112" fontSize="11.5" fontWeight="800" fill="rgb(59 130 246)">Na⁺ + e⁻ → Na</text>
      <circle cx="262" cy="140" r="7" fill="rgb(147 197 253)" stroke="rgb(59 130 246)" />
      <text x="262" y="163" fontSize="9.5" fill="rgb(59 130 246)" textAnchor="middle">floats up</text>
      <rect x="436" y="100" width="14" height="70" fill="rgb(16 185 129)" />
      <text x="443" y="188" fontSize="10.5" fill="rgb(16 185 129)" textAnchor="middle">anode</text>
      <text x="420" y="112" fontSize="11.5" fontWeight="800" fill="rgb(16 185 129)" textAnchor="end">2Cl⁻ → Cl₂ + 2e⁻</text>
      <circle cx="408" cy="140" r="7" fill="rgb(110 231 183)" stroke="rgb(16 185 129)" />
      <text x="408" y="163" fontSize="9.5" fill="rgb(16 185 129)" textAnchor="middle">bubbles off</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Water would hydrogen-evolve first — only the molten salt lets the metal ion win</text>
    </svg>
  );
}
