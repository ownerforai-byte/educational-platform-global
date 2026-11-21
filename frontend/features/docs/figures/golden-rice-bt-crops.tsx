/** Golden rice and Bt crops — agriculture's gene gifts. Well-detailed. Theme-aware. */
export function GoldenRiceBtCrops({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Golden rice beta carotene vitamin A Bt cotton insect resistance Bacillus thuringiensis transgenic crops agriculture biotechnology GM plants blindness">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Two transgenic crops that changed arguments</text>

      {/* golden rice */}
      <rect x="30" y="44" width="330" height="220" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="195" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">GOLDEN RICE — built-in vitamin A</text>
      {/* rice panicle golden */}
      <path d="M120 110 v110" className="stroke-current text-amber-700" strokeWidth="3" style={{ color: "rgb(180 130 40 / 0.9)" }} />
      {[0, 1, 2, 3, 4, 5].map((j) => (
        <ellipse key={j} cx={120 + (j % 2 ? 14 : -14)} cy={120 + j * 18} rx="12" ry="7" className="fill-current text-amber-400/50" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      ))}
      <text x="195" y="236" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">genes from maize + bacteria make β-carotene in the grain</text>
      {[
        "vitamin A deficiency → blindness,",
        "child deaths across Asia",
        "golden colour = the provitamin",
        "ordinary rice has none",
      ].map((t, i) => (
        <text key={t} x={250 + (i % 2) * 0} y={100 + i * 16} fontSize="7" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : t}</text>
      ))}
      <text x="50" y="260" fontSize="7" className="fill-current text-amber-600" fontWeight="700">one gene package, one deficiency addressed</text>

      {/* Bt cotton */}
      <rect x="390" y="44" width="300" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Bt COTTON — built-in insecticide</text>
      {/* cotton plant */}
      <path d="M480 110 v110" className="stroke-current text-emerald-700" strokeWidth="3" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      {[[468, 130], [492, 150], [468, 170], [492, 190]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="9" className="fill-current text-lime-200/60" stroke="currentColor" strokeWidth="1.2" style={{ color: "rgb(163 230 53 / 0.9)" }} />
        </g>
      ))}
      {/* dead bollworm */}
      <path d="M560 140 q10 -6 20 0 q8 6 -2 12 q-12 4 -18 -4 q-4 -6 0 -8" className="fill-current text-stone-500/40" stroke="currentColor" strokeWidth="1.4" />
      <text x="570" y="166" fontSize="6.4" textAnchor="middle" className="fill-current text-stone-500">bollworm dies</text>
      {[
        "Bacillus thuringiensis toxin gene",
        "inserted into cotton",
        "plant makes its own Bt protein",
        "bollworm larvae die on feeding",
        "less chemical spraying",
      ].map((t, i) => (
        <text key={t} x="406" y={196 + i * 14} fontSize="7" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : t}</text>
      ))}
      <rect x="30" y="272" width="660" height="20" rx="6" className="fill-current text-amber-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: golden rice fights a vitamin deficiency; Bt cotton fights a pest — both are transgenic plants.</text>
    </svg>
  );
}
