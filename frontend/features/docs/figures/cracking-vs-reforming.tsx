// CrackingVsReforming figure. Theme-aware.
export function CrackingVsReforming({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Cracking changes molecular size while reforming changes shape">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Cracking cuts; reforming reshapes</text>
      <rect x="40" y="55" width="280" height="120" rx="10" fill="rgb(239 68 68)" opacity="0.08" stroke="rgb(239 68 68)" />
      <text x="180" y="80" fontSize="12" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">CRACKING — size down</text>
      <text x="180" y="110" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">C₁₀H₂₂ → C₈H₁₈ + C₂H₄</text>
      <text x="180" y="134" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">heat ~500–700 °C (thermal)</text>
      <text x="180" y="152" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">or zeolite ~450–500 °C (catalytic)</text>
      <text x="180" y="170" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">petrol-range alkanes + alkene feedstock</text>
      <rect x="340" y="55" width="280" height="120" rx="10" fill="rgb(59 130 246)" opacity="0.08" stroke="rgb(59 130 246)" />
      <text x="480" y="80" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">REFORMING — shape change</text>
      <text x="480" y="110" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">n-hexane → benzene + 4H₂</text>
      <text x="480" y="134" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">Pt catalyst, ~500 °C (platforming)</text>
      <text x="480" y="152" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">straight chains → branched + aromatic</text>
      <text x="480" y="170" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">same carbon number, new skeleton</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Different jobs: cracking supplies molecules, reforming upgrades them</text>
    </svg>
  );
}
