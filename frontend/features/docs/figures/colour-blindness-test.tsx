/** Colour blindness test — Ishihara plates and inheritance. Well-detailed. Theme-aware. */
export function ColourBlindnessTest({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Colour blindness test Ishihara plate red green cones opsin genes X chromosome linked recessive deuteranopia protanopia prevalence males eight percent women traffic light career implications screening school test">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Colour blindness — the eye test and the gene behind it</text>
      {/* Ishihara-style plate */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ISHIHARA-STYLE PLATE</text>
      {/* dotted circle with number 5 */}
      {Array.from({ length: 60 }).map((_, i) => {
        const a = (i / 60) * Math.PI * 2;
        const r = 55;
        return <circle key={`c${i}`} cx={195 + r * Math.cos(a)} cy={145 + r * Math.sin(a)} r="5" className="fill-current" style={{ color: "rgb(217 119 6 / 0.5)" }} />;
      })}
      {Array.from({ length: 24 }).map((_, i) => {
        const t = i / 24;
        const pts = [[172, 168], [218, 168], [218, 122], [172, 122]];
        const idx = t * 3;
        const seg = Math.floor(idx);
        const f = idx - seg;
        const [x1, y1] = pts[seg] as number[];
        const [x2, y2] = pts[seg + 1] as number[];
        return <circle key={`p${i}`} cx={x1 + (x2 - x1) * f} cy={y1 + (y2 - y1) * f} r="5.5" className="fill-current" style={{ color: "rgb(244 63 94 / 0.55)" }} />;
      })}
      <text x="195" y="216" fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">normal vision reads the number; red-green colour blindness may not</text>
      {/* facts */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE GENETICS + THE NUMBERS</text>
      {[
        "red-green colour blindness is",
        "  X-linked recessive — same",
        "  pattern as haemophilia",
        "~8% of men, ~0.5% of women —",
        "  the male surplus again",
        "cause: altered opsin genes on",
        "  the X chromosome shift cone",
        "  sensitivity",
        "inherited exactly like haemophilia:",
        "  carrier mother → affected sons",
        "practical note: some careers",
        "  (pilots, electricians) screen",
        "  for it — signal lights matter",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: Ishihara plates screen for red-green defects; inheritance is X-linked recessive — 8% males vs 0.5% females.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Complete colour blindness is rare — most cases are partial, red-green only.</text>
    </svg>
  );
}
