// LD converter steelmaking flow. Theme-aware.
export function LdConverterFlow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 250" className={className} role="img" aria-label="Basic oxygen LD converter with oxygen lance blowing into molten pig iron and impurities leaving as gases and slag">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">The LD converter: oxygen refines steel</text>
      <path d="M 180 90 L 330 90 L 300 200 L 210 200 Z" className="fill-current" style={{ color: "rgb(239 68 68)" }} opacity="0.18" />
      <text x="255" y="150" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">molten pig iron</text>
      <line x1="255" y1="40" x2="255" y2="95" stroke="rgb(59 130 246)" strokeWidth="4" markerEnd="url(#arl)" />
      <text x="255" y="34" fontSize="11.5" fontWeight="800" textAnchor="middle" fill="rgb(59 130 246)">O₂ lance</text>
      <text x="380" y="90" fontSize="11.5" fontWeight="700" fill="rgb(148 163 184)">C + O₂ → CO₂ ↑</text>
      <text x="380" y="114" fontSize="11.5" fontWeight="700" fill="rgb(148 163 184)">S + O₂ → SO₂ ↑</text>
      <text x="380" y="138" fontSize="11.5" fontWeight="700" fill="rgb(148 163 184)">4P + 5O₂ → 2P₂O₅ (slag)</text>
      <defs><marker id="arl" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(59 130 246)" /></marker></defs>
      <text x="330" y="232" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">The oxidation heat itself keeps the melt - no external fuel needed</text>
    </svg>
  );
}
