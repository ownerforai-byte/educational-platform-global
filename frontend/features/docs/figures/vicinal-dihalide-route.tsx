export function VicinalDihalideRoute({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Vicinal dihalide → alkyne: two eliminations</text>
      <rect x="40" y="50" width="220" height="55" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="150" y="72" fontSize="12" textAnchor="middle" fill="currentColor" fontWeight="600">BrCH₂CH₂Br</text>
      <text x="150" y="92" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">1,2-dibromoethane</text>
      <line x1="275" y1="77" x2="315" y2="77" stroke="rgb(245 158 11)" strokeWidth="2" markerEnd="url(#ar116c)" />
      <marker id="ar116c" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgb(245 158 11)" /></marker>
      <text x="295" y="64" fontSize="9" textAnchor="middle" fill="rgb(245 158 11)">alc. KOH</text>
      <rect x="330" y="50" width="140" height="55" rx="6" fill="none" stroke="rgb(139 92 246)" strokeWidth="1.5" />
      <text x="400" y="72" fontSize="11" textAnchor="middle" fill="currentColor" fontWeight="600">CH₂=CHBr</text>
      <text x="400" y="92" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">vinyl halide</text>
      <line x1="485" y1="77" x2="525" y2="77" stroke="rgb(239 68 68)" strokeWidth="2" markerEnd="url(#ar116c)" />
      <marker id="ar116c" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgb(239 68 68)" /></marker>
      <text x="505" y="64" fontSize="9" textAnchor="middle" fill="rgb(239 68 68)">strong base</text>
      <rect x="40" y="130" width="580" height="55" rx="6" fill="none" stroke="rgb(16 185 129)" strokeWidth="2" />
      <text x="330" y="152" fontSize="12" textAnchor="middle" fill="rgb(16 185 129)" fontWeight="600">BrCH₂CH₂Br + 2KOH → HC≡CH + 2KBr + 2H₂O</text>
      <text x="330" y="172" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">first elimination easy; second strips HX off an sp² carbon</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Modern practice: NaNH₂ in liquid NH₃ for the tougher second step.</text>
    </svg>
  );
}
