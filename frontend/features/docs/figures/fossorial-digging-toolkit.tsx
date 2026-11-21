/** Fossorial digging toolkit — life underground. Well-detailed. Theme-aware. */
export function FossorialDiggingToolkit({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Fossorial digging toolkit burrowing adaptations strong forelimbs claws reduced eyes cylindrical body sensitive whiskers mole rat worm low oxygen tunnels constant temperature predators avoided">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Fossorial adaptations — the underground toolkit</text>
      {/* mole profile */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-stone-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE DIGGER'S BODY</text>
      <ellipse cx="195" cy="150" rx="85" ry="34" className="fill-current text-stone-500/25" stroke="currentColor" strokeWidth="2.2" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <circle cx="120" cy="142" r="4" className="fill-current text-slate-600/70" style={{ color: "rgb(71 85 105 / 0.9)" }} />
      <text x="120" y="128" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">vestigial eyes</text>
      <path d="M255 138 l22 -12 m-22 12 l22 2 m-22 8 l20 14" className="stroke-current" strokeWidth="6" strokeLinecap="round" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="285" y="112" fontSize="6" className="fill-current text-stone-600" fontWeight="700">spade hands</text>
      <path d="M110 168 q-14 4 -18 14" className="stroke-current" strokeWidth="2" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="80" y="200" fontSize="5.6" className="fill-current text-muted-foreground">tactile whiskers</text>
      <text x="195" y="212" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">cylindrical body, short powerful neck — a living chisel</text>
      {/* facts */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">TRADES UNDERGROUND LIFE MAKES</text>
      {[
        "eyes shrink — darkness makes",
        "  them useless, even costly",
        "touch and smell expand instead",
        "forelimbs widen into spades,",
        "  claws and teeth become tools",
        "tunnels buffer temperature —",
        "  no need for heavy insulation",
        "low oxygen tunnels suit slow",
        "  metabolism (naked mole-rat)",
        "bonus: most predators can't",
        "  follow you down",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-stone-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: fossorial = burrowing — reduced eyes, spade forelimbs, sensitive whiskers, cylindrical body.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Every adaptation has a cost: the mole's eyes are nearly gone because digging replaced seeing.</text>
    </svg>
  );
}
