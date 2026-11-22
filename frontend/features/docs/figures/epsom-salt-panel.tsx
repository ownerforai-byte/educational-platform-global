// EpsomSaltPanel figure. Theme-aware.
export function EpsomSaltPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Epsom salt magnesium sulphate heptahydrate properties and uses">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Epsom salt — MgSO₄·7H₂O</text>
      <rect x="60" y="60" width="240" height="115" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="180" y="86" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">WHAT IT IS</text>
      <text x="180" y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">colourless needles, 7 waters</text>
      <text x="180" y="132" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">very soluble, bitter taste</text>
      <text x="180" y="152" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">effloresces slowly in air</text>
      <rect x="360" y="60" width="240" height="115" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="480" y="86" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">WHERE IT WORKS</text>
      <text x="480" y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">purgative in medicine</text>
      <text x="480" y="132" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">Mg + S fertiliser for crops</text>
      <text x="480" y="152" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">bath soaks; dyeing flocculant</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Named for Epsom, England — where the bitter spring water made it famous</text>
    </svg>
  );
}
