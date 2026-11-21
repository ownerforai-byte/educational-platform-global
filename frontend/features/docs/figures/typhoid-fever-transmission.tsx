/** Typhoid typhoid fever transmission — the waterborne classic. Well-detailed. Theme-aware. */
export function TyphoidFeverTransmission({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Typhoid fever transmission Salmonella typhi faecal oral route contaminated water food carriers chronic gallbladder Widal test complications intestinal perforation prevention safe water vaccination hygiene incubation 1 2 weeks step ladder fever Nepal outbreaks carrier cook case Mary">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Typhoid — the waterborne classic</text>
      {/* transmission */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE FAECAL-ORAL ROUTE</text>
      {[
        "Salmonella Typhi spreads via",
        "  water or food contaminated",
        "  with faeces",
        "incubation: 1–2 weeks, then",
        "  step-ladder fever that rises",
        "  in stages, abdominal pain,",
        "  rose-coloured spots",
        "complication: intestinal",
        "  perforation in weeks 2–3 —",
        "  the surgical emergency",
        "diagnosis: blood culture early;",
        "  Widal test is unreliable alone",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* carriers */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE CARRIER PROBLEM</text>
      {[
        "2–5% of treated patients keep",
        "  the bacteria in their",
        "  gallbladder for life —",
        "  chronic carriers shed it in",
        "  stool while feeling fine",
        "history: 'Typhoid Mary', a cook",
        "  who infected dozens while",
        "  healthy herself",
        "prevention: safe water,",
        "  sanitation, handwashing,",
        "  and the typhoid vaccine —",
        "  Nepal added it to routine",
        "  immunisation",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: faecal-oral route, step-ladder fever, chronic gallbladder carrier — the three facts that define typhoid answers.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Typhoid is a sanitation disease: where pipes are sound, it is rare; where they leak, it returns.</text>
    </svg>
  );
}
