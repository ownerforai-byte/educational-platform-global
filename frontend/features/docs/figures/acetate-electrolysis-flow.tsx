export function AcetateElectrolysisFlow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Sodium acetate → ethane</text>
      <rect x="40" y="50" width="230" height="55" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="155" y="72" fontSize="12" textAnchor="middle" fill="currentColor" fontWeight="600">2CH₃COO⁻</text>
      <text x="155" y="92" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">at the anode</text>
      <line x1="285" y1="77" x2="325" y2="77" stroke="rgb(245 158 11)" strokeWidth="2" markerEnd="url(#ar120b)" />
      <marker id="ar120b" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgb(245 158 11)" /></marker>
      <text x="305" y="64" fontSize="9" textAnchor="middle" fill="rgb(245 158 11)">−2CO₂, −2e⁻</text>
      <rect x="340" y="50" width="120" height="55" rx="6" fill="none" stroke="rgb(139 92 246)" strokeWidth="1.5" />
      <text x="400" y="72" fontSize="12" textAnchor="middle" fill="currentColor" fontWeight="600">2CH₃·</text>
      <text x="400" y="92" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">radicals</text>
      <line x1="475" y1="77" x2="515" y2="77" stroke="rgb(16 185 129)" strokeWidth="2" markerEnd="url(#ar120b)" />
      <marker id="ar120b" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgb(16 185 129)" /></marker>
      <text x="495" y="64" fontSize="9" textAnchor="middle" fill="rgb(16 185 129)">couple</text>
      <rect x="60" y="125" width="540" height="55" rx="6" fill="none" stroke="rgb(16 185 129)" strokeWidth="2" />
      <text x="330" y="147" fontSize="12" textAnchor="middle" fill="rgb(16 185 129)" fontWeight="600">2CH₃COONa + 2H₂O → C₂H₆ + 2CO₂ + H₂ + 2NaOH</text>
      <text x="330" y="167" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">Pt electrodes · concentrated solution · ethane at anode, H₂ at cathode</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Both carboxyl carbons exit as CO₂ — the two methyls couple into ethane.</text>
    </svg>
  );
}
