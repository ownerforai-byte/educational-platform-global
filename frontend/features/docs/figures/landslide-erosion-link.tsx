/** Landslide erosion link — deforestation to disaster. Well-detailed. Theme-aware. */
export function LandslideErosionLink({ className }: { className?: string }) {
  const chain: [string, string][] = [
    ["Trees cut on steep slopes", "roots no longer bind the soil"],
    ["Monsoon rain saturates slope", "weight up, grip down"],
    ["Landslide and gullying", "topsoil — centuries old — washes away"],
    ["Rivers and reservoirs silt up", "hydropower capacity shrinks"],
    ["Springs dry downstream", "villages lose drinking water"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Landslide erosion link deforestation steep slopes monsoon topsoil loss siltation hydropower springs drying chain Nepal hills">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Why a felled hillside slides — five links</text>
      {chain.map(([s, d], i) => {
        const y = 44 + i * 46;
        return (
          <g key={s}>
            <rect x="30" y={y} width="400" height="38" rx="9" className="fill-current text-rose-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: `rgb(244 63 94 / ${0.9 - i * 0.08})` }} />
            <text x="46" y={y + 17} fontSize="7.8" className="fill-current text-foreground" fontWeight="800">{i + 1}. {s}</text>
            <text x="46" y={y + 30} fontSize="6.8" className="fill-current text-muted-foreground">{d}</text>
            {i < 4 && <line x1="230" y1={y + 38} x2="230" y2={y + 46} className="stroke-current text-rose-500" strokeWidth="2" style={{ color: "rgb(244 63 94 / 0.9)" }} markerEnd="url(#arrhl)" />}
          </g>
        );
      })}
      <rect x="450" y="44" width="240" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="570" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE ROOT FACT</text>
      {[
        "one tree's root system holds",
        "  tonnes of hillside together",
        "roots die within years of felling",
        "slope failure follows in the next",
        "  heavy monsoon",
        "prevention: keep forest on",
        "  slopes steeper than ~30°",
      ].map((t, i) => (
        <text key={t} x="466" y={94 + i * 17} fontSize="7.2" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <text x="466" y="204" fontSize="7" className="fill-current text-emerald-600" fontWeight="700">A landslide is deforestation with a</text>
      <text x="466" y="218" fontSize="7" className="fill-current text-emerald-600" fontWeight="700">date attached — the rain sets it off.</text>
      <text x="466" y="244" fontSize="7" className="fill-current text-muted-foreground">Exam hook: chain deforestation to</text>
      <text x="466" y="258" fontSize="7" className="fill-current text-muted-foreground">landslide in three steps.</text>
    </svg>
  );
}
