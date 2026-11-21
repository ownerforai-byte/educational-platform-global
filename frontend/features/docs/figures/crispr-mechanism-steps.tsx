/** CRISPR mechanism steps — the programmable scissors. Well-detailed. Theme-aware. */
export function CrisprMechanismSteps({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="CRISPR mechanism steps guide RNA Cas9 nuclease PAM sequence target recognition double strand break repair non homologous end joining NHEJ knock out homology directed repair HDR knock in precision editing off target effects delivery challenges ethics germline editing babies He Jiankui 2018 moratorium somatic therapies approved sickle cell Casgevy bacterial immune system origin Nobel 2020 Doudna Charpentier">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">CRISPR — the programmable scissors, step by step</text>
      {/* mechanism */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE MECHANISM</text>
      {[
        ["1. Design", "a guide RNA is written to match the target DNA sequence", 120],
        ["2. Search", "Cas9 + guide RNA scan the genome for the match (and its PAM)", 165],
        ["3. Cut", "Cas9 snips both strands — a double-strand break", 210],
        ["4. Repair", "cell repairs: NHEJ disables the gene; HDR inserts a new sequence", 255],
      ].map(([k, v, y], i) => (
        <g key={k}>
          <text x="60" y={(y as number) - 4} fontSize="6.8" className="fill-current text-violet-600" fontWeight="800">{k}</text>
          <text x="60" y={(y as number) + 10} fontSize="6" className="fill-current text-muted-foreground">{(v as string).slice(0, 46)}</text>
          <text x="60" y={(y as number) + 22} fontSize="6" className="fill-current text-muted-foreground">{(v as string).slice(46, 92)}</text>
        </g>
      ))}
      {/* reality */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">REALITY CHECK</text>
      {[
        "origin story: CRISPR is a",
        "  bacterial immune system —",
        "  hijacked as a lab tool",
        "approved therapies: sickle-cell",
        "  and thalassaemia gene editing",
        "  (Casgevy) reached patients",
        "limits: off-target cuts, delivery",
        "  to the right cells, and the",
        "  germline line — editing embryos",
        "  (He Jiankui, 2018) drew global",
        "  condemnation and prison",
        "Nobel 2020: Doudna and",
        "  Charpentier — the fastest",
        "  biology-to-medicine pipeline",
        "  ever",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-violet-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: guide RNA + Cas9 + PAM + double-strand break + two repair paths — the five facts of a CRISPR answer.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">The elegance: change 20 letters of RNA and the scissors retarget — programmable biology at last.</text>
    </svg>
  );
}
