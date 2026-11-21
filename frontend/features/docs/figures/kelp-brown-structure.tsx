/** Kelp forest — the giant brown alga and its parts. Well-detailed. Theme-aware. */
export function KelpBrownStructure({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Kelp brown alga structure holdfast stipe blade gas floats Sargassum Laminaria marine forest habitat photosynthesis up to 60 metres">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Kelp — a seaweed the size of a tree</text>

      {/* sea scene */}
      <rect x="30" y="44" width="400" height="220" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="230" y="62" fontSize="8" textAnchor="middle" className="fill-current text-sky-600" fontWeight="700">~ water surface ~</text>
      <path d="M50 66 q180 -8 360 0" className="fill-none stroke-current text-sky-500" strokeWidth="1.6" strokeDasharray="6 4" />
      {/* kelp plant */}
      <path d="M150 250 q-6 -40 4 -80 q8 -38 -2 -76" className="fill-none stroke-current text-amber-700" strokeWidth="7" style={{ color: "rgb(146 64 14 / 0.9)" }} />
      <text x="164" y="176" fontSize="7.4" className="fill-current text-amber-700" fontWeight="700">stipe (stem-like)</text>
      {/* holdfast */}
      <path d="M136 250 q-14 8 -18 14 M150 250 q0 10 2 16 M164 250 q14 8 18 14" className="fill-none stroke-current text-amber-800" strokeWidth="4" style={{ color: "rgb(120 53 15 / 0.9)" }} />
      <text x="150" y="256" fontSize="7.4" className="fill-current text-amber-800" fontWeight="700">holdfast grips rock</text>
      {/* blades with floats */}
      {[[140, 100], [158, 88], [148, 122]].map(([x, y], i) => (
        <g key={i}>
          <ellipse cx={x} cy={y} rx="7" ry="9" className="fill-current text-stone-300/50" stroke="currentColor" strokeWidth="1" />
          <path d={`M${x} ${y + 9} q-10 22 -14 34 M${x} ${y + 9} q8 24 12 38`} className="fill-none stroke-current text-amber-600" strokeWidth="3.4" style={{ color: "rgb(180 130 40 / 0.9)" }} />
        </g>
      ))}
      <text x="196" y="94" fontSize="7" className="fill-current text-muted-foreground">gas floats lift blades to light</text>
      {/* fish */}
      <path d="M330 200 q14 -8 26 0 q-12 8 -26 0 M356 200 l8 -5 v10 Z" className="fill-current text-sky-600/40" />
      <text x="310" y="186" fontSize="6.8" className="fill-current text-muted-foreground">shelter for fish</text>
      <text x="50" y="252" fontSize="7.2" className="fill-current text-muted-foreground">Grow to ~60 m; blades photosynthesise near the surface.</text>

      {/* notes card */}
      <rect x="450" y="44" width="240" height="220" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="570" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">BROWN ALGA PARTS</text>
      {[
        "holdfast — anchors (not roots)",
        "stipe — flexible stem-like axis",
        "blades — leaf-like solar panels",
        "gas floats — keep blades upright",
        "fucoxanthin gives the brown",
        "colour; algin in the cell walls",
      ].map((t, i) => (
        <text key={t} x="466" y={94 + i * 23} fontSize="7.4" className="fill-current text-muted-foreground">• {t}</text>
      ))}
      <text x="466" y="240" fontSize="7.2" className="fill-current text-muted-foreground">Examples: Laminaria, Sargassum,</text>
      <text x="466" y="254" fontSize="7.2" className="fill-current text-muted-foreground">Macrocystis.</text>
      <text x="466" y="272" fontSize="7.2" className="fill-current text-muted-foreground">'Kelp forest' = undersea nursery.</text>
    </svg>
  );
}
