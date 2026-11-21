/** Hotspot criteria map — where conservation money goes. Well-detailed. Theme-aware. */
export function HotspotCriteriaMap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Hotspot criteria map biodiversity hotspot two criteria endemic species count habitat loss 70 percent threshold 36 hotspots Himalaya Indo-Burma Nepal priority conservation investment Myers concept map">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Hotspots — two criteria decide where money goes</text>
      {/* criteria */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE TWO GATES (MYERS, 1988)</text>
      <rect x="60" y="88" width="270" height="52" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.6" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="195" y="108" fontSize="6.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">1. Endemism</text>
      <text x="195" y="126" fontSize="6" textAnchor="middle" className="fill-current text-muted-foreground">≥1,500 endemic plant species found nowhere else</text>
      <rect x="60" y="152" width="270" height="52" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.6" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="195" y="172" fontSize="6.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">2. Threat</text>
      <text x="195" y="190" fontSize="6" textAnchor="middle" className="fill-current text-muted-foreground">≥70% of original habitat already lost</text>
      <text x="195" y="216" fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">both gates must be passed — richness alone is not enough</text>
      {/* Nepal context */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">NEPAL'S HOTSPOT SEAT</text>
      {[
        "Nepal sits inside two of the",
        "  world's ~36 hotspots:",
        "  the Himalaya and Indo-Burma",
        "elevation range packs arctic-to-",
        "  tropical life into 200 km",
        "high endemism: many species",
        "  exist on single mountain",
        "  slopes",
        "pressure: roads, hydropower,",
        "  logging, climate shift upward",
        "hotspot status = triage: money",
        "  flows where irreplaceable",
        "  meets threatened",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-amber-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: hotspot = ≥1,500 endemic plants + ≥70% habitat lost. Quote both numbers.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">A hotspot is a priority algorithm: irreplaceability × urgency.</text>
    </svg>
  );
}
