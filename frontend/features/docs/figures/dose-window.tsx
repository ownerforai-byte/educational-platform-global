// DoseWindow figure. Theme-aware.
export function DoseWindow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Window of safety showing deficiency toxicity and essential dose range">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The window of safety</text>
      <path d="M 60 170 L 60 170" stroke="none" />
      <rect x="60" y="80" width="150" height="60" rx="0" fill="rgb(239 68 68)" opacity="0.15" />
      <rect x="210" y="60" width="240" height="80" rx="0" fill="rgb(16 185 129)" opacity="0.18" />
      <rect x="450" y="80" width="150" height="60" rx="0" fill="rgb(239 68 68)" opacity="0.15" />
      <text x="135" y="115" fontSize="11" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">too little</text>
      <text x="135" y="133" fontSize="9.5" fill="rgb(239 68 68)" textAnchor="middle">deficiency disease</text>
      <text x="330" y="95" fontSize="11" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">the window</text>
      <text x="330" y="113" fontSize="9.5" fill="rgb(16 185 129)" textAnchor="middle">essential and safe</text>
      <text x="525" y="115" fontSize="11" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">too much</text>
      <text x="525" y="133" fontSize="9.5" fill="rgb(239 68 68)" textAnchor="middle">toxicity</text>
      <path d="M 60 160 L 600 160" stroke="rgb(148 163 184)" strokeWidth="2" markerEnd="url(#dw-a)" />
      <text x="330" y="182" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">dose →</text>
      <text x="330" y="210" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Pb, Hg, Cd, As have NO window — no useful role at any dose</text>
      <defs>
        <marker id="dw-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(148 163 184)" /></marker>
      </defs>
    </svg>
  );
}
