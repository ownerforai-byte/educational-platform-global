/** Cursorial speed adaptations — built for the run. Well-detailed. Theme-aware. */
export function CursorialSpeedAdaptations({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Cursorial speed adaptations long limbs digitigrade stance reduced clavicle fused bones flexible spine stride length cheetah horse oxygen delivery chase predator prey">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Cursorial adaptations — anatomy of the run</text>
      {/* limb comparison */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">LIMBS AS LEVERS</text>
      {/* short vs long limb */}
      <path d="M90 190 v-60 m0 0 h18" className="stroke-current" strokeWidth="7" strokeLinecap="round" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="99" y="214" fontSize="6" className="fill-current text-muted-foreground">human: flat foot, short lever</text>
      <path d="M260 100 v40 q0 14 -12 22 q-14 10 -30 12 q-16 4 -22 16" className="fill-none stroke-current" strokeWidth="7" strokeLinecap="round" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="255" y="214" fontSize="6" className="fill-current text-amber-600">horse: digitigrade-unguligrade, long lever</text>
      <text x="195" y="234" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">longer distal limbs = longer stride = more ground per beat</text>
      {/* features list */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE RUNNER'S CHECKLIST</text>
      {[
        "long limbs, reduced side toes —",
        "  mass concentrated near the hip",
        "digitigrade/unguligrade stance",
        "  effectively lengthens the leg",
        "clavicle lost or reduced: the",
        "  shoulder swings freely",
        "flexible spine stores and returns",
        "  energy each bound (cheetah)",
        "big heart, wide nostrils — the",
        "  oxygen supply matches the legs",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-amber-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: cursorial = running adaptation — long limbs, reduced digits, free shoulder blade, flexible spine.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Predator and prey co-evolved the same kit: the cheetah's speed exists because the deer's did too.</text>
    </svg>
  );
}
