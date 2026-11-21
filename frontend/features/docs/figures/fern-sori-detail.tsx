/** Fern sori detail — sporangia clustered under pinnae. Well-detailed. Theme-aware. */
export function FernSoriDetail({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Fern sori detail sporangia clusters under pinna indusium annulus spore release underside of fertile frond Dryopteris reproduction">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Under the frond — where spores are born</text>

      {/* pinna underside with sori */}
      <rect x="30" y="44" width="400" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="230" y="64" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">UNDERSIDE OF A FERTILE PINNA</text>
      {/* pinna blade */}
      <path d="M60 110 q170 -26 340 0 q-170 22 -340 0" className="fill-current text-emerald-700/25" stroke="currentColor" strokeWidth="2.4" style={{ color: "rgb(20 83 45 / 0.9)" }} />
      {/* midrib */}
      <path d="M70 110 q170 -4 320 0" className="fill-none stroke-current text-emerald-900" strokeWidth="2.6" style={{ color: "rgb(6 46 27 / 0.9)" }} />
      {/* sori rows */}
      {[[110, 96], [170, 94], [230, 96], [290, 94], [340, 97], [110, 126], [170, 128], [230, 126], [290, 128], [340, 124]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="9" className="fill-current text-amber-700/35" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(146 64 14 / 0.9)" }} />
          {[0, 72, 144, 216, 288].map((a) => (
            <line key={a} x1={x} y1={y} x2={x + 6 * Math.cos((a * Math.PI) / 180)} y2={y + 6 * Math.sin((a * Math.PI) / 180)} className="stroke-current text-amber-700" strokeWidth="1" style={{ color: "rgb(146 64 14 / 0.9)" }} />
          ))}
        </g>
      ))}
      <text x="380" y="94" fontSize="7.4" className="fill-current text-amber-700" fontWeight="700">sori — brown dots</text>
      <text x="50" y="160" fontSize="7.2" className="fill-current text-muted-foreground">Each dot is a sorus: a cluster of sporangia, sometimes sheltered by an umbrella-like indusium.</text>

      {/* sporangium zoom */}
      <rect x="450" y="44" width="240" height="220" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="570" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ZOOM: one sporangium</text>
      <ellipse cx="570" cy="120" rx="34" ry="26" className="fill-current text-amber-700/25" stroke="currentColor" strokeWidth="2.2" style={{ color: "rgb(146 64 14 / 0.9)" }} />
      {/* annulus */}
      <path d="M548 104 q22 -22 44 0" className="fill-none stroke-current text-rose-500" strokeWidth="4" />
      <text x="570" y="94" fontSize="7" textAnchor="middle" className="fill-current text-rose-500">annulus (spring)</text>
      {/* stalk */}
      <line x1="570" y1="146" x2="570" y2="172" className="stroke-current text-amber-800" strokeWidth="3" style={{ color: "rgb(120 53 15 / 0.9)" }} />
      {/* spores */}
      {[[552, 138], [570, 142], [588, 136]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.4" className="fill-current text-sky-500/70" />
      ))}
      <text x="570" y="196" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">annulus dries, snaps back,</text>
      <text x="570" y="210" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">flinging spores into the wind</text>
      <text x="466" y="236" fontSize="7.2" className="fill-current text-muted-foreground">• sorus = spore cluster on pinna</text>
      <text x="466" y="252" fontSize="7.2" className="fill-current text-muted-foreground">• fertile fronds often look different</text>
      <text x="466" y="268" fontSize="7.2" className="fill-current text-muted-foreground">• exam: sori → Pteridophyta</text>
    </svg>
  );
}
