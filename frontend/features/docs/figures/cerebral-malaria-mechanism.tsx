/** Cerebral malaria mechanism — why falciparum kills. Well-detailed. Theme-aware. */
export function CerebralMalariaMechanism({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Cerebral malaria mechanism falciparum infected RBCs stick capillary walls sequestration brain vessels coma rosetting knob proteins adhesion">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Cerebral malaria — the capillary traffic jam</text>
      {/* healthy vessel */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">NORMAL CAPILLARY</text>
      <path d="M60 140 h270" className="stroke-current" strokeWidth="0" />
      <rect x="60" y="112" width="270" height="56" rx="28" className="fill-none stroke-current" strokeWidth="2.2" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      {[[100, 128], [150, 148], [200, 126], [250, 150], [295, 132]].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="14" ry="9" className="fill-current text-rose-500/30" stroke="currentColor" strokeWidth="1" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      ))}
      <text x="195" y="196" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">cells flow freely — oxygen delivered, no blockage</text>
      {/* blocked vessel */}
      <rect x="390" y="44" width="300" height="180" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">FALCIPARUM SEQUESTRATION</text>
      <rect x="420" y="112" width="240" height="56" rx="28" className="fill-none stroke-current" strokeWidth="2.2" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      {[[440, 118], [470, 122], [500, 118], [530, 122], [560, 118], [590, 122], [620, 120]].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="13" ry="10" className="fill-current text-rose-500/40" stroke="currentColor" strokeWidth="1" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      ))}
      <text x="540" y="196" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">infected cells grow knobs and stick to the wall — flow stops</text>
      <rect x="30" y="240" width="660" height="52" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="258" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">In brain vessels this jams oxygen supply → convulsions and coma. In placenta vessels it starves the fetus. Only falciparum sequesters this way.</text>
      <text x="360" y="276" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: sequestration of infected RBCs in brain capillaries is the mechanism — name it, then name coma as the sign.</text>
      <text x="360" y="288" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">That single sentence separates falciparum from every other human malaria.</text>
    </svg>
  );
}
