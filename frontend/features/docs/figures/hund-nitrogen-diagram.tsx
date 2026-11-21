// Hund's rule orbital boxes for nitrogen. Theme-aware.
export function HundNitrogenDiagram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Hund's rule nitrogen configuration 1s2 2s2 2p3 with three unpaired parallel spins in separate p orbitals giving maximum multiplicity">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Hund's rule — N (1s² 2s² 2p³): pair up only when forced</text>
      <text x="90" y="76" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">1s</text>
      <rect x="60" y="88" width="60" height="52" rx="6" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="78" y="126" fontSize="16" className="fill-current text-sky-600" fontWeight="800">↑</text>
      <text x="102" y="126" fontSize="16" className="fill-current text-rose-500" fontWeight="800">↓</text>
      <text x="190" y="76" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">2s</text>
      <rect x="160" y="88" width="60" height="52" rx="6" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="178" y="126" fontSize="16" className="fill-current text-sky-600" fontWeight="800">↑</text>
      <text x="202" y="126" fontSize="16" className="fill-current text-rose-500" fontWeight="800">↓</text>
      {["2pₓ", "2p_y", "2p_z"].map((lbl, i) => (
        <g key={lbl}>
          <text x={310 + i * 110} y="76" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{lbl}</text>
          <rect x={280 + i * 110} y="88" width="60" height="52" rx="6" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(16 185 129 / 0.9)" }} />
          <text x={298 + i * 110} y="126" fontSize="16" className="fill-current text-emerald-600" fontWeight="800">↑</text>
        </g>
      ))}
      <rect x="30" y="156" width="660" height="40" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="174" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">Rule: degenerate orbitals fill singly first, with parallel spins — pairing costs energy, so it waits until every box has one.</text>
      <text x="360" y="190" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Result: nitrogen has 3 unpaired electrons → maximum multiplicity, paramagnetic, and the extra stability of a half-filled p subshell.</text>
    </svg>
  );
}
