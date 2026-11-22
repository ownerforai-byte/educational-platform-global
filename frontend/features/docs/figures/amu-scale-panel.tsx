// Atomic mass unit scale. Theme-aware.
export function AmuScalePanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Atomic mass unit scale one amu equals one twelfth of carbon twelve mass with hydrogen one oxygen sixteen comparisons">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">The amu — chemistry's kilogram</text>
      <rect x="30" y="42" width="660" height="52" rx="10" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="66" fontSize="11" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">1 amu = 1/12 the mass of one C-12 atom = 1.66 × 10⁻²⁴ g</text>
      <text x="360" y="86" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">carbon-12 is the agreed reference — every atomic mass is a comparison against it</text>
      {[
        ["H = 1 amu", 110],
        ["C = 12 amu", 300],
        ["O = 16 amu", 490],
        ["Fe = 56 amu", 660],
      ].map(([t, x], i) => (
        <g key={String(t)}>
          <rect x={Number(x) - 60} y="110" width="120" height="36" rx="8" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(16 185 129 / 0.85)" }} />
          <text x={Number(x)} y="133" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{String(t)}</text>
        </g>
      ))}
      <rect x="30" y="164" width="660" height="34" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="182" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">Why not grams? One atom's mass in grams is ~10⁻²³ — unusable. Relative masses in amu make every calculation human-sized.</text>
      <text x="360" y="194" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Bridge to remember: the same number that reads "amu per particle" reads "grams per mole".</text>
    </svg>
  );
}
