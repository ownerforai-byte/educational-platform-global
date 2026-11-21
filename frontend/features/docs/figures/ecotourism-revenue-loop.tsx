/** Ecotourism revenue loop — tourism that pays for itself. Well-detailed. Theme-aware. */
export function EcotourismRevenueLoop({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Ecotourism revenue loop visitor fees park budget community share local jobs guide lodge anti-poaching patrol incentive conservation Annapurna Chitwan tourism pressure limits carrying capacity cycle diagram">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Ecotourism — the loop that can fund conservation</text>
      {/* loop */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      {[
        ["Visitors", "pay entry fees and stay local", 195],
        ["Revenue", "splits between park budget and community", 195],
      ].map(([name, detail, y], i) => (
        <g key={name as string}>
          <rect x="70" y={70 + i * 56} width="250" height="40" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.6" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
          <text x="88" y={90 + i * 56} fontSize="6.6" className="fill-current text-foreground" fontWeight="800">{name as string}</text>
          <text x="160" y={90 + i * 56} fontSize="5.8" className="fill-current text-muted-foreground">{detail as string}</text>
        </g>
      ))}
      <path d="M320 90 q30 0 30 26 q0 20 -30 20" className="fill-none stroke-current" strokeWidth="2" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="216" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">locals earn from wildlife alive, not dead — the incentive flips from poaching to protection</text>
      {/* limits */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE FINE PRINT</text>
      {[
        "carrying capacity: Everest trails",
        "  show what overcrowding does",
        "to trails, waste and water",
        "leakage: if operators are external,",
        "  little money stays local",
        "wildlife disturbance: too close,",
        "  too often, changes behaviour",
        "dependence: a crash in visitors",
        "  (as in COVID-19) defunds",
        "  protection overnight",
        "the fix: caps, local ownership,",
        "  diversified funding",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: ecotourism works when revenue stays local and stays below carrying capacity — two conditions, not one.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Annapurna's community lodges and Chitwan's jungle tourism are Nepal's proof-of-concept cases.</text>
    </svg>
  );
}
