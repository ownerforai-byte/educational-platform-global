// CcVsSisiLadder figure. Theme-aware.
export function CcVsSisiLadder({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Bond energy comparison of carbon carbon versus silicon silicon self bonding">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Why carbon wins the catenation race</text>
      <text x="80" y="70" fontSize="11" fontWeight="800" fill="rgb(16 185 129)">C–C ≈ 348 kJ/mol</text>
      <rect x="80" y="80" width="430" height="26" rx="6" fill="rgb(16 185 129)" opacity="0.75" />
      <text x="80" y="140" fontSize="11" fontWeight="800" fill="rgb(59 130 246)">Si–Si ≈ 226 kJ/mol</text>
      <rect x="80" y="150" width="280" height="26" rx="6" fill="rgb(59 130 246)" opacity="0.75" />
      <text x="80" y="205" fontSize="10.5" className="fill-current text-muted-foreground">strong self-bond → chains of unlimited length (polyethylene: ~10⁵ carbons)</text>
      <text x="80" y="226" fontSize="10.5" className="fill-current text-muted-foreground">weak self-bond → silanes stop at a few units and are reactive</text>
    </svg>
  );
}
