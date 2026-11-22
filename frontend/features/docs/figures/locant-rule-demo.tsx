// LocantRuleDemo figure. Theme-aware.
export function LocantRuleDemo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Lowest locant rule demonstrated on two numberings of pentane">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The lowest-locant rule</text>
      <rect x="40" y="55" width="280" height="110" rx="10" fill="rgb(239 68 68)" opacity="0.08" stroke="rgb(239 68 68)" />
      <text x="180" y="80" fontSize="11.5" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">WRONG direction</text>
      <text x="180" y="105" fontSize="12" textAnchor="middle" className="fill-current text-foreground">C5 C4 C3 C2 C1 → 4-methylpentane</text>
      <text x="180" y="130" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">locant set (4) — high, rejected</text>
      <rect x="340" y="55" width="280" height="110" rx="10" fill="rgb(16 185 129)" opacity="0.08" stroke="rgb(16 185 129)" />
      <text x="480" y="80" fontSize="11.5" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">CORRECT direction</text>
      <text x="480" y="105" fontSize="12" textAnchor="middle" className="fill-current text-foreground">C1 C2 C3 C4 C5 → 2-methylpentane</text>
      <text x="480" y="130" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">locant set (2) — lowest wins</text>
      <text x="330" y="200" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">Number from the end that gives substituents the smallest numbers</text>
    </svg>
  );
}
