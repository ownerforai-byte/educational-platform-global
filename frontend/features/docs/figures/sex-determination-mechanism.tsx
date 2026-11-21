/** Sex determination mechanism — X and Y at conception. Well-detailed. Theme-aware. */
export function SexDeterminationMechanism({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Sex determination mechanism XX female XY male sperm determines sex X or Y chromosome egg always X Punnett 50 50 ratio SRY gene testis father contribution myth blame mother genetics equality">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Sex determination — the sperm decides</text>
      {/* Punnett */}
      <rect x="30" y="44" width="330" height="220" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="64" fontSize="7.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">MOTHER (XX) × FATHER (XY)</text>
      <text x="195" y="82" fontSize="6" textAnchor="middle" className="fill-current text-muted-foreground">every egg carries X · sperm carries X or Y</text>
      {["X", "Y"].map((g, i) => (
        <text key={g} x={130 + i * 110} y="104" fontSize="7" textAnchor="middle" className="fill-current text-sky-700" fontWeight="700">{g}</text>
      ))}
      {["X"].map((g, i) => (
        <text key={g} x="88" y={130 + i * 60} fontSize="7" textAnchor="middle" className="fill-current text-rose-600" fontWeight="700">{g}</text>
      ))}
      {[
        [0, 0, "XX", "girl"], [0, 1, "XY", "boy"],
        [1, 0, "XX", "girl"], [1, 1, "XY", "boy"],
      ].map(([r, c, geno, label]) => (
        <g key={`${r}${c}`}>
          <rect x={100 + (c as number) * 110} y={115 + (r as number) * 60} width="100" height="50" rx="8" className="fill-current" stroke="currentColor" strokeWidth="1"
            style={{ color: geno === "XX" ? "rgb(244 63 94 / 0.25)" : "rgb(2 132 199 / 0.25)" }} />
          <text x={150 + (c as number) * 110} y={145 + (r as number) * 60} fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{geno as string} · {label as string}</text>
        </g>
      ))}
      <text x="195" y="250" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">the ratio is 1:1 — and the coin flipped is the father's sperm</text>
      {/* facts */}
      <rect x="390" y="44" width="300" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE MECHANISM + THE MYTH</text>
      {[
        "the Y chromosome carries SRY,",
        "  the switch that starts testis",
        "  development; without it,",
        "  ovaries form by default",
        "so the father's sperm determines",
        "  sex — blaming the mother is",
        "  biology's verdict and",
        "  society's shame",
        "in birds it's the reverse: the",
        "  egg (ZW/ZW system) decides —",
        "  nature has more than one way",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="390" y="240" width="300" height="24" rx="8" className="fill-current text-emerald-500/15" strokeWidth="1" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="256" fontSize="6.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: egg = always X; sperm = X or Y → father decides.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Biology's answer to a social injustice: the mother never chose.</text>
    </svg>
  );
}
