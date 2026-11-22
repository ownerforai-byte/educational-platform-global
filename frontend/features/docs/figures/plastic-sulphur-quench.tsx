// Plastic sulphur quench. Theme-aware.
export function PlasticSulphurQuench({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 210" className={className} role="img" aria-label="Molten sulphur boiled and poured into cold water forming plastic amorphous sulphur that slowly reverts to rhombic">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Making plastic sulphur</text>
      <rect x="100" y="60" width="180" height="70" rx="10" className="fill-current" style={{ color: "rgb(245 158 11)" }} opacity="0.18" />
      <text x="190" y="90" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">boil molten S</text>
      <text x="190" y="112" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">dark, viscous &gt; 160 °C</text>
      <path d="M 290 95 Q 330 70 370 95" stroke="currentColor" strokeWidth="2.5" className="text-muted-foreground" fill="none" markerEnd="url(#aps)" />
      <rect x="375" y="60" width="180" height="70" rx="10" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity="0.16" />
      <text x="465" y="90" fontSize="11.5" fontWeight="800" textAnchor="middle" fill="rgb(59 130 246)">pour into cold water</text>
      <text x="465" y="112" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">chains frozen → rubbery solid</text>
      <defs><marker id="aps" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="currentColor" className="text-muted-foreground" /></marker></defs>
      <text x="330" y="168" fontSize="11.5" textAnchor="middle" className="fill-current text-foreground">Amorphous, non-crystalline — slowly reverts to rhombic S over days</text>
      <text x="330" y="194" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">A metastable allotrope captured mid-flight</text>
    </svg>
  );
}
