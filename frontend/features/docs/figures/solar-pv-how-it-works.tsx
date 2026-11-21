/** Solar PV how it works — the silicon sandwich. Well-detailed. Theme-aware. */
export function SolarPvHowItWorks({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Solar PV how it works photovoltaic effect silicon sandwich n-type p-type junction photons electrons holes current DC inverter AC efficiency percentages price decline curve learning rate grid parity rooftop net metering Nepal sunshine hours dust cleaning tilt angle orientation">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Solar PV — the silicon sandwich, step by step</text>
      {/* physics */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE PHYSICS</text>
      {[
        "a photon strikes the silicon and",
        "  knocks an electron free",
        "the n-type/p-type junction builds",
        "  in an electric field that",
        "  sweeps electrons one way —",
        "  direct current flows",
        "an inverter converts DC to the",
        "  AC your home uses",
        "no fuel, no motion, no emissions",
        "  at the panel — just quantum",
        "  mechanics in a sandwich",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* practical */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE PRACTICAL NUMBERS</text>
      {[
        "commercial panel efficiency:",
        "  ~18–23%; lab records higher",
        "price crash: PV fell ~90% in a",
        "  decade — the fastest energy",
        "  cost decline in history",
        "orientation: face the equator,",
        "  tilt ≈ latitude; Nepal's",
        "  Himalayan sun is strong but",
        "  dust cuts output — cleaning",
        "  matters",
        "storage: batteries now decide",
        "  night-time economics — the",
        "  frontier is shifting from",
        "  panels to cells",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-amber-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: photon → electron → DC → inverter → AC — the five-step chain, plus ~20% efficiency as the number to quote.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">PV's price fall re-ran the energy map — cheapest electricity in history, per the IEA, now comes from sunshine.</text>
    </svg>
  );
}
