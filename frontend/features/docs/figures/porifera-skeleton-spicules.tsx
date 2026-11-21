/** Porifera sponge skeleton — spicules and spongin. Well-detailed. Theme-aware. */
export function PoriferaSkeletonSpicules({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Porifera sponge skeleton spicules spongin calcium carbonate silica support choanocyte chambers filter feeding body wall structure">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Inside a sponge — the skeleton of needles</text>
      {/* sponge body */}
      <path d="M100 250 q-30 -110 40 -150 q60 -34 120 0 q70 40 40 150 q-100 20 -200 0" className="fill-current text-violet-500/12" stroke="currentColor" strokeWidth="2.4" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      {/* spicules */}
      {[[150, 140, 30], [210, 120, -20], [250, 170, 40], [170, 190, -30], [230, 210, 20]].map(([x, y, r], i) => (
        <line key={i} x1={x} y1={y} x2={x + 40 * Math.cos((r * Math.PI) / 180)} y2={y + 40 * Math.sin((r * Math.PI) / 180)} className="stroke-current" strokeWidth="2.6" strokeLinecap="round" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      ))}
      {/* ostia + osculum */}
      {[[130, 200], [180, 220], [240, 200]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" className="fill-current text-sky-500" />
      ))}
      <ellipse cx="200" cy="100" rx="16" ry="8" className="fill-current text-sky-500/40" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="200" y="88" fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">osculum</text>
      <text x="200" y="272" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">needle-like spicules (CaCO₃ or silica) or spongin fibres hold the body open</text>
      {/* facts */}
      <rect x="440" y="44" width="250" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="565" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">SKELETON FACTS</text>
      {[
        "spicules: CaCO₃ (calcareous) or",
        "  silica (glass sponges)",
        "spongin: soft protein fibres —",
        "  the bath sponge is pure spongin",
        "no cells can move the skeleton:",
        "  sponges are sessile by design",
        "skeleton shape + canal pattern",
        "  classify the three classes",
      ].map((t, i) => (
        <text key={t} x="456" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-violet-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: sponge skeleton = spicules (mineral) or spongin (protein) — and choanocytes do the pumping.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Water exits at the osculum; it enters everywhere else through ostia.</text>
    </svg>
  );
}
