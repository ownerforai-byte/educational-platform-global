/** Ozone layer protection success — the treaty that worked. Well-detailed. Theme-aware. */
export function OzoneProtectionSuccess({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Ozone layer protection success Montreal Protocol 1987 CFC phase out HCFC replacement HFO recovery hole healing 2066 projection compliance developing countries grace period multilateral fund success story ozone UV protection stratosphere Dobson units">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Ozone protection — the treaty that actually worked</text>
      {/* timeline */}
      <rect x="30" y="44" width="660" height="150" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <line x1="70" y1="120" x2="650" y2="120" className="stroke-current" strokeWidth="3" style={{ color: "rgb(2 132 199 / 0.5)" }} />
      {[
        ["1987", "Montreal Protocol: CFCs phased out on a schedule", 150],
        ["1990s", "HCFCs as interim replacements, then phased too", 320],
        ["2016", "Kigali amendment targets HFCs (climate, not ozone)", 490],
        ["~2066", "projected Antarctic recovery to 1980 levels", 620],
      ].map(([yr, ev, x], i) => (
        <g key={yr as string}>
          <circle cx={x as number} cy="120" r="7" className="fill-current" style={{ color: i === 3 ? "rgb(16 185 129 / 0.8)" : "rgb(2 132 199 / 0.8)" }} />
          <text x={x as number} y={i % 2 === 0 ? 100 : 150} fontSize="7" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{yr as string}</text>
          <text x={x as number} y={i % 2 === 0 ? 112 : 162} fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(ev as string).slice(0, 30)}</text>
          <text x={x as number} y={i % 2 === 0 ? 122 : 172} fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(ev as string).slice(30, 60)}</text>
        </g>
      ))}
      <text x="360" y="196" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">universal ratification — every UN member signed on; the ozone layer is now healing on schedule</text>
      {/* why it worked */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      {[
        "few chemicals, clear substitutes, and an industry that could profit from the switch",
        "a multilateral fund paid developing countries' transition costs — equity built into the treaty",
        "trade sanctions against non-parties gave the ban teeth",
        "Exam hook: Montreal Protocol (1987) is the model treaty — universal ratification, funded transition, real recovery.",
      ].map((t, i) => (
        <text key={t} x="46" y={232 + i * 18} fontSize="6.8" className="fill-current text-muted-foreground">• {t}</text>
      ))}
    </svg>
  );
}
