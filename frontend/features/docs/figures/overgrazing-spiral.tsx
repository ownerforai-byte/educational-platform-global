/** Overgrazing spiral — how herds unmake hillsides. Well-detailed. Theme-aware. */
export function OvergrazingSpiral({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Overgrazing spiral grass loss soil compaction erosion invasive species unpalatable plants take over livestock pressure vegetation degradation cycle">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Overgrazing — a spiral that tightens</text>

      {/* loop */}
      <rect x="30" y="44" width="400" height="220" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      {[
        ["more animals than grass", 230, 90],
        ["palable species grazed out", 350, 160],
        ["soil compacts, grass seed fails", 230, 224],
        ["unpalatable invasives take over", 110, 160],
      ].map(([t, x, y]) => (
        <g key={t as string}>
          <rect x={(x as number) - 75} y={(y as number) - 18} width="150" height="36" rx="8" className="fill-current text-amber-600/15" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(180 130 40 / 0.9)" }} />
          <text x={x as number} y={y as number} fontSize="6.8" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{(t as string).slice(0, 30)}</text>
        </g>
      ))}
      <line x1="290" y1="112" x2="330" y2="140" className="stroke-current text-amber-700" strokeWidth="2" style={{ color: "rgb(180 130 40 / 0.9)" }} markerEnd="url(#arrhl)" />
      <line x1="330" y1="182" x2="290" y2="206" className="stroke-current text-amber-700" strokeWidth="2" style={{ color: "rgb(180 130 40 / 0.9)" }} markerEnd="url(#arrhl)" />
      <line x1="170" y1="206" x2="130" y2="182" className="stroke-current text-amber-700" strokeWidth="2" style={{ color: "rgb(180 130 40 / 0.9)" }} markerEnd="url(#arrhl)" />
      <line x1="130" y1="140" x2="170" y2="112" className="stroke-current text-amber-700" strokeWidth="2" style={{ color: "rgb(180 130 40 / 0.9)" }} markerEnd="url(#arrhl)" />
      <text x="230" y="258" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">each turn of the loop leaves less grass than the last</text>

      {/* exit */}
      <rect x="450" y="44" width="240" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="570" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">BREAKING THE SPIRAL</text>
      {[
        "carry capacity: set herd size",
        "  to what the grassland grows",
        "rotational grazing — rest periods",
        "plant fodder trees and improved",
        "  grasses on terraces",
        "stall-feeding with cut fodder",
      ].map((t, i) => (
        <text key={t} x="466" y={94 + i * 17} fontSize="7.2" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <text x="466" y="204" fontSize="7" className="fill-current text-emerald-600" fontWeight="700">Grazing damage is reversible —</text>
      <text x="466" y="218" fontSize="7" className="fill-current text-emerald-600" fontWeight="700">if the animals are given somewhere</text>
      <text x="466" y="232" fontSize="7" className="fill-current text-emerald-600" fontWeight="700">else to eat.</text>
      <text x="466" y="256" fontSize="7" className="fill-current text-muted-foreground">Exam hook: name two effects of</text>
      <text x="466" y="270" fontSize="7" className="fill-current text-muted-foreground">overgrazing and one remedy.</text>
    </svg>
  );
}
