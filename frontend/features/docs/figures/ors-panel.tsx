// OrsPanel figure. Theme-aware.
export function OrsPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Oral rehydration solution exploiting sodium glucose co-transport">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">ORS — the pump mechanism at a hospital bedside</text>
      <rect x="40" y="60" width="280" height="120" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="180" y="86" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">THE DRINK</text>
      <text x="180" y="112" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">water + glucose + sodium (salts)</text>
      <text x="180" y="134" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">glucose keeps the symporter loaded</text>
      <text x="180" y="154" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">water follows osmotically</text>
      <rect x="340" y="60" width="280" height="120" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="480" y="86" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">THE RESULT</text>
      <text x="480" y="112" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">absorption continues even in diarrhoea</text>
      <text x="480" y="134" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">cholera deaths fall dramatically</text>
      <text x="480" y="154" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">millions of lives a year, pennies a dose</text>
      <text x="330" y="210" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Sugar + salt together — either alone absorbs poorly. That is the symport, in a sachet</text>
    </svg>
  );
}
