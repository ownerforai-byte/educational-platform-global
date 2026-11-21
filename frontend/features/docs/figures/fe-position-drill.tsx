// Solved: locating iron in the table. Theme-aware.
export function FePositionDrill({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Solved iron position drill Z 26 configuration argon 4 s two 3 d six giving period four group eight d block transition metal">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Solved — where does Fe (Z = 26) sit?</text>
      <rect x="30" y="40" width="660" height="46" rx="10" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="46" y="62" fontSize="9.5" className="fill-current text-sky-600" fontWeight="800">Step 1 — configuration</text>
      <text x="46" y="80" fontSize="10" className="fill-current text-foreground" fontWeight="700">Fe: 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶ = [Ar] 4s² 3d⁶</text>
      <rect x="30" y="96" width="660" height="46" rx="10" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="46" y="118" fontSize="9.5" className="fill-current text-emerald-600" fontWeight="800">Step 2 — read the position</text>
      <text x="46" y="136" fontSize="10" className="fill-current text-foreground" fontWeight="700">Period 4 (n = 4) · Group 2 + 6 = 8 · d-block (last electron in 3d) · transition metal</text>
      <rect x="30" y="152" width="660" height="44" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="170" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">The differentiating electron is the 3d⁶ one — that single fact fixes block, group formula, and the "transition" label in one step.</text>
      <text x="360" y="188" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Same drill for any d-block element the paper names: config → period = highest n → group = 2 + d count.</text>
    </svg>
  );
}
