/** Migration purposes — food, adverse conditions, mate, shelter, reproduction. Theme-aware. */
export function MigrationPurposes({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Five purposes of migration in search of food to protect from adverse environmental conditions to find mate shelter and for reproduction">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Why animals migrate — five purposes</text>

      {[
        { x: 110, t: "FOOD", s: "in search of food", s2: "as local supplies", s3: "shift with seasons", c: "rgb(22 163 74 / 0.9)" },
        { x: 250, t: "SAFETY", s: "to protect from adverse", s3: "environmental conditions", s2: "— cold, drought, floods", c: "rgb(14 165 233 / 0.9)" },
        { x: 410, t: "MATE", s: "to find mate", s2: "breeding grounds bring", s3: "scattered animals together", c: "rgb(244 63 94 / 0.9)" },
        { x: 550, t: "SHELTER & YOUNG", s: "shelter and", s2: "reproduction — safe sites", s3: "for eggs and offspring", c: "rgb(245 158 11 / 0.9)" },
      ].map((n) => (
        <g key={n.t}>
          <rect x={n.x - 62} y="56" width="130" height="120" rx="12" style={{ color: n.c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
          <text x={n.x} y="82" fontSize="8.8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          <text x={n.x} y="104" fontSize="7.3" textAnchor="middle" className="fill-current text-muted-foreground">{n.s}</text>
          <text x={n.x} y="122" fontSize="7.3" textAnchor="middle" className="fill-current text-muted-foreground">{n.s2}</text>
          <text x={n.x} y="140" fontSize="7.3" textAnchor="middle" className="fill-current text-muted-foreground">{n.s3}</text>
        </g>
      ))}

      <rect x="40" y="192" width="580" height="34" rx="10" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(124 58 237 / 0.9)" }} />
      <text x="56" y="214" fontSize="9" className="fill-current text-foreground" fontWeight="700">One journey can serve several purposes at once — feeding grounds and breeding grounds are often different places.</text>
    </svg>
  );
}
