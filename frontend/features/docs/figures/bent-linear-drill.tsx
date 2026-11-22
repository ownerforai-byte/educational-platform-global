// Bent versus linear drill: water versus carbon dioxide. Theme-aware.
export function BentLinearDrill({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 680 280" className={className} role="img" aria-label="Drill contrasting bent water with two lone pairs and 104.5 degrees against linear carbon dioxide with no lone pairs and 180 degrees">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Drill: why is H2O bent but CO2 linear?</text>
      <g>
        <circle cx="150" cy="130" r="18" className="fill-current" style={{ color: "rgb(244 63 94)" }} opacity="0.3" />
        <text x="150" y="135" fontSize="11" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">O</text>
        <circle cx="100" cy="95" r="9" className="fill-current" opacity="0.2" />
        <text x="100" y="99" fontSize="8" textAnchor="middle" className="fill-current text-foreground">H</text>
        <circle cx="200" cy="95" r="9" className="fill-current" opacity="0.2" />
        <text x="200" y="99" fontSize="8" textAnchor="middle" className="fill-current text-foreground">H</text>
        <line x1="138" y1="120" x2="108" y2="102" stroke="currentColor" strokeWidth="2.5" />
        <line x1="162" y1="120" x2="192" y2="102" stroke="currentColor" strokeWidth="2.5" />
        <text x="150" y="180" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">4 domains: 2 bonds + 2 lone pairs</text>
        <text x="150" y="202" fontSize="12" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">bent, 104.5 degrees</text>
      </g>
      <g>
        <circle cx="480" cy="130" r="15" className="fill-current" opacity="0.3" />
        <text x="480" y="135" fontSize="11" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">C</text>
        <circle cx="400" cy="130" r="14" className="fill-current" style={{ color: "rgb(244 63 94)" }} opacity="0.3" />
        <text x="400" y="135" fontSize="11" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">O</text>
        <circle cx="560" cy="130" r="14" className="fill-current" style={{ color: "rgb(244 63 94)" }} opacity="0.3" />
        <text x="560" y="135" fontSize="11" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">O</text>
        <line x1="415" y1="130" x2="465" y2="130" stroke="currentColor" strokeWidth="2.5" />
        <line x1="495" y1="130" x2="545" y2="130" stroke="currentColor" strokeWidth="2.5" />
        <text x="480" y="180" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">2 domains: 2 double bonds, no lone pairs</text>
        <text x="480" y="202" fontSize="12" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">linear, 180 degrees</text>
      </g>
      <text x="340" y="256" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Count the domains, not the atoms - lone pairs bend the story (NEB 2024)</text>
    </svg>
  );
}
