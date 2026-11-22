// LimestoneJourney figure. Theme-aware.
export function LimestoneJourney({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Equation chain of limestone decomposing to lime and capturing silica as slag">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The limestone journey</text>
      <rect x="30" y="65" width="180" height="80" rx="10" fill="rgb(148 163 184)" opacity="0.15" stroke="rgb(148 163 184)" />
      <text x="120" y="95" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">CaCO₃ (limestone)</text>
      <text x="120" y="118" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">rides down the furnace</text>
      <path d="M 215 105 L 265 105" stroke="rgb(239 68 68)" strokeWidth="2.5" markerEnd="url(#lj-a)" />
      <text x="240" y="95" fontSize="9.5" textAnchor="middle" fill="rgb(239 68 68)">heat</text>
      <rect x="270" y="65" width="150" height="80" rx="10" fill="rgb(245 158 11)" opacity="0.12" stroke="rgb(245 158 11)" />
      <text x="345" y="95" fontSize="12" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">CaO + CO₂↑</text>
      <text x="345" y="118" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">the basic flux is born</text>
      <path d="M 425 105 L 475 105" stroke="rgb(16 185 129)" strokeWidth="2.5" markerEnd="url(#lj-a)" />
      <text x="450" y="95" fontSize="9.5" textAnchor="middle" fill="rgb(16 185 129)">+ SiO₂</text>
      <rect x="480" y="65" width="150" height="80" rx="10" fill="rgb(16 185 129)" opacity="0.12" stroke="rgb(16 185 129)" />
      <text x="555" y="95" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">CaSiO₃ (slag)</text>
      <text x="555" y="118" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">floats off, drawn away</text>
      <defs>
        <marker id="lj-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(148 163 184)" /></marker>
      </defs>
      <text x="330" y="185" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">~0.25 t of limestone per tonne of iron — not for the iron, for the sand</text>
    </svg>
  );
}
