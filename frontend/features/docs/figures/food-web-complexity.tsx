/** Food web complexity — why interconnection stabilises. Well-detailed. Theme-aware. */
export function FoodWebComplexity({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Food web complexity interconnection stability multiple pathways species extinction resilience versus simple chain fragility energy flow ecology">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Food web — many chains woven together</text>

      {/* simple chain */}
      <rect x="30" y="44" width="300" height="220" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="180" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ONE CHAIN = FRAGILE</text>
      {["grass", "rabbit", "fox"].map((t, i) => (
        <g key={t}>
          <rect x="105" y={88 + i * 56} width="150" height="38" rx="8" className="fill-current text-rose-500/15" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(244 63 94 / 0.9)" }} />
          <text x="180" y={112 + i * 56} fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{t}</text>
          {i < 2 && <line x1="180" y1={126 + i * 56} x2="180" y2={138 + i * 56} className="stroke-current text-rose-500" strokeWidth="2" style={{ color: "rgb(244 63 94 / 0.9)" }} markerEnd="url(#arrhl)" />}
        </g>
      ))}
      <text x="180" y="252" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">remove one link and the whole</text>
      <text x="180" y="266" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">line collapses — no detour exists</text>

      {/* web */}
      <rect x="360" y="44" width="330" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="525" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">A WEB = RESILIENT</text>
      {[
        ["producers", 480, 100],
        ["herbivores", 400, 170],
        ["insects", 525, 170],
        ["carnivores", 465, 236],
      ].map(([t, x, y]) => (
        <g key={t as string}>
          <rect x={(x as number) - 45} y={(y as number) - 14} width="90" height="28" rx="7" className="fill-current text-emerald-600/20" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(5 122 85 / 0.9)" }} />
          <text x={x as number} y={y as number} fontSize="6.8" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{t as string}</text>
        </g>
      ))}
      <line x1="480" y1="114" x2="410" y2="156" className="stroke-current text-emerald-700" strokeWidth="1.8" style={{ color: "rgb(5 122 85 / 0.9)" }} markerEnd="url(#arrhl)" />
      <line x1="490" y1="114" x2="522" y2="156" className="stroke-current text-emerald-700" strokeWidth="1.8" style={{ color: "rgb(5 122 85 / 0.9)" }} markerEnd="url(#arrhl)" />
      <line x1="410" y1="184" x2="455" y2="222" className="stroke-current text-emerald-700" strokeWidth="1.8" style={{ color: "rgb(5 122 85 / 0.9)" }} markerEnd="url(#arrhl)" />
      <line x1="522" y1="184" x2="478" y2="222" className="stroke-current text-emerald-700" strokeWidth="1.8" style={{ color: "rgb(5 122 85 / 0.9)" }} markerEnd="url(#arrhl)" />
      <text x="525" y="252" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">if one path fails, energy still</text>
      <text x="525" y="266" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">reaches the top by another route</text>
    </svg>
  );
}
