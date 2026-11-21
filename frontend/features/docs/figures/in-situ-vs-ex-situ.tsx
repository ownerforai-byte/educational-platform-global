/** In-situ vs ex-situ conservation comparison. Theme-aware. */
export function InSituVsExSitu({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 250" className={className} role="img" aria-label="In-situ versus ex-situ conservation in-situ protects whole ecosystems in natural habitat ex-situ conserves species or genes off-site in zoos botanical gardens seed banks">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Two ways to save a species</text>

      {/* in-situ */}
      <g>
        <rect x="30" y="46" width="290" height="160" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
        <text x="175" y="70" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">IN-SITU — in the natural habitat</text>
        {["national parks, wildlife reserves,", "conservation areas, biosphere reserves", "protects whole ecosystems and", "evolutionary processes (selection continues)", "cost: large areas needed", "e.g. Sagarmatha NP, Chitwan NP, Annapurna CA"].map((s, i) => (
          <text key={i} x="46" y={94 + i * 17} fontSize="7.6" className="fill-current text-muted-foreground">{s}</text>
        ))}
      </g>

      {/* ex-situ */}
      <g>
        <rect x="340" y="46" width="290" height="160" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
        <text x="485" y="70" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">EX-SITU — off-site</text>
        {["zoos, botanical gardens, seed banks,", "tissue culture, cryopreservation,", "captive breeding", "protects individual species or genes;", "selection paused or altered", "e.g. Central Zoo Kathmandu, National", "Herbarium, seed banks"].map((s, i) => (
          <text key={i} x="356" y={94 + i * 17} fontSize="7.6" className="fill-current text-muted-foreground">{s}</text>
        ))}
      </g>
      <text x="16" y="236" fontSize="10" className="fill-current text-muted-foreground">Exam hook: in-situ keeps evolution running; ex-situ is the insurance copy when the habitat is already gone.</text>
    </svg>
  );
}
