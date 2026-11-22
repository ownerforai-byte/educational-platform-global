// Le Chatelier statement panel. Theme-aware.
export function LeChatelierStatement({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 220" className={className} role="img" aria-label="Le Chatelier's principle statement: an equilibrium system shifts to oppose an imposed change">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Le Chatelier, 1888</text>
      <rect x="40" y="50" width="580" height="70" rx="10" className="fill-current" style={{ color: "rgb(168 85 247)" }} opacity="0.14" />
      <text x="60" y="80" fontSize="13.5" fontWeight="800" className="fill-current text-foreground">"When a system at equilibrium is disturbed, it shifts</text>
      <text x="60" y="102" fontSize="13.5" fontWeight="800" className="fill-current text-foreground">in the direction that OPPOSES the disturbance."</text>
      <rect x="40" y="138" width="180" height="52" rx="9" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity="0.14" />
      <text x="130" y="170" fontSize="12.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">concentration</text>
      <rect x="240" y="138" width="180" height="52" rx="9" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.14" />
      <text x="330" y="170" fontSize="12.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">pressure</text>
      <rect x="440" y="138" width="180" height="52" rx="9" className="fill-current" style={{ color: "rgb(239 68 68)" }} opacity="0.14" />
      <text x="530" y="170" fontSize="12.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">temperature</text>
      <text x="330" y="212" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Three levers, one reflex: push, and chemistry pushes back</text>
    </svg>
  );
}
