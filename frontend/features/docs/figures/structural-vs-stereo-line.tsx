// StructuralVsStereoLine figure. Theme-aware.
export function StructuralVsStereoLine({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Structural isomers differ in connectivity stereoisomers in arrangement">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">One line separates the two great branches</text>
      <rect x="40" y="55" width="280" height="120" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="180" y="82" fontSize="12" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">STRUCTURAL</text>
      <text x="180" y="110" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">atoms joined to DIFFERENT atoms</text>
      <text x="180" y="136" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">connectivity differs — rewire the molecule</text>
      <text x="180" y="158" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">detectable from the formula + constitution</text>
      <rect x="340" y="55" width="280" height="120" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="480" y="82" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">STEREO</text>
      <text x="480" y="110" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">atoms joined to the SAME atoms</text>
      <text x="480" y="136" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">arrangement in space differs — rotate/flip</text>
      <text x="480" y="158" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">needs geometry (cis/trans) or a mirror (d/l)</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">connectivity is the dividing line — everything else follows</text>
    </svg>
  );
}
