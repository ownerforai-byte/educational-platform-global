/** Green revolution tradeoffs — the yield miracle's bill. Well-detailed. Theme-aware. */
export function GreenRevolutionTradeoffs({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Green revolution tradeoffs high yielding varieties HYV fertiliser irrigation wheat rice Borlaug yield gains water depletion soil salinisation genetic uniformity vulnerability small farmers inequality critique second revolution gene revolution">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The Green Revolution — gains and their bill</text>
      {/* gains */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE GAINS</text>
      {[
        "high-yielding dwarf wheat and",
        "  rice (HYV) doubled and tripled",
        "  grain output",
        "Norman Borlaug's wheat programme",
        "  is credited with saving a",
        "  billion from famine",
        "India and Pakistan moved from",
        "  food deficit to buffer stocks",
        "the package: HYV seed + fertiliser",
        "  + irrigation + pesticides",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* costs */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE BILL</text>
      {[
        "aquifers drained by tube-well",
        "  irrigation (Punjab's water table)",
        "fertiliser runoff → eutrophication",
        "  and nitrate-laced groundwater",
        "genetic uniformity: one disease",
        "  could sweep a whole season's",
        "  crop — the Irish potato echo",
        "small farmers priced out: the",
        "  package needs capital, so",
        "  inequality widened",
        "the sequel: the 'gene revolution'",
        "  — and agroecology's middle path",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: gains (yield, famine averted) AND costs (water, uniformity, inequality) — a balanced answer needs both columns.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">The Green Revolution bought time, not permanence — its inputs are finite.</text>
    </svg>
  );
}
