// WohlerVerdictPanel figure. Theme-aware.
export function WohlerVerdictPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="What Wohler's synthesis disproved and what distinction survived">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Wöhler's verdict: what died, what survived</text>
      <rect x="40" y="55" width="280" height="120" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="180" y="82" fontSize="12" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">DIED in 1828</text>
      <text x="180" y="108" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">vital force theory</text>
      <text x="180" y="130" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">"organics need a living force"</text>
      <text x="180" y="152" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">origin no longer defines the subject</text>
      <rect x="340" y="55" width="280" height="120" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="480" y="82" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">SURVIVES today</text>
      <text x="480" y="108" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">the behavioural distinction</text>
      <text x="480" y="130" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">numbers, properties, methods</text>
      <text x="480" y="152" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">still justify the separate study</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">The border moved from "where compounds come from" to "how they behave"</text>
    </svg>
  );
}
