export function CathodeHalfReaction({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">The cathode's quiet half of the story</text>
      <rect x="60" y="55" width="540" height="55" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="2" />
      <text x="330" y="80" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">2H₂O + 2e⁻ → H₂↑ + 2OH⁻</text>
      <text x="330" y="100" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">water is reduced — not the carboxylate</text>
      <rect x="60" y="130" width="260" height="50" rx="6" fill="none" stroke="rgb(16 185 129)" strokeWidth="1.5" />
      <text x="190" y="152" fontSize="12" textAnchor="middle" fill="rgb(16 185 129)" fontWeight="600">H₂ evolves</text>
      <text x="190" y="170" fontSize="9" textAnchor="middle" fill="rgb(148 163 184)">1 mol per 2 faradays</text>
      <rect x="340" y="130" width="260" height="50" rx="6" fill="none" stroke="rgb(245 158 11)" strokeWidth="1.5" />
      <text x="470" y="152" fontSize="12" textAnchor="middle" fill="rgb(245 158 11)" fontWeight="600">NaOH accumulates</text>
      <text x="470" y="170" fontSize="9" textAnchor="middle" fill="rgb(148 163 184)">solution turns alkaline</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">The overall Kolbe equation is incomplete without these cathode products.</text>
    </svg>
  );
}
