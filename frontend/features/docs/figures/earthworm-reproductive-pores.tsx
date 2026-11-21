/** Earthworm reproductive pores map — openings and segments. Well-detailed. Theme-aware. */
export function EarthwormReproductivePores({ className }: { className?: string }) {
  const pores: [string, string, string][] = [
    ["Spermathecal pores", "segments 6–9, paired lateral", "receive partner's sperm"],
    ["Male pores", "segment 18, paired ventrolateral", "release own sperm"],
    ["Female pore", "segment 14, single mid-ventral", "release eggs"],
    ["Genital papillae", "segments 17, 19 — paired pads", "grip the partner"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Earthworm reproductive pores map openings segments spermathecal male female genital papillae ventral surface copulation alignment">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The pore map — where reproduction opens out</text>
      {/* ventral strip */}
      <rect x="30" y="44" width="660" height="60" rx="30" className="fill-current text-stone-500/15" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      {[[80, "6–9"], [300, "14"], [360, "17"], [420, "18"], [480, "19"]].map(([x, label], i) => (
        <g key={i}>
          <circle cx={x as number} cy="74" r="5" className="fill-current text-rose-500/50" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(244 63 94 / 0.9)" }} />
          <text x={x as number} y="98" fontSize="6.2" textAnchor="middle" className="fill-current text-muted-foreground">{label as string}</text>
        </g>
      ))}
      <text x="660" y="98" fontSize="6.2" textAnchor="end" className="fill-current text-muted-foreground">clitellum 14–16 (glandular band)</text>
      {/* table */}
      <rect x="30" y="120" width="660" height="124" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      {pores.map(([name, where, role], i) => (
        <g key={name}>
          <text x="46" y={146 + i * 28} fontSize="7.2" className="fill-current text-foreground" fontWeight="800">{name}</text>
          <text x="230" y={146 + i * 28} fontSize="6.8" className="fill-current text-muted-foreground">{where}</text>
          <text x="470" y={146 + i * 28} fontSize="6.8" className="fill-current text-sky-600">{role}</text>
        </g>
      ))}
      <rect x="30" y="258" width="660" height="34" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="272" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">The geometry explains copulation: male pores (18) must meet spermathecal pores (6–9) — so the pair aligns head-to-tail.</text>
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: four pore types, four addresses — 6–9, 14, 18, and papillae at 17 and 19.</text>
    </svg>
  );
}
