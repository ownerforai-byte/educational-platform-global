/** Where viruses fit — the classification problem. Well-detailed. Theme-aware. */
export function VirusKingdomQuestion({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Where viruses fit in classification problem no cellular structure no metabolism obligate intracellular parasites not placed in five kingdoms acellular agents living or non living debate characteristics">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The classification problem: where do viruses go?</text>

      {/* virus */}
      <rect x="30" y="44" width="300" height="160" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="180" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">A VIRUS</text>
      <polygon points="180,90 215,110 215,150 180,170 145,150 145,110" className="fill-none stroke-current text-rose-600" strokeWidth="3" />
      <path d="M165 120 q15 10 30 0 M165 138 q15 10 30 0" className="fill-none stroke-current text-rose-500" strokeWidth="2" />
      {["no cell, no membrane-bound organelles", "no metabolism of its own", "obligate intracellular parasite", "DNA or RNA, never both"].map((t, i) => (
        <text key={t} x="50" y={196 + i * 0} fontSize="0" />
      ))}
      {["no cell · no metabolism", "obligate intracellular parasite", "DNA or RNA — never both", "crystallisable like chemicals"].map((t, i) => (
        <text key={t} x="50" y={194 + i * 18} fontSize="7.2" className="fill-current text-muted-foreground">• {t}</text>
      ))}

      {/* verdict */}
      <rect x="350" y="44" width="340" height="160" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="520" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHY NO KINGDOM FITS</text>
      {[
        "not cellular → excluded from all five",
        "no ribosomes of its own",
        "replicates only inside a host cell",
        "studied separately as 'acellular agents'",
      ].map((t, i) => (
        <text key={t} x="370" y={92 + i * 20} fontSize="7.4" className="fill-current text-muted-foreground">• {t}</text>
      ))}
      <text x="370" y="182" fontSize="7.2" className="fill-current text-muted-foreground">Viroids: naked RNA. Lichens show the opposite — a fungus + alga partnership.</text>

      {/* debate */}
      <rect x="30" y="220" width="660" height="64" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="50" y="242" fontSize="8.4" className="fill-current text-foreground" fontWeight="700">LIVING OR NOT? Both arguments: reproduces and evolves (alive) · cannot metabolise or grow outside a host (not alive).</text>
      <text x="50" y="264" fontSize="7.8" className="fill-current text-muted-foreground">Exam answer: viruses are obligate intracellular parasites placed outside the five-kingdom system.</text>
    </svg>
  );
}
