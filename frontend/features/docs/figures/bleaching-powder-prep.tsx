// BleachingPowderPrep figure. Theme-aware.
export function BleachingPowderPrep({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Hasenclever plant preparing bleaching powder from slaked lime and chlorine">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Bleaching powder — Ca(OH)₂ + Cl₂</text>
      <rect x="120" y="60" width="420" height="70" rx="10" fill="none" stroke="rgb(148 163 184)" strokeWidth="2" />
      <text x="330" y="82" fontSize="10.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">HASUNCLEVER PLANT — rotating drums</text>
      <text x="330" y="102" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">slaked lime tumbles; dry Cl₂ fed counter-current from below</text>
      <path d="M 120 118 C 200 140, 460 140, 540 118" stroke="rgb(16 185 129)" strokeWidth="2" strokeDasharray="4 3" markerEnd="url(#bpp-a)" />
      <text x="330" y="148" fontSize="9.5" fill="rgb(16 185 129)" textAnchor="middle">Cl₂ rises against the falling lime</text>
      <rect x="200" y="160" width="260" height="40" rx="8" fill="rgb(245 158 11)" opacity="0.12" stroke="rgb(245 158 11)" />
      <text x="330" y="178" fontSize="10.5" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">Ca(OH)₂ + Cl₂ → Ca(OCl)Cl + H₂O</text>
      <text x="330" y="194" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">calcium oxychloride — bleaching powder</text>
      <defs>
        <marker id="bpp-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(16 185 129)" /></marker>
      </defs>
      <text x="330" y="222" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">Store dry and sealed — air CO₂ + moisture slowly decompose it</text>
    </svg>
  );
}
