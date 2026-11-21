/** Frog respiration three modes share — skin lungs buccal. Well-detailed. Theme-aware. */
export function FrogRespirationThreeModesShare({ className }: { className?: string }) {
  const modes: [string, string, string][] = [
    ["Cutaneous", "through the wet skin — always on, even underwater", "~100% underwater, most at rest"],
    ["Buccopharyngeal", "lining of mouth cavity — used while floating quietly", "supplements at rest"],
    ["Pulmonary", "lungs via nostrils and buccal pump — active breathing", "dominant when active"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Frog respiration three modes share cutaneous buccopharyngeal pulmonary skin always on underwater lungs active buccal pump comparison wet surface oxygen diffusion">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Three breathing modes — one wet requirement</text>
      {/* shared principle */}
      <rect x="30" y="44" width="660" height="50" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="66" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">All three modes need one thing: a thin, moist surface where oxygen can dissolve and diffuse into the blood.</text>
      <text x="360" y="82" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">the frog never really left the water's rules — it just carries a portable water film (mucus) on its skin and mouth lining</text>
      {/* three modes */}
      <rect x="30" y="108" width="90" height="26" rx="6" className="fill-current text-slate-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="75" y="126" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">MODE</text>
      <rect x="120" y="108" width="330" height="26" rx="6" className="fill-current text-slate-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="285" y="126" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">HOW IT WORKS</text>
      <rect x="450" y="108" width="240" height="26" rx="6" className="fill-current text-slate-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="570" y="126" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHEN IT MATTERS</text>
      {modes.map(([name, how, when], i) => {
        const y = 142 + i * 46;
        return (
          <g key={name}>
            <text x="46" y={y + 18} fontSize="7" className="fill-current text-sky-600" fontWeight="800">{name}</text>
            <text x="134" y={y + 10} fontSize="6.6" className="fill-current text-muted-foreground">{how.slice(0, 44)}</text>
            <text x="134" y={y + 24} fontSize="6.6" className="fill-current text-muted-foreground">{how.slice(44, 88)}</text>
            <text x="464" y={y + 18} fontSize="6.6" className="fill-current text-muted-foreground">{when}</text>
          </g>
        );
      })}
      <rect x="30" y="252" width="660" height="40" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.6" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="268" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: name all three modes in order of surface — skin, mouth lining, lungs — and note that the skin works even underwater.</text>
      <text x="360" y="284" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">A hibernating frog buried in mud survives on cutaneous respiration alone.</text>
    </svg>
  );
}
