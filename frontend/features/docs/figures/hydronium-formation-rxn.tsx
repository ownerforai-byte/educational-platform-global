// Hydronium ion formation reaction. Theme-aware.
export function HydroniumFormationRxn({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 220" className={className} role="img" aria-label="Hydronium ion formation reaction where water donates a lone pair to a proton">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Water as a base: H2O + H&#8314; reaction</text>
      <g className="fill-current text-foreground" fontSize="14" fontWeight="700">
        <text x="40" y="80">H2O (2 lone pairs on O)  +  H&#8314;  &#8594;  H3O&#8314;</text>
      </g>
      <g>
        <circle cx="150" cy="150" r="24" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.25" />
        <text x="150" y="156" fontSize="13" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">H2O</text>
        <path d="M 186 150 L 250 150" stroke="currentColor" strokeWidth="2" />
        <circle cx="290" cy="150" r="20" className="fill-current" style={{ color: "rgb(244 63 94)" }} opacity="0.25" />
        <text x="290" y="156" fontSize="13" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">H&#8314;</text>
        <path d="M 322 150 L 390 150" stroke="currentColor" strokeWidth="2" />
        <rect x="400" y="122" width="130" height="56" rx="10" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.14" />
        <text x="465" y="156" fontSize="14" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">H3O&#8314;</text>
        <text x="560" y="150" fontSize="10.5" className="fill-current text-muted-foreground">pyramidal shape,</text>
        <text x="560" y="168" fontSize="10.5" className="fill-current text-muted-foreground">one coordinate bond</text>
      </g>
    </svg>
  );
}
