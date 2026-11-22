// IodineThyroxineFlow figure. Theme-aware.
export function IodineThyroxineFlow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Iodine to thyroxine pathway and goitre prevention by iodised salt">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Iodine: ~150 µg/day runs the metabolism</text>
      {[
        ["dietary I", "iodised salt, seafood", "rgb(59 130 246)", 40],
        ["thyroid", "concentrates I", "rgb(245 158 11)", 205],
        ["thyroxine T₄/T₃", "metabolic rate hormone", "rgb(16 185 129)", 370],
        ["healthy body", "growth + development", "rgb(139 92 246)", 535],
      ].map(([s, d, col, x], i) => (
        <g key={s as string}>
          <rect x={x as number} y="70" width="120" height="60" rx="10" fill={col as string} opacity="0.12" stroke={col as string} />
          <text x={(x as number) + 60} y="94" fontSize="10.5" fontWeight="800" textAnchor="middle" fill={col as string}>{s as string}</text>
          <text x={(x as number) + 60} y="114" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
          {i < 3 && <path d={`M ${(x as number) + 122} 100 L ${(x as number) + 160} 100`} stroke="rgb(148 163 184)" strokeWidth="2" markerEnd="url(#itf-a)" />}
        </g>
      ))}
      <text x="330" y="165" fontSize="11" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">no iodine → thyroid swells = GOITRE</text>
      <text x="330" y="190" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">fix: iodised common salt (KI/KIO₃ in NaCl) — chemistry's cheapest public-health win</text>
      <defs>
        <marker id="itf-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(148 163 184)" /></marker>
      </defs>
    </svg>
  );
}
