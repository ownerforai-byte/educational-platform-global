export function AlkyneAdditionMap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Ethyne's addition menu</text>
      <rect x="30" y="50" width="180" height="50" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="120" y="70" fontSize="11" textAnchor="middle" fill="currentColor" fontWeight="600">+ H₂ (Lindlar)</text>
      <text x="120" y="90" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">→ ethene</text>
      <rect x="240" y="50" width="180" height="50" rx="6" fill="none" stroke="rgb(16 185 129)" strokeWidth="1.5" />
      <text x="330" y="70" fontSize="11" textAnchor="middle" fill="currentColor" fontWeight="600">+ H₂ (Ni, excess)</text>
      <text x="330" y="90" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">→ ethane</text>
      <rect x="450" y="50" width="180" height="50" rx="6" fill="none" stroke="rgb(245 158 11)" strokeWidth="1.5" />
      <text x="540" y="70" fontSize="11" textAnchor="middle" fill="currentColor" fontWeight="600">+ HCl (HgCl₂)</text>
      <text x="540" y="90" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">→ CH₂=CHCl</text>
      <rect x="140" y="130" width="380" height="50" rx="6" fill="none" stroke="rgb(139 92 246)" strokeWidth="2" />
      <text x="330" y="150" fontSize="12" textAnchor="middle" fill="rgb(139 92 246)" fontWeight="600">+ H₂O (H₂SO₄/HgSO₄) → CH₃CHO</text>
      <text x="330" y="170" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">via the enol — the family's only aldehyde</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Two π bonds → up to two equivalents of everything; the catalyst sets the stop.</text>
    </svg>
  );
}
