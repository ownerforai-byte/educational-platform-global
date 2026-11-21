/** Alien invasion pathways — how exotics take over. Well-detailed. Theme-aware. */
export function AlienInvasionPathways({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Alien invasion pathways invasive species introduction routes ballast water ornamental trade escape aquaculture mikania banmara water hyacinth competitive exclusion no natural enemy ecosystem homogenisation Nepal examples">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Invasive aliens — the invasion playbook</text>
      {/* pathways */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">HOW THEY ARRIVE</text>
      {[
        "deliberate: ornamental plants,",
        "  aquaculture, biocontrol mistakes",
        "accidental: ship ballast water,",
        "  seed contaminants, tyre treads",
        "escape: pets and garden plants",
        "  dumped into the wild",
        "the pattern: most introductions",
        "  fail — the few that succeed",
        "  explode",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* why they win */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHY THEY WIN</text>
      {[
        "enemy release: their old pests",
        "  didn't come along",
        "novel weapons: chemicals local",
        "  species never evolved against",
        "disturbance lovers: roadsides",
        "  and degraded land are their",
        "  favourite front door",
        "Nepal's troublemakers: banmara",
        "  (Lantana), mikania smothering",
        "  grasslands, water hyacinth in",
        "  lakes",
        "result: ecosystem homogenisation —",
        "  the same few winners everywhere",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="240" width="330" height="52" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="258" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Exam hook: invasion = arrival × establishment × spread — and the best control is prevention at the border.</text>
      <text x="195" y="276" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Invasives are the second-greatest extinction driver after habitat loss.</text>
      <text x="195" y="288" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Not every exotic is invasive — invasion requires spread plus harm.</text>
    </svg>
  );
}
