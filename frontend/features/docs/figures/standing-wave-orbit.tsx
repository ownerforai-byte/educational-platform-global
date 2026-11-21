// Standing-wave derivation of Bohr quantisation. Theme-aware.
export function StandingWaveOrbit({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 240" className={className} role="img" aria-label="Electron standing wave fitting whole wavelengths around a circular orbit with derivation two pi r equals n lambda leading to m v r equals n h over two pi">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Why orbits are quantised — a wave must fit itself</text>
      <circle cx="150" cy="130" r="72" className="fill-current text-sky-500/5" stroke="currentColor" strokeWidth="1.8" style={{ color: "rgb(14 165 233 / 0.85)" }} />
      <path d="M 150 58 A 72 72 0 0 1 222 130" className="stroke-current text-sky-500" strokeWidth="3" fill="none" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <path d="M 222 130 A 72 72 0 0 1 150 202" className="stroke-current text-sky-500" strokeWidth="3" fill="none" style={{ color: "rgb(14 165 233 / 0.55)" }} />
      <path d="M 150 202 A 72 72 0 0 1 78 130" className="stroke-current text-sky-500" strokeWidth="3" fill="none" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <path d="M 78 130 A 72 72 0 0 1 150 58" className="stroke-current text-sky-500" strokeWidth="3" fill="none" style={{ color: "rgb(14 165 233 / 0.55)" }} />
      <circle cx="150" cy="130" r="9" className="fill-current text-rose-500" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="150" y="230" fontSize="8.4" textAnchor="middle" className="fill-current text-muted-foreground">whole wavelengths fit the circumference → standing wave survives</text>
      <rect x="300" y="52" width="390" height="150" rx="10" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(16 185 129 / 0.85)" }} />
      <text x="316" y="76" fontSize="9.5" className="fill-current text-emerald-600" fontWeight="800">The 3m derivation chain</text>
      <text x="316" y="98" fontSize="9.5" className="fill-current text-foreground" fontWeight="700">1. Standing wave: 2πr = nλ</text>
      <text x="316" y="120" fontSize="9.5" className="fill-current text-foreground" fontWeight="700">2. de Broglie: λ = h/mv</text>
      <text x="316" y="142" fontSize="9.5" className="fill-current text-foreground" fontWeight="700">3. Substitute: 2πr = nh/mv</text>
      <text x="316" y="170" fontSize="11" className="fill-current text-emerald-600" fontWeight="800">→ mvr = nh/2π (Bohr, derived)</text>
      <text x="360" y="222" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">An orbit of 2.5λ would overlap crest on trough and cancel itself — only whole-number fits survive. Quantisation is geometry.</text>
    </svg>
  );
}
