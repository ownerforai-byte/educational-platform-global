/** Hypertension silent killer — the pressure arithmetic. Well-detailed. Theme-aware. */
export function HypertensionSilentKiller({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Hypertension silent killer pressure arithmetic systolic diastolic 120 80 reading definition 140 90 threshold categories prehypertension stage one two symptoms none until damage stroke heart attack kidney failure retinopathy left ventricular hypertrophy salt reduction DASH diet exercise weight alcohol smoking cessation medication adherence lifestyle first measurement technique white coat cuff size Nepal prevalence adults awareness treatment control chain">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Hypertension — the silent killer's arithmetic</text>
      {/* numbers */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE NUMBERS</text>
      {[
        ["<120 / <80", "normal", "rgb(22 163 74)"],
        ["120–139 / 80–89", "elevated / stage 1 territory", "rgb(217 119 6)"],
        ["≥140 / ≥90", "hypertension — treat", "rgb(220 38 38)"],
        ["≥180 / ≥120", "crisis — urgent care", "rgb(127 29 29)"],
      ].map(([range, label, rgb], i) => (
        <g key={range as string}>
          <rect x="60" y={90 + i * 30} width="100" height="22" rx="6" className="fill-current" style={{ color: `${rgb as string} / 0.3` }} stroke="currentColor" strokeWidth="1" />
          <text x="110" y={90 + i * 30 + 15} fontSize="6.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{range as string}</text>
          <text x="170" y={90 + i * 30 + 15} fontSize="6.6" className="fill-current" style={{ color: rgb as string }} fontWeight="700">{label as string}</text>
        </g>
      ))}
      <text x="195" y="216" fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">systolic = pressure during the beat; diastolic = between beats — both matter</text>
      {/* why silent */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHY 'SILENT'</text>
      {[
        "no symptoms until the damage",
        "  lands: stroke, heart attack,",
        "  kidney failure, burst eye",
        "  vessels — the end-organ list",
        "the causes: salt, obesity,",
        "  alcohol, inactivity, genetics,",
        "  stress — most modifiable",
        "the fix: less salt, weight off,",
        "  moving body, and daily pills",
        "  taken faithfully — adherence",
        "  beats everything",
        "Nepal: many adults unaware they",
        "  carry it — screening at every",
        "  clinic visit is cheap policy",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-rose-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: ≥140/90 defines hypertension; no symptoms until end-organ damage — the definition plus the 'silent' explanation.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">The cuff is the cheapest diagnostic in medicine — two minutes that prevent a stroke a decade later.</text>
    </svg>
  );
}
