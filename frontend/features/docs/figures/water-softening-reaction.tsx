// WaterSofteningReaction figure. Theme-aware.
export function WaterSofteningReaction({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Washing soda removing permanent hardness by precipitating calcium carbonate">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Softening permanent hardness</text>
      <rect x="40" y="65" width="200" height="75" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="140" y="92" fontSize="11" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">HARD WATER</text>
      <text x="140" y="114" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">dissolved CaSO₄, MgSO₄</text>
      <text x="140" y="130" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">soap scums, no lather</text>
      <path d="M 245 102 L 320 102" stroke="rgb(245 158 11)" strokeWidth="2.5" markerEnd="url(#wsr-a)" />
      <text x="282" y="92" fontSize="9.5" textAnchor="middle" fill="rgb(245 158 11)">+ Na₂CO₃</text>
      <rect x="325" y="65" width="200" height="75" rx="10" fill="rgb(16 185 129)" opacity="0.12" stroke="rgb(16 185 129)" />
      <text x="425" y="92" fontSize="11" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">SOFT WATER</text>
      <text x="425" y="114" fontSize="10" textAnchor="middle" className="fill-current text-foreground">Na₂SO₄ left — harmless</text>
      <text x="425" y="130" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">lathers freely</text>
      <text x="330" y="170" fontSize="10.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">Na₂CO₃ + CaSO₄ → CaCO₃↓ + Na₂SO₄</text>
      <text x="330" y="192" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">MgSO₄ + Na₂CO₃ → MgCO₃↓ + Na₂SO₄ — same swap for magnesium</text>
      <defs>
        <marker id="wsr-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(245 158 11)" /></marker>
      </defs>
    </svg>
  );
}
