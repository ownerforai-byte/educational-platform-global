// Solved NEB 2023: which quantum-number set is impossible. Theme-aware.
export function ImpossibleSetChecker({ className }: { className?: string }) {
  const sets: [string, string, string, string][] = [
    ["Set a", "n = 3, l = 2, mₗ = −2, mₛ = +½", "Valid", "3d electron: l = 2 allows mₗ = −2 … +2"],
    ["Set b", "n = 2, l = 2, mₗ = 0, mₛ = −½", "Impossible", "l must be 0 … n−1; here l = 2 = n, not allowed"],
    ["Set c", "n = 4, l = 3, mₗ = +3, mₛ = +½", "Valid", "4f electron: l = 3 allows mₗ = −3 … +3"],
  ];
  return (
    <svg viewBox="0 0 720 230" className={className} role="img" aria-label="Solved NEB 2023 check of three quantum number sets with set b impossible because l equals n which violates l less than n rule">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Solved — NEB 2023 (2m): spot the impossible set</text>
      {sets.map(([label, vals, verdict, why], i) => {
        const bad = verdict === "Impossible";
        const color = bad ? "rgb(244 63 94 / 0.9)" : "rgb(16 185 129 / 0.9)";
        return (
          <g key={label}>
            <rect x="30" y={40 + i * 52} width="660" height="44" rx="10" className="fill-current" style={{ color }} opacity="0.12" />
            <rect x="30" y={40 + i * 52} width="660" height="44" rx="10" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color }} />
            <text x="46" y={60 + i * 52} fontSize="9.5" className="fill-current text-foreground" fontWeight="800">{label}: {vals}</text>
            <text x="46" y={76 + i * 52} fontSize="8" style={{ color }} fontWeight="700">{verdict} — {why}</text>
            <text x="674" y={60 + i * 52} fontSize="9" textAnchor="end" className="fill-current" style={{ color }} fontWeight="800">{bad ? "✗" : "✓"}</text>
          </g>
        );
      })}
      <rect x="30" y="200" width="660" height="22" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="215" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Validity checklist: 0 ≤ l ≤ n−1 · −l ≤ mₗ ≤ +l · mₛ = ±½ only. One broken rule is enough to reject the set.</text>
    </svg>
  );
}
