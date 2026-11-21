/** Protozoa locomotion & feeding organelles — pseudopodia, cilia, flagella. Theme-aware. */
export function ProtozoaLocomotion({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 280" className={className} role="img" aria-label="Protozoan locomotion organelles showing amoeba with pseudopodia paramecium with cilia euglena with flagellum and sporozoan without any locomotor organelle">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Protozoa — four ways to move (and one way not to)</text>

      {/* amoeba */}
      <g>
        <path d="M60 90 q30 -26 62 -8 q26 16 10 40 q-14 22 -46 16 q-34 -6 -26 -48 Z" className="fill-current text-sky-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
        <circle cx="100" cy="110" r="7" className="fill-current text-violet-500/50" />
        <path d="M120 96 q16 -10 26 -4" fill="none" strokeWidth="2.5" className="stroke-current text-sky-500" />
        <text x="90" y="170" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Pseudopodia — false feet</text>
        <text x="90" y="184" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">Amoeba: flowing cytoplasm, also engulfs food</text>
      </g>

      {/* paramecium */}
      <g>
        <ellipse cx="260" cy="110" rx="46" ry="26" className="fill-current text-emerald-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
        {Array.from({ length: 18 }, (_, i) => (
          <line key={i} x1={218 + i * 5} y1={i % 2 ? 84 : 86} x2={216 + i * 5} y2={i % 2 ? 76 : 78} strokeWidth="1.5" className="stroke-current text-emerald-600" />
        ))}
        <text x="260" y="170" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Cilia — thousands of oars</text>
        <text x="260" y="184" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">Paramecium: coordinated rowing beat</text>
      </g>

      {/* euglena */}
      <g>
        <ellipse cx="440" cy="110" rx="34" ry="18" className="fill-current text-teal-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(20 184 166 / 0.9)" }} />
        <path d="M474 104 q28 -12 40 -22" fill="none" strokeWidth="2.5" className="stroke-current text-teal-600" />
        <text x="440" y="170" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Flagellum — one whip</text>
        <text x="440" y="184" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">Euglena: pulls itself along</text>
      </g>

      {/* sporozoa */}
      <g>
        <path d="M580 96 q24 -14 44 4 q6 8 -4 14 q-20 12 -40 -4 q-8 -8 0 -14 Z" className="fill-current text-rose-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
        <text x="600" y="170" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">None — gliding/deferred</text>
        <text x="600" y="184" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">Plasmodium: adult stage is fixed</text>
      </g>

      <text x="16" y="230" fontSize="10" className="fill-current text-muted-foreground">Locomotor organelle is the primary basis of protozoan classification: Sarcodina (pseudopodia), Mastigophora (flagella), Ciliata (cilia), Sporozoa (none).</text>
      <text x="16" y="250" fontSize="10" className="fill-current text-muted-foreground">All are single-celled eukaryotes — aquatic, free-living or parasitic; osmoregulation by contractile vacuole in freshwater forms.</text>
    </svg>
  );
}
