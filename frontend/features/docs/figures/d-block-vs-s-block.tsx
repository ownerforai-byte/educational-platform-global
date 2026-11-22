// DBlockVsSBlock figure. Theme-aware.
export function DBlockVsSBlock({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Division of biological metal roles between s-block and d-block ions">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Two toolkits in the metal drawer</text>
      <rect x="40" y="60" width="280" height="120" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="180" y="86" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">s-BLOCK — charge + gradients</text>
      <text x="180" y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">Na⁺, K⁺, Mg²⁺, Ca²⁺</text>
      <text x="180" y="132" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">no redox — pure electricity,</text>
      <text x="180" y="150" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">structure and enzyme switching</text>
      <rect x="340" y="60" width="280" height="120" rx="10" fill="rgb(139 92 246)" opacity="0.1" stroke="rgb(139 92 246)" />
      <text x="480" y="86" fontSize="12" fontWeight="800" fill="rgb(139 92 246)" textAnchor="middle">d-BLOCK — coordination chemistry</text>
      <text x="480" y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">Fe, Cu, Zn, Ni, Co, Cr</text>
      <text x="480" y="132" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">bind O₂, substrates, ligands</text>
      <text x="480" y="150" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">at specific sites; redox capable</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Nerves are s-block physics; enzymes are d-block chemistry</text>
    </svg>
  );
}
