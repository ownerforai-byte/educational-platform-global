/** Frog croak vocal sacs — sound as advertisement. Well-detailed. Theme-aware. */
export function FrogCroakVocalSacs({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Frog croak vocal sacs sound advertisement males only species recognition mating call females choose amplitude balloon resonance">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The croak — a sound with a job</text>
      {/* croaking frog */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">HOW THE SOUND IS MADE</text>
      {/* vocal sac balloon */}
      <circle cx="160" cy="150" r="30" className="fill-current text-sky-500/25" stroke="currentColor" strokeWidth="2.4" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="160" y="154" fontSize="6.2" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">vocal sac</text>
      <path d="M190 150 h60" className="stroke-current" strokeWidth="2.4" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <ellipse cx="270" cy="150" rx="18" ry="24" className="fill-current text-slate-500/20" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="270" y="186" fontSize="6" textAnchor="middle" className="fill-current text-muted-foreground">lungs</text>
      <text x="195" y="212" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">air shuttles lung → sac → lung; the sac is a resonance balloon</text>
      {/* why croak */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHY BOTHER?</text>
      {[
        "males only — females stay silent",
        "each species has its own rhythm,",
        "  so calls filter out the wrong mate",
        "louder, faster croaks advertise a",
        "  fitter male — females choose",
        "cost: croaking males are easier",
        "  for predators to locate too",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: vocal sacs amplify the call — croaking is a male secondary character tied to breeding season.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Sexual dimorphism: nuptial pads + vocal sacs mark the male; the female is larger and silent.</text>
    </svg>
  );
}
