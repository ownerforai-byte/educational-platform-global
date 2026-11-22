// SulphurTestsPanel figure. Theme-aware.
export function SulphurTestsPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Two sulphur tests violet sodium sulphide lead sulphide black">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Sulphur — two independent confirmations</text>
      <rect x="40" y="52" width="280" height="120" rx="10" fill="rgb(139 92 246)" opacity="0.1" stroke="rgb(139 92 246)" />
      <text x="180" y="78" fontSize="11.5" fontWeight="800" fill="rgb(139 92 246)" textAnchor="middle">Route 1: sodium nitroprusside</text>
      <text x="180" y="104" fontSize="11" textAnchor="middle" className="fill-current text-foreground">extract (Na₂S) + nitroprusside</text>
      <text x="180" y="128" fontSize="12" fontWeight="800" textAnchor="middle" fill="rgb(196 181 253)">violet colour</text>
      <text x="180" y="152" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">instant, no heating</text>
      <rect x="340" y="52" width="280" height="120" rx="10" fill="rgb(120 113 108)" opacity="0.1" stroke="rgb(120 113 108)" />
      <text x="480" y="78" fontSize="11.5" fontWeight="800" fill="rgb(120 113 108)" textAnchor="middle">Route 2: lead acetate</text>
      <text x="480" y="104" fontSize="11" textAnchor="middle" className="fill-current text-foreground">acidified extract + (CH₃COO)₂Pb</text>
      <text x="480" y="128" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">black PbS precipitate</text>
      <text x="480" y="152" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">sulphide ion meets lead ion</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">either colour alone confirms sulphur; both together are unanswerable</text>
    </svg>
  );
}
