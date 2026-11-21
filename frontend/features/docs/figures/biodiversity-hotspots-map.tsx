/** Biodiversity hotspots map — where life concentrates. Well-detailed. Theme-aware. */
export function BiodiversityHotspotsMap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Biodiversity hotspots map 36 regions 2.5 percent land 1500 endemic vascular plants 70 percent habitat lost Himalaya Indo Burma Madagascar Caribbean islands tropics concentration endemic species Myers criteria conservation priority areas Nepal eastern Himalaya">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Biodiversity hotspots — 36 places holding most of life</text>
      {/* concept */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE TWO CRITERIA (Myers, 1988/2000)</text>
      {[
        "1. at least 1,500 endemic",
        "  vascular plant species —",
        "  life found nowhere else",
        "2. at least 70% of original",
        "  habitat already lost —",
        "  the urgency clause",
        "36 hotspots qualify worldwide,",
        "  on ~2.5% of Earth's land —",
        "  yet hold over half of all",
        "  plant species as endemics",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* regions */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE ONES THAT MATTER TO YOU</text>
      {[
        "Himalaya: Nepal's mid-hills",
        "  fall inside the hotspot —",
        "  altitudinal variety packs in",
        "  endemic species",
        "Indo-Burma: the Terai's",
        "  connections east",
        "others: Madagascar, the",
        "  Caribbean, the Andes,",
        "  Sundaland, Western Ghats",
        "hotspots are where a rupee of",
        "  conservation buys the most —",
        "  triage, not sentiment",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: two criteria — 1,500 endemic plants + 70% habitat lost; 36 hotspots on 2.5% of land area.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">The Himalaya hotspot puts Nepal's hills on the global conservation priority map.</text>
    </svg>
  );
}
