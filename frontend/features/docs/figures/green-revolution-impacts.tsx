/** Green revolution impacts — the yield miracle's invoice. Well-detailed. Theme-aware. */
export function GreenRevolutionImpacts({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Green revolution impacts HYV high yielding varieties Borlaug wheat India Punjab food self sufficiency famine averted versus costs water table irrigation fertiliser pesticide dependence soil health biodiversity loss crop uniformity genetic erosion small farmer inequality debt suicides salinisation waterlogging second green revolution sustainability lessons gene revolution mixed verdict balanced answer">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The Green Revolution — the yield miracle's invoice</text>
      {/* gains */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE GAINS</text>
      {[
        "dwarf, high-yielding wheat and",
        "  rice (Borlaug's wheat) doubled",
        "  and tripled output",
        "India went from famine-adjacent",
        "  imports to food self-sufficiency",
        "  by the 1970s–80s",
        "cheap calories: grain prices fell,",
        "  feeding urban growth",
        "the Nobel committee called it",
        "  'a green revolution' — the",
        "  name stuck",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* costs */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE INVOICE</text>
      {[
        "water: tube-well irrigation drew",
        "  down aquifers across Punjab",
        "chemicals: fertiliser and",
        "  pesticide dependence, with",
        "  runoff costs",
        "uniformity: genetic erosion as",
        "  landraces gave way to a few",
        "  HYV varieties",
        "inequality: irrigated farmers",
        "  gained most; smallholders",
        "  borrowed to compete",
        "the lesson: yield was one goal —",
        "  sustainability is the next",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: HYV + irrigation + fertiliser = the package; gains (self-sufficiency) vs costs (water, chemicals, uniformity) — the balanced answer.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">The Green Revolution bought time, not permanence — the second revolution must be ecological.</text>
    </svg>
  );
}
