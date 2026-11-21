/** Conservation strategies pair — in-situ and ex-situ side by side. Well-detailed. Theme-aware. */
export function ConservationStrategiesPair({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Conservation strategies pair in-situ ex-situ national park zoo seed bank cryopreservation captive breeding comparison when to use each advantages limits complement Nepal examples combined approach">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">In-situ vs ex-situ — two toolboxes, one goal</text>
      {/* in-situ */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">IN-SITU (IN PLACE)</text>
      {[
        "the whole ecosystem is the ark:",
        "  national parks, reserves,",
        "  conservation areas",
        "protects species AND their",
        "  interactions, habitats, and",
        "  evolution in progress",
        "cheapest per species at scale",
        "limits: invasive species, poaching,",
        "  fires keep operating inside",
        "Nepal's network: 12 parks,",
        "  reserves and conservation",
        "  areas across all terrains",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* ex-situ */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">EX-SITU (OFF SITE)</text>
      {[
        "zoos, aquaria, botanical gardens,",
        "  seed banks, tissue culture,",
        "  cryopreservation",
        "insurance populations when the",
        "  habitat is already gone",
        "captive breeding can return",
        "  species to the wild — but",
        "  relearning is hard",
        "seed banks store diversity in",
        "  kilograms, not hectares",
        "limits: evolution stops; only",
        "  genes are preserved, not",
        "  the living system",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="240" width="330" height="52" rx="10" className="fill-current text-violet-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="195" y="258" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Exam hook: in-situ = ecosystem-level, cheaper, keeps evolution; ex-situ = species-level insurance, costlier per individual.</text>
      <text x="195" y="276" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">They are complements, not rivals: ex-situ buys time while in-situ restores homes.</text>
      <text x="195" y="288" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">The best answer names one method of each with one Nepali example.</text>
    </svg>
  );
}
