/** Cloning ethics debate — Dolly and the boundaries. Well-detailed. Theme-aware. */
export function CloningEthicsDebate({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Cloning ethics debate Dolly sheep 1996 somatic cell nuclear transfer SCNT reproductive vs therapeutic cloning human cloning ban ethics arguments identity individuality welfare surrogate efficiency failures stem cells research promise consent exploitation commercialisation">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Cloning — the science and the boundaries</text>
      {/* science */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">HOW DOLLY WAS MADE (1996)</text>
      {[
        "somatic cell nuclear transfer:",
        "  nucleus from an adult udder",
        "  cell → emptied egg cell →",
        "  electric pulse → embryo",
        "277 attempts, 29 embryos,",
        "  1 live lamb — the efficiency",
        "  problem in three numbers",
        "Dolly aged with arthritis and",
        "  died young — telomere and",
        "  reprogramming questions",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* ethics */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE ETHICAL LINES</text>
      {[
        "reproductive cloning (a whole",
        "  new individual): banned for",
        "  humans nearly everywhere",
        "therapeutic cloning (cells and",
        "  tissue for medicine): allowed",
        "  under strict rules in places",
        "arguments against: identity and",
        "  individuality, animal welfare,",
        "  the failure toll",
        "arguments for: saving species,",
        "  disease models, personalised",
        "  stem-cell therapies",
        "exam hook: distinguish the two",
        "  types — the distinction is",
        "  the answer's spine",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: SCNT, 277 attempts → 1 lamb, reproductive vs therapeutic — the three facts that anchor any cloning answer.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">A clone is a genetic copy, not a person-copy — environment and development make the individual.</text>
    </svg>
  );
}
