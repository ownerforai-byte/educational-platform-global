/** Stress response biology — the alarm system and its cost. Well-detailed. Theme-aware. */
export function StressResponseBiology({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Stress response biology adrenaline cortisol hypothalamus pituitary adrenal axis fight or flight alarm reaction resistance exhaustion GAS stages Selye general adaptation syndrome exam anxiety health effects chronic stress">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Stress — the alarm system and its cost</text>
      {/* axis */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE STRESS AXIS (HPA)</text>
      {[
        ["1. Perceive", "the brain labels the threat", 110],
        ["2. Signal", "hypothalamus → pituitary → adrenal", 155],
        ["3. Mobilise", "adrenaline fast; cortisol sustains", 200],
      ].map(([k, v, y], i) => (
        <g key={k}>
          <text x="60" y={(y as number) - 4} fontSize="6.8" className="fill-current text-violet-600" fontWeight="800">{k}</text>
          <text x="60" y={(y as number) + 10} fontSize="6" className="fill-current text-muted-foreground">{v}</text>
        </g>
      ))}
      <text x="195" y="216" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">fast lane (adrenaline: seconds) + slow lane (cortisol: minutes to hours)</text>
      {/* GAS */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">SELYE'S THREE STAGES (GAS)</text>
      {[
        ["Alarm", "the burst: heart races, glucose released"],
        ["Resistance", "cortisol keeps the body on a war footing"],
        ["Exhaustion", "reserves burn out — ulcers, immunity crashes"],
      ].map(([k, v], i) => (
        <g key={k}>
          <text x="406" y={96 + i * 34} fontSize="6.8" className="fill-current text-emerald-600" fontWeight="800">{i + 1}. {k}</text>
          <text x="406" y={110 + i * 34} fontSize="6" className="fill-current text-muted-foreground">{v}</text>
        </g>
      ))}
      <text x="540" y="212" fontSize="6.2" textAnchor="middle" className="fill-current text-muted-foreground">short stress sharpens; chronic stress</text>
      <text x="540" y="226" fontSize="6.2" textAnchor="middle" className="fill-current text-muted-foreground">erodes sleep, immunity and memory</text>
      <text x="540" y="244" fontSize="6.2" textAnchor="middle" className="fill-current text-muted-foreground">exam stress is useful in the alarm</text>
      <text x="540" y="258" fontSize="6.2" textAnchor="middle" className="fill-current text-muted-foreground">phase — the trick is not living there</text>
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-violet-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: GAS = alarm → resistance → exhaustion; hormones = adrenaline (fast) + cortisol (sustained).</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">The stress response evolved for short emergencies — modern life keeps it switched on.</text>
    </svg>
  );
}
