export function RadicalMechanismSteps({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Free-radical chlorination — three acts</text>
      <rect x="30" y="45" width="190" height="55" rx="6" fill="none" stroke="rgb(239 68 68)" strokeWidth="1.5" />
      <text x="125" y="68" fontSize="12" textAnchor="middle" fill="rgb(239 68 68)" fontWeight="600">Initiation</text>
      <text x="125" y="88" fontSize="11" textAnchor="middle" fill="currentColor">Cl₂ → 2Cl· (hν)</text>
      <rect x="235" y="45" width="190" height="55" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="330" y="68" fontSize="12" textAnchor="middle" fill="rgb(59 130 246)" fontWeight="600">Propagation</text>
      <text x="330" y="88" fontSize="10" textAnchor="middle" fill="currentColor">Cl·+CH₄→CH₃·+HCl</text>
      <text x="330" y="102" fontSize="9" textAnchor="middle" fill="currentColor">CH₃·+Cl₂→CH₃Cl+Cl·</text>
      <rect x="440" y="45" width="190" height="55" rx="6" fill="none" stroke="rgb(16 185 129)" strokeWidth="1.5" />
      <text x="535" y="68" fontSize="12" textAnchor="middle" fill="rgb(16 185 129)" fontWeight="600">Termination</text>
      <text x="535" y="88" fontSize="10" textAnchor="middle" fill="currentColor">Cl·+Cl· / CH₃·+Cl·</text>
      <text x="535" y="102" fontSize="9" textAnchor="middle" fill="currentColor">CH₃·+CH₃·→C₂H₆</text>
      <line x1="220" y1="72" x2="235" y2="72" stroke="rgb(148 163 184)" strokeWidth="2" />
      <line x1="425" y1="72" x2="440" y2="72" stroke="rgb(148 163 184)" strokeWidth="2" />
      <text x="330" y="140" fontSize="12" textAnchor="middle" fill="rgb(148 163 184)">Light (or heat) homolyses Cl₂ — the chain then runs itself.</text>
      <rect x="60" y="160" width="540" height="45" rx="6" fill="none" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <text x="330" y="182" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Trace ethane among products is the fingerprint of CH₃·+CH₃· termination — proof the mechanism is radical.</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">NEB 2020: the mechanism with its three steps and the ethane trace.</text>
    </svg>
  );
}
