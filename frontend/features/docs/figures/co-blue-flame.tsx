// CO blue flame. Theme-aware.
export function CoBlueFlame({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 210" className={className} role="img" aria-label="Carbon monoxide burning with characteristic blue flame to carbon dioxide releasing 283 kilojoules per mole">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">The blue flame test</text>
      <path d="M 300 160 Q 300 100 330 70 Q 360 100 360 160 Q 330 175 300 160" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity="0.75" />
      <text x="330" y="185" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">CO burning in air</text>
      <text x="470" y="100" fontSize="12.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">2CO + O₂ → 2CO₂</text>
      <text x="470" y="126" fontSize="11" textAnchor="middle" fill="rgb(59 130 246)">ΔH = −283 kJ/mol per CO</text>
      <text x="470" y="148" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">pale blue, hard to see in daylight</text>
      <text x="330" y="196" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">The blue haze over a coal fire is burning CO — invisible fuel, visible danger</text>
    </svg>
  );
}
