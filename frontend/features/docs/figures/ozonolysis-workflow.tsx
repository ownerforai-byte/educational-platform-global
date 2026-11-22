export function OzonolysisWorkflow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Ozonolysis — cut, then read</text>
      <rect x="50" y="55" width="170" height="55" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="135" y="77" fontSize="12" textAnchor="middle" fill="currentColor" fontWeight="600">Alkene</text>
      <text x="135" y="97" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">unknown C=C site</text>
      <line x1="235" y1="82" x2="275" y2="82" stroke="rgb(139 92 246)" strokeWidth="2" markerEnd="url(#ar115f)" />
      <marker id="ar115f" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgb(139 92 246)" /></marker>
      <text x="255" y="68" fontSize="9" textAnchor="middle" fill="rgb(139 92 246)">O₃, ~195 K</text>
      <rect x="290" y="55" width="150" height="55" rx="6" fill="none" stroke="rgb(139 92 246)" strokeWidth="1.5" />
      <text x="365" y="77" fontSize="12" textAnchor="middle" fill="rgb(139 92 246)" fontWeight="600">Ozonide</text>
      <text x="365" y="97" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">cyclic peroxide</text>
      <line x1="455" y1="82" x2="495" y2="82" stroke="rgb(16 185 129)" strokeWidth="2" markerEnd="url(#ar115f)" />
      <marker id="ar115f" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgb(16 185 129)" /></marker>
      <text x="475" y="68" fontSize="9" textAnchor="middle" fill="rgb(16 185 129)">Zn/H₂O</text>
      <rect x="510" y="55" width="120" height="55" rx="6" fill="none" stroke="rgb(16 185 129)" strokeWidth="2" />
      <text x="570" y="77" fontSize="12" textAnchor="middle" fill="rgb(16 185 129)" fontWeight="600">Carbonyls</text>
      <text x="570" y="97" fontSize="9" textAnchor="middle" fill="rgb(148 163 184)">aldehydes/ketones</text>
      <rect x="60" y="130" width="540" height="50" rx="6" fill="none" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <text x="330" y="152" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">The C=C is cleaved completely — each former alkene carbon becomes C=O.</text>
      <text x="330" y="172" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Zn (reductive work-up) stops at aldehydes; oxidative work-up would over-shoot to acids.</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Structure-detection tool: reassemble the fragments to locate the original double bond.</text>
    </svg>
  );
}
