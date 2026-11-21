/** Worm phyla comparison — platyhelminthes, aschelminthes, annelida. Theme-aware. */
export function WormPhylaComparison({ className }: { className?: string }) {
  const row = (y: number, feat: string, p: string, a: string, an: string, k: string) => (
    <g key={k}>
      <text x="16" y={y} fontSize="9" className="fill-current text-foreground" fontWeight="700">{feat}</text>
      <text x="200" y={y} fontSize="8.5" textAnchor="middle" className="fill-current text-sky-700 dark:text-sky-300">{p}</text>
      <text x="390" y={y} fontSize="8.5" textAnchor="middle" className="fill-current text-amber-700 dark:text-amber-300">{a}</text>
      <text x="570" y={y} fontSize="8.5" textAnchor="middle" className="fill-current text-emerald-700 dark:text-emerald-300">{an}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 660 280" className={className} role="img" aria-label="Comparison of flatworms roundworms and segmented worms across symmetry body cavity gut circulatory and examples">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Three worm phyla — the ladder of complexity</text>

      {["PLATYHELMINTHES", "ASCHHELMINTHES", "ANNELIDA"].map((t, i) => (
        <text key={t} x={[200, 390, 570][i]} y="54" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{t}</text>
      ))}

      {row(80, "Shape", "flat, leaf-like", "round, cylindrical", "long, segmented", "r1")}
      {row(104, "Symmetry", "bilateral", "bilateral", "bilateral", "r2")}
      {row(128, "Cavity", "acoelomate (solid)", "pseudocoelomate", "true coelom", "r3")}
      {row(152, "Gut", "incomplete (one opening)", "complete (mouth + anus)", "complete", "r4")}
      {row(176, "Circulation", "none — diffusion", "none — pseudocoelomic fluid", "closed system", "r5")}
      {row(200, "Segmentation", "none", "none", "metameric", "r6")}
      {row(224, "Examples", "Planaria, liver fluke, tapeworm", "Ascaris, Wuchereria", "earthworm, leech, Nereis", "r7")}

      <text x="16" y="256" fontSize="10" className="fill-current text-muted-foreground">Each step adds capability: a through-gut lets food flow one way and be processed in stages; a coelom and circulation power bigger bodies.</text>
      <text x="16" y="274" fontSize="10" className="fill-current text-muted-foreground">Exam: place each worm in the right phylum by cavity type alone.</text>
    </svg>
  );
}
