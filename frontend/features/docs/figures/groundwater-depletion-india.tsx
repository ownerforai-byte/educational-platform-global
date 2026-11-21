/** Groundwater depletion India — the invisible overdraft. Well-detailed. Theme-aware. */
export function GroundwaterDepletionIndia({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Groundwater depletion India invisible overdraft tube well boom green revolution pumping free electricity water table falling Punjab Haryana blocks overexploited aquifer recharge rate extraction rate land subsidence salinity intrusion world largest groundwater user food security risk drip irrigation solar pumps paradox recharge rainwater harvesting structures check dams Gujarat example reform electricity metering">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Groundwater depletion — the invisible overdraft</text>
      {/* the boom */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE TUBE-WELL BOOM</text>
      {[
        "India is the world's largest",
        "  groundwater user — millions of",
        "  tube wells, mostly for",
        "  irrigation",
        "the Green Revolution made",
        "  pumping profitable; subsidised",
        "  (even free) electricity removed",
        "  the brake",
        "extraction now exceeds recharge",
        "  across much of the northwest —",
        "  water tables fall metres per",
        "  decade in the worst blocks",
        "the invisible part: you can't",
        "  see an emptying aquifer —",
        "  wells just dig deeper",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* consequences + fixes */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">CONSEQUENCES AND FIXES</text>
      {[
        "consequences: deeper wells,",
        "  pump arms, land subsidence,",
        "  salinity intrusion in coasts,",
        "  arsenic mobilisation",
        "food security risk: groundwater",
        "  grows much of India's and",
        "  Nepal Terai's grain",
        "fixes: drip irrigation,",
        "  metered power, recharge",
        "  structures (check dams, ponds),",
        "  crop choice away from paddy",
        "  in dry zones",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: extraction exceeds recharge = overexploitation; name two consequences and two fixes — the complete groundwater answer.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Groundwater is a bank account spent faster than it's deposited — the overdraft shows up as dry wells, not empty rivers.</text>
    </svg>
  );
}
