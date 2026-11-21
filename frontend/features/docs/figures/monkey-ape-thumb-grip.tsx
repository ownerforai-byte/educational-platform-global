/** Monkey ape thumb grip — precision grip progression. Well-detailed. Theme-aware. */
export function MonkeyApeThumbGrip({ className }: { className?: string }) {
  const grades: [string, string, string][] = [
    ["Monkey", "thumb in line with fingers, limited opposition", "grip = whole-hand clasp"],
    ["Ape", "partially opposable thumb, long fingers", "hook grip for branches"],
    ["Man", "fully opposable thumb touches every fingertip", "precision grip + power grip"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Monkey ape thumb grip precision grip progression opposable thumb tool use writing human hand evolution grades">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The thumb tells the story</text>
      {grades.map(([name, chars, grip], i) => {
        const x = 30 + i * 228;
        return (
          <g key={name}>
            <rect x={x} y="44" width="210" height="170" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
            <text x={x + 105} y="68" fontSize="8.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name}</text>
            {/* hand icon */}
            <path d={`M${x + 80} 150 v-30 M${x + 92} 150 v-38 M${x + 104} 150 v-34 M${x + 116} 150 v-26`} className="stroke-current" strokeWidth="4" strokeLinecap="round" style={{ color: "rgb(2 132 199 / 0.6)" }} />
            {i === 0 && <path d={`M${x + 70} 148 v-22`} className="stroke-current" strokeWidth="4" strokeLinecap="round" style={{ color: "rgb(2 132 199 / 0.6)" }} />}
            {i === 1 && <path d={`M${x + 68} 148 q-6 -14 2 -22`} className="stroke-current" strokeWidth="4" strokeLinecap="round" style={{ color: "rgb(2 132 199 / 0.6)" }} />}
            {i === 2 && <path d={`M${x + 66} 148 q-12 -10 -4 -26 q6 -8 14 -2`} className="stroke-current" strokeWidth="4" strokeLinecap="round" style={{ color: "rgb(2 132 199 / 0.6)" }} />}
            <text x={x + 14} y="172" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">{chars}</text>
            <text x={x + 14} y="196" fontSize="6.4" textAnchor="middle" className="fill-current text-sky-600">{grip}</text>
          </g>
        );
      })}
      <rect x="30" y="228" width="660" height="62" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="248" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">A fully opposable thumb + precision grip = tools, writing, needle-work — every technology rests on this one joint.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Apes have power grip and a partial opposable thumb; only humans can touch the thumb tip to every fingertip.</text>
      <text x="360" y="282" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: 'fully opposable thumb' is a Hominidae character — pair it with precision grip.</text>
    </svg>
  );
}
