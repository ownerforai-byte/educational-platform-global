// PlusRGroupFlow figure. Theme-aware.
export function PlusRGroupFlow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Plus R electron donating groups enrich ortho para positions">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">+R effect — lone-pair donors</text>
      <rect x="40" y="55" width="240" height="70" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="160" y="82" fontSize="11" fontWeight="800" textAnchor="middle" fill="rgb(16 185 129)">+R groups</text>
      <text x="160" y="106" fontSize="10" textAnchor="middle" className="fill-current text-foreground">−OH · −OR · −NH₂ · −NR₂ · −X</text>
      <path d="M 285 90 L 360 90" stroke="rgb(16 185 129)" strokeWidth="3" markerEnd="url(#prf-a)" />
      <text x="322" y="78" fontSize="9.5" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">lone pair in</text>
      <rect x="365" y="55" width="255" height="70" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="492" y="82" fontSize="11" fontWeight="800" textAnchor="middle" fill="rgb(59 130 246)">ring enriched at o/p</text>
      <text x="492" y="106" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">activated toward electrophiles</text>
      <text x="330" y="165" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">phenol brominates instantly at ortho/para — +R at work</text>
      <text x="330" y="192" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">halogens donate by resonance even while withdrawing inductively — two-faced</text>
      <defs>
        <marker id="prf-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(16 185 129)" /></marker>
      </defs>
    </svg>
  );
}
