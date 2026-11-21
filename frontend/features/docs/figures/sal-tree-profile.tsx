/** Sal tree profile — the Terai's timber king. Well-detailed. Theme-aware. */
export function SalTreeProfile({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Sal tree Shorea robusta profile Terai timber deciduous straight trunk economic importance furniture railway sleepers dipterocarp">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Sal (Shorea robusta) — the Terai's timber king</text>

      {/* tree */}
      <rect x="30" y="44" width="330" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE TREE</text>
      <path d="M195 250 v-110" className="stroke-current text-amber-800" strokeWidth="7" style={{ color: "rgb(146 64 14 / 0.9)" }} />
      <path d="M195 160 q-40 -6 -60 -26 M195 160 q40 -6 60 -26 M195 150 q-20 -18 -30 -40 M195 150 q20 -18 30 -40" className="fill-none stroke-current text-amber-800" strokeWidth="3.4" style={{ color: "rgb(146 64 14 / 0.9)" }} />
      {[[-60, -26], [60, -26], [-30, -40], [30, -40]].map(([dx, dy], i) => (
        <circle key={i} cx={195 + dx} cy={134 + dy} r="17" className="fill-current text-emerald-600/40" />
      ))}
      <text x="195" y="266" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">straight, tall trunk — branch-free timber column</text>
      <text x="50" y="120" fontSize="7" className="fill-current text-muted-foreground">deciduous: sheds leaves in the dry season</text>
      <text x="50" y="134" fontSize="7" className="fill-current text-muted-foreground">dominant below ~1000 m in the Terai and Bhabar</text>

      {/* uses */}
      <rect x="390" y="44" width="300" height="220" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="540" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHY IT PAYS</text>
      {[
        "hard, durable timber — furniture,",
        "  beams, railway sleepers",
        "resin and sal seed oil",
        "leaves for plates (tapari, batra)",
        "dense canopy shades the forest floor",
        "illegal logging threatens it —",
        "  protection under community forestry",
      ].map((t, i) => (
        <text key={t} x="406" y={94 + i * 17} fontSize="7.2" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <text x="406" y="228" fontSize="7" className="fill-current text-amber-600" fontWeight="700">One species, one economy: sal built</text>
      <text x="406" y="242" fontSize="7" className="fill-current text-amber-600" fontWeight="700">the Terai's houses and its railways.</text>
      <text x="406" y="262" fontSize="7" className="fill-current text-muted-foreground">Exam hook: name the zone sal owns</text>
      <text x="406" y="276" fontSize="7" className="fill-current text-muted-foreground">and two uses of its timber.</text>
    </svg>
  );
}
