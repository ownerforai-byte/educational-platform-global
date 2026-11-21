/** Frog sinus venosus pacemaker — the heart's entry hall. Well-detailed. Theme-aware. */
export function FrogSinusVenosusPacemaker({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Frog sinus venosus pacemaker heart entry hall receives venous blood from body initiates beat before mammalian sinus node comparison SA node evolutionary">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Sinus venosus — the heart's entry hall and pacemaker</text>
      {/* heart anatomy */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">BLOOD'S ROUTE IN</text>
      {/* sinus venosus */}
      <rect x="80" y="100" width="80" height="44" rx="10" className="fill-current text-sky-500/25" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="120" y="126" fontSize="6" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">sinus venosus</text>
      {/* right atrium */}
      <rect x="180" y="100" width="70" height="44" rx="10" className="fill-current text-sky-500/15" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="215" y="126" fontSize="6" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">right atrium</text>
      {/* left atrium */}
      <rect x="180" y="152" width="70" height="44" rx="10" className="fill-current text-rose-500/15" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(220 38 38 / 0.9)" }} />
      <text x="215" y="178" fontSize="6" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">left atrium</text>
      {/* ventricle */}
      <rect x="110" y="152" width="60" height="60" rx="12" className="fill-current text-violet-500/20" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="140" y="186" fontSize="6" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">ventricle</text>
      <path d="M160 122 h20 m-6 -5 l6 5 l-6 5" className="fill-none stroke-current" strokeWidth="2" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="232" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">venous blood from the whole body enters via the sinus venosus, then the right atrium</text>
      {/* pacemaker */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE PACEMAKER ROLE</text>
      {[
        "its muscular wall initiates the",
        "  heartbeat before the atria fire",
        "it is the frog's equivalent of the",
        "  mammalian SA node",
        "evolution story: in mammals the",
        "  sinus venosus shrank into the",
        "  specialised pacemaker tissue",
        "  embedded in the right atrium",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-rose-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: sinus venosus = receives all venous blood AND starts the beat — a chamber with two jobs.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Its mammalian descendant is the SA node — same tissue, new address.</text>
    </svg>
  );
}
