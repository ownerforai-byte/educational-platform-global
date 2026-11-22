// NitrateSplitPanel figure. Theme-aware.
export function NitrateSplitPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Different decomposition products of group two nitrates on heating">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Nitrates — two product families</text>
      <rect x="40" y="60" width="280" height="120" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="180" y="84" fontSize="12" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">Be, Mg — all the way to OXIDE</text>
      <text x="180" y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">2Mg(NO₃)₂ → 2MgO + 4NO₂↑ + O₂↑</text>
      <text x="180" y="134" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">brown fumes + splint-relighting gas</text>
      <text x="180" y="156" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">even the nitrite cannot survive</text>
      <rect x="340" y="60" width="280" height="120" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="480" y="84" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">Ca, Sr, Ba — stop at NITRITE</text>
      <text x="480" y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">Ba(NO₃)₂ → Ba(NO₂)₂ + O₂↑</text>
      <text x="480" y="134" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">only oxygen is lost</text>
      <text x="480" y="156" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">the anion framework survives</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">The dividing line sits between Mg and Ca — where polarising power drops below the threshold</text>
    </svg>
  );
}
