// The enn + nil = ennil spelling rule. Theme-aware.
export function EnnRuleCallout({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 180" className={className} role="img" aria-label="Spelling rule when enn meets nil it becomes ennil so element 119 is ununennium and 120 unbinilium">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">The one spelling trap: enn + nil</text>
      <rect x="30" y="44" width="660" height="56" rx="10" className="fill-current text-rose-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="360" y="68" fontSize="12" textAnchor="middle" className="fill-current text-rose-500" fontWeight="800">enn + nil → ennil (drop one n)</text>
      <text x="360" y="88" fontSize="8.4" textAnchor="middle" className="fill-current text-muted-foreground">otherwise the triple n would be unpronounceable</text>
      <rect x="30" y="112" width="320" height="50" rx="10" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="190" y="132" fontSize="9.5" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="800">Z = 119: un + un + enn + il + ium</text>
      <text x="190" y="152" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ununennium (Uue)</text>
      <rect x="370" y="112" width="320" height="50" rx="10" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="530" y="132" fontSize="9.5" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">Z = 120: un + bi + nil + ium</text>
      <text x="530" y="152" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">unbinilium (Ubn)</text>
    </svg>
  );
}
