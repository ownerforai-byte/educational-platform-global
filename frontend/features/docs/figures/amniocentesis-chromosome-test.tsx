/** Amniocentesis chromosome test — reading the karyotype. Well-detailed. Theme-aware. */
export function AmniocentesisChromosomeTest({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Amniocentesis chromosome test karyotype 23 pairs trisomy 21 Down syndrome cells culture metaphase spread staining banding counting chromosomes 47 normal 46 genetic diagnosis laboratory steps">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Reading a karyotype — what the lab actually sees</text>
      {/* karyotype */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE KARYOTYPE CHECK</text>
      {[
        "foetal cells from the fluid are",
        "  cultured, then arrested in",
        "  metaphase when chromosomes",
        "  are most visible",
        "staining reveals banding patterns",
        "  — each chromosome has a",
        "  fingerprint of stripes",
        "the count: 46 chromosomes in",
        "  23 pairs is the normal set",
        "an extra chromosome 21 =",
        "  trisomy 21 = Down syndrome",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* what it detects */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHAT IT CAN AND CANNOT DO</text>
      {[
        "detects: chromosome number",
        "  errors (trisomies), large",
        "  structural rearrangements,",
        "  sex chromosome anomalies",
        "newer tests (FISH, QF-PCR)",
        "  give faster answers on",
        "  specific chromosomes",
        "cannot detect: most single-gene",
        "  and multifactorial disorders —",
        "  a normal karyotype is not a",
        "  guarantee of health",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: amniocentesis reads chromosomes — 46 normal, 47 in trisomy 21; the karyotype is the evidence.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Metaphase arrest is the trick — chromosomes are only countable when condensed and stained.</text>
    </svg>
  );
}
