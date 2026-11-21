/** Mushroom life cycle — spore germination to basidiocarp. Theme-aware. */
export function MushroomLifeCycle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Mushroom life cycle basidiospores germinate to primary mycelium plasmogamy to secondary mycelium and fruiting basidiocarp releasing spores">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Mushroom life cycle — a circle of spores</text>

      {[
        { x: 80, t: "BASIDIOSPORES", s: "released from gills", c: "rgb(14 165 233 / 0.9)" },
        { x: 250, t: "PRIMARY mycelium", s: "single-nucleus hyphae", c: "rgb(20 184 166 / 0.9)" },
        { x: 420, t: "SECONDARY mycelium", s: "two nuclei per cell (dikaryotic)", c: "rgb(22 163 74 / 0.9)" },
        { x: 580, t: "BASIDIOCARP", s: "the mushroom we eat", c: "rgb(245 158 11 / 0.9)" },
      ].map((n, i) => (
        <g key={n.t}>
          <rect x={n.x - 68} y="70" width="136" height="60" rx="12" style={{ color: n.c }} className="fill-current opacity-12" strokeWidth="2.5" stroke="currentColor" />
          <text x={n.x} y="94" fontSize="8.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          <text x={n.x} y="112" fontSize="7.5" textAnchor="middle" className="fill-current text-muted-foreground">{n.s}</text>
          {i < 3 && <line x1={n.x + 70} y1="100" x2={n.x + 102} y2="100" strokeWidth="2.5" className="stroke-current text-foreground" />}
        </g>
      ))}

      {/* meiosis return */}
      <path d="M580 140 Q330 220 80 140" fill="none" strokeWidth="2.5" strokeDasharray="6 4" className="stroke-current text-muted-foreground" />
      <text x="330" y="216" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">meiosis on the basidia makes 4 haploid spores per club cell — cycle restarts</text>

      <text x="16" y="232" fontSize="10" className="fill-current text-muted-foreground">The dikaryotic (n + n) phase dominates the fungus's life — the mushroom is a temporary spore factory built by it.</text>
    </svg>
  );
}
