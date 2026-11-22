// TautomerismDemo figure. Theme-aware.
export function TautomerismDemo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Tautomerism keto enol dynamic equilibrium with proton shift">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Tautomerism — a live, two-way equilibrium</text>
      <rect x="40" y="60" width="240" height="80" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="160" y="90" fontSize="12" fontWeight="800" textAnchor="middle" fill="rgb(59 130 246)">KETO form</text>
      <text x="160" y="118" fontSize="11.5" textAnchor="middle" className="fill-current text-foreground">CH₃–CO–CH₂–R</text>
      <rect x="380" y="60" width="240" height="80" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="500" y="90" fontSize="12" fontWeight="800" textAnchor="middle" fill="rgb(16 185 129)">ENOL form</text>
      <text x="500" y="118" fontSize="11.5" textAnchor="middle" className="fill-current text-foreground">CH₃–C(OH)=CH–R</text>
      <path d="M 285 100 L 375 100" stroke="rgb(245 158 11)" strokeWidth="2.5" markerEnd="url(#ttd-a)" />
      <path d="M 375 112 L 285 112" stroke="rgb(245 158 11)" strokeWidth="2.5" markerEnd="url(#ttd-b)" />
      <text x="330" y="92" fontSize="9.5" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">H shift</text>
      <text x="330" y="170" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">a proton migrates carbon → oxygen while a double bond moves — the isomers interconvert</text>
      <text x="330" y="196" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">unlike other isomerisms, tautomers coexist in dynamic equilibrium (usually keto dominates)</text>
      <defs>
        <marker id="ttd-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(245 158 11)" /></marker>
        <marker id="ttd-b" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(245 158 11)" /></marker>
      </defs>
    </svg>
  );
}
