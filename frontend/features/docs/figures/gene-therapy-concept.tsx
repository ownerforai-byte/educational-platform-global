/** Gene therapy concept — replacing the faulty instruction. Well-detailed. Theme-aware. */
export function GeneTherapyConcept({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Gene therapy concept faulty gene replaced functional copy vector delivery virus vector ex vivo in vivo somatic vs germline distinction SCID ADA first success CRISPR editing ethics consent safety risks insertion mutagenesis expensive therapies Zolgensma millions cost access equity">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Gene therapy — replacing the faulty instruction</text>
      {/* concept */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE CONCEPT</text>
      {[
        "a disease-causing gene variant is",
        "  replaced or corrected with a",
        "  working copy",
        "delivery: engineered viruses",
        "  (vectors) carry the new gene",
        "  into target cells",
        "ex vivo: cells edited outside the",
        "  body, then returned",
        "in vivo: the vector is injected",
        "  directly into the patient",
        "somatic only — germline editing",
        "  of embryos is banned in most",
        "  countries",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* reality */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">REALITY CHECK</text>
      {[
        "first success: ADA-SCID ('bubble",
        "  boy' disease), 1990 — immune",
        "  children rebuilt",
        "CRISPR lets editors target",
        "  precise sequences — sickle",
        "  cell therapies now approved",
        "risks: insertion mutagenesis,",
        "  off-target edits, immune",
        "  reactions to the vector",
        "the access problem: some",
        "  therapies cost millions of",
        "  dollars per patient",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-violet-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: vector delivery, ex vivo vs in vivo, somatic vs germline — the three distinctions every gene-therapy answer needs.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Gene therapy treats the cause, not the symptom — but only for cells still alive to receive the fix.</text>
    </svg>
  );
}
