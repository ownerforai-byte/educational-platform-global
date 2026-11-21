/** Frog binocular vision — the wide-angle hunter. Well-detailed. Theme-aware. */
export function FrogBinocularVision({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Frog binocular vision wide angle hunter protruding eyes field of view depth perception prey capture motion detection nearly 360 degrees blind spot behind">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Frog vision — wide angle, sharp strike</text>
      {/* field of view */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">FIELD OF VIEW</text>
      {/* frog silhouette top view */}
      <ellipse cx="195" cy="160" rx="34" ry="52" className="fill-current text-emerald-500/25" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      <circle cx="182" cy="116" r="9" className="fill-current text-slate-700" style={{ color: "rgb(55 65 81 / 0.9)" }} />
      <circle cx="208" cy="116" r="9" className="fill-current text-slate-700" style={{ color: "rgb(55 65 81 / 0.9)" }} />
      {/* field arcs */}
      <path d="M182 116 L120 60 A80 80 0 0 1 264 60 Z" className="fill-current text-sky-500/20" stroke="currentColor" strokeWidth="1.2" style={{ color: "rgb(2 132 199 / 0.6)" }} />
      <path d="M120 130 A90 90 0 0 0 60 200" className="fill-none stroke-current" strokeWidth="1.4" strokeDasharray="3 2" style={{ color: "rgb(2 132 199 / 0.6)" }} />
      <path d="M270 130 A90 90 0 0 1 330 200" className="fill-none stroke-current" strokeWidth="1.4" strokeDasharray="3 2" style={{ color: "rgb(2 132 199 / 0.6)" }} />
      <text x="195" y="52" fontSize="6.2" textAnchor="middle" className="fill-current text-sky-600" fontWeight="700">binocular overlap (depth judgement)</text>
      <text x="90" y="220" fontSize="6" textAnchor="middle" className="fill-current text-muted-foreground">side vision</text>
      <text x="300" y="220" fontSize="6" textAnchor="middle" className="fill-current text-muted-foreground">side vision</text>
      <text x="195" y="236" fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">nearly all-round view, small blind spot behind</text>
      {/* facts */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">HUNTER'S HARDWARE</text>
      {[
        "protruding eyes — nearly 360°",
        "  coverage without moving the head",
        "front overlap gives depth for the",
        "  tongue-strike distance",
        "retina is tuned to moving small",
        "  dark objects — bug detectors",
        "a resting frog may ignore dead",
        "  food entirely: motion is the cue",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: protruding eyes + binocular overlap = wide view with depth — the frog sees the strike before it fires.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Frogs detect movement, not stillness — that is why they only eat live prey.</text>
    </svg>
  );
}
