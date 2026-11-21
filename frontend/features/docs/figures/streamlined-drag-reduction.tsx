/** Streamlined drag reduction — the shape of speed. Well-detailed. Theme-aware. */
export function StreamlinedDragReduction({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Streamlined drag reduction fusiform body shape water resistance mucus slime layer laminar flow dolphin fish shark penguin same shape convergent adaptation swimming cost">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Streamlining — the shape of speed</text>
      {/* flow lines */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WATER AROUND A FUSIFORM BODY</text>
      {[110, 140, 170].map((y, i) => (
        <path key={i} d={`M60 ${y} q50 ${i === 1 ? -26 : -12} 135 ${i === 1 ? -26 : -12} q85 0 135 ${i === 1 ? 26 : 12} `} className="fill-none stroke-current" strokeWidth="1.6" style={{ color: "rgb(2 132 199 / 0.6)" }} />
      ))}
      <ellipse cx="195" cy="150" rx="95" ry="26" className="fill-current text-sky-500/25" stroke="currentColor" strokeWidth="2.2" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="154" fontSize="6.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">fusiform: pointed front, tapered rear</text>
      <text x="195" y="212" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">water is 800× denser than air — every bump costs energy,</text>
      <text x="195" y="228" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">so swimmers converge on the same teardrop profile</text>
      {/* facts */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE SHARED TOOLKIT</text>
      {[
        "smooth contour — no projecting",
        "  ears or external genitals",
        "mucus or blubber smooths the",
        "  boundary layer further",
        "overlapping scales / dermal",
        "  denticles break up turbulence",
        "foldable fins tuck away when",
        "  cruising (dolphin, tuna)",
        "convergent proof: fish, whale,",
        "  ichthyosaur, penguin — same",
        "  shape, unrelated ancestors",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: streamlined/fusiform body + mucus layer + reduced projections = the drag-reduction kit.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Same shape in unrelated swimmers is textbook convergent evolution.</text>
    </svg>
  );
}
