// BondFissionTwoWays figure. Theme-aware.
export function BondFissionTwoWays({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Homolytic and heterolytic fission of a covalent bond compared">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">One bond, two ways to break</text>
      <rect x="40" y="52" width="280" height="120" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="180" y="78" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">HOMOLYTIC (equal split)</text>
      <text x="180" y="106" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">A–B → A· + B·</text>
      <text x="180" y="130" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">one electron each → free radicals</text>
      <text x="180" y="152" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">non-polar bonds, heat or light</text>
      <rect x="340" y="52" width="280" height="120" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="480" y="78" fontSize="12" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">HETEROLYTIC (unequal split)</text>
      <text x="480" y="106" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">A–B → A⁺ + :B⁻</text>
      <text x="480" y="130" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">pair to one atom → cation + anion</text>
      <text x="480" y="152" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">polar bonds, polar solvents</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">the fission mode decides the intermediate — and the intermediate decides the reaction</text>
    </svg>
  );
}
