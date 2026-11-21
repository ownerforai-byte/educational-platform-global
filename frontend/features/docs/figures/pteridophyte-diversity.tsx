/** Pteridophyte diversity — Lycopodium, Selaginella, Equisetum, Dryopteris. Theme-aware. */
export function PteridophyteDiversity({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Pteridophyte diversity with lycopodium clubmoss selaginella spike moss equisetum horsetail ribbed stems and dryopteris fern">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Four faces of Pteridophyta</text>

      {/* Lycopodium */}
      <g>
        <rect x="16" y="56" width="150" height="150" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
        <g className="stroke-current text-emerald-600" strokeWidth="2.5">
          <line x1="91" y1="190" x2="91" y2="110" /><line x1="91" y1="150" x2="76" y2="120" /><line x1="91" y1="150" x2="106" y2="120" /><line x1="91" y1="120" x2="80" y2="96" /><line x1="91" y1="120" x2="102" y2="96" />
        </g>
        <text x="91" y="212" fontSize="8.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">LYCOPODIUM</text>
        <text x="91" y="226" fontSize="7.5" textAnchor="middle" className="fill-current text-muted-foreground">clubmoss; strobili</text>
      </g>

      {/* Selaginella */}
      <g>
        <rect x="178" y="56" width="150" height="150" rx="12" className="fill-current text-teal-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(20 184 166 / 0.9)" }} />
        <g className="stroke-current text-teal-600" strokeWidth="2.5">
          <line x1="253" y1="190" x2="253" y2="100" /><line x1="253" y1="160" x2="228" y2="130" /><line x1="253" y1="160" x2="278" y2="130" /><line x1="253" y1="130" x2="232" y2="104" /><line x1="253" y1="130" x2="274" y2="104" />
        </g>
        <text x="253" y="212" fontSize="8.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">SELAGINELLA</text>
        <text x="253" y="226" fontSize="7.5" textAnchor="middle" className="fill-current text-muted-foreground">spike moss; heterosporous</text>
      </g>

      {/* Equisetum */}
      <g>
        <rect x="340" y="56" width="150" height="150" rx="12" className="fill-current text-lime-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(132 204 22 / 0.9)" }} />
        <g className="stroke-current text-lime-600" strokeWidth="4">
          <line x1="415" y1="190" x2="415" y2="100" />
        </g>
        {[110, 130, 150, 170].map((y) => (
          <line key={y} x1="405" y1={y} x2="425" y2={y} strokeWidth="2" className="stroke-current text-lime-700" />
        ))}
        <text x="415" y="212" fontSize="8.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">EQUISETUM</text>
        <text x="415" y="226" fontSize="7.5" textAnchor="middle" className="fill-current text-muted-foreground">horsetail; silica stems</text>
      </g>

      {/* Dryopteris */}
      <g>
        <rect x="502" y="56" width="150" height="150" rx="12" className="fill-current text-emerald-400/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(52 211 153 / 0.9)" }} />
        <g className="stroke-current text-emerald-600" strokeWidth="3">
          <line x1="577" y1="190" x2="577" y2="110" />
        </g>
        {[115, 135, 155, 175].map((y) => (
          <g key={y}>
            <path d={`M577 ${y} q-14 -6 -26 2`} fill="none" strokeWidth="5" strokeLinecap="round" className="stroke-current text-emerald-500/70" />
            <path d={`M577 ${y} q14 -6 26 2`} fill="none" strokeWidth="5" strokeLinecap="round" className="stroke-current text-emerald-500/70" />
          </g>
        ))}
        <text x="577" y="212" fontSize="8.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">DRYOPTERIS</text>
        <text x="577" y="226" fontSize="7.5" textAnchor="middle" className="fill-current text-muted-foreground">true fern; sori</text>
      </g>
      <text x="16" y="234" fontSize="10" className="fill-current text-muted-foreground">Selaginella matters most in exams: it makes TWO spore sizes (heterospory) — the first step toward seeds.</text>
    </svg>
  );
}
