/** Malaria diagnosis & treatment pathway — symptoms to blood test to drugs. Theme-aware. */
export function MalariaDiagnosisTreatment({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Malaria diagnosis and treatment pathway from fever suspicion to blood smear and rapid tests to antimalarial drugs and follow up">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Diagnosis → treatment, step by step</text>

      {[
        { x: 70, t: "SUSPECT", s: "fever with chills\n+ travel/stay in\nendemic area", c: "rgb(245 158 11 / 0.9)" },
        { x: 240, t: "CONFIRM", s: "blood smear shows\nparasite in RBC;\nrapid antigen test", c: "rgb(14 165 233 / 0.9)" },
        { x: 410, t: "TREAT", s: "chloroquine /\nartemisinin combo;\nprimaquine for liver forms", c: "rgb(22 163 74 / 0.9)" },
        { x: 580, t: "FOLLOW UP", s: "fever settles;\ncheck for relapse\n(dormant liver forms)", c: "rgb(124 58 237 / 0.9)" },
      ].map((n, i) => (
        <g key={n.t}>
          <rect x={n.x - 55} y="80" width="110" height="90" rx="12" style={{ color: n.c }} className="fill-current opacity-12" strokeWidth="2.5" stroke="currentColor" />
          <text x={n.x} y="102" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          {n.s.split('\n').map((line, j) => (
            <text key={j} x={n.x} y={120 + j * 14} fontSize="7.5" textAnchor="middle" className="fill-current text-muted-foreground">{line}</text>
          ))}
          {i < 3 && <line x1={n.x + 57} y1="125" x2={n.x + 83} y2="125" strokeWidth="2.5" className="stroke-current text-foreground" />}
        </g>
      ))}

      <text x="16" y="200" fontSize="10" className="fill-current text-muted-foreground">Why the blood smear matters: the species (vivax vs falciparum) decides the drug and the urgency — falciparum is a medical emergency.</text>
      <text x="16" y="222" fontSize="10" className="fill-current text-muted-foreground">Relapse warning: P. vivax can hide in liver cells and reappear months later; primaquine targets those dormant forms.</text>
    </svg>
  );
}
