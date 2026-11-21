/**
 * Forest nutrient cycle — litter fall → decomposers → soil → roots →
 * trees, the closed loop that keeps a forest fed. Theme-aware.
 */
export function ForestNutrientCycle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="Forest nutrient cycle showing litter fall to forest floor decomposers releasing minerals into soil taken up by tree roots returning through leaves and wood">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Why a forest needs no fertiliser — its own nutrient loop</text>

      {/* tree */}
      <g>
        <circle cx="330" cy="110" r="52" className="fill-current text-emerald-500/25" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
        <rect x="322" y="160" width="16" height="70" rx="4" className="fill-current text-amber-700/50" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(180 83 9 / 0.9)" }} />
        <path d="M330 230 q-40 20 -70 30 M330 230 q40 20 70 30 M330 230 q0 40 0 50" fill="none" strokeWidth="3" className="stroke-current text-amber-700/70" />
        <text x="330" y="116" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">TREES</text>
      </g>

      {/* litter floor */}
      <rect x="80" y="240" width="500" height="26" rx="8" className="fill-current text-slate-600/25" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(87 83 78 / 0.9)" }} />
      <text x="330" y="258" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">LITTER FALL — leaves, branches, dead animals</text>

      {/* decomposers */}
      <rect x="120" y="180" width="120" height="44" rx="9" className="fill-current text-violet-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(124 58 237 / 0.9)" }} />
      <text x="180" y="199" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">DECOMPOSERS</text>
      <text x="180" y="214" fontSize="7.5" textAnchor="middle" className="fill-current text-muted-foreground">fungi, bacteria, earthworms</text>

      {/* soil minerals */}
      <rect x="420" y="180" width="120" height="44" rx="9" className="fill-current text-amber-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="480" y="199" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">SOIL MINERALS</text>
      <text x="480" y="214" fontSize="7.5" textAnchor="middle" className="fill-current text-muted-foreground">N, P, K, Ca released</text>

      <g className="stroke-current text-foreground" strokeWidth="2.5">
        <line x1="330" y1="180" x2="300" y2="236" /><polygon points="296,228 294,244 310,236" className="fill-current text-foreground" />
        <line x1="200" y1="238" x2="430" y2="220" /><polygon points="422,212 438,218 424,228" className="fill-current text-foreground" />
        <line x1="480" y1="176" x2="370" y2="176" /><polygon points="378,170 362,176 378,182" className="fill-current text-foreground" />
      </g>
      <text x="470" y="160" fontSize="8.5" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="700">root uptake ↑ — the loop closes</text>

      <text x="16" y="288" fontSize="10" className="fill-current text-muted-foreground">~90% of a forest's nutrients sit in the organisms and litter, not the soil — cut the forest and burn the litter, and the soil cannot rebuild it for decades.</text>
    </svg>
  );
}
