/** Anopheles vector identity — which mosquito transmits. Well-detailed. Theme-aware. */
export function AnophelesVectorIdentity({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Anopheles vector identity female mosquito blood meal 45 degree angle resting posture breeding clean stagnant water malaria transmission Culex contrast">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Anopheles — identifying the vector</text>
      {/* mosquito side view */}
      <rect x="30" y="44" width="380" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="220" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE 45° TELL</text>
      <ellipse cx="220" cy="150" rx="60" ry="16" className="fill-current text-slate-500/30" stroke="currentColor" strokeWidth="1.8" style={{ color: "rgb(120 113 108 / 0.9)" }} transform="rotate(-45 220 150)" />
      <circle cx="252" cy="108" r="10" className="fill-current text-slate-500/30" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <path d="M258 102 l38 -18" className="stroke-current" strokeWidth="2.4" strokeLinecap="round" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <path d="M214 156 l-30 26 M234 160 l-6 30" className="stroke-current" strokeWidth="2" style={{ color: "rgb(120 113 108 / 0.7)" }} />
      <text x="220" y="212" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">rests with body tilted ~45° — Culex rests parallel</text>
      {/* facts */}
      <rect x="440" y="44" width="250" height="216" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="565" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">VECTOR FACTS</text>
      {[
        "only the FEMALE bites — she",
        "  needs blood for her eggs",
        " Plasmodium completes its",
        "  sexual phase inside her gut",
        "breeds in clean, stagnant water —",
        "  ponds, rice fields, hoofprints",
        "control: nets, sprays, drainage,",
        "  larvivorous fish",
      ].map((t, i) => (
        <text key={t} x="456" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="240" width="660" height="52" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="258" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">One bite, two-way traffic: sporozoites travel in with saliva; gametocytes travel out with the blood meal.</text>
      <text x="360" y="276" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: female Anopheles, 45° resting posture, clean stagnant breeding water — the three vector identifiers.</text>
      <text x="360" y="288" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Definitive host = mosquito (sexual phase); intermediate host = man. Do not swap them.</text>
    </svg>
  );
}
