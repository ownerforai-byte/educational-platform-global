// Starch helix iodine complex. Theme-aware.
export function StarchHelixComplex({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 230" className={className} role="img" aria-label="Iodine molecules inside the amylose helix forming the blue-black charge transfer complex reversible with heat">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">The guest in the helix</text>
      <path d="M 150 70 q 40 -20 80 0 t 80 0 t 80 0 t 80 0" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" className="text-muted-foreground" opacity="0.35" />
      <path d="M 150 70 q 40 -20 80 0 t 80 0 t 80 0 t 80 0" fill="none" stroke="currentColor" strokeWidth="2" className="text-foreground" opacity="0.6" />
      {[200, 280, 360, 440].map((x, i) => (
        <circle key={i} cx={x} cy={i % 2 ? 78 : 60} r="7" className="fill-current" style={{ color: "rgb(124 58 237)" }} opacity="0.8" />
      ))}
      <text x="330" y="120" fontSize="11.5" textAnchor="middle" className="fill-current text-foreground">I₂ / I₃⁻ guests inside the amylose helix</text>
      <rect x="80" y="140" width="240" height="50" rx="9" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity="0.13" />
      <text x="200" y="162" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">heat → complex disrupted</text>
      <text x="200" y="180" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">blue fades</text>
      <rect x="340" y="140" width="240" height="50" rx="9" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.13" />
      <text x="460" y="162" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">cool → helix re-entaps</text>
      <text x="460" y="180" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">blue returns</text>
      <text x="330" y="216" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">A physical guest–host complex — which is why it is reversible</text>
    </svg>
  );
}
