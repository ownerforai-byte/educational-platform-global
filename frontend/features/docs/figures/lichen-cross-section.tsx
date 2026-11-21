/** Lichen cross-section — layered thallus anatomy. Well-detailed. Theme-aware. */
export function LichenCrossSection({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Lichen thallus cross-section upper cortex algal layer medulla lower cortex rhizines foliose lichen anatomy fungal hyphae symbiosis layers">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Slice through a foliose lichen</text>

      {/* cross-section */}
      <rect x="30" y="44" width="400" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      {/* upper cortex */}
      <rect x="60" y="80" width="340" height="22" rx="6" className="fill-current text-stone-400/40" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(168 162 158 / 0.9)" }} />
      <text x="410" y="94" fontSize="7.6" className="fill-current text-foreground" fontWeight="700">upper cortex — protection</text>
      {/* algal layer */}
      <rect x="60" y="102" width="340" height="26" rx="6" className="fill-current text-emerald-600/30" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      {[80, 110, 140, 170, 200, 230, 260, 290, 320, 350].map((x) => (
        <circle key={x} cx={x} cy="115" r="5" className="fill-current text-lime-500/60" stroke="currentColor" strokeWidth="1" style={{ color: "rgb(132 204 22 / 0.9)" }} />
      ))}
      <text x="410" y="118" fontSize="7.6" className="fill-current text-foreground" fontWeight="700">algal layer — food factory</text>
      {/* medulla */}
      <rect x="60" y="128" width="340" height="80" rx="6" className="fill-current text-stone-200/30" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" style={{ color: "rgb(214 211 209 / 0.8)" }} />
      {[[90, 150, 150, 180], [150, 180, 220, 150], [220, 150, 290, 190], [290, 190, 360, 150], [120, 195, 190, 160], [250, 165, 330, 195]].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-current text-stone-400" strokeWidth="1.6" style={{ color: "rgb(168 162 158 / 0.8)" }} />
      ))}
      <text x="410" y="170" fontSize="7.6" className="fill-current text-foreground" fontWeight="700">medulla — loose hyphae, air + storage</text>
      {/* lower cortex */}
      <rect x="60" y="208" width="340" height="18" rx="6" className="fill-current text-stone-400/40" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(168 162 158 / 0.9)" }} />
      <text x="410" y="220" fontSize="7.6" className="fill-current text-foreground" fontWeight="700">lower cortex</text>
      {/* rhizines */}
      {[[100, 226], [170, 226], [240, 226], [310, 226]].map(([x, y]) => (
        <path key={x} d={`M${x} ${y} q4 14 2 24`} className="fill-none stroke-current text-stone-500" strokeWidth="2.4" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      ))}
      <text x="410" y="244" fontSize="7.6" className="fill-current text-foreground" fontWeight="700">rhizines — attach to bark/rock</text>
      <text x="60" y="258" fontSize="7.2" className="fill-current text-muted-foreground">The fungus builds the body; the algae live in a neat band just under the top skin.</text>

      {/* notes card */}
      <rect x="450" y="44" width="240" height="220" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="570" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHY LAYERS MATTER</text>
      {[
        "cortex = shield from sun, drying",
        "algal layer = photosynthesis only",
        "medulla = gas exchange, storage",
        "rhizines = grip, not absorption",
        "nutrients soak in from air + rain",
      ].map((t, i) => (
        <text key={t} x="466" y={94 + i * 26} fontSize="7.4" className="fill-current text-muted-foreground">• {t}</text>
      ))}
      <text x="466" y="232" fontSize="7.2" className="fill-current text-muted-foreground">Exam hook: name the four layers</text>
      <text x="466" y="246" fontSize="7.2" className="fill-current text-muted-foreground">in order, top to bottom.</text>
    </svg>
  );
}
