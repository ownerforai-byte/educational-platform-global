/** Onion, garlic and aloe — Liliaceae's kitchen and pharmacy. Well-detailed. Theme-aware. */
export function OnionGarlicAloe({ className }: { className?: string }) {
  const items: [string, string, string, string][] = [
    ["Onion", "layered bulb of fleshy leaf bases; sulfur compounds make eyes water", "kitchen staple worldwide", "rgb(180 130 40)"],
    ["Garlic", "cluster of cloves, each a stored bud; allicin fights microbes", "flavour + folk antibiotic", "rgb(239 234 214)"],
    ["Aloe", "succulent leaf stores water and gel; aloin heals burns", "medicine cabinet plant", "rgb(22 163 74)"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Onion garlic aloe Liliaceae economic plants bulb cloves succulent leaf allicin aloin sulfur compounds kitchen medicine uses">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Three plants, one family — onion, garlic, aloe</text>
      {items.map(([name, detail, tag, rgb], i) => {
        const x = 30 + i * 225;
        return (
          <g key={name}>
            <rect x={x} y="44" width="210" height="220" rx="12" className="fill-current text-slate-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: `${rgb} / 0.8` }} />
            <text x={x + 105} y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name.toUpperCase()}</text>
            {i === 0 && (
              <g>
                <path d={`M${x + 80} 190 q25 -70 50 0 q-6 30 -25 30 q-19 0 -25 -30`} className="fill-current text-amber-200/40" stroke="currentColor" strokeWidth="2" style={{ color: rgb }} />
                <path d={`M${x + 105} 124 q-8 40 0 92 M${x + 105} 124 q8 40 0 92`} className="fill-none stroke-current text-amber-700" strokeWidth="1.4" style={{ color: rgb }} />
                <path d={`M${x + 95} 120 q-6 -18 -2 -30 M${x + 105} 118 q0 -20 2 -32 M${x + 115} 120 q6 -18 2 -30`} className="fill-none stroke-current text-emerald-600" strokeWidth="2.4" style={{ color: "rgb(5 122 85 / 0.9)" }} />
              </g>
            )}
            {i === 1 && (
              <g>
                <path d={`M${x + 78} 196 q10 -40 27 -44 q17 4 27 44 q-10 22 -27 22 q-17 0 -27 -22`} className="fill-current text-stone-200/50" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(214 211 209 / 0.9)" }} />
                <path d={`M${x + 105} 152 v66 M${x + 92} 160 q-4 26 2 54 M${x + 118} 160 q4 26 -2 54`} className="fill-none stroke-current text-stone-400" strokeWidth="1.4" />
                <path d={`M${x + 100} 148 q-4 -14 0 -22 M${x + 110} 148 q4 -14 0 -22`} className="fill-none stroke-current text-emerald-600" strokeWidth="2.4" style={{ color: "rgb(5 122 85 / 0.9)" }} />
              </g>
            )}
            {i === 2 && (
              <g>
                <path d={`M${x + 85} 214 q-4 -70 20 -96 q24 26 20 96 q-20 10 -40 0`} className="fill-current text-emerald-600/30" stroke="currentColor" strokeWidth="2.2" style={{ color: "rgb(5 122 85 / 0.9)" }} />
                <path d={`M${x + 92} 200 q12 6 26 0`} className="fill-none stroke-current text-lime-400" strokeWidth="2" />
                <text x={x + 105} y={132} fontSize="6.4" textAnchor="middle" className="fill-current text-lime-600">gel inside</text>
              </g>
            )}
            <text x={x + 16} y={y0(i)} fontSize="6.8" className="fill-current text-muted-foreground">{wrap(detail, 0)}</text>
            <text x={x + 16} y={y0(i) + 12} fontSize="6.8" className="fill-current text-muted-foreground">{wrap(detail, 1)}</text>
            <text x={x + 16} y={y0(i) + 30} fontSize="7" className="fill-current" style={{ color: rgb }}>{tag}</text>
          </g>
        );
      })}
      <rect x="30" y="274" width="660" height="18" rx="8" className="fill-current text-violet-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="360" y="287" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: onion + garlic = bulbs; aloe = succulent leaf with aloin — three Liliaceae economics in one line.</text>
    </svg>
  );
}

function y0(i: number) {
  return 236;
}
function wrap(text: string, part: number) {
  return text.slice(part * 40, part * 40 + 40);
}
