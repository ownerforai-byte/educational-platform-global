export function DehydrohalogenationPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Dehydrohalogenation — alcoholic KOH, not aqueous</text>
      <rect x="50" y="55" width="230" height="55" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="165" y="77" fontSize="12" textAnchor="middle" fill="currentColor" fontWeight="600">CH₃CH₂Br + KOH</text>
      <text x="165" y="97" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">alcoholic, heat</text>
      <line x1="295" y1="82" x2="340" y2="82" stroke="rgb(245 158 11)" strokeWidth="2" markerEnd="url(#ar114c)" />
      <marker id="ar114c" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgb(245 158 11)" /></marker>
      <rect x="355" y="55" width="240" height="55" rx="6" fill="none" stroke="rgb(16 185 129)" strokeWidth="2" />
      <text x="475" y="77" fontSize="11" textAnchor="middle" fill="rgb(16 185 129)" fontWeight="600">CH₂=CH₂ + KBr + H₂O</text>
      <text x="475" y="97" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">ethene</text>
      <rect x="60" y="130" width="540" height="50" rx="6" fill="none" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <text x="330" y="152" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Aqueous KOH substitutes (gives alcohol); alcoholic KOH eliminates (gives alkene).</text>
      <text x="330" y="172" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">β-elimination: H leaves the neighbour carbon, X leaves its own — both must be adjacent.</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">The solvent is the switch here, just as temperature was for dehydration.</text>
    </svg>
  );
}
