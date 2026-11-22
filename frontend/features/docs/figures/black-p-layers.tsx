// Black phosphorus layers. Theme-aware.
export function BlackPLayers({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 210" className={className} role="img" aria-label="Black phosphorus puckered layered structure most stable allotrope made under high pressure">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Black P: the calm sibling</text>
      {[80, 120, 160].map((y, i) => (
        <path key={i} d={`M 100 ${y} l 40 -10 l 40 10 l 40 -10 l 40 10 l 40 -10 l 40 10 l 40 -10 l 40 10 l 40 -10 l 40 10`} stroke="rgb(51 65 85)" strokeWidth="2.5" fill="none" opacity={0.9 - i * 0.2} />
      ))}
      <text x="560" y="105" fontSize="10.5" className="fill-current text-muted-foreground">puckered sheets</text>
      <text x="330" y="192" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Most stable allotrope — made from white P under high pressure; least reactive, conducts</text>
    </svg>
  );
}
