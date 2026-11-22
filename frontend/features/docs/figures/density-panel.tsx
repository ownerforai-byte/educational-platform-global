export function DensityPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Density — always below water</text>
      <rect x="60" y="50" width="540" height="60" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="330" y="75" fontSize="13" textAnchor="middle" fill="currentColor" fontWeight="600">All hydrocarbons: ρ &lt; 1 g/cm³</text>
      <text x="330" y="97" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">they float on water — every family, every chain length</text>
      <rect x="60" y="130" width="540" height="50" rx="6" fill="none" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <text x="330" y="152" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Density creeps up slowly with carbon number (≈0.6 → 0.8 g/cm³) but never crosses 1.</text>
      <text x="330" y="172" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Weak dispersion packing cannot match water's hydrogen-bonded density.</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Oil spills, floating fuels, separate layers — all one number: less than one.</text>
    </svg>
  );
}
