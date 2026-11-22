// CatenationCountContrast figure. Theme-aware.
export function CatenationCountContrast({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Vast difference in the number of known organic versus inorganic compounds">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The count gap</text>
      <rect x="60" y="60" width="180" height="120" rx="10" fill="rgb(148 163 184)" opacity="0.12" stroke="rgb(148 163 184)" />
      <text x="150" y="90" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">inorganic</text>
      <rect x="90" y="105" width="120" height="10" rx="4" fill="rgb(148 163 184)" opacity="0.5" />
      <text x="150" y="140" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">~ hundreds of thousands</text>
      <rect x="300" y="60" width="180" height="120" rx="10" fill="rgb(16 185 129)" opacity="0.12" stroke="rgb(16 185 129)" />
      <text x="390" y="90" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">organic</text>
      <rect x="330" y="105" width="120" height="10" rx="4" fill="rgb(16 185 129)" />
      <text x="390" y="132" fontSize="13" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">tens of MILLIONS</text>
      <text x="390" y="155" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">growing by millions per decade</text>
      <text x="530" y="90" fontSize="10" fontWeight="800" fill="rgb(59 130 246)">the engine:</text>
      <text x="530" y="110" fontSize="9.5" className="fill-current text-muted-foreground">catenation</text>
      <text x="530" y="126" fontSize="9.5" className="fill-current text-muted-foreground">functional groups</text>
      <text x="530" y="142" fontSize="9.5" className="fill-current text-muted-foreground">isomerism</text>
      <text x="330" y="210" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Carbon chains of unlimited length × attachable groups × many skeletons = the explosion</text>
    </svg>
  );
}
