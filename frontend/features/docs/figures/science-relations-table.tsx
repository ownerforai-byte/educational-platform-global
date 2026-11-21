/** Relations of biology with other sciences table. Theme-aware. */
export function ScienceRelationsTable({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 270" className={className} role="img" aria-label="What biology borrows from other sciences chemistry physics mathematics geology astronomy psychology medicine and engineering with examples of each link">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">What biology borrows — and gives back</text>
      {[
        { y: 48, t: "CHEMISTRY", s: "molecules, bonds, reactions — enzymes, DNA, chromatography" },
        { y: 78, t: "PHYSICS", s: "instruments — microscopes, centrifuges, X-ray crystallography" },
        { y: 108, t: "MATHEMATICS / STATISTICS", s: "population models, Hardy–Weinberg ratios, biostatistics" },
        { y: 138, t: "GEOLOGY / GEOGRAPHY", s: "fossil dating, biogeography of Nepal's zones, plate tectonics" },
        { y: 168, t: "ASTRONOMY / ORIGIN CHEMISTRY", s: "Miller–Urey experiment on life's origin" },
        { y: 198, t: "PSYCHOLOGY / SOCIOLOGY", s: "ethology, human evolution, epidemiology of behaviour" },
        { y: 228, t: "ENGINEERING / COMPUTER SCIENCE", s: "biomedical devices, DNA sequencing algorithms" },
      ].map((r) => (
        <g key={r.t}>
          <rect x="24" y={r.y - 12} width="612" height="26" rx="7" className="fill-current text-violet-500/8" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(124 58 237 / 0.9)" }} />
          <text x="36" y={r.y + 4} fontSize="7.4" className="fill-current text-foreground" fontWeight="800">{r.t}</text>
          <text x="240" y={r.y + 4} fontSize="7.2" className="fill-current text-muted-foreground">{r.s}</text>
        </g>
      ))}
      <text x="16" y="258" fontSize="9" className="fill-current text-muted-foreground">Biology is applied chemistry running on physics, measured by mathematics, set in geology's stage.</text>
    </svg>
  );
}
