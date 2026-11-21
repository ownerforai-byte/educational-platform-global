/** Family economic importance — crops from the four families. Theme-aware. */
export function FamiliesEconomicImportance({ className }: { className?: string }) {
  const col = (x: number, c: string, t: string, items: string[], k: string) => (
    <g key={k}>
      <rect x={x} y="56" width="150" height="160" rx="12" style={{ color: c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
      <text x={x + 75} y="80" fontSize="8.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{t}</text>
      {items.map((s, i) => (
        <text key={i} x={x + 75} y={100 + i * 21} fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">{s}</text>
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Economic importance of four families brassicaceae oils and vegetables fabaceae pulses and nitrogen fixation solanaceae food and drugs liliaceae food and medicine">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Why these four families feed and heal us</text>
      {col(16, "rgb(245 158 11 / 0.9)", "BRASSICACEAE", ["mustard oil (cooking)", "cabbage, cauliflower", "radish, turnip", "fodder crops"], "a")}
      {col(178, "rgb(22 163 74 / 0.9)", "FABACEAE", ["pulses: protein-rich", "pea, gram, soybean", "nitrogen-fixing rotation", "groundnut oil"], "b")}
      {col(340, "rgb(124 58 237 / 0.9)", "SOLANACEAE", ["potato, tomato, chilli", "tobacco", "atropine (medicine)", "belladonna alkaloids"], "c")}
      {col(502, "rgb(14 165 233 / 0.9)", "LILIACEAE", ["onion, garlic, asparagus", "aloe — skin medicine", "colchicine (research)", "ornamental lilies & tulips"], "d")}
      <text x="16" y="232" fontSize="10" className="fill-current text-muted-foreground">Each family is a chemistry kit: mustard oils, legume proteins, nightshade alkaloids, lily sulphur compounds — flavour and pharmacy by lineage.</text>
    </svg>
  );
}
