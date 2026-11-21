// Sommerfeld's elliptical orbits — the patch that was not enough. Theme-aware.
export function SommerfeldEllipsePatch({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 220" className={className} role="img" aria-label="Sommerfeld elliptical orbits patch adding azimuthal quantum number sub-levels yet still failing for multi-electron atoms and Zeeman effect">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Sommerfeld's patch — ellipses and sub-levels</text>
      {[[210, 96, 120, 44], [210, 96, 88, 30], [210, 96, 56, 18]].map(([cx, cy, rx, ry], i) => (
        <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} className="fill-current text-violet-500/5" stroke="currentColor" strokeWidth="1.6" style={{ color: `rgb(139 92 246 / ${0.9 - i * 0.25})` }} />
      ))}
      <circle cx="210" cy="96" r="7" className="fill-current text-rose-500" style={{ color: "rgb(244 63 94 / 0.95)" }} />
      <circle cx="330" cy="96" r="5" className="fill-current text-foreground" />
      <text x="210" y="168" fontSize="8.6" textAnchor="middle" className="fill-current text-muted-foreground">same n, several ellipses → sub-levels (the seed of l)</text>
      <text x="210" y="184" fontSize="8" textAnchor="middle" className="fill-current text-violet-600" fontWeight="700">explains fine structure — partly</text>
      <rect x="420" y="46" width="270" height="140" rx="10" className="fill-current text-rose-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="555" y="68" fontSize="9.5" textAnchor="middle" className="fill-current text-rose-500" fontWeight="800">What the patch still cannot fix</text>
      {["Multi-electron atoms still fail", "Zeeman & Stark still unexplained", "Orbits still break uncertainty", "Line intensities still missing"].map((t, i) => (
        <text key={t} x="440" y={92 + i * 24} fontSize="8.4" className="fill-current text-foreground" fontWeight="700">• {t}</text>
      ))}
      <rect x="30" y="196" width="660" height="18" rx="0" />
      <text x="360" y="210" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Exam line: Sommerfeld introduced elliptical orbits and sub-energy levels, yet the model remained defective for multi-electron systems.</text>
    </svg>
  );
}
