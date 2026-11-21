/** Human wildlife conflict fence — the coexistence problem. Well-detailed. Theme-aware. */
export function HumanWildlifeConflictFence({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Human wildlife conflict fence crop raiding elephants tiger livestock compensation insurance electric fence chili deterrent corridor wildlife crossing overpass underpass mitigation conflict reduction coexistence buffer zone">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Human–wildlife conflict — the coexistence toolkit</text>
      {/* conflict */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHERE IT BITES</text>
      {[
        "elephants raid crops at night —",
        "  a season's income in one visit",
        "tigers and leopards take livestock,",
        "  sometimes people",
        "rhinos trample fields near parks",
        "retaliation follows: poisoned",
        "  carcasses kill scavengers and",
        "  vultures too",
        "success breeds conflict: more",
        "  tigers and rhinos means more",
        "  encounters at the boundary",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* toolkit */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE MITIGATION KIT</text>
      {[
        "electric and chili fences around",
        "  vulnerable villages",
        "compensation and insurance",
        "  schemes that pay quickly",
        "corridors and crossings so",
        "  animals move around people,",
        "  not through them",
        "early-warning: watchtowers,",
        "  text alerts, light collars",
        "land-use: keep palatable crops",
        "  away from the park edge",
        "the goal is coexistence, not",
        "  a wall — fences redirect,",
        "  they don't solve",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-rose-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: conflict rises when conservation succeeds — managing it is now a core conservation skill.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Fast compensation buys tolerance; slow compensation buys retaliation.</text>
    </svg>
  );
}
