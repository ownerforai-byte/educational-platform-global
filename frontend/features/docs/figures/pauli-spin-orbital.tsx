// Pauli exclusion and the spin-paired orbital box. Theme-aware.
export function PauliSpinOrbital({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Pauli exclusion principle orbital box holding two electrons with opposite spins plus half and minus half and no two electrons share all four quantum numbers">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Pauli exclusion — one orbital, two spins, no more</text>
      <rect x="60" y="60" width="70" height="60" rx="6" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.8" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="82" y="102" fontSize="18" className="fill-current text-sky-600" fontWeight="800">↑</text>
      <text x="106" y="102" fontSize="18" className="fill-current text-rose-500" fontWeight="800">↓</text>
      <text x="95" y="142" fontSize="8.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">One orbital: maximum 2 electrons</text>
      <text x="95" y="158" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">mₛ = +½ and −½ — spins opposed</text>
      <rect x="250" y="52" width="420" height="76" rx="10" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="266" y="74" fontSize="9.5" className="fill-current text-emerald-600" fontWeight="800">The statement to quote</text>
      <text x="266" y="96" fontSize="9" className="fill-current text-foreground" fontWeight="700">No two electrons in the same atom can have all four</text>
      <text x="266" y="114" fontSize="9" className="fill-current text-foreground" fontWeight="700">quantum numbers identical.</text>
      <rect x="30" y="150" width="660" height="44" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="168" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">Two electrons in one box share n, l, mₗ — so their mₛ must differ. A third electron would have to repeat all four: forbidden.</text>
      <text x="360" y="186" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Consequence: orbital capacity 2, shell capacity 2n², and exchange energy behind half-filled stability.</text>
    </svg>
  );
}
