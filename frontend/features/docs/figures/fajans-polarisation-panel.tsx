// Fajan's rules: polarisation of the chloride anion by Li+ versus Na+. Theme-aware.
export function FajansPolarisationPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 680 300" className={className} role="img" aria-label="Fajans rules comparison of lithium chloride and sodium chloride showing smaller lithium cation polarising the chloride electron cloud more strongly">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Fajan's rules: small, charged cations distort anions</text>
      <g>
        <circle cx="120" cy="150" r="18" className="fill-current" style={{ color: "rgb(244 63 94)" }} opacity="0.35" />
        <text x="120" y="155" fontSize="12" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Li&#8314;</text>
        <circle cx="250" cy="150" r="52" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.15" />
        <circle cx="250" cy="150" r="52" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" />
        <text x="250" y="155" fontSize="12" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Cl&#8315;</text>
        <text x="185" y="230" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">tiny cation pulls the cloud -</text>
        <text x="185" y="248" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">more covalent character</text>
      </g>
      <g>
        <circle cx="430" cy="150" r="26" className="fill-current" style={{ color: "rgb(244 63 94)" }} opacity="0.35" />
        <text x="430" y="155" fontSize="12" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Na&#8314;</text>
        <circle cx="560" cy="150" r="52" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.15" />
        <circle cx="560" cy="150" r="52" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <text x="560" y="155" fontSize="12" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Cl&#8315;</text>
        <text x="495" y="230" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">bigger cation, weaker pull -</text>
        <text x="495" y="248" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">more ionic character</text>
      </g>
      <text x="340" y="286" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Rule: small cation + big anion + high charges = more covalent character (NEB 2024)</text>
    </svg>
  );
}
