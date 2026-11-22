export function AlkanePrepRoutes({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Four doors to an alkane</text>
      <rect x="20" y="45" width="145" height="60" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="92" y="70" fontSize="12" textAnchor="middle" fill="currentColor">Haloalkane</text>
      <text x="92" y="88" fontSize="12" textAnchor="middle" fill="rgb(148 163 184)">reduction</text>
      <rect x="200" y="45" width="145" height="60" rx="6" fill="none" stroke="rgb(16 185 129)" strokeWidth="1.5" />
      <text x="272" y="70" fontSize="12" textAnchor="middle" fill="currentColor">Wurtz</text>
      <text x="272" y="88" fontSize="12" textAnchor="middle" fill="rgb(148 163 184)">reaction</text>
      <rect x="380" y="45" width="145" height="60" rx="6" fill="none" stroke="rgb(245 158 11)" strokeWidth="1.5" />
      <text x="452" y="70" fontSize="12" textAnchor="middle" fill="currentColor">Decarboxylation</text>
      <text x="452" y="88" fontSize="12" textAnchor="middle" fill="rgb(148 163 184)">(soda-lime)</text>
      <rect x="560" y="45" width="85" height="60" rx="6" fill="none" stroke="rgb(139 92 246)" strokeWidth="1.5" />
      <text x="602" y="70" fontSize="12" textAnchor="middle" fill="currentColor">Hydrogenation</text>
      <text x="602" y="88" fontSize="12" textAnchor="middle" fill="rgb(148 163 184)">(Ni)</text>
      <line x1="92" y1="105" x2="92" y2="130" stroke="rgb(148 163 184)" strokeWidth="2" />
      <line x1="272" y1="105" x2="272" y2="130" stroke="rgb(148 163 184)" strokeWidth="2" />
      <line x1="452" y1="105" x2="452" y2="130" stroke="rgb(148 163 184)" strokeWidth="2" />
      <line x1="602" y1="105" x2="602" y2="130" stroke="rgb(148 163 184)" strokeWidth="2" />
      <rect x="180" y="130" width="300" height="55" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="2" />
      <text x="330" y="153" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Alkane CₙH₂ₙ₊₂</text>
      <text x="330" y="172" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">same carbon count (except Wurtz: +1 each)</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Every route swaps a σ-bond partner for H or for C — nothing else moves.</text>
    </svg>
  );
}
