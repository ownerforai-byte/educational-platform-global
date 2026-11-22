// Radioactive tracer proof of dynamic equilibrium. Theme-aware.
export function TracerDynamismProof({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 280" className={className} role="img" aria-label="Radioactive tracer added at equilibrium appears in products while concentrations stay constant, proving the forward reaction still runs">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">The tracer test: equilibrium is alive</text>
      <rect x="40" y="60" width="240" height="120" rx="12" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity="0.12" />
      <text x="60" y="88" fontSize="13" fontWeight="800" className="fill-current text-foreground">1. Equilibrium flask</text>
      <text x="60" y="110" fontSize="11" className="fill-current text-muted-foreground">A = B at constant amounts</text>
      <circle cx="110" cy="150" r="12" fill="rgb(59 130 246)" />
      <circle cx="160" cy="150" r="12" fill="rgb(59 130 246)" />
      <circle cx="210" cy="150" r="12" fill="rgb(59 130 246)" />
      <rect x="330" y="60" width="240" height="120" rx="12" className="fill-current" style={{ color: "rgb(245 158 11)" }} opacity="0.14" />
      <text x="350" y="88" fontSize="13" fontWeight="800" className="fill-current text-foreground">2. Inject radioactive A*</text>
      <text x="350" y="110" fontSize="11" className="fill-current text-muted-foreground">labelled atoms join the reactant pool</text>
      <circle cx="400" cy="150" r="12" fill="rgb(245 158 11)" />
      <circle cx="450" cy="150" r="12" fill="rgb(59 130 246)" />
      <circle cx="500" cy="150" r="12" fill="rgb(59 130 246)" />
      <path d="M 280 120 L 330 120" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" markerEnd="url(#arr)" />
      <defs><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="none" stroke="currentColor" className="text-muted-foreground" /></marker></defs>
      <rect x="40" y="200" width="530" height="52" rx="10" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.16" />
      <text x="60" y="222" fontSize="13" fontWeight="800" className="fill-current text-foreground">3. Radioactivity appears in B - yet [A] and [B] never changed</text>
      <text x="60" y="242" fontSize="11" className="fill-current text-muted-foreground">Only explanation: A keeps turning into B at the same rate B turns back into A</text>
      <text x="330" y="272" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Labels move; concentrations do not - the definition of dynamic</text>
    </svg>
  );
}
