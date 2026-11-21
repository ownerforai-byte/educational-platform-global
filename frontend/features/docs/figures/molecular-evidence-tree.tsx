/** Molecular evidence — cytochrome c similarity tree. Theme-aware. */
export function MolecularEvidenceTree({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 220" className={className} role="img" aria-label="Molecular evidence cytochrome c similarity human versus chimpanzee identical rhesus one difference yeast many differences molecular tree matches fossil tree">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Molecular evidence — cytochrome c</text>

      <text x="330" y="60" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">HUMAN cytochrome c</text>
      <line x1="330" y1="66" x2="200" y2="120" strokeWidth="2" className="stroke-current text-emerald-600" />
      <line x1="330" y1="66" x2="330" y2="120" strokeWidth="2" className="stroke-current text-emerald-600" />
      <line x1="330" y1="66" x2="460" y2="120" strokeWidth="2" className="stroke-current text-emerald-600" />
      <line x1="330" y1="66" x2="560" y2="120" strokeWidth="2" className="stroke-current text-emerald-600" />

      {[
        { x: 200, t: "CHIMPANZEE", s: "identical" },
        { x: 330, t: "RHESUS", s: "1 difference" },
        { x: 460, t: "HORSE", s: "more differences" },
        { x: 560, t: "YEAST", s: "many differences" },
      ].map((n) => (
        <g key={n.t}>
          <circle cx={n.x} cy="126" r="5" className="fill-current text-rose-500" />
          <text x={n.x} y="146" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{n.t}</text>
          <text x={n.x} y="160" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">{n.s}</text>
        </g>
      ))}
      <rect x="40" y="176" width="580" height="30" rx="9" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="56" y="196" fontSize="8.6" className="fill-current text-foreground" fontWeight="700">The molecular tree matches the fossil tree — common ancestry written in sequences.</text>
    </svg>
  );
}
