/**
 * Ecosystem components — producers, consumers (herbivore/carnivore/
 * omnivore), decomposers and the abiotic pool, connected by arrows.
 * Theme-aware via currentColor.
 */
export function EcosystemComponents({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="Ecosystem components diagram linking abiotic substances producers herbivores carnivores top carnivores and decomposers with energy and nutrient arrows">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">The cast of an ecosystem — four functional groups</text>

      {/* abiotic pool */}
      <rect x="60" y="70" width="140" height="60" rx="10" className="fill-current text-slate-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(148 163 184 / 0.9)" }} />
      <text x="130" y="96" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ABIOTIC POOL</text>
      <text x="130" y="112" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">air, water, soil minerals</text>

      {/* producers */}
      <rect x="260" y="70" width="140" height="60" rx="10" className="fill-current text-green-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="330" y="96" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">PRODUCERS</text>
      <text x="330" y="112" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">plants, algae — fix solar energy</text>

      {/* consumers */}
      <rect x="460" y="40" width="170" height="50" rx="10" className="fill-current text-sky-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="545" y="62" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">HERBIVORES (1°)</text>
      <text x="545" y="78" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">deer, tadpole, zooplankton</text>
      <rect x="460" y="110" width="170" height="50" rx="10" className="fill-current text-amber-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="545" y="132" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">CARNIVORES (2°)</text>
      <text x="545" y="148" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">frog, snake, small fish</text>
      <rect x="460" y="180" width="170" height="50" rx="10" className="fill-current text-rose-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="545" y="202" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">TOP CARNIVORES (3°)</text>
      <text x="545" y="218" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">eagle, tiger, pond heron</text>

      {/* decomposers */}
      <rect x="60" y="180" width="140" height="60" rx="10" className="fill-current text-violet-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(124 58 237 / 0.9)" }} />
      <text x="130" y="206" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">DECOMPOSERS</text>
      <text x="130" y="222" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">fungi, bacteria — recycle</text>

      {/* arrows */}
      <line x1="200" y1="100" x2="256" y2="100" strokeWidth="2.5" className="stroke-current text-foreground" />
      <polygon points="248,94 264,100 248,106" className="fill-current text-foreground" />
      <line x1="400" y1="95" x2="456" y2="70" strokeWidth="2.5" className="stroke-current text-foreground" />
      <polygon points="448,64 464,68 452,80" className="fill-current text-foreground" />
      <line x1="460" y1="135" x2="400" y2="110" strokeWidth="2.5" className="stroke-current text-foreground" />
      <line x1="460" y1="205" x2="400" y2="125" strokeWidth="2.5" className="stroke-current text-foreground" />
      <path d="M330 130 Q330 160 200 195" fill="none" strokeWidth="2.5" strokeDasharray="6 3" className="stroke-current text-violet-500" />
      <path d="M180 215 Q120 200 128 136" fill="none" strokeWidth="2.5" strokeDasharray="6 3" className="stroke-current text-violet-500" />
      <text x="150" y="170" fontSize="8.5" className="fill-current text-violet-600 dark:text-violet-400" fontWeight="700">nutrients return (cycling)</text>

      <text x="16" y="288" fontSize="10" className="fill-current text-muted-foreground">Energy flows one way (solid arrows) and is lost as heat at every step; nutrients cycle (dashed arrows) — decomposers close the loop.</text>
    </svg>
  );
}
