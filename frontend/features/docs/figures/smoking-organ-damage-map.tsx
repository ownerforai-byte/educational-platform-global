/** Smoking organ damage map — one habit, many organs. Well-detailed. Theme-aware. */
export function SmokingOrganDamageMap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Smoking organ damage map lungs cancer heart disease stroke COPD emphysema stomach ulcer mouth throat foetus nicotine tar carbon monoxide passive smoking effects list body map">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Smoking — one habit, a whole-body casualty list</text>
      {/* body map */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">DAMAGE BY ORGAN</text>
      {[
        ["Mouth/throat", "cancer, gum disease"],
        ["Lungs", "cancer, COPD, emphysema"],
        ["Heart", "heart attack, raised BP"],
        ["Brain", "stroke risk"],
        ["Stomach", "ulcers, worse healing"],
        ["Foetus", "low birth weight, miscarriage"],
      ].map(([org, dmg], i) => (
        <g key={org}>
          <text x="46" y={92 + i * 22} fontSize="6.6" className="fill-current text-rose-600" fontWeight="700">{org}</text>
          <text x="150" y={92 + i * 22} fontSize="6.4" className="fill-current text-muted-foreground">{dmg}</text>
        </g>
      ))}
      {/* chemicals */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE SMOKESCREEN CHEMISTRY</text>
      {[
        "nicotine: the addictive hook;",
        "  raises heart rate and BP",
        "tar: carries the carcinogens;",
        "  coats the lungs",
        "carbon monoxide: hijacks",
        "  haemoglobin — less oxygen",
        "  reaches every tissue",
        "passive smokers inhale the",
        "  same poisons without consent",
        "quitting pays immediately:",
        "  CO levels normalise in days,",
        "  cancer risk falls over years",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-rose-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: name three chemicals (nicotine, tar, CO) with one effect each — the full-credit smoking answer.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">The damage is systemic because the poisons travel in the blood — not just a lung problem.</text>
    </svg>
  );
}
