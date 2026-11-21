// Period 7 completion — 118 elements. Theme-aware.
export function Period7Completion({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Period seven completion of the periodic table with 118 elements oganesson closing the table and future elements 119 120 awaiting discovery">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Period 7 is complete — the table is full to Z = 118</text>
      {Array.from({ length: 18 }, (_, i) => (
        <rect key={i} x={40 + i * 36} y="44" width="32" height="30" rx="4" className="fill-current text-sky-500/15" stroke="currentColor" strokeWidth="1" style={{ color: "rgb(14 165 233 / 0.85)" }} />
      ))}
      <rect x={40 + 17 * 36} y="44" width="32" height="30" rx="4" className="fill-current text-emerald-500/25" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(16 185 129 / 0.95)" }} />
      <text x={56 + 17 * 36} y="64" fontSize="9" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="800">Og</text>
      <text x="360" y="94" fontSize="8.4" textAnchor="middle" className="fill-current text-muted-foreground">Period 7 row: Fr → Ra → actinide series → … → Ts → Og (Z = 118), confirmed in 2016.</text>
      <rect x="30" y="110" width="320" height="52" rx="10" className="fill-current text-violet-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="190" y="132" fontSize="9.5" textAnchor="middle" className="fill-current text-violet-600" fontWeight="800">What is filled now</text>
      <text x="190" y="152" fontSize="8.4" textAnchor="middle" className="fill-current text-muted-foreground">7 periods · 18 groups · all 118 boxes occupied</text>
      <rect x="370" y="110" width="320" height="52" rx="10" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="530" y="132" fontSize="9.5" textAnchor="middle" className="fill-current text-amber-600" fontWeight="800">What comes next</text>
      <text x="530" y="152" fontSize="8.4" textAnchor="middle" className="fill-current text-muted-foreground">Z = 119, 120 would open period 8 — systematic names ready</text>
      <text x="360" y="190" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">New elements are made one atom at a time in accelerators; names stay temporary (un + root + ium) until confirmed.</text>
    </svg>
  );
}
