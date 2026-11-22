// Sodium-chlorine electron transfer as a three-step reaction. Theme-aware.
export function ElectronTransferReaction({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 680 320" className={className} role="img" aria-label="Electron transfer reaction sequence sodium loses one electron chlorine gains one electron and ions combine into sodium chloride">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Ionic bond as a reaction: give, take, combine</text>
      <g className="fill-current text-foreground" fontSize="13" fontWeight="700">
        <text x="40" y="80">Step 1 - give:  Na (2,8,1)  &#8594;  Na&#8314; (2,8) + e&#8315;</text>
        <text x="40" y="130">Step 2 - take:  Cl (2,8,7) + e&#8315;  &#8594;  Cl&#8315; (2,8,8)</text>
        <text x="40" y="180">Step 3 - combine:  Na&#8314; + Cl&#8315;  &#8594;  NaCl (lattice)</text>
      </g>
      <g>
        <circle cx="90" cy="240" r="26" className="fill-current" style={{ color: "rgb(245 158 11)" }} opacity="0.25" />
        <text x="90" y="246" fontSize="13" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Na&#8314;</text>
        <path d="M 122 240 L 190 240" stroke="currentColor" strokeWidth="2" markerEnd="none" />
        <text x="156" y="232" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">attracts</text>
        <circle cx="226" cy="240" r="26" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.25" />
        <text x="226" y="246" fontSize="13" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Cl&#8315;</text>
        <path d="M 262 240 L 330 240" stroke="currentColor" strokeWidth="2" />
        <text x="296" y="232" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">electrostatic</text>
        <rect x="340" y="212" width="120" height="56" rx="10" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.14" />
        <rect x="340" y="212" width="120" height="56" rx="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <text x="400" y="246" fontSize="14" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">NaCl</text>
        <text x="480" y="240" fontSize="11" className="fill-current text-muted-foreground">Both ions now carry</text>
        <text x="480" y="258" fontSize="11" className="fill-current text-muted-foreground">noble-gas outer shells.</text>
      </g>
    </svg>
  );
}
