/** Solar home systems Nepal — off-grid electricity. Well-detailed. Theme-aware. */
export function SolarHomeSystemsNepal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Solar home systems Nepal off grid electricity PV panel battery charge controller inverter watts lighting phones TV solar lanterns remote hills grid extension cost comparison national programme subsidies solar resource Himalaya sunshine hours alternatives micro hydro mini grid kerosene replacement">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Solar home systems — light where the grid won't go</text>
      {/* system */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE SYSTEM, PART BY PART</text>
      {[
        "PV panel (typically 20–100 W):",
        "  converts sunlight directly to",
        "  electricity",
        "charge controller: protects the",
        "  battery from overcharge and",
        "  deep discharge",
        "battery: stores the day's",
        "  energy for evening use",
        "loads: LED lights, phone",
        "  charging, radio, sometimes TV",
        "no moving parts, no fuel, no",
        "  smoke — just silicon and sun",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* why it fits */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHY IT FITS NEPAL</text>
      {[
        "hundreds of villages sit beyond",
        "  economic grid-extension",
        "  distance",
        "Himalayan sunshine is strong —",
        "  clear skies at altitude",
        "kerosene lamps cost money and",
        "  damage lungs — solar replaces",
        "  both problems",
        "monsoon months need battery",
        "  sizing headroom — design for",
        "  the cloudy weeks",
        "micro-hydro complements solar",
        "  where streams allow",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-amber-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: four parts (panel, controller, battery, loads) — name them and one advantage over kerosene for full marks.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Solar home systems turned night-time study from a kerosene-lamp health hazard into an LED-lit routine.</text>
    </svg>
  );
}
