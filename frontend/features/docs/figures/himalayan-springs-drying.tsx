/** Himalayan springs drying — the water tower leaking. Well-detailed. Theme-aware. */
export function HimalayanSpringsDrying({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Himalayan springs drying water tower mid hills sources dhara drying causes rainfall change land use roads blasting recharge zones spring-sheds hydrogeology fissured rock aquifer women water burden walks springs revival work recharge ponds trenching contour trenches rainwater harvesting Miyawaki mid hills Nepal water security climate impacts">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Drying springs — the Himalayan water tower leaking</text>
      {/* why */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHY SPRINGS DIE</text>
      {[
        "rainfall patterns shift — more",
        "  intense bursts, less gentle",
        "  recharge rain",
        "roads and blasting fracture the",
        "  rock plumbing that fed the",
        "  spring",
        "land-use change: terraces",
        "  abandoned, forests replaced by",
        "  hard surfaces — less water",
        "  soaks in",
        "the science: Himalayan springs",
        "  rise from fissured-rock",
        "  aquifers, not big rivers —",
        "  recharge zones must be mapped",
        "  and protected",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* revival */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">SPRING REVIVAL WORKS</text>
      {[
        "map the spring-shed: where does",
        "  the water actually come from",
        "recharge structures: contour",
        "  trenches, percolation ponds,",
        "  check dams on the slope above",
        "protect the recharge zone from",
        "  construction and blasting",
        "rainwater harvesting at home",
        "  buys time while the hill",
        "  recovers",
        "the social fact: women walk",
        "  farther as springs fail —",
        "  water is a gender issue",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: springs dry from rainfall shifts + road blasting + land-use change; revival = map spring-shed, build recharge, protect zones.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">The Himalaya is called the water tower of Asia — but the tower's taps are the springs, and they are running dry.</text>
    </svg>
  );
}
