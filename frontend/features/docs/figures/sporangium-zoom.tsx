/** Sporangium zoom — the spore-dispersal machine. Well-detailed. Theme-aware. */
export function SporangiumZoom({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Sporangium zoom structure columella dome sporangiophore stalk hundreds of sporangiospores inside dehiscence bursting dispersal by air currents apophysis swelling detail labelled">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Zoom: the sporangium — a spore bomb</text>

      {/* big sporangium */}
      <circle cx="220" cy="140" r="80" className="fill-current text-stone-500/15" stroke="currentColor" strokeWidth="3.5" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      {/* columella */}
      <path d="M180 110 q40 -20 80 0 q-10 24 -40 26 q-30 -2 -40 -26" className="fill-current text-amber-500/30" stroke="currentColor" strokeWidth="2.5" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="300" y="106" fontSize="7.6" className="fill-current text-amber-600" fontWeight="700">columella — sterile dome</text>
      <text x="300" y="122" fontSize="7.6" className="fill-current text-amber-600" fontWeight="700">pushing spores apart</text>
      {/* spores */}
      {[[170, 165], [200, 180], [235, 175], [255, 155], [190, 145], [225, 195], [165, 190], [250, 190]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" className="fill-current text-stone-700" />
      ))}
      <text x="300" y="150" fontSize="7.6" className="fill-current text-muted-foreground">hundreds of sporangiospores (n)</text>
      <text x="300" y="168" fontSize="7.6" className="fill-current text-muted-foreground">packed around the columella</text>
      {/* stalk */}
      <rect x="214" y="220" width="12" height="60" rx="5" className="fill-current text-stone-500/60" />
      <text x="220" y="294" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">sporangiophore</text>

      {/* dispersal panel */}
      <rect x="440" y="60" width="250" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="460" y="84" fontSize="8.4" className="fill-current text-foreground" fontWeight="800">HOW IT FIRES</text>
      {[
        "wall dries as the sporangium ripens",
        "inner wall splits along a line",
        "columella swells — pops the sac",
        "spores shot into moving air",
        "each lands, germinates, restarts",
      ].map((t, i) => (
        <text key={t} x="460" y={108 + i * 22} fontSize="7.2" className="fill-current text-muted-foreground">• {t}</text>
      ))}
      <text x="460" y="228" fontSize="7" className="fill-current text-muted-foreground">black dust on old bread = ripe sporangia</text>

      <text x="16" y="294" fontSize="8.4" className="fill-current text-muted-foreground">Design logic: lift the spores high on a stalk, dry them hard, then explode them into the wind — maximum travel for minimum energy.</text>
    </svg>
  );
}
