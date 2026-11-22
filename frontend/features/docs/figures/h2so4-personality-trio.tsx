// HNO3 three personalities. Theme-aware.
export function H2so4PersonalityTrio({ className }: { className?: string }) {
  const cards: [string, string, string, string][] = [
    ["strong acid", "Zn + H₂SO₄(dil) → ZnSO₄ + H₂; neutralises bases", "dilute = normal acid", "rgb(59 130 246)"],
    ["oxidant (hot, conc)", "Cu + 2H₂SO₄(conc) → CuSO₄ + SO₂ + 2H₂O", "S +6 → +4", "rgb(239 68 68)"],
    ["dehydrating agent", "C₁₂H₂₂O₁₁ → 12C + 11H₂O (sugar snake)", "strips H and O", "rgb(16 185 129)"],
  ];
  return (
    <svg viewBox="0 0 660 250" className={className} role="img" aria-label="Three personalities of sulphuric acid as acid oxidant and dehydrating agent with equations">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">One molecule, three jobs</text>
      {cards.map(([t, eq, s, c], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 56} width="580" height="46" rx="9" className="fill-current" style={{ color: c }} opacity="0.14" />
          <text x="58" y={64 + i * 56} fontSize="12.5" fontWeight="800" style={{ fill: c }}>{t}</text>
          <text x="58" y={82 + i * 56} fontSize="11" className="fill-current text-foreground">{eq}</text>
          <text x="600" y={76 + i * 56} fontSize="10" textAnchor="end" className="fill-current text-muted-foreground">{s}</text>
        </g>
      ))}
      <text x="330" y="238" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Dilute it and only the acid remains; heat it concentrated and the oxidant wakes</text>
    </svg>
  );
}
