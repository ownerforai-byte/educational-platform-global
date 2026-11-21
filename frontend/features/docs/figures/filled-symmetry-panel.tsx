// Symmetry of filled and half-filled subshells. Theme-aware.
export function FilledSymmetryPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 200" className={className} role="img" aria-label="Symmetrical distribution of electrons in fully filled and half filled subshells spherically averaged charge cloud lowering energy">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Symmetry — the second reason for the exceptions</text>
      {["p³", "d⁵", "f⁷", "p⁶", "d¹⁰", "f¹⁴"].map((lbl, i) => (
        <g key={lbl}>
          <circle cx={110 + i * 100} cy="100" r="34" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(14 165 233 / 0.85)" }} />
          <text x={110 + i * 100} y="106" fontSize="10" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">{lbl}</text>
        </g>
      ))}
      <text x="360" y="156" fontSize="8.4" textAnchor="middle" className="fill-current text-muted-foreground">Half-filled (p³, d⁵, f⁷) and fully-filled (p⁶, d¹⁰, f¹⁴) subshells spread charge evenly in all directions</text>
      <rect x="30" y="170" width="660" height="24" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="186" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">A symmetrical cloud has no preferred direction of attack — any electron it loses or gains disturbs the balance, so the set resists change and lowers energy.</text>
    </svg>
  );
}
