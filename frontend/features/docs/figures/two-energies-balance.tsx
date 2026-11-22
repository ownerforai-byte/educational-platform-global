// TwoEnergiesBalance figure. Theme-aware.
export function TwoEnergiesBalance({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Balance of lattice energy and hydration energy controlling solubility">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Solubility = a two-bill balance</text>
      <rect x="40" y="60" width="280" height="115" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="180" y="86" fontSize="12" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">LATTICE ENERGY — the cost</text>
      <text x="180" y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">endothermic: tear the crystal apart</text>
      <text x="180" y="134" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">falls only slightly down the group</text>
      <text x="180" y="156" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">rate depends on anion size</text>
      <rect x="340" y="60" width="280" height="115" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="480" y="86" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">HYDRATION ENERGY — the pay</text>
      <text x="480" y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">exothermic: water hugs the ion</text>
      <text x="480" y="134" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">falls FAST down the group</text>
      <text x="480" y="156" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">(M²⁺ grows: Be²⁺ 31 → Ba²⁺ 135 pm)</text>
      <text x="330" y="205" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Whoever falls faster decides the ladder direction — and the anion decides that</text>
    </svg>
  );
}
