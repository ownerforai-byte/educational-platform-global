export function CarbonCountRules({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Carbon accounting across the four routes</text>
      <rect x="30" y="45" width="140" height="55" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="100" y="68" fontSize="12" textAnchor="middle" fill="currentColor" fontWeight="600">Reduction</text>
      <text x="100" y="88" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">n stays same</text>
      <rect x="185" y="45" width="140" height="55" rx="6" fill="none" stroke="rgb(16 185 129)" strokeWidth="1.5" />
      <text x="255" y="68" fontSize="12" textAnchor="middle" fill="currentColor" fontWeight="600">Wurtz</text>
      <text x="255" y="88" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">2n − 2H + 1</text>
      <rect x="340" y="45" width="140" height="55" rx="6" fill="none" stroke="rgb(245 158 11)" strokeWidth="1.5" />
      <text x="410" y="68" fontSize="12" textAnchor="middle" fill="currentColor" fontWeight="600">Decarboxylation</text>
      <text x="410" y="88" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">n − 1</text>
      <rect x="495" y="45" width="140" height="55" rx="6" fill="none" stroke="rgb(139 92 246)" strokeWidth="1.5" />
      <text x="565" y="68" fontSize="12" textAnchor="middle" fill="currentColor" fontWeight="600">Hydrogenation</text>
      <text x="565" y="88" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">n stays same</text>
      <line x1="100" y1="100" x2="100" y2="125" stroke="rgb(148 163 184)" strokeWidth="2" />
      <line x1="255" y1="100" x2="255" y2="125" stroke="rgb(148 163 184)" strokeWidth="2" />
      <line x1="410" y1="100" x2="410" y2="125" stroke="rgb(148 163 184)" strokeWidth="2" />
      <line x1="565" y1="100" x2="565" y2="125" stroke="rgb(148 163 184)" strokeWidth="2" />
      <rect x="120" y="125" width="420" height="55" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="2" />
      <text x="330" y="148" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Alkane CₙH₂ₙ₊₂</text>
      <text x="330" y="168" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">CH₃Br→C₁ · 2CH₃Br→C₂ · CH₃COONa→C₁ · CH₂=CH₂→C₂</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Before any mechanism question, count carbons — it disqualifies half the options.</text>
    </svg>
  );
}
