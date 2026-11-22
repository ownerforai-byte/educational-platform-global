// 22.4 L molar volume at STP. Theme-aware.
export function StpMolarVolumePanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Molar volume twenty two point four litres at STP cube representation one mole any gas same volume different masses">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">22.4 L at STP — the box every gas fills</text>
      <rect x="60" y="46" width="150" height="100" rx="10" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.8" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="135" y="88" fontSize="11" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">22.4 L</text>
      <text x="135" y="110" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">H₂ — 2 g</text>
      <rect x="230" y="46" width="150" height="100" rx="10" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.8" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="305" y="88" fontSize="11" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="800">22.4 L</text>
      <text x="305" y="110" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">O₂ — 32 g</text>
      <rect x="400" y="46" width="150" height="100" rx="10" className="fill-current text-violet-500/10" stroke="currentColor" strokeWidth="1.8" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="475" y="88" fontSize="11" textAnchor="middle" className="fill-current text-violet-600" fontWeight="800">22.4 L</text>
      <text x="475" y="110" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">CO₂ — 44 g</text>
      <rect x="570" y="46" width="120" height="100" rx="10" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="630" y="82" fontSize="9" textAnchor="middle" className="fill-current text-amber-600" fontWeight="800">same box,</text>
      <text x="630" y="98" fontSize="9" textAnchor="middle" className="fill-current text-amber-600" fontWeight="800">same count:</text>
      <text x="630" y="116" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">6.022 × 10²³</text>
      <text x="630" y="132" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">molecules each</text>
      <rect x="30" y="160" width="660" height="40" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="178" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">STP = 273 K, 1 atm (760 mm Hg). Different T/P changes the volume — the mole count never changes.</text>
      <text x="360" y="192" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Workhorse conversion: volume at STP (L) ÷ 22.4 = moles — used in almost every gaseous numerical.</text>
    </svg>
  );
}
