// DLPairPanel figure. Theme-aware.
export function DLPairPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Dextrorotatory and laevorotatory enantiomer pair properties">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The d/l pair — mirror twins</text>
      <rect x="40" y="52" width="280" height="110" rx="10" fill="rgb(245 158 11)" opacity="0.1" stroke="rgb(245 158 11)" />
      <text x="180" y="78" fontSize="12" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">d-form (dextrorotatory)</text>
      <text x="180" y="104" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">rotates light clockwise (+)</text>
      <text x="180" y="128" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">identical b.p., density, reactivity</text>
      <rect x="340" y="52" width="280" height="110" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="480" y="78" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">l-form (laevorotatory)</text>
      <text x="480" y="104" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">rotates light anticlockwise (−)</text>
      <text x="480" y="128" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">same properties except rotation</text>
      <text x="330" y="196" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">d and l are non-superimposable mirror images (enantiomers)</text>
    </svg>
  );
}
