export function SpAcidityLadder({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Acidity ladder — s-character is the engine</text>
      <rect x="60" y="50" width="160" height="55" rx="6" fill="none" stroke="rgb(16 185 129)" strokeWidth="2" />
      <text x="140" y="72" fontSize="12" textAnchor="middle" fill="rgb(16 185 129)" fontWeight="600">Alkyne sp</text>
      <text x="140" y="92" fontSize="11" textAnchor="middle" fill="currentColor">pKa ≈ 25</text>
      <rect x="250" y="50" width="160" height="55" rx="6" fill="none" stroke="rgb(245 158 11)" strokeWidth="1.5" />
      <text x="330" y="72" fontSize="12" textAnchor="middle" fill="rgb(245 158 11)" fontWeight="600">Alkene sp²</text>
      <text x="330" y="92" fontSize="11" textAnchor="middle" fill="currentColor">pKa ≈ 44</text>
      <rect x="440" y="50" width="160" height="55" rx="6" fill="none" stroke="rgb(239 68 68)" strokeWidth="1.5" />
      <text x="520" y="72" fontSize="12" textAnchor="middle" fill="rgb(239 68 68)" fontWeight="600">Alkane sp³</text>
      <text x="520" y="92" fontSize="11" textAnchor="middle" fill="currentColor">pKa ≈ 50</text>
      <text x="330" y="130" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">50% · 33% · 25% s-character — the pair sits closer to the nucleus</text>
      <rect x="60" y="150" width="540" height="45" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="330" y="172" fontSize="11" textAnchor="middle" fill="rgb(59 130 246)">HC≡CH + 2Na → 2HC≡CNa + H₂ — metals pull off the only acidic hydrocarbon H</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Weak acids in absolute terms — but 25 orders of magnitude ahead of ethane.</text>
    </svg>
  );
}
