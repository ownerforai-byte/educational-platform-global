// OxideLadderIa figure. Theme-aware.
export function OxideLadderIa({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Oxide ladder of alkali metals from normal oxide through peroxide to superoxide">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Burning in air — the oxide ladder</text>
      {[
        ["Li", "Li₂O", "normal oxide O²⁻", "4Li + O₂ → 2Li₂O", "rgb(59 130 246)", 30],
        ["Na", "Na₂O₂", "peroxide O₂²⁻", "2Na + O₂ → Na₂O₂", "rgb(245 158 11)", 250],
        ["K", "KO₂", "superoxide O₂⁻", "K + O₂ → KO₂", "rgb(239 68 68)", 470],
      ].map(([m, f, ion, eq, col, x]) => (
        <g key={m as string}>
          <rect x={x as number} y="55" width="180" height="115" rx="10" fill={col as string} opacity="0.1" stroke={col as string} />
          <text x={(x as number) + 90} y="80" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">{m as string} → {f as string}</text>
          <text x={(x as number) + 90} y="102" fontSize="10" textAnchor="middle" fill={col as string}>{ion as string}</text>
          <text x={(x as number) + 90} y="126" fontSize="10" textAnchor="middle" className="fill-current text-foreground">{eq as string}</text>
          <text x={(x as number) + 90} y="152" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">{["smallest cation", "bleaches, O₂ source", "paramagnetic, O₂ masks"][x === 30 ? 0 : x === 250 ? 1 : 2]}</text>
        </g>
      ))}
      <text x="330" y="200" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Bigger cation stabilises bigger oxygen anion</text>
    </svg>
  );
}
