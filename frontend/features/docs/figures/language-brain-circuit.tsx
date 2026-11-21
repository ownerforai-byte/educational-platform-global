/** Language brain circuit — Broca Wernicke speech. Well-detailed. Theme-aware. */
export function LanguageBrainCircuit({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Language brain circuit Broca area Wernicke area speech production comprehension larynx descent vocal tract human language evolution">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The speech circuit — hardware for language</text>
      {/* brain outline */}
      <path d="M120 90 q40 -36 100 -20 q60 -10 90 24 q30 30 10 70 q-20 40 -80 40 q-70 4 -110 -30 q-30 -30 -10 -84" className="fill-current text-violet-500/10" stroke="currentColor" strokeWidth="2.4" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      {/* Broca */}
      <circle cx="230" cy="150" r="24" className="fill-current text-rose-500/25" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(244 63 94 / 0.9)" }} strokeDasharray="5 3" />
      <text x="230" y="154" fontSize="6.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Broca</text>
      {/* Wernicke */}
      <circle cx="310" cy="120" r="22" className="fill-current text-sky-500/25" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(2 132 199 / 0.9)" }} strokeDasharray="5 3" />
      <text x="310" y="124" fontSize="6.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Wernicke</text>
      <path d="M288 128 q-30 14 -34 16" className="stroke-current" strokeWidth="2" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="120" y="250" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Broca = producing speech • Wernicke = understanding it</text>
      {/* facts */}
      <rect x="420" y="44" width="270" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="555" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHAT MADE SPEECH POSSIBLE</text>
      {[
        "Broca's and Wernicke's areas —",
        "  language cortex in the left brain",
        "dropped larynx — a longer vocal",
        "  tract able to shape more sounds",
        "fine breath control — running and",
        "  talking at the same time",
        "cumulative culture — words carry",
        "  learning across generations",
      ].map((t, i) => (
        <text key={t} x="436" y={92 + i * 18} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-violet-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Language turned evolution collaborative: one person's idea could become everyone's tool.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: Broca's area + descended larynx — the two anatomical gifts behind speech.</text>
    </svg>
  );
}
