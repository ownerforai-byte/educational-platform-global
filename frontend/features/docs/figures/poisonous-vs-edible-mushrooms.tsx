/** Poisonous vs edible mushrooms — Amanita warning signs. Theme-aware. */
export function PoisonousVsEdibleMushrooms({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Poisonous versus edible mushrooms with amanita warning features volva ring white gills compared with edible button mushroom">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Edible or deadly? The Amanita warning signs</text>

      {/* poisonous */}
      <g>
        <rect x="20" y="50" width="300" height="170" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(239 68 68 / 0.9)" }} />
        <path d="M80 130 q70 -50 150 0 q-75 16 -150 0 Z" className="fill-current text-rose-500/40" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(239 68 68 / 0.9)" }} />
        {[[100, 110], [130, 96], [165, 92], [200, 104], [120, 122], [185, 118]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="4" className="fill-current text-white/80" />
        ))}
        <rect x="145" y="130" width="18" height="60" rx="8" className="fill-current text-stone-300/60" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(214 211 209 / 0.9)" }} />
        <ellipse cx="154" cy="146" rx="16" ry="4" className="fill-current text-sky-500/50" />
        <path d="M132 190 q22 10 44 0" fill="none" strokeWidth="3" className="stroke-current text-violet-500" />
        <text x="60" y="216" fontSize="9" className="fill-current text-rose-700 dark:text-rose-300" fontWeight="800">DANGER SIGNS: warty cap, ring + cup (volva), white gills</text>
      </g>

      {/* edible */}
      <g>
        <rect x="340" y="50" width="300" height="170" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
        <path d="M400 130 q70 -50 150 0 q-75 16 -150 0 Z" className="fill-current text-stone-400/50" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(168 162 158 / 0.9)" }} />
        <rect x="465" y="130" width="18" height="60" rx="8" className="fill-current text-stone-200/70" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(231 229 228 / 0.9)" }} />
        <text x="380" y="216" fontSize="9" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="800">SAFE EXAMPLE: Agaricus (button mushroom) — pink-brown gills, no volva</text>
      </g>

      <text x="16" y="246" fontSize="10" className="fill-current text-muted-foreground">Golden rule: never identify a wild mushroom by colour or folklore alone — Amanita phalloides kills with no antidote.</text>
    </svg>
  );
}
