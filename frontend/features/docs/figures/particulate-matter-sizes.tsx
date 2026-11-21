/** Particulate matter sizes — PM10, PM2.5, and the lungs. Well-detailed. Theme-aware. */
export function ParticulateMatterSizes({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Particulate matter sizes PM10 PM2.5 comparison human hair dust pollen soot lungs alveoli deep penetration AQI Kathmandu haze respiratory disease asthma bronchitis">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Particulate matter — size decides where it lands</text>
      {/* size comparison */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">SCALE CHECK (micrometres)</text>
      <line x1="70" y1="110" x2="320" y2="110" className="stroke-current" strokeWidth="10" style={{ color: "rgb(120 113 108 / 0.5)" }} />
      <text x="195" y="128" fontSize="6" textAnchor="middle" className="fill-current text-muted-foreground">human hair: ~70 µm wide</text>
      <line x1="70" y1="155" x2="110" y2="155" className="stroke-current" strokeWidth="5" style={{ color: "rgb(217 119 6 / 0.8)" }} />
      <text x="120" y="159" fontSize="6" className="fill-current text-amber-600">PM10 (dust, pollen) ≤10 µm — caught in nose and airways</text>
      <line x1="70" y1="185" x2="80" y2="185" className="stroke-current" strokeWidth="3" style={{ color: "rgb(220 38 38 / 0.9)" }} />
      <text x="90" y="189" fontSize="6" className="fill-current text-rose-600">PM2.5 (soot, smoke) ≤2.5 µm — slips into alveoli and blood</text>
      <text x="195" y="216" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">the smaller the particle, the deeper it travels — and the harder to exhale</text>
      {/* facts */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">HEALTH EFFECTS</text>
      {[
        "PM2.5 carries adsorbed toxins",
        "  deep into the lungs and across",
        "  into the bloodstream",
        "linked to asthma, bronchitis,",
        "  heart disease, stroke, and",
        "  reduced life expectancy",
        "Kathmandu's winter AQI regularly",
        "  crosses 'unhealthy' — vehicle",
        "  exhaust, brick kilns, road dust",
        "masks help, but source control",
        "  (cleaner fuel, paving, kilns)",
        "  is the real medicine",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 18} fontSize="6.6" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: PM10 vs PM2.5 — the number is the maximum diameter in micrometres; smaller means deeper and deadlier.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">A hair is ~70 µm — PM2.5 is nearly 30× finer, which is why filters struggle.</text>
    </svg>
  );
}
