/** Ozone depletion chemistry — chlorine's catalytic chain. Well-detailed. Theme-aware. */
export function OzoneDepletionChemistry({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Ozone depletion chemistry chlorine radical catalytic cycle CFC photolysis UV Cl O3 O2 ClO reaction steps one chlorine destroys 100000 ozone polar stratospheric clouds Antarctic spring activation reservoir Dobson units chemistry equations">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Ozone destruction — one atom, a hundred thousand losses</text>
      {/* catalytic cycle */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE CATALYTIC CYCLE</text>
      {[
        ["1. Release", "UV splits CFC → free Cl atom", 120],
        ["2. Strike", "Cl + O₃ → ClO + O₂ (ozone gone)", 165],
        ["3. Reset", "ClO + O → Cl + O₂ (Cl is back)", 210],
      ].map(([k, v, y], i) => (
        <g key={k}>
          <text x="60" y={(y as number) - 4} fontSize="6.8" className="fill-current text-sky-600" fontWeight="800">{k}</text>
          <text x="60" y={(y as number) + 10} fontSize="6.2" className="fill-current text-muted-foreground">{v}</text>
        </g>
      ))}
      <text x="195" y="216" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">the chlorine is regenerated each cycle — one atom destroys ~100,000 ozone molecules</text>
      {/* facts */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHY ANTARCTICA</text>
      {[
        "polar stratospheric clouds form",
        "  in the extreme cold of the",
        "  Antarctic winter",
        "they convert safe reservoir",
        "  chlorine into active form —",
        "  a loaded spring",
        "spring sunlight triggers mass",
        "  destruction — the hole opens",
        "  in October, closes in summer",
        "measured in Dobson Units: a",
        "  fall below ~220 DU defines",
        "  the 'hole'",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: Cl + O₃ → ClO + O₂ is the killing step — write it, then say 'catalytic: chlorine regenerates'.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Catalysis is the horror: the poison isn't consumed — a single leak destroys a hundred thousand shields.</text>
    </svg>
  );
}
