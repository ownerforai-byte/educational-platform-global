// PlanePolarisedLightTest figure. Theme-aware.
export function PlanePolarisedLightTest({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Polarimeter test of optical activity with plane polarised light">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The polarimeter — how optical activity is measured</text>
      <rect x="40" y="70" width="90" height="40" rx="8" fill="rgb(245 158 11)" opacity="0.15" stroke="rgb(245 158 11)" />
      <text x="85" y="95" fontSize="10.5" fontWeight="800" textAnchor="middle" fill="rgb(245 158 11)">light</text>
      <path d="M 135 90 L 230 90" stroke="rgb(148 163 184)" strokeWidth="2" markerEnd="url(#ppl-a)" />
      <text x="182" y="80" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">polariser</text>
      <rect x="235" y="62" width="180" height="56" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="325" y="86" fontSize="10" fontWeight="800" textAnchor="middle" fill="rgb(59 130 246)">sample tube</text>
      <text x="325" y="106" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">chiral solution rotates the plane</text>
      <path d="M 420 90 L 560 90" stroke="rgb(16 185 129)" strokeWidth="2" markerEnd="url(#ppl-b)" />
      <text x="560" y="70" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">analyser reads angle α</text>
      <text x="330" y="160" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">d-isomer: rotates clockwise (+) · l-isomer: anticlockwise (−)</text>
      <text x="330" y="188" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">equal rotation in opposite directions is the experimental fingerprint of enantiomers</text>
      <defs>
        <marker id="ppl-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(148 163 184)" /></marker>
        <marker id="ppl-b" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(16 185 129)" /></marker>
      </defs>
    </svg>
  );
}
