// Crystal lattice and unit cell. Theme-aware.
export function CrystalLatticeGrid({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Crystal lattice of points with one unit cell highlighted and translation arrows showing how it builds the whole crystal">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Lattice — the map. Unit cell — one tile of the map</text>
      {[-1, 0, 1, 2, 3].map((i) => [-1, 0, 1, 2].map((j) => (
        <circle key={`${i}_${j}`} cx={200 + i * 70} cy={60 + j * 55} r="4.5" className="fill-current" style={{ color: "rgb(148 163 184)" }} opacity="0.8" />
      )))}
      <rect x="200" y="60" width="140" height="110" fill="none" stroke="rgb(59 130 246)" strokeWidth="2.5" strokeDasharray="6 4" />
      <text x="270" y="52" fontSize="11.5" fontWeight="800" textAnchor="middle" fill="rgb(59 130 246)">unit cell</text>
      <path d="M 348 115 L 420 115" stroke="rgb(16 185 129)" strokeWidth="2.5" markerEnd="url(#clg)" />
      <text x="384" y="104" fontSize="10.5" textAnchor="middle" fill="rgb(16 185 129)">× millions</text>
      <rect x="425" y="60" width="140" height="110" fill="none" stroke="rgb(16 185 129)" strokeWidth="2" opacity="0.6" />
      <rect x="495" y="60" width="140" height="110" fill="none" stroke="rgb(16 185 129)" strokeWidth="2" opacity="0.35" />
      <defs><marker id="clg" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(16 185 129)" /></marker></defs>
      <text x="330" y="216" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Every point has identical surroundings — a, b, c and α, β, γ fix the whole pattern</text>
    </svg>
  );
}
