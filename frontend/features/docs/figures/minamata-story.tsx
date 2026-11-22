// MinamataStory figure. Theme-aware.
export function MinamataStory({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Minamata disease bioaccumulation pathway from factory to fish to humans">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Minamata — bioaccumulation made it a mass poisoning</text>
      {[
        ["factory", "Hg effluent", "rgb(148 163 184)", 40],
        ["bacteria", "→ methylmercury", "rgb(59 130 246)", 195],
        ["fish chain", "concentrates upward", "rgb(245 158 11)", 350],
        ["people", "CNS destroyed", "rgb(239 68 68)", 505],
      ].map(([s, d, col, x], i) => (
        <g key={s as string}>
          <rect x={x as number} y="70" width="115" height="60" rx="10" fill={col as string} opacity="0.12" stroke={col as string} />
          <text x={(x as number) + 57} y="94" fontSize="10.5" fontWeight="800" textAnchor="middle" fill={col as string}>{s as string}</text>
          <text x={(x as number) + 57} y="114" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
          {i < 3 && <path d={`M ${(x as number) + 117} 100 L ${(x as number) + 152} 100`} stroke="rgb(148 163 184)" strokeWidth="2" markerEnd="url(#ms-a)" />}
        </g>
      ))}
      <text x="330" y="165" fontSize="11" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">Japan, 1950s — thousands poisoned by one bay's fish</text>
      <text x="330" y="190" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">tremors, numbness, memory loss, paralysis — the textbook bioaccumulation case</text>
      <text x="330" y="212" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">lipid-soluble methylmercury climbs every step of the food chain</text>
      <defs>
        <marker id="ms-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(148 163 184)" /></marker>
      </defs>
    </svg>
  );
}
