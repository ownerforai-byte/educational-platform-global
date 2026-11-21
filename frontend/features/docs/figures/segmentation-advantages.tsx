/** Segmentation advantages — repeated modules. Well-detailed. Theme-aware. */
export function SegmentationAdvantages({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Segmentation advantages repeated modules annelid train cars specialisation redundancy locomotion flexibility arthropod tagmata vertebrate vertebrae">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Why repeat a body 100 times?</text>
      {[
        ["Redundancy", "lose one segment, the rest carry on — damage tolerance", "rgb(16 185 129)"],
        ["Specialisation", "repeats can diverge: front segments become heads, hearts, kidneys", "rgb(2 132 199)"],
        ["Flexible locomotion", "each segment bends independently — the worm turns anywhere", "rgb(139 92 246)"],
        ["Efficient growth", "new segments add at the tail; the blueprint is already written", "rgb(245 158 11)"],
      ].map(([name, detail, rgb], i) => {
        const y = 44 + i * 56;
        return (
          <g key={name}>
            <rect x="30" y={y} width="660" height="48" rx="10" className="fill-current text-slate-500/10" strokeWidth="2" stroke="currentColor" style={{ color: `${rgb} / 0.9` }} />
            <text x="50" y={y + 20} fontSize="8.2" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name}</text>
            <text x="50" y={y + 37} fontSize="7" className="fill-current text-muted-foreground">{detail}</text>
          </g>
        );
      })}
      <rect x="30" y="272" width="660" height="20" rx="6" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: metamerism is the anatomy word — segmentation is the engineering word. Use both in an answer.</text>
    </svg>
  );
}
