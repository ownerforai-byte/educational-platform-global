// Brown ring test junction. Theme-aware.
export function BrownRingJunction({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Test tube with layered sulphuric acid and ferrous sulphate showing the brown nitrosyl ring at the junction">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">The brown ring at the junction</text>
      <rect x="250" y="50" width="90" height="150" rx="14" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-muted-foreground" />
      <rect x="258" y="120" width="74" height="72" rx="10" className="fill-current" style={{ color: "rgb(148 163 184)" }} opacity="0.25" />
      <text x="295" y="160" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground">conc. H₂SO₄</text>
      <rect x="258" y="82" width="74" height="34" rx="8" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity="0.25" />
      <text x="295" y="102" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground">FeSO₄ + NO₃⁻</text>
      <rect x="258" y="114" width="74" height="8" className="fill-current" style={{ color: "rgb(146 64 14)" }} opacity="0.85" />
      <text x="420" y="100" fontSize="11.5" fontWeight="800" fill="rgb(146 64 14)">brown ring</text>
      <text x="420" y="122" fontSize="10.5" className="fill-current text-muted-foreground">[Fe(H₂O)₅NO]²⁺</text>
      <text x="420" y="144" fontSize="10.5" className="fill-current text-muted-foreground">nitrosyl ferrous sulphate</text>
      <text x="60" y="80" fontSize="10.5" className="fill-current text-muted-foreground">add acid down the wall</text>
      <text x="60" y="100" fontSize="10.5" className="fill-current text-muted-foreground">do NOT shake —</text>
      <text x="60" y="120" fontSize="10.5" className="fill-current text-muted-foreground">the ring is fragile</text>
      <text x="330" y="234" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">6Fe²⁺ + 2NO₃⁻ + 8H⁺ → 6Fe³⁺ + 2NO + 4H₂O; Fe²⁺ + NO → complex</text>
    </svg>
  );
}
