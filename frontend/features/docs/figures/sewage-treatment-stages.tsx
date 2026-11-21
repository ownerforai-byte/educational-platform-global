/** Sewage treatment stages — primary, secondary, tertiary. Theme-aware. */
export function SewageTreatmentStages({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 230" className={className} role="img" aria-label="Sewage treatment stages primary screening and sedimentation secondary activated sludge and trickling filter microbial digestion tertiary chemical polishing before effluent discharge">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Sewage treatment — three stages of cleaning</text>

      {[
        { x: 110, t: "PRIMARY", s: "screening removes large", s2: "solids; sedimentation", s3: "settles the sludge", c: "rgb(120 113 108 / 0.9)" },
        { x: 330, t: "SECONDARY", s: "activated sludge / trickling", s2: "filter — microbial digestion", s3: "of dissolved organic matter", c: "rgb(22 163 74 / 0.9)" },
        { x: 550, t: "TERTIARY", s: "chemical polishing removes", s2: "remaining nutrients before", s3: "the effluent is discharged", c: "rgb(14 165 233 / 0.9)" },
      ].map((n, i) => (
        <g key={n.t}>
          <rect x={n.x - 90} y="60" width="180" height="110" rx="12" style={{ color: n.c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
          <text x={n.x} y="84" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          <text x={n.x} y="106" fontSize="7.3" textAnchor="middle" className="fill-current text-muted-foreground">{n.s}</text>
          <text x={n.x} y="124" fontSize="7.3" textAnchor="middle" className="fill-current text-muted-foreground">{n.s2}</text>
          <text x={n.x} y="142" fontSize="7.3" textAnchor="middle" className="fill-current text-muted-foreground">{n.s3}</text>
          {i < 2 && <path d={`M${n.x + 92} 115 h${126}`} markerEnd="url(#arrs)" strokeWidth="2.5" className="stroke-current text-muted-foreground" />}
        </g>
      ))}
      <defs><marker id="arrs" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" className="fill-current text-muted-foreground" /></marker></defs>

      <text x="16" y="206" fontSize="10" className="fill-current text-muted-foreground">Supporting measures: effluent treatment before discharge, laws and monitoring, constructed wetlands, community sanitation.</text>
      <text x="16" y="224" fontSize="10" className="fill-current text-muted-foreground">Pathogens (cholera, typhoid, dysentery) are the human cost of skipping these stages.</text>
    </svg>
  );
}
