export function SupercooledLiquidPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 220" role="img" aria-label="Glass as a supercooled liquid softening over a range" className={className}>
      <text x="280" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">Why Glass is a Supercooled Liquid</text>
      <line x1="80" y1="160" x2="520" y2="160" stroke="currentColor" strokeWidth="1.5" />
      <line x1="80" y1="160" x2="80" y2="45" stroke="currentColor" strokeWidth="1.5" />
      <path d="M85,50 C180,55 260,60 320,110 C380,140 460,155 515,158" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <text x="140" y="45" fontSize="10.5" fill="currentColor">crystal: sharp melt (vertical drop)</text>
      <text x="380" y="100" fontSize="10.5" className="fill-current opacity-75">glass: softens over a range</text>
      <text x="300" y="180" textAnchor="middle" fontSize="11.5" fill="currentColor">temperature</text>
      <text x="66" y="50" fontSize="10.5" fill="currentColor">volume</text>
      <text x="280" y="205" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">No lattice, no sharp melting point - a liquid frozen before it could order</text>
    </svg>
  );
}
