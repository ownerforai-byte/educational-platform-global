/** Dominance hierarchy — social rank and priority access. Theme-aware. */
export function DominanceHierarchy({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Dominance hierarchy in social animals with dominant individual having priority access to food mates and territory and leadership in group movement">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Dominance & leadership — order in the group</text>

      {/* pyramid */}
      <g>
        <rect x="60" y="60" width="280" height="160" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
        <text x="200" y="84" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE HIERARCHY</text>
        <rect x="150" y="96" width="100" height="28" rx="6" className="fill-current text-amber-500/60" />
        <text x="200" y="115" fontSize="8.4" textAnchor="middle" className="fill-current text-white" fontWeight="800">DOMINANT (alpha)</text>
        <rect x="120" y="132" width="160" height="26" rx="6" className="fill-current text-amber-500/40" />
        <text x="200" y="150" fontSize="8" textAnchor="middle" className="fill-current text-foreground">subordinates</text>
        <rect x="90" y="166" width="220" height="24" rx="6" className="fill-current text-amber-500/25" />
        <text x="200" y="183" fontSize="8" textAnchor="middle" className="fill-current text-foreground">lowest-ranked members</text>
        <text x="76" y="210" fontSize="7.6" className="fill-current text-muted-foreground">seen in primates, wolves, fish groups</text>
      </g>

      {/* perks */}
      <g>
        <rect x="370" y="60" width="260" height="160" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
        <text x="500" y="84" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHAT RANK BUYS</text>
        {["priority access to FOOD", "priority access to MATES", "priority access to TERRITORY", "leadership: decides group", "movement and direction"].map((s, i) => (
          <text key={i} x="386" y={108 + i * 20} fontSize="8.2" className="fill-current text-muted-foreground">• {s}</text>
        ))}
        <text x="386" y="212" fontSize="7.6" className="fill-current text-muted-foreground">e.g. dominant male lion — first to the pride's females</text>
      </g>
      <text x="16" y="236" fontSize="10" className="fill-current text-muted-foreground">Hierarchy reduces fighting: once ranks are settled, everyone knows their place — fewer injuries, more stable groups.</text>
    </svg>
  );
}
