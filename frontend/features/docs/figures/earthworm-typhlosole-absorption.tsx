/** Earthworm typhlosole absorption — the internal fold. Well-detailed. Theme-aware. */
export function EarthwormTyphlosoleAbsorption({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Earthworm typhlosole absorption internal fold intestine dorsal surface area chloragogen cells nutrient uptake increased absorptive area">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Typhlosole — doubling the absorption line</text>
      {/* intestine cross-section */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">INTESTINE CROSS-SECTION</text>
      <circle cx="195" cy="146" r="66" className="fill-none stroke-current" strokeWidth="9" style={{ color: "rgb(16 185 129 / 0.5)" }} />
      <path d="M195 80 v100" className="stroke-current" strokeWidth="9" strokeLinecap="round" style={{ color: "rgb(245 158 11 / 0.8)" }} />
      <text x="230" y="92" fontSize="6.6" className="fill-current text-amber-600" fontWeight="700">typhlosole fold</text>
      <text x="195" y="238" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">a dorsal fold hanging into the lumen — roughly doubles the lining area</text>
      {/* facts */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">HOW IT WORKS</text>
      {[
        "runs along the dorsal wall from",
        "  segment ~20 to the anus",
        "more surface = faster absorption",
        "  of digested food",
        "chloragogen cells wrap the gut",
        "  around it — store glycogen and",
        "  detoxify, like a liver",
        "blood from the intestine feeds the",
        "  rest of the worm directly",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 19} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="272" width="660" height="20" rx="6" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: typhlosole = internal fold of the intestine that increases absorptive surface — one sentence, full mark.</text>
    </svg>
  );
}
