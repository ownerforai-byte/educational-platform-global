// Dipole moment vector convention with crossed arrow. Theme-aware.
export function DipoleVectorConvention({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 240" className={className} role="img" aria-label="Dipole moment vector convention showing crossed arrow pointing from positive to negative end with formula mu equals q times d and debye unit">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">The dipole arrow: tail at positive, cross at negative</text>
      <circle cx="180" cy="120" r="22" className="fill-current" style={{ color: "rgb(245 158 11)" }} opacity="0.3" />
      <text x="180" y="126" fontSize="12" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">H</text>
      <text x="180" y="165" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">delta plus</text>
      <circle cx="420" cy="120" r="26" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.3" />
      <text x="420" y="126" fontSize="12" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">F</text>
      <text x="420" y="165" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">delta minus</text>
      <line x1="210" y1="120" x2="386" y2="120" stroke="currentColor" strokeWidth="2.5" />
      <line x1="386" y1="120" x2="374" y2="112" stroke="currentColor" strokeWidth="2.5" />
      <line x1="386" y1="120" x2="374" y2="128" stroke="currentColor" strokeWidth="2.5" />
      <line x1="374" y1="112" x2="386" y2="120" stroke="currentColor" strokeWidth="2.5" />
      <line x1="374" y1="128" x2="386" y2="120" stroke="currentColor" strokeWidth="2.5" />
      <text x="300" y="105" fontSize="11" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">mu = q x d</text>
      <text x="320" y="210" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">1 debye = 3.33564 x 10 to the minus 30 coulomb metre</text>
    </svg>
  );
}
