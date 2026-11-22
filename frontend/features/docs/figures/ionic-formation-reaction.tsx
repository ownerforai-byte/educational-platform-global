// Magnesium chloride formation as a balanced electron-transfer reaction. Theme-aware.
export function IonicFormationReaction({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 680 280" className={className} role="img" aria-label="Magnesium chloride formation reaction with magnesium losing two electrons and each chlorine atom gaining one electron">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Two electrons change hands: Mg + Cl2 reaction</text>
      <g className="fill-current text-foreground" fontSize="13" fontWeight="700">
        <text x="40" y="72">Oxidation:  Mg (2,8,2)  &#8594;  Mg&#178;&#8314; (2,8) + 2 e&#8315;</text>
        <text x="40" y="112">Reduction:  Cl2 + 2 e&#8315;  &#8594;  2 Cl&#8315; (2,8,8 each)</text>
        <text x="40" y="152">Overall:  Mg + Cl2  &#8594;  MgCl2</text>
      </g>
      <g>
        <rect x="40" y="180" width="180" height="64" rx="10" className="fill-current" style={{ color: "rgb(245 158 11)" }} opacity="0.14" />
        <text x="130" y="206" fontSize="13" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Mg &#8594; Mg&#178;&#8314;</text>
        <text x="130" y="228" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">2,8,2 gives 2 away</text>
        <rect x="250" y="180" width="180" height="64" rx="10" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.14" />
        <text x="340" y="206" fontSize="13" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">2 Cl + 2 e&#8315; &#8594; 2 Cl&#8315;</text>
        <text x="340" y="228" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">each 2,8,7 takes one</text>
        <rect x="460" y="180" width="180" height="64" rx="10" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.14" />
        <text x="550" y="206" fontSize="13" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">MgCl2 lattice</text>
        <text x="550" y="228" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">1 : 2 ion ratio</text>
      </g>
      <text x="340" y="268" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Electron count must balance: 2 given = 2 taken</text>
    </svg>
  );
}
