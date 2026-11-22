// Equilibrium reached from either side. Theme-aware.
export function EitherSideArrival({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Starting from pure reactants or pure products leads to the same equilibrium mixture">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">One destination, two roads</text>
      <rect x="40" y="60" width="180" height="60" rx="10" className="fill-current" style={{ color: "rgb(239 68 68)" }} opacity="0.16" />
      <text x="58" y="88" fontSize="13" fontWeight="800" className="fill-current text-foreground">start: pure A</text>
      <text x="58" y="106" fontSize="10.5" className="fill-current text-muted-foreground">only forward runs</text>
      <rect x="440" y="60" width="180" height="60" rx="10" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.16" />
      <text x="458" y="88" fontSize="13" fontWeight="800" className="fill-current text-foreground">start: pure B</text>
      <text x="458" y="106" fontSize="10.5" className="fill-current text-muted-foreground">only reverse runs</text>
      <path d="M 220 90 Q 290 90 320 150" fill="none" stroke="rgb(239 68 68)" strokeWidth="2.5" />
      <path d="M 440 90 Q 370 90 340 150" fill="none" stroke="rgb(16 185 129)" strokeWidth="2.5" />
      <rect x="250" y="160" width="160" height="60" rx="10" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity="0.18" />
      <text x="330" y="186" fontSize="13" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">same mixture</text>
      <text x="330" y="206" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">same Kc at same T</text>
      <text x="330" y="248" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Position depends on conditions, never on the starting point</text>
    </svg>
  );
}
