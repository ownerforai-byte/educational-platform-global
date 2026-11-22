// Simple whole-number ratios panel. Theme-aware.
export function CombineRatioPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Atoms combine in simple whole number ratios water two to one ammonia one to three methane one to four">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Postulate 4 at work — ratios you can see in formulae</text>
      {[
        ["H₂O", "H : O = 2 : 1"],
        ["NH₃", "N : H = 1 : 3"],
        ["CH₄", "C : H = 1 : 4"],
        ["CO₂", "C : O = 1 : 2"],
      ].map(([f, r], i) => (
        <g key={f}>
          <rect x={30 + (i % 2) * 340} y={44 + Math.floor(i / 2) * 56} width="320" height="46" rx="10" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(16 185 129 / 0.85)" }} />
          <text x={46 + (i % 2) * 340} y={72 + Math.floor(i / 2) * 56} fontSize="11" className="fill-current text-emerald-600" fontWeight="800">{f}</text>
          <text x={334 + (i % 2) * 340} y={72 + Math.floor(i / 2) * 56} fontSize="9.5" textAnchor="end" className="fill-current text-foreground" fontWeight="700">{r}</text>
        </g>
      ))}
      <rect x="30" y="164" width="660" height="36" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="182" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">This postulate is the direct ancestor of the law of definite proportions — Dalton built the theory to explain the laws.</text>
      <text x="360" y="194" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">"Simple whole numbers" fails for non-stoichiometric solids — a limitation worth one mark.</text>
    </svg>
  );
}
