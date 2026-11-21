/** Water resources stress — the coming scarcity. Well-detailed. Theme-aware. */
export function WaterResourcesStress({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Water resources stress freshwater fraction availability per capita scarcity line Nepal Himalayan rivers groundwater depletion virtual water agriculture largest use conservation rainwater harvesting drip irrigation conflict">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Water stress — abundant planet, scarce supply</text>
      {/* paradox */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE PARADOX IN NUMBERS</text>
      {[
        "~97% of Earth's water is ocean —",
        "  too salty to drink or irrigate",
        "of the fresh fraction, most is",
        "  locked in ice and deep aquifers",
        "usable surface freshwater: well",
        "  under 1% of all water",
        "agriculture takes ~70% of global",
        "  withdrawals — the biggest user",
        "a kilo of rice carries thousands",
        "  of litres of 'virtual water'",
        "Nepal is water-rich yet water-",
        "  poor: monsoon surplus, dry-",
        "  season shortage",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* solutions */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">STRETCHING THE SUPPLY</text>
      {[
        "rainwater harvesting: capture",
        "  the roof, recharge the aquifer",
        "drip irrigation: crop per drop,",
        "  not crop per flood",
        "protect watersheds — forests",
        "  are the cheapest dam",
        "treat and reuse greywater",
        "price and ration where scarcity",
        "  bites",
        "transboundary rivers demand",
        "  treaties, not tanks",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">
        Exam hook: {'<'}1% usable freshwater, ~70% to agriculture — two numbers that anchor any water answer.
      </text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Scarcity is usually a management failure before it is a hydrology failure.</text>
    </svg>
  );
}
