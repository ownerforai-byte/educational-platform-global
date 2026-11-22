// PlusIGroupRoster figure. Theme-aware.
export function PlusIGroupRoster({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Electron releasing plus I effect alkyl groups">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">+I groups — the electron releasers</text>
      <rect x="40" y="55" width="280" height="110" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="180" y="82" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">ALKYL GROUPS</text>
      <text x="180" y="108" fontSize="11" textAnchor="middle" className="fill-current text-foreground">−CH₃ · −C₂H₅ · −CH(CH₃)₂</text>
      <text x="180" y="134" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">less electronegative than carbon</text>
      <text x="180" y="156" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">push σ-electrons toward the chain</text>
      <rect x="340" y="55" width="280" height="110" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="480" y="82" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">METALS</text>
      <text x="480" y="108" fontSize="11" textAnchor="middle" className="fill-current text-foreground">Na · Mg · Li (organometallic C–M)</text>
      <text x="480" y="134" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">strongly electropositive partners</text>
      <text x="480" y="156" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">carbon becomes δ− — nucleophilic</text>
      <text x="330" y="200" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">the more alkyl groups on a centre, the more electron density is pushed onto it</text>
    </svg>
  );
}
