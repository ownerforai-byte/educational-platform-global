export function GlycolProductPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Baeyer's organic product — glycol</text>
      <rect x="80" y="55" width="200" height="55" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="180" y="77" fontSize="13" textAnchor="middle" fill="currentColor" fontWeight="600">CH₂=CH₂</text>
      <text x="180" y="97" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">ethene</text>
      <line x1="295" y1="82" x2="335" y2="82" stroke="rgb(16 185 129)" strokeWidth="2" markerEnd="url(#ar118c)" />
      <marker id="ar118c" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgb(16 185 129)" /></marker>
      <text x="315" y="68" fontSize="9" textAnchor="middle" fill="rgb(16 185 129)">[O] + H₂O</text>
      <rect x="350" y="55" width="230" height="55" rx="6" fill="none" stroke="rgb(16 185 129)" strokeWidth="2" />
      <text x="465" y="77" fontSize="12" textAnchor="middle" fill="rgb(16 185 129)" fontWeight="600">HOCH₂–CH₂OH</text>
      <text x="465" y="97" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">ethane-1,2-diol</text>
      <rect x="60" y="130" width="540" height="50" rx="6" fill="none" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <text x="330" y="152" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Two OH groups add to the SAME face (syn) — Mn holds them in place.</text>
      <text x="330" y="172" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Glycol = antifreeze, polyester precursor — a product with an industry.</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">The diol is the chemical receipt of the oxidation — MnO₂ is the visible one.</text>
    </svg>
  );
}
