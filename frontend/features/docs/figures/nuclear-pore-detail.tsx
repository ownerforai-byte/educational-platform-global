/** Nuclear pore detail — envelope cross-section with pore complex. Well-detailed. Theme-aware. */
export function NuclearPoreDetail({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Nuclear pore detail double nuclear envelope inner and outer membranes with perinuclear space nuclear pore complex of eight subunits annulus with central channel nucleoporins continuous with rough ER transport of RNA and proteins nucleolus chromatin inside">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The nuclear envelope and its pores</text>

      {/* envelope cross-section */}
      <rect x="40" y="70" width="400" height="160" rx="16" className="fill-current text-violet-500/8" stroke="currentColor" strokeWidth="3" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      {/* inner + outer membranes */}
      <rect x="40" y="70" width="400" height="10" rx="5" className="fill-current text-violet-600/70" />
      <rect x="40" y="220" width="400" height="10" rx="5" className="fill-current text-violet-600/70" />
      <text x="250" y="64" fontSize="7.6" textAnchor="middle" className="fill-current text-violet-600" fontWeight="700">outer membrane (studded with ribosomes, continuous with RER)</text>
      <text x="250" y="252" fontSize="7.6" textAnchor="middle" className="fill-current text-violet-600" fontWeight="700">inner membrane (faces nucleoplasm)</text>
      <text x="250" y="150" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">nucleoplasm: chromatin + nucleolus</text>
      <text x="250" y="170" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">perinuclear space between the two membranes (~20–40 nm)</text>

      {/* pore complex */}
      <rect x="200" y="62" width="80" height="26" rx="8" className="fill-none stroke-current text-sky-600" strokeWidth="3" />
      <rect x="200" y="212" width="80" height="26" rx="8" className="fill-none stroke-current text-sky-600" strokeWidth="3" />
      {[[208, 66], [228, 66], [248, 66], [266, 66]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" className="fill-current text-sky-600" />
      ))}
      {[[208, 234], [228, 234], [248, 234], [266, 234]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" className="fill-current text-sky-600" />
      ))}
      <text x="460" y="76" fontSize="8" className="fill-current text-sky-600" fontWeight="700">nuclear pore complex —</text>
      <text x="460" y="92" fontSize="8" className="fill-current text-sky-600" fontWeight="700">8 protein subunits (annulus)</text>
      <text x="460" y="110" fontSize="7.4" className="fill-current text-muted-foreground">around a central aqueous channel</text>

      {/* traffic */}
      <rect x="440" y="130" width="250" height="100" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="460" y="152" fontSize="8" className="fill-current text-foreground" fontWeight="700">TWO-WAY TRAFFIC:</text>
      <text x="460" y="172" fontSize="7.6" className="fill-current text-muted-foreground">out: mRNA, tRNA, ribosomal subunits</text>
      <text x="460" y="190" fontSize="7.6" className="fill-current text-muted-foreground">in: DNA/RNA polymerases, histones, energy</text>
      <text x="460" y="210" fontSize="7.6" className="fill-current text-muted-foreground">~2000–4000 pores per nucleus (selective gates)</text>

      <text x="16" y="286" fontSize="8.4" className="fill-current text-muted-foreground">The envelope separates transcription from translation — eukaryotes' defining compartment.</text>
    </svg>
  );
}
