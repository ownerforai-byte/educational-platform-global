// CurlyArrowNotation figure. Theme-aware.
export function CurlyArrowNotation({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Curly arrow notation full head for pairs half head for single electrons">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Reading the arrows of a mechanism</text>
      <rect x="40" y="55" width="280" height="110" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="180" y="82" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">full-head arrow ⟶</text>
      <text x="180" y="108" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">a PAIR of electrons moves</text>
      <text x="180" y="134" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">heterolysis, nucleophilic attack</text>
      <rect x="340" y="55" width="280" height="110" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="480" y="82" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">half-head (fishhook) ⟶</text>
      <text x="480" y="108" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">a SINGLE electron moves</text>
      <text x="480" y="134" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">homolysis, radical steps</text>
      <text x="330" y="200" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">arrows always show ELECTRON movement — never atom movement</text>
    </svg>
  );
}
