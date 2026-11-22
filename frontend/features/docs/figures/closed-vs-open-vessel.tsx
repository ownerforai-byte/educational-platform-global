// Closed vessel enables equilibrium; open vessel drives completion. Theme-aware.
export function ClosedVsOpenVessel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 250" className={className} role="img" aria-label="In a closed vessel products accumulate and push back to equilibrium, while in an open vessel escaping products let the reaction go to completion">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">The lid decides the outcome</text>
      <rect x="60" y="70" width="150" height="110" rx="8" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
      <line x1="50" y1="70" x2="220" y2="70" stroke="currentColor" strokeWidth="4" className="text-foreground" />
      <text x="90" y="100" fontSize="12" fontWeight="800" className="fill-current text-foreground">closed flask</text>
      <circle cx="105" cy="140" r="9" fill="rgb(59 130 246)" />
      <circle cx="135" cy="150" r="9" fill="rgb(16 185 129)" />
      <circle cx="165" cy="135" r="9" fill="rgb(16 185 129)" />
      <text x="60" y="205" fontSize="11" className="fill-current text-muted-foreground">products stay and push back - equilibrium</text>
      <rect x="400" y="70" width="150" height="110" rx="8" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
      <text x="430" y="100" fontSize="12" fontWeight="800" className="fill-current text-foreground">open dish</text>
      <circle cx="445" cy="140" r="9" fill="rgb(59 130 246)" />
      <circle cx="475" cy="150" r="9" fill="rgb(16 185 129)" />
      <path d="M 492 132 q 14 -14 10 -30" stroke="rgb(16 185 129)" strokeWidth="2" fill="none" strokeDasharray="3 3" />
      <text x="510" y="112" fontSize="10.5" fill="rgb(16 185 129)">escapes!</text>
      <text x="400" y="205" fontSize="11" className="fill-current text-muted-foreground">products leave - reverse never builds - completion</text>
      <text x="330" y="240" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Equilibrium needs a sealed system so the reverse reaction can grow</text>
    </svg>
  );
}
