/** World plant diversity vs Nepal share. Well-detailed. Theme-aware. */
export function WorldPlantDiversity({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="World plant diversity total flowering plant species about 250000 to 400000 Nepal share 2 percent on 0.1 percent land megadiverse countries comparison bar">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Nepal in the world picture</text>

      {/* world bar */}
      <text x="20" y="66" fontSize="8" className="fill-current text-foreground" fontWeight="700">World flowering plants</text>
      <rect x="20" y="74" width="560" height="26" rx="6" className="fill-current text-sky-500/25" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="590" y="92" fontSize="8" className="fill-current text-muted-foreground" fontWeight="700">~250,000–400,000 species</text>

      {/* nepal bar */}
      <text x="20" y="126" fontSize="8" className="fill-current text-foreground" fontWeight="700">Nepal flowering plants</text>
      <rect x="20" y="134" width="34" height="26" rx="6" className="fill-current text-emerald-500/60" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="60" y="152" fontSize="8" className="fill-current text-muted-foreground" fontWeight="700">~7,000 species — about 2–3% of the world total</text>

      {/* land */}
      <text x="20" y="186" fontSize="8" className="fill-current text-foreground" fontWeight="700">Nepal's share of Earth's land</text>
      <rect x="20" y="194" width="7" height="26" rx="3" className="fill-current text-amber-500/60" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="36" y="212" fontSize="8" className="fill-current text-muted-foreground" fontWeight="700">~0.1% — yet hosts 2–3% of plant diversity</text>

      <rect x="30" y="236" width="660" height="50" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="50" y="258" fontSize="8.2" className="fill-current text-foreground" fontWeight="700">The disproportion is the story: a small country packing tropical-to-alpine life zones into 147,000 km².</text>
      <text x="50" y="276" fontSize="7.6" className="fill-current text-muted-foreground">Diversity per square kilometre in Nepal rivals entire megadiverse countries — altitude does the work of latitude.</text>
    </svg>
  );
}
