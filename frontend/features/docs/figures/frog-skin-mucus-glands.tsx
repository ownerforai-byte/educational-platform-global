/** Frog skin mucus glands — the moist toolkit. Well-detailed. Theme-aware. */
export function FrogSkinMucusGlands({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Frog skin mucus glands moist toolkit cutaneous respiration oxygen diffusion keep wet poison granular glands defence water loss camouflage chromatophores">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Skin — a multi-tool, not a coat</text>
      {/* skin cross-section */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">SKIN CROSS-SECTION</text>
      <rect x="60" y="90" width="270" height="18" rx="8" className="fill-current text-sky-500/20" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="103" fontSize="5.8" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">epidermis (thin, moist)</text>
      <rect x="60" y="108" width="270" height="46" rx="8" className="fill-current text-emerald-500/15" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="134" fontSize="5.8" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">dermis with glands + pigment cells</text>
      {[[90, 140], [140, 142], [190, 140], [240, 142], [290, 140]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="7" className="fill-current text-sky-500/35" stroke="currentColor" strokeWidth="1.2" style={{ color: "rgb(2 132 199 / 0.9)" }} />
          <path d={`M${x} ${y - 7} v-8`} className="stroke-current" strokeWidth="1" style={{ color: "rgb(2 132 199 / 0.9)" }} />
        </g>
      ))}
      <text x="195" y="172" fontSize="6.2" textAnchor="middle" className="fill-current text-sky-600">mucus glands keep the surface wet</text>
      <text x="195" y="196" fontSize="6.2" textAnchor="middle" className="fill-current text-violet-600">granular glands store distasteful secretions</text>
      <text x="195" y="220" fontSize="6.2" textAnchor="middle" className="fill-current text-emerald-600">pigment cells (chromatophores) darken or lighten</text>
      {/* jobs list */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">FIVE JOBS AT ONCE</text>
      {[
        "breathing — oxygen diffuses in",
        "  through the wet surface",
        "water balance — drinks through",
        "  the belly patch",
        "defence — granular secretions",
        "camouflage — colour change",
        "protection — the first barrier",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: cutaneous respiration needs the skin wet — mucus glands are the reason the frog can breathe through its skin at all.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Dry skin = suffocation risk. Water and breathing are the same problem for a frog.</text>
    </svg>
  );
}
