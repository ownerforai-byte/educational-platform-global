/** Mental health stigma — the barrier behind the illness. Well-detailed. Theme-aware. */
export function MentalHealthStigma({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Mental health stigma barrier depression anxiety treatment gap seeking help discrimination labels awareness counselling helpline Nepal suicide prevention WHO statistics one in four myth violence misconception">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Mental health — the illness and the stigma around it</text>
      {/* the problem */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE TWO PROBLEMS</text>
      {[
        "depression and anxiety are",
        "  common, treatable conditions —",
        "  roughly one in four people meet",
        "  a mental disorder in their life",
        "the treatment gap: most people",
        "  who need help never receive it",
        "stigma is the main barrier —",
        "  fear of labels, jobs, marriage",
        "  prospects, gossip",
        "myths persist: that mental illness",
        "  means violence or weakness —",
        "  evidence says neither",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* the answers */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHAT HELPS</text>
      {[
        "treatment works: therapy",
        "  (counselling, CBT) and",
        "  medication, often combined",
        "talk early: most crises are",
        "  visible before they are urgent",
        "listen without fixing — the",
        "  first aid of mental health",
        "Nepal's response: the national",
        "  mental health policy, school",
        "  programmes, and helplines",
        "language matters: 'person living",
        "  with depression', not",
        "  'a depressed person'",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: mental illness is common + treatable; stigma, not danger, is the real public-health problem.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Mental health is health — same biology, same right to care.</text>
    </svg>
  );
}
