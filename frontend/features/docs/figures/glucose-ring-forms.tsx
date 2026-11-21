/** Glucose ring forms — open chain, pyranose Haworth, chair. Well-detailed. Theme-aware. */
export function GlucoseRingForms({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Glucose structures open chain Fischer projection with aldehyde group and six carbons numbered pyranose Haworth ring with ring oxygen anomeric carbon C1 and CH2OH at C5 and chair conformation">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Glucose — three views of one molecule (C₆H₁₂O₆)</text>

      {/* open chain */}
      <rect x="20" y="44" width="210" height="230" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="125" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">OPEN CHAIN (Fischer)</text>
      <text x="125" y="86" fontSize="9" textAnchor="middle" className="fill-current text-amber-600" fontWeight="700">CHO — aldehyde C1</text>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <line x1="125" y1={96 + i * 26} x2="125" y2={116 + i * 26} strokeWidth="2" className="stroke-current text-muted-foreground" />
          <text x="125" y={112 + i * 26} fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">C{i + 2} — H–C–OH</text>
        </g>
      ))}
      <text x="125" y="216" fontSize="9" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="700">CH₂OH — C6</text>
      <text x="125" y="248" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">aldohexose · 4 chiral centres</text>

      {/* Haworth */}
      <rect x="255" y="44" width="210" height="230" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="360" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">PYRANOSE RING (Haworth)</text>
      <path d="M320 130 L320 190 L400 190 L400 130 Z" className="fill-none stroke-current text-emerald-600" strokeWidth="3" />
      <text x="356" y="118" fontSize="8" textAnchor="middle" className="fill-current text-sky-600" fontWeight="700">O</text>
      <text x="312" y="126" fontSize="7.5" textAnchor="end" className="fill-current text-foreground" fontWeight="700">C1</text>
      <text x="312" y="196" fontSize="7.5" textAnchor="end" className="fill-current text-foreground" fontWeight="700">C2</text>
      <text x="408" y="196" fontSize="7.5" className="fill-current text-foreground" fontWeight="700">C3</text>
      <text x="408" y="126" fontSize="7.5" className="fill-current text-foreground" fontWeight="700">C4</text>
      <text x="408" y="112" fontSize="7.5" className="fill-current text-foreground" fontWeight="700">C5</text>
      <text x="440" y="112" fontSize="7.5" className="fill-current text-foreground" fontWeight="700">CH₂OH (up)</text>
      <text x="316" y="150" fontSize="7" textAnchor="end" className="fill-current text-muted-foreground">OH (α = down)</text>
      <text x="360" y="230" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">C1–O5 ring closure · intramolecular hemiacetal</text>
      <text x="360" y="252" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">α: C1-OH down · β: C1-OH up</text>

      {/* chair */}
      <rect x="490" y="44" width="210" height="230" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="595" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">CHAIR CONFORMATION</text>
      <path d="M530 150 L560 120 L640 120 L670 150 L640 180 L560 180 Z" className="fill-none stroke-current text-violet-600" strokeWidth="3" />
      <text x="600" y="112" fontSize="7.5" textAnchor="middle" className="fill-current text-sky-600" fontWeight="700">O</text>
      <text x="595" y="205" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">all substituents equatorial = most stable</text>
      <text x="595" y="226" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">β-D-glucopyranose — the cellulose building block</text>

      <text x="16" y="292" fontSize="8" className="fill-current text-muted-foreground">Reducing sugar: free anomeric –OH on C1 reacts in Benedict's and Fehling's tests.</text>
    </svg>
  );
}
