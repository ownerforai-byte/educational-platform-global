/** Koshi Tappu profile — the wetland reserve case. Well-detailed. Theme-aware. */
export function KoshiTappuProfile({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Koshi Tappu wildlife reserve profile wetland Ramsar site wild water buffalo arna 175 square kilometres Koshi river birds migratory waterfowl flood problems embankment grazing conflict eastern Terai case study">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Koshi Tappu — Nepal's wetland reserve case study</text>
      {/* profile */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE FACTS</text>
      {[
        "eastern Terai, on the Koshi",
        "  river's braided floodplain",
        "~175 km² of wetland, sandbars",
        "  and grassland",
        "Ramsar-listed wetland of",
        "  international importance",
        "last refuge of the wild water",
        "  buffalo (arna) — a tiny,",
        "  inbred population",
        "hundreds of bird species; a",
        "  major stopover on the",
        "  Central Asian flyway",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* tensions */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE PARK–PEOPLE TENSION</text>
      {[
        "buffalo wander out and hybridise",
        "  with domestic cattle — and",
        "  raid crops",
        "villagers graze livestock and",
        "  cut grass inside the reserve",
        "monsoon floods reshape the",
        "  habitat and the boundaries",
        "management answers: buffalo",
        "  insurance, grass-cutting",
        "  windows, wetland tourism",
        "lesson: a reserve surrounded by",
        "  people survives only with",
        "  their consent",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: Koshi Tappu = wildlife reserve + Ramsar wetland + arna refuge — three labels, one site.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Small reserves face the sharpest edge problems — boundary issues dominate when the area is tiny.</text>
    </svg>
  );
}
