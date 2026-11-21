/** Pesticide poisoning first aid — what to do in the field. Well-detailed. Theme-aware. */
export function PesticidePoisoningFirstAid({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Pesticide poisoning first aid symptoms salivation tears tremor field response remove clothes wash skin atropine antidote hospital cholinergic signs organophosphate emergency steps Nepal farmer">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Pesticide poisoning — recognise and respond</text>
      {/* symptoms */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">RECOGNISE (CHOLINERGIC SIGNS)</text>
      {[
        "the acronym: SLUDGE —",
        "  Salivation, Lacrimation (tears),",
        "  Urination, Defecation, GI pain,",
        "  Emesis (vomiting)",
        "plus: pinpoint pupils, sweating,",
        "  muscle twitching, tremors",
        "worst signs: convulsions,",
        "  breathing difficulty, unconsciousness",
        "organophosphates kill fastest —",
        "  minutes, not hours",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* response */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">RESPOND — IN ORDER</text>
      {[
        "1. move the person away from",
        "  the source; fresh air",
        "2. remove contaminated clothes",
        "3. wash skin with soap and",
        "  water (not bare hands)",
        "4. call for medical help —",
        "  say which pesticide",
        "5. atropine is the antidote for",
        "  organophosphates — given by",
        "  health workers, not farmers",
        "never induce vomiting if the",
        "  victim is drowsy or convulsing",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 18} fontSize="6.6" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-rose-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: SLUDGE signs point to organophosphate poisoning; the response order is remove → wash → antidote.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Prevention beats response: label reading, protection, and never decanting into drink bottles.</text>
    </svg>
  );
}
