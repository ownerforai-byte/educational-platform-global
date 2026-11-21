/** Nitrogen cycle human disruption — doubling the fix. Well-detailed. Theme-aware. */
export function NitrogenCycleHumanDisruption({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Nitrogen cycle human disruption Haber Bosch fixation doubling reactive nitrogen fertiliser runoff eutrophication nitrate groundwater blue baby syndrome N2O greenhouse nitrous oxide ammonia volatilisation acid deposition cascade cascade effects legumes crop rotation biological fixation bacteria rhizobium denitrification inefficiency 50 percent uptake">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Nitrogen — the cycle we doubled</text>
      {/* natural cycle */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE NATURAL CYCLE</text>
      {[
        "N₂ is 78% of air — but plants",
        "  can't use it until it's 'fixed'",
        "biological fixation: rhizobium",
        "  bacteria in legume nodules; free-",
        "  living cyanobacteria",
        "lightning fixes a little; nitrifying",
        "  bacteria convert ammonia →",
        "  nitrite → nitrate; denitrifiers",
        "  return N₂ to air",
        "legume rotation fed agriculture",
        "  for millennia before fertiliser",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* disruption */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE HUMAN DISRUPTION</text>
      {[
        "Haber-Bosch (1909) industrialised",
        "  fixation — humans now fix more",
        "  nitrogen than all natural",
        "  processes combined",
        "crops take up ~50% of applied N —",
        "  the rest leaks",
        "the cascade: nitrate in wells",
        "  (blue-baby syndrome), ammonia",
        "  volatilisation, N₂O (a potent",
        "  greenhouse gas), eutrophication,",
        "  acid deposition",
        "the fix: right dose, right time,",
        "  legume rotation, cover crops",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: Haber-Bosch doubled reactive nitrogen; ~50% of fertiliser N is taken up — quote both, then name two cascade effects.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">The same invention that fed billions now overfeeds rivers — a cycle rewritten in a century.</text>
    </svg>
  );
}
