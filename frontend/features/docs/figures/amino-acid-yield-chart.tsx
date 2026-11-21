/** Miller Urey amino acid yield chart. Well-detailed. Theme-aware. */
export function AminoAcidYieldChart({ className }: { className?: string }) {
  const acids: [string, number][] = [["glycine", 70], ["alanine", 55], ["aspartic acid", 30], ["glutamic acid", 20], ["other products", 40]];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Miller Urey amino acid yield chart glycine alanine aspartic glutamic acid relative abundance experiment products bar graph">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">What the spark actually made — product yields</text>
      {acids.map(([name, v], i) => {
        const x = 60 + i * 125;
        return (
          <g key={name}>
            <rect x={x} y={230 - v * 1.8} width="70" height={v * 1.8} rx="5" className="fill-current text-sky-500/35" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(2 132 199 / 0.9)" }} />
            <text x={x + 35} y={224 - v * 1.8} fontSize="7.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{v}</text>
            <text x={x + 35} y={250} fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">{name}</text>
          </g>
        );
      })}
      <line x1="40" y1="230" x2="680" y2="230" className="stroke-current text-stone-500" strokeWidth="1.8" />
      <text x="40" y="60" fontSize="7.4" className="fill-current text-muted-foreground">Relative abundance (schematic): the simplest amino acids were the most abundant —</text>
      <text x="40" y="76" fontSize="7.4" className="fill-current text-muted-foreground">exactly what a non-enzymatic electric discharge would make first.</text>
      <rect x="40" y="94" width="640" height="58" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="56" y="116" fontSize="7.6" className="fill-current text-foreground" fontWeight="800">Why the result mattered (1953):</text>
      <text x="56" y="134" fontSize="7.2" className="fill-current text-muted-foreground">Oparin and Haldane had proposed that the early atmosphere could build organics — Miller and Urey turned the proposal into data within a week.</text>
      <rect x="40" y="262" width="640" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: name the gases (CH₄, NH₃, H₂, H₂O), the energy source (electric discharge) and two amino acid products.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">The loop: boiling flask → discharge chamber → condenser → trap → back.</text>
    </svg>
  );
}
