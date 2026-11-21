/** Earthworm segment anatomy map — what lives where. Well-detailed. Theme-aware. */
export function EarthwormSegmentMap({ className }: { className?: string }) {
  const zones: [string, string, string][] = [
    ["1–4", "mouth, brain, pharyngeal nephridia", "rgb(139 92 246)"],
    ["5–11", "hearts, gizzard, seminal vesicles", "rgb(244 63 94)"],
    ["12–16", "ovaries, oviduct, clitellum starts", "rgb(16 185 129)"],
    ["17–20", "prostate glands, male pores", "rgb(217 119 6)"],
    ["20 onward", "intestine with typhlosole, septal nephridia", "rgb(2 132 199)"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Earthworm segment anatomy map what lives where segments hearts gizzard clitellum prostate typhlosole organ positions dissection guide">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The segment map — every organ has an address</text>
      {/* body strip */}
      <rect x="30" y="44" width="660" height="44" rx="22" className="fill-current text-stone-500/15" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      {zones.map(([range, organs, rgb], i) => {
        const x = 30 + i * 132;
        return (
          <g key={range}>
            <rect x={x} y="44" width="132" height="44" rx="10" className="fill-current" style={{ color: `${rgb} / 0.2` }} stroke="currentColor" strokeWidth="1.4" />
            <text x={x + 66} y="70" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{range}</text>
          </g>
        );
      })}
      {zones.map(([range, organs, rgb], i) => {
        const y = 108 + i * 40;
        return (
          <g key={organs}>
            <text x="46" y={y + 14} fontSize="7" className="fill-current" style={{ color: rgb }} fontWeight="700">{range}</text>
            <text x="130" y={y + 14} fontSize="7" className="fill-current text-muted-foreground">{organs}</text>
          </g>
        );
      })}
      <rect x="30" y="252" width="660" height="40" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.6" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="268" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Everything reproductive crowds into segments 5–20 — the reason a worm cut in half behind segment 20 can still mate.</text>
      <text x="360" y="284" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: clitellum = 14–16; lateral hearts = 7–11; male pores = 18. Three addresses, three marks.</text>
    </svg>
  );
}
