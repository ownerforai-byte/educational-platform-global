export function DecarboxylationFlow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Decarboxylation — the carboxyl carbon exits as CO₂</text>
      <rect x="40" y="50" width="200" height="55" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="140" y="72" fontSize="13" textAnchor="middle" fill="currentColor" fontWeight="600">CH₃COONa</text>
      <text x="140" y="92" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">sodium acetate</text>
      <text x="255" y="80" fontSize="14" textAnchor="middle" fill="currentColor">+</text>
      <rect x="285" y="50" width="110" height="55" rx="6" fill="none" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <text x="340" y="72" fontSize="12" textAnchor="middle" fill="currentColor">NaOH + CaO</text>
      <text x="340" y="92" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">soda-lime</text>
      <line x1="410" y1="77" x2="450" y2="77" stroke="rgb(245 158 11)" strokeWidth="2" markerEnd="url(#ar112c)" />
      <marker id="ar112c" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgb(245 158 11)" /></marker>
      <rect x="465" y="50" width="165" height="55" rx="6" fill="none" stroke="rgb(16 185 129)" strokeWidth="2" />
      <text x="547" y="72" fontSize="13" textAnchor="middle" fill="rgb(16 185 129)" fontWeight="600">CH₄ + Na₂CO₃</text>
      <text x="547" y="92" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">methane</text>
      <line x1="140" y1="105" x2="140" y2="130" stroke="rgb(148 163 184)" strokeWidth="2" strokeDasharray="4 3" />
      <text x="140" y="148" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">heat ≈ 300 °C</text>
      <text x="140" y="170" fontSize="11" textAnchor="middle" fill="currentColor">RCOO⁻ Na⁺ → RH + Na₂CO₃</text>
      <rect x="60" y="185" width="540" height="40" rx="6" fill="none" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <text x="330" y="208" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Product carries ONE carbon fewer than the acid — count it: acetate C₂ → methane C₁.</text>
    </svg>
  );
}
