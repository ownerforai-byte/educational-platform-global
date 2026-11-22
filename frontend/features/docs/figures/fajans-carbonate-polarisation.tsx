// FajansCarbonatePolarisation figure. Theme-aware.
export function FajansCarbonatePolarisation({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Fajans polarisation of the carbonate anion by a small doubly charged cation">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Polarising power = charge ÷ size</text>
      <ellipse cx="200" cy="120" rx="90" ry="55" fill="rgb(59 130 246)" opacity="0.15" stroke="rgb(59 130 246)" strokeDasharray="5 4" />
      <text x="200" y="115" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">CO₃²⁻</text>
      <text x="200" y="135" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">big, polarisable cloud</text>
      <circle cx="330" cy="120" r="14" fill="rgb(239 68 68)" />
      <text x="330" y="125" fontSize="9" fill="rgb(255 255 255)" textAnchor="middle">M²⁺</text>
      <path d="M 316 120 C 290 105, 275 110, 262 118" stroke="rgb(239 68 68)" strokeWidth="2.5" fill="none" markerEnd="url(#fpp-a)" />
      <text x="290" y="95" fontSize="9.5" fill="rgb(239 68 68)">drags the cloud</text>
      <text x="470" y="80" fontSize="10.5" className="fill-current text-muted-foreground">one C–O bond weakens →</text>
      <text x="470" y="100" fontSize="10.5" className="fill-current text-muted-foreground">anion splits: MO + CO₂</text>
      <text x="470" y="128" fontSize="10.5" fill="rgb(16 185 129)">small M²⁺ (Be) — strong pull,</text>
      <text x="470" y="146" fontSize="10.5" fill="rgb(16 185 129)">low decomposition T</text>
      <text x="470" y="174" fontSize="10.5" fill="rgb(59 130 246)">big M²⁺ (Ba) — weak pull,</text>
      <text x="470" y="192" fontSize="10.5" fill="rgb(59 130 246)">high decomposition T</text>
      <defs>
        <marker id="fpp-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(239 68 68)" /></marker>
      </defs>
    </svg>
  );
}
