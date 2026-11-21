/** Paleontology strata story — fossils as history's pages. Well-detailed. Theme-aware. */
export function PaleontologyStrataStory({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Paleontology strata story fossils as pages of history index fossils missing links sequence simple to complex extinction events">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Paleontology — fossils as history's pages</text>
      {/* rock face */}
      <path d="M40 260 L40 60 L120 60 L150 100 L260 100 L290 140 L420 140 L450 180 L680 180 L680 260 Z" className="fill-current text-stone-500/15" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      {[[80, 80], [200, 120], [350, 160], [560, 220]].map(([x, y], i) => (
        <g key={i}>
          <ellipse cx={x} cy={y} rx="14" ry="9" className="fill-none stroke-current" strokeWidth="1.6" style={{ color: "rgb(139 92 246 / 0.9)" }} />
          <line x1={x - 14} y1={y} x2={x + 14} y2={y} className="stroke-current" strokeWidth="1" style={{ color: "rgb(139 92 246 / 0.9)" }} />
        </g>
      ))}
      <text x="80" y="104" fontSize="6.2" textAnchor="middle" className="fill-current text-muted-foreground">trilobite</text>
      <text x="200" y="144" fontSize="6.2" textAnchor="middle" className="fill-current text-muted-foreground">fish</text>
      <text x="350" y="184" fontSize="6.2" textAnchor="middle" className="fill-current text-muted-foreground">amphibian</text>
      <text x="560" y="244" fontSize="6.2" textAnchor="middle" className="fill-current text-muted-foreground">mammal</text>
      <rect x="440" y="48" width="250" height="120" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="456" y="68" fontSize="8" className="fill-current text-foreground" fontWeight="800">What fossils prove</text>
      {["life was different in the past", "simple → complex upward order", "some groups vanish (extinction)", "index fossils date their layer", "gaps are being filled by finds"].map((t, i) => (
        <text key={t} x="466" y={88 + i * 15} fontSize="6.8" className="fill-current text-muted-foreground">• {t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-violet-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Fossils are the only direct evidence of past life — every other line of evidence is read from living organisms.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: define index fossil — widespread, abundant, short-lived; dates the rock it sits in.</text>
    </svg>
  );
}
