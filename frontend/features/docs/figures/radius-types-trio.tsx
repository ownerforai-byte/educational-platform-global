// Three radius definitions compared. Theme-aware.
export function RadiusTypesTrio({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 220" className={className} role="img" aria-label="Three atomic radius definitions covalent radius half bond distance van der Waals radius half closest approach and ionic radius of charged species compared in size">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Radius has three meanings — know which one is asked</text>
      <rect x="30" y="44" width="220" height="110" rx="10" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="140" y="66" fontSize="9.5" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">Covalent radius</text>
      <circle cx="100" cy="104" r="22" className="fill-current text-sky-500/25" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <circle cx="180" cy="104" r="22" className="fill-current text-sky-500/25" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <line x1="122" y1="104" x2="158" y2="104" className="stroke-current text-foreground" strokeWidth="1.6" />
      <text x="140" y="146" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">half the bonded distance between</text>
      <text x="140" y="160" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">two identical atoms (Cl–Cl)</text>
      <rect x="260" y="44" width="220" height="110" rx="10" className="fill-current text-violet-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="370" y="66" fontSize="9.5" textAnchor="middle" className="fill-current text-violet-600" fontWeight="800">van der Waals radius</text>
      <circle cx="330" cy="104" r="26" className="fill-current text-violet-500/20" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <circle cx="416" cy="104" r="26" className="fill-current text-violet-500/20" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="370" y="146" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">half the closest approach of</text>
      <text x="370" y="160" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">non-bonded neighbours — always larger</text>
      <rect x="490" y="44" width="200" height="110" rx="10" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="590" y="66" fontSize="9.5" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="800">Ionic radius</text>
      <circle cx="545" cy="104" r="28" className="fill-current text-emerald-500/20" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <circle cx="635" cy="104" r="16" className="fill-current text-emerald-500/20" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="590" y="146" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">cations shrink, anions swell</text>
      <text x="590" y="160" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">vs the parent atom</text>
      <rect x="30" y="168" width="660" height="40" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="186" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">Ordering: van der Waals &gt; covalent &gt; cation, and anion &gt; covalent — quoting one comparison earns the mark.</text>
      <text x="360" y="200" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Never mix the three scales inside one trend argument — that is the classic lost mark.</text>
    </svg>
  );
}
