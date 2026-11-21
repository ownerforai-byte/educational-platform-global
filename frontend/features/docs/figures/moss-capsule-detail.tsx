/** Moss capsule zoom — peristome teeth and spore release. Well-detailed. Theme-aware. */
export function MossCapsuleDetail({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Moss capsule zoom peristome teeth operculum cap calyptra seta spore release hygroscopic teeth dry weather dispersal sporophyte">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The capsule — a built-in salt shaker</text>

      {/* capsule drawing */}
      <rect x="30" y="44" width="380" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      {/* seta */}
      <rect x="212" y="230" width="10" height="24" rx="4" className="fill-current text-emerald-700/50" />
      <text x="240" y="250" fontSize="7.4" className="fill-current text-emerald-700" fontWeight="700">seta (stalk)</text>
      {/* capsule body */}
      <path d="M180 150 q0 -50 32 -50 q32 0 32 50 q0 34 -32 34 q-32 0 -32 -34" className="fill-current text-emerald-700/25" stroke="currentColor" strokeWidth="2.6" style={{ color: "rgb(20 83 45 / 0.9)" }} />
      <text x="262" y="176" fontSize="7.4" className="fill-current text-emerald-700" fontWeight="700">capsule (spore case)</text>
      {/* operculum cap */}
      <path d="M198 100 q14 -12 28 0" className="fill-none stroke-current text-amber-700" strokeWidth="5" style={{ color: "rgb(146 64 14 / 0.9)" }} />
      <text x="240" y="102" fontSize="7.2" className="fill-current text-amber-700">operculum (cap) falls when dry</text>
      {/* peristome teeth */}
      {[[-18, -10], [-9, -14], [0, -16], [9, -14], [18, -10]].map(([dx, dy]) => (
        <line key={dx} x1={212 + dx * 0.4} y1="102" x2={212 + dx} y2={102 + dy} className="stroke-current text-amber-600" strokeWidth="2" style={{ color: "rgb(180 130 40 / 0.9)" }} />
      ))}
      <text x="110" y="92" fontSize="7.2" className="fill-current text-amber-600">peristome teeth</text>
      {/* spores escaping */}
      {[[196, 74], [212, 66], [228, 74], [204, 58], [222, 58]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" className="fill-current text-sky-500/70" />
      ))}
      <path d="M190 70 q-30 -20 -60 -24 M234 70 q30 -20 60 -24" className="fill-none stroke-current text-sky-500/60" strokeWidth="1.4" strokeDasharray="3 3" />
      <text x="80" y="44" fontSize="7" className="fill-current text-sky-600">spores carried away</text>
      <text x="50" y="252" fontSize="7.2" className="fill-current text-muted-foreground">Teeth are hygroscopic: they twist open in dry air and close when damp — spores leave only on good flying days.</text>

      {/* notes card */}
      <rect x="430" y="44" width="260" height="220" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="560" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">CAPSULE ANATOMY</text>
      {[
        "calyptra — loose hood on top",
        "operculum — the lid",
        "peristome — ring of teeth",
        "inside: spore sac + columella",
        "matures on the sporophyte",
        "one capsule = millions of spores",
      ].map((t, i) => (
        <text key={t} x="446" y={94 + i * 23} fontSize="7.4" className="fill-current text-muted-foreground">• {t}</text>
      ))}
      <text x="446" y="240" fontSize="7.2" className="fill-current text-muted-foreground">Exam hook: peristome teeth open in</text>
      <text x="446" y="254" fontSize="7.2" className="fill-current text-muted-foreground">dry weather — spores need wind,</text>
      <text x="446" y="268" fontSize="7.2" className="fill-current text-muted-foreground">not rain, to travel far.</text>
    </svg>
  );
}
