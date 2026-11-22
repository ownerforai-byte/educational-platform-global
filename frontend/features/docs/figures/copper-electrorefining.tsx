// CopperElectrorefining figure. Theme-aware.
export function CopperElectrorefining({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Electrolytic refining tank for copper with impure anode pure cathode and anode mud">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Electrolytic refining of copper</text>
      <rect x="140" y="55" width="380" height="120" rx="10" fill="rgb(59 130 246)" opacity="0.08" stroke="rgb(59 130 246)" strokeWidth="2" />
      <text x="330" y="76" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">electrolyte: acidified CuSO₄ solution</text>
      <rect x="170" y="80" width="16" height="75" fill="rgb(239 68 68)" opacity="0.8" />
      <text x="178" y="172" fontSize="9.5" fill="rgb(239 68 68)" textAnchor="middle">impure Cu ANODE</text>
      <rect x="474" y="80" width="16" height="75" fill="rgb(59 130 246)" opacity="0.8" />
      <text x="482" y="172" fontSize="9.5" fill="rgb(59 130 246)" textAnchor="middle">pure Cu CATHODE</text>
      <path d="M 190 110 L 470 110" stroke="rgb(245 158 11)" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#cer-a)" />
      <text x="330" y="102" fontSize="10" textAnchor="middle" fill="rgb(245 158 11)">Cu²⁺ shuttles across</text>
      <ellipse cx="200" cy="160" rx="26" ry="7" fill="rgb(245 158 11)" opacity="0.6" />
      <text x="200" y="196" fontSize="9.5" fill="rgb(245 158 11)" textAnchor="middle">anode mud: Ag, Au, Pt</text>
      <defs>
        <marker id="cer-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(245 158 11)" /></marker>
      </defs>
      <text x="330" y="215" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">anode: Cu → Cu²⁺ + 2e⁻ · cathode: Cu²⁺ + 2e⁻ → Cu (99.99 %)</text>
    </svg>
  );
}
