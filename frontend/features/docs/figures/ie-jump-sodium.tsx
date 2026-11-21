// Solved: sodium's IE jump 496 to 4562 kJ/mol. Theme-aware.
export function IeJumpSodium({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 230" className={className} role="img" aria-label="Sodium successive ionisation energies bar chart 496 4562 6910 kilojoules per mole showing giant jump after first electron proves one valence electron">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Solved — Na's ionisation energies: 496 → 4562 → 6910 kJ/mol</text>
      {[[496, "1st", 40, "rgb(16 185 129 / 0.85)"], [4562, "2nd", 150, "rgb(245 158 11 / 0.85)"], [6910, "3rd", 190, "rgb(244 63 94 / 0.85)"]].map(([v, lbl, h, color], i) => (
        <g key={String(lbl)}>
          <rect x={110 + i * 160} y={200 - Number(h)} width="90" height={Number(h)} rx="6" className="fill-current" style={{ color: String(color) }} />
          <text x={155 + i * 160} y={192 - Number(h)} fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{String(v)}</text>
          <text x={155 + i * 160} y="216" fontSize="8.6" textAnchor="middle" className="fill-current text-muted-foreground">{String(lbl)} IE</text>
        </g>
      ))}
      <rect x="470" y="60" width="220" height="120" rx="10" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="580" y="84" fontSize="9.5" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">Read the jump</text>
      <text x="580" y="108" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">1st: easy — 3s¹ valence electron</text>
      <text x="580" y="128" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">2nd: 9× harder — now inside Ne core</text>
      <text x="580" y="148" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Ratio 4562/496 ≈ 9.2</text>
      <text x="360" y="226" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">A jump of this size marks the shell boundary: Na has exactly 1 valence electron, hence group 1 — evidence, not just configuration.</text>
    </svg>
  );
}
