export function ControlledOxidationEthane({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Oxidation of ethane — complete vs controlled</text>
      <rect x="40" y="50" width="170" height="55" rx="6" fill="none" stroke="rgb(239 68 68)" strokeWidth="1.5" />
      <text x="125" y="72" fontSize="12" textAnchor="middle" fill="rgb(239 68 68)" fontWeight="600">Excess O₂</text>
      <text x="125" y="92" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">complete</text>
      <line x1="225" y1="77" x2="265" y2="77" stroke="rgb(148 163 184)" strokeWidth="2" markerEnd="url(#ar113f)" />
      <marker id="ar113f" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgb(148 163 184)" /></marker>
      <rect x="280" y="50" width="130" height="55" rx="6" fill="none" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <text x="345" y="72" fontSize="12" textAnchor="middle" fill="currentColor">CO₂ + H₂O</text>
      <text x="345" y="92" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">+ 372 kcal</text>
      <rect x="40" y="130" width="170" height="55" rx="6" fill="none" stroke="rgb(245 158 11)" strokeWidth="1.5" />
      <text x="125" y="152" fontSize="12" textAnchor="middle" fill="rgb(245 158 11)" fontWeight="600">Controlled O₂</text>
      <text x="125" y="172" fontSize="9" textAnchor="middle" fill="rgb(148 163 184)">(heated Cu, 100 atm)</text>
      <line x1="225" y1="157" x2="265" y2="157" stroke="rgb(148 163 184)" strokeWidth="2" markerEnd="url(#ar113f)" />
      <marker id="ar113f" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgb(148 163 184)" /></marker>
      <rect x="280" y="130" width="130" height="55" rx="6" fill="none" stroke="rgb(16 185 129)" strokeWidth="2" />
      <text x="345" y="152" fontSize="12" textAnchor="middle" fill="rgb(16 185 129)" fontWeight="600">CH₃CHO</text>
      <text x="345" y="172" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">acetaldehyde</text>
      <rect x="430" y="50" width="200" height="135" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="530" y="75" fontSize="11" textAnchor="middle" fill="rgb(59 130 246)" fontWeight="600">Incomplete oxidation</text>
      <text x="530" y="100" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">limited O₂ stops at</text>
      <text x="530" y="120" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">the aldehyde — value</text>
      <text x="530" y="140" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">added to the fuel instead</text>
      <text x="530" y="160" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">of burning it away.</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Same molecule, two oxygen budgets, two destinations.</text>
    </svg>
  );
}
