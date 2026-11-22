// ResonanceHybridIdea figure. Theme-aware.
export function ResonanceHybridIdea({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Resonance hybrid of canonical structures concept">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Resonance — one molecule, several drawings</text>
      <rect x="40" y="55" width="160" height="70" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="120" y="86" fontSize="11" fontWeight="800" textAnchor="middle" fill="rgb(59 130 246)">canonical 1</text>
      <text x="120" y="108" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">one valid Lewis form</text>
      <text x="215" y="95" fontSize="16" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">↔</text>
      <rect x="240" y="55" width="160" height="70" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="320" y="86" fontSize="11" fontWeight="800" textAnchor="middle" fill="rgb(16 185 129)">canonical 2</text>
      <text x="320" y="108" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">same atoms, electrons moved</text>
      <text x="415" y="95" fontSize="16" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">=</text>
      <rect x="440" y="55" width="180" height="70" rx="10" fill="rgb(245 158 11)" opacity="0.12" stroke="rgb(245 158 11)" strokeWidth="2" />
      <text x="530" y="86" fontSize="11" fontWeight="800" textAnchor="middle" fill="rgb(245 158 11)">REAL HYBRID</text>
      <text x="530" y="108" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">more stable than any form</text>
      <text x="330" y="165" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">the molecule does NOT flip between forms — it IS the hybrid</text>
      <text x="330" y="192" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">electrons move between drawings; atoms never do (arrow ↔, never ⇌)</text>
    </svg>
  );
}
