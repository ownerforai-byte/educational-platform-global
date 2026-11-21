/** Prophage detail — lysogeny and induction. Well-detailed. Theme-aware. */
export function ProphageLysogenicDetail({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Prophage lysogenic cycle detail phage DNA integrated host chromosome induction UV stress switch to lytic temperate phage lambda replication copy number">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Prophage — the sleeper inside the chromosome</text>

      {/* host chromosome with prophage */}
      <rect x="30" y="44" width="400" height="220" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="230" y="64" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">LYSOGENIC STATE (temperate phage)</text>
      {/* circular chromosome */}
      <circle cx="230" cy="160" r="70" className="fill-none stroke-current text-stone-500" strokeWidth="3.4" style={{ color: "rgb(120 113 108 / 0.8)" }} />
      {/* prophage segment */}
      <path d="M188 118 a70 70 0 0 1 84 0" className="fill-none stroke-current text-rose-500" strokeWidth="4.4" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="230" y="104" fontSize="7.2" textAnchor="middle" className="fill-current text-rose-500" fontWeight="700">prophage DNA</text>
      <text x="230" y="256" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">viral DNA inserted into the host chromosome — copied with every cell division</text>
      {[
        "no new phage made — repressor keeps it silent",
        "host cell survives and divides normally",
        "lysogenic conversion: host gains new traits",
      ].map((t, i) => (
        <text key={t} x="50" y={92 + i * 16} fontSize="7" className="fill-current text-muted-foreground">• {t}</text>
      ))}

      {/* induction panel */}
      <rect x="450" y="44" width="240" height="220" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="570" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">INDUCTION → LYTIC</text>
      {[
        "UV light or chemicals damage",
        "the host DNA → SOS response",
        "repressor breaks → prophage",
        "excises → enters lytic cycle",
        "host bursts, phage released",
      ].map((t, i) => (
        <text key={t} x="466" y={94 + i * 17} fontSize="7.2" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : t}</text>
      ))}
      <path d="M470 196 q50 14 100 0" className="fill-none stroke-current text-rose-500" strokeWidth="2.4" style={{ color: "rgb(244 63 94 / 0.9)" }} markerEnd="url(#arrhl)" />
      <text x="570" y="222" fontSize="7" textAnchor="middle" className="fill-current text-rose-500" fontWeight="700">stress = the switch</text>
      <text x="466" y="248" fontSize="7" className="fill-current text-muted-foreground">Exam hook: temperate phage = lysogeny;</text>
      <text x="466" y="262" fontSize="7" className="fill-current text-muted-foreground">virulent phage = lytic only.</text>
    </svg>
  );
}
