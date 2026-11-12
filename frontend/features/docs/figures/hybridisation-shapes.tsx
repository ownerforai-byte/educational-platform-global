/**
 * sp³ / sp² / sp hybridisation — shapes of molecules with bond angles.
 * Linear, trigonal planar and tetrahedral geometries side by side.
 * Theme-aware via currentColor.
 */
export function HybridisationShapes({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 380" className={className} role="img" aria-label="Comparison of sp3 tetrahedral, sp2 trigonal planar and sp linear hybrid orbitals with bond angles">
      {/* panel titles */}
      <text x="110" y="34" fontSize="14" textAnchor="middle" fontWeight="700" className="fill-current text-primary">sp³ — tetrahedral</text>
      <text x="320" y="34" fontSize="14" textAnchor="middle" fontWeight="700" className="fill-current text-emerald-600 dark:text-emerald-400">sp² — trigonal planar</text>
      <text x="530" y="34" fontSize="14" textAnchor="middle" fontWeight="700" className="fill-current text-rose-600 dark:text-rose-400">sp — linear</text>
      <text x="110" y="52" fontSize="11.5" textAnchor="middle" className="fill-current text-muted-foreground">109.5° · CH₄</text>
      <text x="320" y="52" fontSize="11.5" textAnchor="middle" className="fill-current text-muted-foreground">120° · BF₃, C₂H₄</text>
      <text x="530" y="52" fontSize="11.5" textAnchor="middle" className="fill-current text-muted-foreground">180° · BeCl₂, C₂H₂</text>

      {/* sp3: three bonds in plane + one wedge/dash */}
      <g>
        <line x1="110" y1="170" x2="110" y2="92" strokeWidth="3" className="stroke-current text-sky-500" />
        <line x1="110" y1="170" x2="52" y2="222" strokeWidth="3" className="stroke-current text-sky-500" />
        <line x1="110" y1="170" x2="168" y2="222" strokeWidth="3" className="stroke-current text-sky-500" />
        <line x1="110" y1="170" x2="110" y2="248" strokeWidth="3" strokeDasharray="6 5" className="stroke-current text-sky-400" />
        <circle cx="110" cy="170" r="9" className="fill-current text-foreground" />
        <text x="110" y="70" fontSize="12" textAnchor="middle" className="fill-current text-sky-700 dark:text-sky-300">H</text>
        <text x="30" y="238" fontSize="12" textAnchor="middle" className="fill-current text-sky-700 dark:text-sky-300">H</text>
        <text x="186" y="238" fontSize="12" textAnchor="middle" className="fill-current text-sky-700 dark:text-sky-300">H</text>
        <text x="110" y="270" fontSize="12" textAnchor="middle" className="fill-current text-sky-700 dark:text-sky-300">H (back)</text>
        <path d="M 110 138 A 32 32 0 0 0 88 154" fill="none" strokeWidth="1.5" className="stroke-current text-muted-foreground" />
        <text x="76" y="130" fontSize="11" className="fill-current text-muted-foreground">109.5°</text>
      </g>

      {/* sp2: three bonds at 120° */}
      <g>
        <line x1="320" y1="170" x2="320" y2="98" strokeWidth="3" className="stroke-current text-emerald-500" />
        <line x1="320" y1="170" x2="248" y2="212" strokeWidth="3" className="stroke-current text-emerald-500" />
        <line x1="320" y1="170" x2="392" y2="212" strokeWidth="3" className="stroke-current text-emerald-500" />
        <circle cx="320" cy="170" r="9" className="fill-current text-foreground" />
        <text x="320" y="76" fontSize="12" textAnchor="middle" className="fill-current text-emerald-700 dark:text-emerald-300">F</text>
        <text x="228" y="230" fontSize="12" textAnchor="middle" className="fill-current text-emerald-700 dark:text-emerald-300">F</text>
        <text x="414" y="230" fontSize="12" textAnchor="middle" className="fill-current text-emerald-700 dark:text-emerald-300">F</text>
        <path d="M 320 140 A 30 30 0 0 0 294 155" fill="none" strokeWidth="1.5" className="stroke-current text-muted-foreground" />
        <text x="268" y="132" fontSize="11" className="fill-current text-muted-foreground">120°</text>
        {/* unhybridised p orbital perpendicular */}
        <ellipse cx="320" cy="170" rx="10" ry="34" fill="none" strokeWidth="1.5" strokeDasharray="4 4" className="stroke-current text-muted-foreground" />
        <text x="338" y="176" fontSize="10.5" className="fill-current text-muted-foreground">p orbital ⊥</text>
      </g>

      {/* sp: two bonds, 180° */}
      <g>
        <line x1="530" y1="170" x2="530" y2="98" strokeWidth="3" className="stroke-current text-rose-500" />
        <line x1="530" y1="170" x2="530" y2="242" strokeWidth="3" className="stroke-current text-rose-500" />
        <circle cx="530" cy="170" r="9" className="fill-current text-foreground" />
        <text x="530" y="76" fontSize="12" textAnchor="middle" className="fill-current text-rose-700 dark:text-rose-300">Cl</text>
        <text x="530" y="264" fontSize="12" textAnchor="middle" className="fill-current text-rose-700 dark:text-rose-300">Cl</text>
        <line x1="512" y1="170" x2="548" y2="170" strokeWidth="1.5" strokeDasharray="5 4" className="stroke-current text-muted-foreground" />
        <text x="556" y="166" fontSize="11" className="fill-current text-muted-foreground">180°</text>
      </g>

      {/* legend */}
      <g>
        <rect x="40" y="300" width="560" height="62" rx="12" className="fill-current text-card" stroke="currentColor" style={{ color: "rgb(0 0 0 / 0.12)" }} />
        <text x="58" y="324" fontSize="12.5" className="fill-current text-foreground" fontWeight="700">Steric number = bonds + lone pairs on the central atom</text>
        <text x="58" y="346" fontSize="11.5" className="fill-current text-muted-foreground">4 → sp³ (109.5°) · 3 → sp² (120°) · 2 → sp (180°). Hybrid orbitals spread out to minimise repulsion (VSEPR).</text>
      </g>
    </svg>
  );
}
