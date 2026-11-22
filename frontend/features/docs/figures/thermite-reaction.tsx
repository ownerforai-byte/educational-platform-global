// ThermiteReaction figure. Theme-aware.
export function ThermiteReaction({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Thermite reaction of aluminium with iron oxide welding a railway rail">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Thermite — 2Al + Fe₂O₃ → Al₂O₃ + 2Fe</text>
      <rect x="230" y="50" width="200" height="60" rx="8" fill="none" stroke="rgb(148 163 184)" strokeWidth="2" />
      <text x="330" y="72" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">crucible: Al powder + Fe₂O₃</text>
      <text x="330" y="92" fontSize="10.5" textAnchor="middle" fill="rgb(239 68 68)">Mg fuse ignites it</text>
      <path d="M 300 112 C 300 150, 260 160, 230 175" stroke="rgb(239 68 68)" strokeWidth="4" fill="none" opacity="0.85" />
      <rect x="120" y="175" width="240" height="22" rx="4" fill="rgb(148 163 184)" opacity="0.4" />
      <rect x="215" y="168" width="50" height="14" fill="rgb(239 68 68)" opacity="0.8" />
      <text x="240" y="212" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">molten iron pours into the rail gap</text>
      <text x="520" y="90" fontSize="10.5" className="fill-current text-muted-foreground">ΔH ≈ −850 kJ —</text>
      <text x="520" y="108" fontSize="10.5" className="fill-current text-muted-foreground">self-heated past</text>
      <text x="520" y="126" fontSize="10.5" className="fill-current text-muted-foreground">1538 °C;</text>
      <text x="520" y="144" fontSize="10.5" className="fill-current text-muted-foreground">also the proof Al</text>
      <text x="520" y="162" fontSize="10.5" className="fill-current text-muted-foreground">loves O more than Fe</text>
    </svg>
  );
}
