// Solids-omitted rule illustrated with CaCO3. Theme-aware.
export function SolidsOmittedRule({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Calcium carbonate decomposition equilibrium where the two solids are crossed out and only carbon dioxide remains in Kc">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Why the chalk drops out</text>
      <text x="330" y="80" fontSize="18" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">CaCO₃(s)  ⇌  CaO(s)  +  CO₂(g)</text>
      <line x1="130" y1="92" x2="230" y2="92" stroke="rgb(239 68 68)" strokeWidth="2.5" />
      <line x1="330" y1="92" x2="410" y2="92" stroke="rgb(239 68 68)" strokeWidth="2.5" />
      <text x="180" y="112" fontSize="10.5" fill="rgb(239 68 68)" textAnchor="middle">pure solid - active mass 1</text>
      <text x="370" y="112" fontSize="10.5" fill="rgb(239 68 68)" textAnchor="middle">pure solid - active mass 1</text>
      <rect x="240" y="140" width="180" height="46" rx="10" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.18" />
      <text x="330" y="170" fontSize="15" fontWeight="800" textAnchor="middle" fill="rgb(16 185 129)">Kc = [CO₂]</text>
      <text x="330" y="222" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">The gas alone decides the equilibrium - crush the marble, the constant never blinks</text>
    </svg>
  );
}
