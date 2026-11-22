// D2O moderator role in reactors. Theme-aware.
export function D2oReactorRole({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 250" className={className} role="img" aria-label="Heavy water slowing fast neutrons to thermal speeds while absorbing very few, enabling natural uranium fission">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Why reactors drink heavy water</text>
      <circle cx="150" cy="120" r="70" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.12" />
      <text x="150" y="115" fontSize="12.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">D₂O pool</text>
      <text x="150" y="135" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">moderator + coolant</text>
      <path d="M 60 100 Q 110 110 150 120" stroke="rgb(239 68 68)" strokeWidth="2.5" fill="none" markerEnd="url(#arn)" />
      <text x="46" y="92" fontSize="10.5" fill="rgb(239 68 68)">fast n</text>
      <path d="M 150 120 Q 220 130 280 125" stroke="rgb(16 185 129)" strokeWidth="2.5" fill="none" markerEnd="url(#arn2)" />
      <text x="290" y="130" fontSize="10.5" fill="rgb(16 185 129)">thermal n → fission</text>
      <defs>
        <marker id="arn" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(239 68 68)" /></marker>
        <marker id="arn2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(16 185 129)" /></marker>
      </defs>
      <rect x="360" y="70" width="260" height="110" rx="10" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity="0.12" />
      <text x="380" y="96" fontSize="12" fontWeight="800" className="fill-current text-foreground">the deuterium advantage:</text>
      <text x="380" y="120" fontSize="11" className="fill-current text-muted-foreground">- slows neutrons well (light nucleus)</text>
      <text x="380" y="142" fontSize="11" className="fill-current text-muted-foreground">- captures ~600x fewer than ¹H</text>
      <text x="380" y="164" fontSize="11" className="fill-current text-muted-foreground">- so natural uranium works</text>
      <text x="330" y="226" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Slow them without eating them - the moderator's whole job</text>
    </svg>
  );
}
