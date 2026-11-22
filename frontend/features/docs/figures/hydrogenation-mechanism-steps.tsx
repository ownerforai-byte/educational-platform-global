export function HydrogenationMechanismSteps({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Ethene → ethane: three surface acts</text>
      <rect x="30" y="50" width="190" height="55" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="125" y="72" fontSize="12" textAnchor="middle" fill="rgb(59 130 246)" fontWeight="600">1. Adsorption</text>
      <text x="125" y="92" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">both gases stick to Ni</text>
      <rect x="235" y="50" width="190" height="55" rx="6" fill="none" stroke="rgb(245 158 11)" strokeWidth="1.5" />
      <text x="330" y="72" fontSize="12" textAnchor="middle" fill="rgb(245 158 11)" fontWeight="600">2. Syn addition</text>
      <text x="330" y="92" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">H atoms add same side</text>
      <rect x="440" y="50" width="190" height="55" rx="6" fill="none" stroke="rgb(16 185 129)" strokeWidth="1.5" />
      <text x="535" y="72" fontSize="12" textAnchor="middle" fill="rgb(16 185 129)" fontWeight="600">3. Desorption</text>
      <text x="535" y="92" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">ethane leaves surface</text>
      <line x1="220" y1="77" x2="235" y2="77" stroke="rgb(148 163 184)" strokeWidth="2" />
      <line x1="425" y1="77" x2="440" y2="77" stroke="rgb(148 163 184)" strokeWidth="2" />
      <rect x="60" y="130" width="540" height="50" rx="6" fill="none" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <text x="330" y="152" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">The metal splits H–H into atoms — the real hydrogenating agent is surface-bound H.</text>
      <text x="330" y="172" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Both H’s arrive from the same face → syn stereochemistry.</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">NEB 2023/2024: name the three steps in order — adsorption, addition, desorption.</text>
    </svg>
  );
}
