// Spin quantum number panel — the fourth number. Theme-aware.
export function SpinQuantumNumberPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 200" className={className} role="img" aria-label="Spin quantum number panel two possible values plus one half and minus one half clockwise anticlockwise with Stern Gerlach context">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">mₛ — the fourth quantum number</text>
      <circle cx="180" cy="100" r="34" className="fill-current text-sky-500/15" stroke="currentColor" strokeWidth="1.8" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <path d="M 180 66 A 34 34 0 0 1 214 100" className="stroke-current text-sky-500" strokeWidth="2.4" fill="none" style={{ color: "rgb(14 165 233 / 0.9)" }} markerEnd="url(#sparr)" />
      <text x="180" y="106" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">↑ +½</text>
      <text x="180" y="158" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">clockwise spin</text>
      <circle cx="360" cy="100" r="34" className="fill-current text-rose-500/15" stroke="currentColor" strokeWidth="1.8" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <path d="M 360 134 A 34 34 0 0 1 326 100" className="stroke-current text-rose-500" strokeWidth="2.4" fill="none" style={{ color: "rgb(244 63 94 / 0.9)" }} markerEnd="url(#sparr)" />
      <text x="360" y="106" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">↓ −½</text>
      <text x="360" y="158" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">anticlockwise spin</text>
      <rect x="460" y="52" width="230" height="100" rx="10" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="575" y="76" fontSize="9.5" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="800">Key facts</text>
      <text x="575" y="98" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">only two values, nothing between</text>
      <text x="575" y="118" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">independent of n, l, mₗ</text>
      <text x="575" y="138" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">explains Zeeman's finer splitting</text>
      <rect x="30" y="176" width="660" height="18" rx="0" />
      <text x="360" y="190" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Uhlenbeck and Goudsmit proposed spin in 1925 to explain the doublet fine structure — the fourth number completed the address.</text>
      <defs>
        <marker id="sparr" markerWidth="6" markerHeight="6" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" className="fill-current" /></marker>
      </defs>
    </svg>
  );
}
