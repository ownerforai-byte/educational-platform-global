// H2S combustion split. Theme-aware.
export function H2sCombustionSplit({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 220" className={className} role="img" aria-label="Hydrogen sulphide burning with limited air to sulphur and excess air to sulphur dioxide">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">How much air decides the product</text>
      <rect x="40" y="50" width="280" height="100" rx="10" className="fill-current" style={{ color: "rgb(245 158 11)" }} opacity="0.15" />
      <text x="180" y="80" fontSize="12" fontWeight="800" textAnchor="middle" fill="rgb(245 158 11)">limited air</text>
      <text x="180" y="106" fontSize="11.5" textAnchor="middle" className="fill-current text-foreground">2H₂S + O₂ → 2S + 2H₂O</text>
      <text x="180" y="130" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">pale yellow sulphur deposits</text>
      <rect x="340" y="50" width="280" height="100" rx="10" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity="0.15" />
      <text x="480" y="80" fontSize="12" fontWeight="800" textAnchor="middle" fill="rgb(59 130 246)">excess air</text>
      <text x="480" y="106" fontSize="11.5" textAnchor="middle" className="fill-current text-foreground">2H₂S + 3O₂ → 2SO₂ + 2H₂O</text>
      <text x="480" y="130" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">blue flame, pungent SO₂</text>
      <text x="330" y="196" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">S −2 can stop at 0 or climb to +4 — oxygen supply sets the destination</text>
    </svg>
  );
}
