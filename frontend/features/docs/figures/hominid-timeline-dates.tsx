/** Hominid timeline dates — species with ages. Well-detailed. Theme-aware. */
export function HominidTimelineDates({ className }: { className?: string }) {
  const species: [string, string, string][] = [
    ["Dryopithecus", "~20–14 mya", "forest ape, common ancestor of apes and humans"],
    ["Ramapithecus", "~14–10 mya", "earliest possible hominin, woodland"],
    ["Australopithecus", "~4–2 mya", "bipedal, small brain (Lucy)"],
    ["Homo habilis", "~2.4–1.4 mya", "first stone tools"],
    ["Homo erectus", "~1.8 mya–300 kya", "fire, leaves Africa"],
    ["Neanderthal", "~130–40 kya", "cold-adapted cousin, buries dead"],
    ["Homo sapiens", "~300 kya–now", "us — art, language, agriculture"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Hominid timeline dates Dryopithecus Ramapithecus Australopithecus habilis erectus Neanderthal sapiens million years ago ladder">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The line-up, with dates</text>
      {species.map(([name, date, note], i) => {
        const y = 48 + i * 34;
        return (
          <g key={name}>
            <text x="130" y={y + 14} fontSize="7.4" textAnchor="end" className="fill-current text-foreground" fontWeight="700">{name}</text>
            <text x="140" y={y + 14} fontSize="7" className="fill-current text-amber-600" fontWeight="700">{date}</text>
            <text x="270" y={y + 14} fontSize="6.8" className="fill-current text-muted-foreground">{note}</text>
            {i > 0 && <line x1="140" y1={y + 4} x2="140" y2={y - 20} className="stroke-current text-stone-500" strokeWidth="1.2" />}
          </g>
        );
      })}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">mya = million years ago, kya = thousand. The sequence is a grade ladder, not a straight line — side branches existed.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: memorise two anchors — habilis ~2 mya (tools), erectus ~1.8 mya (out of Africa).</text>
    </svg>
  );
}
