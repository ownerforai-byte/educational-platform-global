/** Soil erosion control — terracing, contour, check dams, community forestry. Theme-aware. */
export function SoilErosionControl({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 250" className={className} role="img" aria-label="Soil erosion control measures practised in Nepal terracing contour farming afforestation community forestry cover crops mulching crop rotation check dams and controlled grazing">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Saving the topsoil — Nepal's toolkit</text>

      {/* hillside with terraces */}
      <g>
        <rect x="30" y="56" width="290" height="160" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
        <path d="M60 200 L200 90 L320 170" className="fill-none stroke-current text-stone-500" strokeWidth="3" />
        {[0, 1, 2].map((i) => (
          <line key={i} x1={100 + i * 40} y1={166 - i * 28} x2={150 + i * 40} y2={158 - i * 28} strokeWidth="4" className="stroke-current text-emerald-600" />
        ))}
        <text x="46" y="196" fontSize="8" className="fill-current text-muted-foreground">terraces + contour farming slow runoff</text>
        <text x="46" y="212" fontSize="8" className="fill-current text-muted-foreground">afforestation: roots hold the slope</text>
      </g>

      {/* measures list */}
      <g>
        <rect x="340" y="56" width="290" height="160" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
        <text x="485" y="80" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE FIVE MEASURES</text>
        {["1. terracing and contour farming", "2. afforestation + community forestry", "3. cover crops, mulching, rotation", "4. gully plugging, check dams,", "    embankments on river banks", "5. controlled grazing; no slope", "    cutting without retaining walls"].map((s, i) => (
          <text key={i} x="356" y={102 + i * 15} fontSize="7.6" className="fill-current text-muted-foreground">{s}</text>
        ))}
      </g>
      <text x="16" y="240" fontSize="10" className="fill-current text-muted-foreground">Why it matters: topsoil is the most fertile layer — losing it starves crops and silts rivers and reservoirs downstream.</text>
    </svg>
  );
}
