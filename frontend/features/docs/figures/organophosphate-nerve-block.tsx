/** Organophosphate nerve block — acetylcholinesterase hijacked. Well-detailed. Theme-aware. */
export function OrganophosphateNerveBlock({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Organophosphate nerve block acetylcholinesterase inhibition synapse acetylcholine accumulation muscle tremor paralysis nerve gas pesticide malathion parathion antidote atropine irreversible">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Organophosphates — jamming the nerve switch</text>
      {/* synapse diagram */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">AT THE SYNAPSE</text>
      {/* normal vs blocked */}
      <rect x="60" y="90" width="120" height="110" rx="10" className="fill-current text-emerald-500/10" strokeWidth="1.6" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="120" y="110" fontSize="6.2" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">NORMAL</text>
      <text x="120" y="130" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">signal sent, enzyme</text>
      <text x="120" y="144" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">breaks messenger down,</text>
      <text x="120" y="158" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">muscle relaxes, next</text>
      <text x="120" y="172" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">signal can arrive</text>
      <rect x="210" y="90" width="120" height="110" rx="10" className="fill-current text-rose-500/10" strokeWidth="1.6" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="270" y="110" fontSize="6.2" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">POISONED</text>
      <text x="270" y="130" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">enzyme blocked, messenger</text>
      <text x="270" y="144" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">accumulates, muscle fires</text>
      <text x="270" y="158" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">without pause — tremors,</text>
      <text x="270" y="172" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">convulsions, paralysis</text>
      <text x="195" y="218" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">the pesticide doesn't kill the insect directly — it removes the OFF switch</text>
      {/* facts */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">SAFETY FACTS</text>
      {[
        "act fast and break down faster",
        "  than organochlorines — less",
        "  environmental persistence",
        "but acutely dangerous to humans:",
        "  farm-worker poisonings are",
        "  mostly this class",
        "malathion is the safer member;",
        "  parathion among the worst",
        "antidote: atropine plus enzyme",
        "  reactivators, given quickly",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-violet-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: organophosphate = acetylcholinesterase inhibitor — name the enzyme and the effect (uncontrolled firing).</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">The same chemistry, weaponised, is nerve gas — pesticides and weapons share a mechanism.</text>
    </svg>
  );
}
