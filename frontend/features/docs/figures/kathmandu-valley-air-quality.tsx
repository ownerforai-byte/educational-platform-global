/** Kathmandu valley air quality — a case study. Well-detailed. Theme-aware. */
export function KathmanduValleyAirQuality({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Kathmandu valley air quality case study bowl shaped valley temperature inversion winter haze brick kilns vehicle exhaust unpaved roads dust PM2.5 AQI unhealthy source control actions">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Kathmandu's air — a textbook valley case study</text>
      {/* valley bowl diagram */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE BOWL EFFECT</text>
      <path d="M60 90 Q195 210 330 90" className="fill-none stroke-current" strokeWidth="5" style={{ color: "rgb(120 113 108 / 0.6)" }} />
      <rect x="70" y="120" width="250" height="30" rx="10" className="fill-current text-amber-500/30" stroke="currentColor" strokeWidth="1.2" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="195" y="140" fontSize="6" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">trapped haze layer (inversion)</text>
      <text x="195" y="180" fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">cold air slides into the bowl at night and sits under</text>
      <text x="195" y="196" fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">warm air — the valley's own lid traps every emission</text>
      <text x="195" y="216" fontSize="6.6" textAnchor="middle" className="fill-current text-sky-600">worst in winter: calm winds + inversion + burning season</text>
      {/* sources & fixes */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">SOURCES → WHAT WORKED</text>
      {[
        "vehicles (old engines, bad fuel)",
        "  → emission tests, Euro norms",
        "brick kilns → cleaner kilns",
        "  moved and upgraded",
        "unpaved roads → paving and",
        "  watering cut dust",
        "open waste burning → collection",
        "  and composting schemes",
        "still rising: vehicle numbers",
        "  outpace every control so far",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: valley + inversion + winter = trapped smog — geography explains the seasonality of Kathmandu's air.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Local case studies turn abstract 'pollution' into named sources and named fixes.</text>
    </svg>
  );
}
