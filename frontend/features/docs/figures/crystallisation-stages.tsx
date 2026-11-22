export function CrystallisationStages({ className }: { className?: string }) {
  const stages = [
    { t: "Dissolve", d: "solute in hot solvent" },
    { t: "Saturate", d: "cool to saturation" },
    { t: "Nucleate", d: "seed or dust starts order" },
    { t: "Grow", d: "lattice builds layer by layer" },
  ];
  return (
    <svg viewBox="0 0 560 210" role="img" aria-label="Stages of crystallisation from solution" className={className}>
      <text x="280" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">Crystallisation - Four Stages</text>
      {stages.map((s, i) => (
        <g key={i} transform={`translate(${30 + i * 135}, 50)`}>
          <rect width="120" height="70" rx="8" className="fill-current opacity-5" stroke="currentColor" strokeWidth="1.2" />
          <text x="60" y="28" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="currentColor">{s.t}</text>
          <text x="60" y="50" textAnchor="middle" fontSize="9.5" className="fill-current opacity-70">{s.d}</text>
          {i < 3 && <line x1="122" y1="85" x2="133" y2="85" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrCr)" />}
        </g>
      ))}
      <defs><marker id="arrCr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="currentColor" /></marker></defs>
      <text x="280" y="165" textAnchor="middle" fontSize="10.5" className="fill-current opacity-75">Evaporation or cooling supplies the driving force</text>
      <text x="280" y="190" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">Seed crystals direct the final habit - the reverse of efflorescence's decay</text>
    </svg>
  );
}
