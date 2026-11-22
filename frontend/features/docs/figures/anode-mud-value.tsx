// AnodeMudValue figure. Theme-aware.
export function AnodeMudValue({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Anode mud composition showing noble metals recovered from copper refining">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The mud that pays the bill</text>
      <rect x="60" y="60" width="540" height="60" rx="10" fill="rgb(148 163 184)" opacity="0.15" />
      <text x="330" y="85" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">impure copper anode — 99 % Cu plus passengers:</text>
      <text x="330" y="106" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">Zn · Fe · Ni · Ag · Au · Pt</text>
      <path d="M 200 125 L 140 170" stroke="rgb(239 68 68)" strokeWidth="2" markerEnd="url(#amv-a)" />
      <path d="M 330 125 L 330 170" stroke="rgb(16 185 129)" strokeWidth="2" markerEnd="url(#amv-a)" />
      <path d="M 460 125 L 520 170" stroke="rgb(59 130 246)" strokeWidth="2" markerEnd="url(#amv-a)" />
      <rect x="60" y="175" width="160" height="46" rx="8" fill="rgb(239 68 68)" opacity="0.12" />
      <text x="140" y="194" fontSize="10.5" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">baser → stay dissolved</text>
      <text x="140" y="211" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">Zn²⁺ Fe²⁺ Ni²⁺ in electrolyte</text>
      <rect x="250" y="175" width="160" height="46" rx="8" fill="rgb(16 185 129)" opacity="0.12" />
      <text x="330" y="194" fontSize="10.5" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">Cu → plates on cathode</text>
      <text x="330" y="211" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">99.99 % electrolytic copper</text>
      <rect x="440" y="175" width="160" height="46" rx="8" fill="rgb(59 130 246)" opacity="0.12" />
      <text x="520" y="194" fontSize="10.5" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">noble → anode mud</text>
      <text x="520" y="211" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">Ag Au Pt — sold, funds refining</text>
      <defs>
        <marker id="amv-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(148 163 184)" /></marker>
      </defs>
    </svg>
  );
}
