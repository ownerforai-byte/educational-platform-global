/** Yeast reproduction — budding sequence and ascospore formation. Theme-aware. */
export function YeastReproduction({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Yeast reproduction budding sequence from mother cell through bud growth to separation and ascospore formation inside ascus under stress">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Yeast reproduction — budding, then ascospores</text>

      {/* budding chain */}
      {[
        { x: 80, label: "① mother cell" },
        { x: 210, label: "② bud emerges" },
        { x: 340, label: "③ nucleus divides" },
        { x: 470, label: "④ cells separate" },
      ].map((s, i) => (
        <g key={s.label}>
          {i === 0 && <ellipse cx={s.x} cy="110" rx="30" ry="22" className="fill-current text-amber-500/20" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />}
          {i === 1 && (<g><ellipse cx={s.x} cy="110" rx="30" ry="22" className="fill-current text-amber-500/20" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} /><circle cx={s.x + 32} cy="94" r="12" className="fill-current text-amber-500/30" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} /></g>)}
          {i === 2 && (<g><ellipse cx={s.x} cy="110" rx="30" ry="22" className="fill-current text-amber-500/20" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} /><circle cx={s.x + 32} cy="94" r="12" className="fill-current text-amber-500/30" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} /><circle cx={s.x - 6} cy="110" r="6" className="fill-current text-violet-600/70" /><circle cx={s.x + 34} cy="94" r="4" className="fill-current text-violet-600/70" /></g>)}
          {i === 3 && (<g><ellipse cx={s.x} cy="110" rx="30" ry="22" className="fill-current text-amber-500/20" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} /><circle cx={s.x + 48} cy="94" r="14" className="fill-current text-amber-500/30" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} /></g>)}
          <text x={s.x} y="156" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">{s.label}</text>
          {i < 3 && <line x1={s.x + 40} y1="110" x2={s.x + 90} y2="110" strokeWidth="2" className="stroke-current text-foreground" />}
        </g>
      ))}

      {/* ascus */}
      <rect x="60" y="170" width="580" height="52" rx="10" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(124 58 237 / 0.9)" }} />
      <text x="76" y="192" fontSize="9" className="fill-current text-foreground" fontWeight="800">SEXUAL back-up:</text>
      <text x="180" y="192" fontSize="8.5" className="fill-current text-muted-foreground">two cells fuse → diploid zygote → meiosis → the cell becomes an ASCUS holding 4 (or 8) ascospores</text>
      <text x="76" y="212" fontSize="8.5" className="fill-current text-muted-foreground">ascospores germinate only when conditions improve — survival strategy, not routine reproduction</text>
    </svg>
  );
}
