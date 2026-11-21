/** Condensation vs hydrolysis — polymer build-up and breakdown. Well-detailed. Theme-aware. */
export function CondensationVsHydrolysis({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Condensation versus hydrolysis condensation joins monomers releasing water forming polymer hydrolysis splits polymer adding water digesting maltose into glucose catalysed by enzymes anabolic catabolic">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Building up and breaking down — the two master reactions</text>

      {/* condensation */}
      <rect x="30" y="44" width="650" height="100" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="50" y="66" fontSize="9" className="fill-current text-foreground" fontWeight="800">CONDENSATION (anabolic — builds)</text>
      <rect x="60" y="84" width="70" height="34" rx="8" className="fill-none stroke-current text-emerald-600" strokeWidth="2.5" />
      <text x="95" y="106" fontSize="7.5" textAnchor="middle" className="fill-current text-foreground">monomer</text>
      <text x="150" y="106" fontSize="11" className="fill-current text-foreground" fontWeight="800">+</text>
      <rect x="170" y="84" width="70" height="34" rx="8" className="fill-none stroke-current text-emerald-600" strokeWidth="2.5" />
      <text x="205" y="106" fontSize="7.5" textAnchor="middle" className="fill-current text-foreground">monomer</text>
      <path d="M270 101 L380 101" markerEnd="url(#arrcvh1)" strokeWidth="3" className="stroke-current text-muted-foreground" />
      <text x="325" y="90" fontSize="8" textAnchor="middle" className="fill-current text-rose-500" fontWeight="700">−H₂O</text>
      <text x="325" y="118" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">enzyme + energy</text>
      <rect x="400" y="84" width="230" height="34" rx="8" className="fill-none stroke-current text-emerald-600" strokeWidth="2.5" />
      <text x="515" y="106" fontSize="7.5" textAnchor="middle" className="fill-current text-foreground">dimer / polymer (glycosidic · peptide · ester bond)</text>
      <defs><marker id="arrcvh1" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" className="fill-current text-muted-foreground" /></marker></defs>

      {/* hydrolysis */}
      <rect x="30" y="164" width="650" height="100" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="50" y="186" fontSize="9" className="fill-current text-foreground" fontWeight="800">HYDROLYSIS (catabolic — splits)</text>
      <rect x="60" y="204" width="230" height="34" rx="8" className="fill-none stroke-current text-sky-600" strokeWidth="2.5" />
      <text x="175" y="226" fontSize="7.5" textAnchor="middle" className="fill-current text-foreground">polymer — e.g. maltose, protein, triglyceride</text>
      <path d="M320 221 L430 221" markerEnd="url(#arrcvh2)" strokeWidth="3" className="stroke-current text-muted-foreground" />
      <text x="375" y="210" fontSize="8" textAnchor="middle" className="fill-current text-sky-600" fontWeight="700">+H₂O</text>
      <text x="375" y="238" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">digestive enzyme</text>
      <rect x="450" y="204" width="70" height="34" rx="8" className="fill-none stroke-current text-sky-600" strokeWidth="2.5" />
      <text x="485" y="226" fontSize="7.5" textAnchor="middle" className="fill-current text-foreground">monomer</text>
      <text x="540" y="226" fontSize="11" className="fill-current text-foreground" fontWeight="800">+</text>
      <rect x="560" y="204" width="70" height="34" rx="8" className="fill-none stroke-current text-sky-600" strokeWidth="2.5" />
      <text x="595" y="226" fontSize="7.5" textAnchor="middle" className="fill-current text-foreground">monomer</text>
      <defs><marker id="arrcvh2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" className="fill-current text-muted-foreground" /></marker></defs>

      <text x="16" y="290" fontSize="8.4" className="fill-current text-muted-foreground">Same bond, opposite directions: maltose → glucose + glucose (maltase); dipeptide → 2 amino acids (pepsin); fat → fatty acids + glycerol (lipase).</text>
    </svg>
  );
}
