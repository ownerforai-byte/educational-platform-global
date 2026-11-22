// GradientEconomy figure. Theme-aware.
export function GradientEconomy({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Energy economy of ion pumps showing the sodium gradient as currency">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The gradient is a currency</text>
      <rect x="60" y="65" width="180" height="70" rx="10" fill="rgb(245 158 11)" opacity="0.14" stroke="rgb(245 158 11)" />
      <text x="150" y="92" fontSize="11" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">Na⁺/K⁺ pump</text>
      <text x="150" y="112" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">spends ATP</text>
      <text x="150" y="128" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground">mints the Na⁺ gradient</text>
      <path d="M 245 100 L 300 100" stroke="rgb(148 163 184)" strokeWidth="2.5" markerEnd="url(#ge-a)" />
      <rect x="305" y="65" width="180" height="70" rx="10" fill="rgb(59 130 246)" opacity="0.12" stroke="rgb(59 130 246)" />
      <text x="395" y="92" fontSize="11" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">Na⁺ gradient (bank)</text>
      <text x="395" y="112" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">high outside, low inside</text>
      <text x="395" y="128" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground">stored potential energy</text>
      <path d="M 490 100 L 545 100" stroke="rgb(148 163 184)" strokeWidth="2.5" markerEnd="url(#ge-a)" />
      <rect x="550" y="65" width="80" height="70" rx="10" fill="rgb(16 185 129)" opacity="0.12" stroke="rgb(16 185 129)" />
      <text x="590" y="92" fontSize="10.5" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">spent on:</text>
      <text x="590" y="112" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">glucose uptake,</text>
      <text x="590" y="126" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">nerve signals</text>
      <text x="330" y="180" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">ATP → gradient → work: the pump is the mint, the membrane is the vault</text>
      <text x="330" y="202" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Every glucose molecule absorbed carries a hidden ATP price tag</text>
      <defs>
        <marker id="ge-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(148 163 184)" /></marker>
      </defs>
    </svg>
  );
}
