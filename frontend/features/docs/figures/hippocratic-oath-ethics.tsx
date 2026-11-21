/** Hippocratic oath medicine ethics — the doctor's founding promise. Well-detailed. Theme-aware. */
export function HippocraticOathEthics({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Hippocratic oath medical ethics do no harm primum non nocere confidentiality Hippocrates father of medicine Greece fourth century BC ethics codes modern declaration Geneva consent principles doctor patient">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The Hippocratic oath — where medical ethics begins</text>
      {/* oath */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE ORIGINAL PROMISES</text>
      {[
        "Hippocrates of Kos, ~400 BC —",
        "  the 'Father of Medicine'",
        "core pledges: do no harm",
        "  (primum non nocere), keep",
        "  patient confidences, teach",
        "  the craft only to worthy pupils",
        "the oath separated medicine from",
        "  magic: observation and ethics",
        "  over ritual",
        "modern versions (Geneva",
        "  Declaration) drop the old",
        "  social clauses, keep the core",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* ethics principles */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">TODAY'S FOUR PRINCIPLES</text>
      {[
        ["Autonomy", "the patient decides for themselves"],
        ["Beneficence", "act in the patient's best interest"],
        ["Non-maleficence", "above all, do no harm"],
        ["Justice", "fair distribution of care"],
      ].map(([k, v], i) => (
        <g key={k}>
          <text x="406" y={96 + i * 30} fontSize="6.8" className="fill-current text-emerald-600" fontWeight="800">{k}</text>
          <text x="406" y={110 + i * 30} fontSize="6.2" className="fill-current text-muted-foreground">{v}</text>
        </g>
      ))}
      <text x="540" y="228" fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">the four principles translate the oath</text>
      <text x="540" y="242" fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">into testable, teachable rules</text>
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: Hippocrates = Father of Medicine; the oath's core = do no harm + confidentiality.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Ethics written 2,400 years ago still sets the floor for modern practice.</text>
    </svg>
  );
}
