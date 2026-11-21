/** Frog blood composition — plasma, RBC nucleated, WBC types, haemoglobin. Theme-aware. */
export function FrogBloodComposition({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Frog blood composition with plasma about 60 percent and cells about 40 percent showing nucleated red blood cells various white blood cells and platelets">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Frog blood — familiar cells, one big twist</text>

      {/* plasma */}
      <rect x="40" y="60" width="240" height="70" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="160" y="88" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">PLASMA ~60%</text>
      <text x="160" y="108" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">water + proteins + salts; carries nutrients & wastes</text>

      {/* cells */}
      <rect x="40" y="150" width="240" height="70" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="160" y="178" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">BLOOD CELLS ~40%</text>
      <text x="160" y="198" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">RBC + WBC + platelets (in plasma while circulating)</text>

      {/* RBC */}
      <g>
        <ellipse cx="400" cy="90" rx="34" ry="20" className="fill-current text-rose-500/30" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(239 68 68 / 0.9)" }} />
        <circle cx="400" cy="90" r="7" className="fill-current text-violet-600/70" />
        <text x="400" y="130" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">RBC — NUCLEATED, oval</text>
        <text x="400" y="146" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">the twist: frog RBCs keep their nucleus (mammals lose it)</text>
      </g>

      {/* WBC */}
      <g>
        <circle cx="540" cy="90" r="18" className="fill-current text-violet-500/25" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(124 58 237 / 0.9)" }} />
        <path d="M534 90 q6 -8 12 0" fill="none" strokeWidth="2" className="stroke-current text-violet-700" />
        <text x="540" y="130" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">WBC — defence (phagocytes)</text>
        <text x="540" y="146" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">larger, fewer, amoeboid</text>
      </g>

      {/* platelets */}
      <g>
        <ellipse cx="400" cy="196" rx="14" ry="8" className="fill-current text-sky-500/30" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
        <text x="400" y="228" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Platelets/spindle cells — clotting</text>
        <text x="540" y="228" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">haemoglobin dissolved in RBCs carries O₂</text>
      </g>

      <text x="16" y="248" fontSize="10" className="fill-current text-muted-foreground">Exam hook: "Frog RBC is nucleated" — true; mammalian RBC is enucleated biconcave disc.</text>
    </svg>
  );
}
