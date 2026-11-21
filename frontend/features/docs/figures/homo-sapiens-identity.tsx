/** Homo sapiens identity — what defines our species. Well-detailed. Theme-aware. */
export function HomoSapiensIdentity({ className }: { className?: string }) {
  const traits: [string, string, string][] = [
    ["Anatomy", "bipedal, 1350–1450 cc, chin, flat face", "rgb(2 132 199)"],
    ["Mind", "symbolic thought, art, planning ahead", "rgb(139 92 246)"],
    ["Voice", "spoken language, teaching, story", "rgb(16 185 129)"],
    ["Culture", "cumulative: each generation adds to the last", "rgb(217 119 6)"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Homo sapiens identity defining traits anatomy mind voice culture wise man sapiens meaning cumulative learning">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Homo sapiens — 'wise man': what the name promises</text>
      {traits.map(([name, detail, rgb], i) => {
        const x = 30 + i * 172;
        return (
          <g key={name}>
            <rect x={x} y="44" width="158" height="180" rx="12" className="fill-current text-slate-500/10" strokeWidth="2" stroke="currentColor" style={{ color: `${rgb} / 0.9` }} />
            <text x={x + 79} y="68" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name}</text>
            <circle cx={x + 79} cy="110" r="18" className="fill-none stroke-current" strokeWidth="2.2" style={{ color: rgb }} strokeDasharray={i === 3 ? "4 3" : undefined} />
            <text x={x + 79} y="115" fontSize="8" textAnchor="middle" className="fill-current" style={{ color: rgb }}>{["🦴", "🧠", "🗣", "📚"][i]}</text>
            <text x={x + 12} y="152" fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">{detail.slice(0, 26)}</text>
            <text x={x + 12} y="166" fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">{detail.slice(26, 52)}</text>
            <text x={x + 79} y="200" fontSize="6.6" textAnchor="middle" className="fill-current" style={{ color: rgb }}>{["body", "thought", "word", "memory"][i]}</text>
          </g>
        );
      })}
      <rect x="30" y="240" width="660" height="52" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="258" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The unique trick: cumulative culture — a child can learn in one hour what took a thousand generations to discover.</text>
      <text x="360" y="276" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">No other species hands down improved tools, recipes and ideas at this speed.</text>
      <text x="360" y="288" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: sapiens means 'wise' — justify the name with culture and language, not brain size alone.</text>
    </svg>
  );
}
