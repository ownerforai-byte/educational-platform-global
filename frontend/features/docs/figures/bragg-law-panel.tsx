// Bragg's law X-ray diffraction. Theme-aware.
export function BraggLawPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 230" className={className} role="img" aria-label="Bragg diffraction X-rays reflecting off lattice planes with path difference 2d sin theta">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Bragg: nλ = 2d·sinθ</text>
      {[100, 150].map((y, i) => (
        <g key={i}>
          <line x1="120" y1={y} x2="540" y2={y} stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" strokeDasharray="7 5" />
          {[160, 240, 320, 400, 480].map((x) => (
            <circle key={x} cx={x} cy={y} r="4" className="fill-current" style={{ color: "rgb(148 163 184)" }} opacity="0.8" />
          ))}
          <text x="552" y={y + 4} fontSize="10" className="fill-current text-muted-foreground">{i ? "plane 2" : "plane 1"}</text>
        </g>
      ))}
      <path d="M 60 60 L 240 100" stroke="rgb(59 130 246)" strokeWidth="2.5" markerEnd="url(#abp)" />
      <path d="M 240 100 L 60 140" stroke="rgb(59 130 246)" strokeWidth="2.5" markerEnd="url(#abp)" />
      <path d="M 60 30 L 240 98" stroke="rgb(16 185 129)" strokeWidth="2" markerEnd="url(#abp2)" opacity="0.7" />
      <path d="M 240 98 L 500 60" stroke="rgb(16 185 129)" strokeWidth="2" markerEnd="url(#abp2)" opacity="0.7" />
      <path d="M 240 100 L 240 150" stroke="rgb(245 158 11)" strokeWidth="2" strokeDasharray="4 3" />
      <text x="250" y="135" fontSize="10.5" fill="rgb(245 158 11)">d</text>
      <text x="130" y="80" fontSize="10.5" fill="rgb(59 130 246)">θ</text>
      <defs>
        <marker id="abp" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(59 130 246)" /></marker>
        <marker id="abp2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(16 185 129)" /></marker>
      </defs>
      <text x="330" y="196" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">The lower wave travels 2d·sinθ farther — constructive interference only at the magic angles</text>
      <text x="330" y="216" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Read d, read the unit cell</text>
    </svg>
  );
}
