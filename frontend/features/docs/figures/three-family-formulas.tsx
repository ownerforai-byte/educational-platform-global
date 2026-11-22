export function ThreeFamilyFormulas({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Three formulas, one ladder</text>
      <rect x="40" y="50" width="180" height="60" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="130" y="75" fontSize="15" textAnchor="middle" fill="currentColor" fontWeight="600">CₙH₂ₙ₊₂</text>
      <text x="130" y="97" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">alkane (sp³)</text>
      <rect x="240" y="50" width="180" height="60" rx="6" fill="none" stroke="rgb(16 185 129)" strokeWidth="1.5" />
      <text x="330" y="75" fontSize="15" textAnchor="middle" fill="currentColor" fontWeight="600">CₙH₂ₙ</text>
      <text x="330" y="97" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">alkene (sp²)</text>
      <rect x="440" y="50" width="180" height="60" rx="6" fill="none" stroke="rgb(245 158 11)" strokeWidth="1.5" />
      <text x="530" y="75" fontSize="15" textAnchor="middle" fill="currentColor" fontWeight="600">CₙH₂ₙ₋₂</text>
      <text x="530" y="97" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">alkyne (sp)</text>
      <rect x="60" y="130" width="540" height="50" rx="6" fill="none" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <text x="330" y="152" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Each π bond costs two hydrogens — the formulas are a hydrogen budget.</text>
      <text x="330" y="172" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Same n across families: identical carbon count, different unsaturation.</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">C₂H₆ · C₂H₄ · C₂H₂ — ethane, ethene, ethyne: the whole story in six symbols.</text>
    </svg>
  );
}
