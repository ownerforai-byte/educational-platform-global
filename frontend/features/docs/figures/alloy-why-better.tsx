// AlloyWhyBetter figure. Theme-aware.
export function AlloyWhyBetter({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Pure metal layers slipping versus alloy atoms pinning the lattice">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Why alloys beat pure metals</text>
      <rect x="40" y="55" width="270" height="120" rx="10" fill="rgb(148 163 184)" opacity="0.12" stroke="rgb(148 163 184)" />
      <text x="175" y="78" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">PURE METAL</text>
      {[0, 1, 2].map((r) => (
        <g key={r}>
          {[0, 1, 2, 3, 4, 5].map((c) => (
            <circle key={c} cx={75 + c * 36} cy={100 + r * 24} r="6" fill="rgb(148 163 184)" />
          ))}
        </g>
      ))}
      <path d="M 60 112 L 290 112" stroke="rgb(239 68 68)" strokeWidth="2" strokeDasharray="6 4" markerEnd="url(#awb-a)" />
      <text x="175" y="165" fontSize="9.5" textAnchor="middle" fill="rgb(239 68 68)">planes slip — soft, bends</text>
      <rect x="350" y="55" width="270" height="120" rx="10" fill="rgb(16 185 129)" opacity="0.12" stroke="rgb(16 185 129)" />
      <text x="485" y="78" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">ALLOY</text>
      {[0, 1, 2].map((r) => (
        <g key={r}>
          {[0, 1, 2, 3, 4, 5].map((c) => (
            (r + c) % 3 === 0
              ? <rect key={c} x={385 + c * 36 - 6} y={100 + r * 24 - 6} width="12" height="12" fill="rgb(245 158 11)" />
              : <circle key={c} cx={385 + c * 36} cy={100 + r * 24} r="6" fill="rgb(148 163 184)" />
          ))}
        </g>
      ))}
      <text x="485" y="165" fontSize="9.5" textAnchor="middle" fill="rgb(16 185 129)">different atoms pin the planes — hard</text>
      <defs>
        <marker id="awb-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(239 68 68)" /></marker>
      </defs>
      <text x="330" y="205" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Plus the Cr₂O₃ passive film on stainless — chemistry added to mechanics</text>
    </svg>
  );
}
