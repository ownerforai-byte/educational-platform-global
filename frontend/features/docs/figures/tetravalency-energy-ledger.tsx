// TetravalencyEnergyLedger figure. Theme-aware.
export function TetravalencyEnergyLedger({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Energy account showing excitation cost repaid by two extra bonds">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The energy ledger of tetravalency</text>
      <rect x="40" y="60" width="240" height="70" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="160" y="88" fontSize="11" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">COST: promotion ≈ 406 kJ/mol</text>
      <text x="160" y="112" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">2s electron → empty 2p orbital</text>
      <path d="M 285 95 L 335 95" stroke="rgb(148 163 184)" strokeWidth="2.5" markerEnd="url(#tel-a)" />
      <rect x="340" y="60" width="280" height="70" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="480" y="88" fontSize="11" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">GAIN: 2 extra bonds × ≈413 kJ/mol</text>
      <text x="480" y="112" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">each C–H bond ≈ 413 kJ/mol released</text>
      <text x="330" y="160" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">net profit ≈ 420 kJ/mol → tetravalent bonding wins</text>
      <text x="330" y="188" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Carbon borrows energy to earn more — that is why valency 2 never happens in practice</text>
      <text x="330" y="210" fontSize="10.5" textAnchor="middle" fill="rgb(59 130 246)">CH₄, CCl₄, and every organic skeleton are tetravalent compounds</text>
      <defs>
        <marker id="tel-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(148 163 184)" /></marker>
      </defs>
    </svg>
  );
}
