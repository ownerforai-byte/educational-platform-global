// Laws of stoichiometry linked to Dalton. Theme-aware.
export function LawsVsAtomicTheoryLink({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Laws of stoichiometry linked to Dalton postulates conservation to postulate five definite proportions to identical atoms multiple proportions to ratios">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Each law leans on a postulate — the exam's favourite link</text>
      {[
        ["Conservation of mass", "postulate 5: atoms only rearranged", "rgb(14 165 233 / 0.85)"],
        ["Definite proportions", "postulate 4: fixed simple ratios", "rgb(16 185 129 / 0.85)"],
        ["Multiple proportions", "postulates 2+4: identical atoms, whole-number ratios", "rgb(139 92 246 / 0.85)"],
        ["Reciprocal proportions", "postulate 4 again, applied through a third element", "rgb(245 158 11 / 0.85)"],
      ].map(([law, post, c], i) => (
        <g key={law}>
          <rect x="30" y={40 + i * 38} width="300" height="30" rx="8" className="fill-current text-foreground/5" stroke="currentColor" strokeWidth="1.3" style={{ color: String(c) }} />
          <text x="180" y={60 + i * 38} fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{law}</text>
          <text x="348" y={60 + i * 38} fontSize="12" className="fill-current text-amber-500" fontWeight="800">→</text>
          <rect x="368" y={40 + i * 38} width="322" height="30" rx="8" className="fill-current text-foreground/5" stroke="currentColor" strokeWidth="1.3" style={{ color: String(c) }} />
          <text x="529" y={60 + i * 38} fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground" fontWeight="700">{post}</text>
        </g>
      ))}
      <rect x="30" y="192" width="660" height="12" rx="0" />
      <text x="360" y="204" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Essay structure: state the law, give its statement, then name the postulate that explains it — three marks per law.</text>
    </svg>
  );
}
