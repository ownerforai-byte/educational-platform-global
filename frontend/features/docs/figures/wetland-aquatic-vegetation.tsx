/** Wetland and aquatic vegetation — the forgotten type. Well-detailed. Theme-aware. */
export function WetlandAquaticVegetation({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Wetland aquatic vegetation Nepal Koshi Tappu Rara lake reeds Saccharum Phragmites water hyacinth invasive wetland plants Ramsar">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Wetland vegetation — Nepal's water gardens</text>

      {/* wetland scene */}
      <rect x="30" y="44" width="400" height="220" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <rect x="50" y="160" width="360" height="90" rx="8" className="fill-current text-sky-400/20" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      {/* reeds */}
      {[70, 95, 120, 145, 360, 385].map((x, i) => (
        <path key={i} d={`M${x} 250 q${i % 2 ? 4 : -4} -40 0 -80`} className="stroke-current text-lime-700" strokeWidth="2.6" style={{ color: "rgb(77 124 15 / 0.9)" }} />
      ))}
      {/* floating leaves */}
      {[210, 250, 290].map((x, i) => (
        <ellipse key={i} cx={x} cy={182 + i * 8} rx="16" ry="7" className="fill-current text-emerald-500/40" stroke="currentColor" strokeWidth="1.2" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      ))}
      {/* hyacinth invasive */}
      <circle cx="330" cy="196" r="9" className="fill-current text-violet-500/50" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="330" y="220" fontSize="6.4" textAnchor="middle" className="fill-current text-violet-600">water hyacinth (invasive)</text>
      <text x="230" y="270" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">reeds (Saccharum, Phragmites), floating-leaf plants, free floaters</text>

      {/* facts */}
      <rect x="450" y="44" width="240" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="570" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHERE THEY LIVE</text>
      {[
        "Koshi Tappu wetlands —",
        "  tall grassland wild buffaloes",
        "Rara and Phewa lake margins",
        "Ramsar-listed wetland sites",
        "role: nursery for fish,",
        "  sponge for floods, bird habitat",
      ].map((t, i) => (
        <text key={t} x="466" y={94 + i * 17} fontSize="7.2" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <text x="466" y="204" fontSize="7" className="fill-current text-emerald-600" fontWeight="700">Threat: drainage, invasive hyacinth</text>
      <text x="466" y="218" fontSize="7" className="fill-current text-emerald-600" fontWeight="700">and eutrophication choke them fast.</text>
      <text x="466" y="244" fontSize="7" className="fill-current text-muted-foreground">Exam hook: name one Ramsar wetland</text>
      <text x="466" y="258" fontSize="7" className="fill-current text-muted-foreground">and one wetland plant.</text>
    </svg>
  );
}
