export function AlkenePrepRoutes({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Three doors to an alkene</text>
      <rect x="30" y="45" width="180" height="60" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="120" y="68" fontSize="12" textAnchor="middle" fill="currentColor" fontWeight="600">Dehydration</text>
      <text x="120" y="88" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">of alcohols</text>
      <rect x="240" y="45" width="180" height="60" rx="6" fill="none" stroke="rgb(16 185 129)" strokeWidth="1.5" />
      <text x="330" y="68" fontSize="12" textAnchor="middle" fill="currentColor" fontWeight="600">Dehydrohalogenation</text>
      <text x="330" y="88" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">of haloalkanes</text>
      <rect x="450" y="45" width="180" height="60" rx="6" fill="none" stroke="rgb(245 158 11)" strokeWidth="1.5" />
      <text x="540" y="68" fontSize="12" textAnchor="middle" fill="currentColor" fontWeight="600">Hydrogenation</text>
      <text x="540" y="88" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">of alkynes (partial)</text>
      <line x1="120" y1="105" x2="120" y2="130" stroke="rgb(148 163 184)" strokeWidth="2" />
      <line x1="330" y1="105" x2="330" y2="130" stroke="rgb(148 163 184)" strokeWidth="2" />
      <line x1="540" y1="105" x2="540" y2="130" stroke="rgb(148 163 184)" strokeWidth="2" />
      <rect x="180" y="130" width="300" height="55" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="2" />
      <text x="330" y="153" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Alkene CₙH₂ₙ</text>
      <text x="330" y="172" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">lose H₂O / HX / half the H₂</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">All three routes remove atoms in pairs from adjacent carbons.</text>
    </svg>
  );
}
