export function AlkeneFamilyPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">The alkene family CₙH₂ₙ</text>
      <rect x="60" y="50" width="160" height="55" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="140" y="72" fontSize="12" textAnchor="middle" fill="currentColor" fontWeight="600">CH₂=CH₂</text>
      <text x="140" y="92" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">ethene (C₂)</text>
      <rect x="250" y="50" width="160" height="55" rx="6" fill="none" stroke="rgb(16 185 129)" strokeWidth="1.5" />
      <text x="330" y="72" fontSize="11" textAnchor="middle" fill="currentColor" fontWeight="600">CH₃CH=CH₂</text>
      <text x="330" y="92" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">propene (C₃)</text>
      <rect x="440" y="50" width="160" height="55" rx="6" fill="none" stroke="rgb(245 158 11)" strokeWidth="1.5" />
      <text x="520" y="72" fontSize="11" textAnchor="middle" fill="currentColor" fontWeight="600">C₄H₈ isomers</text>
      <text x="520" y="92" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">butenes (C₄)</text>
      <rect x="60" y="130" width="540" height="50" rx="6" fill="none" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <text x="330" y="152" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Each CH₂ step adds 14 to the molar mass — the homologous ladder.</text>
      <text x="330" y="172" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Double bond position matters: but-1-ene ≠ but-2-ene (positional isomers).</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">CₙH₂ₙ — two hydrogens short of the alkane formula, one π bond to show for it.</text>
    </svg>
  );
}
