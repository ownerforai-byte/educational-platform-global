/**
 * Triglyceride formation — glycerol + 3 fatty acids → ester bonds +
 * 3 H₂O, saturated vs unsaturated tail comparison. Theme-aware.
 */
export function TriglycerideFormation({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 320" className={className} role="img" aria-label="Formation of a triglyceride: glycerol backbone joined to three fatty acid chains by ester bonds releasing three water molecules, with saturated straight and unsaturated kinked tails compared">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Lipids — building a triglyceride (fat)</text>

      {/* glycerol */}
      <g>
        <rect x="60" y="90" width="70" height="110" rx="10" className="fill-current text-teal-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(20 184 166 / 0.9)" }} />
        <text x="95" y="140" fontSize="11" textAnchor="middle" className="fill-current text-teal-700 dark:text-teal-300" fontWeight="800">glycerol</text>
        <text x="95" y="156" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">3 × OH</text>
      </g>

      {/* fatty acids */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="210" y={88 + i * 40} width="240" height="24" rx="12" className="fill-current text-amber-500/15" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
          <text x="330" y={104 + i * 40} fontSize="9" textAnchor="middle" className="fill-current text-amber-700 dark:text-amber-300" fontWeight="700">fatty acid chain (hydrocarbon tail, −COOH head)</text>
        </g>
      ))}

      {/* ester bonds */}
      {[0, 1, 2].map((i) => (
        <g key={`b${i}`}>
          <line x1="130" y1={100 + i * 40} x2="210" y2={100 + i * 40} strokeWidth="3" className="stroke-current text-rose-500" />
          <text x="170" y={94 + i * 40} fontSize="9" textAnchor="middle" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="800">ester bond</text>
          <text x="170" y={116 + i * 40} fontSize="9" textAnchor="middle" className="fill-current text-sky-600 dark:text-sky-400" fontWeight="700">−H₂O</text>
        </g>
      ))}
      <text x="16" y="216" fontSize="11" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="800">3 ester bonds · condensation releases 3 H₂O → 1 triglyceride</text>

      {/* saturated vs unsaturated */}
      <text x="16" y="252" fontSize="11.5" className="fill-current text-foreground" fontWeight="800">Tail geometry decides melting point:</text>
      <line x1="220" y1="268" x2="360" y2="268" strokeWidth="4" className="stroke-current text-amber-500" />
      <text x="220" y="288" fontSize="9.5" className="fill-current text-muted-foreground">saturated — straight, packs tight → solid fat (butter, ghee)</text>
      <path d="M420 268 l20 0 l8 -12 l16 24 l8 -12 l16 24 l8 -12 l16 24 l14 -12 l20 0" fill="none" strokeWidth="4" className="stroke-current text-amber-500" />
      <text x="420" y="288" fontSize="9.5" className="fill-current text-muted-foreground">unsaturated — C=C kinks, loose → liquid oil (mustard, fish)</text>
      <text x="16" y="312" fontSize="10" className="fill-current text-muted-foreground">Energy store: 9 kcal/g (over twice carbohydrate) · stored as adipose · also insulation and shock absorption.</text>
    </svg>
  );
}
