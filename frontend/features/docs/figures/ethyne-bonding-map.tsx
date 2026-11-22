// Ethyne bonding map: linear with two perpendicular pi clouds. Theme-aware.
export function EthyneBondingMap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 280" className={className} role="img" aria-label="Ethyne bonding map with sp hybridised carbons linear geometry one sigma framework and two perpendicular pi clouds in the triple bond">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Ethyne: sp carbons, 1 sigma + 2 pi</text>
      <circle cx="250" cy="140" r="14" className="fill-current" opacity="0.3" />
      <text x="250" y="145" fontSize="11" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">C</text>
      <circle cx="410" cy="140" r="14" className="fill-current" opacity="0.3" />
      <text x="410" y="145" fontSize="11" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">C</text>
      <line x1="264" y1="140" x2="396" y2="140" stroke="currentColor" strokeWidth="3" />
      <circle cx="150" cy="140" r="10" className="fill-current" opacity="0.2" />
      <text x="150" y="144" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">H</text>
      <circle cx="510" cy="140" r="10" className="fill-current" opacity="0.2" />
      <text x="510" y="144" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">H</text>
      <line x1="164" y1="140" x2="236" y2="140" stroke="currentColor" strokeWidth="2" />
      <line x1="424" y1="140" x2="500" y2="140" stroke="currentColor" strokeWidth="2" />
      <ellipse cx="330" cy="112" rx="60" ry="12" className="fill-current" style={{ color: "rgb(139 92 246)" }} opacity="0.25" />
      <ellipse cx="330" cy="168" rx="60" ry="12" className="fill-current" style={{ color: "rgb(139 92 246)" }} opacity="0.25" />
      <ellipse cx="330" cy="140" rx="60" ry="10" className="fill-current" style={{ color: "rgb(245 158 11)" }} opacity="0.18" />
      <text x="330" y="216" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">two perpendicular pi clouds wrap the sigma axis</text>
      <text x="330" y="242" fontSize="11.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">linear 180 degrees, C=C 120 pm, strongest C-H bonds</text>
    </svg>
  );
}
