// SoftMetalSulphur figure. Theme-aware.
export function SoftMetalSulphur({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Soft metal ions binding thiol groups of enzymes and disabling them">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Mechanism 1: soft metals love soft sulphur</text>
      <rect x="60" y="60" width="200" height="90" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="160" y="86" fontSize="11" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">enzyme cysteine</text>
      <text x="160" y="112" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">–SH (thiol)</text>
      <text x="160" y="134" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">the soft target</text>
      <path d="M 265 105 L 320 105" stroke="rgb(239 68 68)" strokeWidth="2.5" markerEnd="url(#sms-a)" />
      <text x="292" y="95" fontSize="9" fill="rgb(239 68 68)" textAnchor="middle">binds</text>
      <rect x="325" y="60" width="140" height="90" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="395" y="92" fontSize="11.5" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">Hg²⁺ Pb²⁺</text>
      <text x="395" y="114" fontSize="11.5" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">Cd²⁺ As(III)</text>
      <text x="395" y="138" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">soft Lewis acids</text>
      <rect x="490" y="60" width="130" height="90" rx="10" fill="rgb(148 163 184)" opacity="0.15" stroke="rgb(148 163 184)" />
      <text x="555" y="95" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">enzyme</text>
      <text x="555" y="115" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">DISABLED</text>
      <text x="555" y="138" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">many enzymes at once</text>
      <text x="330" y="185" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">One preference — for soft –SH sulphur — explains why these metals hit everything</text>
      <text x="330" y="207" fontSize="10.5" textAnchor="middle" fill="rgb(59 130 246)">Antidotes are thiols too (BAL) — they out-compete the enzyme</text>
      <defs>
        <marker id="sms-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(239 68 68)" /></marker>
      </defs>
    </svg>
  );
}
