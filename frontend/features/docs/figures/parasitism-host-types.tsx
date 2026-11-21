/** Parasitism host types — ecto, endo, and the vector between. Well-detailed. Theme-aware. */
export function ParasitismHostTypes({ className }: { className?: string }) {
  const kinds: [string, string, string, string][] = [
    ["Ectoparasite", "lives on the surface — lice, ticks, leeches", "easy to spot, hard to starve", "rgb(245 158 11)"],
    ["Endoparasite", "lives inside — tapeworm, Plasmodium", "shielded by the host body", "rgb(244 63 94)"],
    ["Vector-borne", "carried by another organism — mosquito→malaria", "control the vector, break the chain", "rgb(2 132 199)"],
    ["Plant parasite", "Cuscuta dodder taps another plant's vascular bundle", "loses its own leaves and roots", "rgb(139 92 246)"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Parasitism host types ectoparasite lice tick endoparasite tapeworm Plasmodium vector mosquito plant parasite Cuscuta dodder adaptations loss of organs">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Parasitism (+/−) — four addresses</text>
      {kinds.map(([name, detail, tag, rgb], i) => {
        const x = 30 + (i % 2) * 335;
        const y = 44 + Math.floor(i / 2) * 108;
        return (
          <g key={name}>
            <rect x={x} y={y} width="320" height="96" rx="10" className="fill-current text-slate-500/10" strokeWidth="2" stroke="currentColor" style={{ color: `${rgb} / 0.9` }} />
            <text x={x + 16} y={y + 22} fontSize="8.6" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name}</text>
            <text x={x + 16} y={y + 44} fontSize="7.4" className="fill-current text-muted-foreground">{detail.slice(0, 46)}</text>
            {detail.length > 46 && <text x={x + 16} y={y + 58} fontSize="7.4" className="fill-current text-muted-foreground">{detail.slice(46, 92)}</text>}
            <text x={x + 16} y={y + 80} fontSize="7" className="fill-current" style={{ color: rgb }}>{tag}</text>
          </g>
        );
      })}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-rose-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Parasite adaptations: suckers and hooks to hold on, lost guts and redundant organs, enormous egg output — a life of minimum effort, maximum reproduction.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: the best parasite does not quickly kill its host — it needs the host alive to finish its cycle.</text>
    </svg>
  );
}
