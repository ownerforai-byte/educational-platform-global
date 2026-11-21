/** Pacemakers defibrillators — the electronic heartbeat. Well-detailed. Theme-aware. */
export function PacemakersDefibrillators({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Pacemakers defibrillators implantable devices electronic heartbeat arrhythmia bradycardia tachycardia fibrillation AED automated external defibrillator CPR chain of survival pacemaker battery leads sinoatrial node replacement ICD cardioversion public places first aid device lifespan surgery">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Electronic hearts — pacemakers and defibrillators</text>
      {/* two devices */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">PACEMAKER (too slow)</text>
      {[
        "for bradycardia — a heart that",
        "  beats too slowly or pauses",
        "implanted under the collarbone;",
        "  leads thread to the heart",
        "it senses each beat and paces",
        "  only when needed — demand",
        "  pacing",
        "battery lasts ~10 years; the",
        "  device is replaced in a minor",
        "  procedure",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* defibrillator */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">DEFIBRILLATOR (chaotic)</text>
      {[
        "for fibrillation — chaotic",
        "  electrical storm, no effective",
        "  pumping",
        "a controlled shock resets the",
        "  heart's electrical system —",
        "  'reboot'",
        "ICD: implanted version that",
        "  fires automatically",
        "AED: public-place version that",
        "  talks the rescuer through it —",
        "  CPR + AED is the chain of",
        "  survival",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-rose-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: pacemaker fixes a too-slow heart; defibrillator stops a chaotic one — direction and rhythm decide the device.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">A defibrillator doesn't restart a flatlined heart — it stops fibrillation so the heart can restart itself.</text>
    </svg>
  );
}
