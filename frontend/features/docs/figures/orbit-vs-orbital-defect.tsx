// Bohr orbit vs quantum orbital — the uncertainty clash. Theme-aware.
export function OrbitVsOrbitalDefect({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 230" className={className} role="img" aria-label="Bohr fixed circular orbit with exact position and momentum crossed out versus quantum mechanical probability orbital cloud obeying the uncertainty principle">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Why the orbit dies: Δx·Δp ≥ h/4π</text>
      <circle cx="180" cy="120" r="62" className="fill-current text-rose-500/5" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <circle cx="180" cy="120" r="10" className="fill-current text-rose-500" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <circle cx="242" cy="120" r="6" className="fill-current text-foreground" />
      <line x1="120" y1="188" x2="240" y2="188" className="stroke-current text-rose-500" strokeWidth="3" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="180" y="206" fontSize="9" textAnchor="middle" className="fill-current text-rose-500" fontWeight="800">Bohr orbit — exact path: forbidden</text>
      <text x="180" y="220" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">claims exact position AND momentum at once</text>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
        const a = (i / 12) * Math.PI * 2;
        const r = 30 + ((i * 37) % 34);
        return <circle key={i} cx={540 + r * Math.cos(a)} cy={120 + r * Math.sin(a)} r={3 + (i % 3)} className="fill-current text-sky-500" style={{ color: `rgb(14 165 233 / ${0.25 + (i % 4) * 0.18})` }} />;
      })}
      <circle cx="540" cy="120" r="8" className="fill-current text-rose-500" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="540" y="206" fontSize="9" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">Orbital — probability cloud: allowed</text>
      <text x="540" y="220" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">ψ² says where the electron is likely to be, never exactly</text>
      <text x="360" y="42" fontSize="8.6" textAnchor="middle" className="fill-current text-muted-foreground">A definite track fixes both Δx and Δp — the uncertainty principle outlaws it, so Sommerfeld's ellipses were only a patch.</text>
    </svg>
  );
}
