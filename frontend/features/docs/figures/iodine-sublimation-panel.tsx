// Iodine sublimation panel. Theme-aware.
export function IodineSublimationPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 220" className={className} role="img" aria-label="Iodine subliming from grey black crystals to violet vapour and depositing back on the cold surface">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Sublimation: solid to violet cloud and back</text>
      <rect x="100" y="120" width="460" height="50" rx="8" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity="0.12" />
      <text x="330" y="150" fontSize="11.5" textAnchor="middle" className="fill-current text-foreground">beaker / dish with I₂ crystals</text>
      <polygon points="180,120 210,120 195,90" className="fill-current" style={{ color: "rgb(124 58 237)" }} opacity="0.4" />
      <polygon points="440,120 470,120 455,90" className="fill-current" style={{ color: "rgb(124 58 237)" }} opacity="0.4" />
      <ellipse cx="330" cy="85" rx="150" ry="22" className="fill-current" style={{ color: "rgb(124 58 237)" }} opacity="0.3" />
      <text x="330" y="90" fontSize="11" textAnchor="middle" className="fill-current text-foreground">violet vapour</text>
      <rect x="120" y="46" width="420" height="12" rx="6" className="fill-current" style={{ color: "rgb(148 163 184)" }} opacity="0.4" />
      <text x="330" y="40" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">cold funnel / watch glass — crystals deposit</text>
      <text x="330" y="196" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Grey-black lustrous solid → violet gas → back to solid, no liquid stage</text>
    </svg>
  );
}
