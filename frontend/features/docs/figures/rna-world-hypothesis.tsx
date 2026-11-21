/** RNA world hypothesis — the first self-replicator. Well-detailed. Theme-aware. */
export function RNAWorldHypothesis({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="RNA world hypothesis first self replicating molecule ribozyme catalysis information storage transition to DNA protein world">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The RNA world — life before DNA and protein</text>
      {/* RNA strand */}
      {[[80, 80], [110, 96], [140, 80], [170, 96], [200, 80]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="9" className="fill-current text-violet-500/30" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      ))}
      <line x1="89" y1="80" x2="101" y2="96" className="stroke-current text-violet-500" strokeWidth="2" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <line x1="119" y1="96" x2="131" y2="80" className="stroke-current text-violet-500" strokeWidth="2" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <line x1="149" y1="80" x2="161" y2="96" className="stroke-current text-violet-500" strokeWidth="2" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <line x1="179" y1="96" x2="191" y2="80" className="stroke-current text-violet-500" strokeWidth="2" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="140" y="60" fontSize="7.4" textAnchor="middle" className="fill-current text-violet-600" fontWeight="700">RNA — one molecule, two jobs</text>
      {/* two jobs */}
      <rect x="30" y="126" width="330" height="70" rx="10" className="fill-current text-violet-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="46" y="148" fontSize="8" className="fill-current text-foreground" fontWeight="800">Job 1 — store information</text>
      <text x="46" y="166" fontSize="7" className="fill-current text-muted-foreground">its sequence is a recipe that can be copied,</text>
      <text x="46" y="180" fontSize="7" className="fill-current text-muted-foreground">mutated and inherited</text>
      <rect x="390" y="126" width="300" height="70" rx="10" className="fill-current text-violet-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="406" y="148" fontSize="8" className="fill-current text-foreground" fontWeight="800">Job 2 — catalyse reactions</text>
      <text x="406" y="166" fontSize="7" className="fill-current text-muted-foreground">ribozymes fold into shapes that speed</text>
      <text x="406" y="180" fontSize="7" className="fill-current text-muted-foreground">reactions — including copying themselves</text>
      {/* transition */}
      <rect x="30" y="216" width="660" height="48" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="236" fontSize="7.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Division of labour followed: DNA took the archive (more stable), protein took the catalysis (more versatile)</text>
      <text x="360" y="254" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">— RNA kept both a foot in each door: mRNA, tRNA, rRNA survive from that era.</text>
      <rect x="30" y="272" width="660" height="20" rx="6" className="fill-current text-violet-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: RNA is the only molecule that can do both jobs — that is why the RNA world is the leading hypothesis.</text>
    </svg>
  );
}
