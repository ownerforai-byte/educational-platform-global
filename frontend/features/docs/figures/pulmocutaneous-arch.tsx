/** Pulmocutaneous arch — the frog's unique exit. Well-detailed. Theme-aware. */
export function PulmocutaneousArch({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Pulmocutaneous arch frog unique exit ventricle outflow splits pulmonary skin branches blood to lungs and skin simultaneously dual respiratory surface">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Pulmocutaneous arch — blood to lungs AND skin</text>
      {/* arch diagram */}
      <rect x="30" y="44" width="660" height="170" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ONE VESSEL, TWO DESTINATIONS</text>
      {/* ventricle */}
      <circle cx="160" cy="150" r="30" className="fill-current text-violet-500/25" stroke="currentColor" strokeWidth="2.2" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="160" y="154" fontSize="6.2" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">ventricle</text>
      {/* truncus */}
      <path d="M190 150 h60" className="stroke-current" strokeWidth="6" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="220" y="140" fontSize="6" textAnchor="middle" className="fill-current text-muted-foreground">truncus</text>
      {/* split */}
      <path d="M250 150 q30 -30 60 -30" className="fill-none stroke-current" strokeWidth="4" style={{ color: "rgb(220 38 38 / 0.9)" }} />
      <path d="M250 150 q30 30 60 30" className="fill-none stroke-current" strokeWidth="4" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <rect x="310" y="100" width="110" height="36" rx="8" className="fill-current text-rose-500/15" strokeWidth="1.6" stroke="currentColor" style={{ color: "rgb(220 38 38 / 0.9)" }} />
      <text x="365" y="122" fontSize="6.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">systemic arch → body</text>
      <rect x="310" y="170" width="110" height="36" rx="8" className="fill-current text-sky-500/20" strokeWidth="1.6" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="365" y="192" fontSize="6.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">pulmocutaneous arch</text>
      <path d="M420 188 h50 m-8 -5 l8 5 l-8 5" className="fill-none stroke-current" strokeWidth="2.4" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="480" y="180" fontSize="6.2" className="fill-current text-sky-600" fontWeight="700">→ lungs</text>
      <text x="480" y="198" fontSize="6.2" className="fill-current text-emerald-600" fontWeight="700">→ skin</text>
      <text x="360" y="224" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">one arch feeds both respiratory surfaces — plumbing that mirrors the frog's dual breathing strategy</text>
      {/* facts */}
      <rect x="30" y="230" width="660" height="62" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="250" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The name is the function: pulmo- (lungs) + cutaneous (skin). Blood arrives at both oxygen-absorbing surfaces at once.</text>
      <text x="360" y="268" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Mammals separated the two jobs: pulmonary artery to lungs only, skin out of the respiratory business entirely.</text>
      <text x="360" y="284" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: pulmocutaneous arch supplies lungs + skin — the anatomical signature of dual respiration.</text>
    </svg>
  );
}
