/** Peptide bond formation — condensation between two amino acids. Well-detailed. Theme-aware. */
export function PeptideBondFormation({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 280" className={className} role="img" aria-label="Peptide bond formation condensation reaction between amino acid one with amino group carboxyl group hydrogen and R group and amino acid two releasing water and forming CO NH peptide linkage forming dipeptide">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Peptide bond — condensation of two amino acids</text>

      {/* amino acid 1 */}
      <rect x="30" y="50" width="250" height="150" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="155" y="72" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">AMINO ACID 1</text>
      <circle cx="155" cy="115" r="22" className="fill-none stroke-current text-sky-600" strokeWidth="2.5" />
      <text x="155" y="119" fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">α-C</text>
      <text x="120" y="98" fontSize="8" textAnchor="end" className="fill-current text-sky-600" fontWeight="700">H₂N– (amino)</text>
      <text x="120" y="140" fontSize="8" textAnchor="end" className="fill-current text-amber-600" fontWeight="700">HOOC– (carboxyl)</text>
      <text x="190" y="98" fontSize="8" className="fill-current text-muted-foreground">–R₁</text>
      <text x="190" y="140" fontSize="8" className="fill-current text-muted-foreground">–H</text>

      {/* plus */}
      <text x="298" y="130" fontSize="16" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">+</text>

      {/* amino acid 2 */}
      <rect x="316" y="50" width="250" height="150" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="441" y="72" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">AMINO ACID 2</text>
      <circle cx="441" cy="115" r="22" className="fill-none stroke-current text-emerald-600" strokeWidth="2.5" />
      <text x="441" y="119" fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">α-C</text>
      <text x="406" y="98" fontSize="8" textAnchor="end" className="fill-current text-sky-600" fontWeight="700">H₂N–</text>
      <text x="406" y="140" fontSize="8" textAnchor="end" className="fill-current text-amber-600" fontWeight="700">HOOC–</text>
      <text x="476" y="98" fontSize="8" className="fill-current text-muted-foreground">–R₂</text>
      <text x="476" y="140" fontSize="8" className="fill-current text-muted-foreground">–H</text>

      {/* arrow */}
      <path d="M590 125 L640 125" markerEnd="url(#arrpb)" strokeWidth="3" className="stroke-current text-muted-foreground" />
      <text x="615" y="112" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">condensation</text>
      <text x="615" y="142" fontSize="8" textAnchor="middle" className="fill-current text-rose-500" fontWeight="700">−H₂O</text>
      <defs><marker id="arrpb" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" className="fill-current text-muted-foreground" /></marker></defs>

      {/* dipeptide */}
      <rect x="40" y="216" width="640" height="52" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="70" y="248" fontSize="9" className="fill-current text-foreground" fontWeight="800">DIPEPTIDE:</text>
      <text x="170" y="248" fontSize="9" className="fill-current text-sky-600" fontWeight="700">H₂N–CH(R₁)–</text>
      <text x="290" y="248" fontSize="9" className="fill-current text-violet-600" fontWeight="800">CO–NH–</text>
      <text x="370" y="248" fontSize="9" className="fill-current text-emerald-600" fontWeight="700">CH(R₂)–COOH</text>
      <text x="540" y="248" fontSize="7.5" className="fill-current text-muted-foreground">peptide bond = amide linkage, planar and rigid</text>
    </svg>
  );
}
