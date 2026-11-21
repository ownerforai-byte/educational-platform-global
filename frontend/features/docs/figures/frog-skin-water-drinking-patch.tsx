/** Frog skin water drinking patch — belly drinking. Well-detailed. Theme-aware. */
export function FrogSkinWaterDrinkingPatch({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Frog skin water drinking patch belly drinking pelvic patch water absorption osmosis capillaries no mouth drinking rehydration dew soil moisture">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Drinking through the belly — the pelvic patch</text>
      {/* belly patch */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE DRINKING PATCH</text>
      <ellipse cx="195" cy="140" rx="70" ry="45" className="fill-current text-emerald-500/20" stroke="currentColor" strokeWidth="2.2" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      <ellipse cx="195" cy="150" rx="46" ry="24" className="fill-current text-sky-500/30" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="154" fontSize="6.2" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">pelvic patch</text>
      <text x="195" y="204" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">a thin, densely capillarised strip of belly skin —</text>
      <text x="195" y="220" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">pressed against wet soil, dew or pond water</text>
      {/* facts */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">HOW IT WORKS</text>
      {[
        "frogs never drink through the",
        "  mouth — the tongue is for prey",
        "water enters by osmosis across",
        "  the patch and into capillaries",
        "hormones can adjust patch",
        "  permeability to speed uptake",
        "the same thin skin that absorbs",
        "  water also loses it — the",
        "  frog's central dilemma",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: frogs 'drink' through a specialised belly patch by osmosis — never through the mouth.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Water balance, breathing and skin are one integrated system in the frog.</text>
    </svg>
  );
}
