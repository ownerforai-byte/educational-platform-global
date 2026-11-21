/** Australopithecus Lucy profile — first biped. Well-detailed. Theme-aware. */
export function AustralopithecusLucy({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Australopithecus Lucy profile first biped 3.2 million years afarensis brain 450 cc long arms curved fingers Ethiopia Hadar">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Lucy (Australopithecus afarensis) — the first strider</text>
      {/* body */}
      <circle cx="300" cy="100" r="20" className="fill-current text-amber-500/20" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <path d="M300 120 q-16 30 -8 62" className="stroke-current" strokeWidth="12" strokeLinecap="round" style={{ color: "rgb(217 119 6 / 0.6)" }} />
      <path d="M296 182 l-14 60 M304 182 l18 58" className="stroke-current" strokeWidth="6" strokeLinecap="round" style={{ color: "rgb(217 119 6 / 0.6)" }} />
      <path d="M292 138 l-26 40 M308 138 l28 38" className="stroke-current" strokeWidth="5" strokeLinecap="round" style={{ color: "rgb(217 119 6 / 0.6)" }} />
      <text x="300" y="272" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">bipedal pelvis and knee — but long arms, curved fingers</text>
      {/* facts */}
      <rect x="430" y="44" width="260" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="560" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE FACT CARD</text>
      {[
        ["Age", "~3.2 million years"],
        ["Found", "Hadar, Ethiopia, 1974"],
        ["Brain", "~450–500 cc (chimp-sized)"],
        ["Height", "~1.0–1.2 m"],
        ["Posture", "walked upright (pelvis, knee)"],
        ["Hands", "still climbed trees well"],
        ["Significance", "bipedalism came BEFORE big brains"],
      ].map(([k, v], i) => (
        <g key={k}>
          <text x="446" y={92 + i * 22} fontSize="7" className="fill-current text-sky-600" fontWeight="700">{k}</text>
          <text x="494" y={92 + i * 22} fontSize="7" className="fill-current text-muted-foreground">{v}</text>
        </g>
      ))}
      <rect x="30" y="44" width="380" height="30" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.6" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="220" y="64" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">40% of a skeleton — the most complete early hominin find of its time.</text>
      <rect x="30" y="282" width="0" height="0" />
      <rect x="30" y="256" width="380" height="36" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="220" y="272" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: Lucy proves the order — stand first, think big later.</text>
      <text x="220" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Her brain is chimp-sized; her pelvis is human-like.</text>
    </svg>
  );
}
