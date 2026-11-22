// C14 dating panel. Theme-aware.
export function C14DatingPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 220" className={className} role="img" aria-label="Carbon fourteen dating with 5730 year half-life decay curve">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">¹⁴C: the radioactive clock (t½ = 5730 y)</text>
      <path d="M 80 70 Q 250 70 330 130 T 580 180" stroke="rgb(239 68 68)" strokeWidth="3" fill="none" />
      <line x1="80" y1="60" x2="80" y2="180" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" />
      <line x1="80" y1="180" x2="590" y2="180" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" />
      <text x="90" y="56" fontSize="10" className="fill-current text-muted-foreground">¹⁴C activity</text>
      <text x="560" y="196" fontSize="10" textAnchor="end" className="fill-current text-muted-foreground">time since death</text>
      <text x="360" y="110" fontSize="10.5" fill="rgb(239 68 68)">activity halves every 5730 years</text>
      <text x="330" y="212" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Living things exchange carbon; after death the ¹⁴C drains — count what's left, date the bone</text>
    </svg>
  );
}
