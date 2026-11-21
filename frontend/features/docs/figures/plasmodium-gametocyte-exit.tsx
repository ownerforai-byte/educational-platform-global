/** Plasmodium gametocyte formation — the exit ticket. Well-detailed. Theme-aware. */
export function PlasmodiumGametocyteExit({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Plasmodium gametocyte formation exit ticket mosquito blood meal uptake microgamete macrogamete fertilisation ookinete oocyst sporozoites salivary glands">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Gametocytes — the parasite's exit ticket</text>
      {/* RBC stages */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">IN THE HUMAN BLOOD</text>
      {[["asexual ring", 110, 130], ["asexual ring", 180, 130], ["gametocyte", 260, 130]].map(([label, x, y], i) => (
        <g key={i}>
          <circle cx={x as number} cy={y as number} r="22" className="fill-current text-rose-500/25" stroke="currentColor" strokeWidth="1.8" style={{ color: "rgb(244 63 94 / 0.9)" }} />
          {i < 2 && <circle cx={x as number} cy={y as number} r="7" className="fill-current" style={{ color: "rgb(244 63 94 / 0.9)" }} />}
          {i === 2 && <path d={`M${(x as number) - 12} ${(y as number) - 10} q12 20 24 0`} className="fill-none stroke-current" strokeWidth="2.2" style={{ color: "rgb(244 63 94 / 0.9)" }} />}
          <text x={x as number} y={(y as number) + 38} fontSize="6" textAnchor="middle" className="fill-current text-muted-foreground">{label as string}</text>
        </g>
      ))}
      <text x="195" y="200" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">some merozoites stop dividing and mature into gametocytes instead</text>
      {/* mosquito side */}
      <rect x="390" y="44" width="300" height="180" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">IN THE MOSQUITO GUT</text>
      {[
        "gametocytes taken up in a blood",
        "  meal leave the red cell",
        "microgamete fertilises macrogamete",
        "zygote → ookinete burrows through",
        "  gut wall → oocyst on outer wall",
        "oocyst releases sporozoites that",
        "  migrate to the salivary glands",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 18} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="240" width="660" height="52" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="258" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The strategy: asexual stages keep the infection going; gametocytes exist only to infect the next mosquito — they cause no symptoms.</text>
      <text x="360" y="276" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: gametocytes are the only stages the mosquito can use — that is why treating carriers blocks transmission.</text>
      <text x="360" y="288" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Fertilisation happens in the mosquito gut — the sexual phase defines the definitive host.</text>
    </svg>
  );
}
