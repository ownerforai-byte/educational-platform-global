export function KolbeLegacyPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Kolbe's legacy — where synthesis began</text>
      <rect x="60" y="55" width="240" height="60" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="180" y="80" fontSize="16" textAnchor="middle" fill="currentColor" fontWeight="600">1845</text>
      <text x="180" y="102" fontSize="9" textAnchor="middle" fill="rgb(148 163 184)">first total synthesis of an organic compound (acetic acid from elements)</text>
      <rect x="360" y="55" width="240" height="60" rx="6" fill="none" stroke="rgb(16 185 129)" strokeWidth="1.5" />
      <text x="480" y="80" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Electrolysis</text>
      <text x="480" y="102" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">electricity forges C–C bonds</text>
      <rect x="60" y="135" width="540" height="45" rx="6" fill="none" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <text x="330" y="157" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Anodic radical coupling is still used industrially — Kolbe dimers, sebacic acid.</text>
      <text x="330" y="205" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">From acetic acid to acetylene welding — one electrochemical idea, 180 years of chemistry.</text>
    </svg>
  );
}
