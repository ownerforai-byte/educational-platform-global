// FrothFlotationCell figure. Theme-aware.
export function FrothFlotationCell({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Froth flotation tank with sulphide particles carried up by oil-coated bubbles and gangue sinking">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Froth flotation — surface chemistry sorts the powder</text>
      <rect x="200" y="55" width="260" height="145" rx="12" fill="rgb(59 130 246)" opacity="0.08" stroke="rgb(59 130 246)" strokeWidth="2" />
      <text x="330" y="78" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">water + pine oil + powdered ore</text>
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} cx={240 + i * 45} cy={170 - (i % 3) * 22} r="9" fill="none" stroke="rgb(16 185 129)" strokeWidth="1.5" />
      ))}
      {[0, 1, 2].map((i) => (
        <rect key={i} x={250 + i * 60} y={118 - i * 8} width="9" height="9" fill="rgb(245 158 11)" />
      ))}
      <text x="410" y="125" fontSize="9.5" fill="rgb(245 158 11)">sulphide rides the froth ↑</text>
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={230 + i * 55} y={185} width="10" height="10" fill="rgb(148 163 184)" />
      ))}
      <text x="330" y="212" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">water-wetted silica sinks ↓</text>
      <text x="90" y="120" fontSize="10.5" className="fill-current text-muted-foreground">air blown</text>
      <text x="90" y="138" fontSize="10.5" className="fill-current text-muted-foreground">from below;</text>
      <text x="90" y="156" fontSize="10.5" className="fill-current text-muted-foreground">froth skimmed</text>
      <text x="540" y="120" fontSize="10.5" className="fill-current text-muted-foreground">works for</text>
      <text x="540" y="138" fontSize="10.5" className="fill-current text-muted-foreground">ZnS, PbS,</text>
      <text x="540" y="156" fontSize="10.5" className="fill-current text-muted-foreground">CuFeS₂ only</text>
    </svg>
  );
}
