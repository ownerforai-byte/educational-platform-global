/** Paramecium conjugation — genetic reshuffling. Well-detailed. Theme-aware. */
export function ParameciumConjugation({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Paramecium conjugation two cells oral groove contact micronuclei exchange meiosis exconjugants genetic variation asexual line rejuvenation">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Conjugation — Paramecium's genetic handshake</text>
      {/* two cells joined */}
      <ellipse cx="220" cy="120" rx="110" ry="52" className="fill-current text-sky-500/15" stroke="currentColor" strokeWidth="2.4" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <ellipse cx="500" cy="120" rx="110" ry="52" className="fill-current text-emerald-500/15" stroke="currentColor" strokeWidth="2.4" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <path d="M330 100 q0 40 0 40" className="stroke-current" strokeWidth="0" />
      <rect x="326" y="70" width="8" height="100" rx="4" className="fill-current text-stone-500/40" stroke="currentColor" strokeWidth="1.2" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      {/* nuclei */}
      <circle cx="200" cy="112" r="16" className="fill-current text-sky-500/40" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <circle cx="222" cy="134" r="9" className="fill-current text-rose-500/40" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <circle cx="520" cy="112" r="16" className="fill-current text-emerald-500/40" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      <circle cx="498" cy="134" r="9" className="fill-current text-rose-500/40" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="200" y="196" fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">macro + micro nuclei</text>
      <text x="520" y="196" fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">macro + micro nuclei</text>
      <text x="360" y="206" fontSize="6.8" textAnchor="middle" className="fill-current text-rose-600" fontWeight="700">micronuclei swap through the bridge</text>
      {/* steps */}
      <rect x="30" y="216" width="660" height="76" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      {["two mating types unite oral-groove to oral-groove", "micronuclei undergo meiosis, haploid products swap", "each exconjugant rebuilds new macro + micro nuclei"].map((t, i) => (
        <text key={t} x="50" y={238 + i * 18} fontSize="7" className="fill-current text-muted-foreground">{i + 1}. {t}</text>
      ))}
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: conjugation is NOT reproduction — no new cells are made; it is genetic rejuvenation of an asexual line.</text>
    </svg>
  );
}
