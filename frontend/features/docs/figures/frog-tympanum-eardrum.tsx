/** Frog tympanum eardrum — hearing without ears. Well-detailed. Theme-aware. */
export function FrogTympanumEardrum({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Frog tympanum eardrum hearing without ears external eardrum behind eye size dimorphism male female vocal sac sound detection sex recognition">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The tympanum — an eardrum on the surface</text>
      {/* frog head with tympanum */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHERE IT SITS</text>
      <ellipse cx="180" cy="150" rx="70" ry="50" className="fill-current text-emerald-500/20" stroke="currentColor" strokeWidth="2.2" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      <circle cx="150" cy="130" r="5" className="fill-current text-slate-700" style={{ color: "rgb(55 65 81 / 0.9)" }} />
      <text x="150" y="118" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">eye</text>
      <circle cx="225" cy="145" r="13" className="fill-current text-sky-500/40" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="225" y="176" fontSize="6" textAnchor="middle" className="fill-current text-sky-600" fontWeight="700">tympanum</text>
      <text x="195" y="212" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">a bare, vibrating disc just behind the eye — no external ear</text>
      {/* dimorphism */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">SIZE TELLS THE SEX</text>
      {[
        "male: tympanum noticeably larger",
        "  than the eye — tuned to croaks",
        "female: tympanum about equal to",
        "  the eye — she is being called,",
        "  not calling",
        "same sound world, different",
        "  receiving hardware",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: tympanum = external eardrum behind the eye; larger in males — a visible sex marker in the field.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Sound travels straight to the inner ear — the simplest vertebrate hearing setup.</text>
    </svg>
  );
}
