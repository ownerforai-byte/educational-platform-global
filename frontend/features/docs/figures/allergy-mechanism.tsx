/** Allergy mechanism — the overreacting immune system. Well-detailed. Theme-aware. */
export function AllergyMechanism({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Allergy mechanism IgE mast cells histamine degranulation allergen sensitisation first exposure second exposure anaphylaxis epinephrine auto injector hay fever asthma dust pollen food allergy difference infection immunity misdirected response">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Allergy — the immune system misfiring</text>
      {/* two-step mechanism */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">TWO STEPS TO THE SNEEZE</text>
      {[
        ["1. Sensitise", "first exposure: B cells make IgE antibodies that park on mast cells", 120],
        ["2. React", "second exposure: allergen bridges IgE → histamine floods out", 165],
      ].map(([k, v, y], i) => (
        <g key={k}>
          <text x="60" y={(y as number) - 4} fontSize="6.8" className="fill-current text-violet-600" fontWeight="800">{k}</text>
          <text x="60" y={(y as number) + 10} fontSize="5.8" className="fill-current text-muted-foreground">{(v as string).slice(0, 44)}</text>
          <text x="60" y={(y as number) + 22} fontSize="5.8" className="fill-current text-muted-foreground">{(v as string).slice(44, 88)}</text>
        </g>
      ))}
      <text x="195" y="216" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">histamine's effects: vasodilation, itching, mucus, bronchoconstriction — the allergy symptom list</text>
      {/* facts */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">GRADES OF REACTION</text>
      {[
        "hay fever: sneezing, itchy eyes",
        "  — pollen, dust mites",
        "asthma: airways tighten —",
        "  allergens, exercise, cold air",
        "anaphylaxis: whole-body collapse,",
        "  throat swelling, blood pressure",
        "  crash — adrenaline (epinephrine)",
        "  is the only correct first aid",
        "antihistamines block the",
        "  messenger; avoidance beats",
        "  every drug",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-violet-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: allergy = IgE + mast cells + histamine; anaphylaxis = adrenaline, not antihistamine.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">The immune system defending against pollen is a guard dog barking at butterflies.</text>
    </svg>
  );
}
