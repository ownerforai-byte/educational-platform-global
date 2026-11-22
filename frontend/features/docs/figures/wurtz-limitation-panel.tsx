export function WurtzLimitationPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Wurtz with mixed halides — three products</text>
      <text x="150" y="58" fontSize="12" textAnchor="middle" fill="rgb(59 130 246)" fontWeight="600">CH₃Br</text>
      <text x="210" y="58" fontSize="14" textAnchor="middle" fill="currentColor">+</text>
      <text x="240" y="58" fontSize="12" textAnchor="middle" fill="rgb(16 185 129)" fontWeight="600">C₂H₅Br</text>
      <text x="330" y="58" fontSize="14" textAnchor="middle" fill="currentColor">+</text>
      <text x="360" y="58" fontSize="12" textAnchor="middle" fill="currentColor" fontWeight="600">2Na</text>
      <line x1="430" y1="55" x2="470" y2="55" stroke="rgb(245 158 11)" strokeWidth="2" markerEnd="url(#ar112f)" />
      <marker id="ar112f" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgb(245 158 11)" /></marker>
      <rect x="40" y="80" width="180" height="45" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="130" y="100" fontSize="11" textAnchor="middle" fill="currentColor">CH₃–CH₃ ethane</text>
      <rect x="240" y="80" width="180" height="45" rx="6" fill="none" stroke="rgb(16 185 129)" strokeWidth="2" />
      <text x="330" y="100" fontSize="11" textAnchor="middle" fill="currentColor">C₂H₅–C₂H₅ butane</text>
      <rect x="440" y="80" width="180" height="45" rx="6" fill="none" stroke="rgb(239 68 68)" strokeWidth="1.5" />
      <text x="530" y="100" fontSize="11" textAnchor="middle" fill="currentColor">CH₃–C₂H₅ propane</text>
      <text x="330" y="155" fontSize="12" textAnchor="middle" fill="rgb(148 163 184)">Self-coupling of each + cross-coupling of both — inseparable mixture.</text>
      <rect x="60" y="175" width="540" height="40" rx="6" fill="none" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <text x="330" y="198" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Wurtz suits symmetric alkanes only; methane is beyond reach (needs C₁ + C₁ from methyl halide, which resists Wurtz).</text>
    </svg>
  );
}
