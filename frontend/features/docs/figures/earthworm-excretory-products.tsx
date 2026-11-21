/** Earthworm excretory products & pathways — urea/ammonia, enteronephric vs exonephric. Theme-aware. */
export function EarthwormExcretoryProducts({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Earthworm excretory products urea ammonia creatinine with enteronephric discharge into intestine and exonephric discharge through skin surface nephridiopores">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">What leaves, and through which door</text>

      {/* products */}
      <rect x="30" y="60" width="180" height="150" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="120" y="86" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">EXCRETORY PRODUCTS</text>
      {["urea (main)", "ammonia (some)", "creatinine", "excess Ca²⁺ + salts", "pigment granules (chloragogen)"].map((s, i) => (
        <text key={s} x="44" y={112 + i * 20} fontSize="8.5" className="fill-current text-muted-foreground">• {s}</text>
      ))}

      {/* two routes */}
      <rect x="250" y="60" width="180" height="150" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="340" y="86" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ENTERONEPHRIC</text>
      {["septal + pharyngeal types", "discharge INTO the intestine", "waste leaves with the castings", "recycles water & salts back", "an adaptation to land life"].map((s, i) => (
        <text key={s} x="264" y={112 + i * 20} fontSize="8.5" className="fill-current text-muted-foreground">• {s}</text>
      ))}

      <rect x="470" y="60" width="180" height="150" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="560" y="86" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">EXONEPHRIC</text>
      {["integumentary type", "discharge OUT through skin", "opening = nephridiopore", "direct loss of water —", "needs moist surroundings"].map((s, i) => (
        <text key={s} x="484" y={112 + i * 20} fontSize="8.5" className="fill-current text-muted-foreground">• {s}</text>
      ))}

      <text x="16" y="240" fontSize="10" className="fill-current text-muted-foreground">Nephridia filter coelomic fluid and blood, reabsorb the useful parts, and pass the rest on — the same logic as a nephron.</text>
    </svg>
  );
}
