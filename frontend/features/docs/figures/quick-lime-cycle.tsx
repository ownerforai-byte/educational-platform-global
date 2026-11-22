// QuickLimeCycle figure. Theme-aware.
export function QuickLimeCycle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Lime cycle from limestone through quick lime and slaked lime back to limestone">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The lime cycle</text>
      <rect x="60" y="60" width="160" height="60" rx="10" fill="rgb(148 163 184)" opacity="0.18" stroke="rgb(148 163 184)" />
      <text x="140" y="86" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">CaCO₃ limestone</text>
      <text x="140" y="106" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">chalk · marble · shell</text>
      <path d="M 225 90 L 290 90" stroke="rgb(239 68 68)" strokeWidth="2.5" markerEnd="url(#qlc-a)" />
      <text x="258" y="80" fontSize="9" textAnchor="middle" fill="rgb(239 68 68)">~1000 °C</text>
      <rect x="295" y="60" width="160" height="60" rx="10" fill="rgb(245 158 11)" opacity="0.14" stroke="rgb(245 158 11)" />
      <text x="375" y="86" fontSize="11.5" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">CaO quick lime</text>
      <text x="375" y="106" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">CaCO₃ → CaO + CO₂↑</text>
      <path d="M 460 90 L 520 90" stroke="rgb(59 130 246)" strokeWidth="2.5" markerEnd="url(#qlc-a)" />
      <text x="490" y="80" fontSize="9" textAnchor="middle" fill="rgb(59 130 246)">+ H₂O</text>
      <rect x="440" y="150" width="180" height="60" rx="10" fill="rgb(59 130 246)" opacity="0.12" stroke="rgb(59 130 246)" />
      <text x="530" y="176" fontSize="11.5" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">Ca(OH)₂ slaked lime</text>
      <text x="530" y="196" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">exothermic — lump cracks</text>
      <path d="M 440 180 C 300 200, 180 180, 140 125" stroke="rgb(16 185 129)" strokeWidth="2" fill="none" strokeDasharray="5 4" markerEnd="url(#qlc-a)" />
      <text x="255" y="205" fontSize="9.5" fill="rgb(16 185 129)" textAnchor="middle">+ CO₂ slowly → back to CaCO₃ (mortar sets)</text>
      <defs>
        <marker id="qlc-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(148 163 184)" /></marker>
      </defs>
    </svg>
  );
}
