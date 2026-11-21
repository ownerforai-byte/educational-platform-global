/** Green accounting GDP critique — what the number misses. Well-detailed. Theme-aware. */
export function GreenAccountingGdpCritique({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Green accounting GDP critique natural capital depletion not counted deforestation adds GDP twice timber sold plus loss ecosystem services genuine progress indicator GPI alternatives wealth of nations inclusive wealth natural capital accounting SEEA satellite accounts Nepal forest depreciation">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Green accounting — what GDP fails to count</text>
      {/* critique */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">GDP'S BLIND SPOTS</text>
      {[
        "a forest cut for timber raises GDP",
        "  — the loss of the forest counts",
        "  as nothing",
        "pollution cleanup raises GDP",
        "  (it's paid work) — the pollution",
        "  itself subtracts nothing",
        "ecosystem services (pollination,",
        "  water purification) have no",
        "  market price, so no GDP line",
        "the paradox: environmental",
        "  destruction can look like",
        "  economic growth",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* alternatives */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE FIXES</text>
      {[
        "green GDP: subtract resource",
        "  depletion and degradation",
        "GPI (Genuine Progress",
        "  Indicator): adds unpaid work,",
        "  subtracts pollution and crime",
        "natural capital accounting",
        "  (UN SEEA): satellite accounts",
        "  for forests, water, minerals",
        "Bhutan's Gross National",
        "  Happiness: the famous",
        "  alternative index",
        "exam hook: give one GDP blind",
        "  spot and one alternative —",
        "  a two-part answer",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-amber-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: GDP counts the timber sale but not the forest's death — the one-line critique examiners want.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">What a country measures becomes what it manages — hence the push to count natural capital.</text>
    </svg>
  );
}
