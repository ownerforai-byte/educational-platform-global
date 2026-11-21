// n + l rule comparison: 4s vs 3d energy. Theme-aware.
export function NlRuleComparison({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="n plus l rule comparison 4 s has sum four filled before 3 d with sum five energy ordering diagram">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">The (n + l) rule — why 4s fills before 3d</text>
      <rect x="40" y="46" width="290" height="86" rx="10" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="185" y="70" fontSize="11" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="800">4s: n + l = 4 + 0 = 4</text>
      <text x="185" y="92" fontSize="8.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Lower sum → filled first</text>
      <text x="185" y="112" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">Ca ends 4s²; Sc's 21st electron goes 3d¹</text>
      <rect x="390" y="46" width="290" height="86" rx="10" className="fill-current text-rose-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="535" y="70" fontSize="11" textAnchor="middle" className="fill-current text-rose-500" fontWeight="800">3d: n + l = 3 + 2 = 5</text>
      <text x="535" y="92" fontSize="8.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Higher sum → filled later</text>
      <text x="535" y="112" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">When sums tie, lower n wins (4p before 5s)</text>
      <rect x="30" y="146" width="660" height="48" rx="8" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="166" fontSize="8.4" textAnchor="middle" className="fill-current text-muted-foreground">Energy order actually used: 1s 2s 2p 3s 3p 4s 3d 4p 5s 4d 5p 6s 4f 5d 6p 7s …</text>
      <text x="360" y="184" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: quote the rule, then apply it — that two-line structure earns the full 2m.</text>
    </svg>
  );
}
