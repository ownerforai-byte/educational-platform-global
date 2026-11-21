/** Cnidaria — polyp vs medusa life forms with cnidoblast. Theme-aware. */
export function CnidariaPolypMedusa({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Cnidaria two body forms sessile polyp hydra with tentacles and free swimming medusa jellyfish both diploblastic with cnidoblast stinging cells">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Cnidaria — two shapes, one body plan</text>

      {/* polyp */}
      <g>
        <line x1="120" y1="220" x2="220" y2="220" strokeWidth="4" className="stroke-current text-slate-500" />
        <path d="M140 220 q-10 -80 20 -100 q10 -8 30 -8 q20 0 30 8 q30 20 20 100" fill="none" strokeWidth="3" className="stroke-current text-emerald-500" />
        <path d="M170 220 q-8 -70 20 -88 q28 18 20 88" fill="none" strokeWidth="2" strokeDasharray="4 3" className="stroke-current text-emerald-400" />
        <g className="stroke-current text-emerald-600" strokeWidth="2.5">
          <line x1="160" y1="112" x2="130" y2="80" /><line x1="175" y1="110" x2="170" y2="70" /><line x1="195" y1="112" x2="225" y2="80" />
        </g>
        <text x="170" y="244" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">POLYP — sessile, mouth up</text>
        <text x="170" y="258" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">Hydra, Obelia colony</text>
      </g>

      {/* medusa */}
      <g>
        <path d="M480 90 q60 -20 100 0 q-10 40 -50 44 q-40 -4 -50 -44 Z" className="fill-current text-violet-500/15" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(124 58 237 / 0.9)" }} />
        <g className="stroke-current text-violet-500" strokeWidth="2">
          <path d="M470 118 q-8 40 6 70" fill="none" /><path d="M500 126 q-2 44 4 66" fill="none" /><path d="M560 118 q10 40 -6 70" fill="none" /><path d="M532 126 q4 44 0 66" fill="none" />
        </g>
        <text x="530" y="244" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">MEDUSA — free-swimming, mouth down</text>
        <text x="530" y="258" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">jellyfish (Aurelia); both forms diploblastic</text>
      </g>

      {/* cnidoblast */}
      <g>
        <circle cx="360" cy="150" r="24" className="fill-current text-rose-500/20" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
        <path d="M360 126 q10 -18 22 -20" fill="none" strokeWidth="2.5" className="stroke-current text-rose-500" />
        <text x="360" y="196" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">cnidoblast (stinging cell)</text>
        <text x="360" y="210" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">nematocyst fires — the phylum's namesake weapon</text>
      </g>

      <text x="16" y="240" fontSize="0">.</text>
      <text x="16" y="246" fontSize="0">.</text>
    </svg>
  );
}
