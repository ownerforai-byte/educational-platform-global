// Series limit — converging lines and 1/(R n₁²). Theme-aware.
export function SeriesLimitDiagram({ className }: { className?: string }) {
  const xs = [90, 130, 162, 188, 210, 228, 243, 256, 268, 278];
  return (
    <svg viewBox="0 0 720 240" className={className} role="img" aria-label="Spectral lines crowding toward the series limit with formula lambda equals n one squared over R giving 91.2 nanometres for Lyman and 364.6 for Balmer">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">The series limit — lines crowd, then stop</text>
      {xs.map((x, i) => (
        <line key={x} x1={x} y1="52" x2={x} y2="104" className="stroke-current text-violet-500" strokeWidth="4" style={{ color: `rgb(139 92 246 / ${0.95 - i * 0.04})` }} />
      ))}
      <line x1="288" y1="46" x2="288" y2="110" className="stroke-current text-rose-500" strokeWidth="2" strokeDasharray="5 4" style={{ color: "rgb(244 63 94 / 0.95)" }} />
      <text x="296" y="60" fontSize="8.5" className="fill-current text-rose-500" fontWeight="800">series limit (n₂ → ∞)</text>
      <text x="90" y="128" fontSize="8.5" className="fill-current text-muted-foreground">n₂ = 2, 3, 4 … lines get closer together as the levels crowd near ionisation</text>
      <rect x="30" y="146" width="320" height="72" rx="10" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="46" y="168" fontSize="10" className="fill-current text-sky-600" fontWeight="800">Series limit formula</text>
      <text x="46" y="188" fontSize="10" className="fill-current text-foreground" fontWeight="700">λ(limit) = n₁² / R</text>
      <text x="46" y="206" fontSize="8.5" className="fill-current text-muted-foreground">Lyman: 1²/R = 91.2 nm · Balmer: 4/R = 364.6 nm</text>
      <rect x="370" y="146" width="320" height="72" rx="10" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="386" y="168" fontSize="10" className="fill-current text-amber-600" fontWeight="800">Why the lines converge</text>
      <text x="386" y="188" fontSize="8.5" className="fill-current text-muted-foreground">Eₙ gaps shrink as n grows (−13.6/n² eV), so photon</text>
      <text x="386" y="204" fontSize="8.5" className="fill-current text-muted-foreground">energies — and wavelengths — converge to 1/(R·n₁²).</text>
      <text x="360" y="232" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: the limit is the shortest wavelength of the series; the first line (smallest jump) is the longest.</text>
    </svg>
  );
}
