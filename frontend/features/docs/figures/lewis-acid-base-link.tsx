// LewisAcidBaseLink figure. Theme-aware.
export function LewisAcidBaseLink({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Electrophiles as Lewis acids and nucleophiles as Lewis bases">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The Lewis connection</text>
      <rect x="40" y="55" width="280" height="110" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="180" y="82" fontSize="12" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">ELECTROPHILE = Lewis ACID</text>
      <text x="180" y="108" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">accepts an electron pair</text>
      <text x="180" y="134" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">BF₃, AlCl₃, H⁺, carbocations</text>
      <rect x="340" y="55" width="280" height="110" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="480" y="82" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">NUCLEOPHILE = Lewis BASE</text>
      <text x="480" y="108" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">donates an electron pair</text>
      <text x="480" y="134" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">OH⁻, NH₃, CN⁻, H₂O</text>
      <text x="330" y="200" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">same definitions, reaction-flavoured vocabulary — acid/base theory in motion</text>
    </svg>
  );
}
