// MinusRGroupFlow figure. Theme-aware.
export function MinusRGroupFlow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Minus R electron withdrawing groups deplete ring direct meta">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">−R effect — π-electron withdrawers</text>
      <rect x="40" y="55" width="240" height="70" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="160" y="82" fontSize="11" fontWeight="800" textAnchor="middle" fill="rgb(239 68 68)">−R groups</text>
      <text x="160" y="106" fontSize="10" textAnchor="middle" className="fill-current text-foreground">−NO₂ · −CN · −CHO · −COOH · C=O</text>
      <path d="M 285 90 L 360 90" stroke="rgb(239 68 68)" strokeWidth="3" markerEnd="url(#mrf-a)" />
      <text x="322" y="78" fontSize="9.5" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">π electrons out</text>
      <rect x="365" y="55" width="255" height="70" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="492" y="82" fontSize="11" fontWeight="800" textAnchor="middle" fill="rgb(59 130 246)">ring depleted at o/p</text>
      <text x="492" y="106" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">deactivated; substitution goes meta</text>
      <text x="330" y="165" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">nitrobenzene nitrates slowly — and only at the meta position</text>
      <text x="330" y="192" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">meta stays relatively electron-rich when o/p are drained</text>
      <defs>
        <marker id="mrf-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(239 68 68)" /></marker>
      </defs>
    </svg>
  );
}
