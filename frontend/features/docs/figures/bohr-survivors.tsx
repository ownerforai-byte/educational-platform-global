// What survives from Bohr in modern physics. Theme-aware.
export function BohrSurvivors({ className }: { className?: string }) {
  const items: [string, string][] = [
    ["Quantised energy levels", "Eₙ = −13.6 Z²/n² eV — the core idea"],
    ["Photon rule hν = E₂ − E₁", "every line is still one jump"],
    ["Ionisation energy 13.6 eV", "the magnitude of E₁ for hydrogen"],
    ["Rydberg constant R", "1.097 × 10⁷ m⁻¹ still predicts lines"],
  ];
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Four Bohr results that survive in modern physics quantised energy levels photon rule ionisation energy and Rydberg constant">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">What Bohr got right — keep this in the answer</text>
      {items.map(([t, d], i) => (
        <g key={t}>
          <rect x={30 + (i % 2) * 340} y={44 + Math.floor(i / 2) * 62} width="320" height="52" rx="10" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(16 185 129 / 0.85)" }} />
          <text x={46 + (i % 2) * 340} y={66 + Math.floor(i / 2) * 62} fontSize="9.5" className="fill-current text-emerald-600" fontWeight="800">{t}</text>
          <text x={46 + (i % 2) * 340} y={84 + Math.floor(i / 2) * 62} fontSize="8" className="fill-current text-muted-foreground">{d}</text>
        </g>
      ))}
      <rect x="30" y="172" width="660" height="26" rx="8" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="189" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Balance line for the exam: the model fails on orbits and multi-electron atoms, but quantised levels and hν = ΔE carry straight into the quantum mechanical model.</text>
    </svg>
  );
}
