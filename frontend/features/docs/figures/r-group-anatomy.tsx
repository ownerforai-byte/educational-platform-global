// RGroupAnatomy figure. Theme-aware.
export function RGroupAnatomy({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="General structure of an organic molecule as R group plus functional group">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Anatomy of an organic molecule: R + X</text>
      <rect x="120" y="80" width="240" height="60" rx="12" fill="rgb(59 130 246)" opacity="0.12" stroke="rgb(59 130 246)" strokeWidth="2" />
      <text x="240" y="118" fontSize="16" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">R–</text>
      <text x="240" y="160" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">alkyl skeleton (CₙH₂ₙ₊₁) — the inert body</text>
      <path d="M 365 110 L 415 110" stroke="rgb(148 163 184)" strokeWidth="2.5" markerEnd="url(#rga-a)" />
      <rect x="420" y="80" width="180" height="60" rx="12" fill="rgb(239 68 68)" opacity="0.12" stroke="rgb(239 68 68)" strokeWidth="2" />
      <text x="510" y="118" fontSize="16" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">–X</text>
      <text x="510" y="160" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">functional group — the reactive head</text>
      <text x="330" y="196" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">change R (skeleton length) → homologues of one family</text>
      <text x="330" y="218" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">change X (group) → a different family entirely</text>
      <defs>
        <marker id="rga-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(148 163 184)" /></marker>
      </defs>
    </svg>
  );
}
