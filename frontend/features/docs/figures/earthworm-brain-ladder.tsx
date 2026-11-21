/** Earthworm brain ladder — central nervous system walk. Well-detailed. Theme-aware. */
export function EarthwormBrainLadder({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Earthworm brain ladder central nervous system bilobed ganglia circumpharyngeal connectives ventral nerve cord segmental ganglia nerve ring anterior third">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The ladder brain — from head to tail</text>
      {/* worm with nervous system */}
      <rect x="30" y="44" width="380" height="200" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="220" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ANTERIOR THIRD, IN ORDER</text>
      {/* brain */}
      <ellipse cx="150" cy="110" rx="20" ry="10" className="fill-current text-violet-500/35" stroke="currentColor" strokeWidth="1.8" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="150" y="92" fontSize="6.2" textAnchor="middle" className="fill-current text-violet-600" fontWeight="700">bilobed brain (dorsal)</text>
      {/* circumpharyngeal connectives */}
      <path d="M140 120 q-18 24 6 34 M160 120 q20 24 -4 34" className="fill-none stroke-current" strokeWidth="2.4" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="220" y="130" fontSize="6" className="fill-current text-muted-foreground">circumpharyngeal connectives</text>
      {/* ventral cord */}
      <path d="M146 154 h0 M146 154 q40 30 120 34 q80 4 130 20" className="fill-none stroke-current" strokeWidth="4" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="330" y="196" fontSize="6.2" className="fill-current text-sky-600" fontWeight="700">double ventral nerve cord</text>
      {/* segmental ganglia */}
      {[[250, 186], [290, 190], [330, 196]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="5" className="fill-current text-sky-500/40" stroke="currentColor" strokeWidth="1.2" style={{ color: "rgb(2 132 199 / 0.9)" }} />
          <line x1={x} y1={y + 5} x2={x} y2={y + 16} className="stroke-current" strokeWidth="1.4" style={{ color: "rgb(2 132 199 / 0.9)" }} />
        </g>
      ))}
      <text x="220" y="234" fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">one ganglion + three nerve pairs per segment — local control everywhere</text>
      {/* facts */}
      <rect x="440" y="44" width="250" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="565" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">DESIGN NOTES</text>
      {[
        "brain is small — it only coordinates",
        "  what segments already handle",
        "most responses are segmental",
        "  reflexes, not decisions",
        "no advanced senses: light, touch,",
        "  vibration and chemicals only",
        "no eyes or ears — the body itself",
        "  is the sense organ",
      ].map((t, i) => (
        <text key={t} x="456" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: brain → circumpharyngeal connectives → ventral nerve cord → segmental ganglia — the ladder in four words.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">The nerve ring around the pharynx is the classic spot examiners ask about.</text>
    </svg>
  );
}
