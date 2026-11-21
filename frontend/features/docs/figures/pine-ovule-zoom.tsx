/** Pine ovule zoom — naked ovule anatomy. Well-detailed. Theme-aware. */
export function PineOvuleZoom({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Pine ovule zoom naked ovule on cone scale integument nucellus micropyle archegonia female gametophyte megaspore no ovary gymnosperm">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The naked ovule, layer by layer</text>

      {/* ovule on scale */}
      <rect x="30" y="44" width="400" height="220" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="230" y="64" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">OVULE SITTING ON A CONE SCALE — EXPOSED</text>
      {/* cone scale */}
      <path d="M70 220 q160 -30 320 0" className="fill-none stroke-current text-amber-800" strokeWidth="6" style={{ color: "rgb(120 53 15 / 0.9)" }} />
      <text x="80" y="244" fontSize="7.2" className="fill-current text-amber-800">cone scale (megasporophyll)</text>
      {/* ovule body */}
      <ellipse cx="230" cy="160" rx="66" ry="52" className="fill-current text-emerald-600/15" stroke="currentColor" strokeWidth="2.6" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      <text x="230" y="226" fontSize="7" textAnchor="middle" className="fill-current text-emerald-700">integument (seed coat to be)</text>
      {/* nucellus */}
      <ellipse cx="230" cy="156" rx="46" ry="36" className="fill-current text-amber-500/20" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="304" y="150" fontSize="7.2" className="fill-current text-amber-600">nucellus</text>
      {/* female gametophyte with archegonia */}
      <ellipse cx="230" cy="152" rx="28" ry="22" className="fill-current text-lime-500/25" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(132 204 22 / 0.9)" }} />
      {[[220, 146], [240, 146], [230, 160]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" className="fill-current text-rose-500/50" stroke="currentColor" strokeWidth="1" />
      ))}
      <text x="150" y="128" fontSize="7" className="fill-current text-rose-500">archegonia (2+)</text>
      {/* micropyle */}
      <path d="M212 112 L224 124 M248 112 L236 124" className="stroke-current text-sky-600" strokeWidth="2.4" />
      <text x="256" y="106" fontSize="7.4" className="fill-current text-sky-600" fontWeight="700">micropyle — pollen entrance</text>
      <text x="50" y="258" fontSize="7.2" className="fill-current text-muted-foreground">No ovary wraps it — that nakedness is the whole definition of a gymnosperm.</text>

      {/* notes card */}
      <rect x="450" y="44" width="240" height="220" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="570" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">PARTS TO NAME</text>
      {[
        "integument — outer cover",
        "nucellus — nutritive tissue",
        "megaspore inside → female",
        "gametophyte with archegonia",
        "micropyle — the doorway for",
        "the pollen grain + its tube",
      ].map((t, i) => (
        <text key={t} x="466" y={94 + i * 23} fontSize="7.4" className="fill-current text-muted-foreground">• {t}</text>
      ))}
      <text x="466" y="240" fontSize="7.2" className="fill-current text-muted-foreground">Exam hook: ovule = integument +</text>
      <text x="466" y="254" fontSize="7.2" className="fill-current text-muted-foreground">nucellus + megaspore; fertilisation</text>
      <text x="466" y="268" fontSize="7.2" className="fill-current text-muted-foreground">inside an archegonium, no antheridium.</text>
    </svg>
  );
}
