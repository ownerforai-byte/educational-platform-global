// Amalgam figure. Theme-aware.
export function AmalgamPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Amalgam panel showing sodium amalgam dental amalgam and the iron exception">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Amalgam — the mercury alloys</text>
      <rect x="30" y="55" width="190" height="120" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="125" y="80" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">Na–Hg</text>
      <text x="125" y="102" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">sodium tamed by dilution</text>
      <text x="125" y="122" fontSize="10" textAnchor="middle" className="fill-current text-foreground">Na–Hg + H₂O →</text>
      <text x="125" y="140" fontSize="10" textAnchor="middle" className="fill-current text-foreground">NaOH + Hg + ½H₂</text>
      <text x="125" y="160" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">Hg recovered</text>
      <rect x="235" y="55" width="190" height="120" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="330" y="80" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">Ag–Sn–Hg</text>
      <text x="330" y="102" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">dental amalgam</text>
      <text x="330" y="126" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">sets in the tooth,</text>
      <text x="330" y="144" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">wears for decades</text>
      <rect x="440" y="55" width="190" height="120" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="535" y="80" fontSize="12" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">Fe — the exception</text>
      <text x="535" y="102" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">iron wets not, dissolves not</text>
      <text x="535" y="126" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">→ mercury ships in</text>
      <text x="535" y="144" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">iron flasks</text>
      <text x="330" y="205" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">An amalgam is an alloy in which one component is mercury</text>
    </svg>
  );
}
