// Be-B and N-O IE dips panel. Theme-aware.
export function IeDipsPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 220" className={className} role="img" aria-label="Ionisation energy dips beryllium to boron and nitrogen to oxygen explained by new p subshell and paired electrons repelling">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">The two IE dips — where the rise breaks</text>
      <rect x="30" y="42" width="320" height="110" rx="10" className="fill-current text-violet-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="190" y="64" fontSize="9.5" textAnchor="middle" className="fill-current text-violet-600" fontWeight="800">Dip 1: Be → B</text>
      <text x="190" y="88" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Be 2s² (full) → B 2s² 2p¹</text>
      <text x="190" y="110" fontSize="8.4" textAnchor="middle" className="fill-current text-muted-foreground">the new 2p electron sits higher in energy</text>
      <text x="190" y="128" fontSize="8.4" textAnchor="middle" className="fill-current text-muted-foreground">and is screened by 2s → easier to remove</text>
      <rect x="370" y="42" width="320" height="110" rx="10" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="530" y="64" fontSize="9.5" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="800">Dip 2: N → O</text>
      <text x="530" y="88" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">N 2p³ (half-filled) → O 2p⁴</text>
      <text x="530" y="110" fontSize="8.4" textAnchor="middle" className="fill-current text-muted-foreground">the 4th 2p electron must pair up —</text>
      <text x="530" y="128" fontSize="8.4" textAnchor="middle" className="fill-current text-muted-foreground">pair–pair repulsion makes it easier to eject</text>
      <rect x="30" y="166" width="660" height="40" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="184" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">Both dips are stability arguments: full/half-filled subshells resist losing electrons; their neighbours surrender one easily.</text>
      <text x="360" y="198" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Write the two configurations, name the effect — that structure scores the full mark either in period 2 or period 3 form.</text>
    </svg>
  );
}
