// Solved: Fe and its cations — removing 4s first. Theme-aware.
export function FeIonRemoval({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 230" className={className} role="img" aria-label="Solved iron configuration argon 4 s two 3 d six becomes iron two plus argon 3 d six and iron three plus argon 3 d five showing 4 s electrons removed first">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Solved — Fe (Z = 26) and its ions: 4s empties first</text>
      <rect x="30" y="42" width="200" height="100" rx="10" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="130" y="64" fontSize="10" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">Fe atom</text>
      <text x="130" y="92" fontSize="11" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">[Ar] 4s² 3d⁶</text>
      <text x="130" y="116" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">fill order: 4s before 3d</text>
      <rect x="260" y="42" width="200" height="100" rx="10" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="64" fontSize="10" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="800">Fe²⁺ — lose 2 from 4s</text>
      <text x="360" y="92" fontSize="11" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">[Ar] 3d⁶</text>
      <text x="360" y="116" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">4s is outermost once filled — it goes first</text>
      <rect x="490" y="42" width="200" height="100" rx="10" className="fill-current text-violet-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="590" y="64" fontSize="10" textAnchor="middle" className="fill-current text-violet-600" fontWeight="800">Fe³⁺ — lose 1 more from 3d</text>
      <text x="590" y="92" fontSize="11" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">[Ar] 3d⁵</text>
      <text x="590" y="116" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">half-filled d⁵: extra stability</text>
      <rect x="30" y="160" width="660" height="52" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="180" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">Rule to state: electrons are removed from the shell with the highest n first — 4s (n = 4) empties before 3d (n = 3).</text>
      <text x="360" y="198" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">That is why Fe³⁺ reaches the stable d⁵ half-filled set — a favourite NEB one-liner.</text>
    </svg>
  );
}
