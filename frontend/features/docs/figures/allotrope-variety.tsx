// AllotropeVariety figure. Theme-aware.
export function AllotropeVariety({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Allotropic forms of carbon diamond graphite and fullerene">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">One element, many architectures</text>
      <rect x="40" y="55" width="180" height="120" rx="10" fill="rgb(59 130 246)" opacity="0.08" stroke="rgb(59 130 246)" />
      <text x="130" y="80" fontSize="11" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">DIAMOND</text>
      {[[95, 115], [130, 100], [165, 115], [130, 145]].map(([cx, cy], i) => (
        <g key={i}><circle cx={cx} cy={cy} r="7" fill="rgb(59 130 246)" opacity="0.5" />
          {i > 0 && <line x1={i === 1 ? 102 : 130} y1={i === 1 ? 112 : i === 2 ? 115 : 132} x2={i === 1 ? 124 : 158} y2={i === 1 ? 104 : i === 2 ? 112 : 138} stroke="rgb(59 130 246)" strokeWidth="1.5" />}
        </g>
      ))}
      <text x="130" y="165" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">sp³ network, hardest natural solid</text>
      <rect x="240" y="55" width="180" height="120" rx="10" fill="rgb(120 113 108)" opacity="0.1" stroke="rgb(120 113 108)" />
      <text x="330" y="80" fontSize="11" fontWeight="800" fill="rgb(120 113 108)" textAnchor="middle">GRAPHITE</text>
      {[0, 1].map((l) => (
        <g key={l}>
          <ellipse cx="330" cy={115 + l * 34} rx="55" ry="10" fill="none" stroke="rgb(120 113 108)" strokeWidth="2" opacity="0.7" />
        </g>
      ))}
      <text x="330" y="165" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">sp² layers, sliding, conducts</text>
      <rect x="440" y="55" width="180" height="120" rx="10" fill="rgb(139 92 246)" opacity="0.08" stroke="rgb(139 92 246)" />
      <text x="530" y="80" fontSize="11" fontWeight="800" fill="rgb(139 92 246)" textAnchor="middle">FULLERENE C₆₀</text>
      <circle cx="530" cy="120" r="30" fill="none" stroke="rgb(139 92 246)" strokeWidth="2" />
      <circle cx="530" cy="120" r="17" fill="none" stroke="rgb(139 92 246)" strokeWidth="1.5" opacity="0.7" />
      <text x="530" y="165" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">caged football of 60 carbons</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Tetravalency's versatility shown in elemental form — same atom, three architectures</text>
    </svg>
  );
}
