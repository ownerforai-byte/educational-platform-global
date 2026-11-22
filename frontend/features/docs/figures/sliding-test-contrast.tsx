// Sliding test contrast: metal bends, ionic crystal shatters. Theme-aware.
export function SlidingTestContrast({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 680 280" className={className} role="img" aria-label="Sliding test contrast showing metal layers sliding and staying bonded through the electron sea while ionic layers sliding bring like charges together and shatter">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">The sliding test: metal bends, salt shatters</text>
      <rect x="24" y="50" width="300" height="190" rx="12" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.10" />
      <rect x="24" y="50" width="300" height="190" rx="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="174" y="80" fontSize="13" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Metal: layers slide, bond holds</text>
      {[[70, 130], [140, 130], [210, 130], [280, 130], [100, 170], [170, 170], [240, 170]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="12" className="fill-current" style={{ color: "rgb(245 158 11)" }} opacity="0.3" />
      ))}
      <text x="174" y="220" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">electron sea re-adjusts - malleable</text>
      <rect x="356" y="50" width="300" height="190" rx="12" className="fill-current" style={{ color: "rgb(244 63 94)" }} opacity="0.10" />
      <rect x="356" y="50" width="300" height="190" rx="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="506" y="80" fontSize="13" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Ionic: layers slide, like charges meet</text>
      {[[400, 130], [470, 130], [540, 130], [435, 170], [505, 170], [575, 170]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="12" className="fill-current" style={{ color: i < 3 ? "rgb(245 158 11)" : "rgb(16 185 129)" }} opacity="0.3" />
      ))}
      <text x="506" y="220" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">repulsion cleaves the crystal - brittle</text>
      <text x="340" y="264" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">One geometric fact explains malleability versus brittleness</text>
    </svg>
  );
}
