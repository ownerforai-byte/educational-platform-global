// Passivity film panel for HNO3. Theme-aware.
export function PassivityFilmPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 220" className={className} role="img" aria-label="Concentrated nitric acid passivates iron aluminium and chromium with a thin oxide film that stops further reaction">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Passivity: the acid that builds its own wall</text>
      <rect x="80" y="60" width="500" height="70" rx="10" className="fill-current" style={{ color: "rgb(148 163 184)" }} opacity="0.14" />
      <rect x="80" y="60" width="500" height="16" rx="8" className="fill-current" style={{ color: "rgb(239 68 68)" }} opacity="0.35" />
      <text x="330" y="72" fontSize="10.5" fontWeight="800" textAnchor="middle" fill="rgb(239 68 68)">thin oxide film (Fe₃O₄ / Al₂O₃ / Cr₂O₃)</text>
      <text x="330" y="108" fontSize="11.5" textAnchor="middle" className="fill-current text-muted-foreground">Fe, Al, Cr become inert to conc. HNO₃</text>
      <text x="330" y="170" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Why Al tank wagons carry conc. HNO₃ - and why dilute acid still attacks them</text>
      <text x="330" y="196" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Rub the film away and reactivity returns instantly</text>
    </svg>
  );
}
