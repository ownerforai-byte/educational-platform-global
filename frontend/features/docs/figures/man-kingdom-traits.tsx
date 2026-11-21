/** Man kingdom traits — what puts us in Hominidae. Well-detailed. Theme-aware. */
export function ManKingdomTraits({ className }: { className?: string }) {
  const traits: [string, string][] = [
    ["Mammalia", "hair, mammary glands, diaphragm, three ear ossicles, warm blood"],
    ["Primates", "opposable thumb, nails not claws, stereoscopic colour vision, large brain"],
    ["Hominidae", "fully erect bipedal gait, free hands, flat face with chin, speech, culture"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Man kingdom traits mammalian primate hominid characters opposable thumb stereoscopic vision bipedal speech culture hierarchy">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Three rungs that make us human</text>
      {traits.map(([rank, chars], i) => {
        const y = 48 + i * 66;
        return (
          <g key={rank}>
            <rect x="30" y={y} width="120" height="54" rx="10" className="fill-current text-sky-500/15" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
            <text x="90" y={y + 32} fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{rank}</text>
            <rect x="160" y={y} width="530" height="54" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.6" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
            <text x="176" y={y + 22} fontSize="7" className="fill-current text-muted-foreground">{chars.slice(0, 62)}</text>
            <text x="176" y={y + 40} fontSize="7" className="fill-current text-muted-foreground">{chars.slice(62, 124)}</text>
          </g>
        );
      })}
      <rect x="30" y="248" width="660" height="44" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="266" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Only the third rung is ours alone: bipedalism plus speech plus cumulative culture separates Homo sapiens from every ape.</text>
      <text x="360" y="284" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: give one character per rung — mammal, primate, hominid — and you have the 3-mark answer.</text>
    </svg>
  );
}
