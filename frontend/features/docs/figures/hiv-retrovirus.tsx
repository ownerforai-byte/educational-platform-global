/**
 * HIV retrovirus — structure (envelope, gp120 spikes, RNA + reverse
 * transcriptase) and replication RNA→DNA→integration. Theme-aware.
 */
export function HivRetrovirus({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="HIV retrovirus structure with envelope gp120 spikes capsid RNA and reverse transcriptase, and replication steps from entry through reverse transcription and integration to new virions">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">HIV — the retrovirus that writes RNA backwards into DNA</text>

      {/* structure */}
      <g>
        <circle cx="140" cy="130" r="58" className="fill-current text-rose-500/10" strokeWidth="3.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.95)" }} />
        <g className="stroke-current text-rose-400" strokeWidth="3">
          <line x1="140" y1="72" x2="140" y2="58" /><line x1="100" y1="90" x2="90" y2="78" /><line x1="180" y1="90" x2="190" y2="78" /><line x1="86" y1="140" x2="72" y2="144" /><line x1="194" y1="140" x2="208" y2="144" /><line x1="102" y1="180" x2="92" y2="190" /><line x1="178" y1="180" x2="188" y2="190" />
        </g>
        <text x="140" y="52" fontSize="9.5" textAnchor="middle" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="700">gp120 spikes</text>
        <polygon points="140,100 170,116 170,148 140,164 110,148 110,116" className="fill-current text-violet-500/25" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(124 58 237 / 0.95)" }} />
        <text x="140" y="136" fontSize="8" textAnchor="middle" className="fill-current text-violet-700 dark:text-violet-300" fontWeight="700">capsid</text>
        <path d="M124 122 q16 -6 32 0" fill="none" strokeWidth="2.5" className="stroke-current text-sky-500" />
        <path d="M124 130 q16 6 32 0" fill="none" strokeWidth="2.5" className="stroke-current text-sky-500" />
        <text x="140" y="192" fontSize="9" textAnchor="middle" className="fill-current text-sky-600 dark:text-sky-400" fontWeight="700">2 × RNA + reverse transcriptase</text>
        <text x="140" y="206" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">envelope stolen from host membrane</text>
      </g>

      {/* replication steps */}
      <text x="290" y="70" fontSize="11.5" className="fill-current text-foreground" fontWeight="800">Why 'retro'? — the flow runs backwards:</text>
      {[
        { y: 100, t: "1 · gp120 locks onto CD4 receptor of helper T cell" },
        { y: 128, t: "2 · RNA enters; reverse transcriptase makes DNA from RNA" },
        { y: 156, t: "3 · viral DNA integrates into the host genome (provirus)" },
        { y: 184, t: "4 · host machinery makes viral RNA + proteins" },
        { y: 212, t: "5 · new virions bud off — helper T cells die → immunity collapses → AIDS" },
      ].map((s) => (
        <text key={s.y} x="290" y={s.y} fontSize="9.5" className="fill-current text-muted-foreground">{s.t}</text>
      ))}

      <text x="290" y="248" fontSize="10" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="700">Drugs target step 2 (reverse transcriptase inhibitors, e.g. AZT).</text>
      <text x="290" y="266" fontSize="10" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="700">Vaccines struggle: gp120 mutates faster than immunity adapts.</text>
      <text x="16" y="290" fontSize="10" className="fill-current text-muted-foreground">Transmission: blood, sexual contact, placenta — not saliva or mosquito bites (common exam misconception).</text>
    </svg>
  );
}
