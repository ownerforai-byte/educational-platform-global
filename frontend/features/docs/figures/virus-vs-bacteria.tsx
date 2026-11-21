/**
 * Virus vs bacteria — conceptual contrast diagram (living? filterable?
 * antibiotic response). Theme-aware via currentColor.
 */
export function VirusVsBacteria({ className }: { className?: string }) {
  const row = (y: number, label: string, virus: string, bact: string, k: string) => (
    <g key={k}>
      <text x="16" y={y} fontSize="9.5" className="fill-current text-foreground" fontWeight="700">{label}</text>
      <text x="330" y={y} fontSize="9.5" textAnchor="middle" className="fill-current text-rose-700 dark:text-rose-300">{virus}</text>
      <text x="530" y={y} fontSize="9.5" textAnchor="middle" className="fill-current text-teal-700 dark:text-teal-300">{bact}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="Comparison table diagram of viruses versus bacteria across size, cell structure, genome, reproduction, antibiotics response and filterability">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Virus vs bacterium — why the difference matters at the bedside</text>

      <rect x="240" y="42" width="180" height="26" rx="8" className="fill-current text-rose-500/15" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="330" y="60" fontSize="10.5" textAnchor="middle" className="fill-current text-rose-700 dark:text-rose-300" fontWeight="800">VIRUS</text>
      <rect x="440" y="42" width="180" height="26" rx="8" className="fill-current text-teal-500/15" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(20 184 166 / 0.9)" }} />
      <text x="530" y="60" fontSize="10.5" textAnchor="middle" className="fill-current text-teal-700 dark:text-teal-300" fontWeight="800">BACTERIUM</text>

      {row(94, "Size", "20–300 nm (pass bacterial filters)", "0.5–5 µm", "r1")}
      {row(118, "Cell?", "non-cellular — no membrane, no cytoplasm", "true prokaryotic cell", "r2")}
      {row(142, "Genome", "DNA or RNA (never both)", "circular DNA + plasmids", "r3")}
      {row(166, "Metabolism", "none — inert outside host", "full independent metabolism", "r4")}
      {row(190, "Reproduction", "hijacks host machinery (lytic/lysogenic)", "binary fission", "r5")}
      {row(214, "Antibiotics", "NOT killed — need antivirals/vaccines", "killed by antibiotics", "r6")}
      {row(238, "Crystallisable?", "yes (Stanley, TMV 1935)", "no", "r7")}

      <text x="16" y="272" fontSize="10" className="fill-current text-muted-foreground">Exam classic: "Why do antibiotics fail against flu?" — because influenza is viral; antibiotics target bacterial walls/ribosomes the virus does not have.</text>
      <text x="16" y="290" fontSize="10" className="fill-current text-muted-foreground">Both are pathogens, both are studied by microbiology — but only one is alive by most definitions.</text>
    </svg>
  );
}
