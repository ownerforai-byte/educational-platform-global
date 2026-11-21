// Cr and Cu configuration exceptions. Theme-aware.
export function CrCuExceptions({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 220" className={className} role="img" aria-label="Chromium and copper configuration exceptions chromium argon 4 s one 3 d five copper argon 4 s one 3 d ten explained by symmetry and exchange energy">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">The two exceptions every paper asks: Cr and Cu</text>
      <rect x="30" y="44" width="320" height="100" rx="10" className="fill-current text-violet-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="190" y="66" fontSize="10" textAnchor="middle" className="fill-current text-violet-600" fontWeight="800">Chromium (Z = 24)</text>
      <text x="190" y="90" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">Expected: [Ar] 4s² 3d⁴</text>
      <text x="190" y="112" fontSize="11" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Actual: [Ar] 4s¹ 3d⁵</text>
      <text x="190" y="132" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">half-filled d — maximum exchange energy</text>
      <rect x="370" y="44" width="320" height="100" rx="10" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="530" y="66" fontSize="10" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="800">Copper (Z = 29)</text>
      <text x="530" y="90" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">Expected: [Ar] 4s² 3d⁹</text>
      <text x="530" y="112" fontSize="11" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Actual: [Ar] 4s¹ 3d¹⁰</text>
      <text x="530" y="132" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">fully-filled d — maximum symmetry</text>
      <rect x="30" y="158" width="660" height="48" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="178" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">Why: exactly half-filled and fully-filled subshells have symmetrical charge clouds and maximum exchange energy — lower energy than the expected order.</text>
      <text x="360" y="196" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Answer template: expected config → actual config → the two reasons (symmetry + exchange energy). That is the full 2m.</text>
    </svg>
  );
}
