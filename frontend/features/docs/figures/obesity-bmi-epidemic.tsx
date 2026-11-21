/** Obesity BMI epidemic — the calorie surplus arithmetic. Well-detailed. Theme-aware. */
export function ObesityBmiEpidemic({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Obesity BMI epidemic body mass index calculation kg height squared 25 30 overweight obese categories double burden malnutrition coexistence underweight obesity urbanisation processed food sedentary screens diabetes hypertension metabolic syndrome Nepal transition nutrition NCDs risks waist circumference">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Obesity — the surplus arithmetic</text>
      {/* BMI */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">BMI = weight (kg) ÷ height² (m²)</text>
      {[
        ["<18.5", "underweight", "rgb(2 132 199)"],
        ["18.5–24.9", "normal", "rgb(22 163 74)"],
        ["25–29.9", "overweight", "rgb(217 119 6)"],
        ["≥30", "obese", "rgb(220 38 38)"],
      ].map(([range, label, rgb], i) => (
        <g key={range as string}>
          <rect x="60" y={90 + i * 30} width="90" height="22" rx="6" className="fill-current" style={{ color: `${rgb as string} / 0.3` }} stroke="currentColor" strokeWidth="1" />
          <text x="105" y={90 + i * 30 + 15} fontSize="6.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{range as string}</text>
          <text x="160" y={90 + i * 30 + 15} fontSize="6.6" className="fill-current" style={{ color: rgb as string }} fontWeight="700">{label as string}</text>
        </g>
      ))}
      <text x="195" y="216" fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">BMI is a screening tool, not a diagnosis — muscle mass fools it</text>
      {/* double burden */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE DOUBLE BURDEN</text>
      {[
        "underweight and obesity now",
        "  coexist in the same countries,",
        "  even the same households",
        "drivers: cheap processed",
        "  calories, sugary drinks,",
        "  screen-bound leisure,",
        "  car/bike for short trips",
        "consequences: type 2 diabetes,",
        "  hypertension, joint wear,",
        "  some cancers",
        "Nepal's transition: urban",
        "  obesity rising while rural",
        "  underweight persists — the",
        "  nutrition transition in one",
        "  country",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-amber-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: BMI formula + the four cut-offs (18.5 / 25 / 30) + 'double burden' — the three-part obesity answer.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Obesity is an environment problem wearing a personal-responsibility costume — cheap calories are engineered, not accidental.</text>
    </svg>
  );
}
